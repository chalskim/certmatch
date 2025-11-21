import { StyleSheet, Dimensions } from 'react-native';

const { width } = Dimensions.get('window');

export const scheduleManagerStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f9fa',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: 'white',
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  headerIcon: {
    padding: 8,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  headerIcons: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  notificationBadge: {
    position: 'absolute',
    top: 6,
    right: 6,
    backgroundColor: '#ff4757',
    borderRadius: 8,
    minWidth: 16,
    height: 16,
    alignItems: 'center',
    justifyContent: 'center',
  },
  notificationBadgeText: {
    color: 'white',
    fontSize: 10,
    fontWeight: 'bold',
  },
  viewToggle: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'white',
    margin: 16,
    marginBottom: 8,
    borderRadius: 10,
    padding: 6,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 5,
    elevation: 5,
  },
  viewOption: {
    flex: 1,
    paddingVertical: 10,
    paddingHorizontal: 8,
    alignItems: 'center',
    borderRadius: 6,
    marginRight: 6,
  },
  viewOptionActive: {
    backgroundColor: '#5c7cfa',
  },
  viewOptionText: {
    fontSize: 14,
    color: '#666',
    fontWeight: '500',
  },
  viewOptionTextActive: {
    color: 'white',
  },
  addEventButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#28a745',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 6,
    marginLeft: 'auto',
  },
  addEventButtonText: {
    color: 'white',
    fontSize: 12,
    fontWeight: '500',
    marginLeft: 4,
  },
  content: {
    flex: 1,
    paddingHorizontal: 16,
  },
  calendarContainer: {
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 16,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 5,
    elevation: 5,
  },
  calendarHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  calendarTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  calendarNav: {
    flexDirection: 'row',
    gap: 12,
  },
  weekDays: {
    flexDirection: 'row',
    marginBottom: 8,
  },
  weekDay: {
    flex: 1,
    alignItems: 'center',
    paddingVertical: 10,
  },
  todayColumn: {
    backgroundColor: '#eef7ff',
    borderRadius: 8,
  },
  weekDayText: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#666',
  },
  calendarGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  // 修改 calendarDay 样式，移除 aspectRatio，添加固定高度
  calendarDay: {
    width: (width - 48) / 7,
    height: 100, // 固定高度而不是使用 aspectRatio
    borderWidth: 1,
    borderColor: '#f0f0f0',
    borderRadius: 8,
    padding: 4,
    margin: 1,
  },
  otherMonthDay: {
    opacity: 0.3,
  },
  todayDay: {
    backgroundColor: '#eef7ff',
    borderColor: '#5c7cfa',
    borderWidth: 2,
  },
  dayNumber: {
    fontSize: 14,
    textAlign: 'center',
    marginBottom: 4,
    color: '#333',
  },
  otherMonthText: {
    color: '#ccc',
  },
  todayText: {
    color: '#5c7cfa',
    fontWeight: 'bold',
  },
  // 修改 eventContainer 样式，确保事件在固定高度的日期框中正确显示
  eventContainer: {
    flex: 1,
    justifyContent: 'flex-start',
    overflow: 'hidden', // 添加溢出隐藏
  },
  eventBar: {
    paddingVertical: 2,
    paddingHorizontal: 4,
    borderRadius: 4,
    marginBottom: 2,
  },
  eventBarText: {
    color: 'white',
    fontSize: 9,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  weekGrid: {
    flexDirection: 'row',
  },
  timeColumn: {
    width: 50,
  },
  timeSlotHeader: {
    height: 50,
  },
  timeSlot: {
    height: 60,
    alignItems: 'center',
    justifyContent: 'center',
    borderRightWidth: 1,
    borderRightColor: '#eee',
  },
  timeSlotText: {
    fontSize: 12,
    color: '#666',
  },
  dayColumn: {
    width: (width - 82) / 7,
    minWidth: 60,
  },
  dayHeader: {
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  todayDayHeader: {
    backgroundColor: '#eef7ff',
  },
  dayHeaderText: {
    fontSize: 12,
    color: '#666',
    fontWeight: 'bold',
  },
  todayHeaderText: {
    color: '#5c7cfa',
  },
  weekTimeSlot: {
    height: 60,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
    padding: 2,
  },
  todayTimeSlot: {
    backgroundColor: '#f7faff',
  },
  weekEvent: {
    padding: 4,
    borderRadius: 4,
    marginVertical: 1,
  },
  weekEventText: {
    color: 'white',
    fontSize: 9,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  dayViewHeader: {
    alignItems: 'center',
    padding: 16,
    backgroundColor: '#eef7ff',
    borderRadius: 8,
    marginBottom: 16,
  },
  dayViewTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#5c7cfa',
  },
  dayGrid: {
    flex: 1,
  },
  dayRow: {
    flexDirection: 'row',
    minHeight: 50,
  },
  dayTimeSlot: {
    width: 70,
    alignItems: 'center',
    justifyContent: 'center',
    borderRightWidth: 1,
    borderRightColor: '#eee',
  },
  dayTimeSlotText: {
    fontSize: 12,
    color: '#666',
  },
  dayEventColumn: {
    flex: 1,
    paddingVertical: 4,
  },
  dayEvent: {
    padding: 8,
    marginVertical: 2,
    borderRadius: 4,
    borderLeftWidth: 3,
  },
  dayEventTitle: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 4,
  },
  dayEventTime: {
    fontSize: 12,
    color: '#666',
  },
  eventList: {
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 16,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 5,
    elevation: 5,
  },
  eventListHeader: {
    marginBottom: 16,
  },
  eventListTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  eventItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
  },
  eventSeparator: {
    height: 1,
    backgroundColor: '#eee',
  },
  eventColor: {
    width: 15,
    height: 15,
    borderRadius: 8,
    marginRight: 16,
  },
  eventInfo: {
    flex: 1,
  },
  eventTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 4,
  },
  eventMeta: {
    fontSize: 14,
    color: '#666',
  },
  colorLegend: {
    marginTop: 16,
    paddingTop: 16,
    borderTopWidth: 1,
    borderTopColor: '#eee',
  },
  legendTitle: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#333',
    textAlign: 'center',
    marginBottom: 12,
  },
  legendItems: {
    flexDirection: 'row',
    justifyContent: 'center',
    flexWrap: 'wrap',
  },
  legendItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: 10,
    marginVertical: 4,
  },
  legendColor: {
    width: 12,
    height: 12,
    borderRadius: 6,
    marginRight: 8,
  },
  legendText: {
    fontSize: 13,
    color: '#555',
  },
  settingsSection: {
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 16,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 5,
    elevation: 5,
  },
  settingsTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 16,
  },
  settingItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  settingLabel: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  settingLabelText: {
    fontSize: 16,
    color: '#333',
    marginLeft: 12,
  },
  settingDivider: {
    height: 1,
    backgroundColor: '#eee',
    marginVertical: 8,
  },
  modalContainer: {
    flex: 1,
    backgroundColor: 'white',
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  modalBody: {
    flex: 1,
    paddingHorizontal: 20,
    paddingVertical: 16,
  },
  formGroup: {
    marginBottom: 16,
  },
  formRow: {
    flexDirection: 'row',
    gap: 12,
  },
  formLabel: {
    fontSize: 14,
    color: '#555',
    marginBottom: 6,
  },
  textInput: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 10,
    fontSize: 14,
    backgroundColor: 'white',
  },
  textArea: {
    height: 80,
    textAlignVertical: 'top',
  },
  eventTypeSelector: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  eventTypeOption: {
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 6,
    borderWidth: 1,
    borderColor: '#ddd',
    minWidth: 70,
    alignItems: 'center',
  },
  eventTypeOptionSelected: {
    borderColor: '#333',
  },
  eventTypeOptionText: {
    fontSize: 12,
    color: '#666',
  },
  eventTypeOptionTextSelected: {
    color: 'white',
    fontWeight: 'bold',
  },
  modalFooter: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    gap: 12,
    paddingHorizontal: 20,
    paddingVertical: 16,
    borderTopWidth: 1,
    borderTopColor: '#eee',
  },
  modalButton: {
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 8,
    minWidth: 80,
    alignItems: 'center',
  },
  modalButtonSecondary: {
    backgroundColor: '#eee',
  },
  modalButtonPrimary: {
    backgroundColor: '#5c7cfa',
  },
  modalButtonTextSecondary: {
    color: '#333',
    fontSize: 14,
    fontWeight: '500',
  },
  modalButtonTextPrimary: {
    color: 'white',
    fontSize: 14,
    fontWeight: '500',
  },
  // 添加针对不同屏幕尺寸的样式
  responsiveContainer: {
    // 这个容器可以用于包装日历，以便在不同屏幕尺寸下调整布局
  },
  // 为小屏幕设备添加的样式
  smallScreenCalendarDay: {
    height: 80, // 在小屏幕上使用更小的高度
  },
  // 为大屏幕设备添加的样式
  largeScreenCalendarDay: {
    height: 120, // 在大屏幕上使用更大的高度
  },
});

// Provide a named export alias to align with other style modules
export { scheduleManagerStyles as styles };