'use client';

import styles from '../page.module.css';

export default function Education() {
  // Education data
  const educationCourses = [
    {
      id: 1,
      badge: "new",
      title: "ISMS-P 심사원 기본과정",
      company: "한국정보통신진흥협회 · 40시간",
      tags: ["온라인", "자격증"],
      price: "350만원",
      rating: "4.8 (156)"
    },
    {
      id: 2,
      badge: "인기",
      title: "ISO 27001 Lead Auditor 과정",
      company: "한국품질재단 · 5일 집중",
      tags: ["오프라인", "국제자격"],
      price: "480만원",
      rating: "4.9 (203)"
    },
    {
      id: 3,
      badge: "할인중",
      title: "정보보호 실무자 양성과정",
      company: "한국능률협회 · 3개월",
      tags: ["혼합", "실무"],
      price: "250만원",
      rating: "4.7 (89)"
    },
    {
      id: 4,
      badge: "무료",
      title: "ISMS-P 기초 입문과정",
      company: "한국인터넷진흥원 · 8시간",
      tags: ["온라인", "입문"],
      price: "무료",
      rating: "4.6 (421)"
    }
  ];

  return (
    <div className={styles.tabContentActive}>
      <div className={styles.cardGrid}>
        {educationCourses.map((course) => (
          <div key={course.id} className={styles.card}>
            <div className={styles.cardContent}>
              <span className={`${styles.cardBadge} ${styles[`cardBadge${course.badge === 'new' ? 'New' : course.badge === '인기' ? 'Hot' : course.badge === '할인중' ? 'Urgent' : 'Breaking'}`]}`}>
                {course.badge === 'new' ? '신규' : 
                 course.badge === '인기' ? '인기' : 
                 course.badge === '할인중' ? '할인중' : '무료'}
              </span>
              <div className={styles.cardTitle}>{course.title}</div>
              <div className={styles.cardCompany}>{course.company}</div>
              <div className={styles.cardTags}>
                {course.tags.map((tag, index) => (
                  <span key={index} className={styles.cardTag}>{tag}</span>
                ))}
              </div>
              <div className={styles.cardFooter}>
                <div className={styles.cardPrice}>{course.price}</div>
                <div className={styles.cardRating}>
                  <span className={styles.star}>★</span>
                  <span>{course.rating}</span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}