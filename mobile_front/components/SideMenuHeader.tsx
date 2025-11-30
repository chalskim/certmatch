import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { FontAwesome5 } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';

interface HeaderProps {
  onMenuPress: () => void;
  notificationCount?: number;
}

type RootStackParamList = {
  Main: undefined;
  Login: undefined;
  Signup: undefined;
  ShoppingCartCorp: undefined;
  ShoppingCartPerson: undefined;
  AlarmManagement: undefined;
  MyPage: undefined;
};

type NavigationProp = NativeStackNavigationProp<RootStackParamList>;

export const Header: React.FC<HeaderProps> = ({ onMenuPress, notificationCount = 3 }) => {
  const navigation = useNavigation<NavigationProp>();

  const handleProfilePress = () => {
    // 사용자 아이콘: 로그인 대신 마이페이지로 이동
    navigation.navigate('MyPage');
  };

  const handleShoppingCartCorp = () => {
    navigation.navigate('ShoppingCartCorp');
  };

  const handleShoppingCartPerson = () => {
    navigation.navigate('ShoppingCartPerson');
  };

  const handleMyPage = () => {
    // 종(벨) 아이콘: 알림 관리 화면으로 이동
    navigation.navigate('AlarmManagement');
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.leftIcon} onPress={onMenuPress} accessibilityRole="button" accessibilityLabel="Open menu">
        <FontAwesome5 name="bars" size={20} color="#fff" />
      </TouchableOpacity>
      <Text style={styles.title}>SuperSlice</Text>
      <View style={styles.rightIcons}>
        {/* Corporate and Personal Shopping Cart icons */}
        <TouchableOpacity
          style={styles.rightIcon}
          onPress={handleShoppingCartCorp}
          accessibilityRole="button"
          accessibilityLabel="기업 장바구니"
        >
          <FontAwesome5 name="shopping-cart" size={20} color="#fff" />
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.rightIcon}
          onPress={handleShoppingCartPerson}
          accessibilityRole="button"
          accessibilityLabel="개인 장바구니"
        >
          <FontAwesome5 name="shopping-basket" size={20} color="#fff" />
        </TouchableOpacity>
        
        <TouchableOpacity
          style={styles.iconWithBadge}
          onPress={handleMyPage}
          accessibilityRole="button"
          accessibilityLabel="알림 화면으로 이동"
          hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
        >
          <FontAwesome5 name="bell" size={20} color="#fff" onPress={handleMyPage} />
          {notificationCount > 0 && (
            <View style={[styles.badge, { pointerEvents: 'none' as any }]}>
              <Text style={styles.badgeText}>{notificationCount}</Text>
            </View>
          )}
        </TouchableOpacity>
        <TouchableOpacity 
          style={styles.rightIcon}
          onPress={handleProfilePress}
          accessibilityRole="button"
          accessibilityLabel="마이 페이지로 이동"
        >
          <FontAwesome5 name="user-circle" size={20} color="#fff" />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: 56,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 8,
    backgroundColor: '#0066CC',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 5,
  },
  leftIcon: {
    padding: 8,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#fff',
  },
  rightIcons: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  iconWithBadge: {
    marginRight: 6,
    position: 'relative',
    padding: 4,
    marginHorizontal: 2,
    // RN Web 전용: 클릭 UX 향상을 위한 커서 표시
    cursor: 'pointer' as any,
  },
  rightIcon: {
    padding: 4,
    marginHorizontal: 2,
  },
  badge: {
    position: 'absolute',
    top: -6,
    right: -6,
    backgroundColor: '#FF4444',
    borderRadius: 10,
    minWidth: 20,
    height: 20,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 3,
  },
  badgeText: {
    color: '#fff',
    fontSize: 11,
    fontWeight: 'bold',
  },
});
