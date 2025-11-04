import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  menu: {
    width: 280,
    height: '100%',
    backgroundColor: '#fff',
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 10,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#0066CC',
    gap: 15,
  },
  unlicenseIcon: {
    width: 24,
    height: 24,
    marginRight: 10,
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fff',
  },
  userInfo: {},
  userName: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 5,
  },
  userCompany: {
    color: '#e6f0ff',
    fontSize: 12,
  },
  userTypeBadge: {
    backgroundColor: '#fff',
    borderRadius: 10,
    paddingHorizontal: 8,
    paddingVertical: 2,
    marginLeft: 8,
  },
  userTypeText: {
    color: '#0066CC',
    fontSize: 10,
    fontWeight: '600',
  },
  profileMessage: {
    color: '#ffcc00',
    fontSize: 11,
    fontStyle: 'italic',
    marginTop: 3,
  },
  content: {
    paddingHorizontal: 0,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    paddingHorizontal: 20,
  },
  menuLabel: {
    marginLeft: 12,
    fontSize: 14,
    color: '#333',
  },
  divider: {
    height: 1,
    backgroundColor: '#eee',
    marginVertical: 8,
  },
});