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

// 메뉴 화면들
import { PersonalRegistration } from './screens/menu/PersonalRegistration';
import  CompanyRegistration from './screens/menu/CompanyRegistration';

import ExpertRecruitment from './screens/menu/ExpertRecruitment';
import ExpertProfessional from './screens/menu/ExpertProfessional';
import EducationRegistration from './screens/menu/EducationRegistration';

import ExpertRecruitmentList from './screens/menu/ExpertRecruitmentList';
import ExpertProfessionalDetail from './screens/menu/ExpertProfessionalDetail';
import EducationList from './screens/menu/EducationList';

// Create a native stack navigator
const Stack = createNativeStackNavigator();

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
        <NavigationContainer>
          <SafeAreaView style={styles.root}>
            <Stack.Navigator 
              initialRouteName="Home"
              screenOptions={{ 
                headerShown: false // We're using our custom header
              }}
            >
              <Stack.Screen name="Home" component={HomeScreenWrapper} />
              <Stack.Screen name="Main" component={AppContent} />
              <Stack.Screen name="Login" component={LoginScreen} />
              <Stack.Screen name="Signup" component={SignupScreen} />
              <Stack.Screen name="PersonalRegistration" component={PersonalRegistration} />
              <Stack.Screen name="CompanyRegistration"
                component={CompanyRegistration}
              />
              <Stack.Screen
                name="ExpertRecruitment"
                component={ExpertRecruitment}
              />
              <Stack.Screen
                name="ExpertProfessional"
                component={ExpertProfessional}
              />
              <Stack.Screen
                name="EducationRegistration"
                component={EducationRegistration}
              />

              <Stack.Screen
                name="ExpertRecruitmentList"
                component={ExpertRecruitmentList}
              />
              <Stack.Screen
                name="ExpertProfessionalDetail"
                component={ExpertProfessionalDetail}
              />
              <Stack.Screen
                name="EducationList"
                component={EducationList}
              />
            </Stack.Navigator>
            <StatusBar style="auto" />
          </SafeAreaView>
        </NavigationContainer>
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