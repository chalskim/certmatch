
import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f9fa',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 15,
    backgroundColor: 'white',
    borderBottomWidth: 1,
    borderBottomColor: '#e9ecef',
  },
  backButton: {
    padding: 5,
  },
  pageTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  headerIcons: {
    flexDirection: 'row',
  },
  headerIcon: {
    padding: 5,
    marginLeft: 10,
  },
  tabNav: {
    flexDirection: 'row',
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 5,
    margin: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 2,
  },
  tabButton: {
    flex: 1,
    padding: 12,
    borderRadius: 7,
    alignItems: 'center',
  },
  tabButtonActive: {
    backgroundColor: '#4a6fdc',
  },
  tabButtonText: {
    fontSize: 14,
    color: '#666',
    fontWeight: '500',
  },
  tabButtonTextActive: {
    color: 'white',
  },
  content: {
    flex: 1,
    padding: 15,
  },
  tabContent: {
    flex: 1,
  },
  searchSection: {
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 20,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 2,
  },
  searchTitle: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginLeft: 10,
  },
  searchForm: {
    gap: 15,
  },
  searchInputGroup: {
    position: 'relative',
  },
  searchInput: {
    width: '100%',
    padding: 12,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    fontSize: 14,
  },
  searchIcon: {
    position: 'absolute',
    right: 15,
    top: '50%',
    transform: [{ translateY: -8 }],
  },
  filterGroup: {
    marginBottom: 15,
  },
  filterLabel: {
    fontWeight: '500',
    color: '#555',
    marginBottom: 8,
  },
  filterTags: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
  },
  filterTag: {
    padding: 8,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 20,
    backgroundColor: 'white',
  },
  filterTagSelected: {
    backgroundColor: '#4a6fdc',
    borderColor: '#4a6fdc',
  },
  filterTagText: {
    fontSize: 14,
    color: '#333',
  },
  filterTagTextSelected: {
    color: 'white',
  },
  filterInput: {
    padding: 10,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 5,
    fontSize: 14,
  },
  section: {
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 20,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 2,
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
  },
  auditCard: {
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 15,
    marginBottom: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 2,
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 10,
  },
  cardTitleContainer: {
    flex: 1,
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
  cardCompany: {
    fontSize: 14,
    color: '#666',
    marginTop: 3,
  },
  cardStatus: {
    padding: 5,
    borderRadius: 15,
    minWidth: 60,
    alignItems: 'center',
  },
  statusrequested: { backgroundColor: '#e2e3e5' },
  statusscheduled: { backgroundColor: '#cce5ff' },
  statusinprogress: { backgroundColor: '#fff3cd' },
  statusreporting: { backgroundColor: '#d1ecf1' },
  statuscompleted: { backgroundColor: '#d4edda' },
  statusrecruiting: { backgroundColor: '#cce5ff' },
  statusclosed: { backgroundColor: '#e2e3e5' },
  statusapplied: { backgroundColor: '#e2e3e5' },
  statusaccepted: { backgroundColor: '#d4edda' },
  statusrejected: { backgroundColor: '#f8d7da' },
  statusText: {
    fontSize: 12,
    fontWeight: '500',
  },
  cardMeta: {
    flexDirection: 'row',
    gap: 15,
    marginVertical: 8,
  },
  metaItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
  },
  metaText: {
    fontSize: 12,
    color: '#666',
  },
  emptyState: {
    alignItems: 'center',
    padding: 40,
  },
  emptyStateText: {
    marginTop: 10,
    color: '#999',
    fontSize: 16,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'flex-end',
  },
  modalContent: {
    backgroundColor: 'white',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    maxHeight: '80%',
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#e9ecef',
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  modalClose: {
    padding: 5,
  },
  modalBody: {
    padding: 20,
  },
  detailSection: {
    marginBottom: 20,
  },
  detailTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 5,
    color: '#333',
  },
  detailCompany: {
    fontSize: 16,
    color: '#666',
    marginBottom: 15,
  },
  detailMeta: {
    flexDirection: 'row',
    gap: 15,
    marginBottom: 15,
    flexWrap: 'wrap',
  },
  detailInfo: {
    marginBottom: 15,
  },
  detailLabel: {
    fontWeight: '500',
    color: '#555',
    marginBottom: 5,
  },
  detailValue: {
    color: '#333',
    lineHeight: 20,
  },
  requirementItem: {
    color: '#333',
    marginBottom: 3,
    lineHeight: 20,
  },
  applyButton: {
    backgroundColor: '#4a6fdc',
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 20,
  },
  applyButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default styles;
