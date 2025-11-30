import React, { useMemo, useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, TextInput, FlatList, Alert } from 'react-native';
import { FontAwesome5 } from '@expo/vector-icons';
import SubformHeader from '../components/SubformHeader';
import  { styles } from '../styles/menu/AdminManagement';

type TabKey = 'dashboard' | 'users' | 'experts' | 'companies' | 'admins' | 'reports' | 'content' | 'settings';

type UserItem = { id: number; name: string; type: string; email: string; status: 'active' | 'suspended' | 'dormant'; joinDate: string; lastLogin: string };
type ExpertItem = { name: string; field: string; certStatus: '승인' | '심사 중' | '반려'; credentials: string; rating: number; reviews: number };
type CompanyItem = { name: string; manager: string; businessCert: '검증 완료' | '검증 중'; accounts: number; joinDate: string };
type AdminItem = { id: number; name: string; email: string; role: 'super' | 'general'; status: 'active' | 'inactive'; createdDate: string };

const mockUsers: UserItem[] = [
  { id: 1, name: '김민수', type: '전문가', email: 'kim@expert.com', status: 'active', joinDate: '2023-01-15', lastLogin: '2024-07-21' },
  { id: 2, name: '㈜테크솔루션', type: '기업', email: 'contact@techsol.com', status: 'active', joinDate: '2023-03-22', lastLogin: '2024-07-20' },
  { id: 3, name: '박지영', type: '전문가', email: 'park@pro.com', status: 'suspended', joinDate: '2023-05-10', lastLogin: '2024-06-15' },
  { id: 4, name: '한국IT교육원', type: '교육기관', email: 'info@kitedu.or.kr', status: 'active', joinDate: '2023-07-01', lastLogin: '2024-07-19' },
  { id: 5, name: '이준호', type: '전문가', email: 'lee.jh@security.io', status: 'dormant', joinDate: '2022-11-30', lastLogin: '2024-01-05' },
];

const mockExperts: ExpertItem[] = [
  { name: '김민수', field: 'ISMS-P', certStatus: '승인', credentials: '경력/자격증 검증 완료', rating: 4.9, reviews: 47 },
  { name: '박지영', field: 'ISO 27001', certStatus: '심사 중', credentials: '서류 제출', rating: 4.8, reviews: 32 },
  { name: '최서연', field: 'GS 인증', certStatus: '반려', credentials: '보류 (서류 부족)', rating: 4.7, reviews: 28 },
];

const mockCompanies: CompanyItem[] = [
  { name: '㈜테크솔루션', manager: '홍길동', businessCert: '검증 완료', accounts: 3, joinDate: '2023-03-22' },
  { name: '㈜클라우드테크', manager: '김철수', businessCert: '검증 중', accounts: 1, joinDate: '2024-01-10' },
  { name: '㈜핀테크코리아', manager: '이영희', businessCert: '검증 완료', accounts: 5, joinDate: '2023-09-05' },
];

const mockAdmins: AdminItem[] = [
  { id: 1, name: '슈퍼관리자', email: 'super@admin.com', role: 'super', status: 'active', createdDate: '2022-01-01' },
  { id: 2, name: '김관리', email: 'kim@admin.com', role: 'general', status: 'active', createdDate: '2023-03-15' },
];

const STATUS_MAP: Record<string, { bg: string; color: string; label?: string }> = {
  active: { bg: '#e6f7e6', color: '#2e7d32', label: '활성' },
  suspended: { bg: '#ffebee', color: '#c62828', label: '정지' },
  dormant: { bg: '#fff8e1', color: '#f57f17', label: '휴면' },
  '검증 완료': { bg: '#e6f7e6', color: '#2e7d32' },
  '검증 중': { bg: '#e3f2fd', color: '#1976d2' },
  승인: { bg: '#e6f7e6', color: '#2e7d32' },
  '심사 중': { bg: '#fff8e1', color: '#f57f17' },
  반려: { bg: '#ffebee', color: '#c62828' },
};

