import React, { useState, useRef, useEffect } from 'react';
import { View, Text, ScrollView, TextInput, TouchableOpacity, Dimensions, FlatList } from 'react-native';
import { FontAwesome5 } from '@expo/vector-icons';
import { styles } from './styles/styles';
import { consultants, courses, notices, type Consultant, type Course } from './data/homeData';
import JobsTab from './subform/JobsTab';
import ConsultantsTab from './subform/ConsultantsTab';
import EducationTab from './subform/EducationTab';
import NoticeNewsTab from './subform/NoticeNewsTab';

const { width } = Dimensions.get('window');

// 배너 데이터
const banners = [
  { title: '🎉 2025년 정부지원 인증 프로그램', desc: '최대 70% 지원금으로 인증 비용 절감 혜택을 받으세요', cta: '자세히 보기' },
  { title: '🏆 ISMS-P 전문가 양성 과정', desc: '실무 중심의 맞춤형 교육으로 전문가로 성장하세요', cta: '과정 신청' },
  { title: '🔒 정보보호 컨설팅 바우처', desc: '기업 맞춤형 보안 솔루션 지원, 최대 50% 할인', cta: '지원 신청' },
  { title: '🌟 글로벌 인증 전문가', desc: 'ISO 27001, GDPR 등 해외 인증 성공률 98%', cta: '상담하기' },
];

// 샘플 데이터 (mokup 기반)
const urgentRecruitments = [
  { badge: '🔥 긴급 모집', title: '정보보호 담당자 (ISMS-P 경험 필수)', company: '㈜테크솔루션 · 서울 강남구', price: '5,000만원~', deadline: '~02.28' },
  { badge: '⚡ 즉시 채용', title: '클라우드 보안 전문가 (AWS/Azure)', company: '㈜클라우드테크 · 서울 강남구', price: '6,000만원~', deadline: '~02.25' },
  { badge: '🚀 긴급', title: '개인정보보호 담당자 (PIMS 경험자)', company: '㈜핀테크코리아 · 서울 여의도', price: '5,500만원~', deadline: '~03.10' },
  { badge: '🔥 특채', title: 'GS 인증 전문가 (소프트웨어 품질)', company: '㈜디지털이노베이션 · 경기 판교', price: '4,200만원~', deadline: '~02.15' },
  { badge: '⚡ 즉시', title: '정보보호 컨설턴트 (프리랜서)', company: '㈜보안솔루션 · 서울 서초구', price: '일 300만원', deadline: '~03.31' },
];

const generalJobs = [
  { badge: '신규', badgeType: 'new', title: 'ISO 27001 Lead Auditor 심사원', company: '한국품질인증원 · 경기 성남시', tags: ['경력무관', '계약직'], price: '협의', deadline: '~03.15' },
  { badge: '인기', badgeType: 'hot', title: '정보보호 관리자 (CISO 후보)', company: '㈜데이터시큐리티 · 서울 판교', tags: ['경력 7년↑', '정규직'], price: '8,000만원~', deadline: '~03.20' },
  { badge: '추천', badgeType: 'default', title: '네트워크 보안 전문가', company: '㈜인프라보안 · 경기 분당', tags: ['경력 3년↑', '정규직'], price: '4,500만원~', deadline: '~03.25' },
  { badge: '신규', badgeType: 'new', title: '애플리케이션 보안 엔지니어', company: '㈜앱시큐어 · 서울 강남구', tags: ['경력 2년↑', '정규직'], price: '4,800만원~', deadline: '~03.30' },
  { badge: '추천', badgeType: 'default', title: '데이터베이스 보안 관리자', company: '㈜DB보안솔루션 · 경기 판교', tags: ['경력 4년↑', '정규직'], price: '5,200만원~', deadline: '~04.05' },
  { badge: '인기', badgeType: 'hot', title: '정보보호 컨설턴트 (주니어)', company: '㈜시큐리티파트너스 · 서울 서초구', tags: ['경력 1년↑', '정규직'], price: '3,800만원~', deadline: '~04.10' },
  { badge: '신규', badgeType: 'new', title: '사이버 위협 분석가', company: '㈜위트레킹 · 서울 강남구', tags: ['경력 3년↑', '정규직'], price: '5,500만원~', deadline: '~04.15' },
  { badge: '추천', badgeType: 'default', title: '보안 솔루션 아키텍트', company: '㈜솔루션아키텍트 · 경기 성남', tags: ['경력 5년↑', '정규직'], price: '7,000만원~', deadline: '~04.20' },
];

