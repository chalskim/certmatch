import React, { useEffect, useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaView, View, StyleSheet, ActivityIndicator, Text } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Header } from './components/Header';
import { SideMenu } from './components/SideMenu';
import { HomeScreen } from './screens/HomeScreen';
import { LoginScreen } from './screens/LoginScreen';
import { SignupScreen } from './screens/SignupScreen';
import { apiService } from './services/apiService';
import { MessageProvider } from './hooks/useMessage';
import { UserProvider } from './contexts/UserContext';
import { MainTabNavigator } from './navigation/MainTabNavigator';

// 알림 센터 화면
import AlarmManagement from './screens/menu/AlarmManagement';

// 메뉴 화면들
import  RegistrationPersonal  from './screens/menu/RegistrationPersonal';
import  PersonalRegistrationEdit from './screens/menu/PersonalRegistrationEdit';
import  RegistrationCompany from './screens/menu/RegistrationCompany';
import  CompanyRegistrationEdit from './screens/menu/CompanyRegistrationEdit';

// 등록화면
import InputExpertRecruitment from './screens/menu/InputExpertRecruitment';
import InputExpertProfessional from './screens/menu/InputExpertProfessional';
import InputEducationRegistration from './screens/menu/InputEducationRegistration';

//목록+추가버튼+상세화면
import ExpertRecruitmentList from './screens/menu/ExpertRecruitmentList';
import ExpertRecruitmentListDetail from './screens/menu/ExpertRecruitmentListDetail';
import ExpertProfessionalList from './screens/menu/ExpertProfessionalList';
import ProfessionalistDetail from './screens/menu/ProfessionalistDetail';
import EducationList from './screens/menu/EducationList';

//세부항목 페이지
import EducationListDetail from './screens/menu/EducationListDetail';
import EduListDetail from './screens/menu/EduListDetail';
import NoticeItemlistDetail from './screens/menu/NoticeItemlistDetail';

// 인증심사 등록/결과 화면
import CertAudRegistration from './screens/menu/CertAudRegistration';
import CertAudResult from './screens/menu/CertAudResult';

// 일정관리 화면
import ScheduleManager from './screens/menu/ScheduleManager';
// 북마크화면
import BookmarkPersonal from './screens/menu/BookmarkPersonal';
import BookmarkCorporate from './screens/menu/BookmarkCorporate';


// Q&A 목록 화면
import QnaList from './screens/menu/QnaList';


// 새로운 화면들
import CertificationTypes from './screens/menu/CertificationTypes';
import SuccessCases from './screens/menu/SuccessCases';
import PaymentManagementCorporate from './screens/menu/PaymentManagementCorporate';
import PaymentManagementPersonal from './screens/menu/PaymentManagementPersonal';
import Settings from './screens/menu/Settings';

import MyPagePerson from './screens/menu/MyPagePerson';
import MyPageCorperation from './screens/menu/MyPageCorperation';

//관리자 메뉴
import QA_Answers from './screens/menu/QA_Answers';
import AnnounceManagement from './screens/menu/AnnounceManagement';
import BannerManagement from './screens/menu/BannerManagement';
import AdminManagement from './screens/menu/AdminManagement';
import NoticeNewsList from './screens/menu/NoticeNewsList';
import NoticeNewsReg from './screens/menu/NoticeNewsReg';

// 장바구니 화면 (경로에서 .tsx 확장자 제거하여 TS 설정과 호환)
import ShoppingCartCorp from './screens/menu/ShoppingCartCorp';
import ShoppingCartPerson from './screens/menu/ShoppingCartPerson';


// Create a native stack navigator
const Stack = createNativeStackNavigator();

// 타입 불일치로 JSX 컴포넌트로 사용할 수 없다는 진단을 회피하기 위한 안전한 캐스팅 래퍼
// 런타임 동작은 동일하며 타입 체크만 완화합니다.
type AnyComponent = React.ComponentType<any>;
const NavigationContainerAny = NavigationContainer as unknown as AnyComponent;
const StackNavigatorAny = (Stack as any).Navigator as AnyComponent;

// Main app content (Home screen with header and side menu)
function AppContent() {
  const [menuVisible, setMenuVisible] = React.useState(false);

  return (
    <>
      <Header onMenuPress={() => setMenuVisible(true)} />
      <View style={styles.content}>
        <HomeScreen />
      </View>
      <SideMenu visible={menuVisible} onClose={() => setMenuVisible(false)} />
    </>
  );
}