const AdminManagement: React.FC<any> = ({ navigation }) => {
  const [activeTab, setActiveTab] = useState<TabKey>('dashboard');
  const metrics = useMemo(() => ([
    { icon: 'users', label: '전체 사용자', value: '12,543', change: '+12.5%' },
    { icon: 'user-check', label: '신규 사용자 (월)', value: '845', change: '+5.2%' },
    { icon: 'handshake', label: '월간 매칭 건수', value: '1,280', change: '+8.1%' },
    { icon: 'won-sign', label: '월간 매출', value: '₩152,430,000', change: '+10.4%' },
  ]), []);

  const TabHeader = () => (
    <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.tabHeader} contentContainerStyle={{ paddingHorizontal: 12 }}>
      {([
        { key: 'dashboard', label: '대시보드' },
        { key: 'users', label: '사용자 관리' },
        { key: 'experts', label: '전문가 관리' },
        { key: 'companies', label: '기업 관리' },
        { key: 'admins', label: '관리자 계정' },
        { key: 'reports', label: '통계 리포트' },
        { key: 'content', label: '콘텐츠 관리' },
        { key: 'settings', label: '설정' },
      ] as { key: TabKey; label: string }[]).map(({ key, label }) => (
        <TouchableOpacity key={key} style={[styles.tabItem, activeTab === key && styles.tabItemActive]} onPress={() => setActiveTab(key)}>
          <Text style={[styles.tabText, activeTab === key && styles.tabTextActive]}>{label}</Text>
        </TouchableOpacity>
      ))}
    </ScrollView>
  );

  const DashboardSection = () => (
    <View>
      <View style={styles.metricsGrid}>
        {metrics.map((m, idx) => (
          <View key={idx} style={styles.metricCard}>
            <View style={styles.metricIcon}><FontAwesome5 name={m.icon as any} size={18} color="#fff" /></View>
            <View style={{ flex: 1 }}>
              <Text style={styles.metricLabel}>{m.label}</Text>
              <Text style={styles.metricValue}>{m.value}</Text>
              <Text style={styles.metricChange}>{m.change}</Text>
            </View>
          </View>
        ))}
      </View>
      <View style={styles.chartRow}>
        <View style={styles.chartCard}><Text style={styles.chartTitle}>가입 추이(월)</Text><View style={styles.chartPlaceholder}><Text>Chart Placeholder</Text></View></View>
        <View style={styles.chartCard}><Text style={styles.chartTitle}>사용자 유형</Text><View style={styles.chartPlaceholder}><Text>Chart Placeholder</Text></View></View>
      </View>
    </View>
  );

  const UserRow = ({ item }: { item: UserItem }) => {
    const badge = STATUS_MAP[item.status];
    return (
      <View style={styles.listItem}>
        <View style={styles.listMain}>
          <Text style={styles.listTitle}>{item.name}</Text>
          <Text style={styles.listSubtitle}>{item.email} · {item.type}</Text>
        </View>
        <View style={[styles.statusBadge, { backgroundColor: badge?.bg || '#eee' }]}> 
          <Text style={{ fontSize: 12, fontWeight: '600', color: badge?.color || '#333' }}>{badge?.label || item.status}</Text>
        </View>
        <View style={styles.listActions}>
          <TouchableOpacity style={styles.actionBtn}><FontAwesome5 name="edit" size={14} color="#4a6bdf" /><Text style={styles.actionText}>관리</Text></TouchableOpacity>
        </View>
      </View>
    );
  };

  const ExpertRow = ({ item }: { item: ExpertItem }) => {
    const badge = STATUS_MAP[item.certStatus];
    return (
      <View style={styles.listItem}>
        <View style={styles.listMain}>
          <Text style={styles.listTitle}>{item.name}</Text>
          <Text style={styles.listSubtitle}>{item.field} · {item.credentials}</Text>
        </View>
        <View style={[styles.statusBadge, { backgroundColor: badge?.bg || '#eee' }]}>
          <Text style={{ fontSize: 12, fontWeight: '600', color: badge?.color || '#333' }}>{item.certStatus}</Text>
        </View>
        <View style={styles.listActions}>
          <Text style={{ color: '#ffc107', marginRight: 6 }}>{item.rating.toFixed(1)}</Text>
          <Text style={{ color: '#666' }}>({item.reviews})</Text>
          <TouchableOpacity style={[styles.actionBtn, { marginLeft: 8 }]}><FontAwesome5 name="cog" size={14} color="#4a6bdf" /><Text style={styles.actionText}>관리</Text></TouchableOpacity>
        </View>
      </View>
    );
  };

  const CompanyRow = ({ item }: { item: CompanyItem }) => {
    const badge = STATUS_MAP[item.businessCert];
    return (
      <View style={styles.listItem}>
        <View style={styles.listMain}>
          <Text style={styles.listTitle}>{item.name}</Text>
          <Text style={styles.listSubtitle}>담당자 {item.manager} · 계정 {item.accounts}개</Text>
        </View>
        <View style={[styles.statusBadge, { backgroundColor: badge?.bg || '#eee' }]}> 
          <Text style={{ fontSize: 12, fontWeight: '600', color: badge?.color || '#333' }}>{item.businessCert}</Text>
        </View>
        <View style={styles.listActions}>
          <TouchableOpacity style={styles.actionBtn}><FontAwesome5 name="cog" size={14} color="#4a6bdf" /><Text style={styles.actionText}>관리</Text></TouchableOpacity>
        </View>
      </View>
    );
  };

  const AdminRow = ({ item }: { item: AdminItem }) => (
    <View style={styles.listItem}>
      <View style={styles.listMain}>
        <Text style={styles.listTitle}>{item.name}</Text>
        <Text style={styles.listSubtitle}>{item.email} · {item.role === 'super' ? '최고 관리자' : '일반 관리자'}</Text>
      </View>
      <View style={styles.listActions}>
        <TouchableOpacity style={styles.actionBtn} onPress={() => Alert.alert('관리자 수정', `${item.name} 수정`)}>
          <FontAwesome5 name="edit" size={14} color="#4a6bdf" />
          <Text style={styles.actionText}>수정</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.actionBtn} onPress={() => Alert.alert('관리자 삭제', `${item.name} 삭제`)}>
          <FontAwesome5 name="trash" size={14} color="#e74c3c" />
          <Text style={[styles.actionText, { color: '#e74c3c' }]}>삭제</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  const ReportsSection = () => (
    <View>
      <View style={styles.sectionHeader}><Text style={styles.sectionTitle}>통계 리포트</Text></View>
      <View style={styles.cardGrid}>
        <View style={styles.card}><Text style={styles.cardTitle}>사용자 분석</Text><Text style={styles.cardDesc}>가입/활성/유형 분석</Text></View>
        <View style={styles.card}><Text style={styles.cardTitle}>비즈니스 분석</Text><Text style={styles.cardDesc}>매출/매칭 추이</Text></View>
        <View style={styles.card}><Text style={styles.cardTitle}>운영 리포트</Text><Text style={styles.cardDesc}>티켓/가동률</Text></View>
      </View>
    </View>
  );

  const ContentSection = () => (
    <View>
      <View style={styles.sectionHeader}><Text style={styles.sectionTitle}>콘텐츠 관리</Text></View>
      <View style={styles.cardGrid}>
        <TouchableOpacity style={styles.card} onPress={() => navigation?.navigate?.('BannerManagement')}>
          <Text style={styles.cardTitle}>베너 관리</Text>
          <Text style={styles.cardDesc}>미리보기·캘린더·슬롯</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.card} onPress={() => navigation?.navigate?.('QA_Answers')}>
          <Text style={styles.cardTitle}>Q&A 답변</Text>
          <Text style={styles.cardDesc}>필터·상태 배지·목록</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.card} onPress={() => navigation?.navigate?.('AnnounceManagement')}>
          <Text style={styles.cardTitle}>공고 관리</Text>
          <Text style={styles.cardDesc}>채용·전문가·교육</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <View style={{ flex: 1, backgroundColor: '#f8f9fa' }}>
      <SubformHeader title="관리자 대시보드" onHome={() => navigation?.navigate?.('Home')} onBack={() => navigation?.goBack?.()} />

      <View style={styles.headerBar}>
        <FontAwesome5 name="tachometer-alt" size={16} color="#4a6bdf" />
        <Text style={styles.headerTitle}>SuperSlice Admin</Text>
        <View style={{ flex: 1 }} />
        <View style={styles.searchBar}>
          <TextInput placeholder="전체 검색..." style={styles.searchInput} />
          <FontAwesome5 name="search" size={14} color="#888" />
        </View>
      </View>

      <TabHeader />

      <ScrollView contentContainerStyle={{ padding: 16 }}>
        {activeTab === 'dashboard' && <DashboardSection />}

        {activeTab === 'users' && (
          <View>
            <View style={styles.sectionHeader}><Text style={styles.sectionTitle}>사용자 관리</Text></View>
            <FlatList data={mockUsers} keyExtractor={(it) => String(it.id)} renderItem={({ item }) => <UserRow item={item} />} />
          </View>
        )}

        {activeTab === 'experts' && (
          <View>
            <View style={styles.sectionHeader}><Text style={styles.sectionTitle}>전문가 관리</Text></View>
            <FlatList data={mockExperts} keyExtractor={(it) => it.name} renderItem={({ item }) => <ExpertRow item={item} />} />
          </View>
        )}

        {activeTab === 'companies' && (
          <View>
            <View style={styles.sectionHeader}><Text style={styles.sectionTitle}>기업 관리</Text></View>
            <FlatList data={mockCompanies} keyExtractor={(it) => it.name} renderItem={({ item }) => <CompanyRow item={item} />} />
          </View>
        )}

        {activeTab === 'admins' && (
          <View>
            <View style={styles.sectionHeader}>
              <Text style={styles.sectionTitle}>관리자 계정</Text>
              <TouchableOpacity style={styles.primaryBtn} onPress={() => Alert.alert('관리자 추가', '목업입니다.')}><FontAwesome5 name="plus" size={14} color="#fff" /><Text style={styles.primaryBtnText}>추가</Text></TouchableOpacity>
            </View>
            <FlatList data={mockAdmins} keyExtractor={(it) => String(it.id)} renderItem={({ item }) => <AdminRow item={item} />} />
          </View>
        )}

        {activeTab === 'reports' && <ReportsSection />}
        {activeTab === 'content' && <ContentSection />}

        {activeTab === 'settings' && (
          <View>
            <View style={styles.sectionHeader}><Text style={styles.sectionTitle}>설정</Text></View>
            <View style={styles.card}><Text style={styles.cardDesc}>설정 항목은 추후 연결 예정입니다.</Text></View>
          </View>
        )}
      </ScrollView>
    </View>
  );
};

export default AdminManagement;
