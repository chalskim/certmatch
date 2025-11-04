-- CertMatch Database Schema - RESET VERSION
-- PostgreSQL 14+
-- 작성일: 2025-01-15
-- 주의: 이 스크립트는 기존 데이터를 모두 삭제합니다!

-- ============================================
-- 0. DROP EXISTING OBJECTS (역순으로 삭제)
-- ============================================

-- Drop triggers first
DROP TRIGGER IF EXISTS update_rating_after_review ON reviews;
DROP TRIGGER IF EXISTS update_comment_count ON comments;
DROP TRIGGER IF EXISTS update_users_updated_at ON users;
DROP TRIGGER IF EXISTS update_companies_updated_at ON companies;
DROP TRIGGER IF EXISTS update_consultants_updated_at ON consultants;
DROP TRIGGER IF EXISTS update_proposals_updated_at ON proposals;
DROP TRIGGER IF EXISTS update_contracts_updated_at ON contracts;

-- Drop functions
DROP FUNCTION IF EXISTS update_updated_at_column();
DROP FUNCTION IF EXISTS update_consultant_rating();
DROP FUNCTION IF EXISTS update_post_comment_count();

-- Drop tables (역참조 순서)
DROP TABLE IF EXISTS notifications CASCADE;
DROP TABLE IF EXISTS government_notices CASCADE;
DROP TABLE IF EXISTS comments CASCADE;
DROP TABLE IF EXISTS posts CASCADE;
DROP TABLE IF EXISTS course_enrollments CASCADE;
DROP TABLE IF EXISTS courses CASCADE;
DROP TABLE IF EXISTS rating_aggregates CASCADE;
DROP TABLE IF EXISTS reviews CASCADE;
DROP TABLE IF EXISTS settlements CASCADE;
DROP TABLE IF EXISTS payments CASCADE;
DROP TABLE IF EXISTS contracts CASCADE;
DROP TABLE IF EXISTS proposals CASCADE;
DROP TABLE IF EXISTS educators CASCADE;
DROP TABLE IF EXISTS consultants CASCADE;
DROP TABLE IF EXISTS companies CASCADE;
DROP TABLE IF EXISTS users CASCADE;

-- Drop types
DROP TYPE IF EXISTS notification_type_enum CASCADE;
DROP TYPE IF EXISTS post_category_enum CASCADE;
DROP TYPE IF EXISTS review_status_enum CASCADE;
DROP TYPE IF EXISTS settlement_status_enum CASCADE;
DROP TYPE IF EXISTS payment_method_enum CASCADE;
DROP TYPE IF EXISTS payment_status_enum CASCADE;
DROP TYPE IF EXISTS contract_status_enum CASCADE;
DROP TYPE IF EXISTS proposal_status_enum CASCADE;
DROP TYPE IF EXISTS company_size_enum CASCADE;
DROP TYPE IF EXISTS cert_type_enum CASCADE;
DROP TYPE IF EXISTS user_type_enum CASCADE;

-- ============================================
-- 1. Extensions & Functions
-- ============================================

-- UUID 지원
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- 암호화 지원
CREATE EXTENSION IF NOT EXISTS "pgcrypto";

-- Full-text search 한글 지원
CREATE EXTENSION IF NOT EXISTS "unaccent";

-- ============================================
-- 2. Custom Types (ENUMs)
-- ============================================

-- 사용자 유형
CREATE TYPE user_type_enum AS ENUM (
    'person',       -- 개인
    'company',      -- 기업
    'consultant',   -- 컨설턴트
    'educator',     -- 교육기관
    'admin'         -- 관리자
);

-- 인증 종류
CREATE TYPE cert_type_enum AS ENUM (
    'ISMS',         -- 정보보호관리체계
    'ISMS-P',       -- 개인정보보호 포함
    'ISO27001',     -- ISO 27001
    'GS',           -- 굿소프트웨어
    'CPPG',         -- 개인정보보호관리사
    'ISO27701',     -- 개인정보관리
    'GDPR'          -- EU GDPR
);

-- 기업 규모
CREATE TYPE company_size_enum AS ENUM (
    'small',        -- 소기업 (50명 미만)
    'medium',       -- 중기업 (50-300명)
    'large',        -- 대기업 (300명 이상)
    'enterprise'    -- 초대기업 (1000명 이상)
);

