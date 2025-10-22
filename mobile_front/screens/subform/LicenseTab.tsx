import React from 'react';
import { View, Text, ScrollView, FlatList, Image } from 'react-native';
import { FontAwesome5 } from '@expo/vector-icons';
import { styles } from '../styles/styles';

// 샘플 라이선스 데이터
const recommendedLicenses = [
  { badge: '추천', title: 'ISMS-P 인증 컨설턴트 과정', org: 'CertMatch 아카데미', price: '￦ 1,200,000', schedule: '3/10 시작' },
  { badge: '추천', title: 'ISO 27001 내부심사원 과정', org: '한국품질인증원', price: '￦ 900,000', schedule: '3/15 시작' },
  { badge: '추천', title: '개인정보 영향평가 전문가', org: 'KISA 교육센터', price: '￦ 800,000', schedule: '3/20 시작' },
  { badge: '추천', title: 'GDPR 실무 전문가', org: 'Global Privacy Lab', price: '￦ 1,500,000', schedule: '4/1 시작' },
];

const popularLicenses = [
  { title: '정보보호 관리체계 전문가', org: '한국정보보호진흥원', level: '전문가', tags: ['인기', '실무'], price: '￦ 700,000', schedule: '수시' },
  { title: '클라우드 보안 인증', org: 'Cloud Security Academy', level: 'Associate', tags: ['인기', '클라우드'], price: '￦ 500,000', schedule: '4/5' },
  { title: '모바일 앱 보안 전문가', org: 'MobileSec', level: '전문가', tags: ['앱', '모바일'], price: '￦ 650,000', schedule: '3/25' },
  { title: '데이터 프라이버시 전문가', org: 'DPO Academy', level: '전문가', tags: ['프라이버시'], price: '￦ 1,000,000', schedule: '상시' },
  { title: '소프트웨어 품질 인증(GS)', org: '한국소프트웨어진흥원', level: '심사원', tags: ['품질', 'GS'], price: '￦ 600,000', schedule: '5/10' },
  { title: '웹 취약점 진단 전문가', org: 'WebSec Korea', level: '전문가', tags: ['웹', '보안'], price: '￦ 750,000', schedule: '4/20' },
];

const SectionTitle = ({ icon, title }: { icon: any; title: string }) => (
  <View style={styles.sectionTitle}>
    <FontAwesome5 name={icon} size={16} color="#1976d2" />
    <Text style={styles.sectionTitleText}>{title}</Text>
  </View>
);

const LicenseCard = ({ badge, title, org, price, schedule }: { badge?: string; title: string; org: string; price: string; schedule: string }) => (
  <View style={styles.urgentCard}>
    {badge ? <Text style={styles.cardBadge}>{badge}</Text> : null}
    <Text style={styles.cardTitle}>{title}</Text>
    <Text style={styles.cardCompany}>{org}</Text>
    <View style={styles.cardFooter}>
      <Text style={styles.cardPrice}>{price}</Text>
      <Text style={styles.cardDeadline}>{schedule}</Text>
    </View>
  </View>
);

const PopularLicenseCard = ({ title, org, level, tags, price, schedule }: { title: string; org: string; level: string; tags: string[]; price: string; schedule: string }) => (
  <View style={styles.jobCard}>
    <Text style={styles.jobTitle}>{title}</Text>
    <Text style={styles.jobCompany}>{org} · {level}</Text>
    <View style={styles.tagRow}>
      {tags.map((t, i) => (
        <View key={i} style={styles.tagChip}><Text style={styles.tagText}>{t}</Text></View>
      ))}
    </View>
    <View style={styles.cardFooter}>
      <Text style={styles.cardPrice}>{price}</Text>
      <Text style={styles.cardDeadline}>{schedule}</Text>
    </View>
  </View>
);

const LicenseTab: React.FC = () => {
  return (
    <View>
      <SectionTitle icon="certificate" title="추천 라이선스 과정" />
      <ScrollView horizontal showsHorizontalScrollIndicator={false} style={{ marginVertical: 8 }}>
        {recommendedLicenses.map((item, idx) => (
          <LicenseCard key={idx} {...item} />
        ))}
      </ScrollView>

      <SectionTitle icon="trophy" title="인기 라이선스" />
      <FlatList
        data={popularLicenses}
        keyExtractor={(item, idx) => `${item.title}-${idx}`}
        numColumns={2}
        columnWrapperStyle={{ justifyContent: 'space-between' }}
        contentContainerStyle={{ paddingBottom: 16 }}
        renderItem={({ item }) => (
          <PopularLicenseCard
            title={item.title}
            org={item.org}
            level={item.level}
            tags={item.tags}
            price={item.price}
            schedule={item.schedule}
          />
        )}
      />
    </View>
  );
};

export default LicenseTab;