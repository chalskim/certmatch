import React from 'react';
import { View, Text, ScrollView } from 'react-native';
import { FontAwesome5 } from '@expo/vector-icons';
import { styles } from '../styles/styles';

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

// 일반 모집 그리드 렌더링을 위한 타입
type JobItem = typeof generalJobs[number];

const SectionTitle = ({ icon, title }: { icon: any; title: string }) => (
  <View style={styles.sectionTitle}>
    <FontAwesome5 name={icon} size={16} color="#d32f2f" />
    <Text style={styles.sectionTitleText}>{title}</Text>
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

const JobsTab: React.FC = () => {
  return (
    <View>
      <SectionTitle icon="fire" title="긴급 모집" />
      <ScrollView horizontal showsHorizontalScrollIndicator={false} style={{ marginVertical: 8 }}>
        {urgentRecruitments.map((item, idx) => (
          <UrgentCard key={idx} {...item} />
        ))}
      </ScrollView>

      <SectionTitle icon="briefcase" title="일반 모집" />
      {/* FlatList를 사용하면 상위 ScrollView와 같은 세로 방향 리스트가 중첩되어 경고가 발생하므로, 2열 그리드를 수동으로 렌더링합니다. */}
      {generalJobs
        .reduce((rows: JobItem[][], item: JobItem, index: number) => {
          if (index % 2 === 0) rows.push([item]);
          else rows[rows.length - 1].push(item);
          return rows;
        }, [])
        .map((row: JobItem[], rowIdx: number) => (
          <View key={`job-row-${rowIdx}`} style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
            {row.map((item: JobItem, colIdx: number) => (
              <JobCard
                key={`${item.title}-${colIdx}`}
                badge={item.badge}
                badgeType={item.badgeType as 'new' | 'hot' | 'default'}
                title={item.title}
                company={item.company}
                tags={item.tags}
                price={item.price}
                deadline={item.deadline}
              />
            ))}
          </View>
        ))}
    </View>
  );
};

export default JobsTab;