
import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#f8f9fa'
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#e9ecef'
  },
  backButton: {
    padding: 8
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#333'
  },
  headerIcons: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  iconButton: {
    padding: 8,
    marginLeft: 8,
    position: 'relative'
  },
  badge: {
    position: 'absolute',
    top: 4,
    right: 4,
    backgroundColor: '#e74c3c',
    borderRadius: 10,
    minWidth: 18,
    height: 18,
    alignItems: 'center',
    justifyContent: 'center'
  },
  badgeText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: '600'
  },
  container: {
    flex: 1,
    padding: 16
  },
  section: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: '#333',
    marginLeft: 8
  },
  listItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 12,
    padding: 12,
    backgroundColor: '#f9f9f9',
    borderRadius: 8
  },
  input: {
    flex: 1,
    minWidth: 120,
    padding: 8,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 6,
    fontSize: 14,
    height: 40
  },
  dateInputContainer: {
    flex: 1,
    position: 'relative'
  },
  dateLabel: {
    position: 'absolute',
    top: -20,
    left: 0,
    fontSize: 12,
    color: '#666',
    backgroundColor: '#fff',
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 3,
    zIndex: 1
  },
  fileUploadBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#4a6fdc',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 6,
    gap: 4
  },
  fileUploadText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: '500'
  },
  removeBtn: {
    padding: 4
  },
  addButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#4a6fdc',
    padding: 12,
    borderRadius: 8,
    gap: 8,
    marginTop: 8
  },
  addButtonText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '600'
  },
  fileUploadSection: {
    marginTop: 12,
    padding: 16,
    backgroundColor: '#f8f9fa',
    borderRadius: 8,
    borderWidth: 2,
    borderStyle: 'dashed',
    borderColor: '#ddd'
  },
  fileUploadLabel: {
    fontSize: 14,
    fontWeight: '600',
    color: '#333',
    marginBottom: 12
  },
  fileInfo: {
    fontSize: 12,
    color: '#666',
    marginTop: 12,
    lineHeight: 18
  },
  multiSelectContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
    marginTop: 8
  },
  selectTag: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 20,
    backgroundColor: '#fff'
  },
  selectTagSelected: {
    backgroundColor: '#4a6fdc',
    borderColor: '#4a6fdc'
  },
  selectTagText: {
    fontSize: 14,
    color: '#333'
  },
  selectTagTextSelected: {
    color: '#fff'
  },
  feeTypes: {
    flexDirection: 'row',
    gap: 8,
    marginBottom: 16
  },
  feeType: {
    flex: 1,
    padding: 12,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    alignItems: 'center'
  },
  feeTypeSelected: {
    backgroundColor: '#e8f0fe',
    borderColor: '#4a6fdc'
  },
  feeTypeText: {
    fontSize: 14,
    color: '#333'
  },
  feeTypeTextSelected: {
    color: '#4a6fdc',
    fontWeight: '600'
  },
  feeInputs: {
    flexDirection: 'row',
    gap: 12
  },
  inputGroup: {
    flex: 1
  },
  inputLabel: {
    fontSize: 14,
    fontWeight: '500',
    color: '#555',
    marginBottom: 4
  },
  formActions: {
    flexDirection: 'row',
    gap: 12,
    marginTop: 24,
    marginBottom: 32
  },
  primaryButton: {
    flex: 1,
    backgroundColor: '#4a6fdc',
    padding: 16,
    borderRadius: 8,
    alignItems: 'center'
  },
  primaryButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600'
  },
  secondaryButton: {
    flex: 1,
    backgroundColor: '#f1f1f1',
    padding: 16,
    borderRadius: 8,
    alignItems: 'center'
  },
  secondaryButtonText: {
    color: '#333',
    fontSize: 16,
    fontWeight: '600'
  }
});
