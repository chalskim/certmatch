import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, ScrollView, TouchableOpacity, Alert, KeyboardAvoidingView, Platform, Image, Modal, SafeAreaView, FlatList } from 'react-native';
import { FontAwesome5 } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import * as ImagePicker from 'expo-image-picker';
import * as DocumentPicker from 'expo-document-picker';
import { styles } from '../styles/menu/RegistrationPersonal';
import SubformHeader from '../components/SubformHeader';
import { useUser } from '../../contexts/UserContext';
import { apiService } from '../../services/apiService';
import {
  PersonalRegistrationPayload,
  UserPersonal,
  UserPersonalExperience,
  UserPersonalCertificate,
  UserPersonalCode
} from '../../types/db/PersonalRegistration';


export const PersonalRegistrationEdit: React.FC = () => {
  const navigation = useNavigation<any>();
  const { user } = useUser();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [experienceYears, setExperienceYears] = useState('');
  const [hourlyRate, setHourlyRate] = useState('');
  const [isNegotiable, setIsNegotiable] = useState(false);
  const [location, setLocation] = useState('');
  const [showLocationModal, setShowLocationModal] = useState(false);

  const locations = [
    '서울', '경기', '인천', '부산', '대구', '대전', '광주', '울산',
    '세종', '강원', '충북', '충남', '전북', '전남', '경북', '경남', '제주',
    '전국', '해외', '온라인'
  ];
  const availableSpecialties = ['금융', '의료', '제조', 'IT', '공공', '유통', '교육', '물류', '환경', '식품', 'ISMS-P', 'ISMS', 'ISO 27001', 'ISO 27701', 'GS 인증', 'CPPG', 'CSAP', 'ESPM'];

  const [bio, setBio] = useState('');
  const [specialties, setSpecialties] = useState<string[]>([]);
  const [selectedSpecialties, setSelectedSpecialties] = useState<string[]>([]);
  const [selectedCountries, setSelectedCountries] = useState<string[]>([]);
  const [selectedActivities, setSelectedActivities] = useState<string[]>([]);
  const [experiences, setExperiences] = useState<Array<{ title: string, period: string, company: string, description: string }>>([]);
  const [certifications, setCertifications] = useState<Array<{ name: string, status: string, issueDate: string, expiryDate: string }>>([]);

  const [profilePhoto, setProfilePhoto] = useState<{ uri: string; name?: string } | null>(null);
  const [resumeFile, setResumeFile] = useState<{ uri: string; name: string; size: number } | null>(null);
  const [certificationFiles, setCertificationFiles] = useState<{ uri: string; name: string; size: number }[]>([]);
  const [selfIntroductionFile, setSelfIntroductionFile] = useState<{ uri: string; name: string; size: number } | null>(null);

  const [personalId, setPersonalId] = useState<string | null>(null);

  const calculateProfileCompletion = (): number => {
    let completion = 0;
    const totalFields = 12;
    if (name.trim()) completion++;
    if (email.trim() && email.includes('@')) completion++;
    if (phone.trim() && phone.length >= 10) completion++;
    if (profilePhoto) completion++;
    if (experienceYears.trim()) completion++;
    if (hourlyRate.trim() || isNegotiable) completion++;
    if (location.trim()) completion++;
    if (selectedSpecialties.length > 0) completion++;
    if (bio.trim() && bio.length >= 20) completion++;
    if (experiences.length > 0 && experiences.some(exp => exp.title.trim() && exp.company.trim())) completion++;
    if (resumeFile) completion++;
    if (selfIntroductionFile || certificationFiles.length > 0) completion++;
    return Math.round((completion / totalFields) * 100);
  };

  const [profileCompletion, setProfileCompletion] = useState(calculateProfileCompletion());
  const profileCompletionPercentage = calculateProfileCompletion();

  useEffect(() => {
    const newCompletion = calculateProfileCompletion();
    setProfileCompletion(newCompletion);
  }, [
    name, email, phone, profilePhoto, experienceYears, hourlyRate, isNegotiable,
    location, selectedSpecialties, bio, experiences, resumeFile,
    selfIntroductionFile, certificationFiles
  ]);

  useEffect(() => {
    if (user) {
      setName(user.name || '');
      setEmail(user.email || '');
      setPhone(user.phone || '');
    }
  }, [user]);

  useEffect(() => {
    const loadPersonal = async () => {
      try {
        if (!apiService.isAuthenticated()) return;
        const res = await apiService.get<any>('/personal-registration/my');
        const data = res.data as any;
        if (!data) return;
        if (data.personal) {
          setPersonalId(data.personal.pers_id || null);
          setLocation(data.personal.pers_location || '');
          setBio(data.personal.pers_bio || '');
          setExperienceYears(String(data.personal.pers_experience_years || ''));
          if (data.personal.pers_hourly_rate_raw === '협의') {
            setIsNegotiable(true);
            setHourlyRate('협의');
          } else {
            setIsNegotiable(false);
            setHourlyRate(String(data.personal.pers_hourly_rate_min ? Math.round((data.personal.pers_hourly_rate_min || 0) / 10000) : ''));
          }
        }
        if (Array.isArray(data.experiences)) {
          setExperiences(
            data.experiences.map((e: any) => ({
              title: e.pexp_title || '',
              period: e.pexp_period_text || '',
              company: e.pexp_company || '',
              description: e.pexp_description || ''
            }))
          );
        }
        if (Array.isArray(data.certificates)) {
          setCertifications(
            data.certificates.map((c: any) => ({
              name: c.pcert_name || '',
              status: c.pcert_status_key || 'valid',
              issueDate: c.pcert_issue_date || '',
              expiryDate: c.pcert_expiry_date || ''
            }))
          );
        }
        if (Array.isArray(data.specialtyCodes)) {
          setSelectedSpecialties(
            data.specialtyCodes.map((s: any) => s.pcode_key || s.pcode_label).filter(Boolean)
          );
        }
        if (Array.isArray(data.countryCodes)) {
          setSelectedCountries(
            data.countryCodes.map((s: any) => s.pcode_key || s.pcode_label).filter(Boolean)
          );
        }
        if (Array.isArray(data.activityCodes)) {
          setSelectedActivities(
            data.activityCodes.map((s: any) => s.pcode_key || s.pcode_label).filter(Boolean)
          );
        }
      } catch (e) { }
    };
    loadPersonal();
  }, []);

  const toggleSpecialty = (specialty: string) => {
    if (selectedSpecialties.includes(specialty)) {
      setSelectedSpecialties(selectedSpecialties.filter(s => s !== specialty));
    } else {
      setSelectedSpecialties([...selectedSpecialties, specialty]);
    }
  };

  const toggleCountry = (country: string) => {
    if (selectedCountries.includes(country)) {
      setSelectedCountries(selectedCountries.filter(c => c !== country));
    } else {
      setSelectedCountries([...selectedCountries, country]);
    }
  };

  const toggleActivity = (activity: string) => {
    if (selectedActivities.includes(activity)) {
      setSelectedActivities(selectedActivities.filter(a => a !== activity));
    } else {
      setSelectedActivities([...selectedActivities, activity]);
    }
  };

  const addExperience = () => {
    setExperiences([...experiences, { title: '', period: '', company: '', description: '' }]);
  };

  const removeExperience = (index: number) => {
    const updatedExperiences = [...experiences];
    updatedExperiences.splice(index, 1);
    setExperiences(updatedExperiences);
  };

  const updateExperience = (index: number, field: string, value: string) => {
    const updatedExperiences = [...experiences];
    updatedExperiences[index] = { ...updatedExperiences[index], [field]: value };
    setExperiences(updatedExperiences);
  };

  const addCertification = () => {
    setCertifications([...certifications, { name: '', status: 'valid', issueDate: '', expiryDate: '' }]);
  };

  const removeCertification = (index: number) => {
    const updatedCertifications = [...certifications];
    updatedCertifications.splice(index, 1);
    setCertifications(updatedCertifications);
  };

  const updateCertification = (index: number, field: string, value: string) => {
    const updatedCertifications = [...certifications];
    updatedCertifications[index] = { ...updatedCertifications[index], [field]: value };
    setCertifications(updatedCertifications);
  };

  const handleUpdate = async () => {
    if (!name || !email || !phone || !experienceYears || (!hourlyRate && !isNegotiable) || !location || !bio) {
      Alert.alert('필수 정보 누락', '모든 필수 정보를 입력해주세요.');
      return;
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      Alert.alert('이메일 형식 오류', '올바른 이메일 주소를 입력해주세요.');
      return;
    }
    const years = parseInt(experienceYears);
    if (isNaN(years) || years < 0 || years > 50) {
      Alert.alert('경력년수 오류', '경력년수는 0-50 사이의 숫자를 입력해주세요.');
      return;
    }
    if (bio.length < 100) {
      Alert.alert('자기소개 오류', '자기소개는 최소 100자 이상 작성해주세요.');
      return;
    }
    if (selectedSpecialties.length === 0) {
      Alert.alert('전문 분야 누락', '최소 1개 이상의 전문 분야를 선택해주세요.');
      return;
    }
    const personalData = {
      personal: {
        pers_name: name,
        pers_email: email,
        pers_phone: phone,
        pers_location: location,
        pers_bio: bio,
        pers_experience_years: years,
        pers_hourly_rate_raw: isNegotiable ? '협의' : `${hourlyRate}만원/시간`,
        pers_hourly_rate_min: isNegotiable ? undefined : parseInt(hourlyRate) * 10000,
        pers_hourly_rate_max: undefined,
        pers_hourly_rate_currency: 'KRW',
        pers_profile_state: 'draft'
      } as Partial<UserPersonal>,
      experiences: experiences.map((exp, index) => ({
        pexp_title: exp.title,
        pexp_company: exp.company,
        pexp_period_text: exp.period,
        pexp_description: exp.description,
        pexp_seq: index + 1
      })) as Partial<UserPersonalExperience>[],
      certificates: certifications.map((cert, index) => ({
        pcert_name: cert.name,
        pcert_status_gb: 'CERT_STATUS',
        pcert_status_key: cert.status,
        pcert_issue_date: cert.issueDate,
        pcert_expiry_date: cert.expiryDate,
        pcert_seq: index + 1
      })) as Partial<UserPersonalCertificate>[],
      specialtyCodes: selectedSpecialties.map((specialty, index) => ({
        pcode_gb: 'SPECIALTY',
        pcode_key: specialty,
        pcode_label: specialty,
        pcode_seq: index + 1
      })) as Partial<UserPersonalCode>[],
      countryCodes: selectedCountries.map((country, index) => ({
        pcode_gb: 'COUNTRY',
        pcode_key: country,
        pcode_label: country,
        pcode_seq: index + 1
      })) as Partial<UserPersonalCode>[],
      activityCodes: selectedActivities.map((activity, index) => ({
        pcode_gb: 'ACTIVITY',
        pcode_key: activity,
        pcode_label: activity,
        pcode_seq: index + 1
      })) as Partial<UserPersonalCode>[],
      files: {
        profilePhoto: profilePhoto ? {
          name: profilePhoto.name || 'profile_photo.jpg',
          uri: profilePhoto.uri,
          type: 'profile_photo'
        } : null,
        resume: resumeFile ? {
          name: resumeFile.name,
          uri: resumeFile.uri,
          size: resumeFile.size,
          type: 'resume'
        } : null,
        selfIntroduction: selfIntroductionFile ? {
          name: selfIntroductionFile.name,
          uri: selfIntroductionFile.uri,
          size: selfIntroductionFile.size,
          type: 'self_introduction'
        } : null,
        certifications: certificationFiles.map((file) => ({
          name: file.name,
          uri: file.uri,
          size: file.size,
          type: 'certification'
        }))
      }
    };
    try {
      const endpoint = personalId ? `/personal-registration/${personalId}` : '/personal-registration';
      await apiService.patch(endpoint, personalData);
      Alert.alert(
        '수정 완료',
        '개인 자격 정보가 수정되었습니다.',
        [
          {
            text: '확인',
            onPress: () => navigation.goBack(),
          },
        ]
      );
    } catch (e: any) {
      Alert.alert('오류', e?.message || '수정 처리 중 오류가 발생했습니다.');
    }
  };

  const saveDraft = async () => {
    const draftData = {
      personal: {
        pers_name: name,
        pers_email: email,
        pers_phone: phone,
        pers_location: location,
        pers_bio: bio,
        pers_experience_years: parseInt(experienceYears) || 0,
        pers_hourly_rate_raw: isNegotiable ? '협의' : `${hourlyRate}만원/시간`,
        pers_hourly_rate_min: isNegotiable ? undefined : parseInt(hourlyRate) * 10000,
        pers_hourly_rate_max: undefined,
        pers_hourly_rate_currency: 'KRW',
        pers_profile_state: 'draft'
      } as Partial<UserPersonal>,
      experiences: experiences.map((exp, index) => ({
        pexp_title: exp.title,
        pexp_company: exp.company,
        pexp_period_text: exp.period,
        pexp_description: exp.description,
        pexp_seq: index + 1
      })) as Partial<UserPersonalExperience>[],
      certificates: certifications.map((cert, index) => ({
        pcert_name: cert.name,
        pcert_status_gb: 'CERT_STATUS',
        pcert_status_key: cert.status,
        pcert_issue_date: cert.issueDate,
        pcert_expiry_date: cert.expiryDate,
        pcert_seq: index + 1
      })) as Partial<UserPersonalCertificate>[],
      specialtyCodes: selectedSpecialties.map((specialty, index) => ({
        pcode_gb: 'SPECIALTY',
        pcode_key: specialty,
        pcode_label: specialty,
        pcode_seq: index + 1
      })) as Partial<UserPersonalCode>[],
      countryCodes: selectedCountries.map((country, index) => ({
        pcode_gb: 'COUNTRY',
        pcode_key: country,
        pcode_label: country,
        pcode_seq: index + 1
      })) as Partial<UserPersonalCode>[],
      activityCodes: selectedActivities.map((activity, index) => ({
        pcode_gb: 'ACTIVITY',
        pcode_key: activity,
        pcode_label: activity,
        pcode_seq: index + 1
      })) as Partial<UserPersonalCode>[],
      files: {
        profilePhoto: profilePhoto ? {
          name: profilePhoto.name || 'profile_photo.jpg',
          uri: profilePhoto.uri,
          type: 'profile_photo'
        } : null,
        resume: resumeFile ? {
          name: resumeFile.name,
          uri: resumeFile.uri,
          size: resumeFile.size,
          type: 'resume'
        } : null,
        selfIntroduction: selfIntroductionFile ? {
          name: selfIntroductionFile.name,
          uri: selfIntroductionFile.uri,
          size: selfIntroductionFile.size,
          type: 'self_introduction'
        } : null,
        certifications: certificationFiles.map((file) => ({
          name: file.name,
          uri: file.uri,
          size: file.size,
          type: 'certification'
        }))
      }
    };
    try {
      const endpoint = personalId ? `/personal-registration/${personalId}` : '/personal-registration';
      await apiService.patch(endpoint, draftData);
      Alert.alert('임시 저장', '임시 저장이 완료되었습니다.');
    } catch (e: any) {
      Alert.alert('오류', e?.message || '임시 저장 중 오류가 발생했습니다.');
    }
  };

  const pickProfilePhoto = async () => {
    try {
      const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
      if (status !== 'granted') {
        Alert.alert('권한 필요', '사진 라이브러리 접근 권한이 필요합니다.');
        return;
      }
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
      Alert.alert('오류', '이미지를 선택하는 중 오류가 발생했습니다.');
    }
  };

  const removeProfilePhoto = () => setProfilePhoto(null);

  const handleLocationSelect = (selectedLocation: string) => {
    setLocation(selectedLocation);
    setShowLocationModal(false);
  };

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
      Alert.alert('오류', '파일 선택 중 오류가 발생했습니다.');
    }
  };

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
        const newFiles = result.assets.slice(0, 3 - certificationFiles.length);
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
      Alert.alert('오류', '파일 선택 중 오류가 발생했습니다.');
    }
  };

  const removeResumeFile = () => {
    setResumeFile(null);
  };

  const removeCertificationFile = (index: number) => {
    const updatedFiles = [...certificationFiles];
    updatedFiles.splice(index, 1);
    setCertificationFiles(updatedFiles);
  };

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
      Alert.alert('오류', '파일 선택 중 오류가 발생했습니다.');
    }
  };

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
        <SubformHeader
          title="개인 자격 수정"
          navigation={navigation}
          onHome={() => (navigation as any)?.navigate?.('Home')}
        />

        <View style={styles.formContainer}>
          <View style={styles.formHeader}>
            <Text style={styles.formSubtitle}>전문가와 기업을 연결하는 최적의 매칭 플랫폼입니다.</Text>
          </View>

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

          <View style={styles.formSection}>
            <View style={styles.sectionHeader}>
              <FontAwesome5 name="user" size={18} color="#0066CC" />
              <Text style={styles.sectionTitle}>기본 정보</Text>
            </View>

            <View style={styles.formGrid}>
              <View style={[styles.formGroup, styles.fullWidth]}>
                <Text style={styles.label}>프로필 사진</Text>
                <View style={styles.avatarSection}>
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
                  <TouchableOpacity style={styles.imageSelectButton} onPress={pickProfilePhoto}>
                    <FontAwesome5 name="image" size={16} color="#0066CC" />
                    <Text style={styles.imageSelectButtonText}>
                      {profilePhoto ? '사진 변경' : '사진 선택'}
                    </Text>
                  </TouchableOpacity>
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
              <Text style={styles.infoBoxContent}>실제 경험이 있는 분야를 선택해주세요. 다중 선택이 가능합니다.</Text>
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
              <Text style={styles.infoBoxContent}>제출된 자격증이 허위 또는 부정확한 정보를 제출할 경우 발생하는 모든 법적 책임은 본인에게 있습니다.</Text>
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

          <View style={styles.formActions}>
            <TouchableOpacity style={styles.secondaryButton} onPress={saveDraft}>
              <FontAwesome5 name="save" size={16} color="#333" />
              <Text style={styles.secondaryButtonText}>임시 저장</Text>
            </TouchableOpacity>
            <View style={styles.buttonGroup}>
              <TouchableOpacity style={styles.primaryButton} onPress={handleUpdate}>
                <FontAwesome5 name="check" size={16} color="#fff" />
                <Text style={styles.primaryButtonText}>프로필 수정 저장</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </ScrollView>

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

export default PersonalRegistrationEdit;
