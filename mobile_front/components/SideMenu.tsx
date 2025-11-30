import React, { useEffect, useRef } from 'react';
import { View, Text, TouchableOpacity, Modal, Animated, BackHandler, ScrollView, Alert, Easing, Image } from 'react-native';
import { styles } from '../comstyles/SideMenu';
import { FontAwesome5 } from '@expo/vector-icons';
import { useNavigation, NavigationProp } from '@react-navigation/native';
import { ParamListBase } from '@react-navigation/native';
import { useUser } from '../contexts/UserContext';

interface SideMenuProps {
  visible: boolean;
  onClose: () => void;
}

export const SideMenu: React.FC<SideMenuProps> = ({ visible, onClose }) => {
  const slideAnim = useRef(new Animated.Value(-280)).current;
  const navigation = useNavigation<NavigationProp<ParamListBase>>();
  const { user, isAuthenticated: userIsAuthenticated, logout } = useUser();

  useEffect(() => {
    if (visible) {
      slideAnim.setValue(-280);
      Animated.timing(slideAnim, {
        toValue: 0,
        duration: 220,
        easing: Easing.out(Easing.cubic),
        useNativeDriver: true,
      }).start();
    }
  }, [visible]);

  const handleClose = () => {
    Animated.timing(slideAnim, {
      toValue: -280,
      duration: 180,
      easing: Easing.in(Easing.cubic),
      useNativeDriver: true,
    }).start(() => {
      onClose();
    });
  };

  // Handle hardware back button on Android
  const handleBackButton = () => {
    handleClose();
    return true;
  };

  const handleAuthAction = async () => {
    if (userIsAuthenticated) {
      // Logout using UserContext
      try {
        await logout();
        handleClose();
        // Navigate to home screen after logout
        navigation.navigate('Home' as never);
      } catch (error) {
        console.error('Logout error:', error);
      }
    } else {
      // Navigate to login
      handleClose();
      navigation.navigate('Login' as never);
    }
  };

  // Handle navigation to Personal Registration screen
  const handlePersonalRegistration = () => {
    handleClose();
    navigation.navigate('RegistrationPersonal');
  };

  const handlePersonalEdit = () => {
    handleClose();
    navigation.navigate('PersonalRegistrationEdit' as never);
  };

  // Handle navigation to Company Registration screen
  const handleCompanyRegistration = () => {
    handleClose();
    navigation.navigate('RegistrationCompany' as never);
  };

  const handleCompanyEdit = () => {
    handleClose();
    navigation.navigate('CompanyRegistrationEdit' as never);
  };

  // 인증 인력모집 목록 화면으로 이동
  const handleExpertRecruitmentList = () => {
    handleClose();
    navigation.navigate('ExpertRecruitmentList' as never);
  };

  // 전문가 등록 목록 화면으로 이동
  const handleExpertProfessionalList = () => {
    handleClose();
    navigation.navigate('ExpertProfessionalList' as never);
  };

  // 전문가 인증교육 목록으로 이동
  const handleEducationList = () => {
    handleClose();
    navigation.navigate('EducationList' as never);
  };

  // 인증심사원 자격등록 화면으로 이동
  const handleCertAudRegistration = () => {
    handleClose();
    navigation.navigate('CertAudRegistration' as never);
  };

  // 인증심사 지원/결과 화면으로 이동
  const handleCertAudResult = () => {
    handleClose();
    navigation.navigate('CertAudResult' as never);
  };

  // 일정관리 화면으로 이동
  const handleScheduleManager = () => {
    handleClose();
    navigation.navigate('ScheduleManager' as never);
  };

  // 즐겨찾기(개인) 화면으로 이동
  const handleBookmarkPersonal = () => {
    handleClose();
    navigation.navigate('BookmarkPersonal' as never);
  };

  // 즐겨찾기(기업) 화면으로 이동
  const handleBookmarkCorporates = () => {
    handleClose();
    navigation.navigate('BookmarkCorporate' as never);
  };

  // 안전한 내비게이션 헬퍼 (중첩 네비게이터 부모로 버블링)
  const safeNavigate = (routeName: string) => {
    // 먼저 현재 네비게이터에서 시도하고, 부모가 있으면 부모로 버블링
    try {
      const parent = (navigation as any).getParent ? (navigation as any).getParent() : null;
      if (parent) {
        parent.navigate(routeName as never);
      } else {
        navigation.navigate(routeName as never);
      }
    } catch (e) {
      // 최상위 컨테이너 ref를 도입하지 않은 상태에서는 부모 탐색으로 충분
      navigation.navigate(routeName as never);
    }
  };

  // 헤더(아바타/유저 정보) 영역 클릭 시 동작
  const handleHeaderPress = () => {
    // 로그인되지 않은 경우 로그인 화면으로 이동
    if (!userIsAuthenticated) {
      handleClose();
      navigation.navigate('Login' as never);
      return;
    }
    // 로그인된 경우, 마이페이지로 이동 (원하시면 다른 화면으로 변경 가능)
    handleClose();
    navigation.navigate('MyPage' as never);
  };

  // Q&A 목록 화면으로 이동
  const handleQnaList = () => {
    handleClose();
    safeNavigate('QnaList');
  };

  // 인증종류 화면으로 이동
  const handleCertificationTypes = () => {
    handleClose();
    navigation.navigate('CertificationTypes' as never);
  };

  // 성공사례 화면으로 이동
  const handleSuccessCases = () => {
    handleClose();
    navigation.navigate('SuccessCases' as never);
  };
  
  // 기업 장바구니 화면으로 이동
  const handleShoppingCartCorp = () => {
    handleClose();
    navigation.navigate('ShoppingCartCorp' as never);
  };

  // 개인 장바구니 화면으로 이동
  const handleShoppingCartPerson = () => {
    handleClose();
    navigation.navigate('ShoppingCartPerson' as never);
  };

  // 기업 결제관리 화면으로 이동
  const handlePaymentCorporate = () => {
    handleClose();
    navigation.navigate('PaymentManagementCorporate' as never);
  };

  // 개인 결제관리 화면으로 이동
  const handlePaymentPersonal = () => {
    handleClose();
    navigation.navigate('PaymentManagementPersonal' as never);
  };

  // 설정 화면으로 이동
  const handleSettings = () => {
    handleClose();
    navigation.navigate('Settings' as never);
  };

  // 마이페이지(개인) 화면으로 이동
  const handleMyPagePersonal = () => {
    handleClose();
    navigation.navigate('MyPage' as never);
  };

  // 마이페이지(기업) 화면으로 이동
  const handleMyPageCorporate = () => {
    handleClose();
    navigation.navigate('MyPageCorperation' as never);
  };

  // Q&A 답변 화면으로 이동
  const handleQnaAnswers = () => {
    handleClose();
    navigation.navigate('QA_Answers' as never);
  };

  // 공고 관리 화면으로 이동
  const handleAnnounceManagement = () => {
    handleClose();
    navigation.navigate('AnnounceManagement' as never);
  };

  // 공지사항 관리 화면으로 이동
  const handleNoticeManagement = () => {
    handleClose();
    navigation.navigate('NoticeNewsList' as never);
  };

  // 베너 광고 관리 화면으로 이동
  const handleBannerManagement = () => {
    handleClose();
    navigation.navigate('BannerManagement' as never);
  };

  // 관리자 페이지 화면으로 이동 (누락된 핸들러 추가)
  const handleAdminPage = () => {
    handleClose();
    // 실제 관리자 메인 화면 라우트 이름에 맞게 수정하세요
    safeNavigate('AdminManagement');
  };

  // Function to get user type label
  const getUserTypeLabel = (role: string) => {
    switch (role) {
      case 'company':
        return '기업';
      case 'consultant':
        return '전문가';
      case 'educator':
        return '교육기관';
      case 'admin':
        return '관리자';
      default:
        return '사용자';
    }
  };

  // Function to get user type icon
  const getUserTypeIcon = (role: string) => {
    switch (role) {
      case 'company':
        return 'building';
      case 'consultant':
        return 'user-tie';
      case 'educator':
        return 'graduation-cap';
      case 'admin':
        return 'shield-alt';
      default:
        return 'user';
    }
  };

  // Function to check if profile is complete
  const isProfileComplete = (user: any) => {
    if (!user) return false;
    
    // Check if essential profile information is provided
    const hasName = user.name && user.name.trim() !== '';
    const hasEmail = user.email && user.email.trim() !== '';
    
    // For companies, check if company name and business registration number exist
    if (user.role === 'company') {
      return hasName && hasEmail; // Add more company-specific checks if needed
    }
    
    // For consultants/experts, check additional fields
    if (user.role === 'consultant') {
      return hasName && hasEmail; // Add more expert-specific checks if needed
    }
    
    return hasName && hasEmail;
  };

  return (
    <Modal
      visible={visible}
      animationType="fade"
      transparent
      onRequestClose={handleBackButton}
    >
      <TouchableOpacity
        style={styles.overlay}
        onPress={handleClose}
        activeOpacity={1}
      >
        {/* 메뉴를 좌측에 배치하고 좌->우 슬라이드 애니메이션 적용 */}
        <Animated.View
          style={[styles.menu, { transform: [{ translateX: slideAnim }] }]}
          onStartShouldSetResponder={() => true}
        >
          <TouchableOpacity style={styles.header} onPress={handleHeaderPress} activeOpacity={0.8}>
            <View style={styles.avatar}>
              <FontAwesome5 
                name={userIsAuthenticated && user ? getUserTypeIcon(user.role) : "user"} 
                size={24} 
                color="#0066CC" 
              />
            </View>
            <View style={styles.userInfo}>
              {userIsAuthenticated && user ? (
                <>
                  <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <Text style={styles.userName}>{user.name || '사용자'}</Text>
                    <View style={styles.userTypeBadge}>
                      <Text style={styles.userTypeText}>
                        {getUserTypeLabel(user.role)}
                      </Text>
                    </View>
                  </View>
                  <Text style={styles.userCompany}>{user.email}</Text>
                  {!isProfileComplete(user) && (
                    <Text style={styles.profileMessage}>
                      프로필 정보를 입력해주세요
                    </Text>
                  )}
                </>
              ) : (
                <>
                  {/* 로그인되지 않은 경우: 이름은 빈 칸, 이메일에는 안내 문구 */}
                  <Text style={styles.userName}>{''}</Text>
                  <Text style={styles.userCompany}>로그인 해주세요</Text>
                </>
              )}
            </View>
          </TouchableOpacity>
          <ScrollView
            style={styles.content}
            contentContainerStyle={styles.contentContainer}
            showsVerticalScrollIndicator={true}
          >
            <MenuItem icon="id-badge" label="개인 정보 등록" onPress={handlePersonalRegistration} />
            <MenuItem icon="edit" label="개인 정보 수정" onPress={handlePersonalEdit} />
            <MenuItem icon="building" label="기업 정보 등록" onPress={handleCompanyRegistration} />
            <MenuItem icon="edit" label="기업 정보 수정" onPress={handleCompanyEdit} />
            
            <View style={styles.divider} />

            <MenuItem icon="list" label="컨설팅 및 구직 등록" onPress={handleExpertRecruitmentList} />
            <MenuItem icon="users" label="전문가 등록" onPress={handleExpertProfessionalList} />
            <MenuItem icon="book" label="인증 교육 등록" onPress={handleEducationList} />
            <View style={styles.divider} />
            
            <MenuItem icon="user-plus" label="인증심사원 자격등록" onPress={handleCertAudRegistration} />
            <MenuItem icon="clipboard-list" label="인증심사 지원/결과" onPress={handleCertAudResult} />
            <View style={styles.divider} />

            <MenuItem icon="calendar-alt" label="일정관리" onPress={handleScheduleManager} />
            <MenuItem icon="bookmark" label="북마크 페이지(개인)" onPress={handleBookmarkPersonal} />
            <MenuItem icon="bookmark" label="북마크 페이지(기업)" onPress={handleBookmarkCorporates} />
            <View style={styles.divider} />

            <MenuItem icon="credit-card" label="기업 결제관리" onPress={handlePaymentCorporate} />
            <MenuItem icon="wallet" label="개인 결제관리" onPress={handlePaymentPersonal} />
            <View style={styles.divider} />
            
            <MenuItem icon="shopping-cart" label="기업 장바구니" onPress={handleShoppingCartCorp} />
            <MenuItem icon="shopping-basket" label="개인 장바구니" onPress={handleShoppingCartPerson} />
            <View style={styles.divider} />

            <MenuItem icon="tags" label="인증종류" onPress={handleCertificationTypes} />
            <MenuItem icon="question-circle" label="Q&A"  onPress={handleQnaList} />
            <MenuItem icon="trophy" label="성공사례" onPress={handleSuccessCases} />
            <View style={styles.divider} />

            <MenuItem icon="cog" label="설정" onPress={handleSettings} />
            <MenuItem icon="question-circle" label="도움말" />
            <MenuItem icon="user-circle" label="내정보(개인)" onPress={handleMyPagePersonal} />
            <MenuItem icon="user-circle" label="내정보(기업)" onPress={handleMyPageCorporate} />
            <View style={styles.divider} />

            <TouchableOpacity style={styles.menuItem} onPress={handleAuthAction}>
              <FontAwesome5 
                name={userIsAuthenticated ? "sign-out-alt" : "sign-in-alt"} 
                size={18} 
                color="#0066CC" 
                style={{ width: 24 }} 
              />
              <Text style={styles.menuLabel}>
                {userIsAuthenticated ? "로그아웃" : "로그인"}
              </Text>
            </TouchableOpacity>
            {/* //관리자 페이지 */}
            <View style={styles.divider} />
            <MenuItem icon="user-shield" label="관리자 페이지" onPress={handleAdminPage} />
            <MenuItem icon="comment-dots" label="Q&A 답변" onPress={handleQnaAnswers} />
            <MenuItem icon="bullhorn" label="공고 관리" onPress={handleAnnounceManagement} />
            <MenuItem icon="bullhorn" label="공지사항 관리" onPress={handleNoticeManagement} />
            <MenuItem icon="image" label="베너 광고 관리" onPress={handleBannerManagement} />
          </ScrollView>
        </Animated.View>
      </TouchableOpacity>
    </Modal>
  );
};

const MenuItem = ({ icon, label, onPress }: { icon: any; label: string; onPress?: () => void }) => (
  <TouchableOpacity style={styles.menuItem} onPress={onPress}>
    <FontAwesome5 name={icon} size={18} color="#0066CC" style={{ width: 24 }} />
    <Text style={styles.menuLabel}>{label}</Text>
  </TouchableOpacity>
);
