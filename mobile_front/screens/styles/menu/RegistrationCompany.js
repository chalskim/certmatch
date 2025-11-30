import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f9fa',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 15,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  backButton: {
    padding: 10,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#0066CC',
  },
  progressContainer: {
    padding: 20,
    backgroundColor: '#0066CC',
  },
  progressBackground: {
    height: 2,
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
    marginBottom: 20,
  },
  progressFill: {
    height: '100%',
    backgroundColor: '#2EBD59',
  },
  progressSteps: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  progressStep: {
    alignItems: 'center',
  },
  stepCircle: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10,
  },
  stepCircleActive: {
    backgroundColor: '#fff',
  },
  stepText: {
    fontWeight: '600',
    color: '#0066CC',
  },
  stepLabel: {
    fontSize: 12,
    color: 'rgba(255, 255, 255, 0.8)',
    textAlign: 'center',
  },
  formContainer: {
    backgroundColor: '#fff',
    margin: 15,
    borderRadius: 12,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 2,
  },
  formHeader: {
    alignItems: 'center',
    marginBottom: 30,
  },
  formTitle: {
    fontSize: 24,
    fontWeight: '600',
    marginBottom: 10,
    color: '#333',
  },
  formSubtitle: {
    color: '#666',
    fontSize: 14,
  },
  profileCompletion: {
    flexDirection: 'row',
    backgroundColor: 'rgba(0, 102, 204, 0.05)',
    borderRadius: 12,
    padding: 15,
    marginBottom: 20,
    alignItems: 'center',
  },
  completionText: {
    flex: 1,
  },
  completionTitle: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 5,
  },
  completionTitleText: {
    fontWeight: '600',
    marginLeft: 8,
    color: '#333',
  },
  completionBar: {
    height: 8,
    backgroundColor: '#F5F5F5',
    borderRadius: 4,
    overflow: 'hidden',
  },
  completionFill: {
    height: '100%',
    backgroundColor: '#0066CC',
  },
  completionPercentage: {
    fontSize: 20,
    fontWeight: '700',
    color: '#0066CC',
    marginLeft: 15,
  },
  formSection: {
    marginBottom: 30,
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
    paddingBottom: 10,
    borderBottomWidth: 2,
    borderBottomColor: '#eee',
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginLeft: 10,
    color: '#333',
  },
  formGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  formGroup: {
    width: '48%',
    marginBottom: 20,
  },
  fullWidth: {
    width: '100%',
  },
  label: {
    fontWeight: '500',
    marginBottom: 8,
    color: '#333',
  },
  required: {
    color: '#E74C3C',
  },
  input: {
    borderWidth: 1,
    borderColor: '#E0E0E0',
    borderRadius: 8,
    padding: 12,
    fontSize: 14,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  textArea: {
    height: 100,
    textAlignVertical: 'top',
  },
  inputGroup: {
    flexDirection: 'row',
    gap: 10,
  },
  marginTop: {
    marginTop: 10,
  },
  helpText: {
    fontSize: 12,
    color: '#666',
    marginTop: 5,
  },
  infoCard: {
    backgroundColor: 'rgba(0, 102, 204, 0.05)',
    borderLeftWidth: 4,
    borderLeftColor: '#0066CC',
    padding: 15,
    borderRadius: 0,
    marginBottom: 20,
  },
  infoCardTitle: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 5,
  },
  infoCardTitleText: {
    fontWeight: '600',
    marginLeft: 8,
    color: '#333',
  },
  infoCardContent: {
    fontSize: 14,
    color: '#666',
  },
  fileUpload: {
    borderWidth: 2,
    borderColor: '#E0E0E0',
    borderStyle: 'dashed',
    borderRadius: 8,
    padding: 30,
    alignItems: 'center',
    marginBottom: 10,
  },
  fileUploadText: {
    color: '#666',
    marginVertical: 10,
  },
  fileUploadButton: {
    backgroundColor: '#0066CC',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 6,
  },
  fileUploadButtonText: {
    color: '#fff',
    fontWeight: '500',
  },
  checkboxGroup: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 20,
  },
  checkboxItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  checkboxLabel: {
    fontSize: 14,
    color: '#333',
  },
  formActions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 30,
    paddingTop: 20,
    borderTopWidth: 1,
    borderTopColor: '#eee',
  },
  secondaryButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F5F5F5',
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 8,
  },
  secondaryButtonText: {
    fontWeight: '500',
    color: '#333',
    marginHorizontal: 8,
  },
  buttonGroup: {
    flexDirection: 'row',
    gap: 10,
  },
  primaryButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#0066CC',
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 8,
  },
  primaryButtonText: {
    fontWeight: '500',
    color: '#fff',
    marginLeft: 8,
  },
  dropdownOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  dropdownContainer: {
    backgroundColor: '#fff',
    borderRadius: 8,
    maxHeight: 200,
    width: '80%',
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  dropdownItem: {
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  dropdownItemSelected: {
    backgroundColor: '#0066CC',
  },
  dropdownItemText: {
    fontSize: 16,
    color: '#333',
  },
  dropdownItemTextSelected: {
    color: '#fff',
  },
  dropdownText: {
    fontSize: 14,
    color: '#333',
  },
  dropdownPlaceholder: {
    fontSize: 14,
    color: '#999',
  },

// 산업분야 섹션 스타일
interestContainer: {
  flexDirection: 'row',
  flexWrap: 'wrap',
  justifyContent: 'space-between',
  marginTop: 6,
  marginBottom: 10,
},

interestTag: {
  width: '32%',
  backgroundColor: '#f8f9fa',
  borderRadius: 10,
  padding: 10,
  marginBottom: 8,
  borderWidth: 1,
  borderColor: '#e9ecef',
  flexDirection: 'row',
  alignItems: 'center',
  justifyContent: 'space-between',
  shadowColor: '#000',
  shadowOffset: { width: 0, height: 1 },
  shadowOpacity: 0.05,
  shadowRadius: 2,
  elevation: 2,
},

interestTagSelected: {
  backgroundColor: '#0066CC',
  borderColor: '#0066CC',
  shadowColor: '#0066CC',
  shadowOffset: { width: 0, height: 2 },
  shadowOpacity: 0.2,
  shadowRadius: 3,
  elevation: 3,
},

interestTagContent: {
  flexDirection: 'row',
  alignItems: 'center',
  flex: 1,
},

interestTagText: {
  fontSize: 12,
  fontWeight: '500',
  color: '#333',
  marginLeft: 6,
},

interestTagTextSelected: {
  color: '#fff',
  fontWeight: '600',
},

// 선택된 산업분야 표시
selectedInterests: {
  marginTop: 5,
  paddingTop: 15,
  borderTopWidth: 1,
  borderTopColor: '#e9ecef',
},

selectedInterestsLabel: {
  fontSize: 13,
  fontWeight: '600',
  color: '#333',
  marginBottom: 10,
},

selectedInterestsContainer: {
  flexDirection: 'row',
  flexWrap: 'wrap',
},

selectedInterestChip: {
  flexDirection: 'row',
  alignItems: 'center',
  backgroundColor: '#0066CC',
  borderRadius: 16,
  paddingHorizontal: 10,
  paddingVertical: 5,
  marginRight: 8,
  marginBottom: 8,
},

selectedInterestText: {
  fontSize: 11,
  color: '#fff',
  marginRight: 6,
},

removeInterestButton: {
  padding: 2,
},

// 인증 정보 항목 스타일
certItemContainer: {
  width: '100%',
  borderWidth: 1,
  borderColor: '#eee',
  borderRadius: 8,
  padding: 12,
  marginBottom: 16,
  backgroundColor: '#fff',
  shadowColor: '#000',
  shadowOffset: { width: 0, height: 2 },
  shadowOpacity: 0.05,
  shadowRadius: 4,
  elevation: 2,
},
certItemHeader: {
  flexDirection: 'row',
  alignItems: 'center',
  justifyContent: 'space-between',
  marginBottom: 8,
},
removeCertButton: {
  flexDirection: 'row',
  alignItems: 'center',
},
fileList: {
  marginTop: 8,
},
fileItem: {
  flexDirection: 'row',
  alignItems: 'center',
  justifyContent: 'space-between',
  backgroundColor: '#f5f7fa',
  borderRadius: 6,
  paddingVertical: 6,
  paddingHorizontal: 10,
  marginBottom: 6,
},
fileName: {
  fontSize: 12,
  color: '#333',
},
fileRemove: {
  fontSize: 12,
  color: 'red',
},
});
