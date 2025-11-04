import React, { useState } from 'react';
import { View, Text, TextInput, ScrollView, TouchableOpacity, Alert } from 'react-native';
import { FontAwesome5 } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { styles } from '../styles/menu/ExpertRecruitment';

export const ExpertRecruitment: React.FC = () => {
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
  const [deadline, setDeadline] = useState('');
  const [isUrgent, setIsUrgent] = useState(false);
  const [mainTasks, setMainTasks] = useState('');
  const [projectDetails, setProjectDetails] = useState('');
  const [benefits, setBenefits] = useState<string[]>([]);

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
    { label: '인턴', value: 'intern' }
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

  // Toggle benefit selection
  const toggleBenefit = (value: string) => {
    if (benefits.includes(value)) {
      setBenefits(benefits.filter(benefit => benefit !== value));
    } else {
      setBenefits([...benefits, value]);
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
      certifications: certType,
      salary: {
        type: salaryType,
        range: salaryRange
      },
      employment: {
        type: employmentType,
        workHours,
        workDays
      },
      deadline,
      isUrgent,
      tasks: {
        main: mainTasks,
        projectDetails
      },
      benefits
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
        <Text style={styles.headerTitle}>인증 전문가 모집</Text>
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

        {/* Submit Button */}
        <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
          <Text style={styles.submitButtonText}>등록하기</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

export default ExpertRecruitment;