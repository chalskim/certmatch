import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  headerBar: {
    flexDirection: 'row', alignItems: 'center', gap: 10,
    paddingHorizontal: 16, paddingVertical: 12, backgroundColor: '#fff', borderBottomWidth: 1, borderBottomColor: '#eee',
  },
  headerTitle: { fontSize: 16, fontWeight: '700', color: '#333' },
  searchBar: { flexDirection: 'row', alignItems: 'center', gap: 8, backgroundColor: '#f1f3f5', paddingHorizontal: 10, paddingVertical: 6, borderRadius: 8 },
  searchInput: { minWidth: 160 },

  tabHeader: { backgroundColor: '#fff', borderBottomWidth: 1, borderBottomColor: '#eee' },
  tabItem: { paddingHorizontal: 12, paddingVertical: 12 },
  tabItemActive: { borderBottomWidth: 2, borderBottomColor: '#4a6bdf' },
  tabText: { fontSize: 14, color: '#666' },
  tabTextActive: { color: '#4a6bdf', fontWeight: '600' },

  sectionHeader: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginBottom: 12 },
  sectionTitle: { fontSize: 18, fontWeight: '700', color: '#333' },

  metricsGrid: { flexDirection: 'row', flexWrap: 'wrap', gap: 12 },
  metricCard: { flexDirection: 'row', alignItems: 'center', gap: 12, backgroundColor: '#fff', padding: 12, borderRadius: 10, flexBasis: '48%' },
  metricIcon: { width: 36, height: 36, borderRadius: 18, alignItems: 'center', justifyContent: 'center', backgroundColor: '#4a6bdf' },
  metricLabel: { fontSize: 13, color: '#555' },
  metricValue: { fontSize: 18, fontWeight: '700', color: '#222' },
  metricChange: { fontSize: 12, color: '#2e7d32' },

  chartRow: { flexDirection: 'row', gap: 12, marginTop: 16 },
  chartCard: { flex: 1, backgroundColor: '#fff', borderRadius: 10, padding: 12 },
  chartTitle: { fontSize: 14, fontWeight: '600', color: '#333', marginBottom: 8 },
  chartPlaceholder: { height: 140, borderWidth: 1, borderColor: '#eee', borderStyle: 'dashed', borderRadius: 8, alignItems: 'center', justifyContent: 'center', backgroundColor: '#fafafa' },

  listItem: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#fff', borderRadius: 10, padding: 12, marginBottom: 8 },
  listMain: { flex: 1 },
  listTitle: { fontSize: 16, fontWeight: '600', color: '#333' },
  listSubtitle: { fontSize: 12, color: '#666', marginTop: 2 },
  statusBadge: { paddingHorizontal: 8, paddingVertical: 4, borderRadius: 10, marginRight: 8 },
  listActions: { flexDirection: 'row', alignItems: 'center' },
  actionBtn: { flexDirection: 'row', alignItems: 'center', gap: 6, paddingHorizontal: 8, paddingVertical: 6, borderRadius: 6, backgroundColor: '#eef2ff', marginLeft: 6 },
  actionText: { fontSize: 12, color: '#4a6bdf', fontWeight: '600' },

  cardGrid: { flexDirection: 'row', flexWrap: 'wrap', gap: 12 },
  card: { flexBasis: '48%', backgroundColor: '#fff', borderRadius: 10, padding: 12 },
  cardTitle: { fontSize: 16, fontWeight: '700', color: '#333' },
  cardDesc: { fontSize: 12, color: '#666', marginTop: 4 },

  primaryBtn: { flexDirection: 'row', alignItems: 'center', gap: 6, backgroundColor: '#4a6bdf', paddingHorizontal: 10, paddingVertical: 8, borderRadius: 8 },
  primaryBtnText: { color: '#fff', fontSize: 13, fontWeight: '600' },
});

export { styles };