-- 제안 상태
CREATE TYPE proposal_status_enum AS ENUM (
    'pending',      -- 대기중
    'accepted',     -- 수락됨
    'rejected',     -- 거절됨
    'expired',      -- 만료됨
    'completed'     -- 완료됨
);

-- 계약 상태
CREATE TYPE contract_status_enum AS ENUM (
    'pending',      -- 대기중
    'signed',       -- 서명완료
    'active',       -- 진행중
    'completed',    -- 완료
    'cancelled'     -- 취소됨
);

-- 결제 상태
CREATE TYPE payment_status_enum AS ENUM (
    'pending',      -- 대기중
    'success',      -- 성공
    'failed',       -- 실패
    'refunded',     -- 환불됨
    'cancelled'     -- 취소됨
);

-- 결제 수단
CREATE TYPE payment_method_enum AS ENUM (
    'card',         -- 신용카드
    'transfer',     -- 계좌이체
    'virtual',      -- 가상계좌
    'mobile'        -- 휴대폰결제
);

-- 정산 상태
CREATE TYPE settlement_status_enum AS ENUM (
    'pending',      -- 정산대기
    'transferred',  -- 송금완료
    'failed'        -- 송금실패
);

-- 리뷰 상태
CREATE TYPE review_status_enum AS ENUM (
    'pending',      -- 검토중
    'approved',     -- 승인됨
    'rejected',     -- 거부됨
    'hidden'        -- 숨김
);

-- 게시글 카테고리
CREATE TYPE post_category_enum AS ENUM (
    'qa',           -- Q&A
    'success',      -- 성공사례
    'tips',         -- 전문가팁
    'news'          -- 뉴스/공고
);

-- 알림 유형
CREATE TYPE notification_type_enum AS ENUM (
    'matching',     -- 매칭 알림
    'message',      -- 메시지
    'payment',      -- 결제
    'settlement',   -- 정산
    'community',    -- 커뮤니티
    'system'        -- 시스템
);

-- ============================================
-- 3. Core Tables
-- ============================================

-- 3.1 사용자 테이블
CREATE TABLE users (
    user_id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    email VARCHAR(255) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    user_type user_type_enum NOT NULL,
    
    -- 프로필 정보
    name VARCHAR(100),
    phone VARCHAR(20),
    profile_image_url TEXT,
    profile_complete_pct INTEGER DEFAULT 0 CHECK (profile_complete_pct BETWEEN 0 AND 100),
    
    -- 인증 관련
    email_verified BOOLEAN DEFAULT FALSE,
    email_verified_at TIMESTAMP,
    two_factor_enabled BOOLEAN DEFAULT FALSE,
    two_factor_secret VARCHAR(32),
    
    -- 조직 ID (멀티테넌트)
    org_id UUID,
    
    -- 상태
    is_active BOOLEAN DEFAULT TRUE,
    last_login_at TIMESTAMP,
    
    -- 타임스탬프
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    deleted_at TIMESTAMP,
    
    -- 인덱스
    CONSTRAINT email_format CHECK (email ~* '^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Z|a-z]{2,}$')
);

-- 3.2 기업 프로필
CREATE TABLE companies (
    company_id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID NOT NULL REFERENCES users(user_id) ON DELETE CASCADE,
    
    -- 기본 정보
    name VARCHAR(255) NOT NULL,
    business_reg_no VARCHAR(50), -- 암호화 필요
    industry VARCHAR(100),
    size company_size_enum,
    location VARCHAR(255),
    
    -- 상세 정보
    website VARCHAR(255),
    logo_url TEXT,
    description TEXT,
    employee_count INTEGER,
    
    -- 인증 관련
    cert_type cert_type_enum[],
    budget DECIMAL(15, 2),
    desired_timeline VARCHAR(50),
    status VARCHAR(50) DEFAULT 'preparing',
    
    -- 연락처
    contact_name VARCHAR(100),
    contact_phone VARCHAR(20),
    contact_email VARCHAR(255),
    
    -- 타임스탬프
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    
    CONSTRAINT fk_company_user FOREIGN KEY (user_id) REFERENCES users(user_id)
);

