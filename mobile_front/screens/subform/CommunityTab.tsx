import React from 'react';
import { View, Text, FlatList } from 'react-native';
import { FontAwesome5 } from '@expo/vector-icons';
import { styles } from '../styles/styles';

// 커뮤니티 인기 글 및 Q&A
const hotPosts = [
  { title: 'ISMS-P 준비 시 핵심 체크리스트 공유', author: '보안준비생', tags: ['ISMS-P', '가이드'], likes: 124, comments: 18 },
  { title: 'GDPR 적용 사례, 국내 기업 대응 전략', author: 'PrivacyPro', tags: ['GDPR', '전략'], likes: 98, comments: 12 },
  { title: '웹 취약점 진단 도구 추천', author: 'AppSecGuy', tags: ['OWASP', '도구'], likes: 76, comments: 9 },
  { title: '클라우드 보안 아키텍처 설계 팁', author: 'CloudSec', tags: ['클라우드', '아키텍처'], likes: 85, comments: 15 },
];

const qaList = [
  { q: 'ISMS와 ISMS-P 차이가 뭔가요?', a: '범위에 따라 개인정보보호 요소가 포함되면 ISMS-P입니다.' },
  { q: 'PIMS 인증 아직도 유효한가요?', a: '현재는 ISMS-P로 통합되어 ISMS-P 인증이 일반적입니다.' },
  { q: '내부 심사원 자격 기준이 있나요?', a: '교육이수 및 실무경력 기준이 기관별로 상이합니다.' },
];

const SectionTitle = ({ icon, title }: { icon: any; title: string }) => (
  <View style={styles.sectionTitle}>
    <FontAwesome5 name={icon} size={16} color="#6a1b9a" />
    <Text style={styles.sectionTitleText}>{title}</Text>
  </View>
);

const PostCard = ({ title, author, tags, likes, comments }: { title: string; author: string; tags: string[]; likes: number; comments: number }) => (
  <View style={styles.jobCard}>
    <Text style={styles.jobTitle}>{title}</Text>
    <Text style={styles.jobCompany}>{author}</Text>
    <View style={styles.tagRow}>
      {tags.map((t, i) => (
        <View key={i} style={styles.tagChip}><Text style={styles.tagText}>{t}</Text></View>
      ))}
    </View>
    <View style={styles.cardFooter}>
      <Text style={styles.cardPrice}>👍 {likes}</Text>
      <Text style={styles.cardDeadline}>💬 {comments}</Text>
    </View>
  </View>
);

const QAItem = ({ q, a }: { q: string; a: string }) => (
  <View style={styles.urgentCard}>
    <Text style={styles.cardBadge}>Q&A</Text>
    <Text style={styles.cardTitle}>{q}</Text>
    <Text style={styles.cardCompany}>{a}</Text>
  </View>
);

const CommunityTab: React.FC = () => {
  return (
    <View>
      <SectionTitle icon="users" title="인기 커뮤니티 글" />
      <FlatList
        data={hotPosts}
        keyExtractor={(item, idx) => `${item.title}-${idx}`}
        numColumns={2}
        columnWrapperStyle={{ justifyContent: 'space-between' }}
        contentContainerStyle={{ paddingBottom: 16 }}
        renderItem={({ item }) => (
          <PostCard title={item.title} author={item.author} tags={item.tags} likes={item.likes} comments={item.comments} />
        )}
      />

      <SectionTitle icon="question-circle" title="자주 묻는 질문" />
      {qaList.map((item, idx) => (
        <QAItem key={idx} q={item.q} a={item.a} />
      ))}
    </View>
  );
};

export default CommunityTab;