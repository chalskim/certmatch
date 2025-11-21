
import React, { useMemo, useState, useEffect } from 'react';
import { View, Text, ScrollView, TouchableOpacity, TextInput, Modal, Alert } from 'react-native';
import { FontAwesome5 } from '@expo/vector-icons';
import SubformHeader from '../components/SubformHeader';
import stylesDefault, * as AnnounceStyles from '../styles/menu/AnnounceManagement';
const styles = AnnounceStyles.styles ?? stylesDefault;


// 탭 키 타입
type TabKey = 'hiring' | 'experts' | 'education';

// 공통 상태 배지 스타일 매핑
const STATUS_STYLES: Record<string, { bg: string; color: string }> = {
  '진행중': { bg: '#e6f7e6', color: '#2e7d32' },
  '마감임박': { bg: '#fff8e1', color: '#f57f17' },
  '마감': { bg: '#ffebee', color: '#c62828' },
  '신규': { bg: '#e3f2fd', color: '#1976d2' },
  '긴급': { bg: '#ffebee', color: '#e53935' },
  '인기': { bg: '#e3f2fd', color: '#1976d2' },
  '활성': { bg: '#e6f7e6', color: '#2e7d32' },
};

// 더미 데이터: 모크업과 동일한 샘플 항목
const hiringItems = [
  {
    title: '정보보호 담당자 (ISMS-P 경험 필수)',
    company: '㈜테크솔루션',
    location: '서울 강남구',
    career: '경력 3년↑',
    type: '정규직',
    applicants: 23,
    dates: '게시일: 2025.01.15 · 마감일: 2025.02.28',
    statusLabel: '진행중' as const,
  },
  {
    title: '클라우드 보안 전문가 (AWS/Azure)',
    company: '㈜클라우드테크',
    location: '서울 강남구',
    career: '경력 5년↑',
    type: '계약직',
    applicants: 18,
    dates: '게시일: 2025.01.10 · 마감일: 2025.02.25',
    statusLabel: '마감임박' as const,
  },
  {
    title: '개인정보보호 담당자 (PIMS 경험자)',
    company: '㈜핀테크코리아',
    location: '서울 여의도',
    career: '경력 3년↑',
    type: '정규직',
    applicants: 31,
    dates: '게시일: 2025.01.05 · 마감일: 2025.03.10',
    statusLabel: '긴급' as const,
  },
];

const expertItems = [
  {
    name: '김민수 컨설턴트',
    specialty: 'ISMS-P 전문 · 15년 경력 · 일 200만원',
    rating: '★★★★★',
    ratingText: '4.9 (47개 평가)',
    date: '등록일: 2024.06.15 · 매칭률: 95%',
    statusLabel: '활성' as const,
  },
  {
    name: '박지영 컨설턴트',
    specialty: 'ISO 27001 전문 · 10년 경력 · 일 180만원',
    rating: '★★★★☆',
    ratingText: '4.8 (32개 평가)',
    date: '등록일: 2025.01.10 · 매칭률: 88%',
    statusLabel: '신규' as const,
  },
  {
    name: '이준호 컨설턴트',
    specialty: 'ISMS + ISO 통합 · 12년 경력 · 일 220만원',
    rating: '★★★★★',
    ratingText: '5.0 (89개 평가)',
    date: '등록일: 2023.03.20 · 매칭률: 98%',
    statusLabel: '인기' as const,
  },
];

