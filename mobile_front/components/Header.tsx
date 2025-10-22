import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { FontAwesome5 } from '@expo/vector-icons';

interface HeaderProps {
  onMenuPress: () => void;
  notificationCount?: number;
}

export const Header: React.FC<HeaderProps> = ({ onMenuPress, notificationCount = 3 }) => {
  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.leftIcon} onPress={onMenuPress} accessibilityRole="button" accessibilityLabel="Open menu">
        <FontAwesome5 name="bars" size={20} color="#333" />
      </TouchableOpacity>
      <Text style={styles.title}>CertMatch</Text>
      <View style={styles.rightIcons}>
        <View style={styles.iconWithBadge}>
          <FontAwesome5 name="bell" size={20} color="#333" />
          {notificationCount > 0 && (
            <View style={styles.badge}>
              <Text style={styles.badgeText}>{notificationCount}</Text>
            </View>
          )}
        </View>
        <TouchableOpacity style={styles.rightIcon}>
          <FontAwesome5 name="user-circle" size={22} color="#333" />
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
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: '#eee',
    backgroundColor: '#fff',
  },
  leftIcon: {
    padding: 8,
  },
  title: {
    fontSize: 18,
    fontWeight: '600',
    color: '#222',
  },
  rightIcons: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  iconWithBadge: {
    marginRight: 12,
  },
  rightIcon: {
    padding: 6,
  },
  badge: {
    position: 'absolute',
    top: -6,
    right: -6,
    backgroundColor: '#e53935',
    borderRadius: 8,
    minWidth: 16,
    height: 16,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 3,
  },
  badgeText: {
    color: '#fff',
    fontSize: 10,
    fontWeight: '700',
  },
});