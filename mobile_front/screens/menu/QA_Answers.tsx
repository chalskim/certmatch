
import React, { useMemo, useState } from 'react';
import { View, Text, ScrollView, Pressable, Modal, TextInput, Alert } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import SubformHeader from '../components/SubformHeader';
import { styles } from '../styles/menu/QA_Answers';

// Types
type QuestionStatus = 'unanswered' | 'pending' | 'answered' | 'best';

type QuestionItem = {
  id: string;
  title: string;
  content: string;
  author: string;
  category: string;
  views: number;
  time: string; // e.g. '2시간 전'
  status: QuestionStatus;
  answer?: string; // Existing answer text if any
};

type Expert = { id: string; name: string; field: string; badge: string };

type FilterKey = 'all' | QuestionStatus;

export default function QA_Answers() {
  const navigation = useNavigation<any>();

  // Sample data based on the original HTML mockup
  const [questions, setQuestions] = useState<QuestionItem[]>([
    {
      id: '1',
      title: 'ISMS-P 인증 심사 준비 기간은 얼마나 걸리나요?',
      content:
        '중소기업에서 ISMS-P 인증을 처음 준비하려고 합니다. 일반적으로 심사 준비부터 최종 인증까지 걸리는 기간과 꼭 준비해야 할 서류들이 궁금합니다...',
      author: '김철수',
      category: 'ISMS-P',
      views: 125,
      time: '2시간 전',
      status: 'unanswered',
    },
    {
      id: '2',
      title: 'ISO 27001과 ISMS-P의 차이점이 무엇인가요?',
      content:
        '두 인증 제도의 주요 차이점과 적용 대상, 그리고 비용 차이에 대해 알고 싶습니다. 어떤 것을 먼저 준비하는 것이 좋을까요?',
      author: '이영희',
      category: 'ISO 27001',
      views: 89,
      time: '5시간 전',
      status: 'pending',
    },
    {
      id: '3',
      title: '개인정보보호 관리체계(PIMS) 인증 절차',
      content: '병원에서 PIMS 인증을 준비 중입니다. 구체적인 인증 절차와 준비 사항에 대해 안내 부탁드립니다.',
      author: '박민수',
      category: 'PIMS',
      views: 203,
      time: '1일 전',
      status: 'answered',
      answer: '기존 답변 내용이 여기에 표시됩니다.',
    },
    {
      id: '4',
      title: '클라우드 서비스 ISMS-P 인증 가이드',
      content:
        '클라우드 서비스 제공업체로서 ISMS-P 인증을 준비해야 합니다. 클라우드 환경에 특화된 인증 준비 방법이 궁금합니다.',
      author: '최지영',
      category: '클라우드',
      views: 456,
      time: '2일 전',
      status: 'best',
      answer: '클라우드 환경에 특화된 인증 준비 방법에 대한 가이드입니다...',
    },
  ]);

  // Header counts
  const counts = useMemo(() => {
    const c = { unanswered: 0, pending: 0, answered: 0 } as Record<'unanswered' | 'pending' | 'answered', number>;
    questions.forEach(q => {
      if (q.status === 'unanswered') c.unanswered += 1;
      else if (q.status === 'pending') c.pending += 1;
      else if (q.status === 'answered' || q.status === 'best') c.answered += 1;
    });
    // Fallback to match mock numbers roughly
    return {
      unanswered: Math.max(c.unanswered, 12),
      pending: Math.max(c.pending, 5),
      answered: Math.max(c.answered, 48),
    };
  }, [questions]);

  // Filter tabs
  const [filter, setFilter] = useState<FilterKey>('all');
  const filtered = useMemo(() => {
    if (filter === 'all') return questions;
    return questions.filter(q => q.status === filter);
  }, [filter, questions]);

  // Modals
  const [answerModalVisible, setAnswerModalVisible] = useState(false);
  const [expertModalVisible, setExpertModalVisible] = useState(false);
  const [categoryModalVisible, setCategoryModalVisible] = useState(false);

  const [currentId, setCurrentId] = useState<string | null>(null);
  const [answerContent, setAnswerContent] = useState('');

  const experts: Expert[] = [
    { id: '1', name: '김민수 컨설턴트', field: 'ISMS-P 전문 · 15년 경력', badge: '김' },
    { id: '2', name: '박지영 컨설턴트', field: 'ISO 27001 전문 · 10년 경력', badge: '박' },
    { id: '3', name: '이준호 컨설턴트', field: '통합 인증 전문 · 12년 경력', badge: '이' },
  ];
  const [selectedExpertId, setSelectedExpertId] = useState<string | null>(null);
  const [requestReason, setRequestReason] = useState('');

  const [newCategory, setNewCategory] = useState<string>('ISMS-P');
  const categoryOptions = ['ISMS-P', 'ISO 27001', 'PIMS', 'GS 인증', '클라우드', '의료정보보호', '기타'];

  // Actions
  const openAnswerModal = (id: string) => {
    setCurrentId(id);
    const q = questions.find(q => q.id === id);
    setAnswerContent(q?.status === 'answered' || q?.status === 'best' ? (q?.answer ?? '') : '');
    setAnswerModalVisible(true);
  };

  const saveAnswer = () => {
    if (!currentId) return;
    if (!answerContent.trim()) {
      Alert.alert('답변 내용을 입력하세요.');
      return;
    }
    setQuestions(prev =>
      prev.map(q => {
        if (q.id !== currentId) return q;
        const next: QuestionItem = { ...q, answer: answerContent };
        if (q.status === 'unanswered' || q.status === 'pending') {
          next.status = 'answered';
        }
        return next;
      })
    );
    setAnswerModalVisible(false);
    setCurrentId(null);
    setAnswerContent('');
    Alert.alert('답변이 저장되었습니다.');
  };

  const openExpertModal = (id: string) => {
    setCurrentId(id);
    setExpertModalVisible(true);
  };

  const requestExpertAnswer = () => {
    if (!currentId) return;
    if (!selectedExpertId) {
      Alert.alert('전문가를 선택하세요.');
      return;
    }
    if (!requestReason.trim()) {
      Alert.alert('요청 사유를 입력하세요.');
      return;
    }
    setQuestions(prev =>
      prev.map(q => (q.id === currentId ? { ...q, status: 'pending' } : q))
    );
    setExpertModalVisible(false);
    setSelectedExpertId(null);
    setRequestReason('');
    setCurrentId(null);
    Alert.alert('전문가에게 답변이 요청되었습니다.');
  };

  const cancelExpertRequest = (id: string) => {
    setQuestions(prev => prev.map(q => (q.id === id ? { ...q, status: 'unanswered' } : q)));
    Alert.alert('요청이 취소되었습니다.');
  };

  const markAsBest = (id: string) => {
    setQuestions(prev => prev.map(q => (q.id === id ? { ...q, status: 'best' } : q)));
    Alert.alert('베스트 답변로 지정되었습니다.');
  };

  const unmarkBest = (id: string) => {
    setQuestions(prev => prev.map(q => (q.id === id ? { ...q, status: 'answered' } : q)));
    Alert.alert('베스트 답변 지정이 해제되었습니다.');
  };

  const deleteAnswer = (id: string) => {
    setQuestions(prev => prev.map(q => (q.id === id ? { ...q, status: 'unanswered', answer: undefined } : q)));
    Alert.alert('답변이 삭제되었습니다.');
  };

  const openCategoryModal = (id: string) => {
    setCurrentId(id);
    const q = questions.find(q => q.id === id);
    setNewCategory(q?.category ?? 'ISMS-P');
    setCategoryModalVisible(true);
  };

  const saveCategoryChange = () => {
    if (!currentId) return;
    setQuestions(prev => prev.map(q => (q.id === currentId ? { ...q, category: newCategory } : q)));
    setCategoryModalVisible(false);
    setCurrentId(null);
    Alert.alert('카테고리가 변경되었습니다.');
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <SubformHeader title="Q&A 답변" navigation={navigation} onBack={() => navigation?.goBack?.()} onHome={() => navigation.navigate('Home')} />

      <ScrollView contentContainerStyle={styles.content}>
        {/* Status Cards removed per request */}

        {/* Filter Tabs */}
        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.filterTabs} contentContainerStyle={{ paddingRight: 8 }}>
          {([
            { key: 'all', label: '전체' },
            { key: 'unanswered', label: '미답변' },
            { key: 'pending', label: '답변 요청 중' },
            { key: 'answered', label: '답변 완료' },
            { key: 'best', label: '베스트 답변' },
          ] as { key: FilterKey; label: string }[]).map(t => (
            <Pressable key={t.key} style={[styles.filterTab, filter === t.key && styles.filterTabActive]} onPress={() => setFilter(t.key)}>
              <Text style={[styles.filterTabText, filter === t.key && styles.filterTabTextActive]}>{t.label}</Text>
            </Pressable>
          ))}
        </ScrollView>

        {/* Question List */}
        <View style={styles.list}>
          {filtered.map(q => (
            <View key={q.id} style={styles.card}>
              {/* Header */}
              <View style={styles.cardHeader}>
                <Text style={styles.cardTitle}>{q.title}</Text>
                <View style={[styles.statusBadge,
                  q.status === 'unanswered' ? styles.badgeUnanswered :
                  q.status === 'pending' ? styles.badgePending :
                  q.status === 'answered' ? styles.badgeAnswered : styles.badgeBest,
                ]}>
                  <Text style={styles.badgeText}>
                    {q.status === 'unanswered' ? '미답변' : q.status === 'pending' ? '답변 요청 중' : q.status === 'answered' ? '답변 완료' : '베스트 답변'}
                  </Text>
                </View>
              </View>

              {/* Content */}
              <Text style={styles.cardContent} numberOfLines={2}>{q.content}</Text>

              {/* Meta */}
              <View style={styles.cardMeta}>
                <View style={styles.metaInfo}>
                  <View style={styles.metaItem}>
                    <FontAwesome name="user" size={12} color="#777" />
                    <Text style={styles.metaText}>{q.author}</Text>
                  </View>
                  <View style={styles.metaItem}>
                    <FontAwesome name="folder" size={12} color="#777" />
                    <Text style={styles.metaText}>{q.category}</Text>
                  </View>
                  <View style={styles.metaItem}>
                    <FontAwesome name="eye" size={12} color="#777" />
                    <Text style={styles.metaText}>{q.views}</Text>
                  </View>
                </View>
                <View style={styles.metaItem}>
                  <FontAwesome name="clock-o" size={12} color="#777" />
                  <Text style={styles.metaText}>{q.time}</Text>
                </View>
              </View>

              {/* Actions */}
              <View style={styles.actions}>
                {(q.status === 'unanswered' || q.status === 'pending') && (
                  <Pressable style={[styles.btn, styles.btnPrimary]} onPress={() => openAnswerModal(q.id)}>
                    <Text style={styles.btnTextPrimary}>답변 작성</Text>
                  </Pressable>
                )}
                {(q.status === 'answered' || q.status === 'best') && (
                  <Pressable style={[styles.btn, styles.btnPrimary]} onPress={() => openAnswerModal(q.id)}>
                    <Text style={styles.btnTextPrimary}>답변 수정</Text>
                  </Pressable>
                )}
                {q.status === 'pending' ? (
                  <Pressable style={[styles.btn, styles.btnWarning]} onPress={() => cancelExpertRequest(q.id)}>
                    <Text style={styles.btnTextWhite}>요청 취소</Text>
                  </Pressable>
                ) : (
                  <Pressable style={[styles.btn, styles.btnOutline]} onPress={() => openExpertModal(q.id)}>
                    <Text style={styles.btnTextOutline}>전문가 요청</Text>
                  </Pressable>
                )}
                <Pressable style={[styles.btn, styles.btnOutline]} onPress={() => openCategoryModal(q.id)}>
                  <Text style={styles.btnTextOutline}>카테고리 변경</Text>
                </Pressable>
                {q.status === 'answered' && (
                  <Pressable style={[styles.btn, styles.btnSuccess]} onPress={() => markAsBest(q.id)}>
                    <Text style={styles.btnTextWhite}>베스트 답변</Text>
                  </Pressable>
                )}
                {q.status === 'best' && (
                  <Pressable style={[styles.btn, styles.btnOutline]} onPress={() => unmarkBest(q.id)}>
                    <Text style={styles.btnTextOutline}>베스트 해제</Text>
                  </Pressable>
                )}
                {q.status === 'answered' && (
                  <Pressable style={[styles.btn, styles.btnOutline]} onPress={() => deleteAnswer(q.id)}>
                    <Text style={styles.btnTextOutline}>답변 삭제</Text>
                  </Pressable>
                )}
              </View>
            </View>
          ))}
        </View>

        {/* Bottom Nav spacer removed per request */}
      </ScrollView>

      {/* Bottom Navigation removed per request */}

      {/* Answer Modal */}
      <Modal visible={answerModalVisible} transparent animationType="fade" onRequestClose={() => setAnswerModalVisible(false)}>
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>{questions.find(q => q.id === currentId)?.status === 'answered' || questions.find(q => q.id === currentId)?.status === 'best' ? '답변 수정' : '답변 작성'}</Text>
              <Pressable style={styles.modalClose} onPress={() => setAnswerModalVisible(false)}>
                <FontAwesome name="times" size={16} color="#777" />
              </Pressable>
            </View>
            <ScrollView style={{ maxHeight: '70%' }}>
              <View style={styles.formGroup}>
                <Text style={styles.formLabel}>질문</Text>
                <View style={styles.questionBox}>
                  <Text style={styles.questionTitle}>{questions.find(q => q.id === currentId)?.title}</Text>
                  <Text style={styles.questionContent}>{questions.find(q => q.id === currentId)?.content}</Text>
                </View>
              </View>
              <View style={styles.formGroup}>
                <Text style={styles.formLabel}>답변 내용</Text>
                <TextInput
                  style={styles.textarea}
                  placeholder="답변 내용을 입력하세요..."
                  value={answerContent}
                  onChangeText={setAnswerContent}
                  multiline
                />
              </View>
              {(questions.find(q => q.id === currentId)?.status === 'answered' || questions.find(q => q.id === currentId)?.status === 'best') && (
                <View style={styles.answerSection}>
                  <View style={styles.answerHeader}>
                    <Text style={styles.answerTitle}>기존 답변</Text>
                    <View style={styles.answerBadge}><Text style={styles.answerBadgeText}>수정 모드</Text></View>
                  </View>
                  <View style={styles.answerContentBox}>
                    <Text style={styles.answerContentText}>{questions.find(q => q.id === currentId)?.answer ?? '기존 답변 내용이 여기에 표시됩니다.'}</Text>
                  </View>
                  <View style={styles.answerMeta}>
                    <Text style={styles.metaText}>작성자: 관리자</Text>
                    <Text style={styles.metaText}>2025.01.15 14:30</Text>
                  </View>
                </View>
              )}
            </ScrollView>
            <View style={styles.modalFooter}>
              <Pressable style={[styles.btn, styles.btnOutline]} onPress={() => setAnswerModalVisible(false)}>
                <Text style={styles.btnTextOutline}>취소</Text>
              </Pressable>
              <Pressable style={[styles.btn, styles.btnPrimary]} onPress={saveAnswer}>
                <Text style={styles.btnTextPrimary}>저장</Text>
              </Pressable>
            </View>
          </View>
        </View>
      </Modal>

      {/* Expert Modal */}
      <Modal visible={expertModalVisible} transparent animationType="fade" onRequestClose={() => setExpertModalVisible(false)}>
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>전문가 답변 요청</Text>
              <Pressable style={styles.modalClose} onPress={() => setExpertModalVisible(false)}>
                <FontAwesome name="times" size={16} color="#777" />
              </Pressable>
            </View>
            <ScrollView style={{ maxHeight: '70%' }}>
              <View style={styles.formGroup}>
                <Text style={styles.formLabel}>전문가 선택</Text>
                <View style={styles.expertList}>
                  {experts.map(e => (
                    <Pressable
                      key={e.id}
                      style={[styles.expertItem, selectedExpertId === e.id && styles.expertItemSelected]}
                      onPress={() => setSelectedExpertId(e.id)}
                    >
                      <View style={styles.expertAvatar}><Text style={styles.expertAvatarText}>{e.badge}</Text></View>
                      <View style={{ flex: 1 }}>
                        <Text style={styles.expertName}>{e.name}</Text>
                        <Text style={styles.expertField}>{e.field}</Text>
                      </View>
                    </Pressable>
                  ))}
                </View>
              </View>
              <View style={styles.formGroup}>
                <Text style={styles.formLabel}>요청 사유</Text>
                <TextInput
                  style={styles.textarea}
                  placeholder="전문가에게 요청할 사유를 입력하세요..."
                  value={requestReason}
                  onChangeText={setRequestReason}
                  multiline
                />
              </View>
            </ScrollView>
            <View style={styles.modalFooter}>
              <Pressable style={[styles.btn, styles.btnOutline]} onPress={() => setExpertModalVisible(false)}>
                <Text style={styles.btnTextOutline}>취소</Text>
              </Pressable>
              <Pressable style={[styles.btn, styles.btnPrimary]} onPress={requestExpertAnswer}>
                <Text style={styles.btnTextPrimary}>요청</Text>
              </Pressable>
            </View>
          </View>
        </View>
      </Modal>

      {/* Category Modal */}
      <Modal visible={categoryModalVisible} transparent animationType="fade" onRequestClose={() => setCategoryModalVisible(false)}>
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>카테고리 변경</Text>
              <Pressable style={styles.modalClose} onPress={() => setCategoryModalVisible(false)}>
                <FontAwesome name="times" size={16} color="#777" />
              </Pressable>
            </View>
            <ScrollView style={{ maxHeight: '70%' }}>
              <View style={styles.formGroup}>
                <Text style={styles.formLabel}>새 카테고리</Text>
                <View style={styles.categoryList}>
                  {categoryOptions.map(opt => (
                    <Pressable key={opt} style={[styles.categoryItem, newCategory === opt && styles.categoryItemSelected]} onPress={() => setNewCategory(opt)}>
                      <Text style={[styles.categoryText, newCategory === opt && styles.categoryTextSelected]}>{opt}</Text>
                    </Pressable>
                  ))}
                </View>
              </View>
            </ScrollView>
            <View style={styles.modalFooter}>
              <Pressable style={[styles.btn, styles.btnOutline]} onPress={() => setCategoryModalVisible(false)}>
                <Text style={styles.btnTextOutline}>취소</Text>
              </Pressable>
              <Pressable style={[styles.btn, styles.btnPrimary]} onPress={saveCategoryChange}>
                <Text style={styles.btnTextPrimary}>변경</Text>
              </Pressable>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
}
