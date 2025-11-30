import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, ScrollView, Alert, ActivityIndicator, Platform } from 'react-native';
import { styles } from './styles/styles';
import { FontAwesome5 } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { apiService, type LoginData } from '../services/apiService';
import { useAlert } from '../hooks/useMessage';
import { validateEmail, validateEmailRealtime } from '../utils/validation';
import { useUser } from '../contexts/UserContext';

type RootStackParamList = {
  Home: undefined;
  Main: undefined;
  Login: undefined;
  Signup: undefined;
};

type NavigationProp = NativeStackNavigationProp<RootStackParamList>;

export const LoginScreen: React.FC = () => {
  const navigation = useNavigation<NavigationProp>();
  const alert = useAlert();
  const { login } = useUser();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [emailError, setEmailError] = useState<string | null>(null);

  const handleEmailChange = (text: string) => {
    setEmail(text);
    
    // 실시간 유효성 검사
    const realtimeValidation = validateEmailRealtime(text);
    if (!realtimeValidation.isValid) {
      setEmailError(realtimeValidation.message || null);
    } else {
      setEmailError(null);
    }
  };

  const handleLogin = async () => {
    // Basic validation
    if (!email || !password) {
      alert.error('입력 오류', '이메일과 비밀번호를 입력해주세요.');
      return;
    }

    // Email validation using utility function
    const emailValidation = validateEmail(email);
    if (!emailValidation.isValid) {
      alert.error('이메일 오류', emailValidation.message || '유효한 이메일 주소를 입력해주세요.');
      setEmailError(emailValidation.message || null);
      return;
    }

    // Password validation
    if (password.length < 8) {
      alert.error('비밀번호 오류', '비밀번호는 최소 8자 이상이어야 합니다.');
      return;
    }

    // Show loading state
    setIsLoading(true);

    try {
      // Prepare login data
      const loginData: LoginData = {
        email,
        password
      };

      // Login user with the API and save user info to context
      const response = await apiService.login(loginData);
      
      // Save user info to context
      await login(response.user);

      // Success - Navigate directly to home screen without alert
      navigation.navigate('Home');
    } catch (error: any) {
      console.log('Login error:', error);
      
      // 새로운 메시지 시스템 사용
      if (error.message.includes('네트워크') || error.message.includes('연결')) {
        alert.error('연결 오류', '네트워크 연결을 확인해주세요.');
      } else {
        alert.error('로그인 실패', error.message || '이메일 또는 비밀번호가 올바르지 않습니다.');
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handleSocialLogin = (platform: string) => {
    console.log(`Login with ${platform}`);
    
    switch(platform) {
      case 'google':
        Alert.alert('Google 로그인', 'Google 로그인 페이지로 이동합니다.');
        break;
      case 'naver':
        Alert.alert('Naver 로그인', 'Naver 로그인 페이지로 이동합니다.');
        break;
      case 'kakao':
        Alert.alert('Kakao 로그인', 'Kakao 로그인 페이지로 이동합니다.');
        break;
      default:
        console.log('Unknown platform');
    }
  };

  return (
    <ScrollView contentContainerStyle={[styles.container, { padding: 20, backgroundColor: '#fff' }]}>
      {/* Logo */}
      <View style={{ alignItems: 'center', marginBottom: 40, marginTop: 60 }}>
        <View style={{
          width: 80,
          height: 80,
          borderRadius: 40,
          backgroundColor: '#667eea',
          alignItems: 'center',
          justifyContent: 'center',
          marginBottom: 16,
          shadowColor: '#000',
          shadowOffset: { width: 0, height: 4 },
          shadowOpacity: 0.1,
          shadowRadius: 10,
          elevation: 5,
        }}>
          <FontAwesome5 name="shield-alt" size={30} color="#fff" />
        </View>
        <Text style={{ fontSize: 24, fontWeight: 'bold', color: '#333', marginBottom: 8 }}>SuperSlice</Text>
        <Text style={{ fontSize: 14, color: '#666' }}>인증 프로젝트 매칭 플랫폼</Text>
      </View>

      {/* Login Form */}
      <View style={{ marginBottom: 30 }}>
        {/* Email Input */}
        <View style={{ marginBottom: 20 }}>
          <TextInput
            style={[styles.searchInput, emailError ? { borderColor: '#ff4444', borderWidth: 1 } : {}]}
            placeholder="이메일 주소"
            value={email}
            onChangeText={handleEmailChange}
            keyboardType="email-address"
            autoCapitalize="none"
          />
          {emailError && (
            <Text style={{ color: '#ff4444', fontSize: 12, marginTop: 5, marginLeft: 5 }}>
              {emailError}
            </Text>
          )}
        </View>

        {/* Password Input */}
        <View style={{ marginBottom: 20, position: 'relative' }}>
          <TextInput
            style={[styles.searchInput, { paddingRight: 40 }]}
            placeholder="비밀번호"
            value={password}
            onChangeText={setPassword}
            secureTextEntry={!showPassword}
          />
          <TouchableOpacity
            style={{ position: 'absolute', right: 12, top: 15 }}
            onPress={() => setShowPassword(!showPassword)}
          >
            <FontAwesome5 name={showPassword ? "eye-slash" : "eye"} size={16} color="#999" />
          </TouchableOpacity>
        </View>

        {/* Remember Me */}
        <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 20 }}>
          <TouchableOpacity
            style={{ flexDirection: 'row', alignItems: 'center' }}
            onPress={() => setRememberMe(!rememberMe)}
          >
            <View style={{
              width: 20,
              height: 20,
              borderRadius: 4,
              borderWidth: 2,
              borderColor: rememberMe ? '#667eea' : '#ddd',
              backgroundColor: rememberMe ? '#667eea' : '#fff',
              alignItems: 'center',
              justifyContent: 'center',
              marginRight: 8,
            }}>
              {rememberMe && <FontAwesome5 name="check" size={10} color="#fff" />}
            </View>
            <Text style={{ color: '#666', fontSize: 14 }}>자동 로그인</Text>
          </TouchableOpacity>
        </View>

        {/* Submit Button */}
        <TouchableOpacity
          style={[styles.searchButton, { marginBottom: 20 }]}
          onPress={handleLogin}
          disabled={isLoading}
      >
        {isLoading ? (
            <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
              <ActivityIndicator color="#fff" size="small" style={{ marginRight: 10 }} />
              <Text style={styles.searchButtonText}>로그인 중...</Text>
            </View>
          ) : (
            <Text style={styles.searchButtonText}>로그인</Text>
          )}
        </TouchableOpacity>

        {/* Divider */}
        <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 20 }}>
          <View style={{ flex: 1, height: 1, backgroundColor: '#eee' }} />
          <Text style={{ paddingHorizontal: 10, color: '#999', fontSize: 14 }}>또는</Text>
          <View style={{ flex: 1, height: 1, backgroundColor: '#eee' }} />
        </View>

        {/* Social Login */}
        <View style={{ marginBottom: 20 }}>
          <TouchableOpacity
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'center',
              padding: 12,
              borderRadius: 8,
              backgroundColor: '#ea4335',
              marginBottom: 10,
            }}
            onPress={() => handleSocialLogin('google')}
          >
            <FontAwesome5 name="google" size={16} color="#fff" style={{ marginRight: 8 }} />
            <Text style={{ color: '#fff', fontWeight: '600' }}>Google로 로그인</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'center',
              padding: 12,
              borderRadius: 8,
              backgroundColor: '#00c73c',
              marginBottom: 10,
            }}
            onPress={() => handleSocialLogin('naver')}
          >
            <FontAwesome5 name="comment-dots" size={16} color="#fff" style={{ marginRight: 8 }} />
            <Text style={{ color: '#fff', fontWeight: '600' }}>Naver로 로그인</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'center',
              padding: 12,
              borderRadius: 8,
              backgroundColor: '#fee500',
            }}
            onPress={() => handleSocialLogin('kakao')}
          >
            <FontAwesome5 name="comment" size={16} color="#3c1e1e" style={{ marginRight: 8 }} />
            <Text style={{ color: '#3c1e1e', fontWeight: '600' }}>Kakao로 로그인</Text>
          </TouchableOpacity>
        </View>

        {/* Forgot Password */}
        <TouchableOpacity style={{ alignItems: 'center' }}>
          <Text style={{ color: '#666', fontSize: 14, textDecorationLine: 'underline' }}>
            비밀번호를 잊어버렸나요?
          </Text>
        </TouchableOpacity>
      </View>

      {/* Sign Up Link */}
      <View style={{ alignItems: 'center', borderTopWidth: 1, borderTopColor: '#eee', paddingTop: 20 }}>
        <Text style={{ color: '#666', fontSize: 14, marginBottom: 10 }}>
          아직 회원이 아니신가요?
        </Text>
        <TouchableOpacity onPress={() => navigation.navigate('Signup')}>
          <Text style={{ color: '#667eea', fontWeight: '600', fontSize: 14, textDecorationLine: 'underline' }}>
            회원가입
          </Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};
