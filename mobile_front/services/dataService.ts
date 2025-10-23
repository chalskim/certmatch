import mockupData from '../screens/data/mokup.json';

// 타입 정의
export interface Banner {
  id: string;
  title: string;
  subtitle: string;
  image: string;
  cta: string;
}

export interface UrgentRecruitment {
  id: string;
  title: string;
  company: string;
  location: string;
  salary: string;
  deadline: string;
  badges: string[];
  tags: string[];
}

export interface GeneralRecruitment {
  id: string;
  title: string;
  company: string;
  location: string;
  salary: string;
  deadline: string;
  badges: string[];
  tags: string[];
}

export interface Consultant {
  id: string;
  name: string;
  title: string;
  expertise: string[];
  rating: number;
  region: string;
}

export interface Course {
  id: string;
  title: string;
  provider: string;
  duration: string;
  price: string;
  tags: string[];
}

export interface RecommendedCourse {
  id: string;
  title: string;
  provider: string;
  duration: string;
  price: string;
  tags: string[];
  rating: number;
  students: number;
  level: string;
}

export interface Notice {
  id: string;
  title: string;
  category: string;
  date: string;
  description?: string;
  organization?: string;
}

export interface News {
  id: string;
  title: string;
  source: string;
  date: string;
  link: string;
}

export interface Filters {
  categories: string[];
  regions: string[];
}

// 데이터 서비스 클래스
class DataService {
  private data = mockupData;

  // 배너 데이터 가져오기
  getBanners(): Banner[] {
    return this.data.banners;
  }

  // 필터 데이터 가져오기
  getFilters(): Filters {
    return this.data.filters;
  }

  // 긴급 모집 데이터 가져오기
  getUrgentRecruitments(): UrgentRecruitment[] {
    return this.data.urgentRecruitment;
  }

  // 일반 모집 데이터 가져오기
  getGeneralRecruitments(): GeneralRecruitment[] {
    return this.data.generalRecruitment;
  }

  // 컨설턴트 데이터 가져오기
  getConsultants(): Consultant[] {
    return this.data.consultants;
  }

  // 추천 컨설턴트 데이터 가져오기
  getRecommendedConsultants(): Consultant[] {
    return this.data.recommendedConsultants;
  }

  // 교육과정 데이터 가져오기
  getCourses(): Course[] {
    return this.data.courses;
  }

  // 추천 교육과정 데이터 가져오기
  getRecommendedCourses(): RecommendedCourse[] {
    return this.data.recommendedCourses;
  }

  // 공지사항 데이터 가져오기
  getNotices(): Notice[] {
    return this.data.notices;
  }

  // 뉴스 데이터 가져오기
  getNews(): News[] {
    return this.data.news;
  }

  // 카테고리별 필터링
  filterByCategory(items: any[], category: string): any[] {
    if (category === '전체') return items;
    return items.filter(item =>
      item.tags?.includes(category) ||
      item.expertise?.includes(category)
    );
  }

  // 지역별 필터링
  filterByRegion(items: any[], region: string): any[] {
    if (region === '전체') return items;
    return items.filter(item =>
      item.location?.includes(region) ||
      item.region?.includes(region)
    );
  }
}

// 싱글톤 인스턴스 생성
export const dataService = new DataService();