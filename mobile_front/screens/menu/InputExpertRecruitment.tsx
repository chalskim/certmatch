import React, { useState, useRef } from 'react';
import { View, Text, TextInput, ScrollView, TouchableOpacity, Alert, Switch, Platform, Image } from 'react-native';
import { FontAwesome5 } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { styles } from '../styles/menu/InputExpertRecruitment';
import { useUser } from '../../contexts/UserContext';
import SubformHeader from '../components/SubformHeader';

// 인증 인력모집 등록 화면 (mokup/01. 인증 인력모집 등록.html RN/TSX 변환)
export const InputExpertRecruitment: React.FC = () => {
  const navigation = useNavigation();
  const { user, isAuthenticated } = useUser();

  // Form states
  const [position, setPosition] = useState('');
  const [experience, setExperience] = useState('');
  const [education, setEducation] = useState('');
  const [requirements, setRequirements] = useState('');
  const [preferences, setPreferences] = useState('');
  const [certType, setCertType] = useState<string[]>([]);
  const [salaryType, setSalaryType] = useState('');
  const [salaryRange, setSalaryRange] = useState('');
  const [employmentType, setEmploymentType] = useState('');
  const [workHours, setWorkHours] = useState('');
  const [workDays, setWorkDays] = useState('');
  const [workLocation, setWorkLocation] = useState('');
  const [deadline, setDeadline] = useState('');
  const [isUrgent, setIsUrgent] = useState(false);
  const [mainTasks, setMainTasks] = useState('');
  const [projectDetails, setProjectDetails] = useState('');
  const [benefits, setBenefits] = useState<string[]>([]);
  // Custom benefits
  const [customBenefitInput, setCustomBenefitInput] = useState('');
  const [customBenefits, setCustomBenefits] = useState<string[]>([]);
  // Custom certifications/qualifications
  const [customCertInput, setCustomCertInput] = useState('');
  const [customCerts, setCustomCerts] = useState<string[]>([]);

  // 기술 스택
  const [techStack, setTechStack] = useState<string[]>([]);
  const [customTechInput, setCustomTechInput] = useState('');
  const [customTechs, setCustomTechs] = useState<string[]>([]);

  // 사무실 이미지
  const [officeImages, setOfficeImages] = useState<{ name: string; size?: number; uri?: string }[]>([]);
  const officeImageInputRef = useRef<HTMLInputElement | null>(null);

  // 회사 정보
  const [companyName, setCompanyName] = useState('');
  const [companyWebsite, setCompanyWebsite] = useState('');
  const [companyFounded, setCompanyFounded] = useState('');
  const [companySize, setCompanySize] = useState('');
  const [isCompanyVerified, setIsCompanyVerified] = useState(false);

  // 회사 정보 입력 방식: 등록된 정보 이용 | 이미지 등록 | 직접입력
  const [companyInfoMode, setCompanyInfoMode] = useState<'registered' | 'image' | 'manual'>('manual');
  // 회사 소개 이미지 등록(회사 정보용)
  const [companyInfoImages, setCompanyInfoImages] = useState<{ name: string; size?: number; uri?: string }[]>([]);
  const companyInfoImageInputRef = useRef<HTMLInputElement | null>(null);

  // 1:1 문의 설정
  const [inquiryEnabled, setInquiryEnabled] = useState(true);

  // 모집 상태
  const [postingStatus, setPostingStatus] = useState<'draft' | 'active' | 'closed'>('draft');

  // 자격요건 상태
  const [experienceLevel, setExperienceLevel] = useState<string[]>([]);
  const [academicLevel, setAcademicLevel] = useState<string[]>([]);
  const [majorFields, setMajorFields] = useState<string[]>([]);
  const [technicalSkills, setTechnicalSkills] = useState<string[]>([]);
  const [languageSkills, setLanguageSkills] = useState<string[]>([]);
  const [additionalQuals, setAdditionalQuals] = useState<string[]>([]);

  // Web-only file inputs
  const [companyIntroFiles, setCompanyIntroFiles] = useState<{ name: string; size?: number }[]>([]);
  const [documentFiles, setDocumentFiles] = useState<{ name: string; size?: number }[]>([]);
  const companyFileInputRef = useRef<HTMLInputElement | null>(null);
  const documentFileInputRef = useRef<HTMLInputElement | null>(null);

  // Certification options
  const certOptions = [
    { label: 'ISMS-P', value: 'isms-p' },
    { label: 'ISO 27001', value: 'iso27001' },
    { label: 'ISO 27701', value: 'iso27701' },
    { label: 'GS 인증', value: 'gs' },
    { label: 'CPPG', value: 'cppg' },
    { label: 'CISP', value: 'cisp' },
    { label: 'CISSP', value: 'cissp' },
    { label: '기타', value: 'other' },
  ];

  // Employment type options
  const employmentOptions = [
    { label: '정규직', value: 'full-time' },
    { label: '계약직', value: 'contract' },
    { label: '프리랜서', value: 'freelance' },
    { label: '인턴', value: 'intern' },
    { label: '프로젝트', value: 'project' },
  ];

  // Benefit options
  const benefitOptions = [
    { label: '4대 보험', value: 'four-insurance' },
    { label: '퇴직금', value: 'retirement' },
    { label: '성과급', value: 'bonus' },
    { label: '연차', value: 'vacation' },
    { label: '유연근무제', value: 'flexible' },
    { label: '재택근무', value: 'remote' },
  ];

  // Tech stack options
  const techOptions = [
    { label: 'Python', value: 'python' },
    { label: 'JavaScript', value: 'javascript' },
    { label: 'TypeScript', value: 'typescript' },
    { label: 'React', value: 'react' },
    { label: 'Node.js', value: 'nodejs' },
    { label: 'Java', value: 'java' },
    { label: 'Spring', value: 'spring' },
    { label: 'Docker', value: 'docker' },
    { label: 'Kubernetes', value: 'kubernetes' },
    { label: 'AWS', value: 'aws' },
    { label: 'PostgreSQL', value: 'postgresql' },
    { label: 'MongoDB', value: 'mongodb' },
    { label: 'Git', value: 'git' },
    { label: 'CI/CD', value: 'cicd' },
  ];

  // Toggle certification selection
  const toggleCertification = (value: string) => {
    if (certType.includes(value)) {
      setCertType(certType.filter((type) => type !== value));
    } else {
      setCertType([...certType, value]);
    }
  };

  // Add custom certification/qualification
  const addCustomCertification = () => {
    const name = customCertInput.trim();
    if (!name) return;
    if (customCerts.includes(name)) {
      Alert.alert('중복 항목', '이미 추가된 인증/자격입니다.');
      return;
    }
    setCustomCerts([...customCerts, name]);
    setCustomCertInput('');
  };

  const removeCustomCertification = (name: string) => {
    setCustomCerts(customCerts.filter((c) => c !== name));
  };

  // Toggle benefit selection
  const toggleBenefit = (value: string) => {
    if (benefits.includes(value)) {
      setBenefits(benefits.filter((benefit) => benefit !== value));
    } else {
      setBenefits([...benefits, value]);
    }
  };

  // Add/Remove custom benefits
  const addCustomBenefit = () => {
    const name = customBenefitInput.trim();
    if (!name) return;
    if (customBenefits.includes(name)) {
      Alert.alert('중복 항목', '이미 추가된 복지사항입니다.');
      return;
    }
    setCustomBenefits([...customBenefits, name]);
    setCustomBenefitInput('');
  };

  const removeCustomBenefit = (name: string) => {
    setCustomBenefits(customBenefits.filter((b) => b !== name));
  };

  // Web-only: file input change handlers
  const onCompanyFileChangeWeb = (e: React.ChangeEvent<HTMLInputElement>) => {
    try {
      const files: File[] = Array.from(e.target?.files || []);
      if (!files.length) return;
      setCompanyIntroFiles((prev: { name: string; size?: number }[]) => [
        ...prev,
        ...files.map((f: File) => ({ name: f.name, size: f.size })),
      ]);
    } catch (err) {
      console.warn('회사 소개 파일 선택 처리 중 오류:', err);
    } finally {
      if (e?.target) (e.target as HTMLInputElement).value = '';
    }
  };

  const onDocumentFileChangeWeb = (e: React.ChangeEvent<HTMLInputElement>) => {
    try {
      const files: File[] = Array.from(e.target?.files || []);
      if (!files.length) return;
      setDocumentFiles((prev: { name: string; size?: number }[]) => [
        ...prev,
        ...files.map((f: File) => ({ name: f.name, size: f.size })),
      ]);
    } catch (err) {
      console.warn('상세 정보 파일 선택 처리 중 오류:', err);
    } finally {
      if (e?.target) (e.target as HTMLInputElement).value = '';
    }
  };

  const removeCompanyFile = (name: string) => {
    setCompanyIntroFiles((prev: { name: string; size?: number }[]) => prev.filter((f) => f.name !== name));
  };

  const removeDocumentFile = (name: string) => {
    setDocumentFiles((prev: { name: string; size?: number }[]) => prev.filter((f) => f.name !== name));
  };

  // 기술 스택 토글
  const toggleTechStack = (value: string) => {
    if (techStack.includes(value)) {
      setTechStack(techStack.filter((tech) => tech !== value));
    } else {
      setTechStack([...techStack, value]);
    }
  };

  // 사용자 정의 기술 스택 추가
  const addCustomTech = () => {
    const name = customTechInput.trim();
    if (!name) return;
    if (customTechs.includes(name)) {
      Alert.alert('중복 항목', '이미 추가된 기술 스택입니다.');
      return;
    }
    setCustomTechs([...customTechs, name]);
    setCustomTechInput('');
  };

  const removeCustomTech = (name: string) => {
    setCustomTechs(customTechs.filter((t) => t !== name));
  };

  // 사무실 이미지 관리
  const onOfficeImageChangeWeb = (e: React.ChangeEvent<HTMLInputElement>) => {
    try {
      const files: File[] = Array.from(e.target?.files || []);
      if (!files.length) return;
      if (files.length > 2) {
        Alert.alert('안내', '사무실 이미지는 최대 2개까지 업로드할 수 있습니다.');
        return;
      }
      setOfficeImages((prev) => [
        ...prev,
        ...files.map((f: File) => ({ name: f.name, size: f.size, uri: URL.createObjectURL(f) })),
      ]);
    } catch (err) {
      console.warn('사무실 이미지 선택 처리 중 오류:', err);
    } finally {
      if (e?.target) (e.target as HTMLInputElement).value = '';
    }
  };

  const removeOfficeImage = (name: string) => {
    setOfficeImages((prev) => prev.filter((img) => img.name !== name));
  };

  const triggerOfficeImageSelect = () => {
    if (Platform.OS === 'web') {
      officeImageInputRef.current?.click();
    } else {
      Alert.alert('안내', '모바일 앱에서는 이미지 업로드가 추후 지원될 예정입니다.');
    }
  };

  const triggerCompanyFileSelect = () => {
    if (Platform.OS === 'web') {
      companyFileInputRef.current?.click();
    } else {
      Alert.alert('안내', '모바일 앱에서는 파일 업로드가 추후 지원될 예정입니다.');
    }
  };

  const triggerDocumentFileSelect = () => {
    if (Platform.OS === 'web') {
      documentFileInputRef.current?.click();
    } else {
      Alert.alert('안내', '모바일 앱에서는 파일 업로드가 추후 지원될 예정입니다.');
    }
  };

  // 회사 정보용 이미지 관리
  const onCompanyInfoImageChangeWeb = (e: React.ChangeEvent<HTMLInputElement>) => {
    try {
      const files: File[] = Array.from(e.target?.files || []);
      if (!files.length) return;
      if (files.length > 2) {
        Alert.alert('안내', '회사 소개 이미지는 최대 2개까지 업로드할 수 있습니다.');
        return;
      }
      setCompanyInfoImages((prev) => [
        ...prev,
        ...files.map((f: File) => ({ name: f.name, size: f.size, uri: URL.createObjectURL(f) })),
      ]);
    } catch (err) {
      console.warn('회사 소개 이미지 선택 처리 중 오류:', err);
    } finally {
      if (e?.target) (e.target as HTMLInputElement).value = '';
    }
  };

  const removeCompanyInfoImage = (name: string) => {
    setCompanyInfoImages((prev) => prev.filter((img) => img.name !== name));
  };

  const triggerCompanyInfoImageSelect = () => {
    if (Platform.OS === 'web') {
      companyInfoImageInputRef.current?.click();
    } else {
      Alert.alert('안내', '모바일 앱에서는 이미지 업로드가 추후 지원될 예정입니다.');
    }
  };

  // Handle form submission
  const handleSubmit = () => {
    // Validation
    if (
      !position ||
      !experience ||
      !education ||
      !requirements ||
      !salaryType ||
      !salaryRange ||
      !employmentType ||
      !deadline ||
      !mainTasks
    ) {
      Alert.alert('필수 정보 누락', '모든 필수 정보를 입력해주세요.');
      return;
    }

    // Submit data
    // 회사 정보 소스 구성
    let companyInfo: any = null;
    if (companyInfoMode === 'manual') {
      companyInfo = {
        source: 'manual',
        name: companyName,
        website: companyWebsite,
        founded: companyFounded,
        size: companySize,
        verified: isCompanyVerified,
      };
    } else if (companyInfoMode === 'registered') {
      if (!isAuthenticated || !user || user.role !== 'company') {
        Alert.alert('안내', '기업(회사) 회원만 등록된 회사 정보를 사용할 수 있습니다. 직접입력 또는 이미지 등록을 선택해주세요.');
      }
      companyInfo = {
        source: 'registered',
        name: user?.name || companyName || '',
        // 등록된 데이터에 웹사이트/설립연도/직원 수가 없을 수 있어 비워둘 수 있습니다
        website: companyWebsite || '',
        founded: companyFounded || '',
        size: companySize || '',
        verified: isCompanyVerified,
      };
    } else if (companyInfoMode === 'image') {
      companyInfo = {
        source: 'image',
        images: companyInfoImages.map((img) => ({ name: img.name, size: img.size })),
      };
    }

    const formData = {
      position,
      experience,
      education,
      requirements,
      preferences,
      certifications: [...certType, ...customCerts],
      techStack: [...techStack, ...customTechs],
      salary: {
        type: salaryType,
        range: salaryRange,
      },
      employment: {
        type: employmentType,
        workHours,
        workDays,
        location: workLocation,
      },
      deadline,
      isUrgent,
      tasks: {
        main: mainTasks,
        projectDetails,
      },
      benefits: [...benefits, ...customBenefits],
      officeImages: officeImages.map((img) => ({ name: img.name, size: img.size })),
      companyInfoMode,
      company: companyInfo,
      inquiryEnabled,
      status: postingStatus,
      attachments: {
        companyIntro: companyIntroFiles.map((f) => ({ name: f.name, size: f.size })),
        documents: documentFiles.map((f) => ({ name: f.name, size: f.size })),
      },
    };

    console.log('Recruitment Form Data:', formData);
    Alert.alert('등록 완료', '인증 전문가 모집 정보가 등록되었습니다.', [
      {
        text: '확인',
        onPress: () => (navigation as any).goBack?.(),
      },
    ]);
  };

  return (
    <ScrollView style={styles.container}>
      {/* Header */}
      <SubformHeader title="인력모집 등록" navigation={navigation as any} onHome={() => (navigation as any)?.navigate?.('Home')} />

      {/* Form Container */}
      <View style={styles.formContainer}>
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>회사 정보 입력 방식</Text>
          <View style={{ flexDirection: 'row', flexWrap: 'wrap', marginTop: 6 }}>
            {[
              { label: '등록된 정보 이용', value: 'registered' },
              { label: '이미지 등록', value: 'image' },
              { label: '직접입력', value: 'manual' },
            ].map((m) => (
              <TouchableOpacity key={m.value} onPress={() => setCompanyInfoMode(m.value as any)} style={{ paddingVertical: 8, paddingHorizontal: 12, borderRadius: 16, borderWidth: 1, borderColor: companyInfoMode === m.value ? '#0066CC' : '#ddd', backgroundColor: companyInfoMode === m.value ? '#EAF3FF' : 'transparent', marginRight: 8, marginBottom: 8 }}>
                <Text style={{ color: companyInfoMode === m.value ? '#0066CC' : '#333' }}>{m.label}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>회사 정보</Text>
          {companyInfoMode === 'registered' && (
            <View>
              <View style={styles.inputGroup}>
                <Text style={styles.label}>회사명</Text>
                <Text style={[styles.input, { paddingVertical: 12 }]}>{user?.role === 'company' ? (user?.name || '등록된 회사명 없음') : '기업 회원이 아닙니다'}</Text>
              </View>
              <View style={styles.row}>
                <View style={[styles.inputGroup, styles.flex1]}>
                  <Text style={styles.label}>웹사이트</Text>
                  <Text style={[styles.input, { paddingVertical: 12 }]}>등록된 정보 없음</Text>
                </View>
                <View style={[styles.inputGroup, styles.flex1]}>
                  <Text style={styles.label}>설립연도</Text>
                  <Text style={[styles.input, { paddingVertical: 12 }]}>등록된 정보 없음</Text>
                </View>
              </View>
              <View style={styles.inputGroup}>
                <Text style={styles.label}>직원 수</Text>
                <Text style={[styles.input, { paddingVertical: 12 }]}>등록된 정보 없음</Text>
              </View>
              <View style={{ flexDirection: 'row', marginTop: 6 }}>
                <TouchableOpacity onPress={() => (navigation as any).navigate?.('RegistrationCompany')} style={{ paddingVertical: 10, paddingHorizontal: 14, backgroundColor: '#0066CC', borderRadius: 8 }}>
                  <Text style={{ color: '#fff', fontWeight: '600' }}>기업 정보 등록/수정</Text>
                </TouchableOpacity>
              </View>
              {(!isAuthenticated || !user || user.role !== 'company') && (
                <Text style={{ color: '#e74c3c', marginTop: 8 }}>기업(회사) 회원만 등록된 회사 정보를 사용할 수 있습니다.</Text>
              )}
            </View>
          )}

          {companyInfoMode === 'image' && (
            <View>
              <View style={styles.inputGroup}>
                <Text style={styles.label}>회사 소개 이미지 (최대 2개)</Text>
                {Platform.OS === 'web' ? (
                  <View>
                    {/* @ts-ignore */}
                    <input ref={companyInfoImageInputRef} type="file" accept="image/*" multiple style={{ display: 'none' }} onChange={onCompanyInfoImageChangeWeb} />
                    <TouchableOpacity onPress={triggerCompanyInfoImageSelect} style={{ marginTop: 6, paddingVertical: 10, paddingHorizontal: 14, backgroundColor: '#0066CC', borderRadius: 8, alignSelf: 'flex-start' }}>
                      <Text style={{ color: '#fff', fontWeight: '600' }}>이미지 선택</Text>
                    </TouchableOpacity>
                    {companyInfoImages.length > 0 && (
                      <View style={{ flexDirection: 'row', flexWrap: 'wrap', marginTop: 8 }}>
                        {companyInfoImages.map((img) => (
                          <View key={img.name} style={{ position: 'relative', marginRight: 12, marginBottom: 12 }}>
                            {img.uri ? (
                              <Image source={{ uri: img.uri }} style={{ width: 100, height: 80, borderRadius: 8 }} />
                            ) : (
                              <View style={{ width: 100, height: 80, backgroundColor: '#f0f0f0', borderRadius: 8, justifyContent: 'center', alignItems: 'center' }}>
                                <FontAwesome5 name="image" size={24} color="#ccc" />
                              </View>
                            )}
                            <TouchableOpacity onPress={() => removeCompanyInfoImage(img.name)} style={{ position: 'absolute', top: -8, right: -8, backgroundColor: '#e74c3c', borderRadius: 12, width: 24, height: 24, justifyContent: 'center', alignItems: 'center' }}>
                              <Text style={{ color: '#fff', fontSize: 12, fontWeight: 'bold' }}>✕</Text>
                            </TouchableOpacity>
                          </View>
                        ))}
                      </View>
                    )}
                  </View>
                ) : (
                  <Text style={{ color: '#666' }}>모바일 앱에서는 이미지 업로드는 추후 지원 예정입니다.</Text>
                )}
              </View>
            </View>
          )}

          {companyInfoMode === 'manual' && (
            <View>
              <View style={styles.inputGroup}>
                <Text style={styles.label}>회사명</Text>
                <TextInput style={styles.input} value={companyName} onChangeText={setCompanyName} placeholder="회사명을 입력하세요" />
              </View>
              <View style={styles.row}>
                <View style={[styles.inputGroup, styles.flex1]}>
                  <Text style={styles.label}>웹사이트</Text>
                  <TextInput style={styles.input} value={companyWebsite} onChangeText={setCompanyWebsite} placeholder="https://example.com" />
                </View>
                <View style={[styles.inputGroup, styles.flex1]}>
                  <Text style={styles.label}>설립연도</Text>
                  <TextInput style={styles.input} value={companyFounded} onChangeText={setCompanyFounded} placeholder="예: 2018년" />
                </View>
              </View>
              <View style={styles.inputGroup}>
                <Text style={styles.label}>직원 수</Text>
                <TextInput style={styles.input} value={companySize} onChangeText={setCompanySize} placeholder="예: 50-100명" />
              </View>
              <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <Switch value={isCompanyVerified} onValueChange={setIsCompanyVerified} trackColor={{ false: '#ddd', true: '#0066CC' }} thumbColor={isCompanyVerified ? '#004C99' : '#f4f3f4'} />
                <Text style={{ marginLeft: 8 }}>회사 정보 검증 완료 표시</Text>
              </View>
            </View>
          )}
        </View>
        {/* Position Information */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>모집 포지션 정보</Text>
          <View style={styles.inputGroup}>
            <Text style={styles.label}>직무명 <Text style={styles.required}>*</Text></Text>
            <TextInput style={styles.input} value={position} onChangeText={setPosition} placeholder="예: 정보보호 담당자" />
          </View>

          {/* Experience and Education */}
          <View style={styles.row}>
            <View style={[styles.inputGroup, styles.flex1]}>
              <Text style={styles.label}>경력 <Text style={styles.required}>*</Text></Text>
              <TextInput style={styles.input} value={experience} onChangeText={setExperience} placeholder="예: 3년 이상" />
            </View>
            <View style={[styles.inputGroup, styles.flex1]}>
              <Text style={styles.label}>학력 <Text style={styles.required}>*</Text></Text>
              <TextInput style={styles.input} value={education} onChangeText={setEducation} placeholder="예: 학사 이상" />
            </View>
          </View>
        </View>

        {/* 우대 자격증 */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>인증 종류 선택</Text>
          <View style={{ marginTop: 8 }}>
            <View style={{ flexDirection: 'row', flexWrap: 'wrap', marginTop: 6 }}>
              {certOptions.map((opt) => {
                const selected = certType.includes(opt.value);
                return (
                  <TouchableOpacity
                    key={opt.value}
                    onPress={() => toggleCertification(opt.value)}
                    style={{
                      paddingVertical: 8,
                      paddingHorizontal: 12,
                      borderRadius: 16,
                      borderWidth: 1,
                      borderColor: selected ? '#0066CC' : '#ddd',
                      backgroundColor: selected ? '#EAF3FF' : 'transparent',
                      marginRight: 8,
                      marginBottom: 8,
                    }}
                  >
                    <Text style={{ color: selected ? '#0066CC' : '#333' }}>{opt.label}</Text>
                  </TouchableOpacity>
                );
              })}
            </View>
          </View>

          {/* 사용자 정의 인증/자격 추가 */}
          <View style={[styles.inputGroup, { marginTop: 8 }]}>
            <Text style={styles.label}>인증/자격 추가</Text>
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <TextInput style={[styles.input, { flex: 1 }]} value={customCertInput} onChangeText={setCustomCertInput} placeholder="인증 또는 자격증 명을 입력하세요" />
              <TouchableOpacity onPress={addCustomCertification} style={{ marginLeft: 8, paddingVertical: 10, paddingHorizontal: 14, backgroundColor: '#0066CC', borderRadius: 8 }}>
                <Text style={{ color: '#fff', fontWeight: '600' }}>추가</Text>
              </TouchableOpacity>
            </View>
          </View>
          {customCerts.length > 0 && (
            <View style={{ flexDirection: 'row', flexWrap: 'wrap', marginTop: 6 }}>
              {customCerts.map((c) => (
                <View key={c} style={{ flexDirection: 'row', alignItems: 'center', paddingVertical: 6, paddingHorizontal: 10, borderRadius: 16, borderWidth: 1, borderColor: '#0066CC', backgroundColor: '#EAF3FF', marginRight: 8, marginBottom: 8 }}>
                  <Text style={{ color: '#0066CC' }}>{c}</Text>
                  <TouchableOpacity onPress={() => removeCustomCertification(c)}>
                    <Text style={{ marginLeft: 8, color: '#0066CC' }}>✕</Text>
                  </TouchableOpacity>
                </View>
              ))}
            </View>
          )}
        </View>

        {/* 급여 및 처우 */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>급여/처우 정보</Text>
          {/* 급여 형태 */}
          <View style={styles.inputGroup}>
            <Text style={styles.label}>급여 형태 <Text style={styles.required}>*</Text></Text>
            <View style={{ flexDirection: 'row', flexWrap: 'wrap', marginTop: 6 }}>
              {[
                { label: '연봉', value: 'annual' },
                { label: '월급', value: 'monthly' },
                { label: '일당', value: 'daily' },
                { label: '프로젝트별', value: 'project' },
                { label: '협의', value: 'negotiable' },
              ].map((o) => (
                <TouchableOpacity key={o.value} onPress={() => setSalaryType(o.value)} style={{ paddingVertical: 8, paddingHorizontal: 12, borderRadius: 16, borderWidth: 1, borderColor: salaryType === o.value ? '#0066CC' : '#ddd', backgroundColor: salaryType === o.value ? '#EAF3FF' : 'transparent', marginRight: 8, marginBottom: 8 }}>
                  <Text style={{ color: salaryType === o.value ? '#0066CC' : '#333' }}>{o.label}</Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>

          {/* 급여 범위 */}
          <View style={styles.inputGroup}>
            <Text style={styles.label}>급여 범위 <Text style={styles.required}>*</Text></Text>
            <TextInput style={styles.input} value={salaryRange} onChangeText={setSalaryRange} placeholder="예: 5,000만원~" />
          </View>

          {/* 복리후생 */}
          <View style={styles.inputGroup}>
            <Text style={styles.label}>복리후생</Text>
            <View style={{ flexDirection: 'row', flexWrap: 'wrap', marginTop: 6 }}>
              {benefitOptions.map((b) => {
                const selected = benefits.includes(b.value);
                return (
                  <TouchableOpacity key={b.value} onPress={() => toggleBenefit(b.value)} style={{ paddingVertical: 8, paddingHorizontal: 12, borderRadius: 16, borderWidth: 1, borderColor: selected ? '#0066CC' : '#ddd', backgroundColor: selected ? '#EAF3FF' : 'transparent', marginRight: 8, marginBottom: 8 }}>
                    <Text style={{ color: selected ? '#0066CC' : '#333' }}>{b.label}</Text>
                  </TouchableOpacity>
                );
              })}
            </View>
            {/* 사용자 정의 복지사항 추가 */}
            <View style={{ marginTop: 8 }}>
              <Text style={styles.label}>복지사항 추가</Text>
              <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <TextInput style={[styles.input, { flex: 1 }]} value={customBenefitInput} onChangeText={setCustomBenefitInput} placeholder="예: 점심 제공, 자기계발비 지원 등" />
                <TouchableOpacity onPress={addCustomBenefit} style={{ marginLeft: 8, paddingVertical: 10, paddingHorizontal: 14, backgroundColor: '#0066CC', borderRadius: 8 }}>
                  <Text style={{ color: '#fff', fontWeight: '600' }}>추가</Text>
                </TouchableOpacity>
              </View>
              {customBenefits.length > 0 && (
                <View style={{ flexDirection: 'row', flexWrap: 'wrap', marginTop: 6 }}>
                  {customBenefits.map((b) => (
                    <View key={b} style={{ flexDirection: 'row', alignItems: 'center', paddingVertical: 6, paddingHorizontal: 10, borderRadius: 16, borderWidth: 1, borderColor: '#0066CC', backgroundColor: '#EAF3FF', marginRight: 8, marginBottom: 8 }}>
                      <Text style={{ color: '#0066CC' }}>{b}</Text>
                      <TouchableOpacity onPress={() => removeCustomBenefit(b)}>
                        <Text style={{ marginLeft: 8, color: '#0066CC' }}>✕</Text>
                      </TouchableOpacity>
                    </View>
                  ))}
                </View>
              )}
            </View>
          </View>
        </View>

        {/* 근무 조건 */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>근무 조건</Text>
          <View style={styles.inputGroup}>
            <Text style={styles.label}>고용 형태 <Text style={styles.required}>*</Text></Text>
            <View style={{ flexDirection: 'row', flexWrap: 'wrap', marginTop: 6 }}>
              {employmentOptions.map((e) => (
                <TouchableOpacity key={e.value} onPress={() => setEmploymentType(e.value)} style={{ paddingVertical: 8, paddingHorizontal: 12, borderRadius: 16, borderWidth: 1, borderColor: employmentType === e.value ? '#0066CC' : '#ddd', backgroundColor: employmentType === e.value ? '#EAF3FF' : 'transparent', marginRight: 8, marginBottom: 8 }}>
                  <Text style={{ color: employmentType === e.value ? '#0066CC' : '#333' }}>{e.label}</Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>

          <View style={styles.row}>
            <View style={[styles.inputGroup, styles.flex1]}>
              <Text style={styles.label}>근무 시간</Text>
              <TextInput style={styles.input} value={workHours} onChangeText={setWorkHours} placeholder="예: 09:00-18:00" />
            </View>
            <View style={[styles.inputGroup, styles.flex1]}>
              <Text style={styles.label}>근무 요일</Text>
              <TextInput style={styles.input} value={workDays} onChangeText={setWorkDays} placeholder="예: 월-금" />
            </View>
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.label}>근무 지역</Text>
            <TextInput style={styles.input} value={workLocation} onChangeText={setWorkLocation} placeholder="예: 서울 강남구" />
          </View>
        </View>

        {/* 마감일 설정 */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>마감일 설정</Text>
          <View style={styles.inputGroup}>
            <Text style={styles.label}>모집 마감일 <Text style={styles.required}>*</Text></Text>
            <TextInput style={styles.input} value={deadline} onChangeText={setDeadline} placeholder="YYYY-MM-DD" />
          </View>
          <View style={[styles.inputGroup, { flexDirection: 'row', alignItems: 'center' }]}>
            <Switch value={isUrgent} onValueChange={setIsUrgent} trackColor={{ false: '#ddd', true: '#0066CC' }} thumbColor={isUrgent ? '#004C99' : '#f4f3f4'} />
            <Text style={{ marginLeft: 8 }}>긴급 모집으로 표시</Text>
          </View>
        </View>

        {/* 상세 업무 내용 */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>상세 업무 내용</Text>
          <View style={styles.inputGroup}>
            <Text style={styles.label}>주요 업무 <Text style={styles.required}>*</Text></Text>
            <TextInput style={[styles.input, styles.textArea]} value={mainTasks} onChangeText={setMainTasks} placeholder="주요 업무 내용을 입력하세요" multiline numberOfLines={5} />
          </View>
          <View style={styles.inputGroup}>
            <Text style={styles.label}>프로젝트 상세 정보</Text>
            <TextInput style={[styles.input, styles.textArea]} value={projectDetails} onChangeText={setProjectDetails} placeholder="프로젝트에 대한 상세 정보를 입력하세요" multiline numberOfLines={4} />
          </View>
        </View>

        {/* 사무실 이미지 */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>사무실 이미지</Text>
          <View style={styles.inputGroup}>
            <Text style={styles.label}>사무실 사진 (최대 2개)</Text>
            {Platform.OS === 'web' ? (
              <View>
                {/* hidden native file input for web */}
                {/* @ts-ignore */}
                <input ref={officeImageInputRef} type="file" accept="image/*" multiple style={{ display: 'none' }} onChange={onOfficeImageChangeWeb} />
                <TouchableOpacity onPress={triggerOfficeImageSelect} style={{ marginTop: 6, paddingVertical: 10, paddingHorizontal: 14, backgroundColor: '#0066CC', borderRadius: 8, alignSelf: 'flex-start' }}>
                  <Text style={{ color: '#fff', fontWeight: '600' }}>이미지 선택</Text>
                </TouchableOpacity>
                {officeImages.length > 0 && (
                  <View style={{ flexDirection: 'row', flexWrap: 'wrap', marginTop: 8 }}>
                    {officeImages.map((img) => (
                      <View key={img.name} style={{ position: 'relative', marginRight: 12, marginBottom: 12 }}>
                        {img.uri ? (
                          <Image source={{ uri: img.uri }} style={{ width: 100, height: 80, borderRadius: 8 }} />
                        ) : (
                          <View style={{ width: 100, height: 80, backgroundColor: '#f0f0f0', borderRadius: 8, justifyContent: 'center', alignItems: 'center' }}>
                            <FontAwesome5 name="image" size={24} color="#ccc" />
                          </View>
                        )}
                        <TouchableOpacity onPress={() => removeOfficeImage(img.name)} style={{ position: 'absolute', top: -8, right: -8, backgroundColor: '#e74c3c', borderRadius: 12, width: 24, height: 24, justifyContent: 'center', alignItems: 'center' }}>
                          <Text style={{ color: '#fff', fontSize: 12, fontWeight: 'bold' }}>✕</Text>
                        </TouchableOpacity>
                      </View>
                    ))}
                  </View>
                )}
              </View>
            ) : (
              <Text style={{ color: '#666' }}>모바일 앱에서는 이미지 업로드는 추후 지원 예정입니다.</Text>
            )}
          </View>
        </View>

        {/* 1:1 문의 설정 */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>문의 설정</Text>
          <View style={[styles.inputGroup, { flexDirection: 'row', alignItems: 'center' }]}>
            <Switch value={inquiryEnabled} onValueChange={setInquiryEnabled} trackColor={{ false: '#ddd', true: '#0066CC' }} thumbColor={inquiryEnabled ? '#004C99' : '#f4f3f4'} />
            <Text style={{ marginLeft: 8 }}>1:1 문의 기능 활성화</Text>
          </View>
        </View>

        {/* 모집 상태 관리 */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>모집 상태</Text>
          <View style={styles.inputGroup}>
            <Text style={styles.label}>공고 상태</Text>
            <View style={{ flexDirection: 'row', flexWrap: 'wrap', marginTop: 6 }}>
              {[
                { label: '임시저장', value: 'draft' },
                { label: '게시중', value: 'active' },
                { label: '마감', value: 'closed' },
              ].map((status) => (
                <TouchableOpacity key={status.value} onPress={() => setPostingStatus(status.value as any)} style={{ paddingVertical: 8, paddingHorizontal: 12, borderRadius: 16, borderWidth: 1, borderColor: postingStatus === status.value ? '#0066CC' : '#ddd', backgroundColor: postingStatus === status.value ? '#EAF3FF' : 'transparent', marginRight: 8, marginBottom: 8 }}>
                  <Text style={{ color: postingStatus === status.value ? '#0066CC' : '#333' }}>{status.label}</Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>
        </View>

        {/* 자격 요건 */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>자격 요건</Text>
          <View style={styles.inputGroup}>
            <Text style={styles.label}>필수 요건 <Text style={styles.required}>*</Text></Text>
            <TextInput style={[styles.input, styles.textArea]} value={requirements} onChangeText={setRequirements} placeholder="필수 자격요건을 입력하세요" multiline numberOfLines={4} />
          </View>
          <View style={styles.inputGroup}>
            <Text style={styles.label}>우대 사항</Text>
            <TextInput style={[styles.input, styles.textArea]} value={preferences} onChangeText={setPreferences} placeholder="우대사항을 입력하세요" multiline numberOfLines={3} />
          </View>
        </View>

        {/* 첨부 파일 */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>첨부 파일</Text>
          {/* 회사 소개 파일 */}
          <View style={styles.inputGroup}>
            <Text style={styles.label}>회사 정보</Text>
            {Platform.OS === 'web' ? (
              <View>
                {/* hidden native file input for web */}
                {/* @ts-ignore */}
                <input ref={companyFileInputRef} type="file" accept=".pdf,.doc,.docx" multiple style={{ display: 'none' }} onChange={onCompanyFileChangeWeb} />
                <TouchableOpacity onPress={triggerCompanyFileSelect} style={{ marginTop: 6, paddingVertical: 10, paddingHorizontal: 14, backgroundColor: '#0066CC', borderRadius: 8, alignSelf: 'flex-start' }}>
                  <Text style={{ color: '#fff', fontWeight: '600' }}>파일 선택</Text>
                </TouchableOpacity>
                {companyIntroFiles.length > 0 && (
                  <View style={{ flexDirection: 'row', flexWrap: 'wrap', marginTop: 8 }}>
                    {companyIntroFiles.map((f) => (
                      <View key={f.name} style={{ flexDirection: 'row', alignItems: 'center', paddingVertical: 6, paddingHorizontal: 10, borderRadius: 16, borderWidth: 1, borderColor: '#0066CC', backgroundColor: '#EAF3FF', marginRight: 8, marginBottom: 8 }}>
                        <Text style={{ color: '#0066CC' }}>{f.name}</Text>
                        <TouchableOpacity onPress={() => removeCompanyFile(f.name)}>
                          <Text style={{ marginLeft: 8, color: '#0066CC' }}>✕</Text>
                        </TouchableOpacity>
                      </View>
                    ))}
                  </View>
                )}
              </View>
            ) : (
              <Text style={{ color: '#666' }}>모바일 앱에서는 파일 업로드는 추후 지원 예정입니다.</Text>
            )}
          </View>

          {/* 상세 정보 파일 */}
          <View style={styles.inputGroup}>
            <Text style={styles.label}>상세 정보 파일</Text>
            {Platform.OS === 'web' ? (
              <View>
                {/* hidden native file input for web */}
                {/* @ts-ignore */}
                <input ref={documentFileInputRef} type="file" accept=".pdf,.doc,.docx" multiple style={{ display: 'none' }} onChange={onDocumentFileChangeWeb} />
                <TouchableOpacity onPress={triggerDocumentFileSelect} style={{ marginTop: 6, paddingVertical: 10, paddingHorizontal: 14, backgroundColor: '#0066CC', borderRadius: 8, alignSelf: 'flex-start' }}>
                  <Text style={{ color: '#fff', fontWeight: '600' }}>파일 선택</Text>
                </TouchableOpacity>
                {documentFiles.length > 0 && (
                  <View style={{ marginTop: 8 }}>
                    {documentFiles.map((f) => (
                      <View key={f.name} style={{ flexDirection: 'row', justifyContent: 'space-between', paddingVertical: 8, paddingHorizontal: 10, backgroundColor: '#f8f9fa', borderRadius: 6, marginBottom: 8 }}>
                        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                          <FontAwesome5 name="file" size={16} color="#4a6fdc" style={{ marginRight: 8 }} />
                          <Text>{f.name}</Text>
                        </View>
                        <TouchableOpacity onPress={() => removeDocumentFile(f.name)}>
                          <FontAwesome5 name="times" size={14} color="#e74c3c" />
                        </TouchableOpacity>
                      </View>
                    ))}
                  </View>
                )}
              </View>
            ) : (
              <Text style={{ color: '#666' }}>모바일 앱에서는 파일 업로드는 추후 지원 예정입니다.</Text>
            )}
          </View>
        </View>

        {/* 제출/취소 버튼 */}
        <View style={[styles.row, { justifyContent: 'space-between', marginTop: 10 }]}>
          <TouchableOpacity style={[styles.submitButton, { backgroundColor: '#e0e0e0' }]} onPress={() => (navigation as any).goBack?.()}>
            <Text style={[styles.submitButtonText, { color: '#333' }]}>취소</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
            <Text style={styles.submitButtonText}>등록하기</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
};

export default InputExpertRecruitment;
