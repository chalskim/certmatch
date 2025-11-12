import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { FontAwesome5 } from '@expo/vector-icons';

export interface ScreenHeaderProps {
  title: string;
  backgroundColor?: string;
  titleColor?: string;
  showHome?: boolean;
  onBack?: () => void;
  onHome?: () => void;
}

// 공통 상단 헤더 (뒤로가기 / 홈)
export const ScreenHeader: React.FC<ScreenHeaderProps> = ({
  title,
  backgroundColor = '#4a6fdc',
  titleColor = '#fff',
  showHome = true,
  onBack,
  onHome,
}) => {
  return (
    <View style={[styles.header, { backgroundColor }]}> 
      <TouchableOpacity
        onPress={onBack}
        style={styles.headerIcon}
        accessibilityRole="button"
        accessibilityLabel="뒤로가기"
      >
        <FontAwesome5 name="arrow-left" size={18} color={titleColor} />
      </TouchableOpacity>

      <Text style={[styles.headerTitle, { color: titleColor }]}>{title}</Text>

      {showHome ? (
        <TouchableOpacity
          onPress={onHome}
          style={styles.headerIcon}
          accessibilityRole="button"
          accessibilityLabel="홈으로"
        >
          <FontAwesome5 name="home" size={18} color={titleColor} />
        </TouchableOpacity>
      ) : (
        <View style={{ width: 40 }} />
      )}
    </View>
  );
};

const styles = {
  header: {
    height: 60,
    flexDirection: 'row' as const,
    alignItems: 'center' as const,
    justifyContent: 'space-between' as const,
    paddingHorizontal: 16,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 5,
    shadowOffset: { width: 0, height: 2 },
  },
  headerIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: 'center' as const,
    justifyContent: 'center' as const,
  },
  headerTitle: { fontSize: 18, fontWeight: '700' as const },
} as const;

export default ScreenHeader;