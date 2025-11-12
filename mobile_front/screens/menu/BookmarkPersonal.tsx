import React, { useMemo, useState } from 'react';
import {
  SafeAreaView,
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  TextInput,
} from 'react-native';
import { FontAwesome5 } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { styles } from '../styles/menu/BookmarkPersonal';

type TabKey = 'jobs' | 'education' | 'government' | 'exams';

type JobItem = {
  id: string;
  company: string;
  title: string;
  location: string;
  date: string;
  tags: string[];
  salary?: string;
  bookmarked?: boolean;
};

type EducationItem = {
  id: string;
  title: string;
  organizer: string;
  date: string;
  type: 'training' | 'seminar' | 'webinar';
  content?: string;
  price?: string;
};

type GovernmentItem = {
  id: string;
  title: string;
  source: string;
  date: string;
  category: 'policy' | 'news' | 'funding';
  content?: string;
  tags?: string[];
};

type ExamItem = {
  id: string;
  title: string;
  organizer: string;
  date: string;
  type: 'certification' | 'education';
  fee?: string;
  status: 'open' | 'closed' | 'upcoming';
};

const initialJobs: JobItem[] = [
  {
    id: 'job-1',
    company: 'A보안컨설팅',
    title: '정보보안 컨설턴트 채용',
    location: '서울 강남구',
    date: '2025-11-15',
    tags: ['보안', 'IT'],
    salary: '연 5,000만원 ~',
    bookmarked: true,
  },
  {
    id: 'job-2',
    company: 'B테크',
    title: '백엔드 개발자 (Node/Nest)',
    location: '서울 서초구',
    date: '2025-11-20',
    tags: ['개발', 'IT'],
    salary: '연 6,000만원 ~',
  },
  {
    id: 'job-3',
    company: 'C플랫폼',
    title: '서비스 기획자',
    location: '경기 판교',
    date: '2025-12-05',
    tags: ['기획', 'IT'],
  },
];

const initialEducation: EducationItem[] = [
  {
    id: 'edu-1',
    title: 'ISMS-P 실무교육 과정',
    organizer: '한국정보보호교육원',
    date: '2025-11-25',
    type: 'training',
    content: 'ISMS-P 인증 준비를 위한 실무 중심 교육',
    price: '￦150,000',
  },
  {
    id: 'edu-2',
    title: '보안 최신 동향 세미나',
    organizer: 'K-Security',
    date: '2025-12-03',
    type: 'seminar',
    content: '국내외 보안 동향 및 대응 전략 소개',
  },
  {
    id: 'edu-3',
    title: '클라우드 보안 웨비나',
    organizer: 'CloudSec',
    date: '2025-12-10',
    type: 'webinar',
    content: '클라우드 환경에서의 보안 베스트 프랙티스',
  },
];

const initialGovernment: GovernmentItem[] = [
  {
    id: 'gov-1',
    title: '중소기업 보안 지원 정책 발표',
    source: '중소벤처기업부',
    date: '2025-11-01',
    category: 'policy',
    content: '중소기업 대상 보안 컨설팅 및 인증 비용 지원',
    tags: ['지원', '보안', '정책'],
  },
  {
    id: 'gov-2',
    title: '정보보호 관련 뉴스 브리핑',
    source: 'KISA',
    date: '2025-11-08',
    category: 'news',
    content: '최근 보안 사고 및 이슈 요약',
    tags: ['뉴스', '보안'],
  },
  {
    id: 'gov-3',
    title: '보안 인증 기업 지원금 공고',
    source: '산업통상자원부',
    date: '2025-11-15',
    category: 'funding',
    content: '인증 취득 기업 대상 지원금 안내',
    tags: ['지원금', '인증'],
  },
];

