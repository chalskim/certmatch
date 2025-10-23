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

  return (
    <Modal visible={visible} animationType="fade" transparent>
      <View style={styles.overlay}>
        {/* 메뉴를 좌측에 배치하고 좌->우 슬라이드 애니메이션 적용 */}
        <Animated.View style={[styles.menu, { transform: [{ translateX: slideAnim }] }]}>
          <View style={styles.header}>
            <View style={styles.avatar}>
              <FontAwesome5 name="user" size={20} color="#fff" />
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
        {/* 남은 영역 터치 시 닫기 애니메이션 후 종료 */}
        <TouchableOpacity style={styles.overlayTouchable} onPress={handleClose} />
      </View>
    </Modal>
  );
};

const MenuItem = ({ icon, label }: { icon: any; label: string }) => (
  <TouchableOpacity style={styles.menuItem}>
    <FontAwesome5 name={icon} size={18} color="#333" style={{ width: 24 }} />
    <Text style={styles.menuLabel}>{label}</Text>
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.35)',
    flexDirection: 'row',
  },
  overlayTouchable: {
    flex: 1,
  },
  menu: {
    width: 280,
    backgroundColor: '#fff',
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 10,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    backgroundColor: '#2d89ef',
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#1b5fbf',
    marginRight: 12,
  },
  userInfo: {},
  userName: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  userCompany: {
    color: '#e6f0ff',
    marginTop: 2,
    fontSize: 13,
  },
  content: {
    paddingHorizontal: 8,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    paddingHorizontal: 8,
  },
  menuLabel: {
    marginLeft: 10,
    fontSize: 15,
    color: '#222',
  },
  divider: {
    height: 1,
    backgroundColor: '#eee',
    marginVertical: 8,
  },
});