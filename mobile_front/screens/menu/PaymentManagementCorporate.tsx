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
import SubformHeader from '../components/SubformHeader';

interface PaymentStats {
  totalSpent: number;
  thisMonth: number;
  pendingPayments: number;
  completedServices: number;
}

interface PaymentHistory {
  id: string;
  service: string;
  amount: number;
  date: string;
  status: 'completed' | 'pending' | 'failed';
  description: string;
}

const paymentStats: PaymentStats = {
  totalSpent: 12500000,
  thisMonth: 2800000,
  pendingPayments: 3,
  completedServices: 12
};

const paymentHistory: PaymentHistory[] = [
  {
    id: '1',
    service: 'ISO 9001 컨설팅',
    amount: 1500000,
    date: '2024-01-15',
    status: 'completed',
    description: '품질경영시스템 컨설팅 서비스'
  },
  {
    id: '2',
    service: 'ISO 14001 심사원 교육',
    amount: 800000,
    date: '2024-01-10',
    status: 'completed',
    description: '환경경영시스템 심사원 교육 과정'
  },
  {
    id: '3',
    service: 'ISO 45001 인증원 비용',
    amount: 2500000,
    date: '2024-01-05',
    status: 'pending',
    description: '안전보건경영시스템 인증 비용'
  }
];

const tabs = ['전체', '결제완료', '결제대기', '결제실패'];

export default function PaymentManagementCorporate() {
  const navigation = useNavigation();
  const [activeTab, setActiveTab] = useState('전체');

  const filteredHistory = paymentHistory.filter(payment => {
    switch (activeTab) {
      case '결제완료':
        return payment.status === 'completed';
      case '결제대기':
        return payment.status === 'pending';
      case '결제실패':
        return payment.status === 'failed';
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
        title="기업 결제관리"
        showBack
        showHome
        onBack={handleBack}
        navigation={navigation as any}
        onHome={() => (navigation as any).navigate('Home')}
      />

      <ScrollView style={styles.content}>
        {/* 헤더 섹션 삭제됨 */}

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
                  <Text style={styles.serviceName}>{payment.service}</Text>
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
  headerSection: {
    padding: 20,
    backgroundColor: '#fff',
  },
  headerTitleText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 5,
  },
  headerSubtitle: {
    fontSize: 16,
    color: '#666',
  },
  statsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    padding: 20,
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
    paddingHorizontal: 20,
    paddingVertical: 12,
    backgroundColor: '#f8f9fa',
    borderRadius: 8,
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
  serviceName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 5,
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