const initialExams: ExamItem[] = [
  {
    id: 'exam-1',
    title: 'ISMS-P 인증 심사 시험',
    organizer: '한국인터넷진흥원',
    date: '2025-12-01',
    type: 'certification',
    fee: '￦200,000',
    status: 'open',
  },
  {
    id: 'exam-2',
    title: '정보보호 교육 평가',
    organizer: '보안교육협회',
    date: '2025-12-12',
    type: 'education',
    fee: '￦100,000',
    status: 'upcoming',
  },
  {
    id: 'exam-3',
    title: 'ISO27001 심사원 시험',
    organizer: '국제표준협회',
    date: '2025-11-05',
    type: 'certification',
    fee: '￦250,000',
    status: 'closed',
  },
];

const BookmarkPersonal: React.FC = () => {
  const navigation = useNavigation();
  const [activeTab, setActiveTab] = useState<TabKey>('jobs');
  const [searchQuery, setSearchQuery] = useState('');

  // Filters per tab
  const [jobFilter, setJobFilter] = useState<'all' | 'IT' | '보안' | '개발' | '기획'>('all');
  const [eduFilter, setEduFilter] = useState<'all' | 'training' | 'seminar' | 'webinar'>('all');
  const [govFilter, setGovFilter] = useState<'all' | 'policy' | 'news' | 'funding'>('all');
  const [examFilter, setExamFilter] = useState<'all' | 'certification' | 'education'>('all');

  const [jobs, setJobs] = useState<JobItem[]>(initialJobs);

  const filteredJobs = useMemo(() => {
    return jobs.filter((j) => {
      const matchesFilter = jobFilter === 'all' || j.tags.includes(jobFilter);
      const q = searchQuery.trim();
      const matchesQuery =
        q.length === 0 ||
        j.company.includes(q) ||
        j.title.includes(q) ||
        j.location.includes(q) ||
        j.tags.some((t) => t.includes(q));
      return matchesFilter && matchesQuery;
    });
  }, [jobs, jobFilter, searchQuery]);

  const filteredEducation = useMemo(() => {
    return initialEducation.filter((e) => {
      const matchesFilter = eduFilter === 'all' || e.type === eduFilter;
      const q = searchQuery.trim();
      const matchesQuery =
        q.length === 0 ||
        e.title.includes(q) ||
        e.organizer.includes(q) ||
        (e.content?.includes(q) ?? false);
      return matchesFilter && matchesQuery;
    });
  }, [eduFilter, searchQuery]);

  const filteredGovernment = useMemo(() => {
    return initialGovernment.filter((g) => {
      const matchesFilter = govFilter === 'all' || g.category === govFilter;
      const q = searchQuery.trim();
      const matchesQuery =
        q.length === 0 ||
        g.title.includes(q) ||
        g.source.includes(q) ||
        (g.content?.includes(q) ?? false) ||
        (g.tags?.some((t) => t.includes(q)) ?? false);
      return matchesFilter && matchesQuery;
    });
  }, [govFilter, searchQuery]);

  const filteredExams = useMemo(() => {
    return initialExams.filter((x) => {
      const matchesFilter = examFilter === 'all' || x.type === examFilter;
      const q = searchQuery.trim();
      const matchesQuery =
        q.length === 0 ||
        x.title.includes(q) ||
        x.organizer.includes(q);
      return matchesFilter && matchesQuery;
    });
  }, [examFilter, searchQuery]);

  const toggleBookmark = (id: string) => {
    setJobs((prev) => prev.map((j) => (j.id === id ? { ...j, bookmarked: !j.bookmarked } : j)));
  };

  const renderSearchAndFilters = () => {
    return (
      <View style={styles.searchFilterSection}>
        <View style={styles.searchBox}>
          <TextInput
            style={styles.searchInput}
            placeholder={
              activeTab === 'jobs'
                ? '회사명, 직무 검색'
                : activeTab === 'education'
                ? '교육명, 기관 검색'
                : activeTab === 'government'
                ? '정책/뉴스 검색'
                : '시험명, 주관 검색'
            }
            value={searchQuery}
            onChangeText={setSearchQuery}
          />
          <FontAwesome5 name="search" size={14} color="#999" style={styles.searchIcon} />
        </View>

        {activeTab === 'jobs' && (
          <View style={styles.filterButtons}>
            {(['all', 'IT', '보안', '개발', '기획'] as const).map((key) => (
              <TouchableOpacity
                key={key}
                style={[styles.filterBtn, jobFilter === key && styles.filterBtnActive]}
                onPress={() => setJobFilter(key)}
              >
                <Text style={[styles.filterBtnText, jobFilter === key && styles.filterBtnTextActive]}>
                  {key === 'all' ? '전체' : key}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        )}

        {activeTab === 'education' && (
          <View style={styles.filterButtons}>
            {(['all', 'training', 'seminar', 'webinar'] as const).map((key) => (
              <TouchableOpacity
                key={key}
                style={[styles.filterBtn, eduFilter === key && styles.filterBtnActive]}
                onPress={() => setEduFilter(key)}
              >
                <Text style={[styles.filterBtnText, eduFilter === key && styles.filterBtnTextActive]}>
                  {key === 'all' ? '전체' : key === 'training' ? '교육' : key === 'seminar' ? '세미나' : '웨비나'}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        )}

        {activeTab === 'government' && (
          <View style={styles.filterButtons}>
            {(['all', 'policy', 'news', 'funding'] as const).map((key) => (
              <TouchableOpacity
                key={key}
                style={[styles.filterBtn, govFilter === key && styles.filterBtnActive]}
                onPress={() => setGovFilter(key)}
              >
                <Text style={[styles.filterBtnText, govFilter === key && styles.filterBtnTextActive]}>
                  {key === 'all' ? '전체' : key === 'policy' ? '정책' : key === 'news' ? '뉴스' : '지원금'}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        )}

        {activeTab === 'exams' && (
          <View style={styles.filterButtons}>
            {(['all', 'certification', 'education'] as const).map((key) => (
              <TouchableOpacity
                key={key}
                style={[styles.filterBtn, examFilter === key && styles.filterBtnActive]}
                onPress={() => setExamFilter(key)}
              >
                <Text style={[styles.filterBtnText, examFilter === key && styles.filterBtnTextActive]}>
                  {key === 'all' ? '전체' : key === 'certification' ? '자격/인증' : '교육'}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        )}
      </View>
    );
  };

  const renderJobCard = (item: JobItem) => {
    return (
      <View key={item.id} style={[styles.card, styles.jobCard, { borderLeftColor: '#4a6fdc' }]}>        
        <View style={styles.cardHeader}>          
          <View style={{ flex: 1 }}>
            <Text style={styles.jobCompany}>{item.company}</Text>
            <Text style={styles.jobTitle}>{item.title}</Text>
            <Text style={styles.jobLocation}>{item.location}</Text>
            <Text style={styles.jobDate}>{item.date}</Text>
          </View>
          <TouchableOpacity
            style={styles.bookmarkBtn}
            onPress={() => toggleBookmark(item.id)}
          >
            <FontAwesome5
              name={item.bookmarked ? 'bookmark' : 'bookmark'}
              size={16}
              color={item.bookmarked ? '#ff4757' : '#ffc107'}
            />
          </TouchableOpacity>
        </View>

        <View style={styles.jobTags}>
          {item.tags.map((t) => (
            <View key={t} style={styles.jobTag}><Text style={styles.jobTagText}>{t}</Text></View>
          ))}
        </View>

        {item.salary && <Text style={styles.jobSalary}>{item.salary}</Text>}

        <View style={styles.jobActions}>
          <TouchableOpacity style={[styles.jobActionBtn, styles.btnApply]}>
            <FontAwesome5 name="paper-plane" size={12} color="#fff" />
            <Text style={styles.jobActionText}>지원하기</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.jobActionBtn, styles.btnView]}>
            <FontAwesome5 name="eye" size={12} color="#fff" />
            <Text style={styles.jobActionText}>자세히 보기</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  };

  const renderEducationCard = (item: EducationItem) => {
    const typeStyle =
      item.type === 'training'
        ? [styles.educationType, styles.typeTraining]
        : item.type === 'seminar'
        ? [styles.educationType, styles.typeSeminar]
        : [styles.educationType, styles.typeWebinar];

    return (
      <View key={item.id} style={[styles.card, styles.educationCard]}>        
        <View style={styles.cardHeader}>
          <View style={{ flex: 1 }}>
            <Text style={styles.educationTitle}>{item.title}</Text>
            <Text style={styles.educationOrganizer}>{item.organizer}</Text>
            <Text style={styles.educationDate}>{item.date}</Text>
          </View>
          <View style={typeStyle}><Text style={styles.educationTypeText}>
            {item.type === 'training' ? '교육' : item.type === 'seminar' ? '세미나' : '웨비나'}
          </Text></View>
        </View>
        {item.content && <Text style={styles.educationContent}>{item.content}</Text>}
        {item.price && (
          <View style={styles.educationInfo}>
            <Text style={styles.educationPrice}>{item.price}</Text>
          </View>
        )}
      </View>
    );
  };

  const renderGovernmentCard = (item: GovernmentItem) => {
    const borderColor =
      item.category === 'policy' ? '#28a745' : item.category === 'news' ? '#e74c3c' : '#1abc9c';
    return (
      <View key={item.id} style={[styles.card, styles.policyCard, { borderLeftColor: borderColor }]}>        
        <View style={styles.cardHeader}>
          <View style={{ flex: 1 }}>
            <Text style={styles.policyTitle}>{item.title}</Text>
            <Text style={styles.policySource}>{item.source}</Text>
            <Text style={styles.policyDate}>{item.date}</Text>
          </View>
          <View style={[
            styles.policyCategory,
            item.category === 'policy'
              ? styles.categoryPolicy
              : item.category === 'news'
              ? styles.categoryNews
              : styles.categoryFunding
          ]}>
            <Text style={styles.educationTypeText}>
              {item.category === 'policy' ? '정책' : item.category === 'news' ? '뉴스' : '지원금'}
            </Text>
          </View>
        </View>
        {item.content && <Text style={styles.policyContent}>{item.content}</Text>}
        {!!item.tags?.length && (
          <View style={styles.policyTags}>
            {item.tags!.map((t) => (
              <View key={t} style={styles.policyTag}><Text style={styles.jobTagText}>{t}</Text></View>
            ))}
          </View>
        )}
      </View>
    );
  };

  const getExamStatusStyles = (status: ExamItem['status']) => {
    switch (status) {
      case 'open':
        return [styles.examStatus, styles.statusOpen];
      case 'closed':
        return [styles.examStatus, styles.statusClosed];
      case 'upcoming':
      default:
        return [styles.examStatus, styles.statusUpcoming];
    }
  };

  const getExamStatusText = (status: ExamItem['status']) => {
    switch (status) {
      case 'open':
        return '접수중';
      case 'closed':
        return '마감';
      case 'upcoming':
      default:
        return '예정';
    }
  };

  const renderExamCard = (item: ExamItem) => {
    return (
      <View key={item.id} style={[styles.card, styles.examCard, { borderLeftColor: '#ffc107' }]}>        
        <View style={styles.cardHeader}>
          <View style={{ flex: 1 }}>
            <Text style={styles.examTitle}>{item.title}</Text>
            <Text style={styles.examOrganizer}>{item.organizer}</Text>
            <Text style={styles.examDate}>{item.date}</Text>
          </View>
          <View style={[styles.educationType, item.type === 'certification' ? styles.typeCertification : styles.typeEducation]}>
            <Text style={styles.educationTypeText}>{item.type === 'certification' ? '자격/인증' : '교육'}</Text>
          </View>
        </View>

        <View style={styles.examDetails}>
          {item.fee && <Text style={styles.examFee}>{item.fee}</Text>}
          <View style={getExamStatusStyles(item.status)}>
            <Text style={styles.educationTypeText}>{getExamStatusText(item.status)}</Text>
          </View>
        </View>
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.root}>
      {/* Header */}
      <View style={styles.appHeader}>
        <TouchableOpacity style={styles.headerIcon} onPress={() => navigation.goBack?.()}>
          <FontAwesome5 name="arrow-left" size={16} color="#333" />
        </TouchableOpacity>
        <Text style={styles.appTitle}>개인 북마크</Text>
        <View style={styles.headerIcons}>
          <View style={styles.headerIcon}>
            <FontAwesome5 name="bell" size={16} color="#333" />
            <View style={styles.notificationBadge}><Text style={styles.badgeText}>5</Text></View>
          </View>
        </View>
      </View>

      {/* Tabs */}
      <View style={styles.tabNav}>
        {([
          { key: 'jobs', label: '구인', icon: 'briefcase' },
          { key: 'education', label: '교육', icon: 'graduation-cap' },
          { key: 'government', label: '정부 정책 및 뉴스', icon: 'landmark' },
          { key: 'exams', label: '시험정보', icon: 'clipboard-check' },
        ] as { key: TabKey; label: string; icon: React.ComponentProps<typeof FontAwesome5>['name'] }[]).map(
          (t) => (
            <TouchableOpacity
              key={t.key}
              style={[styles.tabButton, activeTab === t.key && styles.tabButtonActive]}
              onPress={() => setActiveTab(t.key)}
            >
              <FontAwesome5 name={t.icon} size={16} color={activeTab === t.key ? '#4a6fdc' : '#666'} />
              <Text style={[styles.tabButtonText, activeTab === t.key && styles.tabButtonTextActive]}>{t.label}</Text>
              {activeTab === t.key && <View style={styles.tabUnderline} />}
            </TouchableOpacity>
          )
        )}
      </View>

      {/* Content */}
      <ScrollView contentContainerStyle={styles.container}>
        {renderSearchAndFilters()}

        {activeTab === 'jobs' && (
          <View style={{ marginTop: 8 }}>
            {filteredJobs.length === 0 ? (
              <View style={styles.emptyState}>
                <FontAwesome5 name="inbox" size={36} color="#ddd" />
                <Text style={styles.emptyText}>조건에 맞는 구인 정보가 없습니다.</Text>
              </View>
            ) : (
              filteredJobs.map(renderJobCard)
            )}
          </View>
        )}

        {activeTab === 'education' && (
          <View style={{ marginTop: 8 }}>
            {filteredEducation.length === 0 ? (
              <View style={styles.emptyState}>
                <FontAwesome5 name="inbox" size={36} color="#ddd" />
                <Text style={styles.emptyText}>조건에 맞는 교육 정보가 없습니다.</Text>
              </View>
            ) : (
              filteredEducation.map(renderEducationCard)
            )}
          </View>
        )}

        {activeTab === 'government' && (
          <View style={{ marginTop: 8 }}>
            {filteredGovernment.length === 0 ? (
              <View style={styles.emptyState}>
                <FontAwesome5 name="inbox" size={36} color="#ddd" />
                <Text style={styles.emptyText}>조건에 맞는 정책/뉴스가 없습니다.</Text>
              </View>
            ) : (
              filteredGovernment.map(renderGovernmentCard)
            )}
          </View>
        )}

        {activeTab === 'exams' && (
          <View style={{ marginTop: 8 }}>
            {filteredExams.length === 0 ? (
              <View style={styles.emptyState}>
                <FontAwesome5 name="inbox" size={36} color="#ddd" />
                <Text style={styles.emptyText}>조건에 맞는 시험 정보가 없습니다.</Text>
              </View>
            ) : (
              filteredExams.map(renderExamCard)
            )}
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
};

export default BookmarkPersonal;
