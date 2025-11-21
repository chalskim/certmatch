import { StyleSheet, Platform } from 'react-native';

// 로컬 스타일에서 사용하는 색상 상수 정의
// NoticeItemlistDetail.tsx의 COLORS와 동일하게 맞춰 사용합니다.
const COLORS = {
  primary: '#4a6cf7',
  secondary: '#f5f7ff',
  success: '#28a745',
  warning: '#ffc107',
  danger: '#dc3545',
  text: '#333',
  lightGray: '#f8f9fa',
  border: '#e9ecef',
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f9fafb' },
  contentContainer: { paddingHorizontal: 16, paddingBottom: 24 },

  header: {
    backgroundColor: 'white',
    paddingVertical: 24,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
    paddingHorizontal: 4,
  },
  breadcrumb: { flexDirection: 'row', flexWrap: 'wrap', alignItems: 'center' },
  breadcrumbLink: { color: '#6c757d', marginRight: 6, fontSize: 14 },
  breadcrumbSeparator: { color: '#6c757d', marginRight: 6 },
  breadcrumbActive: { color: '#6c757d', fontWeight: '600' },

  articleTitle: {
    fontSize: 28,
    fontWeight: '700',
    marginTop: 8,
    marginBottom: 12,
    color: COLORS.text,
    lineHeight: 36,
  },

  meta: { flexDirection: 'row', flexWrap: 'wrap', marginBottom: 16 },
  metaItem: { flexDirection: 'row', alignItems: 'center', marginRight: 16, marginBottom: 8 },
  metaIcon: { marginRight: 6 },
  metaText: { color: '#6c757d', fontSize: 14 },

  tagsRow: { flexDirection: 'row', marginBottom: 12 },
  tagBreaking: {
    backgroundColor: 'rgba(220, 53, 69, 0.1)',
    color: COLORS.danger,
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 20,
    fontSize: 12,
    fontWeight: '600',
    marginRight: 8,
  },
  tagIndustry: {
    backgroundColor: 'rgba(74, 108, 247, 0.1)',
    color: COLORS.primary,
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 20,
    fontSize: 12,
    fontWeight: '600',
  },

  actions: { flexDirection: 'row', marginTop: 12 },
  actionBtn: {
    backgroundColor: 'white',
    borderWidth: 1,
    borderColor: COLORS.border,
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 8,
    marginRight: 8,
  },
  actionText: { color: COLORS.primary, fontWeight: '500' },

  heroImage: {
    width: '100%',
    height: 200,
    borderRadius: 12,
    marginVertical: 16,
  },

  card: {
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 2 },
    ...(Platform.OS === 'android' ? { elevation: 2 } : {}),
  },

  paragraph: { fontSize: 16, lineHeight: 24, marginBottom: 12, color: COLORS.text },
  sectionTitle: { fontSize: 20, fontWeight: '700', marginTop: 20, marginBottom: 12, color: COLORS.text },
  subTitle: { fontSize: 18, fontWeight: '600', marginTop: 16, marginBottom: 8, color: COLORS.text },
  quote: {
    borderLeftWidth: 4,
    borderLeftColor: COLORS.primary,
    paddingLeft: 12,
    marginVertical: 16,
    color: '#6c757d',
    fontStyle: 'italic',
  },
  keyPoint: {
    backgroundColor: COLORS.secondary,
    borderLeftWidth: 4,
    borderLeftColor: COLORS.primary,
    padding: 12,
    marginVertical: 16,
    borderRadius: 8,
  },
  keyPointTitle: { color: COLORS.primary, fontWeight: '700', marginBottom: 6 },
  list: { marginBottom: 12, paddingLeft: 4 },
  listItem: { marginBottom: 6, fontSize: 16, lineHeight: 24, color: COLORS.text },
  bold: { fontWeight: '700' },

  bottomCard: {
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 16,
    marginBottom: 24,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  sidebarTitle: {
    fontSize: 18,
    fontWeight: '700',
    marginBottom: 12,
    borderBottomWidth: 2,
    borderBottomColor: COLORS.secondary,
    paddingBottom: 8,
  },

  trendingItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
  },
  trendingNumber: {
    width: 30,
    height: 30,
    borderRadius: 15,
    backgroundColor: COLORS.primary,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  trendingNumberText: { color: 'white', fontWeight: '700' },
  trendingContent: { flex: 1 },
  trendingTitle: { fontSize: 16, fontWeight: '600', marginBottom: 4 },
  trendingDesc: { fontSize: 13, color: '#6c757d' },
});

export { styles };