import React, { useMemo, useState } from 'react';
import {
  SafeAreaView,
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  TextInput,
} from 'react-native';
import { FontAwesome5 } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { styles } from '../styles/menu/BookmarkCorporate';
import SubformHeader from '../components/SubformHeader';

type TabKey = 'experts' | 'personnel' | 'government';

type ExpertItem = {
  id: string;
  name: string;
  title: string;
  rating: number; // 0-5
  reviews: number;
  experience: string; // e.g., '5년'
  projects: number; // completed projects
  tags: string[];
  bookmarked?: boolean;
};

type PersonnelItem = {
  id: string;
  name: string;
  position: string;
  appliedDate: string;
  skills: string[];
};

type ProjectItem = {
  id: string;
  title: string;
  org: string;
  date: string;
  category: 'support' | 'law';
  content?: string;
  tags?: string[];
};

const initialExperts: ExpertItem[] = [
  {
    id: 'exp-1',
    name: '김민수 컨설턴트',
    title: 'ISMS-P 인증 컨설팅 전문가',
    rating: 5.0,
    reviews: 23,
    experience: '5년',
    projects: 15,
    tags: ['ISMS-P', '개인정보', '클라우드'],
    bookmarked: true,
  },
  {
    id: 'exp-2',
    name: '이수정 컨설턴트',
    title: 'ISO 27001 인증 전문가',
    rating: 4.7,
    reviews: 12,
    experience: '4년',
    projects: 11,
    tags: ['ISO', '보안'],
  },
];

const initialPersonnel: PersonnelItem[] = [
  {
    id: 'per-1',
    name: '박지훈',
    position: '백엔드 개발자',
    appliedDate: '2025-11-12',
    skills: ['Node', 'NestJS', 'AWS', '보안'],
  },
  {
    id: 'per-2',
    name: '최은영',
    position: '서비스 기획자',
    appliedDate: '2025-11-08',
    skills: ['기획', '데이터 분석', 'UX'],
  },
];

const initialProjects: ProjectItem[] = [
  {
    id: 'proj-1',
    title: '중소기업 보안 지원 사업',
    org: '중소벤처기업부',
    date: '2025-11-01',
    category: 'support',
    content: '중소기업 대상 보안 컨설팅 및 인증 비용 지원',
    tags: ['지원사업', '보안', '정책'],
  },
  {
    id: 'proj-2',
    title: '개인정보보호법 개정 브리핑',
    org: 'KISA',
    date: '2025-11-10',
    category: 'law',
    content: '최근 개인정보보호 관련 법령 개정 주요 내용 요약',
    tags: ['법령개정', '개인정보'],
  },
];

