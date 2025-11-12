import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, ScrollView, TouchableOpacity, Alert, KeyboardAvoidingView, Platform, TouchableWithoutFeedback, Keyboard } from 'react-native';
import { FontAwesome5 } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

import { styles } from '../styles/menu/RegistrationPersonal';

export const RegistrationPersonal: React.FC = () => {
  const navigation = useNavigation();
  
  // Form state
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [experienceYears, setExperienceYears] = useState('');
  const [hourlyRate, setHourlyRate] = useState('');
  const [location, setLocation] = useState('');
  const [bio, setBio] = useState('');
  const [specialties, setSpecialties] = useState<string[]>([]);
  const [selectedSpecialties, setSelectedSpecialties] = useState<string[]>([]);
  const [selectedCountries, setSelectedCountries] = useState<string[]>([]);
const [selectedActivities, setSelectedActivities] = useState<string[]>([]);
  const [experiences, setExperiences] = useState<Array<{title: string, period: string, company: string, description: string}>>([
    { title: '정보보호 컨설턴트', period: '2020.01 - 현재', company: '(주)보안솔루션', description: 'ISMS-P, ISO 27001 컨설팅 수행' }
  ]);
  const [certifications, setCertifications] = useState<Array<{name: string, status: string, issueDate: string, expiryDate: string}>>([
    { name: '정보보호전문가', status: 'valid', issueDate: '2018.05', expiryDate: '2025.05' }
  ]);
  
  // Available specialties and countries
  const availableSpecialties = ['금융', '의료', '제조', 'IT', '공공', '유통', '교육', '물류', '환경', '식품', 'ISMS-P', 'ISMS', 'ISO 27001', 'ISO 27701', 'GS 인증', 'CPPG', 'CSAP', 'ESPM'];
  
  
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
    
    // Submit logic would go here
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
    // Save draft logic would go here
    Alert.alert('임시 저장', '임시 저장이 완료되었습니다.');
  };

  return (
    <KeyboardAvoidingView style={{ flex: 1 }} behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
        <ScrollView style={styles.container} keyboardShouldPersistTaps="handled">
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <FontAwesome5 name="arrow-left" size={20} color="#0066CC" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>개인 자격 등록</Text>
        <View style={{ width: 20 }} />
      </View>
      
      {/* Progress Indicator removed as per request */}
      
      {/* Form Container */}
      <View style={styles.formContainer}>
        <View style={styles.formHeader}>
          {/* 중복 타이틀 제거: 상단 헤더에 타이틀이 이미 표시되므로 폼 내부 타이틀은 제거했습니다. */}
          <Text style={styles.formSubtitle}>전문가와 기업을 연결하는 최적의 매칭 플랫폼입니다.</Text>
        </View>
        
        {/* Profile Completion */}
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
            <FontAwesome5 name="user" size={18} color="#0066CC" />
            <Text style={styles.sectionTitle}>기본 정보</Text>
          </View>
          
          <View style={styles.formGrid}>
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
            
            <View style={styles.formGroup}>
              <Text style={styles.label}>시간당 요금대 (만원) <Text style={styles.required}>*</Text></Text>
              <TextInput
                style={styles.input}
                value={hourlyRate}
                onChangeText={setHourlyRate}
                placeholder="예: 50-100"
              />
            </View>
            
            <View style={styles.formGroup}>
              <Text style={styles.label}>활동 지역 <Text style={styles.required}>*</Text></Text>
              <TextInput
                style={styles.input}
                value={location}
                onChangeText={setLocation}
                placeholder="서울"
              />
            </View>
            
            <View style={[styles.formGroup, styles.fullWidth]}>
              <Text style={styles.label}>자기소개 <Text style={styles.required}>*</Text></Text>
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
              제출된 자격증은 3개월 내 수동 검증되며, 검증 완료 시 'Verified Consultant' 배지가 표시됩니다.
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
              <TouchableOpacity style={styles.fileUploadSection}>
                <FontAwesome5 name="cloud-upload-alt" size={32} color="#0066CC" />
                <Text style={styles.fileUploadText}>파일을 드래그하거나 클릭하여 업로드하세요</Text>
                <View style={styles.fileUploadButton}>
                  <Text style={styles.fileUploadButtonText}>파일 선택</Text>
                </View>
              </TouchableOpacity>
              <Text style={styles.helpText}>PDF, DOC, DOCX 형식 (최대 5MB)</Text>
            </View>
            
            <View style={[styles.formGroup, styles.fullWidth]}>
              <Text style={styles.label}>자격증 이미지 <Text style={styles.required}>*</Text></Text>
              <TouchableOpacity style={styles.fileUploadSection}>
                <FontAwesome5 name="cloud-upload-alt" size={32} color="#0066CC" />
                <Text style={styles.fileUploadText}>자격증 스캔본을 업로드하세요 (최대 3개)</Text>
                <View style={styles.fileUploadButton}>
                  <Text style={styles.fileUploadButtonText}>파일 선택</Text>
                </View>
              </TouchableOpacity>
              <Text style={styles.helpText}>JPG, PNG, PDF 형식 (최대 5MB)</Text>
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
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
};

export default RegistrationPersonal;