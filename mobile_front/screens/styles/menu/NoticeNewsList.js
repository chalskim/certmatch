import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f8f9fa' },
  toolbar: { paddingHorizontal: 16, paddingVertical: 12, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  tabs: { flexDirection: 'row', gap: 8 },
  tabBtn: { paddingHorizontal: 12, paddingVertical: 8, borderRadius: 8, borderWidth: 1, borderColor: '#dee2e6', backgroundColor: '#f8f9fa' },
  tabBtnActive: { backgroundColor: '#4a6fdc', borderColor: '#4a6fdc' },
  tabText: { fontSize: 13, color: '#495057' },
  tabTextActive: { color: '#fff', fontWeight: '700' },
  addBtn: { backgroundColor: '#007bff', paddingHorizontal: 14, paddingVertical: 10, borderRadius: 8 },
  addBtnText: { color: '#fff', fontWeight: '600' },
  listContent: { padding: 16 },

  card: { backgroundColor: '#fff', borderRadius: 12, padding: 14, borderWidth: 1, borderColor: '#e9ecef' },
  cardHeader: { flexDirection: 'row', alignItems: 'center', marginBottom: 8 },
  cardIcon: { fontSize: 20, marginRight: 8 },
  cardTitle: { fontSize: 16, fontWeight: '700', color: '#212529', flex: 1 },
  metaRow: { flexDirection: 'row', flexWrap: 'wrap', alignItems: 'center', marginBottom: 8 },
  metaText: { fontSize: 12, color: '#495057' },
  metaDivider: { marginHorizontal: 6, color: '#ced4da' },
  chipRow: { flexDirection: 'row', flexWrap: 'wrap', gap: 8, marginBottom: 10 },
  chip: { backgroundColor: '#f1f3f5', borderRadius: 16, paddingHorizontal: 10, paddingVertical: 6, marginRight: 6, marginBottom: 6 },
  chipPrimary: { backgroundColor: '#e7f1ff' },
  chipText: { fontSize: 12, color: '#343a40' },
  actionsRow: { flexDirection: 'row', gap: 10 },
  actionBtn: { flexDirection: 'row', alignItems: 'center', gap: 6, paddingHorizontal: 12, paddingVertical: 8, borderRadius: 8 },
  editBtn: { backgroundColor: '#20c997' },
  deleteBtn: { backgroundColor: '#ff6b6b' },
  actionText: { color: '#fff', fontSize: 12, fontWeight: '600' },
});

export { styles };