export const HomeScreen: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'jobs' | 'consultants' | 'education' | 'notices'>('jobs');
  const [activeFilter, setActiveFilter] = useState<string>('전체');
  const [bannerIndex, setBannerIndex] = useState<number>(0);
  const bannerRef = useRef<ScrollView>(null);

  // 배너 자동 슬라이드
  useEffect(() => {
    const id = setInterval(() => {
      setBannerIndex((prev) => {
        const next = (prev + 1) % banners.length;
        bannerRef.current?.scrollTo({ x: next * width, animated: true });
        return next;
      });
    }, 4000);
    return () => clearInterval(id);
  }, []);

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {/* Search Section */}
      <View style={styles.searchSection}>
        <Text style={styles.searchTitle}>인증도 스마트하게, CertMatch와 함께</Text>
        <View style={styles.searchBar}>
          <TextInput placeholder="컨설턴트, 교육과정, 인증 검색..." style={styles.searchInput} />
          <TouchableOpacity style={styles.searchButton}>
            <Text style={styles.searchButtonText}>검색</Text>
          </TouchableOpacity>
        </View>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.filters}>
          {['전체','ISMS-P','ISO 27001','GS 인증','CPPG','정부지원'].map((f, i) => (
            <TouchableOpacity key={i} style={[styles.chip, activeFilter===f && styles.chipActive]} onPress={() => setActiveFilter(f)}>
              <Text style={[styles.chipText, activeFilter===f && styles.chipTextActive]}>{f}</Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>

      {/* Banner Carousel */}
      <ScrollView
        ref={bannerRef}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        style={styles.bannerCarousel}
        onScroll={(e) => {
          const idx = Math.round(e.nativeEvent.contentOffset.x / width);
          if (idx !== bannerIndex) setBannerIndex(idx);
        }}
        scrollEventThrottle={16}
      >
        {banners.map((b, i) => (
          <View key={i} style={styles.bannerSlide}>
            <View style={styles.bannerContent}>
              <Text style={styles.bannerTitle}>{b.title}</Text>
              <Text style={styles.bannerDesc}>{b.desc}</Text>
              <TouchableOpacity style={styles.bannerButton}>
                <Text style={styles.bannerButtonText}>{b.cta}</Text>
              </TouchableOpacity>
            </View>
          </View>
        ))}
      </ScrollView>
      <View style={styles.bannerDots}>
        {[0,1,2,3].map((i) => (
          <TouchableOpacity
            key={i}
            style={[styles.bannerDot, bannerIndex===i && styles.bannerDotActive]}
            onPress={() => bannerRef.current?.scrollTo({ x: i * width, animated: true })}
          />
        ))}
      </View>

      {/* Tabs */}
      <View style={styles.tabNav}>
        {[
          { key: 'jobs', label: '컨설팅 및 인력 모집', icon: 'briefcase' },
          { key: 'consultants', label: '전문가 매칭', icon: 'user-tie' },
          { key: 'education', label: '교육', icon: 'graduation-cap' },
          { key: 'notices', label: '공지사항 및 뉴스', icon: 'bullhorn' },
        ].map((t) => (
          <TouchableOpacity key={t.key} style={[styles.tabButton, activeTab===t.key && styles.tabButtonActive]} onPress={() => setActiveTab(t.key as any)}>
            <FontAwesome5 name={t.icon as any} size={14} color={activeTab===t.key ? '#fff' : '#333'} />
            <Text style={[styles.tabButtonText, activeTab===t.key && styles.tabButtonTextActive]}>{t.label}</Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* Tab Content (expanded) */}
      <View style={styles.tabContent}>
        {activeTab==='jobs' && (
          <JobsTab />
        )}
        {activeTab==='consultants' && (
          <ConsultantsTab />
        )}
        {activeTab==='education' && (
          <EducationTab />
        )}
        {activeTab==='notices' && (
          <NoticeNewsTab />
        )}
      </View>
    </ScrollView>
  );
};

const SectionTitle = ({ icon, title }: { icon: any; title: string }) => (
  <View style={styles.sectionTitle}>
    <FontAwesome5 name={icon} size={16} color="#d32f2f" />
    <Text style={styles.sectionTitleText}>{title}</Text>
  </View>
);

const Placeholder = ({ text }: { text: string }) => (
  <View style={styles.placeholder}>
    <Text style={styles.placeholderText}>{text}</Text>
  </View>
);

const UrgentCard = ({ badge, title, company, price, deadline }: { badge: string; title: string; company: string; price: string; deadline: string }) => (
  <View style={styles.urgentCard}>
    <Text style={styles.cardBadge}>{badge}</Text>
    <Text style={styles.cardTitle}>{title}</Text>
    <Text style={styles.cardCompany}>{company}</Text>
    <View style={styles.cardFooter}>
      <Text style={styles.cardPrice}>{price}</Text>
      <Text style={styles.cardDeadline}>{deadline}</Text>
    </View>
  </View>
);

const JobCard = ({ badge, badgeType, title, company, tags, price, deadline }: { badge: string; badgeType: 'new' | 'hot' | 'default'; title: string; company: string; tags: string[]; price: string; deadline: string }) => (
  <View style={styles.jobCard}>
    <View style={[styles.jobBadge, badgeType==='new' && styles.jobBadgeNew, badgeType==='hot' && styles.jobBadgeHot]}>
      <Text style={styles.jobBadgeText}>{badge}</Text>
    </View>
    <Text style={styles.jobTitle}>{title}</Text>
    <Text style={styles.jobCompany}>{company}</Text>
    <View style={styles.tagRow}>
      {tags.map((t, i) => (
        <View key={i} style={styles.tagChip}><Text style={styles.tagText}>{t}</Text></View>
      ))}
    </View>
    <View style={styles.cardFooter}>
      <Text style={styles.cardPrice}>{price}</Text>
      <Text style={styles.cardDeadline}>{deadline}</Text>
    </View>
  </View>
);

const ConsultantCard = ({ name, title, expertise, rating, location }: { name: string; title: string; expertise: string[]; rating: number; location: string }) => (
  <View style={styles.consultantCard}>
    <View style={styles.consultantHeader}>
      <FontAwesome5 name="user-tie" size={16} color="#2d89ef" />
      <View style={{ marginLeft: 8 }}>
        <Text style={styles.consultantName}>{name}</Text>
        <Text style={styles.consultantTitle}>{title} · {location}</Text>
      </View>
    </View>
    <View style={styles.expertiseRow}>
      {expertise.map((e, i) => (
        <View key={i} style={styles.expertiseChip}><Text style={styles.expertiseText}>{e}</Text></View>
      ))}
    </View>
    <View style={styles.ratingRow}>
      <FontAwesome5 name="star" size={14} color="#f5a623" />
      <Text style={styles.ratingText}>{rating.toFixed(1)}</Text>
    </View>
  </View>
);

const EducationCard = ({ title, provider, period, price, tags }: { title: string; provider: string; period: string; price: string; tags: string[] }) => (
  <View style={styles.eduCard}>
    <Text style={styles.eduTitle}>{title}</Text>
    <Text style={styles.eduProvider}>{provider}</Text>
    <View style={styles.courseMetaRow}>
      <Text>{period}</Text>
      <Text style={{ fontWeight: '700' }}>{price}</Text>
    </View>
    <View style={styles.courseTagRow}>
      {tags.map((t, i) => (
        <View key={i} style={styles.courseTagChip}><Text style={styles.courseTagText}>{t}</Text></View>
      ))}
    </View>
  </View>
);

const NoticeItem = ({ title, category, date }: { title: string; category: string; date: string }) => (
  <View style={styles.noticeItem}>
    <Text style={styles.noticeTitle}>{title}</Text>
    <View style={styles.noticeMeta}>
      <Text style={styles.noticeCategory}>{category}</Text>
      <Text style={styles.noticeDate}>{date}</Text>
    </View>
  </View>
);
/* styles moved to external file */