import React, { useState } from 'react';
import {
  View,
  Text,
  SafeAreaView,
  TouchableOpacity,
  ScrollView,
  TextInput,
  StyleSheet,
  Alert,
  FlatList,
  Modal
} from 'react-native';
import { Ionicons, FontAwesome5, MaterialIcons } from '@expo/vector-icons';
import styles from '../styles/menu/CertAudResult';

// Map status values to corresponding style objects to satisfy TypeScript and avoid hyphenated keys
type AnnouncementStatus = 'recruiting' | 'closed';
const statusStyleMap: Record<AuditStatus | AnnouncementStatus, any> = {
  requested: styles.statusrequested,
  scheduled: styles.statusscheduled,
  'in-progress': styles.statusinprogress,
  reporting: styles.statusreporting,
  completed: styles.statuscompleted,
  applied: styles.statusapplied,
  accepted: styles.statusaccepted,
  rejected: styles.statusrejected,
  recruiting: styles.statusrecruiting,
  closed: styles.statusclosed,
};

// TypeScript Interfaces
type AuditStatus = 'requested' | 'scheduled' | 'in-progress' | 'reporting' | 'completed' | 
                  'applied' | 'accepted' | 'rejected' | 'recruiting';

type CertificationType = 'isms-p' | 'iso27001' | 'iso27701' | 'iso20000' | 'iso22301' | 'pims';

type AuditApplication = {
  id: string;
  companyName: string;
  projectTitle: string;
  certificationType: CertificationType;
  status: AuditStatus;
  applicationDate: string;
  decisionDate?: string;
  location: string;
  budget: string;
  duration: string;
  description: string;
  requirements: string[];
};

interface AuditAnnouncement {
  id: string;
  companyName: string;
  projectTitle: string;
  certificationType: CertificationType;
  status: 'recruiting' | 'closed';
  deadline: string;
  location: string;
  budgetRange: {
    min: number;
    max: number;
  };
  duration: string;
  description: string;
  requirements: string[];
  applicationsCount: number;
}

interface FilterState {
  certificationType: CertificationType | null;
  location: string;
  status: AuditStatus | null;
  searchKeyword: string;
}