-- 3.3 컨설턴트 프로필
CREATE TABLE consultants (
    consultant_id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID NOT NULL REFERENCES users(user_id) ON DELETE CASCADE,
    
    -- 기본 정보
    name VARCHAR(100) NOT NULL,
    bio TEXT,
    specialty JSONB, -- ['ISMS-P', 'ISO27001', ...]
    
    -- 경력
    experience_years INTEGER,
    hourly_rate DECIMAL(10, 2),
    daily_rate DECIMAL(10, 2),
    
    -- 위치 및 가용성
    location VARCHAR(255),
    languages VARCHAR(100)[],
    availability JSONB, -- 시간표 정보
    
    -- 검증
    is_verified BOOLEAN DEFAULT FALSE,
    verified_date TIMESTAMP,
    certifications JSONB, -- 자격증 정보
    
    -- 평점
    rating DECIMAL(3, 2) DEFAULT 0.00 CHECK (rating BETWEEN 0 AND 5),
    review_count INTEGER DEFAULT 0,
    
    -- 타임스탬프
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    
    CONSTRAINT fk_consultant_user FOREIGN KEY (user_id) REFERENCES users(user_id)
);

-- 3.4 교육기관 프로필
CREATE TABLE educators (
    educator_id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID NOT NULL REFERENCES users(user_id) ON DELETE CASCADE,
    
    -- 기본 정보
    institution_name VARCHAR(255) NOT NULL,
    description TEXT,
    location VARCHAR(255),
    website VARCHAR(255),
    
    -- 인증
    is_verified BOOLEAN DEFAULT FALSE,
    certifications JSONB,
    
    -- 평점
    rating DECIMAL(3, 2) DEFAULT 0.00,
    review_count INTEGER DEFAULT 0,
    
    -- 타임스탬프
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    
    CONSTRAINT fk_educator_user FOREIGN KEY (user_id) REFERENCES users(user_id)
);

-- ============================================
-- 4. Matching & Proposals
-- ============================================

-- 4.1 매칭 제안
CREATE TABLE proposals (
    proposal_id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    company_id UUID NOT NULL REFERENCES companies(company_id),
    consultant_id UUID NOT NULL REFERENCES consultants(consultant_id),
    
    -- 매칭 정보
    matching_score INTEGER CHECK (matching_score BETWEEN 0 AND 100),
    matching_reason TEXT,
    
    -- 상태
    status proposal_status_enum DEFAULT 'pending',
    
    -- 메시지
    message_history JSONB,
    rejection_reason TEXT,
    
    -- 유효기간
    expires_at TIMESTAMP,
    
    -- 타임스탬프
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    
    CONSTRAINT unique_proposal UNIQUE (company_id, consultant_id, created_at)
);

-- 4.2 계약
CREATE TABLE contracts (
    contract_id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    company_id UUID NOT NULL REFERENCES companies(company_id),
    consultant_id UUID NOT NULL REFERENCES consultants(consultant_id),
    proposal_id UUID REFERENCES proposals(proposal_id),
    
    -- 금액
    amount DECIMAL(15, 2) NOT NULL,
    fee DECIMAL(15, 2), -- 플랫폼 수수료
    net_amount DECIMAL(15, 2), -- 순수익
    
    -- 계약 내용
    items JSONB, -- 컨설팅 항목들
    terms TEXT,
    
    -- 상태
    status contract_status_enum DEFAULT 'pending',
    
    -- 서명
    contract_pdf_url TEXT,
    sign_url TEXT,
    signed_by_company_at TIMESTAMP,
    signed_by_consultant_at TIMESTAMP,
    
    -- 일정
    start_date DATE,
    end_date DATE,
    
    -- 타임스탬프
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    completed_at TIMESTAMP
);

-- ============================================
-- 5. Payment & Settlement
-- ============================================

-- 5.1 결제
CREATE TABLE payments (
    payment_id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    contract_id UUID NOT NULL REFERENCES contracts(contract_id),
    
    -- 금액
    amount DECIMAL(15, 2) NOT NULL,
    fee DECIMAL(15, 2), -- PG 수수료
    net_amount DECIMAL(15, 2),
    
    -- 상태
    status payment_status_enum DEFAULT 'pending',
    payment_method payment_method_enum,
    
    -- PG 정보
    transaction_id VARCHAR(100), -- PG사 거래번호
    pg_provider VARCHAR(50), -- KG이니시스, 토스페이먼츠 등
    
    -- 영수증
    receipt_url TEXT,
    
    -- 타임스탬프
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    completed_at TIMESTAMP,
    refunded_at TIMESTAMP
);

