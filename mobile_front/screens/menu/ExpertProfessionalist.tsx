import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  SafeAreaView,
  TouchableOpacity,
  ScrollView,
  FlatList,
  Modal,
  TextInput,
  StyleSheet,
} from 'react-native';

import { styles } from '../styles/menu/ExpertProfessionalist';

type Proposal = {
  id: number;
  company: string;
  title: string;
  status: 'pending' | 'accepted' | 'rejected' | 'completed';
  date: string;
  details: string;
};

type Project = {
  id: number;
  company: string;
  title: string;
  status: 'ongoing' | 'completed';
  startDate?: string;
  endDate?: string;
};

type Review = { id: number; company: string; name: string; rating: number; content: string; date: string };

const MOCK_PROPOSALS: Proposal[] = [
  { id: 1, company: '㈜테크솔루션', title: '정보보호 담당자 (ISMS-P)', status: 'pending', date: '2025-03-10', details: 'ISMS-P 인증 준비를 위한 정보보호 담당자를 찾고 있습니다.' },
  { id: 2, company: '㈜핀테크코리아', title: '개인정보보호 컨설턴트', status: 'accepted', date: '2025-03-08', details: 'PIMS 도입을 위한 컨설팅 제안입니다.' },
  { id: 3, company: '㈜디지털이노베이션', title: '클라우드 보안 전문가', status: 'rejected', date: '2025-03-05', details: 'AWS 환경의 보안 강화 프로젝트입니다.' },
  { id: 4, company: '㈜데이터시큐리티', title: 'ISO 27001 심사원', status: 'completed', date: '2025-02-28', details: 'ISO 27001 인증 심사 지원 요청입니다.' },
];

const MOCK_PROJECTS: Project[] = [
  { id: 101, company: '㈜핀테크코리아', title: 'PIMS 컨설팅', status: 'ongoing', startDate: '2025-03-01', endDate: '2025-05-31' },
  { id: 102, company: '㈠메디컬솔루션', title: '병원 정보보호 컨설팅', status: 'ongoing', startDate: '2025-02-15', endDate: '2025-04-15' },
  { id: 201, company: '㈜데이터시큐리티', title: 'ISO 27001 심사 지원', status: 'completed', startDate: '2025-01-10', endDate: '2025-02-20' },
  { id: 202, company: '㈜클라우드테크', title: 'AWS 보안 아키텍처 설계', status: 'completed', startDate: '2024-11-01', endDate: '2024-12-15' },
];

const MOCK_REVIEWS: Review[] = [
  { id: 1, company: '㈜핀테크코리아', name: '박팀장', rating: 5, content: '전문성이 뛰어나고 프로젝트를 성공적으로 이끌어주셨습니다.', date: '2025-02-25' },
  { id: 2, company: '㈜메디컬솔루션', name: '이과장', rating: 4, content: '의료 분야에 대한 이해도가 높아 원활한 소통이 가능했습니다.', date: '2025-02-20' },
  { id: 3, company: '㈜데이터시큐리티', name: '김대리', rating: 5, content: '시간 약속을 잘 지키고, 꼼꼼하게 업무를 처리해주셨습니다.', date: '2025-02-18' },
];

