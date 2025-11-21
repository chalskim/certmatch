import React, { useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
// Ensure correct SubformHeader import; fix any prior mistaken '../components/.SubformHeader'
import SubformHeader from '../components/SubformHeader';

interface SuccessCase {
  id: string;
  companyName: string;
  certification: string;
  industry: string;
  description: string;
  result: string;
  date: string;
  logo: string;
}

const successCases: SuccessCase[] = [
  {
    id: '1',
    companyName: '테크이노베이션',
    certification: 'ISO 9001',
    industry: '제조업',
    description: '품질경영시스템 구축으로 생산 품질 향상 및 고객 만족도 95% 달성',
    result: '인증 획득',
    date: '2024-01-15',
    logo: 'TI'
  },
  {
    id: '2',
    companyName: '그린솔루션',
    certification: 'ISO 14001',
    industry: '환경',
    description: '환경경영시스템 도입으로 에너지 사용량 30% 절감',
    result: '인증 획득',
    date: '2024-02-20',
    logo: 'GS'
  },
  {
    id: '3',
    companyName: '세이프티코리아',
    certification: 'ISO 45001',
    industry: '건설업',
    description: '안전보건경영시스템 구축으로 사고율 50% 감소',
    result: '인증 획득',
    date: '2024-03-10',
    logo: 'SK'
  }
];

const industries = ['전체', '제조업', '서비스업', '건설업', 'IT', '의료', '환경'];
const certifications = ['전체', 'ISO 9001', 'ISO 14001', 'ISO 45001', 'ISO 27001', 'ISO 22000'];

export default function SuccessCases() {
  const navigation = useNavigation<any>();
  const [selectedIndustry, setSelectedIndustry] = useState('전체');
  const [selectedCertification, setSelectedCertification] = useState('전체');

  const filteredCases = successCases.filter(caseItem => {
    const matchesIndustry = selectedIndustry === '전체' || caseItem.industry === selectedIndustry;
    const matchesCertification = selectedCertification === '전체' || caseItem.certification === selectedCertification;
    return matchesIndustry && matchesCertification;
  });

  const handleBack = () => {
    navigation.goBack();
  };

  const handleCaseSelect = (caseItem: SuccessCase) => {
    // TODO: Navigate to case detail screen
    console.log('Selected case:', caseItem);
  };

  return (
    <SafeAreaView style={styles.container}>
      <SubformHeader
        title="성공사례"
        navigation={navigation}
        onBack={handleBack}
        onHome={() => navigation.navigate('Home')}
      />

      <ScrollView style={styles.content}>
        {/* 필터 섹션 */}
        <View style={styles.filterSection}>
          <Text style={styles.filterTitle}>필터</Text>
          
          <View style={styles.filterGroup}>
            <Text style={styles.filterLabel}>산업군</Text>
            <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.filterOptions}>
              {industries.map((industry) => (
                <TouchableOpacity
                  key={industry}
                  style={[
                    styles.filterOption,
                    selectedIndustry === industry && styles.filterOptionActive
                  ]}
                  onPress={() => setSelectedIndustry(industry)}
                >
                  <Text style={[
                    styles.filterOptionText,
                    selectedIndustry === industry && styles.filterOptionTextActive
                  ]}>
                    {industry}
                  </Text>
                </TouchableOpacity>
              ))}
            </ScrollView>
          </View>

          <View style={styles.filterGroup}>
            <Text style={styles.filterLabel}>인증종류</Text>
            <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.filterOptions}>
              {certifications.map((certification) => (
                <TouchableOpacity
                  key={certification}
                  style={[
                    styles.filterOption,
                    selectedCertification === certification && styles.filterOptionActive
                  ]}
                  onPress={() => setSelectedCertification(certification)}
                >
                  <Text style={[
                    styles.filterOptionText,
                    selectedCertification === certification && styles.filterOptionTextActive
                  ]}>
                    {certification}
                  </Text>
                </TouchableOpacity>
              ))}
            </ScrollView>
          </View>
        </View>

        {/* 성공사례 목록 */}
        <View style={styles.casesSection}>
          {filteredCases.map((caseItem) => (
            <TouchableOpacity
              key={caseItem.id}
              style={styles.caseCard}
              onPress={() => handleCaseSelect(caseItem)}
            >
              <View style={styles.caseHeader}>
                <View style={styles.companyInfo}>
                  <View style={styles.companyLogo}>
                    <Text style={styles.companyLogoText}>{caseItem.logo}</Text>
                  </View>
                  <View style={styles.companyDetails}>
                    <Text style={styles.companyName}>{caseItem.companyName}</Text>
                    <Text style={styles.industryText}>{caseItem.industry}</Text>
                  </View>
                </View>
                <View style={styles.resultBadge}>
                  <Text style={styles.resultText}>{caseItem.result}</Text>
                </View>
              </View>

              <View style={styles.caseContent}>
                <Text style={styles.certificationText}>{caseItem.certification}</Text>
                <Text style={styles.descriptionText}>{caseItem.description}</Text>
                <Text style={styles.dateText}>{caseItem.date}</Text>
              </View>
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
    backgroundColor: '#f5f7fa',
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
  },
  filterSection: {
    backgroundColor: '#f8f9fa',
    padding: 20,
    marginBottom: 20,
    borderRadius: 8,
  },
  filterTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 15,
    color: '#333',
  },
  filterGroup: {
    marginBottom: 20,
  },
  filterLabel: {
    fontSize: 14,
    fontWeight: '600',
    marginBottom: 10,
    color: '#555',
  },
  filterOptions: {
    flexDirection: 'row',
  },
  filterOption: {
    paddingHorizontal: 15,
    paddingVertical: 8,
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 20,
    marginRight: 8,
  },
  filterOptionActive: {
    backgroundColor: '#4a6fdc',
    borderColor: '#4a6fdc',
  },
  filterOptionText: {
    fontSize: 13,
    color: '#666',
  },
  filterOptionTextActive: {
    color: '#fff',
  },
  casesSection: {
    paddingHorizontal: 20,
    paddingBottom: 20,
  },
  caseCard: {
    backgroundColor: '#fff',
    borderRadius: 10,
    marginBottom: 15,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  caseHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  companyInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  companyLogo: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#f0f0f0',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 10,
  },
  companyLogoText: {
    fontWeight: 'bold',
    color: '#4a6fdc',
    fontSize: 16,
  },
  companyDetails: {
    flex: 1,
  },
  companyName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 2,
  },
  industryText: {
    fontSize: 14,
    color: '#666',
  },
  resultBadge: {
    backgroundColor: '#4CAF50',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 15,
  },
  resultText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: 'bold',
  },
  caseContent: {
    padding: 20,
  },
  certificationText: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#4a6fdc',
    marginBottom: 8,
  },
  descriptionText: {
    fontSize: 14,
    color: '#666',
    marginBottom: 10,
    lineHeight: 20,
  },
  dateText: {
    fontSize: 12,
    color: '#999',
  },
});