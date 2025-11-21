import React, { useState } from 'react';
import {
  View,
  Text,
  SafeAreaView,
  TouchableOpacity,
  ScrollView,
  TextInput,
  Alert,
  FlatList,
} from 'react-native';
import { Ionicons, FontAwesome5 } from '@expo/vector-icons';
import SubformHeader from '../components/SubformHeader';
import { styles } from '../styles/menu/CertAudRegistration';

// TypeScript Interfaces
type Certification = {
  id: string;
  name: string;
  renewalDate: string;
  file?: FileInfo;
};

type Experience = {
  id: string;
  institution: string;
  field: string;
  period: string;
};

type FileInfo = {
  id: string;
  name: string;
  size: string;
  type: 'cert' | 'career';
};

type Expertise = 'isms-p' | 'iso27001' | 'iso27701' | 'iso20000' | 'iso22301' | 'pims';
type Region = 'seoul' | 'gyeonggi' | 'incheon' | 'busan' | 'daegu' | 'daejeon' | 'all';
type FeeType = 'daily' | 'project';

interface FormData {
  certifications: Certification[];
  expertise: Expertise[];
  experiences: Experience[];
  regions: Region[];
  feeType: FeeType | null;
  minFee: string;
  maxFee: string;
  certFiles: FileInfo[];
  careerFiles: FileInfo[];
}