// Home screen wrapper with header and side menu
function HomeScreenWrapper() {
  const [menuVisible, setMenuVisible] = React.useState(false);

  return (
    <>
      <Header onMenuPress={() => setMenuVisible(true)} />
      <View style={styles.content}>
        <HomeScreen />
      </View>
      <SideMenu visible={menuVisible} onClose={() => setMenuVisible(false)} />
    </>
  );
}

export default function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    // Check if user is already authenticated
    const checkAuthStatus = async () => {
      try {
        // Check if we have a valid token
        const authenticated = apiService.isAuthenticated();
        setIsAuthenticated(authenticated);
      } catch (error) {
        console.log('Error checking auth status:', error);
      } finally {
        setIsLoading(false);
      }
    };

    checkAuthStatus();

    // Set up an interval to check authentication status periodically
    const authCheckInterval = setInterval(() => {
      const authenticated = apiService.isAuthenticated();
      setIsAuthenticated(authenticated);
    }, 1000); // Check every second

    return () => clearInterval(authCheckInterval);
  }, []);

  if (isLoading) {
    return (
      <SafeAreaView style={styles.root}>
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
          <ActivityIndicator size="large" color="#0066CC" />
        </View>
      </SafeAreaView>
    );
  }

  return (
    <UserProvider>
      <MessageProvider>
        <NavigationContainerAny>
          <View style={styles.root}>
            <StackNavigatorAny
              initialRouteName="Home"
              screenOptions={{
                headerShown: true // Enable header for main navigation
              }}
            >
              <Stack.Screen
                name="Home"
                component={HomeScreenWrapper}
                options={{ headerShown: false }}
              />
              <Stack.Screen name="MainTabs" component={MainTabNavigator} />
              <Stack.Screen name="Login" component={LoginScreen} />
              <Stack.Screen name="Signup" component={SignupScreen} />

              {/* 기타 설정 및 관리 화면들 */}
              <Stack.Screen name="AlarmManagement" component={AlarmManagement} />

              <Stack.Screen name="RegistrationPersonal" component={RegistrationPersonal} />
              <Stack.Screen name="PersonalRegistrationEdit" component={PersonalRegistrationEdit} />
              <Stack.Screen name="RegistrationCompany" component={RegistrationCompany} />
              <Stack.Screen name="CompanyRegistrationEdit" component={CompanyRegistrationEdit} />

              <Stack.Screen
                name="InputExpertRecruitment"
                component={InputExpertRecruitment}
              />
              <Stack.Screen
                name="InputExpertProfessional"
                component={InputExpertProfessional}
              />
              <Stack.Screen
                name="InputEducationRegistration"
                component={InputEducationRegistration}
              />

              <Stack.Screen
                name="CertAudRegistration"
                component={CertAudRegistration}
              />
              <Stack.Screen
                name="CertAudResult"
                component={CertAudResult}
              />
              {/* 일정관리 화면 */}
              <Stack.Screen
                name="ScheduleManager"
                component={ScheduleManager}
              />
              {/* 북마크(개인) 화면 */}
              <Stack.Screen
                name="BookmarkPersonal"
                component={BookmarkPersonal}
              />
              {/* 북마크(기업) 화면 */}
              <Stack.Screen
                name="BookmarkCorporate"
                component={BookmarkCorporate}
              />

              {/* 새로운 화면들 */}
              <Stack.Screen
                name="CertificationTypes"
                component={CertificationTypes}
              />
              <Stack.Screen
                name="SuccessCases"
                component={SuccessCases}
              />
              <Stack.Screen
                name="PaymentManagementCorporate"
                component={PaymentManagementCorporate}
              />
              <Stack.Screen
                name="PaymentManagementPersonal"
                component={PaymentManagementPersonal}
              />
              <Stack.Screen
                name="Settings"
                component={Settings}
              />
              <Stack.Screen
                name="MyPage"
                component={MyPagePerson}
              />

              <Stack.Screen
                name="MyPageCorperation"
                component={MyPageCorperation}
              />

              <Stack.Screen
                name="QA_Answers"
                component={QA_Answers}
              />
              <Stack.Screen
                name="AnnounceManagement"
                component={AnnounceManagement}
              />
              <Stack.Screen
                name="BannerManagement"
                component={BannerManagement}
              />
              <Stack.Screen
                name="AdminManagement"
                component={AdminManagement}
              />

              <Stack.Screen
                name="ShoppingCartCorp"
                component={ShoppingCartCorp}
              />
              <Stack.Screen
                name="ShoppingCartPerson"
                component={ShoppingCartPerson}
              />
            </StackNavigatorAny>
            <StatusBar style="auto" />
          </View>
        </NavigationContainerAny>
      </MessageProvider>
    </UserProvider>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: '#fff',
  },
  content: {
    flex: 1,
  },
});
