import React from 'react';
import { View, Text, FlatList, ScrollView, Image } from 'react-native';
import { FontAwesome5 } from '@expo/vector-icons';
import { styles } from '../styles/styles';

// 아카데미 추천 과정 및 이벤트 데이터
const featuredCourses = [
  { title: '정보보호 기본과정 (입문)', org: 'CertMatch Academy', tags: ['입문', '온라인'], price: '￦ 300,000', start: '상시' },
  { title: '보안 아키텍처 설계', org: 'SecurityPro Lab', tags: ['중급', '오프라인'], price: '￦ 900,000', start: '4/05' },
  { title: '개인정보보호 실무', org: 'Privacy Academy', tags: ['중급', '온라인'], price: '￦ 700,000', start: '3/28' },
  { title: '클라우드 보안 심화', org: 'CloudSec Academy', tags: ['고급', '오프라인'], price: '￦ 1,200,000', start: '4/15' },
];

const events = [
  { title: 'ISMS-P 설명회', org: 'CertMatch', date: '3/10', location: '온라인 세미나' },
  { title: '개인정보 영향평가 실무 워크숍', org: 'KISA', date: '3/20', location: '서울 강남' },
  { title: '클라우드 보안 Meet-up', org: 'CSA Korea', date: '4/02', location: '판교' },
];

const SectionTitle = ({ icon, title }: { icon: any; title: string }) => (
  <View style={styles.sectionTitle}>
    <FontAwesome5 name={icon} size={16} color="#388e3c" />
    <Text style={styles.sectionTitleText}>{title}</Text>
  </View>
);

const CourseCard = ({ title, org, tags, price, start }: { title: string; org: string; tags: string[]; price: string; start: string }) => (
  <View style={styles.jobCard}>
    <Text style={styles.jobTitle}>{title}</Text>
    <Text style={styles.jobCompany}>{org}</Text>
    <View style={styles.tagRow}>
      {tags.map((t, i) => (
        <View key={i} style={styles.tagChip}><Text style={styles.tagText}>{t}</Text></View>
      ))}
    </View>
    <View style={styles.cardFooter}>
      <Text style={styles.cardPrice}>{price}</Text>
      <Text style={styles.cardDeadline}>{start}</Text>
    </View>
  </View>
);

const EventCard = ({ title, org, date, location }: { title: string; org: string; date: string; location: string }) => (
  <View style={styles.urgentCard}>
    <Text style={styles.cardBadge}>이벤트</Text>
    <Text style={styles.cardTitle}>{title}</Text>
    <Text style={styles.cardCompany}>{org}</Text>
    <View style={styles.cardFooter}>
      <Text style={styles.cardPrice}>{date}</Text>
      <Text style={styles.cardDeadline}>{location}</Text>
    </View>
  </View>
);

const AcademyTab: React.FC = () => {
  return (
    <View>
      <SectionTitle icon="chalkboard-teacher" title="추천 아카데미 과정" />
      <FlatList
        data={featuredCourses}
        keyExtractor={(item, idx) => `${item.title}-${idx}`}
        numColumns={2}
        columnWrapperStyle={{ justifyContent: 'space-between' }}
        contentContainerStyle={{ paddingBottom: 16 }}
        renderItem={({ item }) => (
          <CourseCard title={item.title} org={item.org} tags={item.tags} price={item.price} start={item.start} />
        )}
      />

      <SectionTitle icon="calendar-alt" title="다가오는 이벤트" />
      <ScrollView horizontal showsHorizontalScrollIndicator={false} style={{ marginVertical: 8 }}>
        {events.map((item, idx) => (
          <EventCard key={idx} {...item} />
        ))}
      </ScrollView>
    </View>
  );
};

export default AcademyTab;