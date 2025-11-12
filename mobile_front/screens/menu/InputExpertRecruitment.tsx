import React, { useState, useRef } from 'react';
import { View, Text, TextInput, ScrollView, TouchableOpacity, Alert, Switch, Platform } from 'react-native';
import { FontAwesome5 } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { styles } from '../styles/menu/InputExpertRecruitment';

export const InputExpertRecruitment: React.FC = () => {
  const navigation = useNavigation();
  
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
  // Company intro files (web)
  const [companyIntroFiles, setCompanyIntroFiles] = useState<{ name: string; size?: number }[]>([]);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  // Certification options
  const certOptions = [
    { label: 'ISMS-P', value: 'isms-p' },
    { label: 'ISO 27001', value: 'iso27001' },
    { label: 'ISO 27701', value: 'iso27701' },
    { label: 'GS 인증', value: 'gs' },
    { label: 'CPPG', value: 'cppg' },
    { label: 'CISP', value: 'cisp' },
    { label: 'CISSP', value: 'cissp' }
  ];

  // Employment type options
  const employmentOptions = [
    { label: '정규직', value: 'full-time' },
    { label: '계약직', value: 'contract' },
    { label: '프리랜서', value: 'freelance' },
    { label: '인턴', value: 'intern' },
    { label: '프로젝트', value: 'project' }
  ];

  // Benefit options
  const benefitOptions = [
    { label: '4대 보험', value: 'four-insurance' },
    { label: '퇴직금', value: 'retirement' },
    { label: '성과급', value: 'bonus' },
    { label: '연차', value: 'vacation' },
    { label: '유연근무제', value: 'flexible' },
    { label: '재택근무', value: 'remote' }
  ];

  // Toggle certification selection
  const toggleCertification = (value: string) => {
    if (certType.includes(value)) {
      setCertType(certType.filter(type => type !== value));
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
    setCustomCerts(customCerts.filter(c => c !== name));
  };

  // Toggle benefit selection
  const toggleBenefit = (value: string) => {
    if (benefits.includes(value)) {
      setBenefits(benefits.filter(benefit => benefit !== value));
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

  // Web-only: file input change handler for company intro files
  const onCompanyFileChangeWeb = (e: React.ChangeEvent<HTMLInputElement>) => {
    try {
      const files: File[] = Array.from(e.target?.files || []);
      if (!files.length) return;
      setCompanyIntroFiles((prev: { name: string; size?: number }[]) => [
        ...prev,
        ...files.map((f: File) => ({ name: f.name, size: f.size }))
      ]);
    } catch (err) {
      console.warn('파일 선택 처리 중 오류:', err);
    } finally {
      // allow selecting same file again
      if (e?.target) (e.target as HTMLInputElement).value = '';
    }
  };

  const removeCompanyFile = (name: string) => {
    setCompanyIntroFiles((prev: { name: string; size?: number }[]) => prev.filter((f) => f.name !== name));
  };

  const triggerCompanyFileSelect = () => {
    if (Platform.OS === 'web') {
      fileInputRef.current?.click();
    } else {
      Alert.alert('안내', '모바일 앱에서는 파일 업로드가 추후 지원될 예정입니다.');
    }
  };

  // Handle form submission
  const handleSubmit = () => {
    // Validation
    if (!position || !experience || !education || !requirements || 
        !salaryType || !salaryRange || !employmentType || !deadline || !mainTasks) {
      Alert.alert('필수 정보 누락', '모든 필수 정보를 입력해주세요.');
      return;
    }

    // Submit data
    const formData = {
      position,
      experience,
      education,
      requirements,
      preferences,
      // Combine preset selections and user-added certifications/qualifications
      certifications: [...certType, ...customCerts],
      salary: {
        type: salaryType,
        range: salaryRange
      },
      employment: {
        type: employmentType,
        workHours,
        workDays,
        location: workLocation
      },
      deadline,
      isUrgent,
      tasks: {
        main: mainTasks,
        projectDetails
      },
      benefits: [...benefits, ...customBenefits],
      attachments: {
        companyIntro: companyIntroFiles.map(f => ({ name: f.name, size: f.size }))
      }
    };

    console.log('Form Data:', formData);
    Alert.alert(
      '등록 완료',
      '인증 전문가 모집 정보가 등록되었습니다.',
      [
        {
          text: '확인',
          onPress: () => navigation.goBack(),
        },
      ]
    );
  };

  return (
    <ScrollView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <FontAwesome5 name="arrow-left" size={20} color="#0066CC" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>인증 인력모집</Text>
        <View style={{ width: 20 }} />
      </View>

      {/* Form Container */}
      <View style={styles.formContainer}>
        {/* Position Information */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>모집 포지션</Text>
          <View style={styles.inputGroup}>
            <Text style={styles.label}>직무명 <Text style={styles.required}>*</Text></Text>
            <TextInput
              style={styles.input}
              value={position}
              onChangeText={setPosition}
              placeholder="예: 정보보호 담당자"
            />
          </View>
          
          {/* Experience and Education */}
          <View style={styles.row}>
            <View style={[styles.inputGroup, styles.flex1]}>
              <Text style={styles.label}>경력 <Text style={styles.required}>*</Text></Text>
              <TextInput
                style={styles.input}
                value={experience}
                onChangeText={setExperience}
                placeholder="예: 3년 이상"
              />
            </View>
            <View style={[styles.inputGroup, styles.flex1]}>
              <Text style={styles.label}>학력 <Text style={styles.required}>*</Text></Text>
              <TextInput
                style={styles.input}
                value={education}
                onChangeText={setEducation}
                placeholder="예: 학사 이상"
              />
            </View>
          </View>
        </View>

        {/* 우대 자격증 */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>우대 자격증</Text>
          <View style={{ marginTop: 8 }}>
            {certOptions.map((opt) => (
              <TouchableOpacity
                key={opt.value}
                onPress={() => toggleCertification(opt.value)}
                style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 8 }}
              >
                <FontAwesome5
                  name={certType.includes(opt.value) ? 'check-square' : 'square'}
                  size={18}
                  color={certType.includes(opt.value) ? '#0066CC' : '#999'}
                />
                <Text style={{ marginLeft: 8 }}>{opt.label}</Text>
              </TouchableOpacity>
            ))}
          </View>
          {/* 사용자 정의 인증/자격 추가 */}
          <View style={[styles.inputGroup, { marginTop: 8 }]}> 
            <Text style={styles.label}>인증/자격 추가</Text>
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <TextInput
                style={[styles.input, { flex: 1 }]}
                value={customCertInput}
                onChangeText={setCustomCertInput}
                placeholder="인증 또는 자격증 명을 입력하세요"
              />
              <TouchableOpacity
                onPress={addCustomCertification}
                style={{
                  marginLeft: 8,
                  paddingVertical: 10,
                  paddingHorizontal: 14,
                  backgroundColor: '#0066CC',
                  borderRadius: 8
                }}
              >
                <Text style={{ color: '#fff', fontWeight: '600' }}>추가</Text>
              </TouchableOpacity>
            </View>
          </View>
          {customCerts.length > 0 && (
            <View style={{ flexDirection: 'row', flexWrap: 'wrap', marginTop: 6 }}>
              {customCerts.map((c) => (
                <View
                  key={c}
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    paddingVertical: 6,
                    paddingHorizontal: 10,
                    borderRadius: 16,
                    borderWidth: 1,
                    borderColor: '#0066CC',
                    backgroundColor: '#EAF3FF',
                    marginRight: 8,
                    marginBottom: 8,
                  }}
                >
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
          <Text style={styles.sectionTitle}>급여 및 처우</Text>
          {/* 급여 형태: 한 줄 전체 사용 */}
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
                <TouchableOpacity
                  key={o.value}
                  onPress={() => setSalaryType(o.value)}
                  style={{
                    paddingVertical: 8,
                    paddingHorizontal: 12,
                    borderRadius: 16,
                    borderWidth: 1,
                    borderColor: salaryType === o.value ? '#0066CC' : '#ddd',
                    backgroundColor: salaryType === o.value ? '#EAF3FF' : 'transparent',
                    marginRight: 8,
                    marginBottom: 8,
                  }}
                >
                  <Text style={{ color: salaryType === o.value ? '#0066CC' : '#333' }}>{o.label}</Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>

          {/* 급여 범위: 다음 줄로 분리 */}
          <View style={styles.inputGroup}>
            <Text style={styles.label}>급여 범위 <Text style={styles.required}>*</Text></Text>
            <TextInput
              style={styles.input}
              value={salaryRange}
              onChangeText={setSalaryRange}
              placeholder="예: 5,000만원~"
            />
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.label}>복리후생</Text>
            <View style={{ flexDirection: 'row', flexWrap: 'wrap', marginTop: 6 }}>
              {benefitOptions.map((b) => {
                const selected = benefits.includes(b.value);
                return (
                  <TouchableOpacity
                    key={b.value}
                    onPress={() => toggleBenefit(b.value)}
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
                    <Text style={{ color: selected ? '#0066CC' : '#333' }}>{b.label}</Text>
                  </TouchableOpacity>
                );
              })}
            </View>
            {/* 사용자 정의 복지사항 추가 */}
            <View style={{ marginTop: 8 }}>
              <Text style={styles.label}>복지사항 추가</Text>
              <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <TextInput
                  style={[styles.input, { flex: 1 }]}
                  value={customBenefitInput}
                  onChangeText={setCustomBenefitInput}
                  placeholder="예: 점심 제공, 자기계발비 지원 등"
                />
                <TouchableOpacity
                  onPress={addCustomBenefit}
                  style={{
                    marginLeft: 8,
                    paddingVertical: 10,
                    paddingHorizontal: 14,
                    backgroundColor: '#0066CC',
                    borderRadius: 8,
                  }}
                >
                  <Text style={{ color: '#fff', fontWeight: '600' }}>추가</Text>
                </TouchableOpacity>
              </View>
              {customBenefits.length > 0 && (
                <View style={{ flexDirection: 'row', flexWrap: 'wrap', marginTop: 6 }}>
                  {customBenefits.map((b) => (
                    <View
                      key={b}
                      style={{
                        flexDirection: 'row',
                        alignItems: 'center',
                        paddingVertical: 6,
                        paddingHorizontal: 10,
                        borderRadius: 16,
                        borderWidth: 1,
                        borderColor: '#0066CC',
                        backgroundColor: '#EAF3FF',
                        marginRight: 8,
                        marginBottom: 8,
                      }}
                    >
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
                <TouchableOpacity
                  key={e.value}
                  onPress={() => setEmploymentType(e.value)}
                  style={{
                    paddingVertical: 8,
                    paddingHorizontal: 12,
                    borderRadius: 16,
                    borderWidth: 1,
                    borderColor: employmentType === e.value ? '#0066CC' : '#ddd',
                    backgroundColor: employmentType === e.value ? '#EAF3FF' : 'transparent',
                    marginRight: 8,
                    marginBottom: 8,
                  }}
                >
                  <Text style={{ color: employmentType === e.value ? '#0066CC' : '#333' }}>{e.label}</Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>

          <View style={styles.row}>
            <View style={[styles.inputGroup, styles.flex1]}>
              <Text style={styles.label}>근무 시간</Text>
              <TextInput
                style={styles.input}
                value={workHours}
                onChangeText={setWorkHours}
                placeholder="예: 09:00-18:00"
              />
            </View>
            <View style={[styles.inputGroup, styles.flex1]}>
              <Text style={styles.label}>근무 요일</Text>
              <TextInput
                style={styles.input}
                value={workDays}
                onChangeText={setWorkDays}
                placeholder="예: 월-금"
              />
            </View>
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.label}>근무 지역</Text>
            <TextInput
              style={styles.input}
              value={workLocation}
              onChangeText={setWorkLocation}
              placeholder="예: 서울 강남구"
            />
          </View>
        </View>

        {/* 마감일 설정 */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>마감일 설정</Text>
          <View style={styles.inputGroup}>
            <Text style={styles.label}>모집 마감일 <Text style={styles.required}>*</Text></Text>
            <TextInput
              style={styles.input}
              value={deadline}
              onChangeText={setDeadline}
              placeholder="YYYY-MM-DD"
            />
          </View>
          <View style={[styles.inputGroup, { flexDirection: 'row', alignItems: 'center' }]}>
            <Switch
              value={isUrgent}
              onValueChange={setIsUrgent}
              trackColor={{ false: '#ddd', true: '#0066CC' }}
              thumbColor={isUrgent ? '#004C99' : '#f4f3f4'}
            />
            <Text style={{ marginLeft: 8 }}>긴급 모집으로 표시</Text>
          </View>
        </View>

        {/* 상세 업무 내용 */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>상세 업무 내용</Text>
          <View style={styles.inputGroup}>
            <Text style={styles.label}>주요 업무 <Text style={styles.required}>*</Text></Text>
            <TextInput
              style={[styles.input, styles.textArea]}
              value={mainTasks}
              onChangeText={setMainTasks}
              placeholder="주요 업무 내용을 입력하세요"
              multiline
              numberOfLines={5}
            />
          </View>
          <View style={styles.inputGroup}>
            <Text style={styles.label}>프로젝트 상세 정보</Text>
            <TextInput
              style={[styles.input, styles.textArea]}
              value={projectDetails}
              onChangeText={setProjectDetails}
              placeholder="프로젝트에 대한 상세 정보를 입력하세요"
              multiline
              numberOfLines={4}
            />
          </View>
        </View>

        

        {/* Requirements */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>자격 요건</Text>
          <View style={styles.inputGroup}>
            <Text style={styles.label}>필수 요건 <Text style={styles.required}>*</Text></Text>
            <TextInput
              style={[styles.input, styles.textArea]}
              value={requirements}
              onChangeText={setRequirements}
              placeholder="필수 자격요건을 입력하세요"
              multiline
              numberOfLines={4}
            />
          </View>
          <View style={styles.inputGroup}>
            <Text style={styles.label}>우대 사항</Text>
            <TextInput
              style={[styles.input, styles.textArea]}
              value={preferences}
              onChangeText={setPreferences}
              placeholder="우대사항을 입력하세요"
              multiline
              numberOfLines={3}
            />
          </View>
        </View>

        {/* 첨부 파일 */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>첨부 파일</Text>
          <View style={styles.inputGroup}>
            <Text style={styles.label}>회사 소개 파일 등록</Text>
            {Platform.OS === 'web' ? (
              <View>
                {/* hidden native file input for web */}
                {/* @ts-ignore */}
                <input
                  ref={fileInputRef}
                  type="file"
                  accept=".pdf,.doc,.docx,.ppt,.pptx,.txt,.md,.png,.jpg,.jpeg"
                  multiple
                  style={{ display: 'none' }}
                  onChange={onCompanyFileChangeWeb}
                />
                <TouchableOpacity
                  onPress={triggerCompanyFileSelect}
                  style={{
                    marginTop: 6,
                    paddingVertical: 10,
                    paddingHorizontal: 14,
                    backgroundColor: '#0066CC',
                    borderRadius: 8,
                    alignSelf: 'flex-start'
                  }}
                >
                  <Text style={{ color: '#fff', fontWeight: '600' }}>파일 선택</Text>
                </TouchableOpacity>
                {companyIntroFiles.length > 0 && (
                  <View style={{ flexDirection: 'row', flexWrap: 'wrap', marginTop: 8 }}>
                    {companyIntroFiles.map((f) => (
                      <View
                        key={f.name}
                        style={{
                          flexDirection: 'row',
                          alignItems: 'center',
                          paddingVertical: 6,
                          paddingHorizontal: 10,
                          borderRadius: 16,
                          borderWidth: 1,
                          borderColor: '#0066CC',
                          backgroundColor: '#EAF3FF',
                          marginRight: 8,
                          marginBottom: 8,
                        }}
                      >
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
        </View>

        {/* 제출/취소 버튼 */}
        <View style={[styles.row, { justifyContent: 'space-between', marginTop: 10 }]}>
          <TouchableOpacity
            style={[styles.submitButton, { backgroundColor: '#e0e0e0' }]}
            onPress={() => navigation.goBack()}
          >
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