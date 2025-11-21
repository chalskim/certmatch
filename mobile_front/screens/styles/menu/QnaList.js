
import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f9fa',
  },
  appHeader: {
    height: 56,
    backgroundColor: '#4a6fdc',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
  },
  headerIcon: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: 'rgba(255,255,255,0.15)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerIconText: {
    color: '#fff',
    fontSize: 16,
  },
  headerIcons: {
    flexDirection: 'row',
    gap: 8,
  },
  appTitle: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '700',
  },
  content: {
    padding: 16,
    paddingBottom: 32,
  },
  qaTypeToggle: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 4,
    elevation: 2,
  },
  qaTypeBtn: {
    flex: 1,
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  qaTypeBtnActive: {
    backgroundColor: '#4a6fdc',
  },
  qaTypeText: {
    color: '#666',
    fontWeight: '600',
  },
  qaTypeTextActive: {
    color: '#fff',
  },
  sortTabs: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 3,
    marginTop: 16,
  },
  sortTab: {
    flex: 1,
    paddingVertical: 10,
    borderRadius: 7,
    alignItems: 'center',
  },
  sortTabActive: {
    backgroundColor: 'rgba(74, 111, 220, 0.08)',
  },
  sortTabText: {
    color: '#666',
    fontWeight: '600',
  },
  sortTabTextActive: {
    color: '#4a6fdc',
  },
  section: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 16,
    marginTop: 16,
    elevation: 1,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '700',
    marginBottom: 12,
    color: '#333',
  },
  qaItem: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 14,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#eee',
  },
  qaItemHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 6,
  },
  qaCategory: {
    backgroundColor: '#e8f0fe',
    color: '#4a6fdc',
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 10,
    fontSize: 12,
    fontWeight: '500',
  },
  qaStats: {
    flexDirection: 'row',
    gap: 12,
  },
  qaStat: {
    fontSize: 12,
    color: '#999',
  },
  qaTitle: {
    fontSize: 16,
    fontWeight: '700',
    marginBottom: 6,
    color: '#333',
  },
  qaContent: {
    fontSize: 14,
    color: '#555',
    marginBottom: 8,
  },
  qaMeta: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  qaAuthor: {
    fontSize: 13,
    color: '#888',
  },
  qaActions: {
    flexDirection: 'row',
    gap: 10,
  },
  actionBtn: {
    color: '#888',
    fontSize: 14,
  },
  likeBtn: {
    color: '#e74c3c',
  },
  bookmarkedBtn: {
    color: '#f39c12',
  },
  privateItem: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 14,
    marginBottom: 12,
    borderLeftWidth: 4,
    borderLeftColor: '#9c27b0',
    borderWidth: 1,
    borderColor: '#eee',
  },
  privateItemPending: {
    borderLeftColor: '#856404',
  },
  privateHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 6,
  },
  privateBadge: {
    backgroundColor: '#9c27b0',
    color: 'white',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
    fontSize: 12,
    fontWeight: '500',
  },
  privateStatus: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
    fontSize: 11,
    fontWeight: '500',
  },
  statusAnswered: {
    backgroundColor: '#d4edda',
    color: '#155724',
  },
  statusPending: {
    backgroundColor: '#fff3cd',
    color: '#856404',
  },
  privateTitle: {
    fontSize: 15,
    fontWeight: '700',
    color: '#333',
    marginBottom: 6,
  },
  privateFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 6,
  },
  expertInfo: {
    fontSize: 13,
    color: '#666',
  },
  privateDate: {
    fontSize: 12,
    color: '#999',
  },
  privatePreview: {
    fontSize: 14,
    color: '#555',
  },
  detailHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  backBtn: {
    color: '#4a6fdc',
    fontSize: 14,
    fontWeight: '600',
  },
  detailTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: '#333',
  },
  detailQuestionTitle: {
    fontSize: 18,
    fontWeight: '700',
    marginBottom: 8,
    color: '#333',
  },
  detailQuestionBody: {
    fontSize: 15,
    lineHeight: 22,
    color: '#333',
    marginBottom: 10,
  },
  detailFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  detailMeta: {
    fontSize: 12,
    color: '#888',
  },
});
