import React, { useState, useRef, useEffect } from 'react';
import { View, Text, ScrollView, TextInput, TouchableOpacity, Dimensions, FlatList } from 'react-native';
import { FontAwesome5 } from '@expo/vector-icons';
import { styles } from './styles/styles';
import {
  dataService,
  type Banner,
  type UrgentRecruitment,
  type GeneralRecruitment,
  type Consultant,
  type Course,
  type Notice,
  type RecommendedCourse
} from '../services/dataService';
import { JobsTab } from './subforms/JobsTab';
import { ConsultantsTab } from './subforms/ConsultantsTab';
import { EducationTab } from './subforms/EducationTab';
import { NoticesTab } from './subforms/NoticesTab';

const { width } = Dimensions.get('window');

export const HomeScreen: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'jobs' | 'consultants' | 'education' | 'notices'>('jobs');
  const [activeFilter, setActiveFilter] = useState<string>('전체');
  const [bannerIndex, setBannerIndex] = useState<number>(0);
  const bannerRef = useRef<ScrollView>(null);

  // 데이터 가져오기
  const banners = dataService.getBanners();
  const urgentRecruitments = dataService.getUrgentRecruitments();
  const generalRecruitments = dataService.getGeneralRecruitments();
  const consultants = dataService.getConsultants();
  const recommendedConsultants = dataService.getRecommendedConsultants();
  const courses = dataService.getCourses();
  const recommendedCourses = dataService.getRecommendedCourses();
  const notices = dataService.getNotices();
  const filters = dataService.getFilters();

  // 배너 자동 슬라이드
  useEffect(() => {
    const id = setInterval(() => {
      setBannerIndex((prev) => {
        const next = (prev + 1) % banners.length;
        bannerRef.current?.scrollTo({ x: next * width, animated: true });
        return next;
      });
    }, 4000);
    return () => clearInterval(id);
  }, [banners.length]);

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {/* Search Section */}
      <View style={styles.searchSection}>
        <Text style={styles.searchTitle}>인증도 스마트하게, CertLine와 함께</Text>
        <View style={styles.searchBar}>
          <TextInput placeholder="컨설턴트, 교육과정, 인증 검색..." style={styles.searchInput} />
          <TouchableOpacity style={styles.searchButton}>
            <Text style={styles.searchButtonText}>검색</Text>
          </TouchableOpacity>
        </View>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.filters}>
          {filters.categories.map((f, i) => (
            <TouchableOpacity key={i} style={[styles.chip, activeFilter === f && styles.chipActive]} onPress={() => setActiveFilter(f)}>
              <Text style={[styles.chipText, activeFilter === f && styles.chipTextActive]}>{f}</Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>

      {/* Banner Carousel */}
      <View style={styles.bannerCarousel}>
        <ScrollView
          ref={bannerRef}
          horizontal
          pagingEnabled
          showsHorizontalScrollIndicator={false}
          onScroll={(e) => {
            const idx = Math.round(e.nativeEvent.contentOffset.x / (width - 30));
            if (idx !== bannerIndex) setBannerIndex(idx);
          }}
          scrollEventThrottle={16}
        >
          {banners.map((b, i) => (
            <View key={i} style={[styles.bannerSlide,
            i % 4 === 0 ? styles.bannerSlide1 :
              i % 4 === 1 ? styles.bannerSlide2 :
                i % 4 === 2 ? styles.bannerSlide3 :
                  styles.bannerSlide4
            ]}>
              <View style={styles.bannerContent}>
                <Text style={styles.bannerTitle}>{b.title}</Text>
                <Text style={styles.bannerDesc}>{b.subtitle}</Text>
                <TouchableOpacity style={styles.bannerButton}>
                  <Text style={styles.bannerButtonText}>{b.cta}</Text>
                </TouchableOpacity>
              </View>
            </View>
          ))}
        </ScrollView>
        <View style={styles.bannerDots} pointerEvents="box-none">
          {banners.map((_, i) => (
            <TouchableOpacity
              key={i}
              style={[styles.bannerDot, bannerIndex === i && styles.bannerDotActive]}
              onPress={() => bannerRef.current?.scrollTo({ x: i * (width - 30), animated: true })}
            />
          ))}
        </View>
      </View>

      {/* Tabs */}
      <View style={styles.tabNav}>
        {[
          { key: 'jobs', label: '컨설팅 및 구인', icon: 'briefcase' },
          { key: 'consultants', label: '전문가 소개', icon: 'user-tie' },
          { key: 'education', label: '전문 교육', icon: 'graduation-cap' },
          { key: 'notices', label: '공지사항 및 뉴스', icon: 'bullhorn' },
        ].map((t) => (
          <TouchableOpacity key={t.key} style={[styles.tabButton, activeTab === t.key && styles.tabButtonActive]} onPress={() => setActiveTab(t.key as any)}>
            <View style={{ alignItems: 'center' }}>
              <FontAwesome5 name={t.icon as any} size={14} color={activeTab === t.key ? '#fff' : '#333'} />
              <Text style={[styles.tabButtonText, activeTab === t.key && styles.tabButtonTextActive]}>{t.label}</Text>
            </View>
          </TouchableOpacity>
        ))}
      </View>

      {/* Tab Content (expanded) */}
      <View style={styles.tabContent}>
        {activeTab === 'jobs' && (
          <JobsTab
            urgentRecruitments={urgentRecruitments}
            generalRecruitments={generalRecruitments}
          />
        )}
        {activeTab === 'consultants' && (
          <ConsultantsTab
            recommendedConsultants={recommendedConsultants}
            consultants={consultants}
          />
        )}
        {activeTab === 'education' && (
          <EducationTab
            recommendedCourses={recommendedCourses}
            courses={courses}
          />
        )}
        {activeTab === 'notices' && (
          <NoticesTab
            notices={notices}
          />
        )}
      </View>
    </ScrollView>
  );
};

/* Component definitions moved to separate files */
/* styles moved to external file */