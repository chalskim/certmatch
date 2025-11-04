import React, { useMemo, useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, Modal } from 'react-native';
import { FontAwesome5 } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import ScreenHeader from '../components/ScreenHeader';

type CourseStatus = 'before' | 'active' | 'full' | 'completed';

interface CourseItem {
  id: number;
  title: string;
  status: CourseStatus;
  students: number;
  capacity: number;
  startDate: string;
  endDate: string;
  price: number;
}

// 인증 교육 목록 화면
export const EducationList: React.FC = () => {
  const navigation = useNavigation();

  // Mock 데이터 (HTML에서 가져온 값 그대로 사용)
  const courses: CourseItem[] = useMemo(() => ([
    { id: 1, title: 'ISMS-P 심사원 기본과정', status: 'active', students: 25, capacity: 30, startDate: '2025-03-01', endDate: '2025-03-31', price: 3_500_000 },
    { id: 2, title: 'ISO 27001 Lead Auditor 과정', status: 'full', students: 20, capacity: 20, startDate: '2025-03-10', endDate: '2025-03-14', price: 4_800_000 },
    { id: 3, title: '정보보호 실무자 양성과정', status: 'completed', students: 15, capacity: 25, startDate: '2025-01-15', endDate: '2025-02-15', price: 2_500_000 },
    { id: 4, title: '개인정보보호 관리자 과정', status: 'before', students: 0, capacity: 25, startDate: '2025-04-01', endDate: '2025-04-30', price: 2_800_000 },
    { id: 5, title: '클라우드 보안 전문가 과정', status: 'active', students: 18, capacity: 30, startDate: '2025-03-15', endDate: '2025-04-15', price: 4_200_000 },
  ]), []);

  const [filter, setFilter] = useState<'all' | CourseStatus>('all');
  const [toast, setToast] = useState<string | null>(null);

  const filteredCourses = useMemo(() => {
    if (filter === 'all') return courses;
    return courses.filter(c => c.status === filter);
  }, [courses, filter]);

  function showToast(message: string) {
    setToast(message);
    setTimeout(() => setToast(null), 3000);
  }

  function getStatusBadgeStyle(status: CourseStatus) {
    switch (status) {
      case 'before':
        return { backgroundColor: '#e2e3e5', color: '#383d41' };
      case 'active':
        return { backgroundColor: '#d1ecf1', color: '#0c5460' };
      case 'full':
        return { backgroundColor: '#fff3cd', color: '#856404' };
      case 'completed':
        return { backgroundColor: '#d4edda', color: '#155724' };
      default:
        return { backgroundColor: '#eee', color: '#333' };
    }
  }

  function statusLabel(status: CourseStatus) {
    return (
      status === 'before' ? '모집전' :
      status === 'active' ? '모집중' :
      status === 'full' ? '마감' : '완료'
    );
  }

  return (
    <ScrollView style={styles.root} contentContainerStyle={{ paddingBottom: 120 }}>
      {/* 상단 헤더 */}
      <ScreenHeader
        title="교육 관리 센터"
        backgroundColor="#4a6fdc"
        titleColor="#fff"
        onBack={() => navigation.goBack()}
        onHome={() => navigation.navigate('Home' as never)}
      />

      <View style={styles.container}>
        {/* 대시보드 타이틀 */}
        <View style={styles.dashboardHeader}>
          <Text style={styles.pageTitle}>등록한 교육과정</Text>
          <TouchableOpacity style={styles.btnPrimary} onPress={() => showToast('새 교육과정 등록 페이지로 이동합니다.')}> 
            <FontAwesome5 name="plus" size={14} color="#fff" style={{ marginRight: 6 }} />
            <Text style={styles.btnPrimaryText}>새 과정 등록</Text>
          </TouchableOpacity>
        </View>

        {/* 필터 버튼 */}
        <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 6 }}>
          <View style={styles.filterContainer}>
            {[
              { key: 'all', label: '전체' },
              { key: 'before', label: '모집전' },
              { key: 'active', label: '모집중' },
              { key: 'full', label: '마감' },
              { key: 'completed', label: '완료' },
            ].map(f => (
              <TouchableOpacity
                key={f.key}
                style={[styles.filterBtn, filter === (f.key as any) && styles.filterBtnActive]}
                onPress={() => setFilter(f.key as any)}
              >
                <Text style={[styles.filterBtnText, filter === (f.key as any) && styles.filterBtnTextActive]}>{f.label}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </ScrollView>

        {/* 목록 */}
        <View style={styles.cardList}>
          {filteredCourses.length === 0 ? (
            <View style={styles.emptyState}>
              <FontAwesome5 name="graduation-cap" size={48} color="#ddd" />
              <Text style={styles.emptyStateText}>해당 상태의 교육과정이 없습니다.</Text>
            </View>
          ) : (
            filteredCourses.map(course => (
              <TouchableOpacity key={course.id} style={styles.courseCard} onPress={() => showToast('상세 화면은 준비 중입니다.')}> 
                <View style={styles.cardHeader}>
                  <Text style={styles.cardTitle}>{course.title}</Text>
                  {(() => {
                    const style = getStatusBadgeStyle(course.status);
                    return (
                      <View style={[styles.cardStatus, { backgroundColor: style.backgroundColor }]}> 
                        <Text style={{ color: style.color, fontSize: 12, fontWeight: '600' }}>{statusLabel(course.status)}</Text>
                      </View>
                    );
                  })()}
                </View>

                <View style={styles.cardMeta}>
                  <View style={styles.cardMetaItem}>
                    <FontAwesome5 name="users" size={14} color="#4a6fdc" style={{ marginRight: 6 }} />
                    <Text style={styles.cardMetaText}>수강생: {course.students}/{course.capacity}명</Text>
                  </View>
                  <View style={styles.cardMetaItem}>
                    <FontAwesome5 name="calendar" size={14} color="#4a6fdc" style={{ marginRight: 6 }} />
                    <Text style={styles.cardMetaText}>{course.startDate} ~ {course.endDate}</Text>
                  </View>
                  <View style={styles.cardMetaItem}>
                    <FontAwesome5 name="won-sign" size={14} color="#4a6fdc" style={{ marginRight: 6 }} />
                    <Text style={styles.cardMetaText}>{course.price.toLocaleString()}원</Text>
                  </View>
                </View>

                <View style={styles.cardFooter}>
                  <Text style={styles.cardDate}>등록일: 2025-02-01</Text>
                  <Text style={styles.cardHint}>클릭하여 상세 정보 보기</Text>
                </View>
              </TouchableOpacity>
            ))
          )}
        </View>
      </View>

      {/* Toast */}
      <Modal transparent visible={!!toast} animationType="fade" onRequestClose={() => setToast(null)}>
        <View style={styles.toastBackdrop}>
          <View style={styles.toast}>
            <Text style={styles.toastText}>{toast}</Text>
          </View>
        </View>
      </Modal>
    </ScrollView>
  );
};

const styles = {
  root: { backgroundColor: '#f8f9fa' },
  header: {
    height: 60,
    backgroundColor: '#4a6fdc',
    flexDirection: 'row' as const,
    alignItems: 'center' as const,
    justifyContent: 'space-between' as const,
    paddingHorizontal: 16,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 5,
    shadowOffset: { width: 0, height: 2 },
  },
  headerIcon: {
    width: 40, height: 40, borderRadius: 20,
    alignItems: 'center' as const, justifyContent: 'center' as const,
  },
  headerTitle: { color: '#fff', fontSize: 18, fontWeight: '700' as const },

  container: { padding: 16 },

  dashboardHeader: {
    flexDirection: 'row' as const,
    alignItems: 'center' as const,
    justifyContent: 'space-between' as const,
    marginBottom: 16,
  },
  pageTitle: { fontSize: 22, fontWeight: '800' as const, color: '#333' },
  btnPrimary: {
    backgroundColor: '#4a6fdc',
    flexDirection: 'row' as const,
    alignItems: 'center' as const,
    paddingHorizontal: 12, paddingVertical: 8,
    borderRadius: 6,
  },
  btnPrimaryText: { color: '#fff', fontSize: 14, fontWeight: '700' as const },

  filterContainer: { flexDirection: 'row' as const, gap: 10 },
  filterBtn: {
    paddingHorizontal: 16, paddingVertical: 8,
    borderWidth: 1, borderColor: '#ddd', backgroundColor: '#fff', borderRadius: 20,
  },
  filterBtnActive: { backgroundColor: '#4a6fdc', borderColor: '#4a6fdc' },
  filterBtnText: { color: '#333', fontSize: 14 },
  filterBtnTextActive: { color: '#fff', fontWeight: '700' as const },

  cardList: { gap: 12 },
  courseCard: {
    backgroundColor: '#fff', borderRadius: 10, padding: 16,
    shadowColor: '#000', shadowOpacity: 0.05, shadowRadius: 5, shadowOffset: { width: 0, height: 2 },
  },
  cardHeader: {
    flexDirection: 'row' as const,
    alignItems: 'flex-start' as const,
    justifyContent: 'space-between' as const,
    marginBottom: 8,
  },
  cardTitle: { fontSize: 18, fontWeight: '700' as const, color: '#333' },
  cardStatus: { paddingHorizontal: 10, paddingVertical: 6, borderRadius: 15 },

  cardMeta: { flexDirection: 'row' as const, alignItems: 'center' as const, flexWrap: 'wrap' as const, gap: 12, marginVertical: 8 },
  cardMetaItem: { flexDirection: 'row' as const, alignItems: 'center' as const },
  cardMetaText: { fontSize: 14, color: '#666' },

  cardFooter: { flexDirection: 'row' as const, alignItems: 'center' as const, justifyContent: 'space-between' as const, marginTop: 12, paddingTop: 12, borderTopWidth: 1, borderTopColor: '#eee' },
  cardDate: { fontSize: 12, color: '#999' },
  cardHint: { fontSize: 12, color: '#999' },

  emptyState: { alignItems: 'center' as const, paddingVertical: 40, gap: 10 },
  emptyStateText: { color: '#999', fontSize: 14 },

  toastBackdrop: { flex: 1, alignItems: 'center' as const, justifyContent: 'center' as const, backgroundColor: 'rgba(0,0,0,0.4)' },
  toast: { backgroundColor: 'rgba(0,0,0,0.8)', borderRadius: 6, paddingHorizontal: 16, paddingVertical: 10 },
  toastText: { color: '#fff' },
} as const;

export default EducationList;