const CertAudResult = ({ navigation }: any) => {
  // State Management
  const [activeTab, setActiveTab] = useState<'search' | 'results'>('search');
  const [selectedAudit, setSelectedAudit] = useState<AuditAnnouncement | null>(null);
  const [showDetailModal, setShowDetailModal] = useState(false);
  const [filters, setFilters] = useState<FilterState>({
    certificationType: null,
    location: '',
    status: null,
    searchKeyword: ''
  });

  // Mock data for audit announcements
  const [auditAnnouncements, setAuditAnnouncements] = useState<AuditAnnouncement[]>([
    {
      id: '1',
      companyName: 'ABC 테크',
      projectTitle: 'ISMS-P 인증 심사',
      certificationType: 'isms-p',
      status: 'recruiting',
      deadline: '2024-03-15',
      location: '서울',
      budgetRange: { min: 500000, max: 800000 },
      duration: '2주',
      description: '클라우드 서비스 기업의 ISMS-P 인증 심사를 진행할 전문가를 모집합니다.',
      requirements: ['ISMS-P 자격증', '3년 이상 경력', '클라우드 보안 경험'],
      applicationsCount: 3
    },
    {
      id: '2',
      companyName: 'XYZ 금융',
      projectTitle: 'ISO 27001 인증 심사',
      certificationType: 'iso27001',
      status: 'recruiting',
      deadline: '2024-03-20',
      location: '경기',
      budgetRange: { min: 600000, max: 900000 },
      duration: '3주',
      description: '금융기관의 정보보안管理体系 인증 심사 프로젝트입니다.',
      requirements: ['ISO 27001 Lead Auditor', '5년 이상 경력', '금융권 경험'],
      applicationsCount: 5
    },
    {
      id: '3',
      companyName: 'DEF 헬스케어',
      projectTitle: 'ISO 27701 인증 심사',
      certificationType: 'iso27701',
      status: 'recruiting',
      deadline: '2024-03-25',
      location: '서울',
      budgetRange: { min: 550000, max: 850000 },
      duration: '2주',
      description: '의료 데이터 프라이버시 보호 인증 심사 프로젝트입니다.',
      requirements: ['ISO 27701 자격증', '의료 데이터 보안 경험'],
      applicationsCount: 2
    }
  ]);

  // Mock data for audit applications
  const [auditApplications, setAuditApplications] = useState<AuditApplication[]>([
    {
      id: 'app1',
      companyName: 'ABC 테크',
      projectTitle: 'ISMS-P 인증 심사',
      certificationType: 'isms-p',
      status: 'applied',
      applicationDate: '2024-03-10',
      location: '서울',
      budget: '750,000원',
      duration: '2주',
      description: '클라우드 서비스 기업의 ISMS-P 인증 심사',
      requirements: ['ISMS-P 자격증', '3년 이상 경력']
    },
    {
      id: 'app2',
      companyName: 'XYZ 금융',
      projectTitle: 'ISO 27001 인증 심사',
      certificationType: 'iso27001',
      status: 'accepted',
      applicationDate: '2024-03-05',
      decisionDate: '2024-03-08',
      location: '경기',
      budget: '800,000원',
      duration: '3주',
      description: '금융기관 정보보안管理体系 인증 심사',
      requirements: ['ISO 27001 Lead Auditor', '5년 이상 경력']
    }
  ]);

  // Filter audit announcements based on filters
  const filteredAnnouncements = auditAnnouncements.filter(announcement => {
    const matchesCertification = !filters.certificationType || 
      announcement.certificationType === filters.certificationType;
    const matchesLocation = !filters.location || 
      announcement.location.includes(filters.location);
    const matchesKeyword = !filters.searchKeyword || 
      announcement.projectTitle.toLowerCase().includes(filters.searchKeyword.toLowerCase()) ||
      announcement.companyName.toLowerCase().includes(filters.searchKeyword.toLowerCase());
    
    return matchesCertification && matchesLocation && matchesKeyword;
  });

  // Handle filter changes
  const handleFilterChange = (field: keyof FilterState, value: any) => {
    setFilters(prev => ({
      ...prev,
      [field]: value
    }));
  };

  // Handle audit application
  const handleApplyAudit = (announcement: AuditAnnouncement) => {
    const newApplication: AuditApplication = {
      id: `app${Date.now()}`,
      companyName: announcement.companyName,
      projectTitle: announcement.projectTitle,
      certificationType: announcement.certificationType,
      status: 'applied',
      applicationDate: new Date().toISOString().split('T')[0],
      location: announcement.location,
      budget: `${announcement.budgetRange.min.toLocaleString()}원`,
      duration: announcement.duration,
      description: announcement.description,
      requirements: announcement.requirements
    };
    
    setAuditApplications(prev => [...prev, newApplication]);
    setShowDetailModal(false);
    Alert.alert('지원 완료', '심사 지원이 완료되었습니다. 결과를 기다려주세요.');
  };

  // Render audit announcement card
  const renderAuditCard = ({ item }: { item: AuditAnnouncement }) => (
    <TouchableOpacity 
      style={styles.auditCard}
      onPress={() => {
        setSelectedAudit(item);
        setShowDetailModal(true);
      }}
    >
      <View style={styles.cardHeader}>
        <View style={styles.cardTitleContainer}>
          <Text style={styles.cardTitle}>{item.projectTitle}</Text>
          <Text style={styles.cardCompany}>{item.companyName}</Text>
        </View>
        <View style={[styles.cardStatus, statusStyleMap[item.status]]}>
          <Text style={styles.statusText}>
            {item.status === 'recruiting' ? '모집중' : '마감'}
          </Text>
        </View>
      </View>
      
      <View style={styles.cardMeta}>
        <View style={styles.metaItem}>
          <FontAwesome5 name="certificate" size={12} color="#4a6fdc" />
          <Text style={styles.metaText}>
            {item.certificationType.toUpperCase()}
          </Text>
        </View>
        <View style={styles.metaItem}>
          <FontAwesome5 name="map-marker-alt" size={12} color="#4a6fdc" />
          <Text style={styles.metaText}>{item.location}</Text>
        </View>
        <View style={styles.metaItem}>
          <FontAwesome5 name="users" size={12} color="#4a6fdc" />
          <Text style={styles.metaText}>{item.applicationsCount}명 지원</Text>
        </View>
      </View>
      
      <View style={styles.cardMeta}>
        <View style={styles.metaItem}>
          <FontAwesome5 name="clock" size={12} color="#4a6fdc" />
          <Text style={styles.metaText}>마감: {item.deadline}</Text>
        </View>
        <View style={styles.metaItem}>
          <FontAwesome5 name="money-bill-wave" size={12} color="#4a6fdc" />
          <Text style={styles.metaText}>
            {item.budgetRange.min.toLocaleString()} - {item.budgetRange.max.toLocaleString()}원
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );

  // Render application card
  const renderApplicationCard = ({ item }: { item: AuditApplication }) => (
    <View style={styles.auditCard}>
      <View style={styles.cardHeader}>
        <View style={styles.cardTitleContainer}>
          <Text style={styles.cardTitle}>{item.projectTitle}</Text>
          <Text style={styles.cardCompany}>{item.companyName}</Text>
        </View>
        <View style={[styles.cardStatus, statusStyleMap[item.status]]}>
          <Text style={styles.statusText}>
            {getStatusText(item.status)}
          </Text>
        </View>
      </View>
      
      <View style={styles.cardMeta}>
        <View style={styles.metaItem}>
          <FontAwesome5 name="certificate" size={12} color="#4a6fdc" />
          <Text style={styles.metaText}>
            {item.certificationType.toUpperCase()}
          </Text>
        </View>
        <View style={styles.metaItem}>
          <FontAwesome5 name="map-marker-alt" size={12} color="#4a6fdc" />
          <Text style={styles.metaText}>{item.location}</Text>
        </View>
        <View style={styles.metaItem}>
          <FontAwesome5 name="calendar-alt" size={12} color="#4a6fdc" />
          <Text style={styles.metaText}>지원일: {item.applicationDate}</Text>
        </View>
      </View>
      
      {item.decisionDate && (
        <View style={styles.cardMeta}>
          <View style={styles.metaItem}>
            <FontAwesome5 name="check-circle" size={12} color="#4a6fdc" />
            <Text style={styles.metaText}>결정일: {item.decisionDate}</Text>
          </View>
        </View>
      )}
    </View>
  );

  // Get status text in Korean
  const getStatusText = (status: AuditStatus): string => {
    const statusMap: Record<AuditStatus, string> = {
      'requested': '요청됨',
      'scheduled': '예정됨',
      'in-progress': '진행중',
      'reporting': '보고중',
      'completed': '완료됨',
      'applied': '지원완료',
      'accepted': '선정됨',
      'rejected': '거절됨',
      'recruiting': '모집중'
    };
    return statusMap[status];
  };

  // Render search tab
  const renderSearchTab = () => (
    <View style={styles.tabContent}>
      {/* Search Section */}
      <View style={styles.searchSection}>
        <View style={styles.searchTitle}>
          <FontAwesome5 name="search" size={18} color="#4a6fdc" />
          <Text style={styles.sectionTitle}>심사 공고 검색</Text>
        </View>
        
        <View style={styles.searchForm}>
          <View style={styles.searchInputGroup}>
            <TextInput
              style={styles.searchInput}
              placeholder="회사명 또는 프로젝트명으로 검색"
              value={filters.searchKeyword}
              onChangeText={(text) => handleFilterChange('searchKeyword', text)}
            />
            <View style={styles.searchIcon}>
              <FontAwesome5 name="search" size={16} color="#999" />
            </View>
          </View>
          
          <View style={styles.filterGroup}>
            <Text style={styles.filterLabel}>인증 종류</Text>
            <View style={styles.filterTags}>
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
                    styles.filterTag,
                    filters.certificationType === item.value && styles.filterTagSelected
                  ]}
                  onPress={() => handleFilterChange('certificationType', 
                    filters.certificationType === item.value ? null : item.value
                  )}
                >
                  <Text style={[
                    styles.filterTagText,
                    filters.certificationType === item.value && styles.filterTagTextSelected
                  ]}>
                    {item.label}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>
          
          <View style={styles.filterGroup}>
            <Text style={styles.filterLabel}>지역</Text>
            <TextInput
              style={styles.filterInput}
              placeholder="지역명 입력"
              value={filters.location}
              onChangeText={(text) => handleFilterChange('location', text)}
            />
          </View>
        </View>
      </View>

      {/* Audit Announcements List */}
      <View style={styles.section}>
        <View style={styles.sectionHeader}>
          <FontAwesome5 name="bullhorn" size={18} color="#4a6fdc" />
          <Text style={styles.sectionTitle}>심사 공고 목록</Text>
        </View>
        
        <FlatList
          data={filteredAnnouncements}
          keyExtractor={(item) => item.id}
          renderItem={renderAuditCard}
          scrollEnabled={false}
          ListEmptyComponent={
            <View style={styles.emptyState}>
              <FontAwesome5 name="search" size={40} color="#ccc" />
              <Text style={styles.emptyStateText}>검색 결과가 없습니다</Text>
            </View>
          }
        />
      </View>
    </View>
  );

  // Render results tab
  const renderResultsTab = () => (
    <View style={styles.tabContent}>
      <View style={styles.section}>
        <View style={styles.sectionHeader}>
          <FontAwesome5 name="clipboard-check" size={18} color="#4a6fdc" />
          <Text style={styles.sectionTitle}>심사 지원 결과</Text>
        </View>
        
        <FlatList
          data={auditApplications}
          keyExtractor={(item) => item.id}
          renderItem={renderApplicationCard}
          scrollEnabled={false}
          ListEmptyComponent={
            <View style={styles.emptyState}>
              <FontAwesome5 name="clipboard" size={40} color="#ccc" />
              <Text style={styles.emptyStateText}>아직 지원한 심사가 없습니다</Text>
            </View>
          }
        />
      </View>
    </View>
  );

  // Render audit detail modal
  const renderDetailModal = () => (
    <Modal
      visible={showDetailModal}
      animationType="slide"
      transparent={true}
      onRequestClose={() => setShowDetailModal(false)}
    >
      <View style={styles.modalOverlay}>
        <View style={styles.modalContent}>
          <View style={styles.modalHeader}>
            <Text style={styles.modalTitle}>심사 공고 상세</Text>
            <TouchableOpacity 
              style={styles.modalClose}
              onPress={() => setShowDetailModal(false)}
            >
              <Ionicons name="close" size={24} color="#666" />
            </TouchableOpacity>
          </View>
          
          {selectedAudit && (
            <ScrollView style={styles.modalBody}>
              <View style={styles.detailSection}>
                <Text style={styles.detailTitle}>{selectedAudit.projectTitle}</Text>
                <Text style={styles.detailCompany}>{selectedAudit.companyName}</Text>
                
                <View style={styles.detailMeta}>
                  <View style={styles.metaItem}>
                    <FontAwesome5 name="certificate" size={14} color="#4a6fdc" />
                    <Text style={styles.metaText}>
                      {selectedAudit.certificationType.toUpperCase()}
                    </Text>
                  </View>
                  <View style={styles.metaItem}>
                    <FontAwesome5 name="map-marker-alt" size={14} color="#4a6fdc" />
                    <Text style={styles.metaText}>{selectedAudit.location}</Text>
                  </View>
                  <View style={styles.metaItem}>
                    <FontAwesome5 name="clock" size={14} color="#4a6fdc" />
                    <Text style={styles.metaText}>마감: {selectedAudit.deadline}</Text>
                  </View>
                </View>
                
                <View style={styles.detailInfo}>
                  <Text style={styles.detailLabel}>예산 범위</Text>
                  <Text style={styles.detailValue}>
                    {selectedAudit.budgetRange.min.toLocaleString()} - {selectedAudit.budgetRange.max.toLocaleString()}원
                  </Text>
                </View>
                
                <View style={styles.detailInfo}>
                  <Text style={styles.detailLabel}>진행 기간</Text>
                  <Text style={styles.detailValue}>{selectedAudit.duration}</Text>
                </View>
                
                <View style={styles.detailInfo}>
                  <Text style={styles.detailLabel}>프로젝트 설명</Text>
                  <Text style={styles.detailValue}>{selectedAudit.description}</Text>
                </View>
                
                <View style={styles.detailInfo}>
                  <Text style={styles.detailLabel}>요구사항</Text>
                  {selectedAudit.requirements.map((req, index) => (
                    <Text key={index} style={styles.requirementItem}>• {req}</Text>
                  ))}
                </View>
                
                <View style={styles.detailInfo}>
                  <Text style={styles.detailLabel}>현재 지원자</Text>
                  <Text style={styles.detailValue}>{selectedAudit.applicationsCount}명</Text>
                </View>
              </View>
              
              <TouchableOpacity 
                style={styles.applyButton}
                onPress={() => handleApplyAudit(selectedAudit)}
              >
                <Text style={styles.applyButtonText}>지원하기</Text>
              </TouchableOpacity>
            </ScrollView>
          )}
        </View>
      </View>
    </Modal>
  );

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity 
          style={styles.backButton}
          onPress={() => navigation.goBack()}
        >
          <Ionicons name="arrow-back" size={24} color="#333" />
        </TouchableOpacity>
        <Text style={styles.pageTitle}>심사 지원/결과</Text>
        <View style={styles.headerIcons}>
          <TouchableOpacity style={styles.headerIcon}>
            <Ionicons name="notifications" size={24} color="#333" />
          </TouchableOpacity>
        </View>
      </View>

      {/* Tab Navigation */}
      <View style={styles.tabNav}>
        <TouchableOpacity 
          style={[styles.tabButton, activeTab === 'search' && styles.tabButtonActive]}
          onPress={() => setActiveTab('search')}
        >
          <Text style={[styles.tabButtonText, activeTab === 'search' && styles.tabButtonTextActive]}>
            심사지원
          </Text>
        </TouchableOpacity>
        <TouchableOpacity 
          style={[styles.tabButton, activeTab === 'results' && styles.tabButtonActive]}
          onPress={() => setActiveTab('results')}
        >
          <Text style={[styles.tabButtonText, activeTab === 'results' && styles.tabButtonTextActive]}>
            지원결과
          </Text>
        </TouchableOpacity>
      </View>

      {/* Main Content */}
      <ScrollView style={styles.content}>
        {activeTab === 'search' ? renderSearchTab() : renderResultsTab()}
      </ScrollView>

      {/* Detail Modal */}
      {renderDetailModal()}
    </SafeAreaView>
  );
};

export default CertAudResult;