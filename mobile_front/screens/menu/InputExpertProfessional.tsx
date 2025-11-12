import React, { useState } from 'react';
import { View, Text, TextInput, ScrollView, TouchableOpacity, Image, Alert } from 'react-native';
import { FontAwesome5 } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { styles } from '../styles/menu/InputExpertRecruitment';

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

  const [profilePhoto, setProfilePhoto] = useState<string | null>(null);
  const [additionalPhotos, setAdditionalPhotos] = useState<string[]>([]);
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
  const [workplaceInput, setWorkplaceInput] = useState('');
  const [workplaces, setWorkplaces] = useState<string[]>([]);

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
  const toggleLanguage = (value: string) => toggleArray(selectedLanguages, setSelectedLanguages, value);
  const addCustomLanguage = () => {
    const v = customLanguageInput.trim();
    if (!v) return Alert.alert('입력 오류', '언어를 입력하세요.');
    // 중복 방지 (기존 옵션과 커스텀 모두 확인)
    if (selectedLanguages.includes(v) || customLanguages.includes(v) || languages.includes(v)) {
      Alert.alert('중복 항목', '이미 추가된 언어입니다.');
      return;
    }
    setCustomLanguages([...customLanguages, v]);
    setCustomLanguageInput('');
  };
  const removeCustomLanguage = (idx: number) => setCustomLanguages(customLanguages.filter((_, i) => i !== idx));
  const toggleService = (value: string) => toggleArray(services, setServices, value);

  const handleAddWorkplace = () => {
    const v = workplaceInput.trim();
    if (!v) return Alert.alert('입력 오류', '회사명을 입력하세요.');
    setWorkplaces([...workplaces, v]);
    setWorkplaceInput('');
  };
  const removeWorkplace = (idx: number) => setWorkplaces(workplaces.filter((_, i) => i !== idx));

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
    // Simulation: in a real app, open image picker
    const uri = `https://picsum.photos/seed/${Date.now()}/200/200`;
    setProfilePhoto(uri);
    Alert.alert('사진 선택', '샘플 이미지를 설정했습니다 (시뮬레이션).');
  };

  const onPickAdditionalPhoto = () => {
    // Simulation: in a real app, open image picker
    const uri = `https://picsum.photos/seed/${Date.now() + Math.random()}/200/200`;
    setAdditionalPhotos([...additionalPhotos, uri]);
    Alert.alert('사진 추가', '샘플 이미지가 추가되었습니다 (시뮬레이션).');
  };

  const removeAdditionalPhoto = (index: number) => {
    setAdditionalPhotos(additionalPhotos.filter((_, i) => i !== index));
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
      workplaces,
      certFiles,
      portfolioFiles,
      portfolioDesc,
      rate: { type: rateType, hourlyRate, dailyRate, projectRate },
      regions,
      availabilityDays,
      timeSlots,
      languages: [...selectedLanguages, ...customLanguages],
    };

    console.log('Submit Expert:', form);
    Alert.alert('등록 완료', '전문가 등록이 완료되었습니다.', [{ text: '확인', onPress: () => navigation.goBack() }]);
  };

  return (
    <ScrollView style={styles.container} contentContainerStyle={{ paddingBottom: 120 }}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <FontAwesome5 name="arrow-left" size={20} color="#0066CC" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>인증 전문가 등록</Text>
        <View style={{ width: 20 }} />
      </View>

      <View style={styles.formContainer}>
        {/* Profile */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>개인 프로필</Text>
          
          {/* Basic Photo Upload */}
          <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 12 }}>
            <TouchableOpacity onPress={onPickPhoto} style={styles.profilePhotoContainer as any}>
              {profilePhoto ? (
                <Image source={{ uri: profilePhoto }} style={{ width: 80, height: 80, borderRadius: 40 }} />
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
                  <Image source={{ uri: photo }} style={{ width: 80, height: 80, borderRadius: 8 }} />
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

          <View style={styles.inputGroup}>
            <Text style={styles.label}>이전 직장</Text>
            <View style={{ flexDirection: 'row', gap: 8 }}>
              <TextInput style={[styles.input, { flex: 1 }]} value={workplaceInput} onChangeText={setWorkplaceInput} placeholder="회사명을 입력하세요" />
              <TouchableOpacity onPress={handleAddWorkplace} style={{ backgroundColor: '#28a745', padding: 10, borderRadius: 6, justifyContent: 'center' }}>
                <FontAwesome5 name="plus" size={14} color="#fff" />
              </TouchableOpacity>
            </View>

            <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: 8, marginTop: 10 }}>
              {workplaces.map((w, i) => (
                <Tag key={i} label={w} onRemove={() => removeWorkplace(i)} />
              ))}
            </View>
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
