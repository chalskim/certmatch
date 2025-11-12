// Filter data converted from mokup.json
export const filters = {
  Industrial: [
    "금융",
    "의료",
    "제조", 
    "IT",
    "공공",
    "유통",
    "교육",
    "물류",
    "환경",
    "식품"
  ],
  categories: [
    "ISMS",
    "ISMS-P",
    "ISO 27001", 
    "ISO 9001",
    "ISO 14001",
    "CPPG",
    "ESPM",
    "GS 인증",
    "GDPR",
    "HIPAA"
  ],
  regions: [
    "서울",
    "경기",
    "인천", 
    "부산",
    "대전",
    "대구",
    "광주",
    "울산",
    "세종",
    "강원",
    "충북",
    "충남",
    "전북",
    "전남",
    "경북",
    "경남",
    "제주",
    "전국"
  ],
  ActAreas: [
    "취업", 
    "교육",
    "강사",
    "인증",
    "컨설팅",
    "모의인증",
    "정부지원"
  ], 
  ComIntersAreas: [
    "인증",
    "모의인증",
    "컨설팅",
    "정부지원",
    "교육사업"
  ]
} as const;

// Type definitions for filters
export type FilterCategory = typeof filters.categories[number];
export type FilterRegion = typeof filters.regions[number];
export type FilterIndustrial = typeof filters.Industrial[number];
export type FilterActAreas = typeof filters.ActAreas[number];

// Export individual arrays for convenience
export const { categories, regions, Industrial, ActAreas } = filters;
