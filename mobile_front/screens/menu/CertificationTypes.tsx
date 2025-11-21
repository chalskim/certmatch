import React, { useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  TextInput,
  StyleSheet,
  SafeAreaView,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { FontAwesome5 } from '@expo/vector-icons';
import SubformHeader from '../components/SubformHeader';

interface CertificationType {
  id: string;
  name: string;
  description: string;
  icon: string;
  category: string;
}

const certificationTypes: CertificationType[] = [
  {
    id: '1',
    name: 'ISO 9001',
    description: '품질경영시스템',
    icon: 'certificate',
    category: '경영시스템'
  },
  {
    id: '2',
    name: 'ISO 14001',
    description: '환경경영시스템',
    icon: 'leaf',
    category: '경영시스템'
  },
  {
    id: '3',
    name: 'ISO 45001',
    description: '안전보건경영시스템',
    icon: 'hard-hat',
    category: '경영시스템'
  },
  {
    id: '4',
    name: 'ISO 27001',
    description: '정보보안경영시스템',
    icon: 'shield-alt',
    category: '정보보안'
  },
  {
    id: '5',
    name: 'ISO 22000',
    description: '식품안전경영시스템',
    icon: 'utensils',
    category: '식품안전'
  },
  {
    id: '6',
    name: 'ISO 13485',
    description: '의료기기품질경영시스템',
    icon: 'heart',
    category: '의료기기'
  }
];

export default function CertificationTypes() {
  const navigation = useNavigation();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('전체');

  const categories = ['전체', '경영시스템', '정보보안', '식품안전', '의료기기'];

  const filteredCertifications = certificationTypes.filter(cert => {
    const matchesSearch = cert.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         cert.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === '전체' || cert.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const handleBack = () => {
    navigation.goBack();
  };

  const handleCertificationSelect = (certification: CertificationType) => {
    // TODO: Navigate to certification detail screen
    console.log('Selected certification:', certification);
  };

  return (
    <SafeAreaView style={styles.container}>
      <SubformHeader
        title="인증 종류"
        showBack
        showHome
        onBack={handleBack}
        navigation={navigation as any}
        onHome={() => (navigation as any).navigate('Home')}
      />

      <ScrollView style={styles.content}>
        {/* 정부 지원 배너 */}
        <TouchableOpacity style={styles.supportBanner}>
          <FontAwesome5 name="hands-helping" size={24} color="#fff" />
          <View style={styles.supportTextContainer}>
            <Text style={styles.supportTitle}>정부 인증 지원 사업</Text>
            <Text style={styles.supportDescription}>중소기업 인증비용 지원 프로그램 확인하기</Text>
          </View>
        </TouchableOpacity>

        {/* 검색 섹션 */}
        <View style={styles.searchSection}>
          <View style={styles.searchContainer}>
            <FontAwesome5 name="search" size={16} color="#999" style={styles.searchIcon} />
            <TextInput
              style={styles.searchInput}
              placeholder="인증 종류 검색..."
              value={searchQuery}
              onChangeText={setSearchQuery}
            />
          </View>
        </View>

        {/* 카테고리 필터 */}
        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.categoryContainer}>
          {categories.map((category) => (
            <TouchableOpacity
              key={category}
              style={[
                styles.categoryButton,
                selectedCategory === category && styles.categoryButtonActive
              ]}
              onPress={() => setSelectedCategory(category)}
            >
              <Text style={[
                styles.categoryText,
                selectedCategory === category && styles.categoryTextActive
              ]}>
                {category}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>

        {/* 인증 종류 그리드 */}
        <View style={styles.certGrid}>
          {filteredCertifications.map((certification) => (
            <TouchableOpacity
              key={certification.id}
              style={styles.certCard}
              onPress={() => handleCertificationSelect(certification)}
            >
              <FontAwesome5
                name={certification.icon as any}
                size={32}
                color="#0066CC"
                style={styles.certIcon}
              />
              <Text style={styles.certName}>{certification.name}</Text>
              <Text style={styles.certDescription}>{certification.description}</Text>
              <TouchableOpacity style={styles.compareButton}>
                <Text style={styles.compareButtonText}>비교하기</Text>
              </TouchableOpacity>
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f9fa',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 15,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
  },
  backButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#f0f2f5',
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  content: {
    flex: 1,
    padding: 20,
  },
  supportBanner: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#ff6b6b',
    borderRadius: 15,
    padding: 20,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  supportTextContainer: {
    flex: 1,
    marginLeft: 15,
  },
  supportTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 5,
  },
  supportDescription: {
    fontSize: 14,
    color: '#fff',
    opacity: 0.9,
  },
  searchSection: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 15,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    position: 'relative',
  },
  searchIcon: {
    position: 'absolute',
    left: 15,
    zIndex: 1,
  },
  searchInput: {
    flex: 1,
    paddingLeft: 45,
    paddingRight: 15,
    paddingVertical: 12,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    fontSize: 14,
  },
  categoryContainer: {
    marginBottom: 20,
  },
  categoryButton: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    marginRight: 10,
    backgroundColor: '#fff',
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#ddd',
  },
  categoryButtonActive: {
    backgroundColor: '#0066CC',
    borderColor: '#0066CC',
  },
  categoryText: {
    fontSize: 14,
    color: '#666',
  },
  categoryTextActive: {
    color: '#fff',
    fontWeight: 'bold',
  },
  certGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  certCard: {
    width: '48%',
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 20,
    marginBottom: 15,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  certIcon: {
    marginBottom: 10,
  },
  certName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 5,
    textAlign: 'center',
  },
  certDescription: {
    fontSize: 12,
    color: '#666',
    marginBottom: 10,
    textAlign: 'center',
  },
  compareButton: {
    backgroundColor: '#f1f1f1',
    borderRadius: 5,
    paddingHorizontal: 10,
    paddingVertical: 5,
  },
  compareButtonText: {
    fontSize: 12,
    color: '#666',
  },
});