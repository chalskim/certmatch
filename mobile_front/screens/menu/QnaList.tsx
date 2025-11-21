import React, { useMemo, useState } from 'react';
import { View, Text, ScrollView, Pressable, TextInput, Alert } from 'react-native';
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

  const [privateItems, setPrivateItems] = useState<PrivateQnaItem[]>([
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

  // 등록 폼 상태
  const [showCommunityForm, setShowCommunityForm] = useState(false);
  const [communityCategory, setCommunityCategory] = useState<string>('인증');
  const [communityTitle, setCommunityTitle] = useState('');
  const [communityContent, setCommunityContent] = useState('');
  const [communityAuthor, setCommunityAuthor] = useState('');

  const [showPrivateForm, setShowPrivateForm] = useState(false);
  const [privateTitle, setPrivateTitle] = useState('');
  const [privateExpertName, setPrivateExpertName] = useState('담당 전문가 배정 예정');
  const [privatePreview, setPrivatePreview] = useState('문의 등록되었습니다. 담당자가 확인 후 답변 드릴 예정입니다.');

  const formatDate = (d: Date) => {
    const y = d.getFullYear();
    const m = String(d.getMonth() + 1).padStart(2, '0');
    const day = String(d.getDate()).padStart(2, '0');
    return `${y}-${m}-${day}`;
  };

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

  const handleSubmitCommunity = () => {
    if (!communityTitle.trim() || !communityContent.trim()) {
      Alert.alert('알림', '제목과 내용을 입력해주세요.');
      return;
    }
    const newItem: QnaItem = {
      id: `q${Date.now()}`,
      category: communityCategory || '인증',
      title: communityTitle.trim(),
      content: communityContent.trim(),
      author: communityAuthor.trim() || '익명',
      views: 0,
      likes: 0,
      bookmarked: false,
      answered: false,
      createdAt: formatDate(new Date()),
    };
    setCommunityItems(prev => [newItem, ...prev]);
    // 폼 초기화
    setCommunityTitle('');
    setCommunityContent('');
    setCommunityAuthor('');
    setShowCommunityForm(false);
    // 커뮤니티 탭으로 이동
    setActiveType('community');
    Alert.alert('알림', 'Q&A가 등록되었습니다.');
  };

  const handleSubmitPrivate = () => {
    if (!privateTitle.trim()) {
      Alert.alert('알림', '제목을 입력해주세요.');
      return;
    }
    const newItem: PrivateQnaItem = {
      id: `p${Date.now()}`,
      title: privateTitle.trim(),
      expertName: privateExpertName.trim() || '담당 전문가 배정 예정',
      status: 'pending',
      createdAt: formatDate(new Date()),
      lastMessagePreview: privatePreview.trim() || '문의 등록되었습니다. 담당자가 확인 후 답변 드릴 예정입니다.',
    };
    setPrivateItems(prev => [newItem, ...prev]);
    // 폼 초기화
    setPrivateTitle('');
    setPrivateExpertName('담당 전문가 배정 예정');
    setPrivatePreview('문의 등록되었습니다. 담당자가 확인 후 답변 드릴 예정입니다.');
    setShowPrivateForm(false);
    // 1:1 탭으로 이동
    setActiveType('private');
    Alert.alert('알림', '1:1 Q&A가 등록되었습니다.');
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
        {/* 등록 버튼 영역 */}
        <View style={{ flexDirection: 'row', gap: 8, marginBottom: 12 }}>
          <Pressable
            onPress={() => setShowCommunityForm(s => !s)}
            style={({ pressed }) => ({
              backgroundColor: '#2ecc71',
              paddingVertical: 10,
              paddingHorizontal: 14,
              borderRadius: 8,
              opacity: pressed ? 0.8 : 1,
              marginRight: 8,
            })}
          >
            <Text style={{ color: '#fff', fontWeight: '600' }}>새 Q&A 등록</Text>
          </Pressable>
          <Pressable
            onPress={() => setShowPrivateForm(s => !s)}
            style={({ pressed }) => ({
              backgroundColor: '#3498db',
              paddingVertical: 10,
              paddingHorizontal: 14,
              borderRadius: 8,
              opacity: pressed ? 0.8 : 1,
            })}
          >
            <Text style={{ color: '#fff', fontWeight: '600' }}>1:1 Q&A 등록</Text>
          </Pressable>
        </View>

        {/* 커뮤니티 Q&A 등록 폼 */}
        {showCommunityForm && (
          <View style={{ backgroundColor: '#f7f9fa', borderRadius: 12, padding: 12, marginBottom: 16 }}>
            <Text style={{ fontSize: 16, fontWeight: '700', marginBottom: 8 }}>커뮤니티 Q&A 등록</Text>
            <View style={{ flexDirection: 'row', marginBottom: 8 }}>
              {['인증', '교육', '채용'].map(cat => (
                <Pressable
                  key={cat}
                  onPress={() => setCommunityCategory(cat)}
                  style={{
                    backgroundColor: communityCategory === cat ? '#ffd166' : '#ecf0f1',
                    paddingVertical: 6,
                    paddingHorizontal: 10,
                    borderRadius: 6,
                    marginRight: 8,
                  }}
                >
                  <Text style={{ color: '#2c3e50' }}>{cat}</Text>
                </Pressable>
              ))}
            </View>
            <TextInput
              placeholder="제목"
              value={communityTitle}
              onChangeText={setCommunityTitle}
              style={{ backgroundColor: '#fff', borderWidth: 1, borderColor: '#dfe6e9', borderRadius: 8, paddingHorizontal: 10, paddingVertical: 8, marginBottom: 8 }}
            />
            <TextInput
              placeholder="내용"
              value={communityContent}
              onChangeText={setCommunityContent}
              multiline
              style={{ backgroundColor: '#fff', borderWidth: 1, borderColor: '#dfe6e9', borderRadius: 8, paddingHorizontal: 10, paddingVertical: 8, minHeight: 80, textAlignVertical: 'top', marginBottom: 8 }}
            />
            <TextInput
              placeholder="작성자 (선택)"
              value={communityAuthor}
              onChangeText={setCommunityAuthor}
              style={{ backgroundColor: '#fff', borderWidth: 1, borderColor: '#dfe6e9', borderRadius: 8, paddingHorizontal: 10, paddingVertical: 8, marginBottom: 12 }}
            />
            <View style={{ flexDirection: 'row', justifyContent: 'flex-end' }}>
              <Pressable onPress={() => setShowCommunityForm(false)} style={{ paddingVertical: 10, paddingHorizontal: 14, marginRight: 8 }}>
                <Text style={{ color: '#7f8c8d', fontWeight: '600' }}>취소</Text>
              </Pressable>
              <Pressable onPress={handleSubmitCommunity} style={{ backgroundColor: '#2ecc71', paddingVertical: 10, paddingHorizontal: 14, borderRadius: 8 }}>
                <Text style={{ color: '#fff', fontWeight: '700' }}>등록</Text>
              </Pressable>
            </View>
          </View>
        )}

        {/* 1:1 Q&A 등록 폼 */}
        {showPrivateForm && (
          <View style={{ backgroundColor: '#f7f9fa', borderRadius: 12, padding: 12, marginBottom: 16 }}>
            <Text style={{ fontSize: 16, fontWeight: '700', marginBottom: 8 }}>1:1 Q&A 등록</Text>
            <TextInput
              placeholder="제목"
              value={privateTitle}
              onChangeText={setPrivateTitle}
              style={{ backgroundColor: '#fff', borderWidth: 1, borderColor: '#dfe6e9', borderRadius: 8, paddingHorizontal: 10, paddingVertical: 8, marginBottom: 8 }}
            />
            <TextInput
              placeholder="전문가 이름 (선택)"
              value={privateExpertName}
              onChangeText={setPrivateExpertName}
              style={{ backgroundColor: '#fff', borderWidth: 1, borderColor: '#dfe6e9', borderRadius: 8, paddingHorizontal: 10, paddingVertical: 8, marginBottom: 8 }}
            />
            <TextInput
              placeholder="문의 내용 또는 메시지 (선택)"
              value={privatePreview}
              onChangeText={setPrivatePreview}
              multiline
              style={{ backgroundColor: '#fff', borderWidth: 1, borderColor: '#dfe6e9', borderRadius: 8, paddingHorizontal: 10, paddingVertical: 8, minHeight: 80, textAlignVertical: 'top', marginBottom: 12 }}
            />
            <View style={{ flexDirection: 'row', justifyContent: 'flex-end' }}>
              <Pressable onPress={() => setShowPrivateForm(false)} style={{ paddingVertical: 10, paddingHorizontal: 14, marginRight: 8 }}>
                <Text style={{ color: '#7f8c8d', fontWeight: '600' }}>취소</Text>
              </Pressable>
              <Pressable onPress={handleSubmitPrivate} style={{ backgroundColor: '#3498db', paddingVertical: 10, paddingHorizontal: 14, borderRadius: 8 }}>
                <Text style={{ color: '#fff', fontWeight: '700' }}>등록</Text>
              </Pressable>
            </View>
          </View>
        )}
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
