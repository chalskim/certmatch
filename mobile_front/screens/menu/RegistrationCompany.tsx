import React, { useState } from 'react';
import { View, Text, TextInput, ScrollView, TouchableOpacity, Alert, Modal } from 'react-native';
import { FontAwesome5 } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { styles } from '../styles/menu/RegistrationCompany';
import SubformHeader from '../components/SubformHeader';

const getIconForActivity = (activity: string) => {
  switch(activity) {
    case '인증': return 'certificate';
    case '모의인증': return 'search';
    case '컨설팅': return 'hands-helping';
    case '정부지원': return 'building';
    case '교육사업': return 'graduation-cap';
    default: return 'tag';
  }
};

type CertFile = { name: string; uri: string; size?: number; mimeType?: string };
type CertInfo = {
  id: string;
  certType: string;
  certLevel: string;
  certScope: string;
  desiredDate: string;
  auditType: string;
  files: CertFile[];
};

const newId = (prefix = '') => `${prefix}${Date.now()}${Math.floor(Math.random() * 1000)}`;

const CompanyQualificationRegistration = () => {
  const navigation = useNavigation<any>();
  
  // Form state
  const [companyName, setCompanyName] = useState('');
  const [bizRegNo, setBizRegNo] = useState('');
  const [ceoName, setCeoName] = useState('');
  const [establishDate, setEstablishDate] = useState('');
  const [industry, setIndustry] = useState('');
  const [employees, setEmployees] = useState('');
  const [postcode, setPostcode] = useState('');
  const [address, setAddress] = useState('');
  const [detailAddress, setDetailAddress] = useState('');
  const [contactPerson, setContactPerson] = useState('');
  const [contactEmail, setContactEmail] = useState('');
  const [contactPhone, setContactPhone] = useState('');
  // Multiple Certification Infos
  const [certInfos, setCertInfos] = useState<CertInfo[]>([
    { id: newId('cert_'), certType: '', certLevel: '', certScope: '', desiredDate: '', auditType: '', files: [] }
  ]);
  const [terms1, setTerms1] = useState(false);
  const [terms2, setTerms2] = useState(false);
  const [terms3, setTerms3] = useState(false);
  
  // Dropdown visibility states
  const [showIndustryDropdown, setShowIndustryDropdown] = useState(false);
  const [showEmployeesDropdown, setShowEmployeesDropdown] = useState(false);
  const [openCertTypeDropdownIndex, setOpenCertTypeDropdownIndex] = useState<number | null>(null);
  const [openCertLevelDropdownIndex, setOpenCertLevelDropdownIndex] = useState<number | null>(null);
  const [openAuditTypeDropdownIndex, setOpenAuditTypeDropdownIndex] = useState<number | null>(null);
  const [selectedActivities, setSelectedActivities] = useState<string[]>([]);
  // 인증 분야에서 선택된 인증 종류들 (중복 선택 가능)
  const [selectedCertTypes, setSelectedCertTypes] = useState<string[]>([]);
  const [contactPersons, setContactPersons] = useState<{ name: string; email: string; phone: string; position: string }[]>([]);
  
  // Dropdown options
  const industryOptions = [
    { label: '선택해주세요', value: '' },
    { label: 'IT 서비스', value: 'it' },
    { label: '제조업', value: 'manufacturing' },
    { label: '금융업', value: 'finance' },
    { label: '의료업', value: 'healthcare' },
    { label: '유통업', value: 'retail' },
    { label: '교육업', value: 'education' },
    { label: '기타', value: 'other' }
  ];
  
  const employeesOptions = [
    { label: '선택해주세요', value: '' },
    { label: '1-50명', value: '1-50' },
    { label: '51-100명', value: '51-100' },
    { label: '101-300명', value: '101-300' },
    { label: '301-500명', value: '301-500' },
    { label: '501명 이상', value: '501+' }
  ];
  
  const certTypeOptions = [
    { label: '선택해주세요', value: '' },
    { label: 'ISMS-P', value: 'isms-p' },
    { label: 'ISMS', value: 'isms' },
    { label: 'ISO 27001', value: 'iso27001' },
    { label: 'GS 인증', value: 'gs' },
    { label: 'CPPG', value: 'cppg' }
  ];
  
  const certLevelOptions = [
    { label: '선택해주세요', value: '' },
    { label: '기본인증', value: 'basic' },
    { label: '종합인증', value: 'comprehensive' },
    { label: '고급인증', value: 'advanced' }
  ];
  
  const auditTypeOptions = [
    { label: '선택해주세요', value: '' },
    { label: '최초 인증', value: 'initial' },
    { label: '갱신 인증', value: 'renewal' },
    { label: '감시 심사', value: 'surveillance' },
    { label: '인증 이전', value: 'transfer' }
  ];
  
  
  // Toggle activity selection
  const toggleActivity = (activity: string) => {
    if (selectedActivities.includes(activity)) {
      setSelectedActivities(selectedActivities.filter(item => item !== activity));
    } else {
      setSelectedActivities([...selectedActivities, activity]);
    }
  };

  const addContactPerson = () => {
    setContactPersons([...contactPersons, { position: '', name: '', email: '', phone: '' }]);
  };

  const updateContactPerson = (index: number, field: string, value: string) => {
    const updated = [...contactPersons];
    updated[index] = { ...updated[index], [field]: value };
    setContactPersons(updated);
  };
  const removeContactPerson = (index: number) => {
    setContactPersons(contactPersons.filter((_, i) => i !== index));
  };

  // Certification info helpers
  const addCertInfo = () => {
    setCertInfos(prev => [...prev, { id: newId('cert_'), certType: '', certLevel: '', certScope: '', desiredDate: '', auditType: '', files: [] }]);
  };
  const removeCertInfo = (id: string) => {
    setCertInfos(prev => {
      const next = prev.filter(ci => ci.id !== id);
      setSelectedCertTypes(Array.from(new Set(next.map(ci => ci.certType).filter(Boolean))));
      return next;
    });
  };
  const updateCertInfo = (id: string, patch: Partial<CertInfo>) => {
    setCertInfos(prev => {
      const next = prev.map(ci => (ci.id === id ? { ...ci, ...patch } : ci));
      // 인증 종류가 변경/입력되면 선택 상태도 동기화 (중복 제거)
      setSelectedCertTypes(Array.from(new Set(next.map(ci => ci.certType).filter(Boolean))));
      return next;
    });
  };
  const pickCertFile = async (id: string) => {
    try {
      // @ts-ignore - optional dependency in some environments
      const DocumentPicker = await import('expo-document-picker');
      const res = await DocumentPicker.getDocumentAsync({ type: '*/*' });
      if (res.type === 'success') {
        setCertInfos(prev => prev.map(ci => (ci.id === id ? { ...ci, files: [...ci.files, { name: res.name, uri: res.uri, size: (res as any).size, mimeType: (res as any).mimeType }] } : ci)));
      }
    } catch (err) {
      console.warn('DocumentPicker not available or failed:', err);
      Alert.alert('파일 업로드 불가', '파일 선택 기능을 사용하려면 expo-document-picker를 설치하거나 네이티브 환경에서 실행하세요.');
    }
  };
  const removeCertFile = (id: string, index: number) => {
    setCertInfos(prev => prev.map(ci => (ci.id === id ? { ...ci, files: ci.files.filter((_, i) => i !== index) } : ci)));
  };

  // 인증 분야 선택/해제 시 인증 정보 항목 자동 추가/제거
  const ensureCertInfoForType = (type: string) => {
    setCertInfos(prev => {
      if (prev.some(ci => ci.certType === type)) return prev;
      const next = [
        ...prev,
        { id: newId('cert_'), certType: type, certLevel: '', certScope: '', desiredDate: '', auditType: '', files: [] }
      ];
      setSelectedCertTypes(Array.from(new Set(next.map(ci => ci.certType).filter(Boolean))));
      return next;
    });
  };
  const removeCertInfoByType = (type: string) => {
    setCertInfos(prev => {
      const next = prev.filter(ci => ci.certType !== type);
      setSelectedCertTypes(Array.from(new Set(next.map(ci => ci.certType).filter(Boolean))));
      return next;
    });
  };
  const toggleSelectCertType = (type: string) => {
    setSelectedCertTypes(prev => {
      const exists = prev.includes(type);
      const next = exists ? prev.filter(t => t !== type) : [...prev, type];
      if (exists) {
        removeCertInfoByType(type);
      } else {
        ensureCertInfoForType(type);
      }
      return next;
    });
  };

  // Handle form submission
  const handleSubmit = () => {
    // Basic validation
    if (!companyName || !bizRegNo || !ceoName || !establishDate || !industry || 
        !employees || !address || !contactPerson || !contactEmail || !contactPhone ||
        !terms1 || !terms2 || !terms3) {
      Alert.alert('필수 정보 누락', '모든 필수 정보를 입력해주세요.');
      return;
    }
    
    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(contactEmail)) {
      Alert.alert('이메일 형식 오류', '올바른 이메일 주소를 입력해주세요.');
      return;
    }
    
    // Certification info validation
    if (certInfos.length === 0) {
      Alert.alert('인증 정보 필요', '최소 하나 이상의 인증 정보를 추가해주세요.');
      return;
    }
    const invalid = certInfos.find(ci => !ci.certType || !ci.desiredDate);
    if (invalid) {
      Alert.alert('인증 정보 누락', '각 인증 정보에 인증 명과 희망 심사일을 입력해주세요.');
      return;
    }

    // Submit logic - collect payload
    const payload = {
      company: { companyName, bizRegNo, ceoName, establishDate, industry, employees, postcode, address, detailAddress },
      contact: { contactPerson, contactEmail, contactPhone, contactPersons },
      interests: selectedActivities,
      certifications: certInfos,
      terms: { terms1, terms2, terms3 },
    };
    console.log('Company qualification submit', payload);
    Alert.alert(
      '등록 완료',
      '기업 자격 등록이 완료되었습니다. 검토 후 승인될 예정입니다.',
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
    // Save draft logic would go here
    Alert.alert('임시 저장', '임시 저장이 완료되었습니다.');
  };
  
  // (Removed) updateCertScope helper - not needed with multi-cert entries
  
  // Render dropdown component
  const renderDropdown = (
    visible: boolean, 
    onClose: () => void, 
    options: Array<{label: string, value: string}>, 
    selectedValue: string, 
    onSelect: (value: string) => void
  ) => {
    return (
      <Modal
        visible={visible}
        transparent={true}
        animationType="fade"
        onRequestClose={onClose}
      >
        <TouchableOpacity 
          style={styles.dropdownOverlay} 
          onPress={onClose}
        >
          <View style={styles.dropdownContainer}>
            <ScrollView>
              {options.map((option, index) => (
                <TouchableOpacity
                  key={index}
                  style={[
                    styles.dropdownItem, 
                    selectedValue === option.value && styles.dropdownItemSelected
                  ]}
                  onPress={() => {
                    onSelect(option.value);
                    onClose();
                  }}
                >
                  <Text style={[
                    styles.dropdownItemText,
                    selectedValue === option.value && styles.dropdownItemTextSelected
                  ]}>
                    {option.label}
                  </Text>
                </TouchableOpacity>
              ))}
            </ScrollView>
          </View>
        </TouchableOpacity>
      </Modal>
    );
  };

  return (
    <ScrollView style={styles.container}>
      {/* Header */}
      <SubformHeader
        title="기업 자격 등록"
        navigation={navigation}
        onHome={() => (navigation as any)?.navigate?.('Home')}
      />
      
      {/* Progress Indicator removed as requested */}
      
      {/* Form Container */}
      <View style={styles.formContainer}>
        <View style={styles.formHeader}>
          <Text style={styles.formSubtitle}>정확한 정보를 입력해 주시면 빠르고 정확하게 심사를 진행할 수 있습니다.</Text>
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
              <View style={[styles.completionFill, { width: '65%' }]} />
            </View>
          </View>
          <Text style={styles.completionPercentage}>65%</Text>
        </View>
        
        {/* Basic Information Section */}
        <View style={styles.formSection}>
          <View style={styles.sectionHeader}>
            <FontAwesome5 name="building" size={18} color="#0066CC" />
            <Text style={styles.sectionTitle}>기본 정보</Text>
          </View>
          
          <View style={styles.formGrid}>
            <View style={styles.formGroup}>
              <Text style={styles.label}>회사명 <Text style={styles.required}>*</Text></Text>
              <TextInput
                style={styles.input}
                value={companyName}
                onChangeText={setCompanyName}
                placeholder="회사명을 입력하세요"
              />
              <Text style={styles.helpText}>사업자등록증 상의 정확한 상호를 입력해주세요.</Text>
            </View>
            
            <View style={styles.formGroup}>
              <Text style={styles.label}>사업자등록번호 <Text style={styles.required}>*</Text></Text>
              <TextInput
                style={styles.input}
                value={bizRegNo}
                onChangeText={setBizRegNo}
                placeholder="000-00-00000"
                keyboardType="numeric"
              />
            </View>
            
            <View style={styles.formGroup}>
              <Text style={styles.label}>대표자명 <Text style={styles.required}>*</Text></Text>
              <TextInput
                style={styles.input}
                value={ceoName}
                onChangeText={setCeoName}
                placeholder="대표자명을 입력하세요"
              />
            </View>
            
            <View style={styles.formGroup}>
              <Text style={styles.label}>설립일 <Text style={styles.required}>*</Text></Text>
              <TextInput
                style={styles.input}
                value={establishDate}
                onChangeText={setEstablishDate}
                placeholder="YYYY-MM-DD"
              />
            </View>
            
            <View style={styles.formGroup}>
              <Text style={styles.label}>산업 분류 <Text style={styles.required}>*</Text></Text>
              <TouchableOpacity 
                style={styles.input} 
                onPress={() => setShowIndustryDropdown(true)}
              >
                <Text style={industry ? styles.dropdownText : styles.dropdownPlaceholder}>
                  {industryOptions.find(opt => opt.value === industry)?.label || '선택해주세요'}
                </Text>
                <FontAwesome5 name="chevron-down" size={16} color="#666" />
              </TouchableOpacity>
              {renderDropdown(
                showIndustryDropdown,
                () => setShowIndustryDropdown(false),
                industryOptions,
                industry,
                setIndustry
              )}
            </View>
            
            <View style={styles.formGroup}>
              <Text style={styles.label}>직원 수 <Text style={styles.required}>*</Text></Text>
              <TouchableOpacity 
                style={styles.input} 
                onPress={() => setShowEmployeesDropdown(true)}
              >
                <Text style={employees ? styles.dropdownText : styles.dropdownPlaceholder}>
                  {employeesOptions.find(opt => opt.value === employees)?.label || '선택해주세요'}
                </Text>
                <FontAwesome5 name="chevron-down" size={16} color="#666" />
              </TouchableOpacity>
              {renderDropdown(
                showEmployeesDropdown,
                () => setShowEmployeesDropdown(false),
                employeesOptions,
                employees,
                setEmployees
              )}
            </View>
            
            <View style={[styles.formGroup, styles.fullWidth]}>
              <Text style={styles.label}>주소 <Text style={styles.required}>*</Text></Text>
              <View style={styles.inputGroup}>
                <TextInput
                  style={[styles.input, { flex: 1 }]}
                  value={postcode}
                  onChangeText={setPostcode}
                  placeholder="우편번호"
                  editable={false}
                />
                <TouchableOpacity style={styles.secondaryButton}>
                  <Text style={styles.secondaryButtonText}>주소 찾기</Text>
                </TouchableOpacity>
              </View>
              <TextInput
                style={[styles.input, styles.marginTop]}
                value={address}
                onChangeText={setAddress}
                placeholder="기본 주소"
              />
              <TextInput
                style={[styles.input, styles.marginTop]}
                value={detailAddress}
                onChangeText={setDetailAddress}
                placeholder="상세 주소"
              />
            </View>
            
            {/* 담당자 정보 버튼 */}
            <View style={[styles.formGroup, styles.fullWidth]}>
              <TouchableOpacity style={styles.primaryButton} onPress={addContactPerson}>
                <FontAwesome5 name="plus" size={16} color="white" />
                <Text style={styles.primaryButtonText}>담당자 정보 추가</Text>
              </TouchableOpacity>
            </View>
            {contactPersons.map((person, index) => (
              <View
                key={index}
                style={[
                  styles.formGroup,
                  styles.fullWidth,
                  { marginTop: 10, padding: 10, borderWidth: 1, borderColor: '#eee', borderRadius: 6 }
                ]}
              >
                <Text style={styles.label}>담당자 {index + 1}</Text>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                  <TextInput
                    style={[styles.input, { flex: 1, marginRight: 10 }]}
                    value={person.name}
                    onChangeText={(value) => updateContactPerson(index, 'name', value)}
                    placeholder="성함"
                  />
                  <TextInput
                    style={[styles.input, { flex: 1 }]}
                    value={person.position}
                    onChangeText={(value) => updateContactPerson(index, 'position', value)}
                    placeholder="직책"
                  />
                </View>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 10 }}>
                  <TextInput
                    style={[styles.input, { flex: 1, marginRight: 10 }]}
                    value={person.email}
                    onChangeText={(value) => updateContactPerson(index, 'email', value)}
                    placeholder="이메일"
                    keyboardType="email-address"
                  />
                  <TextInput
                    style={[styles.input, { flex: 1 }]}
                    value={person.phone}
                    onChangeText={(value) => updateContactPerson(index, 'phone', value)}
                    placeholder="연락처"
                    keyboardType="phone-pad"
                  />
                </View>
                <View style={{ alignItems: 'flex-end', marginTop: 10 }}>
                  <TouchableOpacity
                    onPress={() => removeContactPerson(index)}
                    style={{ flexDirection: 'row', alignItems: 'center' }}
                  >
                    <FontAwesome5 name="minus" size={16} color="red" />
                    <Text style={{ marginLeft: 6, color: 'red' }}>제거</Text>
                  </TouchableOpacity>
                </View>
              </View>
            ))}
            {/* 관심 분야 섹션 */}
            <View style={[styles.formGroup, styles.fullWidth]}>
              <View style={styles.sectionHeader}>
                <FontAwesome5 name="heart" size={16} color="#0066CC" />
                <Text style={styles.label}>관심 분야</Text>
                <Text style={styles.helpText}>중복 선택 가능</Text>
              </View>
              
              <View style={styles.interestContainer}>
                {['인증', '모의인증', '컨설팅', '정부지원', '교육사업'].map((activity, index) => (
                  <TouchableOpacity
                    key={index}
                    style={[
                      styles.interestTag,
                      selectedActivities.includes(activity) && styles.interestTagSelected
                    ]}
                    onPress={() => toggleActivity(activity)}
                    activeOpacity={0.7}
                  >
                    <View style={styles.interestTagContent}>
                      <FontAwesome5 
                        name={getIconForActivity(activity)} 
                        size={14} 
                        color={selectedActivities.includes(activity) ? "#fff" : "#0066CC"} 
                      />
                      <Text style={[
                        styles.interestTagText,
                        selectedActivities.includes(activity) && styles.interestTagTextSelected
                      ]}>
                        {activity}
                      </Text>
                    </View>
                    {selectedActivities.includes(activity) && (
                      <FontAwesome5 name="check-circle" size={14} color="#fff" />
                    )}
                  </TouchableOpacity>
                ))}
              </View>
              
              {selectedActivities.length > 0 && (
                <View style={styles.selectedInterests}>
                  <Text style={styles.selectedInterestsLabel}>선택된 관심 분야:</Text>
                  <View style={styles.selectedInterestsContainer}>
                    {selectedActivities.map((activity, index) => (
                      <View key={index} style={styles.selectedInterestChip}>
                        <Text style={styles.selectedInterestText}>{activity}</Text>
                        <TouchableOpacity 
                          onPress={() => toggleActivity(activity)}
                          style={styles.removeInterestButton}
                        >
                          <FontAwesome5 name="times" size={12} color="#fff" />
                        </TouchableOpacity>
                      </View>
                    ))}
                  </View>
                </View>
              )}
            </View>
          </View>
        </View>
        
        {/* Certification Field: select certification types and auto-register */}
        <View style={styles.formSection}>
          <View style={styles.sectionHeader}>
            <FontAwesome5 name="tags" size={18} color="#0066CC" />
            <Text style={styles.sectionTitle}>인증 분야</Text>
          </View>

          <View style={styles.formGroup}>
            <Text style={styles.label}>인증의 종류 선택</Text>
            <Text style={styles.helpText}>중복 선택 가능. 선택된 항목은 아래 '인증 정보'에 자동으로 추가됩니다.</Text>
          </View>

          <View style={styles.interestContainer}>
            {certTypeOptions.filter(opt => opt.value).map(opt => (
              <TouchableOpacity
                key={opt.value}
                style={[
                  styles.interestTag,
                  selectedCertTypes.includes(opt.value) && styles.interestTagSelected
                ]}
                onPress={() => toggleSelectCertType(opt.value)}
                activeOpacity={0.7}
              >
                <View style={styles.interestTagContent}>
                  <FontAwesome5 
                    name={selectedCertTypes.includes(opt.value) ? "check-circle" : "certificate"}
                    size={14}
                    color={selectedCertTypes.includes(opt.value) ? "#fff" : "#0066CC"}
                  />
                  <Text style={[
                    styles.interestTagText,
                    selectedCertTypes.includes(opt.value) && styles.interestTagTextSelected
                  ]}>
                    {opt.label}
                  </Text>
                </View>
                {selectedCertTypes.includes(opt.value) && (
                  <FontAwesome5 name="check-circle" size={14} color="#fff" />
                )}
              </TouchableOpacity>
            ))}
          </View>

          {selectedCertTypes.length > 0 && (
            <View style={styles.selectedInterests}>
              <Text style={styles.selectedInterestsLabel}>선택된 인증 종류:</Text>
              <View style={styles.selectedInterestsContainer}>
                {selectedCertTypes.map((type) => {
                  const label = certTypeOptions.find(opt => opt.value === type)?.label || type;
                  return (
                    <View key={`type_${type}`} style={styles.selectedInterestChip}>
                      <Text style={styles.selectedInterestText}>{label}</Text>
                      <TouchableOpacity 
                        onPress={() => toggleSelectCertType(type)}
                        style={styles.removeInterestButton}
                      >
                        <FontAwesome5 name="times" size={12} color="#fff" />
                      </TouchableOpacity>
                    </View>
                  );
                })}
              </View>
            </View>
          )}
        </View>

        {/* Certification Information Section - Multiple entries */}
        <View style={styles.formSection}>
          <View style={styles.sectionHeader}>
            <FontAwesome5 name="shield-alt" size={18} color="#0066CC" />
            <Text style={styles.sectionTitle}>인증 정보</Text>
          </View>

          <View style={styles.infoCard}>
            <View style={styles.infoCardTitle}>
              <FontAwesome5 name="info-circle" size={16} color="#0066CC" />
              <Text style={styles.infoCardTitleText}>인증 범위 안내</Text>
            </View>
            <Text style={styles.infoCardContent}>
              인증 범위는 조직의 경계 내에서 정보보호 관리체계가 적용되는 모든 활동, 프로세스, 시스템을 포함해야 합니다.
            </Text>
          </View>

          <View style={[styles.formGroup, styles.fullWidth]}> 
            <TouchableOpacity style={styles.primaryButton} onPress={addCertInfo}>
              <FontAwesome5 name="plus" size={16} color="#fff" />
              <Text style={styles.primaryButtonText}>인증 정보 추가</Text>
            </TouchableOpacity>
          </View>

          {certInfos.map((ci, index) => (
            <View key={ci.id} style={styles.certItemContainer}>
              <View style={styles.certItemHeader}>
                <Text style={{ fontWeight: '600', color: '#333' }}>인증 항목 {index + 1}</Text>
                <TouchableOpacity style={styles.removeCertButton} onPress={() => removeCertInfo(ci.id)}>
                  <FontAwesome5 name="minus" size={14} color="red" />
                  <Text style={{ marginLeft: 6, color: 'red' }}>제거</Text>
                </TouchableOpacity>
              </View>

              <View style={styles.formGrid}>
                {/* 인증 명 */}
                <View style={styles.formGroup}>
                  <Text style={styles.label}>인증 명 <Text style={styles.required}>*</Text></Text>
                  <TouchableOpacity
                    style={styles.input}
                    onPress={() => setOpenCertTypeDropdownIndex(index)}
                  >
                    <Text style={ci.certType ? styles.dropdownText : styles.dropdownPlaceholder}>
                      {certTypeOptions.find(opt => opt.value === ci.certType)?.label || '선택해주세요'}
                    </Text>
                    <FontAwesome5 name="chevron-down" size={16} color="#666" />
                  </TouchableOpacity>
                  {renderDropdown(
                    openCertTypeDropdownIndex === index,
                    () => setOpenCertTypeDropdownIndex(null),
                    certTypeOptions,
                    ci.certType,
                    (value: string) => updateCertInfo(ci.id, { certType: value })
                  )}
                </View>

                {/* 심사 유형 */}
                <View style={styles.formGroup}>
                  <Text style={styles.label}>심사 유형</Text>
                  <TouchableOpacity
                    style={styles.input}
                    onPress={() => setOpenAuditTypeDropdownIndex(index)}
                  >
                    <Text style={ci.auditType ? styles.dropdownText : styles.dropdownPlaceholder}>
                      {auditTypeOptions.find(opt => opt.value === ci.auditType)?.label || '선택해주세요'}
                    </Text>
                    <FontAwesome5 name="chevron-down" size={16} color="#666" />
                  </TouchableOpacity>
                  {renderDropdown(
                    openAuditTypeDropdownIndex === index,
                    () => setOpenAuditTypeDropdownIndex(null),
                    auditTypeOptions,
                    ci.auditType,
                    (value: string) => updateCertInfo(ci.id, { auditType: value })
                  )}
                </View>

                {/* 희망 심사일 */}
                <View style={styles.formGroup}>
                  <Text style={styles.label}>희망 심사일 <Text style={styles.required}>*</Text></Text>
                  <TextInput
                    style={styles.input}
                    value={ci.desiredDate}
                    onChangeText={(v) => updateCertInfo(ci.id, { desiredDate: v })}
                    placeholder="YYYY-MM-DD"
                  />
                  <Text style={styles.helpText}>최소 3개월 이후의 날짜를 선택해주세요.</Text>
                </View>

                {/* 인증 등급 */}
                <View style={styles.formGroup}>
                  <Text style={styles.label}>인증 등급</Text>
                  <TouchableOpacity
                    style={styles.input}
                    onPress={() => setOpenCertLevelDropdownIndex(index)}
                  >
                    <Text style={ci.certLevel ? styles.dropdownText : styles.dropdownPlaceholder}>
                      {certLevelOptions.find(opt => opt.value === ci.certLevel)?.label || '선택해주세요'}
                    </Text>
                    <FontAwesome5 name="chevron-down" size={16} color="#666" />
                  </TouchableOpacity>
                  {renderDropdown(
                    openCertLevelDropdownIndex === index,
                    () => setOpenCertLevelDropdownIndex(null),
                    certLevelOptions,
                    ci.certLevel,
                    (value: string) => updateCertInfo(ci.id, { certLevel: value })
                  )}
                </View>

                {/* 인증 범위 */}
                <View style={[styles.formGroup, styles.fullWidth]}>
                  <Text style={styles.label}>인증 범위</Text>
                  <TextInput
                    style={[styles.input, styles.textArea]}
                    value={ci.certScope}
                    onChangeText={(v) => updateCertInfo(ci.id, { certScope: v })}
                    multiline
                    numberOfLines={3}
                    placeholder="인증 적용 범위를 간단히 작성하세요"
                  />
                </View>

                {/* 증빙자료 업로드 */}
                <View style={[styles.formGroup, styles.fullWidth]}>
                  <Text style={styles.label}>증빙자료</Text>
                  <TouchableOpacity style={styles.fileUpload} onPress={() => pickCertFile(ci.id)}>
                    <FontAwesome5 name="cloud-upload-alt" size={32} color="#0066CC" />
                    <Text style={styles.fileUploadText}>파일을 클릭하여 업로드하세요</Text>
                    <View style={styles.fileUploadButton}>
                      <Text style={styles.fileUploadButtonText}>파일 선택</Text>
                    </View>
                  </TouchableOpacity>

                  {ci.files.length > 0 && (
                    <View style={styles.fileList}>
                      {ci.files.map((f, i) => (
                        <View key={`${ci.id}_file_${i}`} style={styles.fileItem}>
                          <Text style={styles.fileName}>{f.name}</Text>
                          <TouchableOpacity onPress={() => removeCertFile(ci.id, i)}>
                            <Text style={styles.fileRemove}>삭제</Text>
                          </TouchableOpacity>
                        </View>
                      ))}
                    </View>
                  )}
                </View>
              </View>
            </View>
          ))}
        </View>
        
        {/* Document Submission Section */}
        <View style={styles.formSection}>
          <View style={styles.sectionHeader}>
            <FontAwesome5 name="file-upload" size={18} color="#0066CC" />
            <Text style={styles.sectionTitle}>필수 서류 제출</Text>
          </View>
          
          <View style={styles.infoCard}>
            <View style={styles.infoCardTitle}>
              <FontAwesome5 name="exclamation-triangle" size={16} color="#0066CC" />
              <Text style={styles.infoCardTitleText}>서류 제출 주의사항</Text>
            </View>
            <Text style={styles.infoCardContent}>
              모든 서류는 최신 버전으로 제출해야 하며, PDF 형식을 권장합니다. 파일 크기는 개당 10MB를 초과할 수 없습니다.
            </Text>
          </View>
          
          <View style={styles.formGrid}>
            
            <View style={[styles.formGroup, styles.fullWidth]}>
              <Text style={styles.label}>사업자등록증 <Text style={styles.required}>*</Text></Text>
              <TouchableOpacity style={styles.fileUpload}>
                <FontAwesome5 name="cloud-upload-alt" size={32} color="#0066CC" />
                <Text style={styles.fileUploadText}>파일을 드래그하거나 클릭하여 업로드하세요</Text>
                <View style={styles.fileUploadButton}>
                  <Text style={styles.fileUploadButtonText}>파일 선택</Text>
                </View>
              </TouchableOpacity>
            </View>
            
            <View style={[styles.formGroup, styles.fullWidth]}>
              <Text style={styles.label}>회사 소개</Text>
              <TouchableOpacity style={styles.fileUpload}>
                <FontAwesome5 name="cloud-upload-alt" size={32} color="#0066CC" />
                <Text style={styles.fileUploadText}>파일을 드래그하거나 클릭하여 업로드하세요</Text>
                <View style={styles.fileUploadButton}>
                  <Text style={styles.fileUploadButtonText}>파일 선택</Text>
                </View>
              </TouchableOpacity>
            </View>
          </View>
          
          <View>
            <View style={[styles.formGroup, styles.fullWidth]}>
              <Text style={styles.label}>인증 서류</Text>
              <TouchableOpacity style={styles.fileUpload}>
                <FontAwesome5 name="cloud-upload-alt" size={32} color="#0066CC" />
                <Text style={styles.fileUploadText}>파일을 드래그하거나 클릭하여 업로드하세요</Text>
                <View style={styles.fileUploadButton}>
                  <Text style={styles.fileUploadButtonText}>파일 선택</Text>
                </View>
              </TouchableOpacity>
            </View>
          </View>
        </View>
    
        {/* Terms Agreement Section */}
        <View style={styles.formSection}>
          <View style={styles.sectionHeader}>
            <FontAwesome5 name="check-square" size={18} color="#0066CC" />
            <Text style={styles.sectionTitle}>약관 동의</Text>
          </View>
          
          <View style={styles.formGrid}>
            <View style={[styles.formGroup, styles.fullWidth]}>
              <TouchableOpacity style={styles.checkboxItem} onPress={() => setTerms1(!terms1)}>
                <FontAwesome5 name={terms1 ? "check-square" : "square"} size={16} color="#0066CC" />
                <Text style={styles.checkboxLabel}>개인정보 수집 및 이용에 동의 <Text style={styles.required}>*</Text></Text>
              </TouchableOpacity>
              <Text style={styles.helpText}>수집된 개인정보는 심사 진행 및 결과 통보 목적으로만 사용됩니다.</Text>
            </View>
            
            <View style={[styles.formGroup, styles.fullWidth]}>
              <TouchableOpacity style={styles.checkboxItem} onPress={() => setTerms2(!terms2)}>
                <FontAwesome5 name={terms2 ? "check-square" : "square"} size={16} color="#0066CC" />
                <Text style={styles.checkboxLabel}>심사 규정 및 절차에 동의 <Text style={styles.required}>*</Text></Text>
              </TouchableOpacity>
            </View>
            
            <View style={[styles.formGroup, styles.fullWidth]}>
              <TouchableOpacity style={styles.checkboxItem} onPress={() => setTerms3(!terms3)}>
                <FontAwesome5 name={terms3 ? "check-square" : "square"} size={16} color="#0066CC" />
                <Text style={styles.checkboxLabel}>제출 서류의 진실성 확인 <Text style={styles.required}>*</Text></Text>
              </TouchableOpacity>
              <Text style={styles.helpText}>허위 서류 제출 시 인증이 취소될 수 있습니다.</Text>
            </View>
          </View>
        </View>
        
        {/* Form Actions */}
        <View style={styles.formActions}>
          <View></View>
          <View style={styles.buttonGroup}>
            <TouchableOpacity style={styles.secondaryButton} onPress={saveDraft}>
              <FontAwesome5 name="save" size={16} color="#333" />
              <Text style={styles.secondaryButtonText}>임시저장</Text>
            </TouchableOpacity>
            {/* '이전' 및 '다음' 버튼 삭제됨 */}
            <TouchableOpacity style={styles.primaryButton} onPress={handleSubmit}>
              <FontAwesome5 name="paper-plane" size={16} color="#fff" />
              <Text style={styles.primaryButtonText}>제출하기</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </ScrollView>
  );
};

export default CompanyQualificationRegistration;