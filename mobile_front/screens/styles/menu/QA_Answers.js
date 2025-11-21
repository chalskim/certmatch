import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f5f7fa' },
  content: { padding: 16, paddingBottom: 80 },

  // Status cards
  statusCards: { flexDirection: 'row', gap: 12, marginBottom: 16 },
  statusCard: {
    flex: 1,
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 2 },
    elevation: 2,
    position: 'relative',
  },
  accentLeft: {
    position: 'absolute',
    left: 0,
    top: 0,
    bottom: 0,
    width: 4,
    borderTopLeftRadius: 12,
    borderBottomLeftRadius: 12,
    backgroundColor: 'transparent',
  },
  unansweredBorder: {},
  pendingBorder: {},
  answeredBorder: {},
  statusValue: { fontSize: 24, fontWeight: '700', marginBottom: 4 },
  statusLabel: { fontSize: 14, color: '#777' },

  // Filter tabs
  filterTabs: { marginBottom: 16 },
  filterTab: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 20,
    backgroundColor: '#f0f2f5',
    marginRight: 8,
  },
  filterTabActive: { backgroundColor: '#4a6cf7' },
  filterTabText: { color: '#777', fontSize: 14, fontWeight: '600' },
  filterTabTextActive: { color: '#fff' },

  // List and card
  list: { gap: 12 },
  card: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 2 },
    elevation: 2,
  },
  cardHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 8 },
  cardTitle: { flex: 1, fontWeight: '600', fontSize: 16, marginRight: 8 },
  statusBadge: { paddingVertical: 4, paddingHorizontal: 8, borderRadius: 12 },
  badgeText: { fontSize: 12, fontWeight: '600' },
  badgeUnanswered: { backgroundColor: '#ffebee' },
  badgePending: { backgroundColor: '#fff3e0' },
  badgeAnswered: { backgroundColor: '#e8f5e9' },
  badgeBest: { backgroundColor: '#e3f2fd' },

  cardContent: { fontSize: 14, color: '#555', marginBottom: 8 },

  cardMeta: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 },
  metaInfo: { flexDirection: 'row', gap: 12 },
  metaItem: { flexDirection: 'row', alignItems: 'center', gap: 6 },
  metaText: { fontSize: 12, color: '#777' },

  actions: { flexDirection: 'row', flexWrap: 'wrap', gap: 8 },
  btn: { paddingVertical: 6, paddingHorizontal: 12, borderRadius: 6 },
  btnPrimary: { backgroundColor: '#4a6cf7' },
  btnOutline: { borderWidth: 1, borderColor: '#4a6cf7' },
  btnSuccess: { backgroundColor: '#4caf50' },
  btnWarning: { backgroundColor: '#ffa502' },
  btnTextPrimary: { fontSize: 12, fontWeight: '600', color: '#fff' },
  btnTextOutline: { fontSize: 12, fontWeight: '600', color: '#4a6cf7' },
  btnTextWhite: { fontSize: 12, fontWeight: '600', color: '#fff' },

  // Bottom nav
  bottomNavSpacer: { height: 70 },
  bottomNav: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    backgroundColor: '#fff',
    paddingVertical: 10,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: -2 },
    elevation: 8,
  },
  navItem: { alignItems: 'center' },
  navItemActive: {},
  navText: { fontSize: 12, color: '#777', marginTop: 4 },

  // Modal common
  modalOverlay: { flex: 1, backgroundColor: 'rgba(0,0,0,0.5)', justifyContent: 'center', alignItems: 'center' },
  modalContent: { backgroundColor: '#fff', borderRadius: 12, width: '90%', maxWidth: 600, maxHeight: '80%' },
  modalHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', padding: 16, borderBottomWidth: 1, borderBottomColor: '#f0f2f5' },
  modalTitle: { fontSize: 18, fontWeight: '700' },
  modalClose: { width: 30, height: 30, alignItems: 'center', justifyContent: 'center', borderRadius: 15, backgroundColor: '#f0f2f5' },
  modalFooter: { flexDirection: 'row', gap: 8, padding: 16, borderTopWidth: 1, borderTopColor: '#f0f2f5' },

  // Form elements
  formGroup: { marginBottom: 12 },
  formLabel: { fontWeight: '600', fontSize: 14, marginBottom: 8 },
  questionBox: { padding: 12, backgroundColor: '#f8f9fc', borderRadius: 8 },
  questionTitle: { fontSize: 14, fontWeight: '700' },
  questionContent: { marginTop: 8, color: '#777', fontSize: 14 },
  textarea: { minHeight: 150, borderWidth: 1, borderColor: '#e0e6ed', borderRadius: 8, padding: 12, fontSize: 14, textAlignVertical: 'top' },

  // Expert list
  expertList: { gap: 10, maxHeight: 200, borderWidth: 1, borderColor: '#e0e6ed', borderRadius: 8, padding: 10 },
  expertItem: { flexDirection: 'row', alignItems: 'center', padding: 10, backgroundColor: '#f8f9fc', borderRadius: 6 },
  expertItemSelected: { backgroundColor: 'rgba(74,108,247,0.1)', borderWidth: 1, borderColor: '#4a6cf7' },
  expertAvatar: { width: 32, height: 32, borderRadius: 16, backgroundColor: '#4a6cf7', alignItems: 'center', justifyContent: 'center', marginRight: 10 },
  expertAvatarText: { color: '#fff', fontWeight: '700', fontSize: 12 },
  expertName: { fontWeight: '600', fontSize: 14 },
  expertField: { fontSize: 12, color: '#777' },

  // Answer section
  answerSection: { marginTop: 16, paddingTop: 16, borderTopWidth: 1, borderTopColor: '#f0f2f5' },
  answerHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 },
  answerTitle: { fontWeight: '600', fontSize: 14, color: '#4a6cf7' },
  answerBadge: { paddingVertical: 4, paddingHorizontal: 8, backgroundColor: '#e3f2fd', borderRadius: 4 },
  answerBadgeText: { fontSize: 11, fontWeight: '600', color: '#2196f3' },
  answerContentBox: { backgroundColor: '#f8f9fc', padding: 12, borderRadius: 8, marginBottom: 8 },
  answerContentText: { fontSize: 14, color: '#555', lineHeight: 20 },
  answerMeta: { flexDirection: 'row', justifyContent: 'space-between' },

  // Category list in modal
  categoryList: { flexDirection: 'row', flexWrap: 'wrap', gap: 8 },
  categoryItem: { paddingVertical: 8, paddingHorizontal: 12, borderRadius: 6, borderWidth: 1, borderColor: '#e0e6ed' },
  categoryItemSelected: { backgroundColor: 'rgba(74,108,247,0.1)', borderColor: '#4a6cf7' },
  categoryText: { fontSize: 13, color: '#555' },
  categoryTextSelected: { color: '#4a6cf7', fontWeight: '700' },
});
