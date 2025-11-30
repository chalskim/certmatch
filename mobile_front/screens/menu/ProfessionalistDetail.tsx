import React, { useMemo, useState } from 'react';
import { View, Text, ScrollView, Image, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import SubformHeader from '../components/SubformHeader';
import { styles } from '../styles/menu/ProfessionalistDetail';
import { Images } from '../../assets/index';

type TabKey = 'about' | 'experience' | 'services' | 'projects' | 'reviews';

type TimelineItem = {
  period: string;
  title: string;
  company: string;
  description: string;
};

type ServiceItem = {
  title: string;
  icon?: keyof typeof Ionicons.glyphMap; // Ionicons 아이콘 이름 타입
  description: string;
};

type ProjectItem = {
  title: string;
  client: string;
  image: string;
  tags: string[];
  result: string;
};

type ReviewItem = {
  reviewer: string;
  avatarText?: string;
  rating: number; // 1-5
  date: string;
  comment: string;
};

// Ionicons 타입 경고 회피용 안전한 래퍼 (런타임엔 동일하게 렌더링)
const Icon: React.FC<any> = (props) => React.createElement(Ionicons as any, props);

const ProfessionalistDetail: React.FC = () => {
  const navigation = useNavigation<any>();
  const [activeTab, setActiveTab] = useState<TabKey>('about');

  // 데모 프로필 데이터 (모크업 기반)
  const profile = useMemo(
    () => ({
      name: '김민수 컨설턴트',
      title: 'ISMS-P 전문가 · 15년 경력',
      // 로컬 아바타 이미지로 교체
      avatar: Images.expertKim,
      badges: ['매칭률 95%', 'ISMS-P 심사원', 'ISO 27001 Lead Auditor', '베테랑'],
      available: true,
      priceDisplay: '₩ 150,000 / 시간',
      stats: [
        { label: '총 프로젝트', value: '120' },
        { label: '평균 평점', value: '4.8' },
        { label: '응답 시간', value: '1시간 이내' },
      ],
    }),
    []
  );

  const expertiseTags = [
    'ISMS-P',
    'ISO 27001',
    '개인정보보호',
    '정보보호 관리체계',
    '취약점 분석',
    '보안 교육',
    '클라우드 보안',
    '금융 보안',
  ];

  const experiences: TimelineItem[] = [
    {
      period: '2018 - 현재',
      title: '수석 컨설턴트',
      company: '㈜시큐리티파트너스',
      description: '금융 및 의료 분야 중심의 ISMS-P, 개인정보보호 컨설팅 총괄. 50개 이상 기업의 인증 취득 성공.',
    },
    {
      period: '2014 - 2018',
      title: '정보보호 컨설턴트',
      company: '㈜디지털보안솔루션',
      description: '중소기업 대상 정보보호 컨설팅 및 보안 솔루션 구축 지원. 정부 지원 사업 참여.',
    },
    {
      period: '2010 - 2014',
      title: '정보보호 담당자',
      company: '스타트업 A',
      description: '내부 보안 정책 수립, 보안 인프라 구축 및 운영.',
    },
  ];

  const services: ServiceItem[] = [
    {
      title: 'ISMS-P 인증 컨설팅',
      icon: 'shield-checkmark',
      description: '사전 진단부터 문서화, 보안 통제 구현, 심사 대응까지 풀패키지 제공.',
    },
    {
      title: '개인정보보호 거버넌스 구축',
      icon: 'lock-closed',
      description: '개인정보 처리 단계별 리스크 분석 및 보호대책 수립, 교육과 점검 체계 제공.',
    },
    {
      title: '취약점 진단 및 모의해킹',
      icon: 'bug',
      description: '웹/모바일/인프라 취약점 진단과 개선 가이드, 재진단까지 포함.',
    },
  ];

  const projects: ProjectItem[] = [
    {
      title: '금융사 ISMS-P 인증 획득',
      client: 'K-Finance',
      // 로컬 프로젝트 이미지로 교체
      image: Images.project1 as any,
      tags: ['ISMS-P', '금융', '리스크 관리'],
      result: '인증 취득 및 내부 보안 수준 향상',
    },
    {
      title: '의료기관 개인정보 보호 체계 개선',
      client: 'M-Medical',
      image: Images.project2 as any,
      tags: ['개인정보보호', '의료', '교육'],
      result: '민감정보 보호 강화 및 내부 교육 체계 정착',
    },
  ];

  const reviews: ReviewItem[] = [
    {
      reviewer: '박지훈',
      avatarText: 'PJ',
      rating: 5,
      date: '2024-08-12',
      comment: '프로젝트 진행이 매우 체계적이고 커뮤니케이션이 훌륭했습니다. 재협업 의사 100%입니다.',
    },
    {
      reviewer: '이서연',
      avatarText: 'LS',
      rating: 4,
      date: '2024-06-28',
      comment: 'ISMS-P 인증 준비에 큰 도움이 되었어요. 문서화와 심사 대응 가이드가 특히 유용했습니다.',
    },
  ];

  const renderTabButton = (key: TabKey, label: string) => (
    <TouchableOpacity
      key={key}
      onPress={() => setActiveTab(key)}
      style={[styles.tabButton, activeTab === key && styles.tabButtonActive]}
      accessibilityRole="button"
    >
      <Text style={[styles.tabButtonText, activeTab === key && styles.tabButtonTextActive]}>{label}</Text>
    </TouchableOpacity>
  );

  return (
    <View style={{ flex: 1 }}>
      {/* 상단 서브폼 헤더 */}
      <SubformHeader
        title="전문가 상세"
        showBack
        showHome
        navigation={navigation}
        onHome={() => navigation.navigate('Home')}
      />

      <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer} nativeID="professionalist-detail">
        {/* 헤더 */}
        <View style={styles.header} nativeID="expert-header">
          {/* Breadcrumb at top of the first card */}
          <View style={styles.breadcrumb} nativeID="expert-breadcrumb">
            <Text style={styles.breadcrumbText}>홈</Text>
            <Text style={styles.breadcrumbDivider}>{'>'}</Text>
            <Text style={styles.breadcrumbText}>전문가 소개</Text>
            <Text style={styles.breadcrumbDivider}>{'>'}</Text>
            <Text style={styles.breadcrumbText}>전문가 상세</Text>
          </View>
          <View style={styles.headerRow}>
            <View style={styles.headerLeft}>
              {/* 프로필 아바타 (로컬/URL 모두 지원) */}
              <Image
                source={typeof profile.avatar === 'string' ? { uri: profile.avatar } : (profile.avatar as any)}
                style={styles.avatar}
              />
              <View style={styles.titleInfo}>
                <Text style={styles.titleName}>{profile.name}</Text>
                <Text style={styles.titleRole}>{profile.title}</Text>
                <View style={styles.badges}>
                  {profile.badges.map((b) => (
                    <View key={b} style={styles.badge}><Text style={styles.badgeText}>{b}</Text></View>
                  ))}
                </View>
                <View style={styles.actions}>
                  <TouchableOpacity style={styles.btnPrimary} accessibilityRole="button">
                    <Icon name="calendar-outline" size={20} color="#fff" style={styles.btnIcon} />
                    <Text style={styles.btnPrimaryText}>컨설팅 신청</Text>
                  </TouchableOpacity>
                  <TouchableOpacity style={styles.btnSecondary} accessibilityRole="button">
                    <Icon name="bookmark-outline" size={20} color={colors.primary} style={styles.btnIcon} />
                    <Text style={styles.btnSecondaryText}>저장</Text>
                  </TouchableOpacity>
                  <TouchableOpacity style={styles.btnSecondaryOutline} accessibilityRole="button">
                    <Icon name="share-outline" size={20} color="#6c757d" style={styles.btnIcon} />
                    <Text style={styles.btnSecondaryOutlineText}>공유</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
            <View style={styles.headerRight}>
              <View style={[styles.statusBadge, profile.available ? styles.statusAvailable : styles.statusBusy]}>
                <Icon name={profile.available ? 'checkmark-circle' : 'alert-circle'} size={18} color={profile.available ? colors.success : colors.warning} />
                <Text style={[styles.statusText, { color: profile.available ? colors.success : colors.warning }]}>
                  {profile.available ? '즉시 투입 가능' : '예약 필요'}
                </Text>
              </View>
            </View>
          </View>
        </View>

        {/* 전문 분야 태그 */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>전문 분야</Text>
          <View style={styles.tagsWrap}>
            {expertiseTags.map((tag) => (
              <View key={tag} style={styles.tag}><Text style={styles.tagText}>{tag}</Text></View>
            ))}
          </View>
        </View>

        {/* 탭 네비게이션 */}
        <View style={styles.tabsContainer} nativeID="tabs-container">
          <View style={styles.tabsBar}>
            {renderTabButton('about', '소개')}
            {renderTabButton('experience', '경력')}
            {renderTabButton('services', '서비스')}
            {renderTabButton('projects', '성공사례')}
            {renderTabButton('reviews', '후기')}
          </View>
        </View>

        {/* 탭 콘텐츠 */}
        {activeTab === 'about' && (
          <View style={styles.section} nativeID="about-section">
            <Text style={styles.sectionTitle}>전문가 소개</Text>
            <Text style={styles.paragraph}>
              안녕하세요, 정보보호 컨설턴트 {profile.name}입니다. 지난 15년간 정보보호 분야에서 다양한 기업의 인증 취득과 보안 강화를 도와왔습니다.
              특히 금융과 의료 분야에서의 ISMS-P 및 개인정보보호 인증 경험이 풍부합니다.
            </Text>
            <Text style={styles.paragraph}>
              단순한 인증 취득을 넘어, 기업의 실제 비즈니스 환경에 맞는 정보보호 체계를 구축하고 유지보수하는 데 중점을 두고 있습니다.
              최신 보안 위협 트렌드를 반영한 실용적인 솔루션을 제공하며, 고객사의 정보보호 수준을 한 단계 끌어올리는 것을 목표로 합니다.
            </Text>
            <Text style={styles.paragraph}>
              저와 함께한다면, 복잡한 정보보호 규정과 기술적 요구사항을 명확하게 이해하고 체계적으로 대응할 수 있습니다.
              고객사의 성공적인 인증 취득과 지속적인 보안 강화를 위해 최선을 다하겠습니다.
            </Text>
          </View>
        )}

        {activeTab === 'experience' && (
          <View style={styles.section} nativeID="experience-section">
            <Text style={styles.sectionTitle}>경력 사항</Text>
            <View style={styles.timeline}>
              {experiences.map((ex, idx) => (
                <View key={`${ex.title}-${idx}`} style={styles.timelineItem}>
                  <Text style={styles.timelineDate}>{ex.period}</Text>
                  <Text style={styles.timelineTitle}>{ex.title}</Text>
                  <Text style={styles.timelineCompany}>{ex.company}</Text>
                  <Text style={styles.timelineDesc}>{ex.description}</Text>
                </View>
              ))}
            </View>
          </View>
        )}

        {activeTab === 'services' && (
          <View style={styles.section} nativeID="services-section">
            <Text style={styles.sectionTitle}>서비스</Text>
            {services.map((svc, idx) => (
              <View key={`${svc.title}-${idx}`} style={styles.serviceCard}>
                <View style={styles.serviceTitleRow}>
                  <Icon name={svc.icon ?? 'construct'} size={20} color={colors.primary} style={styles.serviceIcon} />
                  <Text style={styles.serviceTitle}>{svc.title}</Text>
                </View>
                <Text style={styles.serviceDesc}>{svc.description}</Text>
              </View>
            ))}
          </View>
        )}

        {activeTab === 'projects' && (
          <View style={styles.section} nativeID="projects-section">
            <Text style={styles.sectionTitle}>성공사례</Text>
            {projects.map((p, idx) => (
              <View key={`${p.title}-${idx}`} style={styles.projectCard}>
                {/* 프로젝트 이미지 (로컬/URL 모두 지원) */}
                <Image
                  source={typeof p.image === 'string' ? { uri: p.image } : (p.image as any)}
                  style={styles.projectImage}
                />
                <View style={styles.projectContent}>
                  <Text style={styles.projectTitle}>{p.title}</Text>
                  <Text style={styles.projectClient}>{p.client}</Text>
                  <View style={styles.projectTags}>
                    {p.tags.map((t) => (
                      <View key={t} style={styles.projectTag}><Text style={styles.projectTagText}>{t}</Text></View>
                    ))}
                  </View>
                  <View style={styles.projectResult}><Text style={styles.projectResultText}>{p.result}</Text></View>
                </View>
              </View>
            ))}
          </View>
        )}

        {activeTab === 'reviews' && (
          <View style={styles.section} nativeID="reviews-section">
            <Text style={styles.sectionTitle}>후기</Text>
            {reviews.map((r, idx) => (
              <View key={`${r.reviewer}-${idx}`} style={styles.reviewCard}>
                <View style={styles.reviewHeader}>
                  <View style={styles.reviewerInfo}>
                    <View style={styles.reviewerAvatar}><Text style={styles.reviewerAvatarText}>{r.avatarText ?? 'RV'}</Text></View>
                    <View>
                      <Text style={styles.reviewerName}>{r.reviewer}</Text>
                      <Text style={styles.reviewDate}>{r.date}</Text>
                    </View>
                  </View>
                  <View style={styles.reviewRatingRow}>
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Icon
                        key={i}
                        name={i < r.rating ? 'star' : 'star-outline'}
                        size={18}
                        color="#ffc107"
                        style={{ marginHorizontal: 1 }}
                      />
                    ))}
                  </View>
                </View>
                <Text style={styles.reviewComment}>{r.comment}</Text>
              </View>
            ))}
          </View>
        )}
      </ScrollView>
    </View>
  );
};

const colors = {
  primary: '#4a6cf7',
  secondary: '#f5f7ff',
  success: '#28a745',
  warning: '#ffc107',
  text: '#333',
  lightGray: '#f8f9fa',
  border: '#e9ecef',
};

export default ProfessionalistDetail;