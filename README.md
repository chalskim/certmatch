# CertMatch - 인증 구인구직 플랫폼

기업과 인증 전문가를 연결하는 스마트한 매칭 플랫폼입니다.

## 🏗️ 프로젝트 구조

```
certmatch/
├── backend/          # NestJS API 서버
├── frontend/         # 프론트엔드 애플리케이션
│   └── web/         # Next.js 웹 애플리케이션
├── mobile_front/     # React Native 모바일 앱
├── doc/             # 프로젝트 문서
└── mokup/           # UI 목업 파일
```

## 🚀 빠른 시작

### 전체 개발 환경 실행
```bash
# 의존성 설치
npm run install:all

# 모든 서비스 동시 실행 (백엔드, 웹, 모바일)
npm run dev
```

### 개별 서비스 실행
```bash
# 백엔드만 실행
npm run dev:backend

# 웹 애플리케이션만 실행
npm run dev:web

# 모바일 앱만 실행
npm run dev:mobile
```

## 📱 애플리케이션

### 백엔드 (NestJS)
- **위치**: `backend/`
- **포트**: 3001
- **기술스택**: NestJS, Prisma, PostgreSQL
- **문서**: [Backend README](./backend/README.md)

### 웹 애플리케이션 (Next.js)
- **위치**: `frontend/web/`
- **포트**: 3000
- **기술스택**: Next.js 15, TypeScript, Tailwind CSS
- **문서**: [Frontend README](./frontend/README.md)

### 모바일 애플리케이션 (React Native)
- **위치**: `mobile_front/`
- **기술스택**: Expo, React Native, TypeScript
- **플랫폼**: iOS, Android, Web

## 🛠️ 개발 도구

### 빌드
```bash
npm run build        # 전체 빌드
npm run build:backend # 백엔드만 빌드
npm run build:web    # 웹만 빌드
```

### 테스트
```bash
npm run test         # 전체 테스트
npm run test:backend # 백엔드 테스트
npm run test:web     # 웹 테스트
```

### 린트
```bash
npm run lint         # 전체 린트
npm run lint:backend # 백엔드 린트
npm run lint:web     # 웹 린트
```

## 📋 요구사항

- **Node.js**: 18.0.0 이상
- **npm**: 8.0.0 이상
- **PostgreSQL**: 15 이상 (백엔드용)

## 🔧 환경 설정

각 애플리케이션별 환경 설정은 해당 디렉토리의 README를 참조하세요:

- [백엔드 환경 설정](./backend/README.md#환경-설정)
- [프론트엔드 환경 설정](./frontend/README.md#환경-설정)

## 📚 문서

- [비즈니스 모델 & 아키텍처](./doc/1%20비즈니스%20모델%20&%20아키텍처%20설계서.txt)
- [기능별 상세 요구사항](./doc/2기능별%20상세%20요구사항서.txt)
- [개발 가이드](./backend/DEVELOPMENT.md)

## 🤝 기여하기

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 라이선스

이 프로젝트는 MIT 라이선스 하에 있습니다.

## 🔗 관련 링크

- [GitHub Repository](https://github.com/chalskim/certmatch)
- [API 문서](http://localhost:3001/api)
- [웹 애플리케이션](http://localhost:3000)
## GitHub Update
cd /Users/chalskim/src/certmatch/certmatch
git status
git add -A
git commit -m "chore: 전체 업데이트 및 테스트 페이지 추가"
git push origin main
git remote -v
git branch --show-current
git push -u origin main or git push --force origin main
git config --global credential.helper osxkeychain


서버 실행 
cd /Users/chalskim/src/certmatch/certmatch/Server && npm run start:dev

클라이언트 실행 
cd '/Users/chalskim/src/certmatch/certmatch/mobile_front' && npm start


