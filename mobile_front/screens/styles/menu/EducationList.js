import { StyleSheet } from 'react-native';

export const styles = {
  root: { backgroundColor: '#f8f9fa' },
  header: {
    height: 60,
    backgroundColor: '#4a6fdc',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 5,
    shadowOffset: { width: 0, height: 2 },
  },
  headerIcon: {
    width: 40, height: 40, borderRadius: 20,
    alignItems: 'center', justifyContent: 'center',
  },
  headerTitle: { color: '#fff', fontSize: 18, fontWeight: '700' },

  container: { padding: 16 },

  dashboardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  pageTitle: { fontSize: 22, fontWeight: '800', color: '#333' },
  btnPrimary: {
    backgroundColor: '#4a6fdc',
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12, paddingVertical: 8,
    borderRadius: 6,
  },
  btnPrimaryText: { color: '#fff', fontSize: 14, fontWeight: '700' },

  filterContainer: { flexDirection: 'row', gap: 10 },
  filterBtn: {
    paddingHorizontal: 16, paddingVertical: 8,
    borderWidth: 1, borderColor: '#ddd', backgroundColor: '#fff', borderRadius: 20,
  },
  filterBtnActive: { backgroundColor: '#4a6fdc', borderColor: '#4a6fdc' },
  filterBtnText: { color: '#333', fontSize: 14 },
  filterBtnTextActive: { color: '#fff', fontWeight: '700' },

  cardList: { gap: 12 },
  courseCard: {
    backgroundColor: '#fff', borderRadius: 10, padding: 16,
    shadowColor: '#000', shadowOpacity: 0.05, shadowRadius: 5, shadowOffset: { width: 0, height: 2 },
  },
  cardHeader: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  cardTitle: { fontSize: 18, fontWeight: '700', color: '#333' },
  cardStatus: { paddingHorizontal: 10, paddingVertical: 6, borderRadius: 15 },

  cardMeta: { flexDirection: 'row', alignItems: 'center', flexWrap: 'wrap', gap: 12, marginVertical: 8 },
  cardMetaItem: { flexDirection: 'row', alignItems: 'center' },
  cardMetaText: { fontSize: 14, color: '#666' },

  cardFooter: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginTop: 12, paddingTop: 12, borderTopWidth: 1, borderTopColor: '#eee' },
  cardDate: { fontSize: 12, color: '#999' },
  cardHint: { fontSize: 12, color: '#999' },

  emptyState: { alignItems: 'center', paddingVertical: 40, gap: 10 },
  emptyStateText: { color: '#999', fontSize: 14 },

  toastBackdrop: { flex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor: 'rgba(0,0,0,0.4)' },
  toast: { backgroundColor: 'rgba(0,0,0,0.8)', borderRadius: 6, paddingHorizontal: 16, paddingVertical: 10 },
  toastText: { color: '#fff' },
};