const educationItems = [
  {
    title: 'ISMS-P 심사원 기본과정',
    desc: '한국정보통신진흥협회 · 40시간 · 온라인 · 350만원',
    extra: '수강생: 156명 · 만족도: 4.8',
    date: '다음 시작일: 2025.03.01',
    statusLabel: '진행중' as const,
  },
  {
    title: 'ISO 27001 Lead Auditor 과정',
    desc: '한국품질재단 · 5일 집중 · 오프라인 · 480만원',
    extra: '수강생: 203명 · 만족도: 4.9',
    date: '다음 시작일: 2025.02.20',
    statusLabel: '인기' as const,
  },
  {
    title: '정보보호 실무자 양성과정',
    desc: '한국능률협회 · 3개월 · 혼합 · 250만원',
    extra: '수강생: 89명 · 만족도: 4.7',
    date: '마감일: 2025.02.15',
    statusLabel: '마감임박' as const,
  },
  {
    title: 'ISMS-P 기초 입문과정',
    desc: '한국인터넷진흥원 · 8시간 · 온라인 · 무료',
    extra: '수강생: 421명 · 만족도: 4.6',
    date: '상시 수강 가능',
    statusLabel: '무료' as const,
  },
];

// 필터 칩 목록
const hiringFilters = ['전체', '진행중', '마감임박', '긴급', '인기'];
const expertFilters = ['전체', 'ISMS-P', 'ISO 27001', 'GS 인증', '신규'];
const educationFilters = ['전체', '온라인', '오프라인', '자격증', '무료'];

// 통계 카드 데이터
const hiringStats = [
  { number: '24', label: '전체 공고' },
  { number: '18', label: '진행중' },
  { number: '312', label: '총 지원자' },
  { number: '45', label: '이번 주 지원' },
];
const expertStats = [
  { number: '156', label: '등록 전문가' },
  { number: '89', label: '활성 전문가' },
  { number: '4.8', label: '평균 평점' },
  { number: '234', label: '총 매칭' },
];
const educationStats = [
  { number: '18', label: '교육 과정' },
  { number: '1,245', label: '수강생' },
  { number: '4.7', label: '평균 만족도' },
  { number: '92%', label: '취업률' },
];

// 간단 토스트 구현
function useToast() {
  const [message, setMessage] = useState<string>('');
  const [visible, setVisible] = useState(false);

  const show = (msg: string) => {
    setMessage(msg);
    setVisible(true);
    setTimeout(() => setVisible(false), 2500);
  };

  return { message, visible, show };
}

