import React, { useMemo, useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  Image,
  TouchableOpacity,
  Modal,
  TextInput,
  StyleSheet,
} from 'react-native';
import type { ImageStyle } from 'react-native';
import { FontAwesome5 } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import SubformHeader from '../components/SubformHeader';
import {styles, colors} from '../styles/menu/EduListDetail';

type TabKey = 'overview' | 'instructor' | 'benefits' | 'reviews';


const EduListDetail: React.FC = () => {
  const navigation = useNavigation<any>();
  const [activeTab, setActiveTab] = useState<TabKey>('overview');
  const [bookmark, setBookmark] = useState(false);
  const [expanded, setExpanded] = useState<Record<number, boolean>>({ 1: true });
  const [enrollVisible, setEnrollVisible] = useState(false);

  const header = useMemo(
    () => ({
      provider: 'KISA',
      title: 'ISMS-P 심사원 기본과정',
      subtitle: '한국정보통신진흥협회 · 40시간',
      badges: [
        { label: '신규', type: 'new' as const },
        { label: '인기', type: 'popular' as const },
        { label: '온라인', type: 'default' as const },
        { label: '자격증', type: 'default' as const },
      ],
      rating: 4.8,
      ratingCount: 156,
      // 로컬 이미지로 교체
      hero: require('../../assets/icon/isms-course-hero.jpg'),
    }),
    []
  );

  const modules = [
    {
      title: '1부: 정보보호관리체계 기초 (8시간)',
      lessons: [
        '정보보호 관리체계의 개념과 필요성',
        'ISMS-P 인증 제도 현황 및 법적 근거',
        '정보보호 기본법 및 관련 법규 해설',
        '퀴즈: 기초 지식 확인',
      ],
    },
    {
      title: '2부: ISMS-P 심사 기준 (12시간)',
      lessons: [
        'ISMS-P 심사 기준 총괄',
        '관리적 통제 항목 심층 분석',
        '기술적 통제 항목 심층 분석',
        '물리적 통제 항목 심층 분석',
        '그룹별 심사 기준 적용 사례 토론',
      ],
    },
    {
      title: '3부: 심사 절차 및 실무 (10시간)',
      lessons: [
        'ISMS-P 심사 절차 및 프로세스',
        '심사 계획서 및 체크리스트 작성법',
        '현장 심사 기법 및 비합리 사항 확인',
        '심사 보고서 작성 및 심사결과 통보',
        '실무 시뮬레이션: 가상 심사 수행',
      ],
    },
    {
      title: '4부: 최종 평가 및 시험 준비 (10시간)',
      lessons: [
        '심사원 자격 시험 출제 경향 분석',
        '기출문제 풀이 및 해설',
        '모의고사 및 개별 피드백',
        '최종 프로젝트 발표 및 평가',
      ],
    },
  ];

  const instructors = [
    {
      name: '박철수 수석연구원',
      org: '한국인터넷진흥원 정보보호진흥팀',
      desc: 'ISMS-P 제도 기획 및 심사 기준 개발 총괄. 정보보호 분야 20년 경력. 저서 「정보보호관리체계 구축 가이드」。',
      // 로컬 아바타 이미지로 교체
      avatar: require('../../assets/icon/instructor1.jpg'),
      badges: ['ISMS-P 심사원', 'CISSP', '정보보호전문가'],
    },
    {
      name: '이영희 교수',
      org: '한국정보보호학회 부회장',
      desc: '한국대학교 정보보호학과 교수. 정보보호 정책 및 법규 전문가. 다수 정부 기관 자문위원 역임.',
      avatar: require('../../assets/icon/instructor2.jpg'),
      badges: ['법학박사', '개인정보보호전문가'],
    },
    {
      name: '김민준 수석컨설턴트',
      org: '㈜시큐리티파트너스',
      desc: '대기업 및 공공기관 ISMS-P 인증 컨설팅 100건 이상 수행. 실무 중심의 생생한 사례 중심 강의.',
      avatar: require('../../assets/icon/instructor3.jpg'),
      badges: ['ISO 27001 LA', 'PIMS 전문가'],
    },
  ];

  const benefits = [
    { icon: 'award', title: '공식 수료증 발급', desc: '한국인터넷진흥원장 명의의 공식 수료증 발급. ISMS-P 심사원 자격 시험 응시 자격 부여.' },
    { icon: 'book', title: '최신 교육 자료 제공', desc: '강의 녹화 영상, 교재, 기출문제집, 심사 체크리스트 등 디지털 자료 무제한 제공.' },
    { icon: 'users', title: '전문가 네트워크 가입', desc: '수강생 전용 커뮤니티 가입. 동기 및 선배 전문가들과의 네트워킹 기회 제공.' },
    { icon: 'headset', title: '수강 후 지원 프로그램', desc: '수료 후 1년간 취업 지원, 자문 Q&A, 재수강 할인 등 추가 혜택 제공.' },
    { icon: 'building', title: '인증 기관 연계', desc: '우수 수강생 인증 기관 추천 및 인턴십 기회 제공. 실무 경험 축적 지원.' },
  ];

  const reviews = [
    {
      avatarText: '김',
      name: '김정민 수강생',
      sub: '2024년 11월 수료',
      rating: 5,
      content:
        '정보보호 분야로 전직을 준비하며 고민하다가 수강하게 되었습니다. 이론과 실무의 균형이 잘 잡힌 커리큘럼 덕분에 취업 후에도 바로 업무에 적용할 수 있었습니다. 특히 실무 경험이 풍부한 강사님들의 생생한 사례 설명이 가장 인상 깊었습니다. 덕분에 무사히 심사원 시험에 합격했네요!',
    },
    {
      avatarText: '이',
      name: '이현우 정보보호팀장',
      sub: '㈜데이터솔루션',
      rating: 4.5,
      content:
        '기업 내 정보보호 관리자로 일하면서 체계적인 지식이 필요했는데, 이 과정이 큰 도움이 되었습니다. 특히 심사원의 관점에서 ISMS-P를 바라볼 수 있게 되어 내부 관리체계를 개선하는 데 많은 영감을 얻었습니다. 동료들에게도 적극 추천하고 있습니다.',
    },
    {
      avatarText: '박',
      name: '박지영 컨설턴트',
      sub: '㈜보안파트너스',
      rating: 5,
      content:
        '컨설팅 회사로 이직을 준비하며 자격증 취득이 필요했는데, 이 과정 덕분에 한 번에 합격할 수 있었습니다. 온라인 강의라 시간 활용이 자유로워 직장 다니면서도 부담 없이 수강할 수 있었던 점도 만족스러웠습니다. 교육 자료의 질도 매우 높아 지금도 업무보며 참고하고 있습니다.',
    },
  ];

  const relatedCourses = [
    { title: 'ISO 27001 Lead Auditor 과정', provider: '한국품질재단', price: '480만원' },
    { title: '정보보호 실무자 양성과정', provider: '한국능률협회', price: '250만원' },
    { title: '개인정보보호 전문가 과정', provider: 'KISA', price: '320만원' },
  ];

  const renderBreadcrumb = () => (
    <View style={styles.breadcrumb}>
      <Text style={styles.breadcrumbText}>홈</Text>
      <Text style={styles.breadcrumbDivider}>›</Text>
      <Text style={styles.breadcrumbText}>전문 교육</Text>
      <Text style={styles.breadcrumbDivider}>›</Text>
      <Text style={[styles.breadcrumbText, { color: colors.text }]}>교육 상세</Text>
    </View>
  );

  const renderStars = (value: number) => {
    const full = Math.floor(value);
    const half = value - full >= 0.5 ? 1 : 0;
    const empty = 5 - full - half;
    const stars: React.ReactNode[] = [];
    for (let i = 0; i < full; i++) stars.push(<FontAwesome5 key={`s-full-${i}`} name="star" size={16} color={colors.warning} style={styles.ratingStarIcon} />);
    if (half) stars.push(<FontAwesome5 key="s-half" name="star-half-alt" size={16} color={colors.warning} style={styles.ratingStarIcon} />);
    for (let i = 0; i < empty; i++) stars.push(<FontAwesome5 key={`s-empty-${i}`} name="star" size={16} color="#ddd" style={styles.ratingStarIcon} />);
    return <View style={styles.ratingRow}>{stars}</View>;
  };

  const toggleModule = (idx: number) => {
    setExpanded((prev) => ({ ...prev, [idx]: !prev[idx] }));
  };

  return (
    <View style={styles.root}>
      <SubformHeader title="전문 교육 상세" showBack showHome navigation={navigation} onHome={() => navigation.navigate('Home')} />

      <ScrollView style={styles.container}>
        {/* 헤더 카드 */}
        <View style={styles.headerCard}>
          {renderBreadcrumb()}
          <View style={styles.headerSplitRow}>
            <View style={styles.titleRow}>
              <View style={styles.courseTitleInfo}>
                <Text style={styles.titleH1}>{header.title}</Text>
                <Text style={styles.titleSub}>{header.subtitle}</Text>
                <View style={styles.badges}>
                  {header.badges.map((b, i) => (
                    <View
                      key={`${b.label}-${i}`}
                      style={[
                        styles.badge,
                        b.type === 'new'
                          ? styles.badgeNew
                          : b.type === 'popular'
                          ? styles.badgePopular
                          : styles.badgeDefault,
                      ]}
                    >
                      <Text
                        style={[
                          styles.badgeTextBase,
                          { color: b.type === 'new' ? colors.info : b.type === 'popular' ? colors.warning : '#555' },
                        ]}
                      >
                        {b.label}
                      </Text>
                    </View>
                  ))}
                </View>
                <View style={styles.actionsRow}>
                  <TouchableOpacity style={styles.btnPrimary} onPress={() => setEnrollVisible(true)}>
                    <FontAwesome5 name="cart-plus" size={18} color="#fff" style={styles.btnIcon} />
                    <Text style={styles.btnPrimaryText}>수강 신청</Text>
                  </TouchableOpacity>
                  <TouchableOpacity style={styles.btnOutline} onPress={() => setBookmark(!bookmark)}>
                    <FontAwesome5 name="bookmark" size={18} color={colors.primary} style={styles.btnIcon} />
                    <Text style={styles.btnOutlineText}>{bookmark ? '저장됨' : '저장'}</Text>
                  </TouchableOpacity>
                  <TouchableOpacity style={styles.btnSecondary} onPress={() => {}}>
                    <FontAwesome5 name="share-alt" size={18} color={colors.lightGray} style={styles.btnIcon} />
                    <Text style={styles.btnSecondaryText}>공유</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
            <View style={styles.ratingSummary}>
              <View style={styles.ratingRow}>
                {renderStars(header.rating)}
                <Text style={styles.ratingScore}>{header.rating.toFixed(1)}</Text>
                <Text style={styles.ratingCount}>( {header.ratingCount}개 후기 )</Text>
              </View>
            </View>
          </View>
        </View>

        {/* 히어로 이미지 (로컬/URL 모두 지원) */}
        <Image
          source={typeof header.hero === 'string' ? { uri: header.hero } : (header.hero as any)}
          style={styles.heroImage as ImageStyle}
        />

        {/* 수강료 카드 (메인 상단, 강사 소개 위) */}
        <View style={styles.tuitionCard}>
          <Text style={styles.sidebarTitle}>수강료</Text>
          <Text style={styles.priceDisplay}>350만원</Text>
          <Text style={styles.priceNote}>부가세 별도</Text>
          <TouchableOpacity style={[styles.btnPrimary, { justifyContent: 'center', marginBottom: 10 }]} onPress={() => setEnrollVisible(true)}>
            <FontAwesome5 name="cart-plus" size={18} color="#fff" style={styles.btnIcon} />
            <Text style={styles.btnPrimaryText}>수강 신청</Text>
          </TouchableOpacity>
          {/* 바로 결제하기 버튼 (수강 신청 하단) */}
          <TouchableOpacity
            style={[styles.btnOutline, { justifyContent: 'center' }]}
            onPress={() => {
              // TODO: 결제 플로우 연결 (예: 결제 페이지 또는 외부 결제 링크)
            }}
            accessibilityRole="button"
          >
            <FontAwesome5 name="credit-card" size={18} color={colors.primary} style={styles.btnIcon} />
            <Text style={styles.btnOutlineText}>바로 결제하기</Text>
          </TouchableOpacity>
        </View>

        {/* 탭 */}
        <View style={styles.tabsContainer}>
          <View style={styles.tabsBar}>
            {(['overview', 'instructor', 'benefits', 'reviews'] as TabKey[]).map((key) => (
              <TouchableOpacity
                key={key}
                onPress={() => setActiveTab(key)}
                style={[styles.tabButton, activeTab === key && styles.tabButtonActive]}
                accessibilityRole="button"
              >
                <Text style={[styles.tabButtonText, activeTab === key && styles.tabButtonTextActive]}>
                  {key === 'overview' && '개요'}
                  {key === 'instructor' && '강사 소개'}
                  {key === 'benefits' && '수강 혜택'}
                  {key === 'reviews' && '후기'}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* 탭 콘텐츠 */}
        {activeTab === 'overview' && (
          <View>
            <View style={styles.sectionCard}>
              <Text style={styles.sectionTitle}>교육 소개</Text>
              <Text style={styles.paragraph}>
                ISMS-P(정보보호관리체계 인증) 심사원 양성을 위한 공식 기본과정입니다. 본 교육은 한국인터넷진흥원(KISA)에서 주관하며,
                정보보호 전문가로서의 체계적인 지식과 실무 역량을 함양하는 것을 목표로 합니다.
              </Text>
              <Text style={styles.paragraph}>
                이 과정을 통해 정보보호 관리체계의 기본 개념부터 심사 기준, 심사 절차, 심사 보고서 작성법까지 전반적인 내용을 학습하게 됩니다.
                이론 강의와 실무 사례 분석, 그룹 토론 등 다양한 학습 방식을 통해 심사원으로서 필요한 역량을 균형 있게 개발할 수 있습니다.
              </Text>
              <Text style={styles.paragraph}>
                교육 수료 후에는 ISMS-P 심사원 자격 시험 응시 기회가 주어지며, 합격 시 공식 ISMS-P 심사원으로 활동할 수 있습니다.
                정보보호 분야 전문가로의 커리어를 시작하거나 전환을 희망하는 분들께 강력히 추천하는 과정입니다.
              </Text>
              <Text style={[styles.paragraph, { marginTop: 8, fontWeight: '700' }]}>이런 분들께 추천합니다</Text>
              <View style={{ paddingLeft: 12 }}>
                {[
                  '정보보호 컨설턴트로 커리어를 시작하고자 하는 분',
                  '기업 내 정보보호 관리자 또는 담당자',
                  'ISMS-P 인증 심사에 참여하고자 하는 분',
                  '정보보호 관리체계에 대한 체계적인 지식을 쌓고 싶은 분',
                  '정보보호 분야로의 전직을 준비하는 IT 엔지니어',
                ].map((li, i) => (
                  <View key={`li-${i}`} style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 6 }}>
                    <FontAwesome5 name="chevron-right" size={12} color={colors.lightGray} />
                    <Text style={[styles.paragraph, { marginLeft: 8 }]}>{li}</Text>
                  </View>
                ))}
              </View>
            </View>

            <View style={styles.sectionCard}>
              <Text style={styles.sectionTitle}>커리큘럼</Text>
              {modules.map((m, idx) => (
                <View key={`module-${idx}`} style={styles.module}>
                  <TouchableOpacity style={styles.moduleHeader} onPress={() => toggleModule(idx + 1)}>
                    <Text style={styles.moduleHeaderTitle}>{m.title}</Text>
                    <FontAwesome5 name={expanded[idx + 1] ? 'chevron-down' : 'chevron-right'} size={16} color={colors.lightGray} />
                  </TouchableOpacity>
                  {expanded[idx + 1] && (
                    <View style={styles.moduleContent}>
                      {m.lessons.map((ls, i) => (
                        <View key={`ls-${idx}-${i}`} style={styles.lessonItem}>
                          <FontAwesome5
                            name={ls.startsWith('퀴즈') ? 'file-alt' : ls.includes('시뮬레이션') ? 'laptop' : 'play-circle'}
                            size={16}
                            color={colors.primary}
                            style={styles.lessonIcon}
                          />
                          <Text style={{ color: colors.text }}>{ls}</Text>
                        </View>
                      ))}
                    </View>
                  )}
                </View>
              ))}
            </View>
          </View>
        )}

        {activeTab === 'instructor' && (
          <View style={styles.sectionCard}>
            <Text style={styles.sectionTitle}>강사 소개</Text>
            {instructors.map((ins, i) => (
              <View key={`ins-${i}`} style={styles.instructorCard}>
                {/* 강사 아바타 (로컬/URL 모두 지원) */}
                <Image
                  source={typeof ins.avatar === 'string' ? { uri: ins.avatar } : (ins.avatar as any)}
                  style={styles.instructorAvatar as ImageStyle}
                />
                <View style={styles.instructorInfo}>
                  <Text style={styles.instructorName}>{ins.name}</Text>
                  <Text style={styles.instructorOrg}>{ins.org}</Text>
                  <Text style={styles.paragraph}>{ins.desc}</Text>
                  <View style={styles.badgeRow}>
                    {ins.badges.map((b, bi) => (
                      <View key={`b-${bi}`} style={styles.badgePrimary}><Text style={styles.badgePrimaryText}>{b}</Text></View>
                    ))}
                  </View>
                </View>
              </View>
            ))}
          </View>
        )}

        {activeTab === 'benefits' && (
          <View style={styles.sectionCard}>
            <Text style={styles.sectionTitle}>수강 혜택</Text>
            {benefits.map((b, i) => (
              <View key={`bn-${i}`} style={styles.benefitItem}>
                <View style={styles.benefitIconWrap}><FontAwesome5 name={b.icon as any} size={18} color={colors.primary} /></View>
                <View>
                  <Text style={styles.benefitTitle}>{b.title}</Text>
                  <Text style={styles.benefitDesc}>{b.desc}</Text>
                </View>
              </View>
            ))}
          </View>
        )}

        {activeTab === 'reviews' && (
          <View style={styles.sectionCard}>
            <Text style={styles.sectionTitle}>수강생 후기</Text>
            {reviews.map((rv, i) => (
              <View key={`rv-${i}`} style={styles.reviewCard}>
                <View style={styles.reviewHeader}>
                  <View style={styles.reviewerInfo}>
                    <View style={styles.reviewerAvatar}><Text style={styles.reviewerAvatarText}>{rv.avatarText}</Text></View>
                    <View style={styles.reviewerMeta}>
                      <Text style={styles.reviewerName}>{rv.name}</Text>
                      <Text style={styles.reviewerSub}>{rv.sub}</Text>
                    </View>
                  </View>
                  <View style={styles.ratingRow}>{renderStars(rv.rating)}</View>
                </View>
                <Text style={styles.paragraph}>{rv.content}</Text>
              </View>
            ))}
          </View>
        )}

        {/* 하단 제공기관 + 이런 교육은 어떠세요? */}
        <View style={styles.bottomContainer}>
            <View style={styles.sectionCard}>
              <Text style={styles.sectionTitle}>제공 기관</Text>
              <View style={styles.providerCard}>
                <View style={{ flex: 1 }}>
                  <Text style={styles.providerName}>한국인터넷진흥원</Text>
                  <Text style={styles.providerDesc}>정보보호 산업 육성 및 ISMS-P 인증 제도 운영 기관입니다.</Text>
                  <View style={styles.badgeRow}>
                    <View style={styles.badgePrimary}><Text style={styles.badgePrimaryText}>공공기관</Text></View>
                    <View style={styles.badgePrimary}><Text style={styles.badgePrimaryText}>신뢰도 높음</Text></View>
                  </View>
                  <View style={{ flexDirection: 'row', marginTop: 8 }}>
                    <TouchableOpacity style={styles.btnOutlineSmall}><Text style={styles.btnOutlineSmallText}>기관 정보 더보기</Text></TouchableOpacity>
                  </View>
                </View>
              </View>
            </View>

          <View style={styles.sectionCard}>
            <Text style={styles.sectionTitle}>이런 교육은 어떠세요?</Text>
            {relatedCourses.map((rc, idx) => (
              <TouchableOpacity key={`rc-${idx}`} style={styles.relatedCourseCard}>
                <Text style={styles.relatedCourseTitle}>{rc.title}</Text>
                <Text style={styles.relatedCourseProvider}>{rc.provider}</Text>
                <Text style={styles.relatedCoursePrice}>{rc.price}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* 간격 */}
        <View style={{ height: 40 }} />

      </ScrollView>

      {/* 수강 신청 모달 */}
      <Modal visible={enrollVisible} animationType="slide" transparent>
        <View style={styles.modalOverlay}>
          <View style={styles.modalCard}>
            <Text style={styles.modalTitle}>수강 신청</Text>
            <Text style={styles.modalDesc}>연락받을 이메일을 입력해주세요.</Text>
            <TextInput style={styles.input} placeholder="email@example.com" keyboardType="email-address" />
            <View style={{ flexDirection: 'row', justifyContent: 'flex-end', gap: 12 }}>
              <TouchableOpacity style={styles.btnSecondary} onPress={() => setEnrollVisible(false)}>
                <Text style={styles.btnSecondaryText}>취소</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.btnPrimary} onPress={() => setEnrollVisible(false)}>
                <Text style={styles.btnPrimaryText}>신청</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default EduListDetail;