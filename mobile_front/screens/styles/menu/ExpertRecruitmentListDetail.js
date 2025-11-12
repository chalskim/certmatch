import { StyleSheet, Platform } from 'react-native';

// Named export 추가 (다른 화면들과 일관성 유지)
const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f9fafb' },
  jobHeader: {
    backgroundColor: '#fff',
    padding: 16,
    borderRadius: 12,
    // Use column to place breadcrumb above the main header row
    flexDirection: 'column',
    gap: 12,
    shadowColor: '#000',
    shadowOpacity: 0.04,
    elevation: 1,
    marginBottom: 16,
  },
  // Main header row (logo + title/meta/actions)
  jobHeaderRow: {
    flexDirection: 'row',
    gap: 12,
  },
  companyLogo: {
    width: 60,
    height: 60,
    borderRadius: 8,
    backgroundColor: '#f5f7ff',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  companyLogoText: { color: '#4a6cf7', fontWeight: '700', fontSize: 18 },
  jobTitle: { fontSize: 20, fontWeight: '700', marginBottom: 8 },
  jobMetaRow: { flexDirection: 'row', flexWrap: 'wrap', gap: 8, marginBottom: 12 },
  jobMetaItem: { color: '#6c757d', marginRight: 10 },
  jobActions: { flexDirection: 'row', gap: 10, marginTop: 4 },
  btn: { paddingHorizontal: 14, paddingVertical: 10, borderRadius: 8 },
  btnApply: { backgroundColor: '#4a6cf7' },
  btnApplyText: { color: '#fff', fontWeight: '600' },
  btnSave: { backgroundColor: '#fff', borderWidth: 1, borderColor: '#4a6cf7' },
  btnSaveText: { color: '#4a6cf7', fontWeight: '600' },
  btnOutline: { backgroundColor: '#fff', borderWidth: 1, borderColor: '#ced4da' },
  btnOutlineText: { color: '#6c757d', fontWeight: '600' },

  officeImages: { flexDirection: 'row', gap: 12, marginBottom: 16 },
  officeImage: { flex: 1, height: 180, borderRadius: 12 },

  // Breadcrumb styles
  breadcrumb: { flexDirection: 'row', alignItems: 'center', flexWrap: 'wrap', marginBottom: 4 },
  breadcrumbText: { color: '#6c757d', fontSize: 13 },
  breadcrumbDivider: { color: '#6c757d', marginHorizontal: 6 },

  tabsContainer: { marginBottom: 8 },
  tabChip: {
    paddingHorizontal: 14,
    paddingVertical: 10,
    borderBottomWidth: 3,
    borderBottomColor: 'transparent',
    marginRight: 8,
  },
  tabChipActive: { borderBottomColor: '#4a6cf7' },
  tabChipText: { color: '#6c757d', fontWeight: '600' },
  tabChipTextActive: { color: '#4a6cf7' },

  contentSection: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOpacity: 0.04,
    elevation: 1,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '700',
    marginBottom: 12,
    paddingBottom: 8,
    borderBottomWidth: 2,
    borderBottomColor: '#f5f7ff',
  },
  sectionText: { color: '#333', lineHeight: 20, marginBottom: 8 },

  requirementItem: { flexDirection: 'row', alignItems: 'center', marginBottom: 10 },
  requirementIcon: { marginRight: 8, fontSize: 16, color: '#4a6cf7' },
  requirementText: { color: '#333' },

  skillTag: {
    backgroundColor: '#f5f7ff',
    borderRadius: 20,
    paddingHorizontal: 12,
    paddingVertical: 8,
    marginRight: 8,
    marginBottom: 8,
  },
  skillTagText: { color: '#4a6cf7', fontWeight: '600' },

  inquirySection: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    marginTop: 8,
    shadowColor: '#000',
    shadowOpacity: 0.04,
    elevation: 1,
    alignItems: 'center',
  },
  inquiryTitle: { fontSize: 18, fontWeight: '700', marginBottom: 8 },
  btnInquiry: { backgroundColor: '#4a6cf7', paddingHorizontal: 16, paddingVertical: 12, borderRadius: 8 },
  btnInquiryText: { color: '#fff', fontWeight: '600', fontSize: 16 },

  // 회사 정보 카드
  companyInfoCard: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOpacity: 0.04,
    elevation: 1,
  },
  companyDetailItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
    paddingBottom: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#e9ecef',
  },
  companyDetailItemLast: {
    borderBottomWidth: 0,
    marginBottom: 0,
    paddingBottom: 0,
  },
  companyDetailIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#f5f7ff',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  companyDetailLabel: { fontSize: 12, color: '#6c757d' },
  companyDetailValue: { fontSize: 14, color: '#333', fontWeight: '600' },
  companyVerifiedBadge: {
    alignSelf: 'flex-start',
    backgroundColor: '#e8f5e9',
    borderColor: '#2e7d32',
    borderWidth: 1,
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 16,
  },
  companyVerifiedText: { color: '#2e7d32', fontWeight: '600', fontSize: 12 },

  // 유사한 포지션 카드 리스트
  similarJobs: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    marginTop: 16,
    shadowColor: '#000',
    shadowOpacity: 0.04,
    elevation: 1,
  },
  similarJobCard: {
    borderWidth: 1,
    borderColor: '#e9ecef',
    borderRadius: 8,
    padding: 14,
    marginBottom: 12,
  },
  similarJobCardTitle: { fontWeight: '600', marginBottom: 6 },
  similarJobCardCompany: { color: '#6c757d', marginBottom: 6 },
  similarJobCardMeta: { flexDirection: 'row', gap: 12 },
  similarJobCardMetaText: { color: '#6c757d', fontSize: 12 },

  floatingInquiry: {
    position: 'absolute',
    bottom: 30,
    right: 30,
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: '#4a6cf7',
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.2,
    elevation: 3,
  },

  modalContainer: { flex: 1, backgroundColor: '#fff' },
  modalHeader: { backgroundColor: '#4a6cf7', paddingTop: Platform.OS === 'ios' ? 56 : 16, paddingBottom: 12, paddingHorizontal: 16 },
  modalHeaderText: { color: '#fff', fontSize: 18, fontWeight: '700' },
  formLabel: { fontWeight: '600', color: '#333', marginBottom: 6 },
  formInput: { borderWidth: 1, borderColor: '#e9ecef', borderRadius: 8, paddingHorizontal: 12, paddingVertical: 10, marginBottom: 12 },
  textarea: { minHeight: 120, textAlignVertical: 'top' },

  toastBox: {
    position: 'absolute',
    left: '50%',
    transform: [{ translateX: -120 }],
    bottom: 80,
    backgroundColor: 'rgba(0,0,0,0.75)',
    padding: 10,
    borderRadius: 8,
    width: 240,
    alignItems: 'center',
  },
});

// 기본 export와 함께 named export를 제공하여 TS/JS 양쪽 import 형태를 모두 지원
export { styles };
export default styles;