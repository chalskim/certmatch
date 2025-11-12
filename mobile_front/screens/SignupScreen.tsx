import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, ScrollView, Alert, Modal, ActivityIndicator } from 'react-native';
import { styles } from './styles/styles';
import { FontAwesome5 } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { apiService, type RegisterData } from '../services/apiService';
import { useAlert, useToast } from '../hooks/useMessage';
import { validateEmail, validateEmailRealtime } from '../utils/validation';

type RootStackParamList = {
  Home: undefined;
  Main: undefined;
  Login: undefined;
  Signup: undefined;
};

type NavigationProp = NativeStackNavigationProp<RootStackParamList>;

export const SignupScreen = () => {
  const navigation = useNavigation<NavigationProp>();
  const alert = useAlert();
  const toast = useToast();
  const [memberType, setMemberType] = useState<'individual' | 'company' | null>(null);
  const [name, setName] = useState('');
  const [companyName, setCompanyName] = useState('');
  const [businessNumber, setBusinessNumber] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [termsAll, setTermsAll] = useState(false);
  const [termsService, setTermsService] = useState(false);
  const [termsPrivacy, setTermsPrivacy] = useState(false);
  const [termsMarketing, setTermsMarketing] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [currentSocialPlatform, setCurrentSocialPlatform] = useState<string | null>(null);
  const [modalMemberType, setModalMemberType] = useState<'individual' | 'company' | null>(null);
  const [loading, setLoading] = useState(false);
  const [emailError, setEmailError] = useState<string | null>(null);

  // Business Number Format
  const formatBusinessNumber = (value: string) => {
    const numbers = value.replace(/[^0-9]/g, '');
    let formatted = '';
    
    if (numbers.length > 0) {
      if (numbers.length <= 3) {
        formatted = numbers;
      } else if (numbers.length <= 5) {
        formatted = numbers.slice(0, 3) + '-' + numbers.slice(3);
      } else {
        formatted = numbers.slice(0, 3) + '-' + numbers.slice(3, 5) + '-' + numbers.slice(5, 10);
      }
    }
    
    return formatted;
  };

  const handleBusinessNumberChange = (text: string) => {
    const formatted = formatBusinessNumber(text);
    setBusinessNumber(formatted);
  };

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

  // Password Strength Checker
  const getPasswordStrength = (pwd: string) => {
    if (pwd.length === 0) return 0;
    
    let strength = 0;
    
    // Length check
    if (pwd.length >= 8) strength++;
    if (pwd.length >= 12) strength++;
    
    // Complexity checks
    if (/[a-z]/.test(pwd) && /[A-Z]/.test(pwd)) strength++;
    if (/[0-9]/.test(pwd)) strength++;
    if (/[^a-zA-Z0-9]/.test(pwd)) strength++;
    
    return strength;
  };

  const passwordStrength = getPasswordStrength(password);

  // Terms All Checkbox
  const handleTermsAllChange = () => {
    const newValue = !termsAll;
    setTermsAll(newValue);
    setTermsService(newValue);
    setTermsPrivacy(newValue);
    setTermsMarketing(newValue);
  };

  // Individual Terms Checkboxes
  const handleIndividualTermChange = (term: 'service' | 'privacy' | 'marketing') => {
    if (term === 'service') {
      setTermsService(!termsService);
    } else if (term === 'privacy') {
      setTermsPrivacy(!termsPrivacy);
    } else {
      setTermsMarketing(!termsMarketing);
    }
    
    // Update "all" checkbox
    const allChecked = (!termsService && term === 'service') || 
                      (!termsPrivacy && term === 'privacy') || 
                      (!termsMarketing && term === 'marketing') ||
                      (termsService && term !== 'service') ||
                      (termsPrivacy && term !== 'privacy') ||
                      (termsMarketing && term !== 'marketing');
    setTermsAll(allChecked && termsService && termsPrivacy);
  };

  // Form Validation
  const handleSignup = async () => {
    // Reset validation states would go here
    
    let isValid = true;
    let errorMessage = '';
    
    // Member type validation
    if (!memberType) {
      errorMessage = '회원유형을 선택해주세요.';
      isValid = false;
    }
    
    // Name validation
    if (isValid && name.length < 2) {
      errorMessage = '이름을 입력해주세요.';
      isValid = false;
    }
    
    // Company name validation (if company)
    if (isValid && memberType === 'company' && companyName.length < 2) {
      errorMessage = '회사/기관명을 입력해주세요.';
      isValid = false;
    }
    
    // Email validation
    if (isValid) {
      const emailValidation = validateEmail(email);
      if (!emailValidation.isValid) {
        errorMessage = emailValidation.message || '유효한 이메일 주소를 입력해주세요.';
        isValid = false;
        setEmailError(emailValidation.message || null);
      }
    }
    
    // Password validation
    if (isValid && password.length < 8) {
      errorMessage = '비밀번호는 최소 8자 이상이어야 합니다.';
      isValid = false;
    }
    
    // Confirm password validation
    if (isValid && password !== confirmPassword) {
      errorMessage = '비밀번호가 일치하지 않습니다.';
      isValid = false;
    }
    
    // Terms validation
    if (isValid && (!termsService || !termsPrivacy)) {
      errorMessage = '필수 약관에 동의해주세요.';
      isValid = false;
    }
    
    if (!isValid) {
      alert.error('입력 오류', errorMessage);
      return;
    }
    
    // Show loading state
    setLoading(true);
    
    try {
      // Prepare registration data
      const registerData: RegisterData = {
        email,
        password,
        name: memberType === 'company' ? companyName : name,
        role: memberType === 'company' ? 'company' : 'consultant'
      };
      
      // Add phone number if provided (using business number for companies)
      if (memberType === 'company' && businessNumber) {
        registerData.phone = businessNumber;
      }
      
      console.log('Attempting registration with data:', registerData);
      
      // Register user with the API
      const response = await apiService.register(registerData);
      
      console.log('Registration successful:', response);
      
      // 성공 처리: 토스트로 알림 후 즉시 로그인 화면으로 이동
      // 모달 확인 없이 자동 이동을 원하셔서 replace로 스택을 대체합니다.
      toast.success('회원가입이 완료되었습니다! 로그인 화면으로 이동합니다.', 2500);
      // 뒤로가기로 회원가입 화면으로 돌아오지 않도록 replace 사용
      navigation.replace('Login');
    } catch (error: any) {
      console.log('Registration error:', error);
      
      // Provide more specific error messages
      let userMessage = error.message || '회원가입 중 오류가 발생했습니다.';
      
      // Handle common network errors
      if (userMessage.includes('connect')) {
        userMessage = '서버에 연결할 수 없습니다. 네트워크 연결을 확인하거나 나중에 다시 시도해주세요.';
      } else if (userMessage.includes('CORS') || userMessage.includes('fetch')) {
        userMessage = '서버 연결에 문제가 발생했습니다. 잠시 후 다시 시도해주세요.';
      } else if (error.message === 'User already exists' || userMessage.includes('이미 등록된 이메일')) {
        userMessage = '이미 등록된 이메일 주소입니다. 다른 이메일을 사용해주세요.';
      }
      
      Alert.alert('오류', userMessage);
    } finally {
      setLoading(false);
    }
  };

  const openSocialModal = (platform: string) => {
    setCurrentSocialPlatform(platform);
    setModalMemberType(null);
    setModalVisible(true);
  };

  const confirmSocialLogin = () => {
    if (modalMemberType && currentSocialPlatform) {
      const platformName = currentSocialPlatform.charAt(0).toUpperCase() + currentSocialPlatform.slice(1);
      const typeText = modalMemberType === 'individual' ? '개인' : '기업';
      
      Alert.alert('성공', `${platformName}로 ${typeText} 회원가입을 진행합니다.`);
      
      // Close modal
      setModalVisible(false);
      setCurrentSocialPlatform(null);
      setModalMemberType(null);
    }
  };

  const getSocialIcon = (platform: string) => {
    switch(platform) {
      case 'google': return 'google';
      case 'naver': return 'comment-dots';
      case 'kakao': return 'comment';
      default: return 'user';
    }
  };

  const getSocialIconColor = (platform: string) => {
    switch(platform) {
      case 'google': return '#ea4335';
      case 'naver': return '#00c73c';
      case 'kakao': return '#3c1e1e';
      default: return '#333';
    }
  };

  return (
    <ScrollView contentContainerStyle={[styles.container, { padding: 20, backgroundColor: '#fff' }]}>
      {/* Logo */}
      <View style={{ alignItems: 'center', marginBottom: 30, marginTop: 30 }}>
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
        <Text style={{ fontSize: 24, fontWeight: 'bold', color: '#333', marginBottom: 8 }}>CertLine</Text>
        <Text style={{ fontSize: 14, color: '#666', textAlign: 'center' }}>
          인증 프로젝트 매칭 플랫폼에 오신 것을 환영합니다
        </Text>
      </View>

      {/* Member Type Selection */}
      <View style={{ marginBottom: 20 }}>
        <Text style={{ color: '#333', fontSize: 16, fontWeight: '600', marginBottom: 15 }}>
          회원유형을 선택해주세요
        </Text>
        <View style={{ flexDirection: 'row', gap: 15 }}>
          <TouchableOpacity
            style={[
              {
                flex: 1,
                padding: 20,
                borderWidth: 2,
                borderRadius: 12,
                backgroundColor: '#f9fafb',
                alignItems: 'center',
              },
              memberType === 'individual' ? {
                borderColor: '#667eea',
                backgroundColor: 'rgba(102, 126, 234, 0.1)',
              } : {
                borderColor: '#e5e7eb',
              }
            ]}
            onPress={() => setMemberType('individual')}
          >
            <FontAwesome5 name="user" size={24} color="#667eea" style={{ marginBottom: 10 }} />
            <Text style={{ fontWeight: '600', color: '#374151', marginBottom: 5 }}>개인</Text>
            <Text style={{ fontSize: 12, color: '#6b7280' }}>프리랜서, 개인 전문가</Text>
          </TouchableOpacity>
          
          <TouchableOpacity
            style={[
              {
                flex: 1,
                padding: 20,
                borderWidth: 2,
                borderRadius: 12,
                backgroundColor: '#f9fafb',
                alignItems: 'center',
              },
              memberType === 'company' ? {
                borderColor: '#667eea',
                backgroundColor: 'rgba(102, 126, 234, 0.1)',
              } : {
                borderColor: '#e5e7eb',
              }
            ]}
            onPress={() => setMemberType('company')}
          >
            <FontAwesome5 name="building" size={24} color="#667eea" style={{ marginBottom: 10 }} />
            <Text style={{ fontWeight: '600', color: '#374151', marginBottom: 5 }}>기업</Text>
            <Text style={{ fontSize: 12, color: '#6b7280' }}>기업, 단체, 기관</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Sign Up Form */}
      <View>
        {/* Name Input */}
        <View style={{ marginBottom: 15 }}>
          <TextInput
            style={styles.searchInput}
            placeholder={memberType === 'company' ? "담당자 이름" : "이름"}
            value={name}
            onChangeText={setName}
          />
        </View>

        {/* Company Name (Conditional) */}
        {memberType === 'company' && (
          <View style={{ marginBottom: 15 }}>
            <TextInput
              style={styles.searchInput}
              placeholder="회사/기관명"
              value={companyName}
              onChangeText={setCompanyName}
            />
          </View>
        )}

        {/* Business Number (Conditional) */}
        {memberType === 'company' && (
          <View style={{ marginBottom: 15 }}>
            <TextInput
              style={styles.searchInput}
              placeholder="사업자등록번호 (선택)"
              value={businessNumber}
              onChangeText={handleBusinessNumberChange}
              maxLength={12}
            />
          </View>
        )}

        {/* Email Input */}
        <View style={{ marginBottom: 15 }}>
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
        <View style={{ marginBottom: 15 }}>
          <View style={{ position: 'relative' }}>
            <TextInput
              style={[styles.searchInput, { paddingRight: 40 }]}
              placeholder="비밀번호 (8자 이상)"
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
          
          {/* Password Strength */}
          <View style={{
            height: 4,
            borderRadius: 2,
            backgroundColor: '#e5e7eb',
            marginTop: 8,
            overflow: 'hidden',
          }}>
            <View style={{
              height: '100%',
              width: passwordStrength <= 2 ? '33%' : passwordStrength <= 4 ? '66%' : '100%',
              backgroundColor: passwordStrength <= 2 ? '#ef4444' : passwordStrength <= 4 ? '#f59e0b' : '#10b981',
              borderRadius: 2,
            }} />
          </View>
        </View>

        {/* Confirm Password Input */}
        <View style={{ marginBottom: 15 }}>
          <View style={{ position: 'relative' }}>
            <TextInput
              style={[styles.searchInput, { paddingRight: 40 }]}
              placeholder="비밀번호 확인"
              value={confirmPassword}
              onChangeText={setConfirmPassword}
              secureTextEntry={!showConfirmPassword}
            />
            <TouchableOpacity
              style={{ position: 'absolute', right: 12, top: 15 }}
              onPress={() => setShowConfirmPassword(!showConfirmPassword)}
            >
              <FontAwesome5 name={showConfirmPassword ? "eye-slash" : "eye"} size={16} color="#999" />
            </TouchableOpacity>
          </View>
        </View>

        {/* Terms Agreement */}
        <View style={{ marginBottom: 20 }}>
          <TouchableOpacity
            style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 15 }}
            onPress={handleTermsAllChange}
          >
            <View style={{
              width: 20,
              height: 20,
              borderRadius: 4,
              borderWidth: 2,
              borderColor: termsAll ? '#667eea' : '#ddd',
              backgroundColor: termsAll ? '#667eea' : '#fff',
              alignItems: 'center',
              justifyContent: 'center',
              marginRight: 8,
            }}>
              {termsAll && <FontAwesome5 name="check" size={10} color="#fff" />}
            </View>
            <Text style={{ color: '#666', fontSize: 14 }}>모든 약관에 동의합니다</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 10 }}
            onPress={() => handleIndividualTermChange('service')}
          >
            <View style={{
              width: 20,
              height: 20,
              borderRadius: 4,
              borderWidth: 2,
              borderColor: termsService ? '#667eea' : '#ddd',
              backgroundColor: termsService ? '#667eea' : '#fff',
              alignItems: 'center',
              justifyContent: 'center',
              marginRight: 8,
            }}>
              {termsService && <FontAwesome5 name="check" size={10} color="#fff" />}
            </View>
            <Text style={{ color: '#666', fontSize: 14 }}>
              <Text style={{ textDecorationLine: 'underline', color: '#667eea' }}>서비스 이용약관</Text>
              에 동의합니다 (필수)
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 10 }}
            onPress={() => handleIndividualTermChange('privacy')}
          >
            <View style={{
              width: 20,
              height: 20,
              borderRadius: 4,
              borderWidth: 2,
              borderColor: termsPrivacy ? '#667eea' : '#ddd',
              backgroundColor: termsPrivacy ? '#667eea' : '#fff',
              alignItems: 'center',
              justifyContent: 'center',
              marginRight: 8,
            }}>
              {termsPrivacy && <FontAwesome5 name="check" size={10} color="#fff" />}
            </View>
            <Text style={{ color: '#666', fontSize: 14 }}>
              <Text style={{ textDecorationLine: 'underline', color: '#667eea' }}>개인정보 처리방침</Text>
              에 동의합니다 (필수)
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={{ flexDirection: 'row', alignItems: 'center' }}
            onPress={() => handleIndividualTermChange('marketing')}
          >
            <View style={{
              width: 20,
              height: 20,
              borderRadius: 4,
              borderWidth: 2,
              borderColor: termsMarketing ? '#667eea' : '#ddd',
              backgroundColor: termsMarketing ? '#667eea' : '#fff',
              alignItems: 'center',
              justifyContent: 'center',
              marginRight: 8,
            }}>
              {termsMarketing && <FontAwesome5 name="check" size={10} color="#fff" />}
            </View>
            <Text style={{ color: '#666', fontSize: 14 }}>
              마케팅 정보 수신에 동의합니다 (선택)
            </Text>
          </TouchableOpacity>
        </View>

        {/* Submit Button */}
        <TouchableOpacity
          style={[styles.searchButton, { marginBottom: 25 }]}
          onPress={handleSignup}
          disabled={loading}
        >
          {loading ? (
            <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
              <ActivityIndicator color="#fff" size="small" style={{ marginRight: 10 }} />
              <Text style={styles.searchButtonText}>회원가입 중...</Text>
            </View>
          ) : (
            <Text style={styles.searchButtonText}>회원가입</Text>
          )}
        </TouchableOpacity>

        {/* Divider */}
        <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 20 }}>
          <View style={{ flex: 1, height: 1, backgroundColor: '#eee' }} />
          <Text style={{ paddingHorizontal: 10, color: '#999', fontSize: 14 }}>또는</Text>
          <View style={{ flex: 1, height: 1, backgroundColor: '#eee' }} />
        </View>

        {/* Social Sign Up */}
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
            onPress={() => openSocialModal('google')}
          >
            <FontAwesome5 name="google" size={16} color="#fff" style={{ marginRight: 8 }} />
            <Text style={{ color: '#fff', fontWeight: '600' }}>Google로 가입하기</Text>
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
            onPress={() => openSocialModal('naver')}
          >
            <FontAwesome5 name="comment-dots" size={16} color="#fff" style={{ marginRight: 8 }} />
            <Text style={{ color: '#fff', fontWeight: '600' }}>Naver로 가입하기</Text>
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
            onPress={() => openSocialModal('kakao')}
          >
            <FontAwesome5 name="comment" size={16} color="#3c1e1e" style={{ marginRight: 8 }} />
            <Text style={{ color: '#3c1e1e', fontWeight: '600' }}>Kakao로 가입하기</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Login Link */}
      <View style={{ alignItems: 'center', borderTopWidth: 1, borderTopColor: '#eee', paddingTop: 20 }}>
        <Text style={{ color: '#666', fontSize: 14, marginBottom: 10 }}>
          이미 회원이신가요?
        </Text>
        <TouchableOpacity onPress={() => navigation.navigate('Login')}>
          <Text style={{ color: '#667eea', fontWeight: '600', fontSize: 14, textDecorationLine: 'underline' }}>
            로그인
          </Text>
        </TouchableOpacity>
      </View>

      {/* Social Login Modal */}
      <Modal
        animationType="fade"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={{
          flex: 1,
          backgroundColor: 'rgba(0,0,0,0.5)',
          alignItems: 'center',
          justifyContent: 'center',
          padding: 20,
        }}>
          <View style={{
            backgroundColor: '#fff',
            borderRadius: 16,
            padding: 25,
            width: '100%',
            maxWidth: 400,
          }}>
            <View style={{ alignItems: 'center', marginBottom: 25 }}>
              <FontAwesome5 
                name={getSocialIcon(currentSocialPlatform || '')} 
                size={40} 
                color={getSocialIconColor(currentSocialPlatform || '')} 
                style={{ marginBottom: 15 }} 
              />
              <Text style={{ fontSize: 20, fontWeight: '600', color: '#333', marginBottom: 5 }}>
                {currentSocialPlatform === 'google' && 'Google 계정으로 가입'}
                {currentSocialPlatform === 'naver' && 'Naver 계정으로 가입'}
                {currentSocialPlatform === 'kakao' && 'Kakao 계정으로 가입'}
              </Text>
              <Text style={{ color: '#666', fontSize: 14 }}>회원유형을 선택해주세요</Text>
            </View>

            <View style={{ flexDirection: 'row', gap: 15, marginBottom: 25 }}>
              <TouchableOpacity
                style={[
                  {
                    flex: 1,
                    padding: 20,
                    borderWidth: 2,
                    borderRadius: 12,
                    backgroundColor: '#f9fafb',
                    alignItems: 'center',
                  },
                  modalMemberType === 'individual' ? {
                    borderColor: '#667eea',
                    backgroundColor: 'rgba(102, 126, 234, 0.1)',
                  } : {
                    borderColor: '#e5e7eb',
                  }
                ]}
                onPress={() => setModalMemberType('individual')}
              >
                <FontAwesome5 name="user" size={24} color="#667eea" style={{ marginBottom: 10 }} />
                <Text style={{ fontWeight: '600', color: '#374151', marginBottom: 5 }}>개인</Text>
                <Text style={{ fontSize: 12, color: '#6b7280' }}>프리랜서, 개인 전문가</Text>
              </TouchableOpacity>
              
              <TouchableOpacity
                style={[
                  {
                    flex: 1,
                    padding: 20,
                    borderWidth: 2,
                    borderRadius: 12,
                    backgroundColor: '#f9fafb',
                    alignItems: 'center',
                  },
                  modalMemberType === 'company' ? {
                    borderColor: '#667eea',
                    backgroundColor: 'rgba(102, 126, 234, 0.1)',
                  } : {
                    borderColor: '#e5e7eb',
                  }
                ]}
                onPress={() => setModalMemberType('company')}
              >
                <FontAwesome5 name="building" size={24} color="#667eea" style={{ marginBottom: 10 }} />
                <Text style={{ fontWeight: '600', color: '#374151', marginBottom: 5 }}>기업</Text>
                <Text style={{ fontSize: 12, color: '#6b7280' }}>기업, 단체, 기관</Text>
              </TouchableOpacity>
            </View>

            <View style={{ flexDirection: 'row', gap: 10 }}>
              <TouchableOpacity
                style={{
                  flex: 1,
                  padding: 12,
                  borderRadius: 8,
                  backgroundColor: '#f3f4f6',
                  alignItems: 'center',
                }}
                onPress={() => setModalVisible(false)}
              >
                <Text style={{ color: '#666', fontWeight: '600' }}>취소</Text>
              </TouchableOpacity>
              
              <TouchableOpacity
                style={{
                  flex: 1,
                  padding: 12,
                  borderRadius: 8,
                  backgroundColor: modalMemberType ? '#667eea' : '#ccc',
                  alignItems: 'center',
                }}
                onPress={confirmSocialLogin}
                disabled={!modalMemberType}
              >
                <Text style={{ color: '#fff', fontWeight: '600' }}>확인</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </ScrollView>
  );
};