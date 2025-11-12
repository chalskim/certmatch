import React, { useState } from 'react';
import { View, Text, ScrollView, Image, TouchableOpacity, Modal, TextInput } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import SubformHeader from '../components/SubformHeader';
import { styles } from '../styles/menu/ExpertRecruitmentListDetail';

type JobPosting = {
  id: number;
  title: string;
  company: string;
  location: string;
  status: 'active' | 'closed';
  views: number;
  applicants: number;
  deadline: string; // ISO date string
  postedDate: string; // ISO date string
};

type TabKey = 'overview' | 'responsibilities' | 'requirements' | 'benefits';

export default function ExpertRecruitmentListDetail() {
  const navigation = useNavigation<any>();
  const route = useRoute<any>();
  const job: JobPosting | undefined = route.params?.job;

  // Fallback demo data if no route params provided
  const jobData: JobPosting = job ?? {
    id: 999,
    title: 'Backend Engineer',
    company: 'TechCorp',
    location: '서울 강남구',
    status: 'active',
    views: 0,
    applicants: 0,
    deadline: '2025-11-12',
    postedDate: '2025-10-12',
  };

  const [activeTab, setActiveTab] = useState<TabKey>('overview');
  const [inquiryVisible, setInquiryVisible] = useState(false);
  const [inquiryName, setInquiryName] = useState('');
  const [inquiryEmail, setInquiryEmail] = useState('');
  const [inquiryCategory, setInquiryCategory] = useState('채용 문의');
  const [inquiryMessage, setInquiryMessage] = useState('');
  const [toast, setToast] = useState<string | null>(null);

  // Demo similar jobs (can be replaced with API data)
  const similarJobs: JobPosting[] = [
    {
      id: jobData.id + 1,
      title: 'Backend Engineer (Node.js)',
      company: 'DevWorks',
      location: '서울 송파구',
      status: 'active',
      views: 123,
      applicants: 12,
      deadline: '2025-11-20',
      postedDate: '2025-10-10',
    },
    {
      id: jobData.id + 2,
      title: 'Platform Engineer',
      company: 'CloudHub',
      location: '경기 성남시',
      status: 'active',
      views: 98,
      applicants: 8,
      deadline: '2025-11-25',
      postedDate: '2025-10-08',
    },
    {
      id: jobData.id + 3,
      title: 'Site Reliability Engineer (SRE)',
      company: 'OpsMaster',
      location: '서울 마포구',
      status: 'active',
      views: 210,
      applicants: 20,
      deadline: '2025-12-01',
      postedDate: '2025-10-05',
    },
  ];

  function showToast(msg: string) {
    setToast(msg);
    setTimeout(() => setToast(null), 2500);
  }

  function onApply() {
    showToast('지원하기 (데모)');
  }

  function onSave() {
    showToast('공고 저장됨');
  }

  function onShare() {
    showToast('공유하기 (데모)');
  }

  function submitInquiry() {
    if (!inquiryName.trim() || !inquiryEmail.trim() || !inquiryMessage.trim()) {
      showToast('이름, 이메일, 문의 내용을 입력해주세요.');
      return;
    }
    showToast('문의가 접수되었습니다.');
    setInquiryVisible(false);
    setInquiryName('');
    setInquiryEmail('');
    setInquiryCategory('채용 문의');
    setInquiryMessage('');
  }

  return (
    <View style={styles.container}>
      <SubformHeader
        title="채용 상세"
        navigation={navigation}
        onHome={() => navigation.navigate('Home')}
      />

      <ScrollView contentContainerStyle={{ padding: 16 }}>
        {/* Header block */}
        {/* Ensure column layout explicitly so breadcrumb appears at the very top of the card on web */}
        <View style={[styles.jobHeader, { flexDirection: 'column' }]}>
          {/* Breadcrumb */}
          <View
            style={styles.breadcrumb}
            nativeID="breadcrumb"
            accessibilityRole="text"
            accessibilityLabel="홈 › 컨설팅 및 구인 › 채용 상세"
          >
            <Text style={styles.breadcrumbText}>홈</Text>
            <Text style={styles.breadcrumbDivider}>›</Text>
            <Text style={styles.breadcrumbText}>컨설팅 및 구인</Text>
            <Text style={styles.breadcrumbDivider}>›</Text>
            <Text style={[styles.breadcrumbText, { color: '#333', fontWeight: '600' }]}>채용 상세</Text>
          </View>

          {/* Main header row */}
          <View style={styles.jobHeaderRow}>
            <View style={styles.companyLogo}><Text style={styles.companyLogoText}>TC</Text></View>
            <View style={{ flex: 1 }}>
              <Text style={styles.jobTitle}>{jobData.title}</Text>
              <View style={styles.jobMetaRow}>
                <Text style={styles.jobMetaItem}>🏢 {jobData.company}</Text>
                <Text style={styles.jobMetaItem}>📍 {jobData.location}</Text>
                <Text style={styles.jobMetaItem}>💼 경력 3-5년</Text>
                <Text style={styles.jobMetaItem}>⏰ {jobData.deadline} 마감</Text>
              </View>
              <View style={styles.jobActions}>
                <TouchableOpacity style={[styles.btn, styles.btnApply]} onPress={onApply}><Text style={styles.btnApplyText}>지원하기</Text></TouchableOpacity>
                <TouchableOpacity style={[styles.btn, styles.btnSave]} onPress={onSave}><Text style={styles.btnSaveText}>저장</Text></TouchableOpacity>
                <TouchableOpacity style={[styles.btn, styles.btnOutline]} onPress={onShare}><Text style={styles.btnOutlineText}>공유</Text></TouchableOpacity>
              </View>
            </View>
          </View>
        </View>

        {/* Office images */}
        <View style={styles.officeImages}>
          <Image source={{ uri: 'https://picsum.photos/seed/office1/800/400.jpg' }} style={styles.officeImage} />
          <Image source={{ uri: 'https://picsum.photos/seed/office2/800/400.jpg' }} style={styles.officeImage} />
        </View>

        {/* Tabs */}
        <View style={styles.tabsContainer}>
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            {([
              { key: 'overview', label: '개요' },
              { key: 'responsibilities', label: '주요 업무' },
              { key: 'requirements', label: '자격 요건' },
              { key: 'benefits', label: '복지 혜택' },
            ] as { key: TabKey; label: string }[]).map(t => (
              <TouchableOpacity key={t.key} style={[styles.tabChip, activeTab === t.key && styles.tabChipActive]} onPress={() => setActiveTab(t.key)}>
                <Text style={[styles.tabChipText, activeTab === t.key && styles.tabChipTextActive]}>{t.label}</Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>

        {/* Tab content */}
        {activeTab === 'overview' && (
          <View style={styles.contentSection}>
            <Text style={styles.sectionTitle}>직무 소개</Text>
            <Text style={styles.sectionText}>TechCorp에서 Backend Engineer로 함께할 분을 찾고 있습니다. 안정적이고 확장 가능한 백엔드 시스템을 구축할 엔지니어가 필요합니다.</Text>
            <Text style={styles.sectionText}>서버 아키텍처 설계, API 개발, 데이터베이스 관리, 시스템 최적화 등 다양한 백엔드 개발 업무를 포함합니다. 클라우드 기술과 마이크로서비스 아키텍처 경험 우대.</Text>
            <Text style={styles.sectionText}>저희 팀은 자율성과 책임감을 중요하게 생각하며, 새로운 기술을 배우고 적용할 수 있는 환경을 제공합니다.</Text>
          </View>
        )}

        {activeTab === 'responsibilities' && (
          <View style={styles.contentSection}>
            <Text style={styles.sectionTitle}>주요 업무</Text>
            {[
              'RESTful API 설계 및 개발',
              '데이터베이스 스키마 설계 및 최적화',
              '마이크로서비스 아키텍처 기반 시스템 개발',
              '클라우드 인프라(AWS, GCP 등) 관리 및 배포 자동화',
              '성능 모니터링 및 시스템 안정성 확보',
              '코드 리뷰 및 기술 문서 작성',
            ].map((item, idx) => (
              <View key={idx} style={styles.requirementItem}><Text style={styles.requirementIcon}>✔️</Text><Text style={styles.requirementText}>{item}</Text></View>
            ))}
          </View>
        )}


        {activeTab === 'requirements' && (
          <View style={styles.contentSection}>
            <Text style={styles.sectionTitle}>필수 기술</Text>
            <View style={{ flexDirection: 'row', flexWrap: 'wrap' }}>
              {['Python', 'Django', 'PostgreSQL', 'Docker', 'Kubernetes', 'AWS', 'Git', 'CI/CD'].map((s, i) => (
                <View key={i} style={styles.skillTag}><Text style={styles.skillTagText}>{s}</Text></View>
              ))}
            </View>
            <Text style={[styles.sectionTitle, { marginTop: 16 }]}>자격 요건</Text>
            {[
              'Backend 개발 3년 이상 경력',
              'Python 또는 다른 백엔드 언어에 대한 깊은 이해',
              '관계형 데이터베이스 설계 및 최적화 경험',
              '클라우드 서비스(AWS, GCP 등) 사용 경험',
              '컨테이너 기술(Docker, Kubernetes)에 대한 이해',
            ].map((item, idx) => (
              <View key={idx} style={styles.requirementItem}><Text style={styles.requirementIcon}>👤</Text><Text style={styles.requirementText}>{item}</Text></View>
            ))}
            <Text style={[styles.sectionTitle, { marginTop: 16 }]}>우대 사항</Text>
            {[
              '대규모 트래픽 처리 경험',
              '클라우드 네이티브 환경 경험',
              '보안 및 인증 관련 프로젝트 경험',
            ].map((item, idx) => (
              <View key={idx} style={styles.requirementItem}><Text style={styles.requirementIcon}>⭐</Text><Text style={styles.requirementText}>{item}</Text></View>
            ))}
          </View>
        )}

        {activeTab === 'benefits' && (
          <View style={styles.contentSection}>
            <Text style={styles.sectionTitle}>복지 혜택</Text>
            {[
              '유연근무제 및 재택근무 지원',
              '최신 장비 및 개발 환경 제공',
              '교육비 및 도서비 지원',
              '연 1회 리프레시 휴가',
            ].map((item, idx) => (
              <View key={idx} style={styles.requirementItem}><Text style={styles.requirementIcon}>🎁</Text><Text style={styles.requirementText}>{item}</Text></View>
            ))}
          </View>
        )}


        {/* Inquiry section */}
        <View style={styles.inquirySection}>
          <Text style={styles.inquiryTitle}>1:1 문의하기</Text>
          <TouchableOpacity style={styles.btnInquiry} onPress={() => setInquiryVisible(true)}>
            <Text style={styles.btnInquiryText}>문의 시작하기 ✉️</Text>
          </TouchableOpacity>
        </View>

        {/* Similar positions moved below Inquiry section (equivalent to class="similar-jobs" in HTML mockup) */}
        <View style={styles.similarJobs} nativeID="similar-jobs">
          <Text style={styles.sectionTitle}>유사한 포지션</Text>
          {similarJobs.map((sj) => (
            <TouchableOpacity key={sj.id} style={styles.similarJobCard} onPress={() => navigation.navigate('ExpertRecruitmentListDetail', { job: sj })}>
              <Text style={styles.similarJobCardTitle}>{sj.title}</Text>
              <Text style={styles.similarJobCardCompany}>{sj.company} · {sj.location}</Text>
              <View style={styles.similarJobCardMeta}>
                <Text style={styles.similarJobCardMetaText}>📅 마감: {sj.deadline}</Text>
                <Text style={styles.similarJobCardMetaText}>👁 조회수: {sj.views}</Text>
              </View>
            </TouchableOpacity>
          ))}
        </View>

        {/* Company Info Card moved below Inquiry section */}
        <View style={styles.companyInfoCard}>
          <Text style={styles.sectionTitle}>회사 정보</Text>
          <View style={styles.companyDetailItem}>
            <View style={styles.companyDetailIcon}><Text>🏢</Text></View>
            <View style={{ flex: 1 }}>
              <Text style={styles.companyDetailLabel}>회사명</Text>
              <Text style={styles.companyDetailValue}>{jobData.company}</Text>
            </View>
          </View>
          <View style={styles.companyDetailItem}>
            <View style={styles.companyDetailIcon}><Text>📍</Text></View>
            <View style={{ flex: 1 }}>
              <Text style={styles.companyDetailLabel}>위치</Text>
              <Text style={styles.companyDetailValue}>{jobData.location}</Text>
            </View>
          </View>
          <View style={styles.companyDetailItem}>
            <View style={styles.companyDetailIcon}><Text>🌐</Text></View>
            <View style={{ flex: 1 }}>
              <Text style={styles.companyDetailLabel}>웹사이트</Text>
              <Text style={styles.companyDetailValue}>https://www.example.com</Text>
            </View>
          </View>
          <View style={styles.companyDetailItem}>
            <View style={styles.companyDetailIcon}><Text>📅</Text></View>
            <View style={{ flex: 1 }}>
              <Text style={styles.companyDetailLabel}>설립연도</Text>
              <Text style={styles.companyDetailValue}>2018년</Text>
            </View>
          </View>
          <View style={[styles.companyDetailItem, styles.companyDetailItemLast]}>
            <View style={styles.companyDetailIcon}><Text>👥</Text></View>
            <View style={{ flex: 1 }}>
              <Text style={styles.companyDetailLabel}>직원 수</Text>
              <Text style={styles.companyDetailValue}>50-100명</Text>
            </View>
          </View>

          {/* Verified badge (optional) */}
          <View style={[styles.companyVerifiedBadge, { marginTop: 12 }]}>
            <Text style={styles.companyVerifiedText}>✓ 회사 정보 검증 완료</Text>
          </View>
        </View>
      </ScrollView>

      {/* Floating inquiry button removed per request */}

      {/* Inquiry Modal */}
      <Modal visible={inquiryVisible} animationType="slide" onRequestClose={() => setInquiryVisible(false)}>
        <View style={styles.modalContainer}>
          <View style={styles.modalHeader}><Text style={styles.modalHeaderText}>문의하기</Text></View>
          <ScrollView contentContainerStyle={{ padding: 16 }}>
            <Text style={styles.formLabel}>이름</Text>
            <TextInput style={styles.formInput} value={inquiryName} onChangeText={setInquiryName} placeholder="이름" />
            <Text style={styles.formLabel}>이메일</Text>
            <TextInput style={styles.formInput} value={inquiryEmail} onChangeText={setInquiryEmail} placeholder="example@domain.com" keyboardType="email-address" />
            <Text style={styles.formLabel}>문의 유형</Text>
            <TextInput style={styles.formInput} value={inquiryCategory} onChangeText={setInquiryCategory} />
            <Text style={styles.formLabel}>문의 내용</Text>
            <TextInput style={[styles.formInput, styles.textarea]} multiline value={inquiryMessage} onChangeText={setInquiryMessage} placeholder="문의 내용을 입력해주세요" />

            <View style={{ flexDirection: 'row', justifyContent: 'flex-end', marginTop: 12 }}>
              <TouchableOpacity style={[styles.btn, styles.btnOutline, { marginRight: 8 }]} onPress={() => setInquiryVisible(false)}>
                <Text style={styles.btnOutlineText}>취소</Text>
              </TouchableOpacity>
              <TouchableOpacity style={[styles.btn, styles.btnApply]} onPress={submitInquiry}>
                <Text style={styles.btnApplyText}>보내기</Text>
              </TouchableOpacity>
            </View>
          </ScrollView>
        </View>
      </Modal>

      {/* Toast */}
      {toast ? (
        <View style={styles.toastBox}><Text style={{ color: '#fff' }}>{toast}</Text></View>
      ) : null}
    </View>
  );
}