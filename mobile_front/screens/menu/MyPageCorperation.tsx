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

interface UserProfile {
  name: string;
  email: string;
  phone: string;
  role: string;
  avatar: string;
  joinDate: string;
  isVerified: boolean;
}

interface Stats {
  certifications: number;
  services: number;
  bookmarks: number;
  reviews: number;
}

const userProfile: UserProfile = {
  name: '(주)테크기업',
  email: 'company@techcorp.com',
  phone: '02-1234-5678',
  role: '기업 회원',
  avatar: '테',
  joinDate: '2023-01-15',
  isVerified: true
};

const stats: Stats = {
  certifications: 5,
  services: 12,
  bookmarks: 8,
  reviews: 4.8
};

const menuItems = [
  {
    id: '1',
    title: '기업 정보 관리',
    icon: 'building',
    description: '회사 정보 수정 및 관리'
  },
  {
    id: '2',
    title: '보유 인증 현황',
    icon: 'certificate',
    description: 'ISMS/ISO 등 보유 인증서 관리'
  },
  {
    id: '3',
    title: '컨설팅 이용 내역',
    icon: 'history',
    description: '인증 서비스 이용 내역'
  },
  {
    id: '4',
    title: '전문가 북마크',
    icon: 'bookmark',
    description: '관심 있는 전문가 목록'
  },
  {
    id: '5',
    title: '전문가 리뷰 관리',
    icon: 'star',
    description: '받은 컨설팅 리뷰 관리'
  },
  {
    id: '6',
    title: '결제/구독 관리',
    icon: 'credit-card',
    description: '결제 및 구독 내역'
  },
  {
    id: '7',
    title: '직원 관리',
    icon: 'user-tie',
    description: '기업 내 전문가 직원 관리'
  },
  {
    id: '8',
    title: '보안 관리',
    icon: 'shield-alt',
    description: '기업 보안 정책 및 점검 관리'
  },
  {
    id: '9',
    title: '문서 관리',
    icon: 'folder-open',
    description: '인증 관련 문서/증빙자료'
  },
  {
    id: '10',
    title: '계정 설정',
    icon: 'cog',
    description: '기업 관리자 계정 설정'
  }
];