-- 5.2 정산
CREATE TABLE settlements (
    settlement_id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    consultant_id UUID REFERENCES consultants(consultant_id),
    educator_id UUID REFERENCES educators(educator_id),
    
    -- 기간
    period VARCHAR(7) NOT NULL, -- 'YYYY-MM'
    
    -- 금액
    total_earned DECIMAL(15, 2) NOT NULL,
    platform_fee DECIMAL(15, 2) NOT NULL,
    tax_withheld DECIMAL(15, 2) DEFAULT 0,
    net_amount DECIMAL(15, 2) NOT NULL,
    
    -- 상태
    status settlement_status_enum DEFAULT 'pending',
    
    -- 송금 정보
    bank_account VARCHAR(100), -- 암호화 필요
    transfer_date DATE,
    
    -- 타임스탬프
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    
    CONSTRAINT check_recipient CHECK (
        (consultant_id IS NOT NULL AND educator_id IS NULL) OR
        (consultant_id IS NULL AND educator_id IS NOT NULL)
    )
);

-- ============================================
-- 6. Reviews & Ratings
-- ============================================

-- 6.1 리뷰
CREATE TABLE reviews (
    review_id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    contract_id UUID NOT NULL REFERENCES contracts(contract_id),
    
    -- 작성자/대상자
    reviewer_id UUID NOT NULL REFERENCES users(user_id),
    reviewee_id UUID NOT NULL REFERENCES users(user_id),
    
    -- 평가
    rating INTEGER NOT NULL CHECK (rating BETWEEN 1 AND 5),
    text TEXT,
    
    -- 카테고리별 평점 (선택사항)
    rating_by_category JSONB, -- {expertise: 5, communication: 4, ...}
    
    -- 상태
    status review_status_enum DEFAULT 'pending',
    
    -- 응답
    response TEXT,
    response_at TIMESTAMP,
    
    -- 타임스탬프
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    published_at TIMESTAMP,
    
    CONSTRAINT unique_review UNIQUE (contract_id, reviewer_id)
);

