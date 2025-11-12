import React, { useMemo, useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, Modal } from 'react-native';
import { FontAwesome5 } from '@expo/vector-icons';
import { useNavigation, useRoute, NavigationProp, ParamListBase } from '@react-navigation/native';
import SubformHeader from '../components/SubformHeader';
import { styles } from '../styles/menu/EducationListDetail';

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

interface StudentItem {
  id: number;
  courseId: number;
  name: string;
  email: string;
  attendance: boolean;
  completed: boolean;
}

interface EvaluationItem {
  id: number;
  courseId: number;
  title: string;
  date: string;
  status: 'scheduled' | 'completed';
}

interface ReviewItem {
  id: number;
  courseId: number;
  studentName: string;
  courseName: string;
  rating: number; // 1~5
  content: string;
  date: string;
}

// 인증 교육 상세 화면
const EducationListDetail: React.FC = () => {
  const navigation = useNavigation<NavigationProp<ParamListBase>>();
  const route = useRoute<any>();
  const courseIdFromParams: number | undefined = route?.params?.courseId;

  // Mock 데이터 (HTML에서 가져온 값 그대로 사용)
  const courses: CourseItem[] = useMemo(() => ([
    { id: 1, title: 'ISMS-P 심사원 기본과정', status: 'active', students: 25, capacity: 30, startDate: '2025-03-01', endDate: '2025-03-31', price: 3_500_000 },
    { id: 2, title: 'ISO 27001 Lead Auditor 과정', status: 'full', students: 20, capacity: 20, startDate: '2025-03-10', endDate: '2025-03-14', price: 4_800_000 },
    { id: 3, title: '정보보호 실무자 양성과정', status: 'completed', students: 15, capacity: 25, startDate: '2025-01-15', endDate: '2025-02-15', price: 2_500_000 },
    { id: 4, title: '개인정보보호 관리자 과정', status: 'before', students: 0, capacity: 25, startDate: '2025-04-01', endDate: '2025-04-30', price: 2_800_000 },
    { id: 5, title: '클라우드 보안 전문가 과정', status: 'active', students: 18, capacity: 30, startDate: '2025-03-15', endDate: '2025-04-15', price: 4_200_000 },
  ]), []);

  const studentsAll: StudentItem[] = useMemo(() => ([
    { id: 1, courseId: 1, name: '김민수', email: 'kimms@example.com', attendance: true, completed: false },
    { id: 2, courseId: 1, name: '이지영', email: 'leejy@example.com', attendance: false, completed: false },
    { id: 3, courseId: 1, name: '박준호', email: 'parkjh@example.com', attendance: true, completed: false },
    { id: 4, courseId: 2, name: '최서연', email: 'choisy@example.com', attendance: true, completed: false },
    { id: 5, courseId: 2, name: '정민철', email: 'jeongmc@example.com', attendance: true, completed: false },
    { id: 6, courseId: 3, name: '홍길동', email: 'honggd@example.com', attendance: true, completed: true },
    { id: 7, courseId: 3, name: '김철수', email: 'kimcs@example.com', attendance: true, completed: true },
    { id: 8, courseId: 4, name: '이영희', email: 'leeyh@example.com', attendance: false, completed: false },
    { id: 9, courseId: 5, name: '박상민', email: 'parksm@example.com', attendance: true, completed: false },
    { id: 10, courseId: 5, name: '최지아', email: 'choija@example.com', attendance: false, completed: false },
  ]), []);

  const evaluationsAll: EvaluationItem[] = useMemo(() => ([
    { id: 1, courseId: 1, title: '중간고사', date: '2025-03-15', status: 'scheduled' },
    { id: 2, courseId: 1, title: '기말고사', date: '2025-03-29', status: 'scheduled' },
    { id: 3, courseId: 3, title: '최종 평가', date: '2025-02-14', status: 'completed' },
    { id: 4, courseId: 2, title: '실습 평가', date: '2025-03-12', status: 'completed' },
    { id: 5, courseId: 5, title: '중간 평가', date: '2025-04-01', status: 'scheduled' },
  ]), []);

  const reviewsAll: ReviewItem[] = useMemo(() => ([
    { id: 1, courseId: 3, studentName: '홍길동', courseName: '정보보호 실무자 양성과정', rating: 5, content: '실무에 바로 적용할 수 있는 유용한 내용이 많았습니다. 강사님의 설명도 명확해서 만족스러웠습니다.', date: '2025-02-20' },
    { id: 2, courseId: 3, studentName: '김철수', courseName: '정보보호 실무자 양성과정', rating: 4, content: '전반적으로 좋은 교육이었으나, 실습 시간이 조금 더 많았으면 좋겠습니다.', date: '2025-02-18' },
    { id: 3, courseId: 2, studentName: '최서연', courseName: 'ISO 27001 Lead Auditor 과정', rating: 5, content: '매우 전문적인 내용이었고, 실제 심사 시뮬레이션이 도움이 많이 되었습니다.', date: '2025-03-13' },
  ]), []);

  const courseId = courseIdFromParams ?? 1;
  const currentCourse = courses.find(c => c.id === courseId) ?? courses[0];

  const [currentTab, setCurrentTab] = useState<'info' | 'students' | 'evaluations' | 'reviews'>('info');
  const [toast, setToast] = useState<string | null>(null);
  const [certificateModalVisible, setCertificateModalVisible] = useState(false);
  const [selectedStatus, setSelectedStatus] = useState<CourseStatus>(currentCourse.status);
  const [students, setStudents] = useState<StudentItem[]>(studentsAll.filter(s => s.courseId === currentCourse.id));

  const evaluations = useMemo(() => evaluationsAll.filter(e => e.courseId === currentCourse.id), [evaluationsAll, currentCourse.id]);
  const reviews = useMemo(() => reviewsAll.filter(r => r.courseId === currentCourse.id), [reviewsAll, currentCourse.id]);

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

  function toggleAttendance(studentId: number) {
    setStudents(prev => prev.map(s => s.id === studentId ? { ...s, attendance: !s.attendance } : s));
  }

  function toggleCompleted(studentId: number) {
    setStudents(prev => prev.map(s => s.id === studentId ? { ...s, completed: !s.completed } : s));
  }

  function openCertificateModal() {
    setCertificateModalVisible(true);
  }

  function closeCertificateModal() {
    setCertificateModalVisible(false);
  }

  function confirmIssueCertificate() {
    const eligible = students.filter(s => s.completed);
    if (eligible.length === 0) {
      showToast('수료 요건을 충족한 수강생이 없습니다.');
      setCertificateModalVisible(false);
      return;
    }
    // 실제 발급 로직은 API 연동 시 구현
    showToast(`${eligible.length}명의 수강생에게 수료증을 발급했습니다.`);
    setCertificateModalVisible(false);
  }

  function applyStatusChange() {
    showToast(`과정 상태를 "${statusLabel(selectedStatus)}"(으)로 변경했습니다.`);
  }

  return (
    <ScrollView style={styles.root} contentContainerStyle={{ paddingBottom: 120 }}>
      {/* 상단 헤더 */}
      <SubformHeader
        title="교육과정 상세"
        onBack={() => navigation.goBack()}
        onHome={() => navigation.navigate('Home')}
      />

      <View style={styles.container}>
        {/* 탭 네비게이션 */}
        <View style={styles.detailTabs}>
          {[
            { key: 'info', icon: 'info-circle', label: '정보' },
            { key: 'students', icon: 'users', label: '수강생' },
            { key: 'evaluations', icon: 'clipboard-check', label: '평가' },
            { key: 'reviews', icon: 'star', label: '리뷰' },
          ].map(t => (
            <TouchableOpacity
              key={t.key}
              style={[styles.detailTab, currentTab === (t.key as any) && styles.detailTabActive]}
              onPress={() => setCurrentTab(t.key as any)}
            >
              <FontAwesome5 name={t.icon as any} size={18} color={currentTab === (t.key as any) ? '#4a6fdc' : '#666'} />
              <Text style={[styles.detailTabText, currentTab === (t.key as any) && styles.detailTabTextActive]}>{t.label}</Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* 탭 콘텐츠 */}
        {currentTab === 'info' && (
          <View>
            {/* 과정 카드 */}
            <View style={styles.courseCard}>
              <View style={styles.cardHeader}>
                <Text style={styles.cardTitle}>{currentCourse.title}</Text>
                {(() => {
                  const style = getStatusBadgeStyle(currentCourse.status);
                  return (
                    <View style={[styles.cardStatus, { backgroundColor: style.backgroundColor }]}> 
                      <Text style={{ color: style.color, fontSize: 12, fontWeight: '600' }}>{statusLabel(currentCourse.status)}</Text>
                    </View>
                  );
                })()}
              </View>

              <View style={styles.cardMeta}>
                <View style={styles.cardMetaItem}>
                  <FontAwesome5 name="users" size={14} color="#4a6fdc" style={{ marginRight: 6 }} />
                  <Text style={styles.cardMetaText}>수강생: {currentCourse.students}/{currentCourse.capacity}명</Text>
                </View>
                <View style={styles.cardMetaItem}>
                  <FontAwesome5 name="calendar" size={14} color="#4a6fdc" style={{ marginRight: 6 }} />
                  <Text style={styles.cardMetaText}>{currentCourse.startDate} ~ {currentCourse.endDate}</Text>
                </View>
                <View style={styles.cardMetaItem}>
                  <FontAwesome5 name="won-sign" size={14} color="#4a6fdc" style={{ marginRight: 6 }} />
                  <Text style={styles.cardMetaText}>{currentCourse.price.toLocaleString()}원</Text>
                </View>
              </View>
            </View>

            {/* 상태 변경 섹션 */}
            <View style={styles.statusChangeSection}>
              <View style={styles.sectionTitleRow}>
                <FontAwesome5 name="toggle-on" size={18} color="#4a6fdc" style={{ marginRight: 8 }} />
                <Text style={styles.sectionTitle}>상태 변경</Text>
              </View>

              <View style={styles.statusOptions}>
                {(['before', 'active', 'full', 'completed'] as CourseStatus[]).map(st => (
                  <TouchableOpacity
                    key={st}
                    style={[styles.statusOption, selectedStatus === st && styles.statusOptionSelected]}
                    onPress={() => setSelectedStatus(st)}
                  >
                    <View style={styles.radio}>
                      <View style={[styles.radioInner, selectedStatus === st && styles.radioInnerSelected]} />
                    </View>
                    <View style={{ flex: 1 }}>
                      <Text style={styles.statusOptionLabel}>{statusLabel(st)}</Text>
                      <Text style={styles.statusOptionDesc}>
                        {st === 'before' && '공개 전 상태로 설정합니다.'}
                        {st === 'active' && '모집 중인 상태로 표시합니다.'}
                        {st === 'full' && '정원이 초과되어 모집을 중단합니다.'}
                        {st === 'completed' && '교육이 완료된 상태로 표시합니다.'}
                      </Text>
                    </View>
                  </TouchableOpacity>
                ))}
              </View>

              <View style={styles.statusActions}>
                <TouchableOpacity style={styles.btnPrimary} onPress={applyStatusChange}>
                  <Text style={styles.btnPrimaryText}>변경 적용</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.btnSecondary} onPress={() => setSelectedStatus(currentCourse.status)}>
                  <Text style={styles.btnSecondaryText}>취소</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        )}

        {currentTab === 'students' && (
          <View style={styles.studentList}>
            {students.length === 0 ? (
              <View style={styles.emptyState}>
                <FontAwesome5 name="user-slash" size={48} color="#ddd" />
                <Text style={styles.emptyStateText}>수강생이 없습니다.</Text>
              </View>
            ) : (
              students.map(s => (
                <View key={s.id} style={styles.studentItem}>
                  <View style={styles.studentAvatar}><Text style={{ color: '#999' }}>👤</Text></View>
                  <View style={styles.studentInfo}>
                    <Text style={styles.studentName}>{s.name}</Text>
                    <Text style={styles.studentEmail}>{s.email}</Text>
                  </View>
                  <View style={styles.studentStatus}>
                    <TouchableOpacity onPress={() => toggleAttendance(s.id)} style={styles.badge}>
                      <Text style={[styles.badgeText, { color: s.attendance ? '#fff' : '#333' }]}>{s.attendance ? '출석' : '결석'}</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => toggleCompleted(s.id)} style={[styles.badge, { backgroundColor: s.completed ? '#51cf66' : '#e0e0e0' }]}>
                      <Text style={[styles.badgeText, { color: s.completed ? '#fff' : '#333' }]}>{s.completed ? '수료' : '미수료'}</Text>
                    </TouchableOpacity>
                  </View>
                </View>
              ))
            )}
          </View>
        )}

        {currentTab === 'evaluations' && (
          <View>
            {evaluations.length === 0 ? (
              <View style={styles.emptyState}>
                <FontAwesome5 name="clipboard" size={48} color="#ddd" />
                <Text style={styles.emptyStateText}>평가 일정이 없습니다.</Text>
              </View>
            ) : (
              evaluations.map(ev => (
                <View key={ev.id} style={styles.reviewCard}>
                  <View style={styles.reviewHeader}>
                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                      <FontAwesome5 name={ev.status === 'completed' ? 'check-circle' : 'calendar'} size={16} color="#4a6fdc" style={{ marginRight: 8 }} />
                      <Text style={{ fontWeight: '700', fontSize: 14 }}>{ev.title}</Text>
                    </View>
                    <Text style={{ color: ev.status === 'completed' ? '#155724' : '#0c5460' }}>{ev.date}</Text>
                  </View>
                  <Text style={styles.reviewContent}>{ev.status === 'completed' ? '평가가 완료되었습니다.' : '예정된 평가입니다.'}</Text>
                </View>
              ))
            )}
          </View>
        )}

        {currentTab === 'reviews' && (
          <View>
            {reviews.length === 0 ? (
              <View style={styles.emptyState}>
                <FontAwesome5 name="star" size={48} color="#ddd" />
                <Text style={styles.emptyStateText}>등록된 리뷰가 없습니다.</Text>
              </View>
            ) : (
              reviews.map(review => (
                <View key={review.id} style={styles.reviewCard}>
                  <View style={styles.reviewHeader}>
                    <View style={styles.reviewerInfo}>
                      <View style={styles.reviewerAvatar}><Text>👤</Text></View>
                      <View>
                        <Text style={styles.reviewerName}>{review.studentName}</Text>
                        <Text style={styles.reviewCourse}>{review.courseName}</Text>
                      </View>
                    </View>
                    <Text style={styles.reviewRating}>{'★'.repeat(review.rating)}{'☆'.repeat(5 - review.rating)}</Text>
                  </View>
                  <Text style={styles.reviewContent}>{review.content}</Text>
                  <Text style={styles.reviewDate}>{review.date}</Text>
                </View>
              ))
            )}
          </View>
        )}
      </View>

      {/* Floating button */}
      <TouchableOpacity style={styles.floatingBtn} onPress={openCertificateModal}>
        <FontAwesome5 name="certificate" size={20} color="#fff" />
      </TouchableOpacity>

      {/* 수료증 발급 모달 */}
      <Modal visible={certificateModalVisible} animationType="slide" onRequestClose={closeCertificateModal} transparent>
        <View style={styles.modalBackdrop}>
          <View style={styles.modalContent}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>수료증 발급</Text>
              <TouchableOpacity onPress={closeCertificateModal}>
                <Text style={styles.modalClose}>×</Text>
              </TouchableOpacity>
            </View>
            <View style={styles.modalBody}>
              <Text style={{ marginBottom: 8 }}>과정: {currentCourse.title}</Text>
              <Text style={{ marginBottom: 8 }}>수료 대상자:</Text>
              <View style={{ gap: 6 }}>
                {students.filter(s => s.completed).map(s => (
                  <View key={s.id} style={{ flexDirection: 'row', alignItems: 'center', gap: 8 }}>
                    <FontAwesome5 name="user" size={14} color="#4a6fdc" />
                    <Text>{s.name}</Text>
                  </View>
                ))}
                {students.filter(s => s.completed).length === 0 && (
                  <Text style={{ color: '#999' }}>수료 대상자가 없습니다.</Text>
                )}
              </View>
            </View>
            <View style={styles.modalFooter}>
              <TouchableOpacity style={styles.btnSecondary} onPress={closeCertificateModal}>
                <Text style={styles.btnSecondaryText}>취소</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.btnSuccess} onPress={confirmIssueCertificate}>
                <Text style={styles.btnSuccessText}>발급하기</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>

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

export default EducationListDetail;