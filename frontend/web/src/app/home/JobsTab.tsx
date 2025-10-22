'use client';

import { useState } from 'react';
import styles from '../home/page.module.css';

export default function Jobs() {
  // Urgent recruitment data
  const urgentRecruitments = [
    {
      id: 1,
      badge: "🔥 긴급 모집",
      title: "정보보호 담당자 (ISMS-P 경험 필수)",
      company: "㈜테크솔루션 · 서울 강남구",
      price: "5,000만원~",
      deadline: "~02.28"
    },
    {
      id: 2,
      badge: "⚡ 즉시 채용",
      title: "클라우드 보안 전문가 (AWS/Azure)",
      company: "㈜클라우드테크 · 서울 강남구",
      price: "6,000만원~",
      deadline: "~02.25"
    },
    {
      id: 3,
      badge: "🚀 긴급",
      title: "개인정보보호 담당자 (PIMS 경험자)",
      company: "㈜핀테크코리아 · 서울 여의도",
      price: "5,500만원~",
      deadline: "~03.10"
    },
    {
      id: 4,
      badge: "🔥 특채",
      title: "GS 인증 전문가 (소프트웨어 품질)",
      company: "㈜디지털이노베이션 · 경기 판교",
      price: "4,200만원~",
      deadline: "~02.15"
    },
    {
      id: 5,
      badge: "⚡ 즉시",
      title: "정보보호 컨설턴트 (프리랜서)",
      company: "㈜보안솔루션 · 서울 서초구",
      price: "일 300만원",
      deadline: "~03.31"
    }
  ];

  // General recruitment data
  const generalRecruitments = [
    {
      id: 1,
      badge: "new",
      title: "ISO 27001 Lead Auditor 심사원",
      company: "한국품질인증원 · 경기 성남시",
      tags: ["경력무관", "계약직"],
      price: "협의",
      date: "~03.15"
    },
    {
      id: 2,
      badge: "hot",
      title: "정보보호 관리자 (CISO 후보)",
      company: "㈜데이터시큐리티 · 서울 판교",
      tags: ["경력 7년↑", "정규직"],
      price: "8,000만원~",
      date: "~03.20"
    },
    {
      id: 3,
      badge: "추천",
      title: "네트워크 보안 전문가",
      company: "㈜인프라보안 · 경기 분당",
      tags: ["경력 3년↑", "정규직"],
      price: "4,500만원~",
      date: "~03.25"
    },
    {
      id: 4,
      badge: "new",
      title: "애플리케이션 보안 엔지니어",
      company: "㈜앱시큐어 · 서울 강남구",
      tags: ["경력 2년↑", "정규직"],
      price: "4,800만원~",
      date: "~03.30"
    },
    {
      id: 5,
      badge: "추천",
      title: "데이터베이스 보안 관리자",
      company: "㈜DB보안솔루션 · 경기 판교",
      tags: ["경력 4년↑", "정규직"],
      price: "5,200만원~",
      date: "~04.05"
    },
    {
      id: 6,
      badge: "hot",
      title: "정보보호 컨설턴트 (주니어)",
      company: "㈜시큐리티파트너스 · 서울 서초구",
      tags: ["경력 1년↑", "정규직"],
      price: "3,800만원~",
      date: "~04.10"
    },
    {
      id: 7,
      badge: "new",
      title: "사이버 위협 분석가",
      company: "㈜위트레킹 · 서울 강남구",
      tags: ["경력 3년↑", "정규직"],
      price: "5,500만원~",
      date: "~04.15"
    },
    {
      id: 8,
      badge: "추천",
      title: "보안 솔루션 아키텍트",
      company: "㈜솔루션아키텍트 · 경기 성남",
      tags: ["경력 5년↑", "정규직"],
      price: "7,000만원~",
      date: "~04.20"
    },
    {
      id: 9,
      badge: "hot",
      title: "취약점 분석 전문가",
      company: "㈜해커그룹 · 서울 마포구",
      tags: ["경력 2년↑", "계약직"],
      price: "4,200만원~",
      date: "~04.25"
    }
  ];

  return (
    <div className={styles.tabContentActive}>
      {/* 긴급 모집 섹션 */}
      <div className={styles.urgentSection}>
        <div className={styles.urgentSectionTitle}>
          <i className="fas fa-fire"></i>
          <span>긴급 모집</span>
        </div>
        
        <div className={styles.urgentRecruitmentContainer}>
          <div className={styles.urgentRecruitmentScroll}>
            {urgentRecruitments.map((job) => (
              <div key={job.id} className={styles.urgentCard}>
                <div className={styles.urgentBadge}>{job.badge}</div>
                <div className={styles.urgentTitle}>{job.title}</div>
                <div className={styles.urgentCompany}>{job.company}</div>
                <div className={styles.urgentFooter}>
                  <div className={styles.urgentPrice}>{job.price}</div>
                  <div className={styles.urgentDeadline}>{job.deadline}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      
      {/* 일반 모집 섹션 */}
      <div className={styles.generalSection}>
        <div className={styles.generalSectionTitle}>
          <i className="fas fa-briefcase"></i>
          <span>일반 모집</span>
        </div>
        
        <div className={styles.cardGrid}>
          {generalRecruitments.map((job) => (
            <div key={job.id} className={styles.card}>
              <div className={styles.cardContent}>
                {job.badge && (
                  <span className={`${styles.cardBadge} ${styles[`cardBadge${job.badge.charAt(0).toUpperCase() + job.badge.slice(1)}`]}`}>
                    {job.badge === 'new' ? '신규' : 
                     job.badge === 'hot' ? '인기' : job.badge}
                  </span>
                )}
                <div className={styles.cardTitle}>{job.title}</div>
                <div className={styles.cardCompany}>{job.company}</div>
                <div className={styles.cardTags}>
                  {job.tags.map((tag, index) => (
                    <span key={index} className={styles.cardTag}>{tag}</span>
                  ))}
                </div>
                <div className={styles.cardFooter}>
                  <div className={styles.cardPrice}>{job.price}</div>
                  <div className={styles.newsDate}>{job.date}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}