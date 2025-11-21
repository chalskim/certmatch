import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  tabHeader: {
    flexDirection: 'row',
    backgroundColor: '#f5f7fa',
    borderBottomWidth: 1,
    borderBottomColor: '#e0e6ed',
  },
  tabItem: { flex: 1, paddingVertical: 12, alignItems: 'center' },
  tabText: { fontSize: 14, fontWeight: '600', color: '#333' },
  tabUnderline: { height: 3, marginTop: 4, width: '100%', backgroundColor: 'transparent' },

  statsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
    marginBottom: 16,
  },
  statCard: {
    width: '48%',
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 14,
    shadowColor: '#000',
    shadowOpacity: 0.08,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 2 },
    elevation: 2,
    alignItems: 'center',
  },
  statNumber: { fontSize: 22, fontWeight: '800', color: '#4a6bdf' },
  statLabel: { fontSize: 12, color: '#666', marginTop: 6 },

  searchSection: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 12,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOpacity: 0.08,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 2 },
  },
  searchHeader: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' },
  searchTitle: { fontSize: 15, fontWeight: '700', color: '#333' },
  searchContent: { marginTop: 10 },
  searchGrid: { flexDirection: 'row', flexWrap: 'wrap', gap: 12 },

  formGroup: { width: '48%' },
  formLabel: { fontSize: 13, fontWeight: '600', marginBottom: 6, color: '#333' },
  input: { borderWidth: 1, borderColor: '#ddd', borderRadius: 6, paddingHorizontal: 10, height: 40, fontSize: 14 },

  searchActions: { flexDirection: 'row', justifyContent: 'flex-end', gap: 8, marginTop: 10 },
  searchButton: { backgroundColor: '#4a6bdf', borderRadius: 6, paddingVertical: 8, paddingHorizontal: 14, flexDirection: 'row', alignItems: 'center', gap: 6 },
  searchText: { color: '#fff', fontSize: 14, fontWeight: '600' },
  resetButton: { backgroundColor: '#e0e6ed', borderRadius: 6, paddingVertical: 8, paddingHorizontal: 14, flexDirection: 'row', alignItems: 'center', gap: 6 },
  resetText: { color: '#333', fontSize: 14, fontWeight: '600' },

  searchResults: { marginTop: 10, padding: 10, backgroundColor: '#f5f7fa', borderRadius: 6, alignItems: 'center' },

  chip: { backgroundColor: '#f0f2f5', paddingVertical: 6, paddingHorizontal: 12, borderRadius: 15, marginRight: 10 },
  chipActive: { backgroundColor: '#4a6bdf' },
  chipText: { fontSize: 13, color: '#333' },

  sectionHeader: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginBottom: 8 },
  sectionTitle: { fontSize: 16, fontWeight: '800', color: '#333' },
  addButton: { backgroundColor: '#4a6bdf', borderRadius: 20, paddingVertical: 8, paddingHorizontal: 12, flexDirection: 'row', alignItems: 'center', gap: 8 },

  listContainer: { flexDirection: 'column', gap: 12 },
  card: { backgroundColor: '#fff', borderRadius: 10, padding: 14, shadowColor: '#000', shadowOpacity: 0.08, shadowRadius: 6, shadowOffset: { width: 0, height: 2 } },
  cardHeader: { flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: 8 },
  cardTitle: { fontSize: 15, fontWeight: '800', color: '#333', flex: 1, paddingRight: 8 },
  statusBadge: { paddingHorizontal: 8, paddingVertical: 4, borderRadius: 10 },
  cardDetails: { fontSize: 14, color: '#666', marginBottom: 6 },
  cardFooter: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' },
  cardDate: { fontSize: 13, color: '#888' },
  actions: { flexDirection: 'row', gap: 10 },
  actionBtn: { flexDirection: 'row', alignItems: 'center', gap: 6 },
  actionText: { fontSize: 14, color: '#4a6bdf' },

  modalOverlay: { flex: 1, backgroundColor: 'rgba(0,0,0,0.5)', alignItems: 'center', justifyContent: 'center' },
  modalContent: { backgroundColor: '#fff', borderRadius: 10, width: '90%', maxWidth: 500, maxHeight: '80%', padding: 16 },
  modalHeader: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginBottom: 12 },
  modalTitle: { fontSize: 18, fontWeight: '800', color: '#333' },
  formActions: { flexDirection: 'row', justifyContent: 'flex-end', gap: 10, marginTop: 12 },
  btnPrimary: { backgroundColor: '#4a6bdf', borderRadius: 6, paddingVertical: 10, paddingHorizontal: 14 },
  btnPrimaryText: { color: '#fff', fontSize: 14, fontWeight: '700' },
  btnSecondary: { backgroundColor: '#e0e6ed', borderRadius: 6, paddingVertical: 10, paddingHorizontal: 14 },
  btnSecondaryText: { color: '#333', fontSize: 14, fontWeight: '700' },

  toast: { position: 'absolute', bottom: 20, left: 0, right: 0, alignItems: 'center' },
});

export default styles;
