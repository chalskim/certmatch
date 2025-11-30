import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, ScrollView, TouchableOpacity, Alert, KeyboardAvoidingView, Platform, Image, Modal, SafeAreaView, FlatList } from 'react-native';
import { FontAwesome5 } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import * as ImagePicker from 'expo-image-picker';
import * as DocumentPicker from 'expo-document-picker';

import { styles } from '../styles/menu/RegistrationPersonal';
// Ensure correct component path; fix any prior mistaken '../components/.SubformHeader'
import SubformHeader from '../components/SubformHeader';
import {
  PersonalRegistrationPayload,
  UserPersonal,
  UserPersonalExperience,
  UserPersonalCertificate,
  UserPersonalCode
} from '../../types/db/PersonalRegistration';

export const RegistrationPersonal: React.FC = () => {
  // navigate 타입 오류 방지: 제네릭을 any로 지정
  const navigation = useNavigation<any>();

  // Form state
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [experienceYears, setExperienceYears] = useState('');
  const [hourlyRate, setHourlyRate] = useState('');
  const [isNegotiable, setIsNegotiable] = useState(false);
  const [location, setLocation] = useState('');
  const [showLocationModal, setShowLocationModal] = useState(false);

  // 지역 데이터
  const locations = [
    '서울', '경기', '인천', '부산', '대구', '대전', '광주', '울산',
    '세종', '강원', '충북', '충남', '전북', '전남', '경북', '경남', '제주',
    '전국', '해외', '온라인'
  ];
  // Available specialties and countries
  const availableSpecialties = ['금융', '의료', '제조', 'IT', '공공', '유통', '교육', '물류', '환경', '식품', 'ISMS-P', 'ISMS', 'ISO 27001', 'ISO 27701', 'GS 인증', 'CPPG', 'CSAP', 'ESPM'];

  const [bio, setBio] = useState('');
  const [specialties, setSpecialties] = useState<string[]>([]);
  const [selectedSpecialties, setSelectedSpecialties] = useState<string[]>([]);
  const [selectedCountries, setSelectedCountries] = useState<string[]>([]);
  const [selectedActivities, setSelectedActivities] = useState<string[]>([]);
  const [experiences, setExperiences] = useState<Array<{ title: string, period: string, company: string, description: string }>>([]);
  const [certifications, setCertifications] = useState<Array<{ name: string, status: string, issueDate: string, expiryDate: string }>>([]);

  // 프로필 사진 (이력서용)
  const [profilePhoto, setProfilePhoto] = useState<{ uri: string; name?: string } | null>(null);

  // 서류 파일 상태
  const [resumeFile, setResumeFile] = useState<{ uri: string; name: string; size: number } | null>(null);
  const [certificationFiles, setCertificationFiles] = useState<{ uri: string; name: string; size: number }[]>([]);
  const [selfIntroductionFile, setSelfIntroductionFile] = useState<{ uri: string; name: string; size: number } | null>(null);

  // 프로필 완성도 계산 함수
  const calculateProfileCompletion = (): number => {
    let completion = 0;
    const totalFields = 12; // 총 평가 항목 수

    // 기본 정보 (4점)
    if (name.trim()) completion++;
    if (email.trim() && email.includes('@')) completion++;
    if (phone.trim() && phone.length >= 10) completion++;
    if (profilePhoto) completion++;

    // 전문가 정보 (4점)
    if (experienceYears.trim()) completion++;
    if (hourlyRate.trim() || isNegotiable) completion++;
    if (location.trim()) completion++;
    if (selectedSpecialties.length > 0) completion++;

    // 상세 정보 (2점)
    if (bio.trim() && bio.length >= 20) completion++;
    if (experiences.length > 0 && experiences.some(exp => exp.title.trim() && exp.company.trim())) completion++;

    // 서류 (2점)
    if (resumeFile) completion++;
    if (selfIntroductionFile || certificationFiles.length > 0) completion++;

    return Math.round((completion / totalFields) * 100);
  };

  const [profileCompletion, setProfileCompletion] = useState(calculateProfileCompletion());

  // 현재 프로필 완성도
  const profileCompletionPercentage = calculateProfileCompletion();

  // 완성도 실시간 업데이트
  useEffect(() => {
    const newCompletion = calculateProfileCompletion();
    setProfileCompletion(newCompletion);
  }, [
    name, email, phone, profilePhoto, experienceYears, hourlyRate, isNegotiable,
    location, selectedSpecialties, bio, experiences, resumeFile,
    selfIntroductionFile, certificationFiles
  ]);

  // Toggle specialty selection
  const toggleSpecialty = (specialty: string) => {
    if (selectedSpecialties.includes(specialty)) {
      setSelectedSpecialties(selectedSpecialties.filter(s => s !== specialty));
    } else {
      setSelectedSpecialties([...selectedSpecialties, specialty]);
    }
  };

  // Toggle country selection
  const toggleCountry = (country: string) => {
    if (selectedCountries.includes(country)) {
      setSelectedCountries(selectedCountries.filter(c => c !== country));
    } else {
      setSelectedCountries([...selectedCountries, country]);
    }
  };

  // Toggle activity selection
  const toggleActivity = (activity: string) => {
    if (selectedActivities.includes(activity)) {
      setSelectedActivities(selectedActivities.filter(a => a !== activity));
    } else {
      setSelectedActivities([...selectedActivities, activity]);
    }
  };

  // Add experience
  const addExperience = () => {
    setExperiences([...experiences, { title: '', period: '', company: '', description: '' }]);
  };

  // Remove experience
  const removeExperience = (index: number) => {
    const updatedExperiences = [...experiences];
    updatedExperiences.splice(index, 1);
    setExperiences(updatedExperiences);
  };

  // Update experience
  const updateExperience = (index: number, field: string, value: string) => {
    const updatedExperiences = [...experiences];
    updatedExperiences[index] = { ...updatedExperiences[index], [field]: value };
    setExperiences(updatedExperiences);
  };

  // Add certification
  const addCertification = () => {
    setCertifications([...certifications, { name: '', status: 'valid', issueDate: '', expiryDate: '' }]);
  };

  // Remove certification
  const removeCertification = (index: number) => {
    const updatedCertifications = [...certifications];
    updatedCertifications.splice(index, 1);
    setCertifications(updatedCertifications);
  };

  // Update certification
  const updateCertification = (index: number, field: string, value: string) => {
    const updatedCertifications = [...certifications];
    updatedCertifications[index] = { ...updatedCertifications[index], [field]: value };
    setCertifications(updatedCertifications);
  };

  // Handle form submission
  const handleSubmit = () => {
    // Basic validation
    if (!name || !email || !phone || !experienceYears || !hourlyRate || !location || !bio) {
      Alert.alert('필수 정보 누락', '모든 필수 정보를 입력해주세요.');
      return;
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      Alert.alert('이메일 형식 오류', '올바른 이메일 주소를 입력해주세요.');
      return;
    }

    // Experience years validation
    const years = parseInt(experienceYears);
    if (isNaN(years) || years < 0 || years > 50) {
      Alert.alert('경력년수 오류', '경력년수는 0-50 사이의 숫자를 입력해주세요.');
      return;
    }

    // Bio validation
    if (bio.length < 100) {
      Alert.alert('자기소개 오류', '자기소개는 최소 100자 이상 작성해주세요.');
      return;
    }

    // Specialty validation
    if (selectedSpecialties.length === 0) {
      Alert.alert('전문 분야 누락', '최소 1개 이상의 전문 분야를 선택해주세요.');
      return;
    }

    // DDL에 맞게 데이터 구성
    // DDL에 맞게 데이터 구성
    const personalData: PersonalRegistrationPayload = {
      // user_personal 테이블 데이터
      personal: {
        pers_name: name,
        pers_email: email,
        pers_phone: phone,
        pers_location: location,
        pers_bio: bio,
        pers_experience_years: years,
        pers_hourly_rate_raw: isNegotiable ? '협의' : `${hourlyRate}만원/시간`,
        pers_hourly_rate_min: isNegotiable ? undefined : parseInt(hourlyRate) * 10000, // 만원을 원으로 변환
        pers_hourly_rate_max: undefined,
        pers_hourly_rate_currency: 'KRW',
        pers_profile_state: 'draft' // 기본 상태
      },
      // user_personal_experience 테이블 데이터
      experiences: experiences.map((exp, index) => ({
        pexp_title: exp.title,
        pexp_company: exp.company,
        pexp_period_text: exp.period,
        pexp_description: exp.description,
        pexp_seq: index + 1
      })),
      // user_personal_certificate 테이블 데이터
      certificates: certifications.map((cert, index) => ({
        pcert_name: cert.name,
        pcert_status_gb: 'CERT_STATUS',
        pcert_status_key: cert.status,
        pcert_issue_date: cert.issueDate,
        pcert_expiry_date: cert.expiryDate,
        pcert_seq: index + 1
      })),
      // user_personal_code 테이블 데이터 (관심분야)
      specialtyCodes: selectedSpecialties.map((specialty, index) => ({
        pcode_gb: 'SPECIALTY',
        pcode_key: specialty,
        pcode_label: specialty,
        pcode_seq: index + 1
      })),
      // user_personal_code 테이블 데이터 (관심 국가)
      countryCodes: selectedCountries.map((country, index) => ({
        pcode_gb: 'COUNTRY',
        pcode_key: country,
        pcode_label: country,
        pcode_seq: index + 1
      })),
      // user_personal_code 테이블 데이터 (활동 유형)
      activityCodes: selectedActivities.map((activity, index) => ({
        pcode_gb: 'ACTIVITY',
        pcode_key: activity,
        pcode_label: activity,
        pcode_seq: index + 1
      })),
      // 파일 정보 (추가 데이터)
      files: {
        profilePhoto: profilePhoto ? {
          name: profilePhoto.name || 'profile_photo.jpg',
          uri: profilePhoto.uri,
          type: 'profile_photo'
        } : undefined,
        resume: resumeFile ? {
          name: resumeFile.name,
          uri: resumeFile.uri,
          size: resumeFile.size,
          type: 'resume'
        } : undefined,
        selfIntroduction: selfIntroductionFile ? {
          name: selfIntroductionFile.name,
          uri: selfIntroductionFile.uri,
          size: selfIntroductionFile.size,
          type: 'self_introduction'
        } : undefined,
        certifications: certificationFiles.map((file) => ({
          name: file.name,
          uri: file.uri,
          size: file.size,
          type: 'certification'
        }))
      }
    };

    console.log('Personal Registration Data:', JSON.stringify(personalData, null, 2));

    // TODO: 실제 API 호출로 데이터베이스에 저장
    // 예시: await apiService.registerPersonal(personalData);

    Alert.alert(
      '등록 완료',
      '개인 자격 등록이 완료되었습니다. 검토 후 승인될 예정입니다.',
      [
        {
          text: '확인',
          onPress: () => navigation.goBack(),
        },
      ]
    );
  };

  // Handle draft save
  const saveDraft = () => {
    // 임시 저장용 데이터 구성
    const draftData = {
      personal: {
        pers_name: name,
        pers_email: email,
        pers_phone: phone,
        pers_location: location,
        pers_bio: bio,
        pers_experience_years: parseInt(experienceYears) || 0,
        pers_hourly_rate_raw: isNegotiable ? '협의' : `${hourlyRate}만원/시간`,
        pers_hourly_rate_min: isNegotiable ? null : parseInt(hourlyRate) * 10000,
        pers_hourly_rate_max: null,
        pers_hourly_rate_currency: 'KRW',
        pers_profile_state: 'draft'
      },
      experiences: experiences.map((exp, index) => ({
        pexp_title: exp.title,
        pexp_company: exp.company,
        pexp_period_text: exp.period,
        pexp_description: exp.description,
        pexp_seq: index + 1
      })),
      certificates: certifications.map((cert, index) => ({
        pcert_name: cert.name,
        pcert_status_gb: 'CERT_STATUS',
        pcert_status_key: cert.status,
        pcert_issue_date: cert.issueDate,
        pcert_expiry_date: cert.expiryDate,
        pcert_seq: index + 1
      })),
      specialtyCodes: selectedSpecialties.map((specialty, index) => ({
        pcode_gb: 'SPECIALTY',
        pcode_key: specialty,
        pcode_label: specialty,
        pcode_seq: index + 1
      })),
      countryCodes: selectedCountries.map((country, index) => ({
        pcode_gb: 'COUNTRY',
        pcode_key: country,
        pcode_label: country,
        pcode_seq: index + 1
      })),
      activityCodes: selectedActivities.map((activity, index) => ({
        pcode_gb: 'ACTIVITY',
        pcode_key: activity,
        pcode_label: activity,
        pcode_seq: index + 1
      })),
      files: {
        profilePhoto: profilePhoto ? {
          name: profilePhoto.name || 'profile_photo.jpg',
          uri: profilePhoto.uri,
          type: 'profile_photo'
        } : undefined,
        resume: resumeFile ? {
          name: resumeFile.name,
          uri: resumeFile.uri,
          size: resumeFile.size,
          type: 'resume'
        } : undefined,
        selfIntroduction: selfIntroductionFile ? {
          name: selfIntroductionFile.name,
          uri: selfIntroductionFile.uri,
          size: selfIntroductionFile.size,
          type: 'self_introduction'
        } : undefined,
        certifications: certificationFiles.map((file) => ({
          name: file.name,
          uri: file.uri,
          size: file.size,
          type: 'certification'
        }))
      }
    };

    console.log('Draft Data:', JSON.stringify(draftData, null, 2));

    // TODO: 실제 API 호출로 임시 저장
    // await apiService.savePersonalDraft(draftData);

    Alert.alert('임시 저장', '임시 저장이 완료되었습니다.');
  };

  // 프로필 사진 선택
  const pickProfilePhoto = async () => {
    try {
      // 권한 요청
      const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
      if (status !== 'granted') {
        Alert.alert('권한 필요', '사진 라이브러리 접근 권한이 필요합니다.');
        return;
      }

      // 이미지 선택
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [1, 1],
        quality: 0.8,
      });

      if (!result.canceled && result.assets && result.assets.length > 0) {
        const asset = result.assets[0];
        setProfilePhoto({
          uri: asset.uri,
          name: asset.fileName || 'profile.jpg'
        });
      }
    } catch (error) {
      console.error('이미지 선택 오류:', error);
      Alert.alert('오류', '이미지를 선택하는 중 오류가 발생했습니다.');
    }
  };

  const removeProfilePhoto = () => setProfilePhoto(null);

  // 지역 선택 핸들러
  const handleLocationSelect = (selectedLocation: string) => {
    setLocation(selectedLocation);
    setShowLocationModal(false);
  };

  // 이력서 파일 선택 핸들러
  const pickResumeFile = async () => {
    try {
      const result = await DocumentPicker.getDocumentAsync({
        type: [
          'application/pdf',
          'application/msword',
          'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
        ],
        copyToCacheDirectory: true,
      });

      if (!result.canceled && result.assets && result.assets.length > 0) {
        const file = result.assets[0];
        const fileSizeMB = file.size ? file.size / (1024 * 1024) : 0;

        if (fileSizeMB > 5) {
          Alert.alert('파일 크기 초과', '파일 크기는 5MB를 초과할 수 없습니다.');
          return;
        }

        setResumeFile({
          uri: file.uri,
          name: file.name,
          size: file.size || 0
        });
      }
    } catch (error) {
      console.error('이력서 파일 선택 오류:', error);
      Alert.alert('오류', '파일 선택 중 오류가 발생했습니다.');
    }
  };

  // 자격증 이미지 파일 선택 핸들러
  const pickCertificationFiles = async () => {
    try {
      const result = await DocumentPicker.getDocumentAsync({
        type: [
          'image/*',
          'application/pdf'
        ],
        multiple: true,
        copyToCacheDirectory: true,
      });

      if (!result.canceled && result.assets) {
        const newFiles = result.assets.slice(0, 3 - certificationFiles.length); // 최대 3개 제한

        const validFiles = newFiles.filter(file => {
          const fileSizeMB = file.size ? file.size / (1024 * 1024) : 0;
          return fileSizeMB <= 5;
        });

        if (validFiles.length !== newFiles.length) {
          Alert.alert('파일 크기 초과', '일부 파일이 5MB를 초과하여 제외되었습니다.');
        }

        const formattedFiles = validFiles.map(file => ({
          uri: file.uri,
          name: file.name,
          size: file.size || 0
        }));

        setCertificationFiles([...certificationFiles, ...formattedFiles]);
      }
    } catch (error) {
      console.error('자격증 파일 선택 오류:', error);
      Alert.alert('오류', '파일 선택 중 오류가 발생했습니다.');
    }
  };

  // 이력서 파일 삭제 핸들러
  const removeResumeFile = () => {
    setResumeFile(null);
  };

  // 자격증 파일 삭제 핸들러
  const removeCertificationFile = (index: number) => {
    const updatedFiles = [...certificationFiles];
    updatedFiles.splice(index, 1);
    setCertificationFiles(updatedFiles);
  };

  // 자기소개서 파일 선택 핸들러
  const pickSelfIntroductionFile = async () => {
    try {
      const result = await DocumentPicker.getDocumentAsync({
        type: [
          'application/pdf',
          'application/msword',
          'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
          'application/haansofthwp',
          'application/x-hwp'
        ],
        copyToCacheDirectory: true,
      });

      if (!result.canceled && result.assets && result.assets.length > 0) {
        const file = result.assets[0];
        const fileSizeMB = file.size ? file.size / (1024 * 1024) : 0;

        if (fileSizeMB > 10) {
          Alert.alert('파일 크기 초과', '자기소개서 파일 크기는 10MB를 초과할 수 없습니다.');
          return;
        }

        setSelfIntroductionFile({
          uri: file.uri,
          name: file.name,
          size: file.size || 0
        });
      }
    } catch (error) {
      console.error('자기소개서 파일 선택 오류:', error);
      Alert.alert('오류', '파일 선택 중 오류가 발생했습니다.');
    }
  };

  // 자기소개서 파일 삭제 핸들러
  const removeSelfIntroductionFile = () => {
    setSelfIntroductionFile(null);
  };

  return (
    <KeyboardAvoidingView style={{ flex: 1 }} behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
      <ScrollView
        style={styles.container}
        keyboardShouldPersistTaps="handled"
        keyboardDismissMode="on-drag"
        contentContainerStyle={{ flexGrow: 1 }}
      >
        {/* Header */}
        <SubformHeader
          title="개인 자격 등록"
          navigation={navigation}
          onHome={() => (navigation as any)?.navigate?.('Home')}
        />

        {/* Form Container */}
        <View style={styles.formContainer}>
          <View style={styles.formHeader}>
            {/* 중복 타이틀 제거: 상단 헤더에 타이틀이 이미 표시되므로 폼 내부 타이틀은 제거했습니다. */}
            <Text style={styles.formSubtitle}>전문가와 기업을 연결하는 최적의 매칭 플랫폼입니다.</Text>
          </View>

          {/* Profile Completion (개인자격 증명 블록 상단 추가) */}
          <View style={styles.profileCompletion}>
            <View style={styles.completionText}>
              <View style={styles.completionTitle}>
                <FontAwesome5 name="chart-pie" size={16} color="#0066CC" />
                <Text style={styles.completionTitleText}>프로필 완성도</Text>
              </View>
              <Text style={styles.helpText}>프로필이 완성될수록 더 많은 기업에게 노출됩니다</Text>
              <View style={styles.completionBar}>
                <View style={[styles.completionFill, { width: `${profileCompletionPercentage}%` }]} />
              </View>
            </View>

            <Text style={styles.completionPercentage}>{profileCompletionPercentage}%</Text>
          </View>

          {/* Basic Information Section */}
          <View style={styles.formSection}>
            <View style={styles.sectionHeader}>
              <FontAwesome5 name="user" size={18} color="#0066CC" />
              <Text style={styles.sectionTitle}>기본 정보</Text>
            </View>

            <View style={styles.formGrid}>
              {/* 프로필 사진 업로드 (기본 정보로 이동) */}
              <View style={[styles.formGroup, styles.fullWidth]}>
                <Text style={styles.label}>프로필 사진</Text>
                <View style={styles.avatarSection}>
                  {/* 원형 이미지 미리보기 */}
                  <TouchableOpacity style={styles.avatarPreviewContainer} onPress={pickProfilePhoto}>
                    {profilePhoto ? (
                      <Image source={{ uri: profilePhoto.uri }} style={styles.avatarCircularImage} />
                    ) : (
                      <View style={styles.avatarCircularPlaceholder}>
                        <FontAwesome5 name="camera" size={32} color="#999" />
                        <Text style={styles.avatarPlaceholderText}>사진 선택</Text>
                      </View>
                    )}
                  </TouchableOpacity>

                  {/* 이미지 선택 버튼 */}
                  <TouchableOpacity style={styles.imageSelectButton} onPress={pickProfilePhoto}>
                    <FontAwesome5 name="image" size={16} color="#0066CC" />
                    <Text style={styles.imageSelectButtonText}>
                      {profilePhoto ? '사진 변경' : '사진 선택'}
                    </Text>
                  </TouchableOpacity>

                  {/* 사진 삭제 버튼 */}
                  {profilePhoto && (
                    <TouchableOpacity style={styles.imageRemoveButton} onPress={removeProfilePhoto}>
                      <FontAwesome5 name="trash" size={14} color="#e74c3c" />
                      <Text style={styles.imageRemoveButtonText}>삭제</Text>
                    </TouchableOpacity>
                  )}
                </View>
                <Text style={styles.helpText}>정사각형 이미지 권장 (예: 400x400), JPG/PNG (최대 3MB)</Text>
              </View>

              <View style={styles.formGroup}>
                <Text style={styles.label}>이름 <Text style={styles.required}>*</Text></Text>
                <TextInput
                  style={styles.input}
                  value={name}
                  onChangeText={setName}
                  placeholder="홍길동"
                />
              </View>

              <View style={styles.formGroup}>
                <Text style={styles.label}>이메일 <Text style={styles.required}>*</Text></Text>
                <TextInput
                  style={styles.input}
                  value={email}
                  onChangeText={setEmail}
                  placeholder="example@email.com"
                  keyboardType="email-address"
                />
              </View>

              <View style={styles.formGroup}>
                <Text style={styles.label}>연락처 <Text style={styles.required}>*</Text></Text>
                <TextInput
                  style={styles.input}
                  value={phone}
                  onChangeText={setPhone}
                  placeholder="010-0000-0000"
                  keyboardType="phone-pad"
                />
              </View>

              <View style={styles.formGroup}>
                <Text style={styles.label}>경력년수 <Text style={styles.required}>*</Text></Text>
                <TextInput
                  style={styles.input}
                  value={experienceYears}
                  onChangeText={setExperienceYears}
                  placeholder="10"
                  keyboardType="numeric"
                />
              </View>

              <View style={[styles.formGroup, styles.fullWidth]}>
                <Text style={styles.label}>시간당 요금대 (만원) <Text style={styles.required}>*</Text></Text>
                <View style={styles.hourlyRateContainer}>
                  <TextInput
                    style={[
                      styles.input,
                      styles.hourlyRateInput,
                      isNegotiable && styles.disabledInput
                    ]}
                    value={hourlyRate}
                    onChangeText={setHourlyRate}
                    placeholder="예: 50-100"
                    editable={!isNegotiable}
                  />
                  <TouchableOpacity
                    style={[
                      styles.negotiableButton,
                      isNegotiable && styles.negotiableButtonActive
                    ]}
                    onPress={() => {
                      setIsNegotiable(!isNegotiable);
                      if (!isNegotiable) {
                        setHourlyRate('협의');
                      } else {
                        setHourlyRate('');
                      }
                    }}
                  >
                    <FontAwesome5
                      name="handshake"
                      size={14}
                      color={isNegotiable ? '#fff' : '#0066CC'}
                    />
                    <Text style={[
                      styles.negotiableButtonText,
                      isNegotiable && styles.negotiableButtonTextActive
                    ]}>
                      협의
                    </Text>
                  </TouchableOpacity>
                </View>
                <Text style={styles.helpText}>직접 입력 또는 '협의' 선택 가능</Text>
              </View>

              <View style={[styles.formGroup, styles.fullWidth]}>
                <Text style={styles.label}>주 활동 지역 <Text style={styles.required}>*</Text></Text>
                <TouchableOpacity
                  style={styles.selectButton}
                  onPress={() => setShowLocationModal(true)}
                >
                  <Text style={[
                    styles.selectButtonText,
                    !location && styles.placeholderText
                  ]}>
                    {location || '주 활동 지역을 선택하세요'}
                  </Text>
                  <FontAwesome5 name="chevron-down" size={14} color="#666" />
                </TouchableOpacity>
                <Text style={styles.helpText}>주요 활동 가능 지역을 선택하세요</Text>
              </View>

              <View style={[styles.formGroup, styles.fullWidth]}>
                <Text style={styles.label}>자기소개서 요약 <Text style={styles.required}>*</Text></Text>
                <TextInput
                  style={[styles.input, styles.textArea]}
                  value={bio}
                  onChangeText={setBio}
                  placeholder="전문 분야와 경험을 중심으로 자신을 소개해주세요."
                  multiline
                  numberOfLines={4}
                />
                <Text style={styles.helpText}>최소 100자 이상 작성해주세요.</Text>
              </View>

              <View style={[styles.formGroup, styles.fullWidth]}>
                <Text style={styles.label}>자기소개서 파일</Text>
                {selfIntroductionFile ? (
                  <View style={styles.fileCard}>
                    <View style={styles.fileInfo}>
                      <FontAwesome5 name="file-alt" size={24} color="#0066CC" />
                      <View style={styles.fileDetails}>
                        <Text style={styles.fileName}>{selfIntroductionFile.name}</Text>
                        <Text style={styles.fileSize}>
                          {(selfIntroductionFile.size / (1024 * 1024)).toFixed(2)} MB
                        </Text>
                      </View>
                    </View>
                    <TouchableOpacity style={styles.removeFileButton} onPress={removeSelfIntroductionFile}>
                      <FontAwesome5 name="trash" size={16} color="#e74c3c" />
                    </TouchableOpacity>
                  </View>
                ) : (
                  <TouchableOpacity style={styles.fileUploadSection} onPress={pickSelfIntroductionFile}>
                    <FontAwesome5 name="cloud-upload-alt" size={32} color="#0066CC" />
                    <Text style={styles.fileUploadText}>자기소개서 파일을 업로드하세요</Text>
                    <View style={styles.fileUploadButton}>
                      <Text style={styles.fileUploadButtonText}>파일 선택</Text>
                    </View>
                  </TouchableOpacity>
                )}
                <Text style={styles.helpText}>PDF, DOC, DOCX, HWP 형식 (최대 10MB)</Text>
              </View>
            </View>
          </View>

          {/* Specialty Section */}
          <View style={styles.formSection}>
            <View style={styles.sectionHeader}>
              <FontAwesome5 name="briefcase" size={18} color="#0066CC" />
              <Text style={styles.sectionTitle}>전문 분야</Text>
            </View>

            <View style={styles.infoBox}>
              <View style={styles.infoBoxTitle}>
                <FontAwesome5 name="info-circle" size={16} color="#0066CC" />
                <Text style={styles.infoBoxTitleText}>전문 분야 선택 가이드</Text>
              </View>
              <Text style={styles.infoBoxContent}>
                실제 경험이 있는 분야를 선택해주세요. 다중 선택이 가능합니다.
              </Text>
            </View>

            <View style={styles.specialtyGroup}>
              <Text style={styles.specialtyLabel}>산업 분야 <Text style={styles.required}>*</Text></Text>
              <View style={styles.specialtyContainer}>
                {availableSpecialties.slice(0, 10).map((specialty, index) => (
                  <TouchableOpacity
                    key={index}
                    style={[
                      styles.specialtyTag,
                      selectedSpecialties.includes(specialty) && styles.specialtyTagSelected
                    ]}
                    onPress={() => toggleSpecialty(specialty)}
                  >
                    <Text style={[
                      styles.specialtyTagText,
                      selectedSpecialties.includes(specialty) && styles.specialtyTagTextSelected
                    ]}>
                      {specialty}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>
            </View>

            <View style={styles.specialtyGroup}>
              <Text style={styles.specialtyLabel}>인증 분야</Text>
              <View style={styles.specialtyContainer}>
                {availableSpecialties.slice(10).map((specialty, index) => (
                  <TouchableOpacity
                    key={index}
                    style={[
                      styles.specialtyTag,
                      selectedSpecialties.includes(specialty) && styles.specialtyTagSelected
                    ]}
                    onPress={() => toggleSpecialty(specialty)}
                  >
                    <Text style={[
                      styles.specialtyTagText,
                      selectedSpecialties.includes(specialty) && styles.specialtyTagTextSelected
                    ]}>
                      {specialty}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>
            </View>

            {/* Activity Area Section */}
            <View style={styles.specialtyGroup}>
              <Text style={styles.specialtyLabel}>활동 분야</Text>
              <View style={styles.specialtyContainer}>
                {['인증', '컨설팅', '모의인증', '교육', '정부지원'].map((activity, index) => (
                  <TouchableOpacity
                    key={index}
                    style={[
                      styles.specialtyTag,
                      selectedActivities.includes(activity) && styles.specialtyTagSelected
                    ]}
                    onPress={() => toggleActivity(activity)}
                  >
                    <Text style={[
                      styles.specialtyTagText,
                      selectedActivities.includes(activity) && styles.specialtyTagTextSelected
                    ]}>
                      {activity}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>
            </View>

          </View>

          {/* Experience Section */}
          <View style={styles.formSection}>
            <View style={styles.sectionHeader}>
              <FontAwesome5 name="history" size={18} color="#0066CC" />
              <Text style={styles.sectionTitle}>경력 사항</Text>
            </View>

            <View style={styles.experienceCards}>
              {experiences.map((experience, index) => (
                <View key={index} style={styles.experienceCard}>
                  <TouchableOpacity style={styles.removeBtn} onPress={() => removeExperience(index)}>
                    <FontAwesome5 name="times" size={18} color="#E74C3C" />
                  </TouchableOpacity>
                  <View style={styles.experienceHeader}>
                    <View style={styles.experienceHeaderContent}>
                      <TextInput
                        style={styles.experienceTitleInput}
                        value={experience.title}
                        onChangeText={(value) => updateExperience(index, 'title', value)}
                        placeholder="직책"
                      />
                      <TextInput
                        style={styles.experiencePeriodInput}
                        value={experience.period}
                        onChangeText={(value) => updateExperience(index, 'period', value)}
                        placeholder="근무기간"
                      />
                    </View>
                  </View>
                  <TextInput
                    style={styles.experienceCompanyInput}
                    value={experience.company}
                    onChangeText={(value) => updateExperience(index, 'company', value)}
                    placeholder="회사명"
                  />
                  <TextInput
                    style={[styles.experienceDescriptionInput, styles.textArea]}
                    value={experience.description}
                    onChangeText={(value) => updateExperience(index, 'description', value)}
                    placeholder="주요 업무 및 성과"
                    multiline
                  />
                </View>
              ))}
            </View>

            <TouchableOpacity style={styles.addButton} onPress={addExperience}>
              <FontAwesome5 name="plus" size={16} color="#666" />
              <Text style={styles.addButtonText}>경력 추가</Text>
            </TouchableOpacity>
          </View>

          {/* Certification Section */}
          <View style={styles.formSection}>
            <View style={styles.sectionHeader}>
              <FontAwesome5 name="certificate" size={18} color="#0066CC" />
              <Text style={styles.sectionTitle}>자격증</Text>
            </View>

            <View style={styles.infoBox}>
              <View style={styles.infoBoxTitle}>
                <FontAwesome5 name="check-circle" size={16} color="#0066CC" />
                <Text style={styles.infoBoxTitleText}>검증 안내</Text>
              </View>
              <Text style={styles.infoBoxContent}>
                제출된 자격증이 허위 또는 부정확한 정보를 제출할 경우 발생하는 모든 법적 책임은 본인에게 있습니다.
              </Text>
            </View>

            <View style={styles.certificationCards}>
              {certifications.map((certification, index) => (
                <View key={index} style={styles.certificationCard}>
                  <TouchableOpacity style={styles.removeBtn} onPress={() => removeCertification(index)}>
                    <FontAwesome5 name="times" size={18} color="#E74C3C" />
                  </TouchableOpacity>
                  <View style={styles.certificationHeader}>
                    <TextInput
                      style={styles.certificationNameInput}
                      value={certification.name}
                      onChangeText={(value) => updateCertification(index, 'name', value)}
                      placeholder="자격증명"
                    />
                    <View style={styles.certificationStatusContainer}>
                      <Text style={styles.certificationStatusText}>상태</Text>
                      <TouchableOpacity style={styles.certificationStatus}>
                        <Text style={styles.certificationStatusText}>유효</Text>
                      </TouchableOpacity>
                    </View>
                  </View>
                  <View style={styles.certificationDetails}>
                    <View style={styles.certDetailItem}>
                      <FontAwesome5 name="calendar" size={14} color="#666" />
                      <TextInput
                        style={styles.certDetailInput}
                        value={certification.issueDate}
                        onChangeText={(value) => updateCertification(index, 'issueDate', value)}
                        placeholder="발급일"
                      />
                    </View>
                    <View style={styles.certDetailItem}>
                      <FontAwesome5 name="calendar-check" size={14} color="#666" />
                      <TextInput
                        style={styles.certDetailInput}
                        value={certification.expiryDate}
                        onChangeText={(value) => updateCertification(index, 'expiryDate', value)}
                        placeholder="만료일"
                      />
                    </View>
                  </View>
                </View>
              ))}
            </View>

            <TouchableOpacity style={styles.addButton} onPress={addCertification}>
              <FontAwesome5 name="plus" size={16} color="#666" />
              <Text style={styles.addButtonText}>자격증 추가</Text>
            </TouchableOpacity>
          </View>

          {/* Document Upload Section */}
          <View style={styles.formSection}>
            <View style={styles.sectionHeader}>
              <FontAwesome5 name="file-upload" size={18} color="#0066CC" />
              <Text style={styles.sectionTitle}>서류 제출</Text>
            </View>


            <View style={styles.formGrid}>
              <View style={[styles.formGroup, styles.fullWidth]}>
                <Text style={styles.label}>이력서 <Text style={styles.required}>*</Text></Text>
                {resumeFile ? (
                  <View style={styles.fileCard}>
                    <View style={styles.fileInfo}>
                      <FontAwesome5 name="file-alt" size={24} color="#0066CC" />
                      <View style={styles.fileDetails}>
                        <Text style={styles.fileName}>{resumeFile.name}</Text>
                        <Text style={styles.fileSize}>
                          {(resumeFile.size / (1024 * 1024)).toFixed(2)} MB
                        </Text>
                      </View>
                    </View>
                    <TouchableOpacity style={styles.removeFileButton} onPress={removeResumeFile}>
                      <FontAwesome5 name="trash" size={16} color="#e74c3c" />
                    </TouchableOpacity>
                  </View>
                ) : (
                  <TouchableOpacity style={styles.fileUploadSection} onPress={pickResumeFile}>
                    <FontAwesome5 name="cloud-upload-alt" size={32} color="#0066CC" />
                    <Text style={styles.fileUploadText}>파일을 드래그하거나 클릭하여 업로드하세요</Text>
                    <View style={styles.fileUploadButton}>
                      <Text style={styles.fileUploadButtonText}>파일 선택</Text>
                    </View>
                  </TouchableOpacity>
                )}
                <Text style={styles.helpText}>PDF, DOC, DOCX 형식 (최대 5MB)</Text>
              </View>

              <View style={[styles.formGroup, styles.fullWidth]}>
                <Text style={styles.label}>자격증 이미지 <Text style={styles.required}>*</Text></Text>
                {certificationFiles.length > 0 ? (
                  <View style={styles.fileList}>
                    {certificationFiles.map((file, index) => (
                      <View key={index} style={styles.fileCard}>
                        <View style={styles.fileInfo}>
                          <FontAwesome5 name="file-image" size={24} color="#0066CC" />
                          <View style={styles.fileDetails}>
                            <Text style={styles.fileName}>{file.name}</Text>
                            <Text style={styles.fileSize}>
                              {(file.size / (1024 * 1024)).toFixed(2)} MB
                            </Text>
                          </View>
                        </View>
                        <TouchableOpacity
                          style={styles.removeFileButton}
                          onPress={() => removeCertificationFile(index)}
                        >
                          <FontAwesome5 name="trash" size={16} color="#e74c3c" />
                        </TouchableOpacity>
                      </View>
                    ))}
                    {certificationFiles.length < 3 && (
                      <TouchableOpacity
                        style={styles.addFileButton}
                        onPress={pickCertificationFiles}
                      >
                        <FontAwesome5 name="plus" size={16} color="#0066CC" />
                        <Text style={styles.addFileButtonText}>파일 추가</Text>
                      </TouchableOpacity>
                    )}
                  </View>
                ) : (
                  <TouchableOpacity style={styles.fileUploadSection} onPress={pickCertificationFiles}>
                    <FontAwesome5 name="cloud-upload-alt" size={32} color="#0066CC" />
                    <Text style={styles.fileUploadText}>자격증 스캔본을 업로드하세요 (최대 3개)</Text>
                    <View style={styles.fileUploadButton}>
                      <Text style={styles.fileUploadButtonText}>파일 선택</Text>
                    </View>
                  </TouchableOpacity>
                )}
                <Text style={styles.helpText}>JPG, PNG, PDF 형식 (최대 5MB), 최대 3개</Text>
              </View>
            </View>
          </View>

          {/* Form Actions */}
          <View style={styles.formActions}>
            <TouchableOpacity style={styles.secondaryButton} onPress={saveDraft}>
              <FontAwesome5 name="save" size={16} color="#333" />
              <Text style={styles.secondaryButtonText}>임시 저장</Text>
            </TouchableOpacity>

            <View style={styles.buttonGroup}>
              <TouchableOpacity style={styles.primaryButton} onPress={handleSubmit}>
                <FontAwesome5 name="check" size={16} color="#fff" />
                <Text style={styles.primaryButtonText}>프로필 등록 완료</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </ScrollView>

      {/* 지역 선택 모달 */}
      <Modal
        visible={showLocationModal}
        transparent={true}
        animationType="slide"
        onRequestClose={() => setShowLocationModal(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>활동 지역 선택</Text>
              <TouchableOpacity
                style={styles.modalCloseButton}
                onPress={() => setShowLocationModal(false)}
              >
                <FontAwesome5 name="times" size={18} color="#666" />
              </TouchableOpacity>
            </View>

            <FlatList
              data={locations}
              keyExtractor={(item, index) => index.toString()}
              renderItem={({ item }) => (
                <TouchableOpacity
                  style={[
                    styles.locationItem,
                    location === item && styles.locationItemSelected
                  ]}
                  onPress={() => handleLocationSelect(item)}
                >
                  <Text style={[
                    styles.locationItemText,
                    location === item && styles.locationItemTextSelected
                  ]}>
                    {item}
                  </Text>
                  {location === item && (
                    <FontAwesome5 name="check" size={14} color="#0066CC" />
                  )}
                </TouchableOpacity>
              )}
              showsVerticalScrollIndicator={false}
            />
          </View>
        </View>
      </Modal>
    </KeyboardAvoidingView>
  );
};

export default RegistrationPersonal;