const BookmarkCorporate: React.FC = () => {
  const navigation = useNavigation();
  const [activeTab, setActiveTab] = useState<TabKey>('experts');

  const [searchText, setSearchText] = useState('');
  const [expertFilter, setExpertFilter] = useState<'all' | 'ISMS-P' | 'ISO' | '개인정보' | '클라우드'>('all');
  const [personnelFilter, setPersonnelFilter] = useState<'all' | '개발자' | '기획자' | '디자이너' | '기타'>('all');
  const [projectFilter, setProjectFilter] = useState<'all' | 'support' | 'law'>('all');

  const experts = useMemo(() => {
    const filtered = initialExperts.filter((e) => {
      const matchText = !searchText || [e.name, e.title, ...e.tags].some((x) => x.includes(searchText));
      const matchFilter = expertFilter === 'all' || e.tags.includes(expertFilter);
      return matchText && matchFilter;
    });
    return filtered;
  }, [searchText, expertFilter]);

  const personnel = useMemo(() => {
    const filtered = initialPersonnel.filter((p) => {
      const matchText = !searchText || [p.name, p.position, ...(p.skills || [])].some((x) => x.includes(searchText));
      const matchFilter =
        personnelFilter === 'all' ||
        (personnelFilter === '개발자' && p.position.includes('개발')) ||
        (personnelFilter === '기획자' && p.position.includes('기획')) ||
        (personnelFilter === '디자이너' && p.position.includes('디자인')) ||
        personnelFilter === '기타';
      return matchText && matchFilter;
    });
    return filtered;
  }, [searchText, personnelFilter]);

  const projects = useMemo(() => {
    const filtered = initialProjects.filter((g) => {
      const matchText = !searchText || [g.title, g.org, g.content || '', ...(g.tags || [])].some((x) => x.includes(searchText));
      const matchFilter = projectFilter === 'all' || projectFilter === g.category;
      return matchText && matchFilter;
    });
    return filtered;
  }, [searchText, projectFilter]);

  const renderStars = (rating: number) => {
    const fullStars = Math.floor(rating);
    const hasHalf = rating - fullStars >= 0.5;
    const stars = [] as React.ReactNode[];
    for (let i = 0; i < fullStars; i++) stars.push(<FontAwesome5 key={`full-${i}`} name="star" size={10} color="#ffc107" />);
    if (hasHalf) stars.push(<FontAwesome5 key={`half`} name="star-half-alt" size={10} color="#ffc107" />);
    return <View style={styles.stars}>{stars}</View>;
  };

  const renderExpertCard = (item: ExpertItem) => {
    return (
      <View key={item.id} style={[styles.card, styles.expertCard]}>        
        <View style={styles.expertHeader}>
          <View style={styles.expertAvatar}><Text style={{ color: '#999' }}>{item.name.charAt(0)}</Text></View>
          <View style={styles.expertInfo}>
            <Text style={styles.expertName}>{item.name}</Text>
            <Text style={styles.expertTitle}>{item.title}</Text>
            <View style={styles.expertRating}>
              {renderStars(item.rating)}
              <Text style={styles.ratingText}>{item.rating.toFixed(1)}점 • 리뷰 {item.reviews}</Text>
            </View>
          </View>
          <TouchableOpacity style={styles.bookmarkBtn}>
            <FontAwesome5 name="bookmark" size={14} color={item.bookmarked ? '#ff4757' : '#ffc107'} />
          </TouchableOpacity>
        </View>

        <View style={styles.expertDetails}>
          <View><Text style={{ fontSize: 10, color: '#666' }}>경력</Text><Text style={{ fontSize: 11, fontWeight: 'bold' }}>{item.experience}</Text></View>
          <View><Text style={{ fontSize: 10, color: '#666' }}>프로젝트</Text><Text style={{ fontSize: 11, fontWeight: 'bold' }}>{item.projects}</Text></View>
        </View>

        {!!item.tags.length && (
          <View style={styles.expertTags}>
            {item.tags.map((t) => (
              <View key={t} style={styles.expertTag}><Text style={styles.expertTagText}>{t}</Text></View>
            ))}
          </View>
        )}

        <View style={styles.expertActions}>
          <TouchableOpacity style={[styles.expertActionBtn, styles.btnView]}>
            <FontAwesome5 name="eye" size={10} color="#fff" />
            <Text style={styles.expertActionText}>상세보기</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.expertActionBtn, styles.btnContact]}>
            <FontAwesome5 name="paper-plane" size={10} color="#fff" />
            <Text style={styles.expertActionText}>문의하기</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  };

  const renderPersonnelCard = (item: PersonnelItem) => {
    return (
      <View key={item.id} style={[styles.card, styles.personnelCard]}>        
        <View style={styles.personnelHeader}>
          <View style={{ flex: 1 }}>
            <Text style={styles.personnelName}>{item.name}</Text>
            <Text style={styles.personnelPosition}>{item.position}</Text>
            <Text style={styles.applicationInfo}>지원일자: {item.appliedDate}</Text>
          </View>
        </View>
        {!!item.skills.length && (
          <View style={styles.personnelSkills}>
            {item.skills.map((s) => (
              <View key={s} style={styles.skillTag}><Text style={styles.skillTagText}>{s}</Text></View>
            ))}
          </View>
        )}
      </View>
    );
  };

  const renderProjectCard = (item: ProjectItem) => {
    const borderColor = item.category === 'support' ? '#4a6fdc' : '#e74c3c';
    return (
      <View key={item.id} style={[styles.card, styles.projectCard, { borderLeftColor: borderColor }]}>        
        <View style={styles.projectHeader}>
          <View style={{ flex: 1 }}>
            <Text style={styles.projectTitle}>{item.title}</Text>
            <Text style={styles.projectOrg}>{item.org}</Text>
            <Text style={styles.projectDate}>{item.date}</Text>
          </View>
          <View style={[styles.projectType, item.category === 'support' ? styles.categorySupport : styles.categoryLaw]}>
            <Text style={styles.projectTypeText}>{item.category === 'support' ? '지원사업' : '법령개정'}</Text>
          </View>
        </View>
        {item.content && <Text style={styles.projectContent}>{item.content}</Text>}
        {!!item.tags?.length && (
          <View style={styles.projectTags}>
            {item.tags!.map((t) => (
              <View key={t} style={styles.projectTag}><Text style={styles.projectTagText}>{t}</Text></View>
            ))}
          </View>
        )}
        <View style={styles.projectActions}>
          <TouchableOpacity style={[styles.projectActionBtn, styles.btnDetail]}>
            <FontAwesome5 name="info-circle" size={10} color="#fff" />
            <Text style={styles.projectActionText}>상세보기</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.projectActionBtn, styles.btnRemove]}>
            <FontAwesome5 name="trash" size={10} color="#fff" />
            <Text style={styles.projectActionText}>제거</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.root}>
      {/* Header */}
      <SubformHeader
        title="기업 북마크"
        showBack
        showHome
        navigation={navigation as any}
        onHome={() => (navigation as any).navigate('Home')}
      />

      {/* Tabs */}
      <View style={styles.tabNav}>
        {([
          { key: 'experts', label: '전문가', icon: 'user-tie' },
          { key: 'personnel', label: '인력', icon: 'users' },
          { key: 'government', label: '정부 정책 및 뉴스', icon: 'building' },
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
      <ScrollView style={styles.container}>
        {/* Search & Filters */}
        <View style={styles.searchFilterSection}>
          <View style={styles.searchBox}>
            <TextInput
              style={styles.searchInput}
              placeholder={
                activeTab === 'experts'
                  ? '전문가 이름, 분야 검색'
                  : activeTab === 'personnel'
                  ? '이름, 직무 검색'
                  : '사업명, 키워드 검색'
              }
              value={searchText}
              onChangeText={setSearchText}
            />
            <View style={styles.searchIcon}><FontAwesome5 name="search" size={14} color="#999" /></View>
          </View>

          {activeTab === 'experts' && (
            <View style={styles.filterButtons}>
              {(['all', 'ISMS-P', 'ISO', '개인정보', '클라우드'] as const).map((f) => (
                <TouchableOpacity
                  key={f}
                  style={[styles.filterBtn, expertFilter === f && styles.filterBtnActive]}
                  onPress={() => setExpertFilter(f)}
                >
                  <Text style={[styles.filterBtnText, expertFilter === f && styles.filterBtnTextActive]}>
                    {f === 'all' ? '전체' : f}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          )}

          {activeTab === 'personnel' && (
            <View style={styles.filterButtons}>
              {(['all', '개발자', '기획자', '디자이너', '기타'] as const).map((f) => (
                <TouchableOpacity
                  key={f}
                  style={[styles.filterBtn, personnelFilter === f && styles.filterBtnActive]}
                  onPress={() => setPersonnelFilter(f)}
                >
                  <Text style={[styles.filterBtnText, personnelFilter === f && styles.filterBtnTextActive]}>
                    {f === 'all' ? '전체' : f}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          )}

          {activeTab === 'government' && (
            <View style={styles.filterButtons}>
              {(['all', 'support', 'law'] as const).map((f) => (
                <TouchableOpacity
                  key={f}
                  style={[styles.filterBtn, projectFilter === f && styles.filterBtnActive]}
                  onPress={() => setProjectFilter(f)}
                >
                  <Text style={[styles.filterBtnText, projectFilter === f && styles.filterBtnTextActive]}>
                    {f === 'all' ? '전체' : f === 'support' ? '지원사업' : '법령개정'}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          )}
        </View>

        {/* Lists */}
        {activeTab === 'experts' && (
          <View>
            {experts.map(renderExpertCard)}
            {!experts.length && (
              <View style={styles.emptyState}>
                <FontAwesome5 name="inbox" size={36} color="#ddd" />
                <Text style={styles.emptyText}>북마크된 전문가가 없습니다.</Text>
              </View>
            )}
          </View>
        )}

        {activeTab === 'personnel' && (
          <View>
            {personnel.map(renderPersonnelCard)}
            {!personnel.length && (
              <View style={styles.emptyState}>
                <FontAwesome5 name="inbox" size={36} color="#ddd" />
                <Text style={styles.emptyText}>북마크된 인력이 없습니다.</Text>
              </View>
            )}
          </View>
        )}

        {activeTab === 'government' && (
          <View>
            {projects.map(renderProjectCard)}
            {!projects.length && (
              <View style={styles.emptyState}>
                <FontAwesome5 name="inbox" size={36} color="#ddd" />
                <Text style={styles.emptyText}>북마크된 정부 사업이 없습니다.</Text>
              </View>
            )}
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
};

export default BookmarkCorporate;