const CertAudRegistration = ({ navigation }: any) => {
  // State Management
  const [formData, setFormData] = useState<FormData>({
    certifications: [],
    expertise: [],
    experiences: [],
    regions: [],
    feeType: null,
    minFee: '',
    maxFee: '',
    certFiles: [],
    careerFiles: []
  });

  const [selectedExpertise, setSelectedExpertise] = useState<Expertise[]>([]);
  const [selectedRegions, setSelectedRegions] = useState<Region[]>([]);
  const [selectedFeeType, setSelectedFeeType] = useState<FeeType | null>(null);

  // Add Certification Item
  const addCertification = () => {
    const newCert: Certification = {
      id: Date.now().toString(),
      name: '',
      renewalDate: ''
    };
    setFormData(prev => ({
      ...prev,
      certifications: [...prev.certifications, newCert]
    }));
  };

  // Update Certification Field
  const updateCertification = (id: string, field: keyof Certification, value: string) => {
    setFormData(prev => ({
      ...prev,
      certifications: prev.certifications.map(cert =>
        cert.id === id ? { ...cert, [field]: value } : cert
      )
    }));
  };

  // Remove Certification
  const removeCertification = (id: string) => {
    setFormData(prev => ({
      ...prev,
      certifications: prev.certifications.filter(cert => cert.id !== id)
    }));
  };

  // Add Experience Item
  const addExperience = () => {
    const newExp: Experience = {
      id: Date.now().toString(),
      institution: '',
      field: '',
      period: ''
    };
    setFormData(prev => ({
      ...prev,
      experiences: [...prev.experiences, newExp]
    }));
  };

  // Update Experience Field
  const updateExperience = (id: string, field: keyof Experience, value: string) => {
    setFormData(prev => ({
      ...prev,
      experiences: prev.experiences.map(exp =>
        exp.id === id ? { ...exp, [field]: value } : exp
      )
    }));
  };

  // Remove Experience
  const removeExperience = (id: string) => {
    setFormData(prev => ({
      ...prev,
      experiences: prev.experiences.filter(exp => exp.id !== id)
    }));
  };

  // Toggle Expertise Selection
  const toggleExpertise = (expertise: Expertise) => {
    setSelectedExpertise(prev =>
      prev.includes(expertise)
        ? prev.filter(item => item !== expertise)
        : [...prev, expertise]
    );
  };

  // Toggle Region Selection
  const toggleRegion = (region: Region) => {
    setSelectedRegions(prev =>
      prev.includes(region)
        ? prev.filter(item => item !== region)
        : [...prev, region]
    );
  };

  // Select Fee Type
  const selectFeeType = (type: FeeType) => {
    setSelectedFeeType(type);
    setFormData(prev => ({ ...prev, feeType: type }));
  };

  // Handle File Upload (Mock implementation)
  const handleFileUpload = (type: 'cert' | 'career') => {
    Alert.alert('파일 업로드', '파일 선택 기능은 실제 구현에서 처리됩니다.');
  };

  // Handle Form Submission
  const handleSubmit = () => {
    // Validate form data
    if (formData.certifications.length === 0) {
      Alert.alert('오류', '최소 하나의 자격증을 추가해주세요.');
      return;
    }

    if (selectedExpertise.length === 0) {
      Alert.alert('오류', '전문 분야를 선택해주세요.');
      return;
    }

    if (formData.experiences.length === 0) {
      Alert.alert('오류', '최소 하나의 경력을 추가해주세요.');
      return;
    }

    if (selectedRegions.length === 0) {
      Alert.alert('오류', '심사 가능 지역을 선택해주세요.');
      return;
    }

    if (!selectedFeeType) {
      Alert.alert('오류', '비용 타입을 선택해주세요.');
      return;
    }

    Alert.alert('성공', '심사 인증원 정보가 성공적으로 등록되었습니다.');
    navigation.goBack();
  };

  // Handle Temporary Save
  const handleTempSave = () => {
    Alert.alert('임시 저장', '임시 저장되었습니다.');
  };

  // Render Certification Item
  const renderCertification = ({ item }: { item: Certification }) => (
    <View style={styles.listItem}>
      <TextInput
        style={styles.input}
        placeholder="자격증명 (예: ISMS-P 심사원)"
        value={item.name}
        onChangeText={(text) => updateCertification(item.id, 'name', text)}
      />
      <View style={styles.dateInputContainer}>
        <Text style={styles.dateLabel}>갱신일자</Text>
        <TextInput
          style={styles.input}
          placeholder="YYYY-MM-DD"
          value={item.renewalDate}
          onChangeText={(text) => updateCertification(item.id, 'renewalDate', text)}
        />
      </View>
      <TouchableOpacity
        style={styles.fileUploadBtn}
        onPress={() => handleFileUpload('cert')}
      >
        <Ionicons name="document-attach" size={16} color="#fff" />
        <Text style={styles.fileUploadText}>사본</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.removeBtn}
        onPress={() => removeCertification(item.id)}
      >
        <Ionicons name="close-circle" size={24} color="#e74c3c" />
      </TouchableOpacity>
    </View>
  );

  // Render Experience Item
  const renderExperience = ({ item }: { item: Experience }) => (
    <View style={styles.listItem}>
      <TextInput
        style={styles.input}
        placeholder="소속 기관명"
        value={item.institution}
        onChangeText={(text) => updateExperience(item.id, 'institution', text)}
      />
      <TextInput
        style={styles.input}
        placeholder="심사 분야"
        value={item.field}
        onChangeText={(text) => updateExperience(item.id, 'field', text)}
      />
      <TextInput
        style={styles.input}
        placeholder="기간 (예: 2020.01 ~ 2023.12)"
        value={item.period}
        onChangeText={(text) => updateExperience(item.id, 'period', text)}
      />
      <TouchableOpacity
        style={styles.removeBtn}
        onPress={() => removeExperience(item.id)}
      >
        <Ionicons name="close-circle" size={24} color="#e74c3c" />
      </TouchableOpacity>
    </View>
  );

  return (
    <SafeAreaView style={styles.safeArea}>
      {/* Header */}
      <SubformHeader
        title="심사 인증원 등록"
        navigation={navigation as any}
        onHome={() => navigation.navigate('Home')}
      />

      <ScrollView style={styles.container}>
        {/* Certifications Section */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <FontAwesome5 name="award" size={18} color="#4a6fdc" />
            <Text style={styles.sectionTitle}>심사원 자격증</Text>
          </View>
          
          <FlatList
            data={formData.certifications}
            keyExtractor={(item) => item.id}
            renderItem={renderCertification}
            scrollEnabled={false}
          />
          
          <TouchableOpacity style={styles.addButton} onPress={addCertification}>
            <Ionicons name="add" size={20} color="#fff" />
            <Text style={styles.addButtonText}>자격증 추가</Text>
          </TouchableOpacity>
        </View>

        {/* Certificate File Upload Section */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <FontAwesome5 name="file-pdf" size={18} color="#4a6fdc" />
            <Text style={styles.sectionTitle}>자격증 사본 업로드</Text>
          </View>
          
          <View style={styles.fileUploadSection}>
            <Text style={styles.fileUploadLabel}>자격증 사본 파일 첨부 (PDF, JPG, PNG)</Text>
            
            <TouchableOpacity
              style={styles.fileUploadBtn}
              onPress={() => handleFileUpload('cert')}
            >
              <Ionicons name="cloud-upload" size={16} color="#fff" />
              <Text style={styles.fileUploadText}>파일 선택</Text>
            </TouchableOpacity>
            
            <Text style={styles.fileInfo}>
              • 최대 10MB까지 업로드 가능합니다.{"\n"}
              • PDF, JPG, PNG 파일만 업로드 가능합니다.
            </Text>
          </View>
        </View>

        {/* Expertise Section */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <FontAwesome5 name="certificate" size={18} color="#4a6fdc" />
            <Text style={styles.sectionTitle}>전문 분야</Text>
          </View>
          
          <View style={styles.multiSelectContainer}>
            {[
              { value: 'isms-p', label: 'ISMS-P' },
              { value: 'iso27001', label: 'ISO 27001' },
              { value: 'iso27701', label: 'ISO 27701' },
              { value: 'iso20000', label: 'ISO 20000' },
              { value: 'iso22301', label: 'ISO 22301' },
              { value: 'pims', label: 'PIMS' }
            ].map((item) => (
              <TouchableOpacity
                key={item.value}
                style={[
                  styles.selectTag,
                  selectedExpertise.includes(item.value as Expertise) && styles.selectTagSelected
                ]}
                onPress={() => toggleExpertise(item.value as Expertise)}
              >
                <Text style={[
                  styles.selectTagText,
                  selectedExpertise.includes(item.value as Expertise) && styles.selectTagTextSelected
                ]}>
                  {item.label}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Experience Section */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <FontAwesome5 name="briefcase" size={18} color="#4a6fdc" />
            <Text style={styles.sectionTitle}>심사 경력</Text>
          </View>
          
          <FlatList
            data={formData.experiences}
            keyExtractor={(item) => item.id}
            renderItem={renderExperience}
            scrollEnabled={false}
          />
          
          <TouchableOpacity style={styles.addButton} onPress={addExperience}>
            <Ionicons name="add" size={20} color="#fff" />
            <Text style={styles.addButtonText}>경력 추가</Text>
          </TouchableOpacity>
        </View>

        {/* Career File Upload Section */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <FontAwesome5 name="file-contract" size={18} color="#4a6fdc" />
            <Text style={styles.sectionTitle}>경력증명서 업로드</Text>
          </View>
          
          <View style={styles.fileUploadSection}>
            <Text style={styles.fileUploadLabel}>경력증명서 파일 첨부 (PDF, JPG, PNG)</Text>
            
            <TouchableOpacity
              style={styles.fileUploadBtn}
              onPress={() => handleFileUpload('career')}
            >
              <Ionicons name="cloud-upload" size={16} color="#fff" />
              <Text style={styles.fileUploadText}>파일 선택</Text>
            </TouchableOpacity>
            
            <Text style={styles.fileInfo}>
              • 최대 10MB까지 업로드 가능합니다.{"\n"}
              • PDF, JPG, PNG 파일만 업로드 가능합니다.{"\n"}
              • 재직증명서, 경력증명서, 자격증 사본 등을 첨부해주세요.
            </Text>
          </View>
        </View>

        {/* Regions Section */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Ionicons name="map" size={18} color="#4a6fdc" />
            <Text style={styles.sectionTitle}>심사 가능 지역</Text>
          </View>
          
          <View style={styles.multiSelectContainer}>
            {[
              { value: 'seoul', label: '서울' },
              { value: 'gyeonggi', label: '경기' },
              { value: 'incheon', label: '인천' },
              { value: 'busan', label: '부산' },
              { value: 'daegu', label: '대구' },
              { value: 'daejeon', label: '대전' },
              { value: 'all', label: '전국' }
            ].map((item) => (
              <TouchableOpacity
                key={item.value}
                style={[
                  styles.selectTag,
                  selectedRegions.includes(item.value as Region) && styles.selectTagSelected
                ]}
                onPress={() => toggleRegion(item.value as Region)}
              >
                <Text style={[
                  styles.selectTagText,
                  selectedRegions.includes(item.value as Region) && styles.selectTagTextSelected
                ]}>
                  {item.label}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Fee Section */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <FontAwesome5 name="won-sign" size={18} color="#4a6fdc" />
            <Text style={styles.sectionTitle}>심사 비용</Text>
          </View>
          
          <View style={styles.feeTypes}>
            <TouchableOpacity
              style={[
                styles.feeType,
                selectedFeeType === 'daily' && styles.feeTypeSelected
              ]}
              onPress={() => selectFeeType('daily')}
            >
              <Text style={[
                styles.feeTypeText,
                selectedFeeType === 'daily' && styles.feeTypeTextSelected
              ]}>
                일당
              </Text>
            </TouchableOpacity>
            
            <TouchableOpacity
              style={[
                styles.feeType,
                selectedFeeType === 'project' && styles.feeTypeSelected
              ]}
              onPress={() => selectFeeType('project')}
            >
              <Text style={[
                styles.feeTypeText,
                selectedFeeType === 'project' && styles.feeTypeTextSelected
              ]}>
                프로젝트당
              </Text>
            </TouchableOpacity>
          </View>
          
          <View style={styles.feeInputs}>
            <View style={styles.inputGroup}>
              <Text style={styles.inputLabel}>최소 비용</Text>
              <TextInput
                style={styles.input}
                placeholder="예: 50만원"
                value={formData.minFee}
                onChangeText={(text) => setFormData(prev => ({ ...prev, minFee: text }))}
                keyboardType="numeric"
              />
            </View>
            
            <View style={styles.inputGroup}>
              <Text style={styles.inputLabel}>최대 비용</Text>
              <TextInput
                style={styles.input}
                placeholder="예: 80만원"
                value={formData.maxFee}
                onChangeText={(text) => setFormData(prev => ({ ...prev, maxFee: text }))}
                keyboardType="numeric"
              />
            </View>
          </View>
        </View>

        {/* Form Actions */}
        <View style={styles.formActions}>
          <TouchableOpacity style={styles.secondaryButton} onPress={handleTempSave}>
            <Text style={styles.secondaryButtonText}>임시 저장</Text>
          </TouchableOpacity>
          
          <TouchableOpacity style={styles.primaryButton} onPress={handleSubmit}>
            <Text style={styles.primaryButtonText}>등록 완료</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default CertAudRegistration;