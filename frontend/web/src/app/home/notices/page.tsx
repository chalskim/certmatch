'use client';

import styles from '../page.module.css';

export default function Notices() {
  // Notices data
  const notices = [
    {
      id: 1,
      icon: "📰",
      title: "[속보] 정보보호법 개정안 국회 본회의 통과",
      desc: "개인정보보호 강화 조치, 내년 1월부터 시행 예정",
      meta: "📅 2025.01.15 | 🏢 국회 | 속보"
    },
    {
      id: 2,
      icon: "📢",
      gradientClass: "gradient1",
      title: "중소기업 정보보호 인증 지원사업 (2025년 1차)",
      desc: "ISMS-P 인증 취득 비용 최대 70% 지원 (최대 3,000만원)",
      meta: "📅 신청기간: 2025.01.15 ~ 03.31 | 🏢 과학기술정보통신부 | 마감 90일 전"
    },
    {
      id: 3,
      icon: "🔥",
      gradientClass: "gradient2",
      title: "2025년 상급종합병원 ISMS-P 의무인증 기한 안내",
      desc: "전국 47개 상급종합병원 대상 2025.08.31까지 인증 취득 필수",
      meta: "📅 2025.01.10 | 🏢 한국인터넷진흥원 | 긴급공지"
    },
    {
      id: 4,
      icon: "📈",
      gradientClass: "gradient3",
      title: "ISO 27001 인증 기업, 평균 매출 23% 증가",
      desc: "한국표준협회 조사: 정보보호 투자가 기업 성장에 직접적인 영향",
      meta: "📅 2025.01.08 | 🏢 한국표준협회 | 산업뉴스"
    },
    {
      id: 5,
      icon: "💰",
      gradientClass: "gradient4",
      title: "금융권 정보보호 컨설팅 바우처",
      desc: "금융회사 대상 ISMS-P-FSI 컨설팅 비용 50% 지원",
      meta: "📅 신청기간: 2025.02.01 ~ 05.31 | 🏢 금융보안원"
    },
    {
      id: 6,
      icon: "🌍",
      gradientClass: "gradient5",
      title: "EU GDPR 대응 인증 수요 급증",
      desc: "국내 기업 유럽 진출 증가로 ISO 27701 인증 문의 200% 증가",
      meta: "📅 2025.01.05 | 🏢 무역협회 | 글로벌"
    }
  ];

  return (
    <div className={styles.tabContentActive}>
      {notices.map((notice) => (
        <div key={notice.id} className={styles.listCard}>
          <div className={`${styles.listCardIcon} ${styles[notice.gradientClass || '']}`}>
            {notice.icon}
          </div>
          <div className={styles.listCardContent}>
            <div className={styles.listCardTitle}>{notice.title}</div>
            <div className={styles.listCardDesc}>{notice.desc}</div>
            <div className={styles.listCardMeta}>{notice.meta}</div>
          </div>
        </div>
      ))}
    </div>
  );
}