const AnnounceManagement: React.FC<any> = ({ navigation }) => {
  const [activeTab, setActiveTab] = useState<TabKey>('hiring');
  const [filter, setFilter] = useState<string>('전체');

  // 상세검색 토글 상태
  const [searchOpenHiring, setSearchOpenHiring] = useState(false);
  const [searchOpenExperts, setSearchOpenExperts] = useState(false);
  const [searchOpenEducation, setSearchOpenEducation] = useState(false);

  // 모달 상태
  const [jobModalVisible, setJobModalVisible] = useState(false);
  const [expertModalVisible, setExpertModalVisible] = useState(false);
  const [educationModalVisible, setEducationModalVisible] = useState(false);
  const [modalTitle, setModalTitle] = useState('');

  const { message, visible, show } = useToast();

  useEffect(() => {
    // 탭 전환 시 필터 초기화
    setFilter('전체');
  }, [activeTab]);

  // 통계 그리드 제거로 currentStats는 사용하지 않음
  const currentStats = useMemo(() => {
    if (activeTab === 'hiring') return hiringStats;
    if (activeTab === 'experts') return expertStats;
    return educationStats;
  }, [activeTab]);

  const currentFilters = useMemo(() => {
    if (activeTab === 'hiring') return hiringFilters;
    if (activeTab === 'experts') return expertFilters;
    return educationFilters;
  }, [activeTab]);

  // 리스트 렌더에 사용할 데이터
  const currentList = useMemo(() => {
    if (activeTab === 'hiring') return hiringItems;
    if (activeTab === 'experts') return expertItems;
    return educationItems;
  }, [activeTab]);

  // 상세검색: 단순 알림 및 결과 카운트 반영 (샘플)
  const [resultText, setResultText] = useState<string>('');
  const onSearch = () => {
    const count = currentList.length; // 샘플: 전체 개수 반환
    setResultText(`총 ${count}개의 결과를 찾았습니다.`);
    show('검색이 완료되었습니다.');
  };
  const onReset = () => {
    setResultText('');
    show('검색 조건이 초기화되었습니다.');
  };

  // 모달 열기/닫기
  const openAddModal = () => {
    if (activeTab === 'hiring') {
      setModalTitle('공고 추가');
      setJobModalVisible(true);
    } else if (activeTab === 'experts') {
      setModalTitle('전문가 추가');
      setExpertModalVisible(true);
    } else {
      setModalTitle('교육 과정 추가');
      setEducationModalVisible(true);
    }
  };
  const openEditModal = (title: string) => {
    if (activeTab === 'hiring') {
      setModalTitle('공고 수정');
      setJobModalVisible(true);
    } else if (activeTab === 'experts') {
      setModalTitle('전문가 수정');
      setExpertModalVisible(true);
    } else {
      setModalTitle('교육 과정 수정');
      setEducationModalVisible(true);
    }
    show(`'${title}' 항목을 수정합니다.`);
  };

  const onDeleteItem = (title: string) => {
    Alert.alert('삭제 확인', `"${title}" 항목을 삭제하시겠습니까?`, [
      { text: '취소', style: 'cancel' },
      { text: '삭제', style: 'destructive', onPress: () => show('항목이 삭제되었습니다.') },
    ]);
  };

  const onViewAction = (title: string, type: string) => {
    show(`'${title}'의 ${type}를 조회합니다.`);
  };

  const renderStatusBadge = (label: string) => {
    const style = STATUS_STYLES[label] || { bg: '#f0f2f5', color: '#333' };
    return (
      <View style={[styles.statusBadge, { backgroundColor: style.bg }]}> 
        <Text style={{ fontSize: 12, fontWeight: '600', color: style.color }}>{label}</Text>
      </View>
    );
  };

  const TabHeader = () => (
    <View style={styles.tabHeader}> 
      {(['hiring','experts','education'] as TabKey[]).map((key) => {
        const label = key === 'hiring' ? '채용' : key === 'experts' ? '전문가' : '교육';
        const active = activeTab === key;
        return (
          <TouchableOpacity key={key} onPress={() => setActiveTab(key)} style={styles.tabItem}> 
            <Text style={[styles.tabText, active && { color: '#4a6bdf' }]}>{label}</Text>
            <View style={[styles.tabUnderline, active && { backgroundColor: '#4a6bdf' }]} />
          </TouchableOpacity>
        );
      })}
    </View>
  );

  // 통계 카드 그리드(등록 전문가/활성 전문가/평균 평점/총 매칭, 교육 과정/수강생/평균 만족도/취업률) 삭제
  // const StatsGrid = () => (
  //   <View style={styles.statsGrid}> 
  //     {currentStats.map((s, idx) => (
  //       <View key={idx} style={styles.statCard}> 
  //         <Text style={styles.statNumber}>{s.number}</Text>
  //         <Text style={styles.statLabel}>{s.label}</Text>
  //       </View>
  //     ))}
  //   </View>
  // );

  const SearchSection = () => {
    const open = activeTab === 'hiring' ? searchOpenHiring : activeTab === 'experts' ? searchOpenExperts : searchOpenEducation;
    const setOpen = (v: boolean) => {
      if (activeTab === 'hiring') setSearchOpenHiring(v);
      else if (activeTab === 'experts') setSearchOpenExperts(v);
      else setSearchOpenEducation(v);
    };

    return (
      <View style={styles.searchSection}> 
        <TouchableOpacity onPress={() => setOpen(!open)} style={styles.searchHeader}> 
          <View style={{ flexDirection: 'row', alignItems: 'center', gap: 8 }}> 
            <FontAwesome5 name="search" size={14} color="#333" />
            <Text style={styles.searchTitle}>상세 검색</Text>
          </View>
          <FontAwesome5 name={open ? 'chevron-up' : 'chevron-down'} size={14} color="#333" />
        </TouchableOpacity>
        {open && (
          <View style={styles.searchContent}> 
            <View style={styles.searchGrid}> 
              {/* 간단 입력 필드들 - 실제 연동 시 필드별 상태를 추가하세요 */}
              <View style={styles.formGroup}> 
                <Text style={styles.formLabel}>제목/이름</Text>
                <TextInput placeholder="검색어 입력" style={styles.input} />
              </View>
              <View style={styles.formGroup}> 
                <Text style={styles.formLabel}>분류/분야</Text>
                <TextInput placeholder="예: ISMS-P / 정규직" style={styles.input} />
              </View>
              <View style={styles.formGroup}> 
                <Text style={styles.formLabel}>지역/방식</Text>
                <TextInput placeholder="예: 서울 / 온라인" style={styles.input} />
              </View>
              <View style={styles.formGroup}> 
                <Text style={styles.formLabel}>상태</Text>
                <TextInput placeholder="예: 진행중/신규/마감임박" style={styles.input} />
              </View>
            </View>
            <View style={styles.searchActions}> 
              <TouchableOpacity style={styles.resetButton} onPress={onReset}> 
                <FontAwesome5 name="redo" size={12} color="#333" />
                <Text style={styles.resetText}>초기화</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.searchButton} onPress={onSearch}> 
                <FontAwesome5 name="search" size={12} color="#fff" />
                <Text style={styles.searchText}>검색</Text>
              </TouchableOpacity>
            </View>
            {!!resultText && (
              <View style={styles.searchResults}> 
                <Text style={{ color: '#666' }}>{resultText}</Text>
              </View>
            )}
          </View>
        )}
      </View>
    );
  };

  const FilterChips = () => (
    <ScrollView horizontal showsHorizontalScrollIndicator={false} style={{ marginBottom: 12 }} contentContainerStyle={{ paddingVertical: 4 }}> 
      {currentFilters.map((chip) => {
        const active = filter === chip;
        return (
          <TouchableOpacity key={chip} onPress={() => { setFilter(chip); show(`'${chip}' 필터가 적용되었습니다.`); }} style={[styles.chip, active && styles.chipActive]}> 
            <Text style={[styles.chipText, active && { color: '#fff' }]}>{chip}</Text>
          </TouchableOpacity>
        );
      })}
    </ScrollView>
  );

  const HiringList = () => (
    <View style={styles.listContainer}> 
      {hiringItems.map((item, idx) => (
        <View key={idx} style={styles.card}> 
          <View style={styles.cardHeader}> 
            <Text style={styles.cardTitle}>{item.title}</Text>
            {renderStatusBadge(item.statusLabel)}
          </View>
          <Text style={styles.cardDetails}>{`${item.company} · ${item.location} · ${item.career} · ${item.type}`}</Text>
          <Text style={[styles.cardDetails, { color: '#4a6bdf', fontWeight: '600' }]}>지원자: {item.applicants}명</Text>
          <View style={styles.cardFooter}> 
            <Text style={styles.cardDate}>{item.dates}</Text>
            <View style={styles.actions}> 
              <TouchableOpacity onPress={() => onViewAction(item.title, '지원자')} style={styles.actionBtn}> 
                <FontAwesome5 name="users" size={14} color="#4a6bdf" />
                <Text style={styles.actionText}>지원자</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => openEditModal(item.title)} style={styles.actionBtn}> 
                <FontAwesome5 name="edit" size={14} color="#4a6bdf" />
                <Text style={styles.actionText}>수정</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => onDeleteItem(item.title)} style={styles.actionBtn}> 
                <FontAwesome5 name="trash" size={14} color="#e53935" />
                <Text style={[styles.actionText, { color: '#e53935' }]}>삭제</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      ))}
    </View>
  );

  const ExpertsList = () => (
    <View style={styles.listContainer}> 
      {expertItems.map((item, idx) => (
        <View key={idx} style={styles.card}> 
          <View style={styles.cardHeader}> 
            <Text style={styles.cardTitle}>{item.name}</Text>
            {renderStatusBadge(item.statusLabel)}
          </View>
          <Text style={styles.cardDetails}>{item.specialty}</Text>
          <View style={{ flexDirection: 'row', alignItems: 'center', gap: 6, marginBottom: 8 }}> 
            <Text style={{ color: '#ffc107' }}>{item.rating}</Text>
            <Text style={{ color: '#666' }}>{item.ratingText}</Text>
          </View>
          <View style={styles.cardFooter}> 
            <Text style={styles.cardDate}>{item.date}</Text>
            <View style={styles.actions}> 
              <TouchableOpacity onPress={() => onViewAction(item.name, '일정')} style={styles.actionBtn}> 
                <FontAwesome5 name="calendar-check" size={14} color="#4a6bdf" />
                <Text style={styles.actionText}>일정</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => openEditModal(item.name)} style={styles.actionBtn}> 
                <FontAwesome5 name="edit" size={14} color="#4a6bdf" />
                <Text style={styles.actionText}>수정</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => onDeleteItem(item.name)} style={styles.actionBtn}> 
                <FontAwesome5 name="trash" size={14} color="#e53935" />
                <Text style={[styles.actionText, { color: '#e53935' }]}>삭제</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      ))}
    </View>
  );

  const EducationList = () => (
    <View style={styles.listContainer}> 
      {educationItems.map((item, idx) => (
        <View key={idx} style={styles.card}> 
          <View style={styles.cardHeader}> 
            <Text style={styles.cardTitle}>{item.title}</Text>
            {renderStatusBadge(item.statusLabel)}
          </View>
          <Text style={styles.cardDetails}>{item.desc}</Text>
          <Text style={[styles.cardDetails, { color: item.statusLabel === '인기' ? '#f57f17' : '#4a6bdf', fontWeight: '600' }]}>
            수강생: {item.extra}
          </Text>
          <View style={styles.cardFooter}> 
            <Text style={styles.cardDate}>{item.date}</Text>
            <View style={styles.actions}> 
              <TouchableOpacity onPress={() => onViewAction(item.title, '수강생')} style={styles.actionBtn}> 
                <FontAwesome5 name="users" size={14} color="#4a6bdf" />
                <Text style={styles.actionText}>수강생</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => openEditModal(item.title)} style={styles.actionBtn}> 
                <FontAwesome5 name="edit" size={14} color="#4a6bdf" />
                <Text style={styles.actionText}>수정</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => onDeleteItem(item.title)} style={styles.actionBtn}> 
                <FontAwesome5 name="trash" size={14} color="#e53935" />
                <Text style={[styles.actionText, { color: '#e53935' }]}>삭제</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      ))}
    </View>
  );

  const SectionHeader = () => (
    <View style={styles.sectionHeader}> 
      <Text style={styles.sectionTitle}>
        {activeTab === 'hiring' ? '채용 공고' : activeTab === 'experts' ? '전문가 목록' : '교육 과정'}
      </Text>
      <TouchableOpacity style={styles.addButton} onPress={openAddModal}> 
        <FontAwesome5 name="plus" size={14} color="#fff" />
        <Text style={{ color: '#fff', fontWeight: '600' }}>추가</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={{ flex: 1, backgroundColor: '#fff' }}> 
      <SubformHeader title="공고 관리" navigation={navigation} onBack={() => navigation?.goBack?.()} onHome={() => navigation?.navigate?.('Home')} />

      <TabHeader />

      <ScrollView contentContainerStyle={{ padding: 16 }}>
        {/* 상단 통계 div(탭 별 통계 카드) 완전히 제거 */}

        <SearchSection />

        <FilterChips />

        <SectionHeader />

        {activeTab === 'hiring' && <HiringList />}
        {activeTab === 'experts' && <ExpertsList />}
        {activeTab === 'education' && <EducationList />}
      </ScrollView>

      {/* 공고 모달 */}
      <Modal visible={jobModalVisible} animationType="slide" transparent>
        <View style={styles.modalOverlay}> 
          <View style={styles.modalContent}> 
            <View style={styles.modalHeader}> 
              <Text style={styles.modalTitle}>{modalTitle}</Text>
              <TouchableOpacity onPress={() => setJobModalVisible(false)}>
                <Text style={{ fontSize: 20 }}>×</Text>
              </TouchableOpacity>
            </View>
            <View>
              <View style={styles.formGroup}> 
                <Text style={styles.formLabel}>공고 제목</Text>
                <TextInput placeholder="공고 제목을 입력하세요" style={styles.input} />
              </View>
              <View style={styles.formGroup}> 
                <Text style={styles.formLabel}>회사명</Text>
                <TextInput placeholder="회사명을 입력하세요" style={styles.input} />
              </View>
              <View style={styles.formActions}> 
                <TouchableOpacity style={styles.btnSecondary} onPress={() => setJobModalVisible(false)}>
                  <Text style={styles.btnSecondaryText}>취소</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.btnPrimary} onPress={() => { setJobModalVisible(false); show('공고가 저장되었습니다.'); }}>
                  <Text style={styles.btnPrimaryText}>저장</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </View>
      </Modal>

      {/* 전문가 모달 */}
      <Modal visible={expertModalVisible} animationType="slide" transparent>
        <View style={styles.modalOverlay}> 
          <View style={styles.modalContent}> 
            <View style={styles.modalHeader}> 
              <Text style={styles.modalTitle}>{modalTitle}</Text>
              <TouchableOpacity onPress={() => setExpertModalVisible(false)}>
                <Text style={{ fontSize: 20 }}>×</Text>
              </TouchableOpacity>
            </View>
            <View>
              <View style={styles.formGroup}> 
                <Text style={styles.formLabel}>이름</Text>
                <TextInput placeholder="전문가 이름을 입력하세요" style={styles.input} />
              </View>
              <View style={styles.formGroup}> 
                <Text style={styles.formLabel}>전문 분야</Text>
                <TextInput placeholder="예: ISMS-P" style={styles.input} />
              </View>
              <View style={styles.formActions}> 
                <TouchableOpacity style={styles.btnSecondary} onPress={() => setExpertModalVisible(false)}>
                  <Text style={styles.btnSecondaryText}>취소</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.btnPrimary} onPress={() => { setExpertModalVisible(false); show('전문가가 저장되었습니다.'); }}>
                  <Text style={styles.btnPrimaryText}>저장</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </View>
      </Modal>

      {/* 교육 모달 */}
      <Modal visible={educationModalVisible} animationType="slide" transparent>
        <View style={styles.modalOverlay}> 
          <View style={styles.modalContent}> 
            <View style={styles.modalHeader}> 
              <Text style={styles.modalTitle}>{modalTitle}</Text>
              <TouchableOpacity onPress={() => setEducationModalVisible(false)}>
                <Text style={{ fontSize: 20 }}>×</Text>
              </TouchableOpacity>
            </View>
            <View>
              <View style={styles.formGroup}> 
                <Text style={styles.formLabel}>교육명</Text>
                <TextInput placeholder="교육 과정명을 입력하세요" style={styles.input} />
              </View>
              <View style={styles.formGroup}> 
                <Text style={styles.formLabel}>기관명</Text>
                <TextInput placeholder="교육 기관명을 입력하세요" style={styles.input} />
              </View>
              <View style={styles.formActions}> 
                <TouchableOpacity style={styles.btnSecondary} onPress={() => setEducationModalVisible(false)}>
                  <Text style={styles.btnSecondaryText}>취소</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.btnPrimary} onPress={() => { setEducationModalVisible(false); show('교육 과정이 저장되었습니다.'); }}>
                  <Text style={styles.btnPrimaryText}>저장</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </View>
      </Modal>

      {/* 토스트 */}
      {visible && (
        <View style={styles.toast}> 
          <Text style={{ color: '#fff' }}>{message}</Text>
        </View>
      )}
    </View>
  );
};

export default AnnounceManagement;