-- 6.2 평점 집계 (Material View로 구현 가능)
CREATE TABLE rating_aggregates (
    consultant_id UUID PRIMARY KEY REFERENCES consultants(consultant_id),
    
    avg_rating DECIMAL(3, 2) DEFAULT 0.00,
    review_count INTEGER DEFAULT 0,
    rating_by_category JSONB,
    
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- ============================================
-- 7. Education & Courses
-- ============================================

-- 7.1 교육 과정
CREATE TABLE courses (
    course_id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    educator_id UUID NOT NULL REFERENCES educators(educator_id),
    
    -- 기본 정보
    course_name VARCHAR(255) NOT NULL,
    description TEXT,
    instructor_name VARCHAR(100),
    
    -- 난이도 및 기간
    level VARCHAR(20), -- 'beginner', 'intermediate', 'advanced'
    duration_hours INTEGER,
    duration_weeks INTEGER,
    
    -- 가격
    price DECIMAL(10, 2),
    discount_price DECIMAL(10, 2),
    
    -- 일정
    schedule JSONB, -- 일정 정보
    start_date DATE,
    end_date DATE,
    
    -- 형식
    format VARCHAR(20), -- 'online', 'offline', 'hybrid'
    max_students INTEGER,
    enrolled_count INTEGER DEFAULT 0,
    
    -- 상태
    is_active BOOLEAN DEFAULT TRUE,
    
    -- 평점
    rating DECIMAL(3, 2) DEFAULT 0.00,
    review_count INTEGER DEFAULT 0,
    
    -- 타임스탬프
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 7.2 수강 신청
CREATE TABLE course_enrollments (
    enrollment_id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    course_id UUID NOT NULL REFERENCES courses(course_id),
    user_id UUID NOT NULL REFERENCES users(user_id),
    
    -- 상태
    status VARCHAR(20) DEFAULT 'enrolled', -- 'enrolled', 'completed', 'cancelled'
    progress INTEGER DEFAULT 0 CHECK (progress BETWEEN 0 AND 100),
    
    -- 수료
    completed_at TIMESTAMP,
    certificate_url TEXT,
    
    -- 타임스탬프
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    
    CONSTRAINT unique_enrollment UNIQUE (course_id, user_id)
);

-- ============================================
-- 8. Community & Forum
-- ============================================

-- 8.1 게시글
CREATE TABLE posts (
    post_id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    author_id UUID NOT NULL REFERENCES users(user_id),
    
    -- 내용
    category post_category_enum NOT NULL,
    title VARCHAR(255) NOT NULL,
    content TEXT NOT NULL,
    tags VARCHAR(50)[],
    
    -- 통계
    view_count INTEGER DEFAULT 0,
    like_count INTEGER DEFAULT 0,
    comment_count INTEGER DEFAULT 0,
    
    -- Q&A 채택
    is_adopted BOOLEAN DEFAULT FALSE,
    adopted_by_id UUID REFERENCES users(user_id),
    
    -- 타임스탬프
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    published_at TIMESTAMP,
    deleted_at TIMESTAMP
);

-- 8.2 댓글
CREATE TABLE comments (
    comment_id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    post_id UUID NOT NULL REFERENCES posts(post_id) ON DELETE CASCADE,
    parent_comment_id UUID REFERENCES comments(comment_id),
    author_id UUID NOT NULL REFERENCES users(user_id),
    
    -- 내용
    content TEXT NOT NULL,
    like_count INTEGER DEFAULT 0,
    
    -- 타임스탬프
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    deleted_at TIMESTAMP
);

-- ============================================
-- 9. Notifications
-- ============================================

-- 9.1 알림
CREATE TABLE notifications (
    notification_id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID NOT NULL REFERENCES users(user_id),
    
    -- 내용
    type notification_type_enum NOT NULL,
    title VARCHAR(255) NOT NULL,
    message TEXT NOT NULL,
    data JSONB, -- 추가 데이터
    
    -- 상태
    is_read BOOLEAN DEFAULT FALSE,
    read_at TIMESTAMP,
    
    -- 링크
    action_url TEXT,
    
    -- 타임스탬프
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    expires_at TIMESTAMP
);

-- ============================================
-- 10. Government Data & News
-- ============================================

-- 10.1 정부 공고
CREATE TABLE government_notices (
    notice_id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    
    -- 내용
    title VARCHAR(255) NOT NULL,
    content TEXT,
    category VARCHAR(50),
    
    -- 출처
    source VARCHAR(100), -- 'KISA', 'TTA', 'KFQ' 등
    source_url TEXT,
    
    -- 일정
    application_start DATE,
    application_end DATE,
    
    -- 상태
    is_active BOOLEAN DEFAULT TRUE,
    
    -- 타임스탬프
    published_at TIMESTAMP,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- ============================================
-- 11. Indexes
-- ============================================

-- Users
CREATE INDEX idx_users_email ON users(email);
CREATE INDEX idx_users_type ON users(user_type);
CREATE INDEX idx_users_org ON users(org_id);
CREATE INDEX idx_users_active ON users(is_active) WHERE deleted_at IS NULL;

-- Companies
CREATE INDEX idx_companies_user ON companies(user_id);
CREATE INDEX idx_companies_industry ON companies(industry);
CREATE INDEX idx_companies_size ON companies(size);
CREATE INDEX idx_companies_location ON companies(location);

-- Consultants
CREATE INDEX idx_consultants_user ON consultants(user_id);
CREATE INDEX idx_consultants_specialty ON consultants USING GIN(specialty);
CREATE INDEX idx_consultants_verified ON consultants(is_verified);
CREATE INDEX idx_consultants_rating ON consultants(rating DESC);

-- Proposals
CREATE INDEX idx_proposals_company ON proposals(company_id);
CREATE INDEX idx_proposals_consultant ON proposals(consultant_id);
CREATE INDEX idx_proposals_status ON proposals(status);
CREATE INDEX idx_proposals_created ON proposals(created_at DESC);

-- Contracts
CREATE INDEX idx_contracts_company ON contracts(company_id);
CREATE INDEX idx_contracts_consultant ON contracts(consultant_id);
CREATE INDEX idx_contracts_status ON contracts(status);
CREATE INDEX idx_contracts_dates ON contracts(start_date, end_date);

-- Payments
CREATE INDEX idx_payments_contract ON payments(contract_id);
CREATE INDEX idx_payments_status ON payments(status);
CREATE INDEX idx_payments_created ON payments(created_at DESC);

-- Reviews
CREATE INDEX idx_reviews_contract ON reviews(contract_id);
CREATE INDEX idx_reviews_reviewee ON reviews(reviewee_id);
CREATE INDEX idx_reviews_status ON reviews(status);

-- Posts
CREATE INDEX idx_posts_author ON posts(author_id);
CREATE INDEX idx_posts_category ON posts(category);
CREATE INDEX idx_posts_tags ON posts USING GIN(tags);
CREATE INDEX idx_posts_created ON posts(created_at DESC);

-- Comments
CREATE INDEX idx_comments_post ON comments(post_id);
CREATE INDEX idx_comments_parent ON comments(parent_comment_id);

-- Notifications
CREATE INDEX idx_notifications_user ON notifications(user_id);
CREATE INDEX idx_notifications_read ON notifications(is_read);
CREATE INDEX idx_notifications_created ON notifications(created_at DESC);

-- Full-text search indexes (영어 기본 설정 사용)
-- 한글 검색이 필요한 경우 별도의 한글 형태소 분석기 설치 필요
CREATE INDEX idx_posts_title_search ON posts USING gin(to_tsvector('english', title));
CREATE INDEX idx_posts_content_search ON posts USING gin(to_tsvector('english', content));

-- ============================================
-- 12. Triggers & Functions
-- ============================================

-- 12.1 updated_at 자동 업데이트
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = CURRENT_TIMESTAMP;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Triggers for updated_at
CREATE TRIGGER update_users_updated_at BEFORE UPDATE ON users
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_companies_updated_at BEFORE UPDATE ON companies
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_consultants_updated_at BEFORE UPDATE ON consultants
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_proposals_updated_at BEFORE UPDATE ON proposals
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_contracts_updated_at BEFORE UPDATE ON contracts
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- 12.2 평점 자동 업데이트
CREATE OR REPLACE FUNCTION update_consultant_rating()
RETURNS TRIGGER AS $$
BEGIN
    UPDATE consultants
    SET 
        rating = (
            SELECT COALESCE(AVG(rating), 0)
            FROM reviews
            WHERE reviewee_id = NEW.reviewee_id
            AND status = 'approved'
        ),
        review_count = (
            SELECT COUNT(*)
            FROM reviews
            WHERE reviewee_id = NEW.reviewee_id
            AND status = 'approved'
        )
    WHERE user_id = NEW.reviewee_id;
    
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER update_rating_after_review
AFTER INSERT OR UPDATE ON reviews
FOR EACH ROW
WHEN (NEW.status = 'approved')
EXECUTE FUNCTION update_consultant_rating();

-- 12.3 댓글 수 자동 업데이트
CREATE OR REPLACE FUNCTION update_post_comment_count()
RETURNS TRIGGER AS $$
BEGIN
    IF TG_OP = 'INSERT' THEN
        UPDATE posts
        SET comment_count = comment_count + 1
        WHERE post_id = NEW.post_id;
    ELSIF TG_OP = 'DELETE' THEN
        UPDATE posts
        SET comment_count = GREATEST(comment_count - 1, 0)
        WHERE post_id = OLD.post_id;
    END IF;
    RETURN NULL;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER update_comment_count
AFTER INSERT OR DELETE ON comments
FOR EACH ROW
EXECUTE FUNCTION update_post_comment_count();

-- ============================================
-- 13. Sample Data (개발용)
-- ============================================

-- 관리자 계정
INSERT INTO users (email, password_hash, user_type, name, email_verified)
VALUES ('admin@certmatch.io', crypt('admin123!', gen_salt('bf')), 'admin', 'Admin User', true);

-- 샘플 기업 사용자
INSERT INTO users (email, password_hash, user_type, name, email_verified)
VALUES ('company@example.com', crypt('password123!', gen_salt('bf')), 'company', '테크솔루션', true);

-- 샘플 컨설턴트 사용자
INSERT INTO users (email, password_hash, user_type, name, email_verified)
VALUES ('consultant@example.com', crypt('password123!', gen_salt('bf')), 'consultant', '김민수', true);

-- 샘플 교육기관 사용자
INSERT INTO users (email, password_hash, user_type, name, email_verified)
VALUES ('educator@example.com', crypt('password123!', gen_salt('bf')), 'educator', '한국정보통신진흥협회', true);

-- ============================================
-- 완료 메시지
-- ============================================

DO $$
BEGIN
    RAISE NOTICE '✅ CertMatch 데이터베이스 스키마 생성 완료!';
    RAISE NOTICE '📊 총 14개 테이블 생성됨';
    RAISE NOTICE '🔐 샘플 계정 4개 생성됨 (비밀번호: password123! 또는 admin123!)';
    RAISE NOTICE '⚡ 자동화 트리거 3개 활성화됨';
END $$;