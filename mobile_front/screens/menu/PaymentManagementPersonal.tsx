import React, { useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { FontAwesome5 } from '@expo/vector-icons';
import SubformHeader from '../components/SubformHeader';

interface UserInfo {
  name: string;
  email: string;
  status: 'active' | 'inactive';
  avatar: string;
}

interface PaymentStats {
  totalSpent: number;
  thisMonth: number;
  activeSubscriptions: number;
  completedServices: number;
}

interface PaymentHistory {
  id: string;
  service: string;
  amount: number;
  date: string;
  status: 'completed' | 'pending' | 'failed';
  description: string;
  type: 'subscription' | 'one-time';
}

const userInfo: UserInfo = {
  name: '김전문가',
  email: 'expert@example.com',
  status: 'active',
  avatar: 'KJ'
};

const paymentStats: PaymentStats = {
  totalSpent: 3500000,
  thisMonth: 500000,
  activeSubscriptions: 2,
  completedServices: 8
};

const paymentHistory: PaymentHistory[] = [
  {
    id: '1',
    service: '전문가 프리미엄 구독',
    amount: 150000,
    date: '2024-01-15',
    status: 'completed',
    description: '월간 프리미엄 구독 서비스',
    type: 'subscription'
  },
  {
    id: '2',
    service: 'ISO 9001 교육 과정',
    amount: 300000,
    date: '2024-01-10',
    status: 'completed',
    description: '품질경영시스템 교육 과정',
    type: 'one-time'
  },
  {
    id: '3',
    service: '전문가 프로필 노출',
    amount: 50000,
    date: '2024-01-05',
    status: 'pending',
    description: '프로필 상단 노출 서비스',
    type: 'one-time'
  }
];

const tabs = ['전체', '구독', '일시불', '결제완료', '결제대기'];

export default function PaymentManagementPersonal() {
  const navigation = useNavigation();
  const [activeTab, setActiveTab] = useState('전체');

  const filteredHistory = paymentHistory.filter(payment => {
    switch (activeTab) {
      case '구독':
        return payment.type === 'subscription';
      case '일시불':
        return payment.type === 'one-time';
      case '결제완료':
        return payment.status === 'completed';
      case '결제대기':
        return payment.status === 'pending';
      default:
        return true;
    }
  });

  const handleBack = () => {
    navigation.goBack();
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed':
        return '#4CAF50';
      case 'pending':
        return '#FF9800';
      case 'failed':
        return '#F44336';
      default:
        return '#666';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'completed':
        return '결제완료';
      case 'pending':
        return '결제대기';
      case 'failed':
        return '결제실패';
      default:
        return status;
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <SubformHeader
        title="개인 결제관리"
        showBack
        showHome
        onBack={handleBack}
        navigation={navigation as any}
        onHome={() => (navigation as any).navigate('Home')}
      />

      <ScrollView style={styles.content}>
        {/* 사용자 정보 섹션 삭제됨 */}

        {/* 탭 네비게이션 */}
        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.tabNav}>
          {tabs.map((tab) => (
            <TouchableOpacity
              key={tab}
              style={[
                styles.tabBtn,
                activeTab === tab && styles.tabBtnActive
              ]}
              onPress={() => setActiveTab(tab)}
            >
              <Text style={[
                styles.tabText,
                activeTab === tab && styles.tabTextActive
              ]}>
                {tab}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>

        {/* 결제 내역 */}
        <View style={styles.historySection}>
          <Text style={styles.sectionTitle}>결제 내역</Text>
          {filteredHistory.map((payment) => (
            <View key={payment.id} style={styles.paymentItem}>
              <View style={styles.paymentHeader}>
                <View style={styles.paymentInfo}>
                  <View style={styles.serviceTypeContainer}>
                    <Text style={styles.serviceName}>{payment.service}</Text>
                    <View style={[styles.typeBadge, payment.type === 'subscription' && styles.subscriptionBadge]}>
                      <Text style={[styles.typeText, payment.type === 'subscription' && styles.subscriptionText]}>
                        {payment.type === 'subscription' ? '구독' : '일시불'}
                      </Text>
                    </View>
                  </View>
                  <Text style={styles.paymentDescription}>{payment.description}</Text>
                </View>
                <View style={[styles.statusBadge, { backgroundColor: getStatusColor(payment.status) + '20' }]}>
                  <Text style={[styles.statusText, { color: getStatusColor(payment.status) }]}>
                    {getStatusText(payment.status)}
                  </Text>
                </View>
              </View>
              <View style={styles.paymentFooter}>
                <Text style={styles.paymentDate}>{payment.date}</Text>
                <Text style={styles.paymentAmount}>{payment.amount.toLocaleString()}원</Text>
              </View>
            </View>
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f7fa',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 15,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
  },
  backButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#f0f2f5',
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  content: {
    flex: 1,
  },
  userInfoSection: {
    padding: 20,
  },
  userInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  userAvatar: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: 'rgba(102, 126, 234, 0.2)',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  userAvatarText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#667eea',
  },
  userDetails: {
    flex: 1,
  },
  userName: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 4,
  },
  userEmail: {
    fontSize: 14,
    color: '#666',
    marginBottom: 8,
  },
  userStatus: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(76, 175, 80, 0.1)',
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 20,
    alignSelf: 'flex-start',
  },
  userStatusText: {
    fontSize: 14,
    color: '#4CAF50',
    marginLeft: 6,
  },
  statsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    paddingHorizontal: 20,
    justifyContent: 'space-between',
  },
  statCard: {
    width: '48%',
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 20,
    marginBottom: 15,
    borderLeftWidth: 4,
    borderLeftColor: '#667eea',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  statLabel: {
    fontSize: 14,
    color: '#666',
    marginTop: 10,
  },
  statValue: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginTop: 5,
  },
  tabNav: {
    paddingHorizontal: 20,
    marginBottom: 20,
  },
  tabBtn: {
    paddingHorizontal: 16,
    paddingVertical: 10,
    backgroundColor: '#f8f9fa',
    borderRadius: 20,
    marginRight: 10,
  },
  tabBtnActive: {
    backgroundColor: '#667eea',
  },
  tabText: {
    fontSize: 14,
    color: '#6c757d',
    fontWeight: '600',
  },
  tabTextActive: {
    color: '#fff',
  },
  historySection: {
    paddingHorizontal: 20,
    paddingBottom: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 15,
  },
  paymentItem: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 20,
    marginBottom: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  paymentHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 15,
  },
  paymentInfo: {
    flex: 1,
  },
  serviceTypeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 5,
  },
  serviceName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    marginRight: 10,
  },
  typeBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
    backgroundColor: '#f0f0f0',
  },
  subscriptionBadge: {
    backgroundColor: '#e8f5e8',
  },
  typeText: {
    fontSize: 12,
    color: '#666',
  },
  subscriptionText: {
    color: '#4CAF50',
  },
  paymentDescription: {
    fontSize: 14,
    color: '#666',
  },
  statusBadge: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 15,
  },
  statusText: {
    fontSize: 12,
    fontWeight: 'bold',
  },
  paymentFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  paymentDate: {
    fontSize: 14,
    color: '#999',
  },
  paymentAmount: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
});