export default function MyPageCorperation() {
  const navigation = useNavigation();

  const handleBack = () => {
    navigation.goBack();
  };

  const handleMenuItemPress = (itemId: string) => {
    switch (itemId) {
      case '1':
        // 기업 정보 관리
        console.log('Company information management');
        break;
      case '2':
        // 보유 인증 현황
        console.log('Certification status');
        break;
      case '3':
        // 컨설팅 이용 내역
        console.log('Consulting service history');
        break;
      case '4':
        // 전문가 북마크
        navigation.navigate('BookmarkPersonal' as never);
        break;
      case '5':
        // 전문가 리뷰 관리
        console.log('Expert review management');
        break;
      case '6':
        // 결제/구독 관리
        navigation.navigate('PaymentManagementPersonal' as never);
        break;
      case '7':
        // 직원 관리
        console.log('Employee management');
        break;
      case '8':
        // 보안 관리
        console.log('Security management');
        break;
      case '9':
        // 문서 관리
        console.log('Document management');
        break;
      case '10':
        // 계정 설정
        navigation.navigate('Settings' as never);
        break;
      default:
        console.log('Unknown menu item:', itemId);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <SubformHeader
        title="마이페이지"
        onBack={handleBack}
        onHome={() => navigation.navigate('Home' as never)}
        showHome
        containerStyle={styles.header}
        titleStyle={styles.headerTitle}
      />

      <ScrollView style={styles.content}>
        {/* 사용자 요약 카드 */}
        <View style={styles.userSummaryCard}>
          <View style={styles.userHeader}>
            <View style={styles.userAvatar}>
              <Text style={styles.userAvatarText}>{userProfile.avatar}</Text>
            </View>
            <View style={styles.userInfo}>
              <Text style={styles.userName}>{userProfile.name}</Text>
              <Text style={styles.userRole}>{userProfile.role}</Text>
              <View style={styles.userStatus}>
                <FontAwesome5 name="check-circle" size={14} color="#4CAF50" />
                <Text style={styles.userStatusText}>
                  {userProfile.isVerified ? '인증완료' : '미인증'}
                </Text>
              </View>
            </View>
          </View>
          
          <View style={styles.userDetails}>
            <View style={styles.userDetailItem}>
              <FontAwesome5 name="envelope" size={14} color="#666" />
              <Text style={styles.userDetailText}>{userProfile.email}</Text>
            </View>
            <View style={styles.userDetailItem}>
              <FontAwesome5 name="phone" size={14} color="#666" />
              <Text style={styles.userDetailText}>{userProfile.phone}</Text>
            </View>
            <View style={styles.userDetailItem}>
              <FontAwesome5 name="calendar" size={14} color="#666" />
              <Text style={styles.userDetailText}>가입일: {userProfile.joinDate}</Text>
            </View>
          </View>
        </View>

        {/* 통계 섹션 */}
        <View style={styles.statsSection}>
          <Text style={styles.statsTitle}>활동 요약</Text>
          <View style={styles.statsGrid}>
            <View style={styles.statItem}>
              <FontAwesome5 name="certificate" size={24} color="#667eea" />
              <Text style={styles.statNumber}>{stats.certifications}</Text>
              <Text style={styles.statLabel}>보유 인증</Text>
            </View>
            <View style={styles.statItem}>
              <FontAwesome5 name="history" size={24} color="#667eea" />
              <Text style={styles.statNumber}>{stats.services}</Text>
              <Text style={styles.statLabel}>제공 서비스</Text>
            </View>
            <View style={styles.statItem}>
              <FontAwesome5 name="bookmark" size={24} color="#667eea" />
              <Text style={styles.statNumber}>{stats.bookmarks}</Text>
              <Text style={styles.statLabel}>북마크</Text>
            </View>
            <View style={styles.statItem}>
              <FontAwesome5 name="star" size={24} color="#667eea" />
              <Text style={styles.statNumber}>{stats.reviews}</Text>
              <Text style={styles.statLabel}>평균 평점</Text>
            </View>
          </View>
        </View>

        {/* 메뉴 섹션 */}
        <View style={styles.menuSection}>
          {menuItems.map((item) => (
            <TouchableOpacity
              key={item.id}
              style={styles.menuItem}
              onPress={() => handleMenuItemPress(item.id)}
            >
              <View style={styles.menuItemLeft}>
                <FontAwesome5 name={item.icon as any} size={20} color="#0066CC" style={styles.menuItemIcon} />
                <View style={styles.menuItemTextContainer}>
                  <Text style={styles.menuItemTitle}>{item.title}</Text>
                  <Text style={styles.menuItemDescription}>{item.description}</Text>
                </View>
              </View>
              <FontAwesome5 name="chevron-right" size={16} color="#999" />
            </TouchableOpacity>
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
  userSummaryCard: {
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 25,
    margin: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  userHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  userAvatar: {
    width: 70,
    height: 70,
    borderRadius: 35,
    backgroundColor: 'rgba(102, 126, 234, 0.1)',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 20,
  },
  userAvatarText: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#667eea',
  },
  userInfo: {
    flex: 1,
  },
  userName: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 4,
  },
  userRole: {
    fontSize: 16,
    color: '#666',
    marginBottom: 8,
  },
  userStatus: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(76, 175, 80, 0.1)',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
    alignSelf: 'flex-start',
  },
  userStatusText: {
    fontSize: 14,
    color: '#4CAF50',
    marginLeft: 6,
  },
  userDetails: {
    marginTop: 15,
  },
  userDetailItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  userDetailText: {
    fontSize: 14,
    color: '#666',
    marginLeft: 10,
  },
  statsSection: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 20,
    marginHorizontal: 20,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  statsTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 20,
  },
  statsGrid: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  statItem: {
    alignItems: 'center',
    flex: 1,
  },
  statNumber: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
    marginTop: 8,
  },
  statLabel: {
    fontSize: 12,
    color: '#666',
    marginTop: 4,
    textAlign: 'center',
  },
  menuSection: {
    backgroundColor: '#fff',
    borderRadius: 12,
    marginHorizontal: 20,
    marginBottom: 20,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  menuItemLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  menuItemIcon: {
    marginRight: 15,
  },
  menuItemTextContainer: {
    flex: 1,
  },
  menuItemTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginBottom: 2,
  },
  menuItemDescription: {
    fontSize: 13,
    color: '#666',
  },
});
