'use client';

import { useState, useEffect } from 'react';
import styles from './page.module.css';
import Jobs from './jobs/page';
import Consultants from './consultants/page';
import Education from './education/page';
import Notices from './notices/page';

export default function Home() {
  const [activeTab, setActiveTab] = useState('jobs');
  const [currentSlide, setCurrentSlide] = useState(0);

  // Banner data
  const banners = [
    {
      id: 1,
      title: "🎉 2025년 정부지원 인증 프로그램",
      desc: "최대 70% 지원금으로 인증 비용 절감 혜택을 받으세요",
      button: "자세히 보기",
      gradient: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)"
    },
    {
      id: 2,
      title: "🏆 ISMS-P 전문가 양성 과정",
      desc: "실무 중심의 맞춤형 교육으로 전문가로 성장하세요",
      button: "과정 신청",
      gradient: "linear-gradient(135deg, #f093fb 0%, #f5576c 100%)"
    },
    {
      id: 3,
      title: "🔒 정보보호 컨설팅 바우처",
      desc: "기업 맞춤형 보안 솔루션 지원, 최대 50% 할인",
      button: "지원 신청",
      gradient: "linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)"
    },
    {
      id: 4,
      title: "🌟 글로벌 인증 전문가",
      desc: "ISO 27001, GDPR 등 해외 인증 성공률 98%",
      button: "상담하기",
      gradient: "linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)"
    }
  ];

  // Auto slide banner
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % banners.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [banners.length]);

  return (
    <div className={styles.appContent}>
      {/* Search Section */}
      <div className={styles.searchSection}>
        <h1 className={styles.searchTitle}>인증도 스마트하게, CertMatch와 함께</h1>
        <div className={styles.searchBar}>
          <input 
            type="text" 
            className={styles.searchInput} 
            placeholder="컨설턴트, 교육과정, 인증 검색..." 
          />
          <button className={styles.searchButton}>검색</button>
        </div>
        <div className={styles.quickFilters}>
          <div className={`${styles.filterChip} ${styles.filterChipActive}`}>전체</div>
          <div className={styles.filterChip}>ISMS-P</div>
          <div className={styles.filterChip}>ISO 27001</div>
          <div className={styles.filterChip}>GS 인증</div>
          <div className={styles.filterChip}>CPPG</div>
          <div className={styles.filterChip}>정부지원</div>
        </div>
      </div>

      {/* Banner Carousel */}
      <div className={styles.bannerCarousel}>
        <div className={styles.bannerContainer}>
          <div className={styles.bannerSlides} style={{ transform: `translateX(-${currentSlide * 100}%)` }}>
            {banners.map((banner, index) => (
              <div key={banner.id} className={`${styles.bannerSlide} ${index === currentSlide ? styles.bannerSlideActive : ''}`}>
                <div 
                  className={styles.bannerContent} 
                  style={{ background: banner.gradient }}
                >
                  <h2 className={styles.bannerTitle}>{banner.title}</h2>
                  <p className={styles.bannerDesc}>{banner.desc}</p>
                  <button className={styles.bannerButton}>{banner.button}</button>
                </div>
              </div>
            ))}
          </div>
        </div>
        
        {/* Banner Navigation Dots */}
        <div className={styles.bannerDots}>
          {banners.map((_, index) => (
            <span 
              key={index}
              className={`${styles.bannerDot} ${index === currentSlide ? styles.bannerDotActive : ''}`}
              onClick={() => setCurrentSlide(index)}
            ></span>
          ))}
        </div>
      </div>

      {/* Tab Container */}
      <div className={styles.tabContainer}>
        <div className={styles.tabNav}>
          <button 
            className={`${styles.tabButton} ${activeTab === 'jobs' ? styles.tabButtonActive : ''}`}
            onClick={() => setActiveTab('jobs')}
          >
            컨설팅 및 인력 모집
          </button>
          <button 
            className={`${styles.tabButton} ${activeTab === 'consultants' ? styles.tabButtonActive : ''}`}
            onClick={() => setActiveTab('consultants')}
          >
            전문가 매칭
          </button>
          <button 
            className={`${styles.tabButton} ${activeTab === 'education' ? styles.tabButtonActive : ''}`}
            onClick={() => setActiveTab('education')}
          >
            교육
          </button>
          <button 
            className={`${styles.tabButton} ${activeTab === 'notices' ? styles.tabButtonActive : ''}`}
            onClick={() => setActiveTab('notices')}
          >
            공지사항 및 뉴스
          </button>
        </div>

        {/* Tab Content */}
        {activeTab === 'jobs' && <Jobs />}
        {activeTab === 'consultants' && <Consultants />}
        {activeTab === 'education' && <Education />}
        {activeTab === 'notices' && <Notices />}
      </div>
    </div>
  );
}