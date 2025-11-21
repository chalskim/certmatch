import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  toolbar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  searchBox: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#e0e0e0',
    borderRadius: 8,
    paddingHorizontal: 10,
    paddingVertical: 8,
    marginRight: 8,
    backgroundColor: '#fafafa',
  },
  toolbarBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 6,
    marginLeft: 8,
  },
  toolbarBtnText: { color: '#fff', marginLeft: 6, fontWeight: '600' },
  toolbarBtnPrimary: { backgroundColor: '#4a6bdf' },
  toolbarBtnDanger: { backgroundColor: '#e53935' },

  filterRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
    marginBottom: 8,
  },
  chip: {
    borderWidth: 1,
    borderColor: '#4a6bdf',
    borderRadius: 18,
    paddingHorizontal: 12,
    paddingVertical: 6,
  },
  chipActive: { backgroundColor: '#4a6bdf' },
  chipText: { color: '#4a6bdf' },

  card: {
    borderWidth: 1,
    borderColor: '#e0e0e0',
    borderRadius: 10,
    padding: 12,
    marginBottom: 10,
    backgroundColor: '#fff',
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 2 },
    elevation: 2,
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 6,
  },
  cardTitle: { fontSize: 16, fontWeight: '700', color: '#333' },
  cardDate: { color: '#666' },
  cardMessage: { color: '#444', marginTop: 2 },
  cardActions: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    gap: 8,
    marginTop: 10,
  },
  btn: {
    paddingHorizontal: 10,
    paddingVertical: 8,
    borderRadius: 6,
  },
  btnText: { fontWeight: '600' },
  btnPrimary: { backgroundColor: '#4a6bdf' },
  btnPrimaryText: { color: '#fff' },
  btnSecondary: { backgroundColor: '#e0e7ff' },
  btnSecondaryText: { color: '#2b4fd4' },
  btnDanger: { backgroundColor: '#fdecea' },
  btnDangerText: { color: '#e53935' },

  empty: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 40,
  },
});

export { styles };