export default function ExpertDashboard({ navigation }: any) {
  const [activeTab, setActiveTab] = useState<'dashboard' | 'proposals' | 'projects' | 'reviews' | 'profile'>('dashboard');
  const [proposals, setProposals] = useState<Proposal[]>(MOCK_PROPOSALS);
  const [projects, setProjects] = useState<Project[]>(MOCK_PROJECTS);
  const [reviews] = useState<Review[]>(MOCK_REVIEWS);

  const [modalVisible, setModalVisible] = useState(false);
  const [selectedProposal, setSelectedProposal] = useState<Proposal | null>(null);

  const [toast, setToast] = useState<string | null>(null);

  useEffect(() => {
    if (!toast) return;
    const t = setTimeout(() => setToast(null), 3000);
    return () => clearTimeout(t);
  }, [toast]);

  function showToast(msg: string) {
    setToast(msg);
  }

  function openProposal(p: Proposal) {
    setSelectedProposal(p);
    setModalVisible(true);
  }

  function closeProposal() {
    setSelectedProposal(null);
    setModalVisible(false);
  }

  function updateProposalStatus(newStatus: Proposal['status']) {
    if (!selectedProposal) return;
    setProposals(prev => prev.map(p => (p.id === selectedProposal.id ? { ...p, status: newStatus } : p)));
    showToast(`제안이 ${newStatus} 상태로 변경되었습니다.`);
    closeProposal();
  }

  const renderProposal = ({ item }: { item: Proposal }) => (
    <TouchableOpacity style={styles.card} onPress={() => openProposal(item)}>
      <View style={styles.cardHeader}>
        <Text style={styles.cardTitle}>{item.title}</Text>
        <Text style={[styles.cardStatus, statusStyle(item.status)]}>{statusLabel(item.status)}</Text>
      </View>
      <Text style={styles.cardCompany}>{item.company}</Text>
      <Text style={styles.cardMeta}>{item.date}</Text>
    </TouchableOpacity>
  );

  const renderProject = ({ item }: { item: Project }) => (
    <View style={styles.card}>
      <View style={styles.cardHeader}>
        <Text style={styles.cardTitle}>{item.title}</Text>
        <Text style={[styles.cardStatus, statusStyle(item.status)]}>{item.status === 'ongoing' ? '진행중' : '완료'}</Text>
      </View>
      <Text style={styles.cardCompany}>{item.company}</Text>
      <Text style={styles.cardMeta}>{item.startDate ? `${item.startDate} ~ ${item.endDate}` : ''}</Text>
    </View>
  );

  const renderReview = ({ item }: { item: Review }) => (
    <View style={styles.card}>
      <View style={styles.cardHeader}>
        <Text style={styles.cardTitle}>{item.name} · {item.company}</Text>
        <Text style={styles.cardMeta}>{'★'.repeat(item.rating)}</Text>
      </View>
      <Text style={styles.cardMeta}>{item.date}</Text>
      <Text style={{ marginTop: 8 }}>{item.content}</Text>
    </View>
  );

  return (
    <SafeAreaView style={styles.safe}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => (navigation?.goBack ? navigation.goBack() : null)} style={styles.headerIcon}>
          <Text>{'◀'}</Text>
        </TouchableOpacity>
        <Text style={styles.title}>전문가 대시보드</Text>
        <View style={styles.headerRight}>
          <TouchableOpacity style={styles.headerIcon} onPress={() => showToast('알림')}> 
            <Text>🔔</Text>
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.tabNav}>
        {['dashboard', 'proposals', 'projects', 'reviews', 'profile'].map(tab => (
          <TouchableOpacity key={tab} style={[styles.tabButton, activeTab === (tab as any) ? styles.tabActive : null]} onPress={() => setActiveTab(tab as any)}>
            <Text style={activeTab === (tab as any) ? styles.tabActiveText : styles.tabText}>{tabLabel(tab)}</Text>
          </TouchableOpacity>
        ))}
      </View>

      <ScrollView style={styles.container} contentContainerStyle={{ paddingBottom: 60 }}>
        {activeTab === 'dashboard' && (
          <View>
            <View style={styles.sectionHeader}>
              <Text style={styles.welcome}>안녕하세요, 김민수 컨설턴트님</Text>
              <Text style={styles.sub}>오늘도 좋은 하루 보내세요!</Text>
            </View>

            <View style={styles.statsRow}>
              <View style={styles.statCard}><Text style={styles.statValue}>{projects.length}</Text><Text style={styles.statLabel}>진행중 프로젝트</Text></View>
              <View style={styles.statCard}><Text style={styles.statValue}>{proposals.length}</Text><Text style={styles.statLabel}>받은 제안</Text></View>
            </View>

            <View style={{ marginTop: 12 }}>
              <Text style={styles.sectionTitle}>최근 매칭 제안</Text>
              <FlatList data={proposals.slice(0,2)} keyExtractor={p => String(p.id)} renderItem={renderProposal} scrollEnabled={false} />
            </View>

            <View style={{ marginTop: 12 }}>
              <Text style={styles.sectionTitle}>진행중인 프로젝트</Text>
              <FlatList data={projects.filter(p => p.status === 'ongoing').slice(0,2)} keyExtractor={p => String(p.id)} renderItem={renderProject} scrollEnabled={false} />
            </View>
          </View>
        )}

        {activeTab === 'proposals' && (
          <View>
            <Text style={styles.sectionTitle}>받은 매칭 제안</Text>
            <FlatList data={proposals} keyExtractor={p => String(p.id)} renderItem={renderProposal} />
          </View>
        )}

        {activeTab === 'projects' && (
          <View>
            <Text style={styles.sectionTitle}>프로젝트</Text>
            <FlatList data={projects} keyExtractor={p => String(p.id)} renderItem={renderProject} />
          </View>
        )}

        {activeTab === 'reviews' && (
          <View>
            <Text style={styles.sectionTitle}>받은 리뷰</Text>
            <FlatList data={reviews} keyExtractor={r => String(r.id)} renderItem={renderReview} />
          </View>
        )}

        {activeTab === 'profile' && (
          <View>
            <Text style={styles.sectionTitle}>프로필</Text>
            <View style={styles.profileCard}>
              <Text style={{ fontWeight: '700', marginBottom: 6 }}>김민수 컨설턴트</Text>
              <Text>ISMS-P 전문가 · 5년 경력</Text>
            </View>
          </View>
        )}
      </ScrollView>

      <Modal visible={modalVisible} transparent animationType="slide" onRequestClose={closeProposal}>
        <View style={styles.modalOverlay}>
          <View style={styles.modalBox}>
            <Text style={styles.modalTitle}>{selectedProposal?.title}</Text>
            <Text style={{ marginTop: 8 }}>{selectedProposal?.company} · {selectedProposal?.date}</Text>
            <Text style={{ marginTop: 12 }}>{selectedProposal?.details}</Text>
            <View style={{ flexDirection: 'row', justifyContent: 'flex-end', marginTop: 16 }}>
              {selectedProposal?.status === 'pending' && (
                <>
                  <TouchableOpacity style={styles.btnSecondary} onPress={() => updateProposalStatus('rejected')}><Text style={styles.btnText}>거절</Text></TouchableOpacity>
                  <TouchableOpacity style={styles.btnPrimary} onPress={() => updateProposalStatus('accepted')}><Text style={styles.btnText}>수락</Text></TouchableOpacity>
                </>
              )}
              <TouchableOpacity style={[styles.btnSecondary, { marginLeft: 8 }]} onPress={closeProposal}><Text style={styles.btnText}>닫기</Text></TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>

      {toast ? (
        <View style={styles.toast}><Text style={{ color: '#fff' }}>{toast}</Text></View>
      ) : null}
    </SafeAreaView>
  );
}

function tabLabel(key: string) {
  switch (key) {
    case 'dashboard': return '대시보드';
    case 'proposals': return '매칭 제안';
    case 'projects': return '프로젝트';
    case 'reviews': return '리뷰';
    case 'profile': return '프로필';
    default: return key;
  }
}

function statusLabel(s: any) {
  if (s === 'pending') return '대기';
  if (s === 'accepted') return '수락';
  if (s === 'rejected') return '거절';
  if (s === 'completed') return '완료';
  return s;
}

function statusStyle(s: any) {
  const theme: Record<string, { bg: string; color: string }> = {
    pending: { bg: '#fff3cd', color: '#856404' },
    accepted: { bg: '#e6f7e6', color: '#2e7d32' },
    rejected: { bg: '#ffebee', color: '#c62828' },
    completed: { bg: '#e3f2fd', color: '#1976d2' },
    ongoing: { bg: '#fff8e1', color: '#f57f17' },
  };
  const t = theme[s] || { bg: '#eee', color: '#333' };
  return { backgroundColor: t.bg, color: t.color } as const;
}
