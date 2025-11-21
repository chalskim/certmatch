import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ViewStyle, TextStyle } from 'react-native';
import { FontAwesome5 } from '@expo/vector-icons';

type Props = {
  title: string;
  onBack?: () => void;
  onHome?: () => void;
  showBack?: boolean; // default true if onBack provided
  showHome?: boolean; // default true if onHome provided
  navigation?: any; // 수신은 하지만 내부에서 직접 사용하지 않음 (호환성 목적)
  containerStyle?: ViewStyle;
  titleStyle?: TextStyle;
  rightElement?: React.ReactNode;
};

const SubformHeader: React.FC<Props> = ({
  title,
  onBack,
  onHome,
  showBack = true,
  showHome = true,
  containerStyle,
  titleStyle,
  rightElement,
  navigation,
}) => {
  // Fallbacks: use navigation if explicit handlers are not provided
  const handleBack = onBack ?? (navigation?.goBack ? () => navigation.goBack() : undefined);
  const handleHome = onHome ?? (navigation?.navigate ? () => navigation.navigate('Home') : undefined);

  const renderBack = showBack && !!handleBack;
  const renderHome = showHome && !!handleHome;

  return (
    <View style={[styles.container, containerStyle]}> 
      <View style={styles.left}>
        {renderBack ? (
          <TouchableOpacity onPress={handleBack} accessibilityLabel="뒤로 가기" style={styles.backBtn}>
            <FontAwesome5 name="chevron-left" size={16} color="#343a40" />
          </TouchableOpacity>
        ) : (
          <View style={{ width: 32 }} />
        )}
      </View>
      <View style={styles.center}>
        <Text style={[styles.title, titleStyle]} numberOfLines={1}>{title}</Text>
      </View>
      <View style={styles.right}>
        {rightElement ?? (
          renderHome ? (
            <TouchableOpacity onPress={handleHome} accessibilityLabel="홈으로 이동" style={styles.homeBtn}>
              <FontAwesome5 name="home" size={18} color="#343a40" />
            </TouchableOpacity>
          ) : null
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: 52,
    backgroundColor: '#f8f9fa',
    borderBottomWidth: 1,
    borderBottomColor: '#e9ecef',
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
  },
  left: { width: 40, alignItems: 'flex-start', justifyContent: 'center' },
  center: { flex: 1, alignItems: 'center', justifyContent: 'center' },
  right: { width: 80, alignItems: 'flex-end', justifyContent: 'center' },
  title: { fontSize: 16, fontWeight: '700', color: '#212529' },
  backBtn: { padding: 8, borderRadius: 8 },
  homeBtn: { padding: 8, borderRadius: 8 },
});

export default SubformHeader;