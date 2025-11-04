import React, { useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, Modal } from 'react-native';
import { FontAwesome5 } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { styles } from '../styles/menu/ExpertProfessionalDetail';

// 인증 전문가 등록 상세내역 화면
export const ExpertProfessionalDetail: React.FC = () => {
  const navigation = useNavigation();

  // 데모용 상태 (실제 데이터 연동 시 services 사용 권장)
  const [status, setStatus] = useState<'running' | 'paused' | 'stopped'>('running');
  const [showEditModal, setShowEditModal] = useState(false);

  const expert = {
    name: '홍길동',
    title: '정보보호 컨설턴트 · ISMS-P',
    rating: 4.6,
    reviews: 32,
    projects: 18,
    responseTime: '평균 3시간 내 응답',
    tags: ['ISMS-P', 'ISO 27001', '개인정보보호', '보안 거버넌스'],
    period: { start: '2025-01-01', end: '2025-12-31' },
  };

  const documents = [
    { name: '자격증_ISMS-P.pdf', size: '245KB', uploadedAt: '2025-02-10' },
    { name: '포트폴리오_컨설팅_사례.zip', size: '3.1MB', uploadedAt: '2025-02-12' },
  ];

  const reviews = [
    {
      name: '김민수',
      company: '㈜테크솔루션',
      rating: 5,
      content: '프로젝트 진행이 매우 체계적이고 대응이 빨랐습니다. 문서화 품질도 우수했습니다.',
      date: '2025-02-20',
    },
    {
      name: '이수정',
      company: '㈜핀테크코리아',
      rating: 4,
      content: 'ISMS-P 인증 준비 과정에서 큰 도움을 받았습니다. 전반적으로 만족합니다.',
      date: '2025-02-05',
    },
  ];

  const ActionButton: React.FC<{ icon: any; label: string; color: string; onPress: () => void }> = ({ icon, label, color, onPress }) => (
    <TouchableOpacity style={[styles.adActionBtn, { backgroundColor: color }]} onPress={onPress}>
      <FontAwesome5 name={icon} size={16} color="#fff" style={{ marginRight: 8 }} />
      <Text style={{ color: '#fff', fontWeight: '600' }}>{label}</Text>
    </TouchableOpacity>
  );

  return (
    <ScrollView style={styles.root} contentContainerStyle={{ paddingBottom: 120 }}>
      {/* 상단 헤더 */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.headerIcon} accessibilityRole="button" accessibilityLabel="뒤로가기">
          <FontAwesome5 name="arrow-left" size={18} color="#333" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>전문가 상세</Text>
        <View style={{ width: 40 }} />
      </View>

      <View style={styles.container}>
        {/* 광고/프로필 영역 */}
        <View style={styles.adView}>
          <View style={styles.adHeader}>
            <Text style={styles.sectionTitle}>인증 전문가 등록 상세내역</Text>
            <View style={[styles.adStatus, status === 'running' ? styles.statusRunning : status === 'paused' ? styles.statusPaused : styles.statusStopped]}>
              <Text style={styles.adStatusText}>{status === 'running' ? '운영중' : status === 'paused' ? '일시중지' : '중지됨'}</Text>
            </View>
          </View>

          <View style={styles.adProfile}>
            <View style={styles.adAvatar}>
              <FontAwesome5 name="user-tie" size={36} color="#4a6fdc" />
            </View>
            <View style={{ flex: 1 }}>
              <Text style={styles.adName}>{expert.name}</Text>
              <Text style={styles.adTitle}>{expert.title}</Text>
              <View style={styles.adRating}>
                <Text style={{ color: '#ffc107', marginRight: 8 }}>★ {expert.rating.toFixed(1)}</Text>
                <Text style={styles.mutedText}>리뷰 {expert.reviews} · 프로젝트 {expert.projects}</Text>
              </View>
              <View style={styles.adStats}>
                <View style={styles.adStat}><Text style={styles.adStatValue}>{expert.projects}</Text><Text style={styles.adStatLabel}>프로젝트</Text></View>
                <View style={styles.adStat}><Text style={styles.adStatValue}>{expert.reviews}</Text><Text style={styles.adStatLabel}>리뷰</Text></View>
                <View style={styles.adStat}><Text style={styles.adStatValue}>3h</Text><Text style={styles.adStatLabel}>응답시간</Text></View>
              </View>
            </View>
          </View>

          <View style={{ marginBottom: 12 }}>
            <Text style={styles.adSectionTitle}><FontAwesome5 name="info-circle" size={14} color="#4a6fdc" /> 상세 소개</Text>
            <Text style={styles.adSectionContent}>ISMS-P 및 ISO 27001 인증 컨설팅 경험 다수. 정책/지침 수립과 위험 평가, 내부심사 대응까지 일괄 지원합니다.</Text>
          </View>

          <View style={{ marginBottom: 12 }}>
            <Text style={styles.adSectionTitle}><FontAwesome5 name="tags" size={14} color="#4a6fdc" /> 전문 태그</Text>
            <View style={styles.adTags}>
              {expert.tags.map((t) => (
                <View key={t} style={styles.adTag}><Text style={{ color: '#4a6fdc', fontSize: 12 }}>{t}</Text></View>
              ))}
            </View>
          </View>

          <View style={styles.adPeriod}>
            <Text style={styles.adPeriodInfo}>운영기간: <Text style={{ fontWeight: '700', color: '#333' }}>{expert.period.start}</Text> ~ <Text style={{ fontWeight: '700', color: '#333' }}>{expert.period.end}</Text></Text>
            <TouchableOpacity onPress={() => setShowEditModal(true)}>
              <Text style={{ color: '#4a6fdc', fontWeight: '600' }}>기간 수정</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.adActions}>
            <ActionButton icon="edit" label="수정" color="#4a6fdc" onPress={() => setShowEditModal(true)} />
            <ActionButton icon="pause" label="일시중지" color="#ffc107" onPress={() => setStatus('paused')} />
            <ActionButton icon="stop" label="중지" color="#dc3545" onPress={() => setStatus('stopped')} />
            <ActionButton icon="calendar-plus" label="기간연장" color="#28a745" onPress={() => setStatus('running')} />
          </View>
        </View>

        {/* 프로젝트 / 문서 섹션 */}
        <View style={styles.dashboardSection}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>프로젝트 문서</Text>
            <TouchableOpacity style={styles.uploadBtn}><Text style={styles.uploadBtnText}>문서 업로드</Text></TouchableOpacity>
          </View>

          {documents.length === 0 ? (
            <View style={styles.noDocuments}><Text style={styles.mutedText}>등록된 문서가 없습니다.</Text></View>
          ) : (
            <View style={styles.documentList}>
              {documents.map((doc, idx) => (
                <View key={idx} style={styles.documentItem}>
                  <View style={styles.documentInfo}>
                    <View style={styles.documentIcon}><FontAwesome5 name="file-alt" size={16} color="#666" /></View>
                    <View style={styles.documentDetails}>
                      <Text style={styles.documentName}>{doc.name}</Text>
                      <Text style={styles.documentMeta}>{doc.size} · 업로드: {doc.uploadedAt}</Text>
                    </View>
                  </View>
                  <View style={styles.documentActions}>
                    <TouchableOpacity style={styles.documentActionBtn}><Text style={styles.mutedText}>보기</Text></TouchableOpacity>
                    <TouchableOpacity style={styles.documentActionBtn}><Text style={styles.mutedText}>다운로드</Text></TouchableOpacity>
                    <TouchableOpacity style={styles.documentActionBtn}><Text style={{ color: '#dc3545' }}>삭제</Text></TouchableOpacity>
                  </View>
                </View>
              ))}
            </View>
          )}
        </View>

        {/* 리뷰 섹션 */}
        <View style={styles.dashboardSection}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>리뷰</Text>
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <FontAwesome5 name="star" size={14} color="#ffc107" />
              <Text style={{ marginLeft: 6, color: '#666' }}>{expert.rating.toFixed(1)} / 5.0</Text>
            </View>
          </View>

          {reviews.map((r, i) => (
            <View key={i} style={styles.reviewCard}>
              <View style={styles.reviewHeader}>
                <View style={styles.reviewerInfo}>
                  <View style={styles.reviewerAvatar}><FontAwesome5 name="user" size={16} color="#999" /></View>
                  <View>
                    <Text style={styles.reviewerName}>{r.name}</Text>
                    <Text style={styles.reviewCompany}>{r.company}</Text>
                  </View>
                </View>
                <Text style={styles.reviewRating}>{'★'.repeat(r.rating)}{'☆'.repeat(5 - r.rating)}</Text>
              </View>
              <Text style={styles.reviewContent}>{r.content}</Text>
              <Text style={styles.reviewDate}>{r.date}</Text>
            </View>
          ))}
        </View>
      </View>

      {/* 간단 수정 모달 */}
      <Modal visible={showEditModal} transparent animationType="fade" onRequestClose={() => setShowEditModal(false)}>
        <View style={styles.modalBackdrop}>
          <View style={styles.modalContent}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>상세 정보 수정</Text>
              <TouchableOpacity onPress={() => setShowEditModal(false)}><FontAwesome5 name="times" size={20} color="#999" /></TouchableOpacity>
            </View>
            <Text style={styles.mutedText}>데모 화면입니다. 실제 수정 폼은 API 연동 후 구성하세요.</Text>
            <View style={styles.modalFooter}>
              <TouchableOpacity style={[styles.btn, styles.btnSecondary]} onPress={() => setShowEditModal(false)}>
                <Text style={styles.btnText}>닫기</Text>
              </TouchableOpacity>
              <TouchableOpacity style={[styles.btn, styles.btnPrimary]} onPress={() => setShowEditModal(false)}>
                <Text style={styles.btnText}>저장</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </ScrollView>
  );
};

export default ExpertProfessionalDetail;
