import React, { useMemo, useState } from 'react';
import { View, Text, ScrollView, Pressable, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import SubformHeader from '../components/SubformHeader';
import { styles } from '../styles/menu/QnaList';

type QnaItem = {
  id: string;
  category: string; // e.g., "인증", "교육", etc.
  title: string;
  content: string;
  author: string;
  views: number;
  likes: number;
  bookmarked: boolean;
  answered: boolean;
  createdAt: string; // ISO or display date
};

type PrivateQnaItem = {
  id: string;
  title: string;
  expertName: string;
  status: 'pending' | 'answered';
  createdAt: string;
  lastMessagePreview: string;
};

type SortKey = 'popular' | 'latest';
type QnaType = 'community' | 'private';

export default function QnaList() {
  const navigation = useNavigation<any>();
  const [activeType, setActiveType] = useState<QnaType>('community');
  const [sortKey, setSortKey] = useState<SortKey>('latest');
  const [selectedItem, setSelectedItem] = useState<QnaItem | null>(null);
  const [communityItems, setCommunityItems] = useState<QnaItem[]>([
    {
      id: 'q1',
      category: '인증',
      title: '기업 인증 준비 과정에서 필요한 서류는 무엇인가요?',
      content:
        '기업 인증을 준비 중입니다. 기본적으로 필요한 서류와 절차가 궁금합니다. 경험 있으신 분들의 조언 부탁드립니다.',
      author: '홍길동',
      views: 1200,
      likes: 35,
      bookmarked: false,
      answered: true,
      createdAt: '2024-09-10',
    },
    {
      id: 'q2',
      category: '교육',
      title: '인증 교육 커리큘럼 추천 부탁드립니다',
      content:
        '신입 직원을 위한 인증 교육 커리큘럼을 구성하려고 합니다. 초심자 기준으로 추천 부탁드립니다.',
      author: '김민수',
      views: 860,
      likes: 22,
      bookmarked: true,
      answered: false,
      createdAt: '2024-10-01',
    },
    {
      id: 'q3',
      category: '채용',
      title: '인증 전문가 채용 시 확인해야 할 자격사항은?',
      content:
        '인증 전문가 채용 시 경력, 자격증, 프로젝트 경험 중 어떤 기준을 가장 우선시해야 할까요?',
      author: '이서연',
      views: 540,
      likes: 18,
      bookmarked: false,
      answered: true,
      createdAt: '2024-10-03',
    },
  ]);

  const [privateItems] = useState<PrivateQnaItem[]>([
    {
      id: 'p1',
      title: '1:1 인증 절차 문의드립니다',
      expertName: '박지훈 전문가',
      status: 'answered',
      createdAt: '2024-10-02',
      lastMessagePreview: '필수 서류 목록과 준비 절차를 정리해 드렸습니다...',
    },
    {
      id: 'p2',
      title: '서류 보완 관련 긴급 문의',
      expertName: '최유리 전문가',
      status: 'pending',
      createdAt: '2024-10-05',
      lastMessagePreview: '보완해야 할 항목을 확인 중입니다. 빠르게 답변드리겠습니다...',
    },
  ]);

  const sortedCommunityItems = useMemo(() => {
    const items = [...communityItems];
    if (sortKey === 'popular') {
      items.sort((a, b) => b.likes - a.likes || b.views - a.views);
    } else {
      items.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
    }
    return items;
  }, [communityItems, sortKey]);

  const toggleLike = (id: string) => {
    setCommunityItems(prev => prev.map(item => (item.id === id ? { ...item, likes: item.likes + 1 } : item)));
  };

  const toggleBookmark = (id: string) => {
    setCommunityItems(prev => prev.map(item => (item.id === id ? { ...item, bookmarked: !item.bookmarked } : item)));
  };

  return (
    <View style={styles.container}>
      {/* Subform Header */}
      <SubformHeader
        title="인증 Q&A"
        navigation={navigation}
        onHome={() => navigation.navigate('Home')}
      />

      <ScrollView contentContainerStyle={styles.content}>
        {/* QA Type Toggle */}
        <View style={styles.qaTypeToggle}>
          <Pressable
            style={[styles.qaTypeBtn, activeType === 'community' && styles.qaTypeBtnActive]}
            onPress={() => setActiveType('community')}
          >
            <Text style={[styles.qaTypeText, activeType === 'community' && styles.qaTypeTextActive]}>커뮤니티 Q&A</Text>
          </Pressable>
          <Pressable
            style={[styles.qaTypeBtn, activeType === 'private' && styles.qaTypeBtnActive]}
            onPress={() => setActiveType('private')}
          >
            <Text style={[styles.qaTypeText, activeType === 'private' && styles.qaTypeTextActive]}>1:1 Q&A</Text>
          </Pressable>
        </View>

        {/* Sort Tabs (Community only) */}
        {activeType === 'community' && (
          <View style={styles.sortTabs}>
            <Pressable
              style={[styles.sortTab, sortKey === 'popular' && styles.sortTabActive]}
              onPress={() => setSortKey('popular')}
            >
              <Text style={[styles.sortTabText, sortKey === 'popular' && styles.sortTabTextActive]}>인기순</Text>
            </Pressable>
            <Pressable
              style={[styles.sortTab, sortKey === 'latest' && styles.sortTabActive]}
              onPress={() => setSortKey('latest')}
            >
              <Text style={[styles.sortTabText, sortKey === 'latest' && styles.sortTabTextActive]}>최신순</Text>
            </Pressable>
          </View>
        )}

        {/* Community Q&A List */}
        {activeType === 'community' && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>질문 목록</Text>
            {sortedCommunityItems.map(item => (
              <Pressable key={item.id} style={styles.qaItem} onPress={() => setSelectedItem(item)}>
                <View style={styles.qaItemHeader}>
                  <Text style={styles.qaCategory}>{item.category}</Text>
                  <View style={styles.qaStats}>
                    <Text style={styles.qaStat}>조회 {item.views}</Text>
                    <Text style={styles.qaStat}>추천 {item.likes}</Text>
                  </View>
                </View>
                <Text style={styles.qaTitle}>{item.title}</Text>
                <Text style={styles.qaContent} numberOfLines={2}>
                  {item.content}
                </Text>
                <View style={styles.qaMeta}>
                  <Text style={styles.qaAuthor}>작성자 {item.author}</Text>
                  <View style={styles.qaActions}>
                    <Pressable onPress={() => toggleLike(item.id)}>
                      <Text style={[styles.actionBtn, styles.likeBtn]}>♥ 추천</Text>
                    </Pressable>
                    <Pressable onPress={() => toggleBookmark(item.id)}>
                      <Text style={[styles.actionBtn, item.bookmarked && styles.bookmarkedBtn]}>★ 북마크</Text>
                    </Pressable>
                  </View>
                </View>
              </Pressable>
            ))}
          </View>
        )}

        {/* Private Q&A List */}
        {activeType === 'private' && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>1:1 문의 목록</Text>
            {privateItems.map(p => (
              <View key={p.id} style={[styles.privateItem, p.status === 'pending' && styles.privateItemPending]}>
                <View style={styles.privateHeader}>
                  <Text style={styles.privateBadge}>1:1</Text>
                  <Text style={[styles.privateStatus, p.status === 'answered' ? styles.statusAnswered : styles.statusPending]}>
                    {p.status === 'answered' ? '답변 완료' : '대기 중'}
                  </Text>
                </View>
                <Text style={styles.privateTitle}>{p.title}</Text>
                <View style={styles.privateFooter}>
                  <Text style={styles.expertInfo}>전문가: {p.expertName}</Text>
                  <Text style={styles.privateDate}>{p.createdAt}</Text>
                </View>
                <Text style={styles.privatePreview} numberOfLines={2}>
                  {p.lastMessagePreview}
                </Text>
              </View>
            ))}
          </View>
        )}

        {/* Question Detail (simple) */}
        {selectedItem && (
          <View style={styles.section}>
            <View style={styles.detailHeader}>
              <Pressable onPress={() => setSelectedItem(null)}>
                <Text style={styles.backBtn}>{'< 뒤로'}</Text>
              </Pressable>
              <Text style={styles.detailTitle}>질문 상세</Text>
            </View>
            <Text style={styles.detailQuestionTitle}>{selectedItem.title}</Text>
            <Text style={styles.detailQuestionBody}>{selectedItem.content}</Text>
            <View style={styles.detailFooter}>
              <Text style={styles.detailMeta}>작성자 {selectedItem.author}</Text>
              <Text style={styles.detailMeta}>조회 {selectedItem.views} • 추천 {selectedItem.likes}</Text>
            </View>
          </View>
        )}
      </ScrollView>
    </View>
  );
}
