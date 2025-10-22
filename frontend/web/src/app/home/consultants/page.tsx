'use client';

import styles from '../page.module.css';

export default function Consultants() {
  // Experts data
  const experts = [
    {
      id: 1,
      badge: "매칭률 95%",
      title: "김민수 컨설턴트",
      company: "ISMS-P 전문 · 15년 경력",
      price: "일 200만원",
      rating: "4.9 (47)"
    },
    {
      id: 2,
      badge: "신규",
      title: "박지영 컨설턴트",
      company: "ISO 27001 전문 · 10년 경력",
      price: "일 180만원",
      rating: "4.8 (32)"
    },
    {
      id: 3,
      badge: "인기",
      title: "이준호 컨설턴트",
      company: "ISMS + ISO 통합 · 12년 경력",
      price: "일 220만원",
      rating: "5.0 (89)"
    },
    {
      id: 4,
      badge: "베테랑",
      title: "최서연 컨설턴트",
      company: "GS 인증 전문 · 8년 경력",
      price: "일 150만원",
      rating: "4.7 (28)"
    },
    {
      id: 5,
      badge: "특화",
      title: "정민철 컨설턴트",
      company: "의료정보보호 전문 · 6년 경력",
      price: "일 170만원",
      rating: "4.6 (21)"
    }
  ];

  return (
    <div className={styles.tabContentActive}>
      {/* 추천 전문가 섹션 */}
      <div className={styles.expertsSection}>
        <div className={styles.expertsSectionTitle}>
          <i className="fas fa-star"></i>
          <span>추천 전문가</span>
        </div>
        
        <div className={styles.expertsScrollContainer}>
          <div className={styles.expertsScroll}>
            {experts.map((expert) => (
              <div key={expert.id} className={styles.expertCard}>
                <div className={styles.expertBadge}>{expert.badge}</div>
                <div className={styles.expertTitle}>{expert.title}</div>
                <div className={styles.expertCompany}>{expert.company}</div>
                <div className={styles.expertFooter}>
                  <div className={styles.expertPrice}>{expert.price}</div>
                  <div className={styles.expertRating}>
                    <span className={styles.star}>★</span>
                    <span>{expert.rating}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      
      {/* 전문가 리스트 */}
      <div className={styles.cardGrid}>
        <div className={styles.card}>
          <div className={styles.cardContent}>
            <span className={styles.cardBadge}>추천</span>
            <div className={styles.cardTitle}>한국컨설팅그룹</div>
            <div className={styles.cardCompany}>기업형 컨설팅 · 20년 경력</div>
            <div className={styles.cardTags}>
              <span className={styles.cardTag}>대기업</span>
              <span className={styles.cardTag}>종합인증</span>
            </div>
            <div className={styles.cardFooter}>
              <div className={styles.cardPrice}>3,500만원~</div>
              <div className={styles.cardRating}>
                <span className={styles.star}>★</span>
                <span>4.9 (67)</span>
              </div>
            </div>
          </div>
        </div>
        
        <div className={styles.card}>
          <div className={styles.cardContent}>
            <span className={`${styles.cardBadge} ${styles.cardBadgeNew}`}>신규</span>
            <div className={styles.cardTitle}>글로벌인증컨설팅</div>
            <div className={styles.cardCompany}>국제인증 전문 · 15년 경력</div>
            <div className={styles.cardTags}>
              <span className={styles.cardTag}>ISO</span>
              <span className={styles.cardTag}>해외인증</span>
            </div>
            <div className={styles.cardFooter}>
              <div className={styles.cardPrice}>2,800만원~</div>
              <div className={styles.cardRating}>
                <span className={styles.star}>★</span>
                <span>4.7 (45)</span>
              </div>
            </div>
          </div>
        </div>
        
        <div className={styles.card}>
          <div className={styles.cardContent}>
            <span className={`${styles.cardBadge} ${styles.cardBadgeHot}`}>인기</span>
            <div className={styles.cardTitle}>보안컨설팅파트너스</div>
            <div className={styles.cardCompany}>정보보호 전문 · 12년 경력</div>
            <div className={styles.cardTags}>
              <span className={styles.cardTag}>맞춤형</span>
              <span className={styles.cardTag}>사후관리</span>
            </div>
            <div className={styles.cardFooter}>
              <div className={styles.cardPrice}>4,200만원~</div>
              <div className={styles.cardRating}>
                <span className={styles.star}>★</span>
                <span>5.0 (94)</span>
              </div>
            </div>
          </div>
        </div>
        
        <div className={styles.card}>
          <div className={styles.cardContent}>
            <span className={styles.cardBadge}>할인</span>
            <div className={styles.cardTitle}>㈜품질인증코리아</div>
            <div className={styles.cardCompany}>제품인증 전문 · 10년 경력</div>
            <div className={styles.cardTags}>
              <span className={styles.cardTag}>GS인증</span>
              <span className={styles.cardTag}>KC인증</span>
            </div>
            <div className={styles.cardFooter}>
              <div className={styles.cardPrice}>2,800만원~</div>
              <div className={styles.cardRating}>
                <span className={styles.star}>★</span>
                <span>4.6 (41)</span>
              </div>
            </div>
          </div>
        </div>
        
        <div className={styles.card}>
          <div className={styles.cardContent}>
            <span className={styles.cardBadge}>추천</span>
            <div className={styles.cardTitle}>㈜디지털보안솔루션</div>
            <div className={styles.cardCompany}>솔루션+컨설팅 · 8년 경력</div>
            <div className={styles.cardTags}>
              <span className={styles.cardTag}>자동화</span>
              <span className={styles.cardTag}>24/7지원</span>
            </div>
            <div className={styles.cardFooter}>
              <div className={styles.cardPrice}>3,800만원~</div>
              <div className={styles.cardRating}>
                <span className={styles.star}>★</span>
                <span>4.8 (56)</span>
              </div>
            </div>
          </div>
        </div>
        
        <div className={styles.card}>
          <div className={styles.cardContent}>
            <span className={`${styles.cardBadge} ${styles.cardBadgeNew}`}>신규</span>
            <div className={styles.cardTitle}>메디컬인증파트너</div>
            <div className={styles.cardCompany}>의료정보보호 전문 · 6년 경력</div>
            <div className={styles.cardTags}>
              <span className={styles.cardTag}>병원</span>
              <span className={styles.cardTag}>의료기기</span>
            </div>
            <div className={styles.cardFooter}>
              <div className={styles.cardPrice}>2,500만원~</div>
              <div className={styles.cardRating}>
                <span className={styles.star}>★</span>
                <span>4.5 (33)</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}