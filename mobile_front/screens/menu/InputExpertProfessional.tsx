import React, { useState, useRef } from 'react';
import { View, Text, TextInput, ScrollView, TouchableOpacity, Image, Alert, Platform } from 'react-native';
import type { ImageSourcePropType } from 'react-native';
import { Images } from '../../assets/index';
import { FontAwesome5 } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { styles } from '../styles/menu/InputExpertRecruitment';
import SubformHeader from '../components/SubformHeader';

const dummyFileName = (ext = 'pdf') => `file_${Date.now()}.${ext}`;

const Tag: React.FC<{ label: string; onRemove?: () => void; selected?: boolean }> = ({ label, onRemove, selected }) => {
  return (
    <View style={[styles.tag, selected ? { backgroundColor: '#0066CC', borderColor: '#0066CC' } : {}]}>
      <Text style={{ color: selected ? '#fff' : '#495057' }}>{label}</Text>
      {onRemove ? (
        <TouchableOpacity onPress={onRemove} style={{ marginLeft: 8 }}>
          <FontAwesome5 name="times" size={12} color={selected ? '#fff' : '#333'} />
        </TouchableOpacity>
      ) : null}
    </View>
  );
};

export const ExpertRecruitmentFromMockup: React.FC = () => {
  const navigation = useNavigation();

  const [profilePhoto, setProfilePhoto] = useState<ImageSourcePropType | null>(null);
  const [additionalPhotos, setAdditionalPhotos] = useState<ImageSourcePropType[]>([]);
  const [name, setName] = useState('');
  const [introduction, setIntroduction] = useState('');

  const expertiseOptions = [
    'isms-p',
    'iso27001',
    'iso27701',
    'gs',
    'cppg',
    'cisp',
    'cissp',
    'other',
  ];
  const [expertise, setExpertise] = useState<string[]>([]);
  const [otherExpertise, setOtherExpertise] = useState('');

  const [experienceYears, setExperienceYears] = useState('');
  // 이전 직장 입력/추가 UI는 제거되었습니다.

  // 상세 경력 정보 관리
  type ExperienceEntry = {
    title: string;
    company: string;
    startDate?: string; // YYYY-MM 권장
    endDate?: string;   // YYYY-MM 권장
    description?: string;
  };
  const [expTitle, setExpTitle] = useState('');
  const [expCompany, setExpCompany] = useState('');
  const [expStartDate, setExpStartDate] = useState('');
  const [expEndDate, setExpEndDate] = useState('');
  const [expDescription, setExpDescription] = useState('');
  const [experiences, setExperiences] = useState<ExperienceEntry[]>([]);

  const [certFiles, setCertFiles] = useState<string[]>([]);
  const [portfolioFiles, setPortfolioFiles] = useState<string[]>([]);
  const [portfolioDesc, setPortfolioDesc] = useState('');

  const [rateType, setRateType] = useState<'hourly' | 'daily' | 'project' | ''>('');
  const [hourlyRate, setHourlyRate] = useState('');
  const [dailyRate, setDailyRate] = useState('');
  const [projectRate, setProjectRate] = useState('');

  const regionsList = ['seoul', 'gyeonggi', 'incheon', 'gwangju', 'daegu', 'daejeon', 'busan', 'online'];
  const [regions, setRegions] = useState<string[]>([]);

  const [availabilityDays, setAvailabilityDays] = useState<string[]>([]);
  const [timeSlots, setTimeSlots] = useState<string[]>([]);

  const languages = ['korean', 'english', 'japanese', 'chinese'];
  const [selectedLanguages, setSelectedLanguages] = useState<string[]>([]);
  const [customLanguageInput, setCustomLanguageInput] = useState('');
  const [customLanguages, setCustomLanguages] = useState<string[]>([]);

  // 언어별 자격증 및 사본 파일 관리 (여러 개의 자격증 지원)
  type LangCertFile = { name: string; size?: number; uri?: string };
  type LangCertificate = { 
    certificateName: string; 
    files: LangCertFile[];
    certificateNumber?: string;
    issuingBody?: string;
    issueDate?: string;
    expiryDate?: string;
  };
  type LangCertInfo = { certificates: LangCertificate[] };
  const [languageCerts, setLanguageCerts] = useState<Record<string, LangCertInfo>>({});
  const langCertFileInputRefs = useRef<Record<string, HTMLInputElement | null>>({});

  // 제공 가능 서비스 선택 (인증/컨설팅/교육)
  const serviceOptions = [
    { key: 'certification', label: '인증' },
    { key: 'consulting', label: '컨설팅' },
    { key: 'education', label: '교육' },
  ];
  
  const [services, setServices] = useState<string[]>([]);

  const toggleArray = (arr: string[], setter: (v: string[]) => void, value: string) => {
    if (arr.includes(value)) setter(arr.filter((a) => a !== value));
    else setter([...arr, value]);
  };

  const toggleExpertise = (value: string) => toggleArray(expertise, setExpertise, value);
  const toggleRegion = (value: string) => toggleArray(regions, setRegions, value);
  const toggleAvailabilityDay = (value: string) => toggleArray(availabilityDays, setAvailabilityDays, value);
  const toggleTimeSlot = (value: string) => toggleArray(timeSlots, setTimeSlots, value);
  const toggleLanguage = (value: string) => {
    // 선택/해제 시 언어별 자격증 맵도 동기화
    if (selectedLanguages.includes(value)) {
      setSelectedLanguages(selectedLanguages.filter((a) => a !== value));
      setLanguageCerts((prev) => {
        const { [value]: _omit, ...rest } = prev;
        return rest;
      });
    } else {
      setSelectedLanguages([...selectedLanguages, value]);
      setLanguageCerts((prev) => {
        if (prev[value]) return prev;
        return { ...prev, [value]: { certificates: [] } };
      });
    }
  };
  const addCustomLanguage = () => {
    const v = customLanguageInput.trim();
    if (!v) return Alert.alert('입력 오류', '언어를 입력하세요.');
    // 중복 방지 (기존 옵션과 커스텀 모두 확인)
    if (selectedLanguages.includes(v) || customLanguages.includes(v) || languages.includes(v)) {
      Alert.alert('중복 항목', '이미 추가된 언어입니다.');
      return;
    }
    setCustomLanguages([...customLanguages, v]);
    setLanguageCerts((prev) => ({ ...prev, [v]: { certificates: [] } }));
    setCustomLanguageInput('');
  };
  const removeCustomLanguage = (idx: number) => {
    const lang = customLanguages[idx];
    setCustomLanguages(customLanguages.filter((_, i) => i !== idx));
    setLanguageCerts((prev) => {
      const { [lang]: _omit, ...rest } = prev;
      return rest;
    });
  };
  const toggleService = (value: string) => toggleArray(services, setServices, value);

  // 이전 직장 기능 삭제로 관련 핸들러 제거

  const addExperience = () => {
    const title = expTitle.trim();
    const company = expCompany.trim();
    const startDate = expStartDate.trim();
    const endDate = expEndDate.trim();
    const description = expDescription.trim();

    if (!title || !company) {
      Alert.alert('입력 오류', '직함/역할과 회사명을 입력하세요.');
      return;
    }
    // 간단한 날짜 형식 유효성 (선택 입력)
    const ymRegex = /^\d{4}-(0[1-9]|1[0-2])$/;
    if (startDate && !ymRegex.test(startDate)) {
      Alert.alert('날짜 형식', '시작일은 YYYY-MM 형식으로 입력하세요.');
      return;
    }
    if (endDate && !ymRegex.test(endDate)) {
      Alert.alert('날짜 형식', '종료일은 YYYY-MM 형식으로 입력하세요.');
      return;
    }
    setExperiences([
      ...experiences,
      { title, company, startDate: startDate || undefined, endDate: endDate || undefined, description: description || undefined },
    ]);
    // 입력 초기화
    setExpTitle('');
    setExpCompany('');
    setExpStartDate('');
    setExpEndDate('');
    setExpDescription('');
  };
  const removeExperience = (idx: number) => setExperiences(experiences.filter((_, i) => i !== idx));

  // File upload stubs — replace with real pickers if you add packages
  const handleCertUpload = () => {
    // Simulate file pick
    const name = dummyFileName('pdf');
    setCertFiles([...certFiles, name]);
    Alert.alert('파일 추가', `${name} 파일이 추가되었습니다 (시뮬레이트).`);
  };
  const handlePortfolioUpload = () => {
    const name = dummyFileName('zip');
    setPortfolioFiles([...portfolioFiles, name]);
    Alert.alert('파일 추가', `${name} 파일이 추가되었습니다 (시뮬레이트).`);
  };

  const removeCertFile = (idx: number) => setCertFiles(certFiles.filter((_, i) => i !== idx));
  const removePortfolioFile = (idx: number) => setPortfolioFiles(portfolioFiles.filter((_, i) => i !== idx));

  const onPickPhoto = () => {
    // 로컬 실행을 위해 샘플 이미지를 로컬 에셋으로 설정합니다.
    try {
      const localImg = Images.photoPlaceholder;
      setProfilePhoto(localImg);
      Alert.alert('사진 선택', '로컬 샘플 이미지를 설정했습니다.');
    } catch (e) {
      // 폴백: 기본 이미지 사용
      const fallback = Images.license200;
      setProfilePhoto(fallback);
      Alert.alert('사진 선택', '기본 로컬 이미지를 설정했습니다.');
    }
  };

  const onPickAdditionalPhoto = () => {
    // 로컬 실행을 위해 샘플 이미지를 로컬 에셋으로 추가합니다.
    try {
      const localImg = Images.photoPlaceholder;
      setAdditionalPhotos([...additionalPhotos, localImg]);
      Alert.alert('사진 추가', '로컬 샘플 이미지가 추가되었습니다.');
    } catch (e) {
      const fallback = Images.license200;
      setAdditionalPhotos([...additionalPhotos, fallback]);
      Alert.alert('사진 추가', '기본 로컬 이미지가 추가되었습니다.');
    }
  };

  const removeAdditionalPhoto = (index: number) => {
    setAdditionalPhotos(additionalPhotos.filter((_, i) => i !== index));
  };

  // 언어별 자격증 이름 변경
  const setLanguageCertificateName = (lang: string, name: string) => {
    setLanguageCerts((prev) => {
      const current = prev[lang] || { certificates: [] };
      const certificates = [...current.certificates];

      // 자격증 항목이 없으면 새로 생성하고 이름 설정
      if (certificates.length === 0) {
        certificates.push({ certificateName: name, files: [] });
      } else {
        // 첫 번째 자격증 항목의 이름만 업데이트 (기본 동작)
        certificates[0] = { ...certificates[0], certificateName: name };
      }

      return { ...prev, [lang]: { certificates } };
    });
  };

  // 웹 전용: 언어별 자격증 사본 파일 선택 처리
  const onLanguageCertFileChangeWeb = (lang: string, certIndex: number, e: React.ChangeEvent<HTMLInputElement>) => {
    try {
      const files: File[] = Array.from(e.target?.files || []);
      if (!files.length) return;
      setLanguageCerts((prev) => {
        const current = prev[lang] || { certificates: [] };
        const certificates = [...current.certificates];
        
        // 자격증이 없으면 새로 생성
        if (certificates.length === 0) {
          certificates.push({ certificateName: '', files: [] });
        }
        
        // 지정된 인덱스의 자격증이 없으면 마지막 자격증에 추가
        const targetCertIndex = certIndex < certificates.length ? certIndex : certificates.length - 1;
        const added = files.map((f) => ({ name: f.name, size: f.size, uri: URL.createObjectURL(f) }));
        
        certificates[targetCertIndex] = {
          ...certificates[targetCertIndex],
          files: [...certificates[targetCertIndex].files, ...added]
        };
        
        return {
          ...prev,
          [lang]: { ...current, certificates },
        };
      });
    } catch (err) {
      console.warn('언어 자격증 사본 선택 처리 중 오류:', err);
    } finally {
      if (e?.target) (e.target as HTMLInputElement).value = '';
    }
  };

  const triggerLanguageCertFileSelect = (lang: string, certIndex: number) => {
    if (Platform.OS === 'web') {
      // 해당 언어의 특정 자격증 인덱스를 위한 파일 input 생성 및 클릭
      const input = document.createElement('input');
      input.type = 'file';
      input.multiple = true;
      input.accept = '.pdf,.jpg,.jpeg,.png';
      input.onchange = (e) => onLanguageCertFileChangeWeb(lang, certIndex, e as any);
      input.click();
    } else {
      Alert.alert('안내', '모바일 앱에서는 파일 업로드가 추후 지원될 예정입니다.');
    }
  };

  const removeLanguageCertFile = (lang: string, certIndex: number, fileIndex: number) => {
    setLanguageCerts((prev) => {
      const current = prev[lang];
      if (!current) return prev;
      const certificates = [...current.certificates];
      if (certificates[certIndex]) {
        certificates[certIndex] = {
          ...certificates[certIndex],
          files: certificates[certIndex].files.filter((_, i) => i !== fileIndex)
        };
      }
      return { ...prev, [lang]: { ...current, certificates } };
    });
  };

  // 새로운 자격증 추가
  const addLanguageCertificate = (lang: string) => {
    setLanguageCerts((prev) => {
      const current = prev[lang] || { certificates: [] };
      return {
        ...prev,
        [lang]: {
          ...current,
          certificates: [...current.certificates, { certificateName: '', files: [] }]
        }
      };
    });
  };

  // 자격증 정보 업데이트
  const updateLanguageCertificate = (lang: string, certIndex: number, field: keyof LangCertificate, value: string) => {
    setLanguageCerts((prev) => {
      const current = prev[lang];
      if (!current) return prev;
      const certificates = [...current.certificates];
      if (certificates[certIndex]) {
        certificates[certIndex] = {
          ...certificates[certIndex],
          [field]: value
        };
      }
      return { ...prev, [lang]: { ...current, certificates } };
    });
  };

  // 자격증 삭제
  const removeLanguageCertificate = (lang: string, certIndex: number) => {
    setLanguageCerts((prev) => {
      const current = prev[lang];
      if (!current) return prev;
      const certificates = current.certificates.filter((_, i) => i !== certIndex);
      return { ...prev, [lang]: { ...current, certificates } };
    });
  };

  const validateAndSubmit = () => {
    if (!name.trim() || !introduction.trim() || !experienceYears) {
      Alert.alert('필수 입력', '이름, 자기소개, 경력년수를 입력하세요.');
      return;
    }
    if (expertise.length === 0) {
      Alert.alert('필수 입력', '전문 분야를 하나 이상 선택하세요.');
      return;
    }
    if (!rateType) {
      Alert.alert('필수 입력', '요금 유형을 선택하세요.');
      return;
    }
    // check selected rate amount
    if (rateType === 'hourly' && !hourlyRate) { Alert.alert('요금 입력', '시간당 요금을 입력하세요.'); return; }
    if (rateType === 'daily' && !dailyRate) { Alert.alert('요금 입력', '일당 요금을 입력하세요.'); return; }
    if (rateType === 'project' && !projectRate) { Alert.alert('요금 입력', '프로젝트당 요금을 입력하세요.'); return; }

    const form = {
      profilePhoto,
      additionalPhotos,
      name,
      introduction,
      expertise: expertise.includes('other') ? [...expertise.filter(e => e !== 'other'), otherExpertise] : expertise,
      services,
      experienceYears,
      experiences,
      certFiles,
      portfolioFiles,
      portfolioDesc,
      rate: { type: rateType, hourlyRate, dailyRate, projectRate },
      regions,
      availabilityDays,
      timeSlots,
      languages: [...selectedLanguages, ...customLanguages],
      languageCertificates: Object.entries(languageCerts).map(([lang, info]) => ({
        language: lang,
        certificates: info.certificates.map(cert => ({
          certificateName: cert.certificateName,
          issuingBody: cert.issuingBody,
          issueDate: cert.issueDate,
          files: cert.files.map((f) => ({ name: f.name, size: f.size })),
        })),
      })),
    };

    console.log('Submit Expert:', form);
    Alert.alert('등록 완료', '전문가 등록이 완료되었습니다.', [{ text: '확인', onPress: () => navigation.goBack() }]);
  };

  return (
    <ScrollView style={styles.container} contentContainerStyle={{ paddingBottom: 120 }}>
      {/* Header */}
      <SubformHeader
        title="인증 전문가 등록"
        navigation={navigation as any}
        onHome={() => (navigation as any)?.navigate?.('Home')}
      />

      <View style={styles.formContainer}>
        {/* Profile */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>개인 프로필</Text>
          
          {/* Basic Photo Upload */}
          <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 12 }}>
            <TouchableOpacity onPress={onPickPhoto} style={styles.profilePhotoContainer as any}>
              {profilePhoto ? (
                <Image source={profilePhoto as ImageSourcePropType} style={{ width: 80, height: 80, borderRadius: 40 }} />
              ) : (
                <View style={{ width: 80, height: 80, borderRadius: 40, backgroundColor: '#f0f0f0', alignItems: 'center', justifyContent: 'center' }}>
                  <FontAwesome5 name="camera" size={30} color="#aaa" />
                </View>
              )}
            </TouchableOpacity>
            <View style={{ marginLeft: 12, flex: 1 }}>
              <TouchableOpacity onPress={onPickPhoto} style={{ marginBottom: 8 }}>
                <Text style={{ color: '#0066CC', fontWeight: '600' }}>사진 업로드</Text>
              </TouchableOpacity>
              <Text style={{ fontSize: 12, color: '#999' }}>JPG, PNG (최대 5MB)</Text>
            </View>
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.label}>이름 <Text style={styles.required}>*</Text></Text>
            <TextInput style={styles.input} value={name} onChangeText={setName} placeholder="이름을 입력하세요" />
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.label}>자기소개 <Text style={styles.required}>*</Text></Text>
            <TextInput style={[styles.input, styles.textArea]} value={introduction} onChangeText={setIntroduction} placeholder="전문 분야와 경력에 대한 자기소개를 입력하세요" multiline numberOfLines={4} />
          </View>
          
          {/* Additional Photos Section */}
          <View style={styles.inputGroup}>
            <Text style={styles.label}>추가 사진</Text>
            <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: 10 }}>
              {additionalPhotos.map((photo, index) => (
                <View key={index} style={{ position: 'relative' }}>
                  <Image source={photo as ImageSourcePropType} style={{ width: 80, height: 80, borderRadius: 8 }} />
                  <TouchableOpacity 
                    onPress={() => removeAdditionalPhoto(index)}
                    style={{ 
                      position: 'absolute', 
                      top: -8, 
                      right: -8, 
                      backgroundColor: '#e74c3c', 
                      borderRadius: 12, 
                      width: 24, 
                      height: 24, 
                      alignItems: 'center', 
                      justifyContent: 'center' 
                    }}
                  >
                    <FontAwesome5 name="times" size={14} color="#fff" />
                  </TouchableOpacity>
                </View>
              ))}
              <TouchableOpacity 
                onPress={onPickAdditionalPhoto}
                style={{ 
                  width: 80, 
                  height: 80, 
                  borderRadius: 8, 
                  backgroundColor: '#f0f0f0', 
                  alignItems: 'center', 
                  justifyContent: 'center',
                  borderWidth: 1,
                  borderColor: '#ddd',
                  borderStyle: 'dashed'
                }}
              >
                <FontAwesome5 name="plus" size={24} color="#aaa" />
              </TouchableOpacity>
            </View>
            <Text style={{ fontSize: 12, color: '#999', marginTop: 5 }}>여러 장의 사진을 추가할 수 있습니다 (최대 5MB)</Text>
          </View>
        </View>

        

        {/* Expertise */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>전문 분야 선택</Text>
          <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: 8 }}>
            {expertiseOptions.map((opt) => (
              <TouchableOpacity
                key={opt}
                onPress={() => toggleExpertise(opt)}
                style={{
                  paddingVertical: 8,
                  paddingHorizontal: 12,
                  borderRadius: 20,
                  borderWidth: 1,
                  borderColor: expertise.includes(opt) ? '#0066CC' : '#e9ecef',
                  backgroundColor: expertise.includes(opt) ? '#0066CC' : '#f8f9fa',
                  marginRight: 8,
                  marginBottom: 8,
                }}
              >
                <Text style={{ color: expertise.includes(opt) ? '#fff' : '#333' }}>{opt === 'isms-p' ? 'ISMS-P' : opt.toUpperCase()}</Text>
              </TouchableOpacity>
            ))}
          </View>

          {expertise.includes('other') ? (
            <View style={{ marginTop: 10 }}>
              <TextInput style={styles.input} value={otherExpertise} onChangeText={setOtherExpertise} placeholder="기타 전문 분야를 입력하세요" />
            </View>
          ) : null}

          {/* 제공서비스: 인증/컨설팅/교육 선택 */}
          <View style={{ marginTop: 12 }}>
            <Text style={styles.label}>제공서비스</Text>
            <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: 8 }}>
              {serviceOptions.map((opt) => (
                <TouchableOpacity
                  key={opt.key}
                  onPress={() => toggleService(opt.key)}
                  style={{
                    paddingVertical: 8,
                    paddingHorizontal: 12,
                    borderRadius: 20,
                    borderWidth: 1,
                    borderColor: services.includes(opt.key) ? '#0066CC' : '#e9ecef',
                    backgroundColor: services.includes(opt.key) ? '#0066CC' : '#f8f9fa',
                    marginRight: 8,
                    marginBottom: 8,
                  }}
                >
                  <Text style={{ color: services.includes(opt.key) ? '#fff' : '#333' }}>{opt.label}</Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>
        </View>

        {/* Career */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>경력 정보</Text>
          <View style={styles.inputGroup}>
            <Text style={styles.label}>경력년수 <Text style={styles.required}>*</Text></Text>
            <TextInput style={styles.input} value={experienceYears} onChangeText={setExperienceYears} placeholder="예: 3~5년" />
          </View>

          {/* 이전 직장 입력 섹션 제거됨 */}

          {/* 상세 경력 추가 */}
          <View style={styles.inputGroup}>
            <Text style={styles.label}>상세 경력 추가</Text>
            <TextInput
              style={styles.input}
              value={expTitle}
              onChangeText={setExpTitle}
              placeholder="직함/역할 (예: 보안 컨설턴트)"
            />
            <TextInput
              style={[styles.input, { marginTop: 8 }]}
              value={expCompany}
              onChangeText={setExpCompany}
              placeholder="회사명 (예: ABC 컨설팅)"
            />
            <View style={{ flexDirection: 'row', gap: 8, marginTop: 8 }}>
              <TextInput
                style={[styles.input, { flex: 1 }]}
                value={expStartDate}
                onChangeText={setExpStartDate}
                placeholder="시작일 (YYYY-MM)"
              />
              <TextInput
                style={[styles.input, { flex: 1 }]}
                value={expEndDate}
                onChangeText={setExpEndDate}
                placeholder="종료일 (YYYY-MM)"
              />
            </View>
            <TextInput
              style={[styles.input, styles.textArea, { marginTop: 8 }]}
              value={expDescription}
              onChangeText={setExpDescription}
              placeholder="경력 상세 설명 (담당 업무, 성과 등)"
              multiline
              numberOfLines={3}
            />
            <View style={{ flexDirection: 'row', justifyContent: 'flex-end', marginTop: 8 }}>
              <TouchableOpacity onPress={addExperience} style={{ backgroundColor: '#28a745', paddingVertical: 10, paddingHorizontal: 14, borderRadius: 6 }}>
                <Text style={{ color: '#fff', fontWeight: '600' }}>추가</Text>
              </TouchableOpacity>
            </View>

            {/* 추가된 상세 경력 목록 */}
            {experiences.length > 0 && (
              <View style={{ marginTop: 12 }}>
                {experiences.map((exp, idx) => (
                  <View key={idx} style={{ padding: 10, backgroundColor: '#f8f9fa', borderRadius: 8, marginBottom: 8, borderWidth: 1, borderColor: '#e9ecef' }}>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                      <Text style={{ fontWeight: '600' }}>{exp.title} · {exp.company}</Text>
                      <TouchableOpacity onPress={() => removeExperience(idx)}>
                        <FontAwesome5 name="times" size={14} color="#e74c3c" />
                      </TouchableOpacity>
                    </View>
                    <Text style={{ color: '#666', marginTop: 4 }}>
                      {(exp.startDate || exp.endDate) ? `${exp.startDate || ''} ~ ${exp.endDate || ''}` : '기간 미입력'}
                    </Text>
                    {exp.description ? (
                      <Text style={{ marginTop: 6 }}>{exp.description}</Text>
                    ) : null}
                  </View>
                ))}
              </View>
            )}
          </View>
        </View>

        {/* Certification Upload */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>자격증 업로드</Text>
          <TouchableOpacity onPress={handleCertUpload} style={styles.fileUpload as any}>
            <FontAwesome5 name="file-upload" size={24} color="#4a6fdc" />
            <Text style={{ marginTop: 8 }}>클릭하여 파일 업로드</Text>
            <Text style={{ fontSize: 12, color: '#999' }}>PDF, JPG, PNG (최대 10MB)</Text>
          </TouchableOpacity>

          <View style={{ marginTop: 10 }}>
            {certFiles.map((f, i) => (
              <View key={i} style={{ flexDirection: 'row', justifyContent: 'space-between', padding: 8, backgroundColor: '#f8f9fa', borderRadius: 6, marginBottom: 8 }}>
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                  <FontAwesome5 name="file-pdf" size={16} color="#4a6fdc" style={{ marginRight: 8 }} />
                  <Text>{f}</Text>
                </View>
                <TouchableOpacity onPress={() => removeCertFile(i)}>
                  <FontAwesome5 name="times" size={14} color="#e74c3c" />
                </TouchableOpacity>
              </View>
            ))}
          </View>
        </View>

        {/* Portfolio */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>포트폴리오/성공사례</Text>
          <View style={styles.inputGroup}>
            <Text style={styles.label}>성공사례 설명</Text>
            <TextInput style={[styles.input, styles.textArea]} value={portfolioDesc} onChangeText={setPortfolioDesc} multiline numberOfLines={4} placeholder="주요 성공사례나 포트폴리오에 대한 설명을 입력하세요" />
          </View>

          <TouchableOpacity onPress={handlePortfolioUpload} style={styles.fileUpload as any}>
            <FontAwesome5 name="file-upload" size={24} color="#4a6fdc" />
            <Text style={{ marginTop: 8 }}>포트폴리오 파일 업로드</Text>
            <Text style={{ fontSize: 12, color: '#999' }}>PDF, PPT, 이미지 파일 (최대 20MB)</Text>
          </TouchableOpacity>

          <View style={{ marginTop: 10 }}>
            {portfolioFiles.map((f, i) => (
              <View key={i} style={{ flexDirection: 'row', justifyContent: 'space-between', padding: 8, backgroundColor: '#f8f9fa', borderRadius: 6, marginBottom: 8 }}>
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                  <FontAwesome5 name="file" size={16} color="#4a6fdc" style={{ marginRight: 8 }} />
                  <Text>{f}</Text>
                </View>
                <TouchableOpacity onPress={() => removePortfolioFile(i)}>
                  <FontAwesome5 name="times" size={14} color="#e74c3c" />
                </TouchableOpacity>
              </View>
            ))}
          </View>
        </View>

        {/* Rate */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>요금 정보</Text>

          <View style={{ flexDirection: 'row', gap: 8, marginBottom: 12, flexWrap: 'wrap' }}>
            <TouchableOpacity onPress={() => setRateType('hourly')} style={{ padding: 8, borderRadius: 20, borderWidth: 1, borderColor: rateType === 'hourly' ? '#0066CC' : '#e9ecef', backgroundColor: rateType === 'hourly' ? '#0066CC' : '#f8f9fa' }}>
              <Text style={{ color: rateType === 'hourly' ? '#fff' : '#333' }}>시간당</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => setRateType('daily')} style={{ padding: 8, borderRadius: 20, borderWidth: 1, borderColor: rateType === 'daily' ? '#0066CC' : '#e9ecef', backgroundColor: rateType === 'daily' ? '#0066CC' : '#f8f9fa' }}>
              <Text style={{ color: rateType === 'daily' ? '#fff' : '#333' }}>일당</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => setRateType('project')} style={{ padding: 8, borderRadius: 20, borderWidth: 1, borderColor: rateType === 'project' ? '#0066CC' : '#e9ecef', backgroundColor: rateType === 'project' ? '#0066CC' : '#f8f9fa' }}>
              <Text style={{ color: rateType === 'project' ? '#fff' : '#333' }}>프로젝트당</Text>
            </TouchableOpacity>
          </View>

          {rateType === 'hourly' && <TextInput style={styles.input} value={hourlyRate} onChangeText={setHourlyRate} placeholder="시간당 요금을 입력하세요 (예: 10만원)" />}
          {rateType === 'daily' && <TextInput style={styles.input} value={dailyRate} onChangeText={setDailyRate} placeholder="일당 요금을 입력하세요 (예: 100만원)" />}
          {rateType === 'project' && <TextInput style={styles.input} value={projectRate} onChangeText={setProjectRate} placeholder="프로젝트당 요금을 입력하세요 (예: 1,000만원)" />}
        </View>

        {/* Regions */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>가능 지역 선택</Text>
          <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: 8 }}>
            {regionsList.map((r) => (
              <TouchableOpacity key={r} onPress={() => toggleRegion(r)} style={{ padding: 8, borderRadius: 20, borderWidth: 1, borderColor: regions.includes(r) ? '#0066CC' : '#e9ecef', backgroundColor: regions.includes(r) ? '#0066CC' : '#f8f9fa' }}>
                <Text style={{ color: regions.includes(r) ? '#fff' : '#333' }}>{r}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Availability */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>가능 시간대 설정</Text>
          <Text style={[styles.label]}>요일</Text>
          <View style={{ flexDirection: 'row', gap: 8, marginBottom: 12 }}>
            <TouchableOpacity onPress={() => toggleAvailabilityDay('weekday')} style={{ padding: 8, borderRadius: 20, borderWidth: 1, borderColor: availabilityDays.includes('weekday') ? '#0066CC' : '#e9ecef', backgroundColor: availabilityDays.includes('weekday') ? '#0066CC' : '#f8f9fa' }}>
              <Text style={{ color: availabilityDays.includes('weekday') ? '#fff' : '#333' }}>평일</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => toggleAvailabilityDay('weekend')} style={{ padding: 8, borderRadius: 20, borderWidth: 1, borderColor: availabilityDays.includes('weekend') ? '#0066CC' : '#e9ecef', backgroundColor: availabilityDays.includes('weekend') ? '#0066CC' : '#f8f9fa' }}>
              <Text style={{ color: availabilityDays.includes('weekend') ? '#fff' : '#333' }}>주말</Text>
            </TouchableOpacity>
          </View>

          <Text style={[styles.label]}>시간대</Text>
          <View style={{ flexDirection: 'row', gap: 8, marginBottom: 12 }}>
            <TouchableOpacity onPress={() => toggleTimeSlot('morning')} style={{ padding: 8, borderRadius: 20, borderWidth: 1, borderColor: timeSlots.includes('morning') ? '#0066CC' : '#e9ecef', backgroundColor: timeSlots.includes('morning') ? '#0066CC' : '#f8f9fa' }}>
              <Text style={{ color: timeSlots.includes('morning') ? '#fff' : '#333' }}>오전 (09:00-12:00)</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => toggleTimeSlot('afternoon')} style={{ padding: 8, borderRadius: 20, borderWidth: 1, borderColor: timeSlots.includes('afternoon') ? '#0066CC' : '#e9ecef', backgroundColor: timeSlots.includes('afternoon') ? '#0066CC' : '#f8f9fa' }}>
              <Text style={{ color: timeSlots.includes('afternoon') ? '#fff' : '#333' }}>오후 (12:00-18:00)</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => toggleTimeSlot('evening')} style={{ padding: 8, borderRadius: 20, borderWidth: 1, borderColor: timeSlots.includes('evening') ? '#0066CC' : '#e9ecef', backgroundColor: timeSlots.includes('evening') ? '#0066CC' : '#f8f9fa' }}>
              <Text style={{ color: timeSlots.includes('evening') ? '#fff' : '#333' }}>저녁 (18:00-21:00)</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Languages */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>언어 능력</Text>
          <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: 8 }}>
            {languages.map((l) => (
              <TouchableOpacity key={l} onPress={() => toggleLanguage(l)} style={{ padding: 8, borderRadius: 20, borderWidth: 1, borderColor: selectedLanguages.includes(l) ? '#0066CC' : '#e9ecef', backgroundColor: selectedLanguages.includes(l) ? '#0066CC' : '#f8f9fa' }}>
                <Text style={{ color: selectedLanguages.includes(l) ? '#fff' : '#333' }}>{l === 'korean' ? '한국어' : l}</Text>
              </TouchableOpacity>
            ))}
          </View>

          {/* 커스텀 언어 추가 */}
          <View style={[styles.inputGroup, { marginTop: 12 }]}>
            <Text style={styles.label}>언어 추가</Text>
            <View style={{ flexDirection: 'row', gap: 8 }}>
              <TextInput style={[styles.input, { flex: 1 }]} value={customLanguageInput} onChangeText={setCustomLanguageInput} placeholder="예: spanish, french" />
              <TouchableOpacity onPress={addCustomLanguage} style={{ backgroundColor: '#28a745', padding: 10, borderRadius: 6, justifyContent: 'center' }}>
                <FontAwesome5 name="plus" size={14} color="#fff" />
              </TouchableOpacity>
            </View>

            {/* 커스텀 언어 태그 표시 */}
            {customLanguages.length > 0 && (
              <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: 8, marginTop: 10 }}>
                {customLanguages.map((w, i) => (
                  <Tag key={`${w}-${i}`} label={w} onRemove={() => removeCustomLanguage(i)} />
                ))}
              </View>
            )}
          </View>

          {/* 언어별 자격증 및 사본 업로드 */}
          {([...selectedLanguages, ...customLanguages].length > 0) && (
            <View style={{ marginTop: 12 }}>
              {([...selectedLanguages, ...customLanguages]).map((lang) => {
                const info = languageCerts[lang] || { certificates: [] };
                const displayLabel = lang === 'korean' ? '한국어' : lang;
                return (
                  <View key={`lang-cert-${lang}`} style={[styles.inputGroup, { marginBottom: 16 }]}>
                    <Text style={styles.label}>{displayLabel} 자격증</Text>
                    
                    {/* 기존 자격증 목록 */}
                    {info.certificates.map((cert, certIndex) => (
                      <View key={`${lang}-cert-${certIndex}`} style={{ 
                          borderWidth: 1, 
                          borderColor: '#e9ecef', 
                          borderRadius: 8, 
                          padding: 12, 
                          marginBottom: 12,
                          backgroundColor: '#f8f9fa'
                        }}>
                          <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 }}>
                            <Text style={{ fontWeight: '600', color: '#495057' }}>자격증 {certIndex + 1}</Text>
                            <TouchableOpacity onPress={() => removeLanguageCertificate(lang, certIndex)}>
                              <FontAwesome5 name="times" size={16} color="#e74c3c" />
                            </TouchableOpacity>
                          </View>
                          
                          <TextInput
                            style={[styles.input, { marginBottom: 8 }]}
                            value={cert.certificateName}
                            onChangeText={(v) => updateLanguageCertificate(lang, certIndex, 'certificateName', v)}
                            placeholder="예: TOEIC 900, IELTS 7.0, JLPT N2"
                          />
                          
                          <TextInput
                            style={[styles.input, { marginBottom: 8 }]}
                            value={cert.issuingBody || ''}
                            onChangeText={(v) => updateLanguageCertificate(lang, certIndex, 'issuingBody', v)}
                            placeholder="발급기관"
                          />
                          
                          <TextInput
                            style={[styles.input, { marginBottom: 8 }]}
                            value={cert.issueDate || ''}
                            onChangeText={(v) => updateLanguageCertificate(lang, certIndex, 'issueDate', v)}
                            placeholder="발급일 (YYYY-MM-DD)"
                          />
                          
                          <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 8 }}>
                            <TouchableOpacity 
                              onPress={() => triggerLanguageCertFileSelect(lang, certIndex)} 
                              style={{ backgroundColor: '#0066CC', paddingVertical: 8, paddingHorizontal: 12, borderRadius: 6 }}
                            >
                              <Text style={{ color: '#fff', fontWeight: '600', fontSize: 12 }}>사본 업로드</Text>
                            </TouchableOpacity>
                            <Text style={{ fontSize: 11, color: '#999', marginLeft: 8 }}>PDF, JPG, JPEG, PNG</Text>
                          </View>
                        
                        {/* 선택된 파일 목록 */}
                        {cert.files.length > 0 && (
                          <View style={{ marginTop: 8 }}>
                            {cert.files.map((f, fileIndex) => (
                              <View key={`${lang}-file-${certIndex}-${fileIndex}`} style={{ 
                                flexDirection: 'row', 
                                alignItems: 'center', 
                                justifyContent: 'space-between', 
                                paddingVertical: 6,
                                paddingHorizontal: 8,
                                backgroundColor: '#fff',
                                borderRadius: 4,
                                marginBottom: 4
                              }}>
                                <View style={{ flexDirection: 'row', alignItems: 'center', flex: 1 }}>
                                  <FontAwesome5 name="file" size={12} color="#4a6fdc" style={{ marginRight: 8 }} />
                                  <Text style={{ color: '#333', fontSize: 12, flex: 1 }} numberOfLines={1}>{f.name}</Text>
                                </View>
                                <TouchableOpacity onPress={() => removeLanguageCertFile(lang, certIndex, fileIndex)}>
                                  <FontAwesome5 name="times" size={12} color="#e74c3c" />
                                </TouchableOpacity>
                              </View>
                            ))}
                          </View>
                        )}
                      </View>
                    ))}
                    
                    {/* 새 자격증 추가 버튼 */}
                    <TouchableOpacity 
                      onPress={() => addLanguageCertificate(lang)} 
                      style={{ 
                        backgroundColor: '#28a745', 
                        paddingVertical: 8, 
                        paddingHorizontal: 12, 
                        borderRadius: 6,
                        alignSelf: 'flex-start'
                      }}
                    >
                      <Text style={{ color: '#fff', fontWeight: '600', fontSize: 12 }}>+ 자격증 추가</Text>
                    </TouchableOpacity>
                  </View>
                );
              })}
            </View>
          )}
        </View>

        {/* Submit */}
        <TouchableOpacity style={[styles.submitButton, { marginTop: 10 }]} onPress={validateAndSubmit}>
          <Text style={styles.submitButtonText}>등록하기</Text>
        </TouchableOpacity>

      </View>
    </ScrollView>
  );
};

export default ExpertRecruitmentFromMockup;
