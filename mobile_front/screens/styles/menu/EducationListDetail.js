import { StyleSheet } from 'react-native';

export const styles = {
  root: { backgroundColor: '#f8f9fa' },
  container: { padding: 16 },

  // Tabs
  detailTabs: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    borderRadius: 10,
    marginBottom: 16,
    shadowColor: '#000', shadowOpacity: 0.05, shadowRadius: 5, shadowOffset: { width: 0, height: 2 },
    overflow: 'hidden',
  },
  detailTab: {
    flex: 1,
    paddingVertical: 12,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'transparent',
  },
  detailTabActive: {
    backgroundColor: 'rgba(74, 111, 220, 0.08)',
  },
  detailTabText: { fontSize: 14, color: '#666', marginTop: 4 },
  detailTabTextActive: { color: '#4a6fdc', fontWeight: '700' },

  // Course card
  courseCard: { backgroundColor: '#fff', borderRadius: 10, padding: 16, marginBottom: 12, shadowColor: '#000', shadowOpacity: 0.05, shadowRadius: 5, shadowOffset: { width: 0, height: 2 } },
  cardHeader: { flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: 8 },
  cardTitle: { fontSize: 18, fontWeight: '700', color: '#333' },
  cardStatus: { paddingHorizontal: 10, paddingVertical: 6, borderRadius: 15 },
  cardMeta: { flexDirection: 'row', alignItems: 'center', flexWrap: 'wrap', gap: 12, marginVertical: 8 },
  cardMetaItem: { flexDirection: 'row', alignItems: 'center' },
  cardMetaText: { fontSize: 14, color: '#666' },

  // Status change section
  statusChangeSection: { backgroundColor: '#fff', borderRadius: 10, padding: 16, shadowColor: '#000', shadowOpacity: 0.05, shadowRadius: 5, shadowOffset: { width: 0, height: 2 }, marginBottom: 12 },
  sectionTitleRow: { flexDirection: 'row', alignItems: 'center', marginBottom: 12 },
  sectionTitle: { fontSize: 16, fontWeight: '700', color: '#333' },
  statusOptions: { gap: 10 },
  statusOption: { flexDirection: 'row', alignItems: 'center', padding: 12, borderWidth: 1, borderColor: '#ddd', borderRadius: 8 },
  statusOptionSelected: { borderColor: '#4a6fdc', backgroundColor: 'rgba(74, 111, 220, 0.08)' },
  radio: { width: 20, height: 20, borderRadius: 10, borderWidth: 1, borderColor: '#ccc', alignItems: 'center', justifyContent: 'center', marginRight: 12 },
  radioInner: { width: 10, height: 10, borderRadius: 5, backgroundColor: 'transparent' },
  radioInnerSelected: { backgroundColor: '#4a6fdc' },
  statusOptionLabel: { fontSize: 14, color: '#333' },
  statusOptionDesc: { fontSize: 12, color: '#666', marginTop: 3 },
  statusActions: { flexDirection: 'row', gap: 10, marginTop: 12 },

  // Students
  studentList: { gap: 10 },
  studentItem: { backgroundColor: '#fff', borderRadius: 8, padding: 15, flexDirection: 'row', alignItems: 'center', gap: 15, shadowColor: '#000', shadowOpacity: 0.05, shadowRadius: 5, shadowOffset: { width: 0, height: 2 } },
  studentAvatar: { width: 40, height: 40, borderRadius: 20, backgroundColor: '#f0f0f0', alignItems: 'center', justifyContent: 'center' },
  studentInfo: { flex: 1 },
  studentName: { fontWeight: '700', fontSize: 14 },
  studentEmail: { fontSize: 12, color: '#666' },
  studentStatus: { flexDirection: 'row', alignItems: 'center', gap: 10 },
  badge: { backgroundColor: '#e0e0e0', borderRadius: 15, paddingHorizontal: 10, paddingVertical: 6 },
  badgeText: { fontSize: 12, fontWeight: '600' },

  // Reviews & Evaluations cards reuse
  reviewCard: { backgroundColor: '#fff', borderRadius: 10, padding: 16, marginBottom: 12, shadowColor: '#000', shadowOpacity: 0.05, shadowRadius: 5, shadowOffset: { width: 0, height: 2 } },
  reviewHeader: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginBottom: 10 },
  reviewerInfo: { flexDirection: 'row', alignItems: 'center' },
  reviewerAvatar: { width: 40, height: 40, borderRadius: 20, backgroundColor: '#f0f0f0', alignItems: 'center', justifyContent: 'center', marginRight: 10 },
  reviewerName: { fontWeight: '700', fontSize: 14 },
  reviewCourse: { fontSize: 12, color: '#666' },
  reviewRating: { color: '#ffc107', fontSize: 14 },
  reviewContent: { fontSize: 14, color: '#555', lineHeight: 20 },
  reviewDate: { fontSize: 12, color: '#999', textAlign: 'right', marginTop: 8 },

  // Empty state
  emptyState: { alignItems: 'center', paddingVertical: 30, gap: 10 },
  emptyStateText: { color: '#999', fontSize: 14 },

  // Floating Button
  floatingBtn: { position: 'absolute', bottom: 20, right: 20, width: 56, height: 56, borderRadius: 28, backgroundColor: '#4a6fdc', alignItems: 'center', justifyContent: 'center', shadowColor: '#000', shadowOpacity: 0.2, shadowRadius: 10, shadowOffset: { width: 0, height: 4 } },

  // Modal styles
  modalBackdrop: { flex: 1, backgroundColor: 'rgba(0,0,0,0.4)', alignItems: 'center', justifyContent: 'center', padding: 16 },
  modalContent: { width: '100%', maxWidth: 500, backgroundColor: '#fff', borderRadius: 10, padding: 16 },
  modalHeader: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginBottom: 10 },
  modalTitle: { fontSize: 18, fontWeight: '700' },
  modalClose: { fontSize: 22, color: '#999' },
  modalBody: { marginBottom: 10 },
  modalFooter: { flexDirection: 'row', justifyContent: 'flex-end', gap: 10 },

  // Buttons
  btnPrimary: { backgroundColor: '#4a6fdc', paddingHorizontal: 12, paddingVertical: 8, borderRadius: 6, alignItems: 'center' },
  btnPrimaryText: { color: '#fff', fontSize: 14, fontWeight: '700' },
  btnSecondary: { backgroundColor: '#e0e0e0', paddingHorizontal: 12, paddingVertical: 8, borderRadius: 6, alignItems: 'center' },
  btnSecondaryText: { color: '#333', fontSize: 14, fontWeight: '700' },
  btnSuccess: { backgroundColor: '#51cf66', paddingHorizontal: 12, paddingVertical: 8, borderRadius: 6, alignItems: 'center' },
  btnSuccessText: { color: '#fff', fontSize: 14, fontWeight: '700' },

  // Toast
  toastBackdrop: { flex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor: 'rgba(0,0,0,0.4)' },
  toast: { backgroundColor: 'rgba(0,0,0,0.8)', borderRadius: 6, paddingHorizontal: 16, paddingVertical: 10 },
  toastText: { color: '#fff' },
};