import React, { useEffect, useRef } from 'react';
import { View, Text, TouchableOpacity, Modal, Animated, BackHandler, ScrollView, Alert, Easing, Image } from 'react-native';
import { styles } from '../comstyles/SideMenu';
import { FontAwesome5 } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { useUser } from '../contexts/UserContext';

interface SideMenuProps {
  visible: boolean;
  onClose: () => void;
}

export const SideMenu: React.FC<SideMenuProps> = ({ visible, onClose }) => {
  const slideAnim = useRef(new Animated.Value(-280)).current;
  const navigation = useNavigation();
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
    navigation.navigate('PersonalRegistration' as never);
  };

  // Handle navigation to Company Registration screen
  const handleCompanyRegistration = () => {
    handleClose();
    navigation.navigate('CompanyRegistration' as never);
  };

  // 인증 인력모집 등록 화면으로 이동
  const handleExpertRecruitment = () => {
    handleClose();
    navigation.navigate('ExpertRecruitment' as never);
  };

 // 인증 전문가모집 등록 화면으로 이동
  const handleExpertProfessional = () => {
    handleClose();
    navigation.navigate('ExpertProfessional' as never);
  };

   // 인증 교육등록 화면으로 이동
  const handleEducationRegistration = () => {
    handleClose();
    navigation.navigate('EducationRegistration' as never);
  };

   // 인증 인력모집 목록 화면으로 이동
  const handleExpertRecruitmentList = () => {
    handleClose();
    navigation.navigate('ExpertRecruitmentList' as never);
  };

   // 인증 인력모집 목록 화면으로 이동
  const handleExpertProfessionalDetail = () => {
    handleClose();
    navigation.navigate('ExpertProfessionalDetail' as never);
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
          <View style={styles.header}>
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
          </View>
          <ScrollView style={styles.content}>
            <MenuItem icon="home" label="홈" />
            <MenuItem icon="bullhorn" label="개인 자격 등록" onPress={handlePersonalRegistration} />
            <MenuItem icon="briefcase" label="기업 자격 등록" onPress={handleCompanyRegistration} />
            
            <View style={styles.divider} />

            <MenuItem icon="user-tie" label="인증 인력모집 등록" onPress={handleExpertRecruitment} />
            <MenuItem icon="user-tie" label="인증 전문가 등록" onPress={handleExpertProfessional} />
            <MenuItem icon="graduation-cap" label="인증 교육 등록" onPress={handleEducationRegistration} />
            <View style={styles.divider} />

            <MenuItem icon="user-tie" label="인증 인력모집 목록" onPress={handleExpertRecruitmentList} />
            <MenuItem icon="user-tie" label="인증 전문가등록 목록" onPress={handleExpertProfessionalDetail} />
            <MenuItem icon="graduation-cap" label="인증 교육 목록" onPress={handleExpertProfessionalDetail} />
            <View style={styles.divider} />

            <MenuItem icon="user-plus" label="전문가 등록" />
            <MenuItem icon="clipboard-list" label="심사 지원/결과" />
            <MenuItem icon="calendar-alt" label="일정관리" />
            <MenuItem icon="trophy" label="성공사례" />

            <View style={styles.divider} />

            <MenuItem icon="cog" label="설정" />
            <MenuItem icon="question-circle" label="도움말" />
            <MenuItem icon="user-circle" label="내정보" />
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