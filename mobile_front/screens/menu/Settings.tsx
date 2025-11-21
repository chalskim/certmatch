import React, { useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  Switch,
  ViewStyle,
  TextStyle,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { FontAwesome5 } from '@expo/vector-icons';
import SubformHeader from '../components/SubformHeader';

interface SettingItem {
  id: string;
  title: string;
  description?: string;
  icon: string;
  type: 'navigation' | 'toggle' | 'action';
  value?: boolean;
  onPress?: () => void;
}

export default function Settings() {
  const navigation = useNavigation<any>();
  const [darkMode, setDarkMode] = useState(false);
  const [notifications, setNotifications] = useState(true);
  const [autoLogin, setAutoLogin] = useState(true);
  const [marketingEmails, setMarketingEmails] = useState(false);

  const handleBack = () => {
    navigation.goBack();
  };

  const handleLogout = () => {
    // TODO: Implement logout functionality
    console.log('Logout pressed');
  };

  const handleDeleteAccount = () => {
    // TODO: Implement account deletion
    console.log('Delete account pressed');
  };

  const settingsSections: SettingItem[][] = [
    [
      {
        id: '1',
        title: '프로필 관리',
        description: '개인 정보 및 프로필 사진 수정',
        icon: 'user',
        type: 'navigation',
        onPress: () => console.log('Profile management')
      },
      {
        id: '2',
        title: '비밀번호 변경',
        description: '계정 비밀번호를 변경합니다',
        icon: 'key',
        type: 'navigation',
        onPress: () => console.log('Change password')
      },
      {
        id: '3',
        title: '알림 설정',
        description: '푸시 알림 및 이메일 알림',
        icon: 'bell',
        type: 'toggle',
        value: notifications,
        onPress: () => setNotifications(!notifications)
      }
    ],
    [
      {
        id: '4',
        title: '다크 모드',
        description: '어두운 테마로 전환',
        icon: 'moon',
        type: 'toggle',
        value: darkMode,
        onPress: () => setDarkMode(!darkMode)
      },
      {
        id: '5',
        title: '자동 로그인',
        description: '앱 실행 시 자동으로 로그인',
        icon: 'sign-in-alt',
        type: 'toggle',
        value: autoLogin,
        onPress: () => setAutoLogin(!autoLogin)
      },
      {
        id: '6',
        title: '마케팅 수신 동의',
        description: '이벤트 및 혜택 정보 수신',
        icon: 'envelope',
        type: 'toggle',
        value: marketingEmails,
        onPress: () => setMarketingEmails(!marketingEmails)
      }
    ],
    [
      {
        id: '7',
        title: '고객센터',
        description: '문의사항 및 도움말',
        icon: 'question-circle',
        type: 'navigation',
        onPress: () => console.log('Customer service')
      },
      {
        id: '8',
        title: '앱 버전 정보',
        description: '현재 버전 1.0.0',
        icon: 'info-circle',
        type: 'action',
        onPress: () => console.log('App version')
      },
      {
        id: '9',
        title: '오픈소스 라이선스',
        icon: 'file-alt',
        type: 'navigation',
        onPress: () => console.log('Open source licenses')
      }
    ],
    [
      {
        id: '10',
        title: '로그아웃',
        icon: 'sign-out-alt',
        type: 'action',
        onPress: handleLogout
      },
      {
        id: '11',
        title: '회원탈퇴',
        icon: 'user-slash',
        type: 'action',
        onPress: handleDeleteAccount
      }
    ]
  ];

  const renderSettingItem = (item: SettingItem) => {
    const isLastInSection = settingsSections.flat().indexOf(item) === settingsSections.flat().length - 1;
    
    return (
      <TouchableOpacity
        key={item.id}
        style={[styles.settingItem, !isLastInSection && styles.settingItemBorder]}
        onPress={item.onPress}
        disabled={item.type === 'toggle'}
      >
        <View style={styles.settingLeft}>
          <FontAwesome5 name={item.icon as any} size={20} color="#0066CC" style={styles.settingIcon} />
          <View style={styles.settingTextContainer}>
            <Text style={styles.settingTitle}>{item.title}</Text>
            {item.description && (
              <Text style={styles.settingDescription}>{item.description}</Text>
            )}
          </View>
        </View>
        
        {item.type === 'toggle' && (
          <Switch
            value={item.value}
            onValueChange={item.onPress}
            trackColor={{ false: '#767577', true: '#0066CC' }}
            thumbColor={item.value ? '#fff' : '#f4f3f4'}
          />
        )}
        
        {item.type === 'navigation' && (
          <FontAwesome5 name="chevron-right" size={16} color="#999" />
        )}
      </TouchableOpacity>
    );
  };

  return (
    <SafeAreaView style={[styles.container, darkMode && styles.containerDark]}>
      <SubformHeader
        title="설정"
        navigation={navigation}
        onBack={handleBack}
        onHome={() => navigation.navigate('Home')}
        containerStyle={StyleSheet.flatten<ViewStyle>([styles.header, darkMode && styles.headerDark])}
        titleStyle={StyleSheet.flatten<TextStyle>([styles.headerTitle, darkMode && styles.headerTitleDark])}
      />

      <ScrollView style={styles.content}>
        {settingsSections.map((section, sectionIndex) => (
          <View key={sectionIndex} style={[styles.settingsSection, darkMode && styles.settingsSectionDark]}>
            {section.map(renderSettingItem)}
          </View>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f7fa',
  },
  containerDark: {
    backgroundColor: '#1a1a2e',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 15,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
  },
  headerDark: {
    backgroundColor: '#16213e',
    borderBottomColor: '#0f3460',
  },
  backButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#f0f2f5',
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  headerTitleDark: {
    color: '#eee',
  },
  content: {
    flex: 1,
  },
  settingsSection: {
    backgroundColor: '#fff',
    borderRadius: 12,
    margin: 20,
    marginBottom: 10,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  settingsSectionDark: {
    backgroundColor: '#16213e',
  },
  settingItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 16,
  },
  settingItemBorder: {
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  settingLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  settingIcon: {
    marginRight: 15,
  },
  settingTextContainer: {
    flex: 1,
  },
  settingTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginBottom: 2,
  },
  settingDescription: {
    fontSize: 13,
    color: '#666',
  },
});