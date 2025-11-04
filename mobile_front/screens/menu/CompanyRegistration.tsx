import React, { useState } from 'react';
import { View, Text, TextInput, ScrollView, TouchableOpacity, Alert, Modal } from 'react-native';
import { FontAwesome5 } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { styles } from '../styles/menu/CompanyRegistration';

const CompanyQualificationRegistration = () => {
  const navigation = useNavigation();
  
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
  const [certType, setCertType] = useState('');
  const [certLevel, setCertLevel] = useState('');
  const [certScope, setCertScope] = useState('');
  const [previousCert, setPreviousCert] = useState('');
  const [desiredDate, setDesiredDate] = useState('');
  const [auditType, setAuditType] = useState('');
  const [specialNotes, setSpecialNotes] = useState('');
  const [consultant, setConsultant] = useState('');
  const [preAudit, setPreAudit] = useState(false);
  const [consulting, setConsulting] = useState(false);
  const [training, setTraining] = useState(false);
  const [fastTrack, setFastTrack] = useState(false);
  const [terms1, setTerms1] = useState(false);
  const [terms2, setTerms2] = useState(false);
  const [terms3, setTerms3] = useState(false);
  
  // Dropdown visibility states
  const [showIndustryDropdown, setShowIndustryDropdown] = useState(false);
  const [showEmployeesDropdown, setShowEmployeesDropdown] = useState(false);
  const [showCertTypeDropdown, setShowCertTypeDropdown] = useState(false);
  const [showCertLevelDropdown, setShowCertLevelDropdown] = useState(false);
  const [showAuditTypeDropdown, setShowAuditTypeDropdown] = useState(false);
  const [showConsultantDropdown, setShowConsultantDropdown] = useState(false);
  
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
  
  const consultantOptions = [
    { label: '선택해주세요', value: '' },
    { label: '박지성 컨설턴트 (ISMS-P 전문)', value: 'consultant1' },
    { label: '이영희 컨설턴트 (ISO 27001 전문)', value: 'consultant2' },
    { label: '김현수 컨설턴트 (의료 분야 전문)', value: 'consultant3' },
    { label: '없음', value: 'none' }
  ];
  
  // Handle form submission
  const handleSubmit = () => {
    // Basic validation
    if (!companyName || !bizRegNo || !ceoName || !establishDate || !industry || 
        !employees || !address || !contactPerson || !contactEmail || !contactPhone ||
        !certType || !certLevel || !certScope || !desiredDate || !auditType ||
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
    
    // Submit logic would go here
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
  
  // Update certification scope based on certification type
  const updateCertScope = (type: string) => {
    setCertType(type);
    
    const scopeTemplates: Record<string, string> = {
      'isms-p': '클라우드 서비스 제공, 고객 데이터 관리, 인사 및 재무 관리',
      'isms': '전사적인 정보보호 관리체계 운영',
      'iso27001': '정보 보안 관리 시스템 전체 프로세스',
      'gs': '제품 설계, 개발, 생산, 품질 관리',
      'cppg': '개인정보 수집, 이용, 제공, 파기 전 과정'
    };
    
    if (type && scopeTemplates[type]) {
      // In a real app, we would update the placeholder or provide a suggestion
    }
  };
  
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
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <FontAwesome5 name="arrow-left" size={20} color="#0066CC" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>기업 자격 등록</Text>
        <View style={{ width: 20 }} />
      </View>
      
      {/* Progress Indicator */}
      <View style={styles.progressContainer}>
        <View style={styles.progressBackground}>
          <View style={[styles.progressFill, { width: '33%' }]} />
        </View>
        <View style={styles.progressSteps}>
          <View style={styles.progressStep}>
            <View style={[styles.stepCircle, styles.stepCircleActive]}>
              <Text style={styles.stepText}>1</Text>
            </View>
            <Text style={styles.stepLabel}>기본 정보</Text>
          </View>
          <View style={styles.progressStep}>
            <View style={styles.stepCircle}>
              <Text style={styles.stepText}>2</Text>
            </View>
            <Text style={styles.stepLabel}>인증 정보</Text>
          </View>
          <View style={styles.progressStep}>
            <View style={styles.stepCircle}>
              <Text style={styles.stepText}>3</Text>
            </View>
            <Text style={styles.stepLabel}>서류 제출</Text>
          </View>
          <View style={styles.progressStep}>
            <View style={styles.stepCircle}>
              <Text style={styles.stepText}>4</Text>
            </View>
            <Text style={styles.stepLabel}>검토 및 제출</Text>
          </View>
        </View>
      </View>
      
      {/* Form Container */}
      <View style={styles.formContainer}>
        <View style={styles.formHeader}>
          <Text style={styles.formTitle}>기업 자격 등록</Text>
          <Text style={styles.formSubtitle}>정확한 정보를 입력해 주시면 빠르고 정확하게 심사를 진행할 수 있습니다.</Text>
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
            
            <View style={styles.formGroup}>
              <Text style={styles.label}>담당자 성함 <Text style={styles.required}>*</Text></Text>
              <TextInput
                style={styles.input}
                value={contactPerson}
                onChangeText={setContactPerson}
                placeholder="담당자 성함을 입력하세요"
              />
            </View>
            
            <View style={styles.formGroup}>
              <Text style={styles.label}>담당자 이메일 <Text style={styles.required}>*</Text></Text>
              <TextInput
                style={styles.input}
                value={contactEmail}
                onChangeText={setContactEmail}
                placeholder="example@company.com"
                keyboardType="email-address"
              />
            </View>
            
            <View style={styles.formGroup}>
              <Text style={styles.label}>담당자 연락처 <Text style={styles.required}>*</Text></Text>
              <TextInput
                style={styles.input}
                value={contactPhone}
                onChangeText={setContactPhone}
                placeholder="010-0000-0000"
                keyboardType="phone-pad"
              />
            </View>
          </View>
        </View>
        
        {/* Certification Information Section */}
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
          
          <View style={styles.formGrid}>
            <View style={styles.formGroup}>
              <Text style={styles.label}>인증 종류 <Text style={styles.required}>*</Text></Text>
              <TouchableOpacity 
                style={styles.input} 
                onPress={() => setShowCertTypeDropdown(true)}
              >
                <Text style={certType ? styles.dropdownText : styles.dropdownPlaceholder}>
                  {certTypeOptions.find(opt => opt.value === certType)?.label || '선택해주세요'}
                </Text>
                <FontAwesome5 name="chevron-down" size={16} color="#666" />
              </TouchableOpacity>
              {renderDropdown(
                showCertTypeDropdown,
                () => setShowCertTypeDropdown(false),
                certTypeOptions,
                certType,
                updateCertScope
              )}
            </View>
            
            <View style={styles.formGroup}>
              <Text style={styles.label}>인증 등급 <Text style={styles.required}>*</Text></Text>
              <TouchableOpacity 
                style={styles.input} 
                onPress={() => setShowCertLevelDropdown(true)}
              >
                <Text style={certLevel ? styles.dropdownText : styles.dropdownPlaceholder}>
                  {certLevelOptions.find(opt => opt.value === certLevel)?.label || '선택해주세요'}
                </Text>
                <FontAwesome5 name="chevron-down" size={16} color="#666" />
              </TouchableOpacity>
              {renderDropdown(
                showCertLevelDropdown,
                () => setShowCertLevelDropdown(false),
                certLevelOptions,
                certLevel,
                setCertLevel
              )}
            </View>
            
            <View style={[styles.formGroup, styles.fullWidth]}>
              <Text style={styles.label}>인증 범위 <Text style={styles.required}>*</Text></Text>
              <TextInput
                style={[styles.input, styles.textArea]}
                value={certScope}
                onChangeText={setCertScope}
                placeholder="예: 클라우드 기반 SaaS 서비스 개발 및 운영, 고객 데이터 관리, 인사 및 재무 관리"
                multiline
                numberOfLines={4}
              />
              <Text style={styles.helpText}>조직의 주요 업무, 프로세스, 시스템, 물리적 위치 등을 구체적으로 기재해주세요.</Text>
            </View>
            
            <View style={[styles.formGroup, styles.fullWidth]}>
              <Text style={styles.label}>이전 인증 이력</Text>
              <TextInput
                style={[styles.input, styles.textArea]}
                value={previousCert}
                onChangeText={setPreviousCert}
                placeholder="이전에 받은 인증이 있다면 인증 종류, 유효기간, 인증기관을 기재해주세요."
                multiline
                numberOfLines={3}
              />
            </View>
            
            <View style={styles.formGroup}>
              <Text style={styles.label}>희망 심사일 <Text style={styles.required}>*</Text></Text>
              <TextInput
                style={styles.input}
                value={desiredDate}
                onChangeText={setDesiredDate}
                placeholder="YYYY-MM-DD"
              />
              <Text style={styles.helpText}>최소 3개월 이후의 날짜를 선택해주세요.</Text>
            </View>
            
            <View style={styles.formGroup}>
              <Text style={styles.label}>심사 유형 <Text style={styles.required}>*</Text></Text>
              <TouchableOpacity 
                style={styles.input} 
                onPress={() => setShowAuditTypeDropdown(true)}
              >
                <Text style={auditType ? styles.dropdownText : styles.dropdownPlaceholder}>
                  {auditTypeOptions.find(opt => opt.value === auditType)?.label || '선택해주세요'}
                </Text>
                <FontAwesome5 name="chevron-down" size={16} color="#666" />
              </TouchableOpacity>
              {renderDropdown(
                showAuditTypeDropdown,
                () => setShowAuditTypeDropdown(false),
                auditTypeOptions,
                auditType,
                setAuditType
              )}
            </View>
          </View>
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
              <Text style={styles.label}>인증 범위 관련 조직도 <Text style={styles.required}>*</Text></Text>
              <TouchableOpacity style={styles.fileUpload}>
                <FontAwesome5 name="cloud-upload-alt" size={32} color="#0066CC" />
                <Text style={styles.fileUploadText}>파일을 드래그하거나 클릭하여 업로드하세요</Text>
                <View style={styles.fileUploadButton}>
                  <Text style={styles.fileUploadButtonText}>파일 선택</Text>
                </View>
              </TouchableOpacity>
            </View>
            
            <View style={[styles.formGroup, styles.fullWidth]}>
              <Text style={styles.label}>정보보호 정책 및 절차서 <Text style={styles.required}>*</Text></Text>
              <TouchableOpacity style={styles.fileUpload}>
                <FontAwesome5 name="cloud-upload-alt" size={32} color="#0066CC" />
                <Text style={styles.fileUploadText}>파일을 드래그하거나 클릭하여 업로드하세요</Text>
                <View style={styles.fileUploadButton}>
                  <Text style={styles.fileUploadButtonText}>파일 선택</Text>
                </View>
              </TouchableOpacity>
            </View>
            
            <View style={[styles.formGroup, styles.fullWidth]}>
              <Text style={styles.label}>자체 평가 보고서</Text>
              <TouchableOpacity style={styles.fileUpload}>
                <FontAwesome5 name="cloud-upload-alt" size={32} color="#0066CC" />
                <Text style={styles.fileUploadText}>파일을 드래그하거나 클릭하여 업로드하세요</Text>
                <View style={styles.fileUploadButton}>
                  <Text style={styles.fileUploadButtonText}>파일 선택</Text>
                </View>
              </TouchableOpacity>
            </View>
            
            <View style={[styles.formGroup, styles.fullWidth]}>
              <Text style={styles.label}>기타 참고 자료</Text>
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
        
        {/* Additional Information Section */}
        <View style={styles.formSection}>
          <View style={styles.sectionHeader}>
            <FontAwesome5 name="comment-dots" size={18} color="#0066CC" />
            <Text style={styles.sectionTitle}>추가 정보</Text>
          </View>
          
          <View style={styles.formGrid}>
            <View style={[styles.formGroup, styles.fullWidth]}>
              <Text style={styles.label}>특이사항</Text>
              <TextInput
                style={[styles.input, styles.textArea]}
                value={specialNotes}
                onChangeText={setSpecialNotes}
                placeholder="심사 시 특별히 고려해야 할 사항이 있다면 기재해주세요."
                multiline
                numberOfLines={4}
              />
            </View>
            
            <View style={[styles.formGroup, styles.fullWidth]}>
              <Text style={styles.label}>선호 컨설턴트</Text>
              <TouchableOpacity 
                style={styles.input} 
                onPress={() => setShowConsultantDropdown(true)}
              >
                <Text style={consultant ? styles.dropdownText : styles.dropdownPlaceholder}>
                  {consultantOptions.find(opt => opt.value === consultant)?.label || '선택해주세요'}
                </Text>
                <FontAwesome5 name="chevron-down" size={16} color="#666" />
              </TouchableOpacity>
              {renderDropdown(
                showConsultantDropdown,
                () => setShowConsultantDropdown(false),
                consultantOptions,
                consultant,
                setConsultant
              )}
              <Text style={styles.helpText}>특정 컨설턴트와 함께하고 싶으시다면 선택해주세요.</Text>
            </View>
            
            <View style={[styles.formGroup, styles.fullWidth]}>
              <Text style={styles.label}>추가 서비스</Text>
              <View style={styles.checkboxGroup}>
                <TouchableOpacity style={styles.checkboxItem} onPress={() => setPreAudit(!preAudit)}>
                  <FontAwesome5 name={preAudit ? "check-square" : "square"} size={16} color="#0066CC" />
                  <Text style={styles.checkboxLabel}>사전 심사</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.checkboxItem} onPress={() => setConsulting(!consulting)}>
                  <FontAwesome5 name={consulting ? "check-square" : "square"} size={16} color="#0066CC" />
                  <Text style={styles.checkboxLabel}>컨설팅 서비스</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.checkboxItem} onPress={() => setTraining(!training)}>
                  <FontAwesome5 name={training ? "check-square" : "square"} size={16} color="#0066CC" />
                  <Text style={styles.checkboxLabel}>교육 프로그램</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.checkboxItem} onPress={() => setFastTrack(!fastTrack)}>
                  <FontAwesome5 name={fastTrack ? "check-square" : "square"} size={16} color="#0066CC" />
                  <Text style={styles.checkboxLabel}>긴급 심사</Text>
                </TouchableOpacity>
              </View>
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
            <TouchableOpacity style={styles.secondaryButton}>
              <FontAwesome5 name="arrow-left" size={16} color="#333" />
              <Text style={styles.secondaryButtonText}>이전</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.secondaryButton}>
              <Text style={styles.secondaryButtonText}>다음</Text>
              <FontAwesome5 name="arrow-right" size={16} color="#333" />
            </TouchableOpacity>
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