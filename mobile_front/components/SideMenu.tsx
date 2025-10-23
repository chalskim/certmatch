import React, { useEffect, useRef } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Modal, ScrollView, Animated, Easing } from 'react-native';
import { FontAwesome5 } from '@expo/vector-icons';

interface SideMenuProps {
  visible: boolean;
  onClose: () => void;
}

export const SideMenu: React.FC<SideMenuProps> = ({ visible, onClose }) => {
  const slideAnim = useRef(new Animated.Value(-280)).current;

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
              <FontAwesome5 name="user" size={24} color="#0066CC" />
            </View>
            <View style={styles.userInfo}>
              <Text style={styles.userName}>홍길동</Text>
              <Text style={styles.userCompany}>㈜테크솔루션</Text>
            </View>
          </View>
          <ScrollView style={styles.content}>
            <MenuItem icon="home" label="홈" />
            <MenuItem icon="bullhorn" label="공지사항 및 뉴스" />
            <MenuItem icon="briefcase" label="컨설팅 및 인력 모집" />
            <MenuItem icon="user-tie" label="전문가 매칭" />
            <MenuItem icon="graduation-cap" label="전문가 교육" />

            <View style={styles.divider} />

            <MenuItem icon="user-plus" label="전문가 등록" />
            <MenuItem icon="clipboard-list" label="심사 지원/결과" />
            <MenuItem icon="calendar-alt" label="일정관리" />
            <MenuItem icon="trophy" label="성공사례" />

            <View style={styles.divider} />

            <MenuItem icon="cog" label="설정" />
            <MenuItem icon="question-circle" label="도움말" />
            <MenuItem icon="user-circle" label="내정보" />
            <MenuItem icon="sign-out-alt" label="로그아웃" />
          </ScrollView>
        </Animated.View>
      </TouchableOpacity>
    </Modal>
  );
};

const MenuItem = ({ icon, label }: { icon: any; label: string }) => (
  <TouchableOpacity style={styles.menuItem}>
    <FontAwesome5 name={icon} size={18} color="#0066CC" style={{ width: 24 }} />
    <Text style={styles.menuLabel}>{label}</Text>
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  menu: {
    width: 280,
    height: '100%',
    backgroundColor: '#fff',
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 10,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#0066CC',
    gap: 15,
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fff',
  },
  userInfo: {},
  userName: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 5,
  },
  userCompany: {
    color: '#e6f0ff',
    fontSize: 12,
  },
  content: {
    paddingHorizontal: 0,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 15,
    paddingHorizontal: 20,
  },
  menuLabel: {
    marginLeft: 15,
    fontSize: 15,
    color: '#333',
  },
  divider: {
    height: 1,
    backgroundColor: '#eee',
    marginVertical: 10,
  },
});