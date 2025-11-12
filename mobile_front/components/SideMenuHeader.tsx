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
};

type NavigationProp = NativeStackNavigationProp<RootStackParamList>;

export const Header: React.FC<HeaderProps> = ({ onMenuPress, notificationCount = 3 }) => {
  const navigation = useNavigation<NavigationProp>();

  const handleProfilePress = () => {
    // Navigate to login screen
    navigation.navigate('Login');
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.leftIcon} onPress={onMenuPress} accessibilityRole="button" accessibilityLabel="Open menu">
        <FontAwesome5 name="bars" size={20} color="#fff" />
      </TouchableOpacity>
      <Text style={styles.title}>CertLine</Text>
      <View style={styles.rightIcons}>
        <View style={styles.iconWithBadge}>
          <FontAwesome5 name="bell" size={20} color="#fff" />
          {notificationCount > 0 && (
            <View style={styles.badge}>
              <Text style={styles.badgeText}>{notificationCount}</Text>
            </View>
          )}
        </View>
        <TouchableOpacity 
          style={styles.rightIcon}
          onPress={handleProfilePress}
        >
          <FontAwesome5 name="user-circle" size={22} color="#fff" />
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
    paddingHorizontal: 12,
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
    marginRight: 15,
    position: 'relative',
  },
  rightIcon: {
    padding: 6,
  },
  badge: {
    position: 'absolute',
    top: -8,
    right: -8,
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