// EduListDetail 화면 스타일 (React Native Web 호환)
// 프로젝트의 다른 스타일 파일과 일관되도록 StyleSheet를 쓰지 않고 객체를 직접 export 합니다.

export const styles = {
  root: { backgroundColor: '#f9fafb', flex: 1 },
  container: { padding: 16 },

  // 상단 헤더(빵크럼, 타이틀 블록)
  headerCard: {
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#e9ecef',
    paddingVertical: 16,
    paddingHorizontal: 16,
  },
  breadcrumb: { flexDirection: 'row', alignItems: 'center', flexWrap: 'wrap', marginBottom: 12 },
  breadcrumbText: { color: '#6c757d', fontSize: 13 },
  breadcrumbDivider: { color: '#6c757d', marginHorizontal: 6 },

  titleRow: { flexDirection: 'row', alignItems: 'flex-start' },
  // 헤더 상단 좌/우 분할 행 (인라인 스타일 제거용)
  headerSplitRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start' },
  providerLogo: {
    width: 80,
    height: 80,
    borderRadius: 12,
    backgroundColor: '#f5f7ff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  providerLogoText: { color: '#4a6cf7', fontWeight: '700', fontSize: 22 },
  courseTitleInfo: { flex: 1 },
  titleH1: { fontSize: 24, fontWeight: '800', color: '#222', marginBottom: 6 },
  titleSub: { fontSize: 14, color: '#6c757d', marginBottom: 10 },

  badges: { flexDirection: 'row', flexWrap: 'wrap', marginBottom: 10 },
  badge: { paddingHorizontal: 10, paddingVertical: 6, borderRadius: 20, marginRight: 8, marginBottom: 8 },
  badgeNew: { backgroundColor: 'rgba(23,162,184,0.1)' },
  badgePopular: { backgroundColor: 'rgba(255,193,7,0.12)' },
  badgeDefault: { backgroundColor: '#f0f0f0' },

  actionsRow: { flexDirection: 'row', marginTop: 12, flexWrap: 'wrap' },
  btnPrimary: { backgroundColor: '#4a6cf7', paddingHorizontal: 16, paddingVertical: 10, borderRadius: 8, flexDirection: 'row', alignItems: 'center', marginRight: 10, marginBottom: 10 },
  btnPrimaryText: { color: '#fff', fontWeight: '700' },
  btnOutline: { borderWidth: 1, borderColor: '#4a6cf7', backgroundColor: '#fff', paddingHorizontal: 14, paddingVertical: 10, borderRadius: 8, flexDirection: 'row', alignItems: 'center', marginRight: 10, marginBottom: 10 },
  btnOutlineText: { color: '#4a6cf7', fontWeight: '700' },
  btnSecondary: { borderWidth: 1, borderColor: '#dee2e6', backgroundColor: '#fff', paddingHorizontal: 14, paddingVertical: 10, borderRadius: 8, flexDirection: 'row', alignItems: 'center', marginRight: 10, marginBottom: 10 },
  btnSecondaryText: { color: '#6c757d', fontWeight: '700' },
  btnIcon: { marginRight: 8 },

  ratingRow: { flexDirection: 'row', alignItems: 'center' },
  // 헤더 우측 요약 블록 정렬 (인라인 스타일 제거용)
  ratingSummary: { alignItems: 'flex-end' },
  ratingStar: { color: '#ffc107' },
  ratingStarIcon: { marginRight: 4 },
  ratingScore: { fontWeight: '700', color: '#333' },
  ratingCount: { color: '#6c757d' },

  heroImage: { width: '100%', height: 300, borderRadius: 12, marginVertical: 16 },

  // 탭
  tabsContainer: { marginBottom: 16 },
  tabsBar: { flexDirection: 'row', borderBottomWidth: 2, borderBottomColor: '#e9ecef' },
  tabButton: { paddingVertical: 12, paddingHorizontal: 16 },
  tabButtonActive: { borderBottomWidth: 3, borderBottomColor: '#4a6cf7' },
  tabButtonText: { color: '#6c757d', fontWeight: '700' },
  tabButtonTextActive: { color: '#4a6cf7' },

  // 레이아웃 (메인/사이드)
  contentRow: { flexDirection: 'row' },
  mainCol: { flex: 1, marginRight: 16 },
  sidebar: { width: 320 },

  // 공통 섹션 카드
  sectionCard: { backgroundColor: '#fff', borderRadius: 12, padding: 16, marginBottom: 16, shadowColor: '#000', shadowOpacity: 0.05, shadowRadius: 5, shadowOffset: { width: 0, height: 2 } },
  sectionTitle: { fontSize: 18, fontWeight: '800', marginBottom: 12, paddingBottom: 8, borderBottomWidth: 2, borderBottomColor: '#f5f7ff' },
  paragraph: { color: '#444', lineHeight: 20, marginBottom: 8 },

  // 커리큘럼
  module: { borderWidth: 1, borderColor: '#e9ecef', borderRadius: 8, marginBottom: 10, overflow: 'hidden' },
  moduleHeader: { backgroundColor: '#f8f9fa', paddingVertical: 12, paddingHorizontal: 16, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' },
  moduleHeaderTitle: { fontWeight: '700', color: '#333' },
  moduleContent: { padding: 12 },
  lessonItem: { flexDirection: 'row', alignItems: 'center', paddingVertical: 6 },
  lessonIcon: { color: '#4a6cf7', marginRight: 8 },

  // 강사 카드
  instructorCard: { flexDirection: 'row', alignItems: 'center', padding: 16, borderWidth: 1, borderColor: '#e9ecef', borderRadius: 8, marginBottom: 10, backgroundColor: '#fff' },
  instructorAvatar: { width: 80, height: 80, borderRadius: 40, backgroundColor: '#f0f0f0', marginRight: 16 },
  instructorInfo: { flex: 1 },
  instructorName: { fontSize: 16, fontWeight: '700' },
  instructorOrg: { fontSize: 13, color: '#6c757d', marginBottom: 6 },
  badgeRow: { flexDirection: 'row', flexWrap: 'wrap' },
  badgePrimary: { backgroundColor: '#4a6cf7', paddingHorizontal: 10, paddingVertical: 6, borderRadius: 20, marginRight: 6, marginBottom: 6 },
  badgePrimaryText: { color: '#fff', fontSize: 12, fontWeight: '700' },

  // 혜택
  benefitItem: { flexDirection: 'row', alignItems: 'flex-start', marginBottom: 16 },
  benefitIconWrap: { width: 40, height: 40, borderRadius: 20, backgroundColor: '#f5f7ff', alignItems: 'center', justifyContent: 'center', marginRight: 12 },
  benefitTitle: { fontSize: 15, fontWeight: '700' },
  benefitDesc: { fontSize: 13, color: '#444' },

  // 후기 카드
  reviewCard: { borderWidth: 1, borderColor: '#e9ecef', borderRadius: 8, padding: 16, marginBottom: 10, backgroundColor: '#fff' },
  reviewHeader: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginBottom: 10 },
  reviewerInfo: { flexDirection: 'row', alignItems: 'center' },
  reviewerAvatar: { width: 40, height: 40, borderRadius: 20, backgroundColor: '#f5f7ff', alignItems: 'center', justifyContent: 'center' },
  reviewerAvatarText: { color: '#4a6cf7', fontWeight: '700' },
  reviewerMeta: { marginLeft: 8 },
  reviewerName: { fontWeight: '700', fontSize: 14 },
  reviewerSub: { color: '#6c757d', fontSize: 12 },

  // 사이드바 카드
  sidebarCard: { backgroundColor: '#fff', borderRadius: 12, padding: 16, marginBottom: 16, shadowColor: '#000', shadowOpacity: 0.05, shadowRadius: 5, shadowOffset: { width: 0, height: 2 } },
  sidebarTitle: { fontSize: 15, fontWeight: '800', color: '#4a6cf7', marginBottom: 10 },
  priceDisplay: { fontSize: 24, fontWeight: '800', color: '#4a6cf7', textAlign: 'center', marginBottom: 6 },
  priceNote: { textAlign: 'center', color: '#6c757d', fontSize: 12, marginBottom: 12 },
  statItem: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingVertical: 10, borderBottomWidth: 1, borderBottomColor: '#e9ecef' },
  statLabel: { flexDirection: 'row', alignItems: 'center' },
  statValue: { fontWeight: '700', color: '#333' },

  // 제공 기관 정보 행 (인라인 스타일 제거용)
  providerRow: { flexDirection: 'row', alignItems: 'center', marginBottom: 8 },
  providerInfo: { marginLeft: 12 },

  relatedCard: { borderWidth: 1, borderColor: '#e9ecef', borderRadius: 8, padding: 12, marginBottom: 10, backgroundColor: '#fff' },
  relatedTitle: { fontWeight: '700', marginBottom: 4 },
  relatedProvider: { color: '#6c757d', fontSize: 12, marginBottom: 6 },
  relatedPrice: { color: '#4a6cf7', fontWeight: '800' },

  // 모달
  modalBackdrop: { flex: 1, backgroundColor: 'rgba(0,0,0,0.4)', alignItems: 'center', justifyContent: 'center', padding: 16 },
  modalContent: { width: '100%', maxWidth: 520, backgroundColor: '#fff', borderRadius: 12, padding: 16 },
  modalHeader: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginBottom: 10 },
  modalTitle: { fontSize: 18, fontWeight: '800' },
  modalBody: {},
  modalFooter: { flexDirection: 'row', justifyContent: 'flex-end', marginTop: 12 },
  input: { borderWidth: 1, borderColor: '#dee2e6', borderRadius: 8, paddingHorizontal: 12, paddingVertical: 10 },

  // 토스트
  toastContainer: { position: 'absolute', bottom: 20, right: 20, backgroundColor: 'rgba(0,0,0,0.8)', borderRadius: 6, paddingHorizontal: 14, paddingVertical: 10 },
  toastText: { color: '#fff', fontSize: 13 },
};

export const colors = {
  primary: '#4a6cf7',
  secondary: '#f5f7ff',
  success: '#28a745',
  warning: '#ffc107',
  info: '#17a2b8',
  text: '#333',
  lightGray: '#f8f9fa',
  border: '#e9ecef',
};