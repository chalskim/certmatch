export type Consultant = {
  name: string;
  title: string;
  expertise: string[];
  rating: number; // 1-5
  location: string;
};

export type Course = {
  title: string;
  provider: string;
  period: string;
  price: string;
  tags: string[];
};

export type Notice = {
  title: string;
  category: string; // 공지, 뉴스 등
  date: string; // YYYY.MM.DD
};

export const consultants: Consultant[] = [
  { name: '김보안', title: 'ISMS-P 컨설턴트', expertise: ['ISMS-P', '개인정보보호'], rating: 4.8, location: '서울 강남' },
  { name: '이클라우드', title: '클라우드 보안 아키텍트', expertise: ['AWS', 'Azure', 'DevSecOps'], rating: 4.6, location: '경기 판교' },
  { name: '박품질', title: 'GS 인증 전문가', expertise: ['GS 인증', 'SW 품질'], rating: 4.7, location: '서울 서초' },
];

export const courses: Course[] = [
  { title: 'ISMS-P 실무자 과정', provider: 'CertMatch Academy', period: '3주', price: '무료(정부지원)', tags: ['오프라인', '주말반'] },
  { title: '클라우드 보안 기초', provider: 'CertMatch Academy', period: '2주', price: '20만원', tags: ['온라인', '초급'] },
  { title: 'GDPR 컴플라이언스', provider: 'CertMatch Academy', period: '4주', price: '35만원', tags: ['온라인', '중급'] },
];

export const notices: Notice[] = [
  { title: '2025년 정보보호 지원사업 공고', category: '공지', date: '2025.02.01' },
  { title: 'ISMS-P 인증 절차 변경 안내', category: '공지', date: '2025.02.10' },
  { title: '보안 업계 뉴스 브리핑 (2월 3주차)', category: '뉴스', date: '2025.02.17' },
];