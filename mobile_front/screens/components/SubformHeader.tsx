import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ViewStyle, TextStyle } from 'react-native';
import { FontAwesome5 } from '@expo/vector-icons';

export interface SubformHeaderProps {
  title: string;
  showBack?: boolean;
  showHome?: boolean;
  onBack?: () => void;
  onHome?: () => void;
  navigation?: any; // navigation prop 추가
  containerStyle?: ViewStyle;
  titleStyle?: TextStyle;
}

// 서브폼 상단 헤더 (좌: 뒤로가기, 중앙: 제목, 우: 홈)
const SubformHeader: React.FC<SubformHeaderProps> = ({
  title,
  showBack = true,
  showHome = true,
  onBack,
  onHome,
  navigation,
  containerStyle,
  titleStyle,
}) => {
  return (
    <View style={[styles.container, containerStyle]}> 
      <TouchableOpacity
        onPress={() => {
          if (onBack) {
            onBack();
          } else if (navigation && navigation.canGoBack && navigation.canGoBack()) {
            navigation.goBack();
          } else if (navigation && navigation.goBack) {
            navigation.goBack();
          }
        }}
        style={styles.iconButton}
        accessibilityRole="button"
        accessibilityLabel="뒤로가기"
      >
        {showBack ? (
          <FontAwesome5 name="chevron-left" size={18} color="#333" />
        ) : (
          <View style={styles.iconPlaceholder} />
        )}
      </TouchableOpacity>

      <Text style={[styles.title, titleStyle]}>{title}</Text>

      <TouchableOpacity
        onPress={onHome}
        style={styles.iconButton}
        accessibilityRole="button"
        accessibilityLabel="홈으로"
      >
        {showHome ? (
          <FontAwesome5 name="home" size={18} color="#333" />
        ) : (
          <View style={styles.iconPlaceholder} />
        )}
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: 52,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 12,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  iconButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  iconPlaceholder: {
    width: 18,
    height: 18,
  },
  title: {
    fontSize: 16,
    fontWeight: '700',
    color: '#333',
  },
});

export default SubformHeader;