import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  Alert,
  Modal,
  TextInput,
  Switch,
  Dimensions,
  FlatList,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context';
import SubformHeader from '../components/SubformHeader';

const { width } = Dimensions.get('window');

// Types
interface CalendarEvent {
  id: string;
  title: string;
  type: 'audit' | 'education' | 'consulting' | 'deadline';
  startDate: Date;
  endDate?: Date;
  location?: string;
  memo?: string;
}

interface DeadlineEvent {
  id: string;
  title: string;
  type: 'education' | 'recruitment' | 'important';
  date: Date;
  description: string;
}

// 통합 이벤트 타입 (색상/라벨 매핑에 사용)
type EventType = CalendarEvent['type'] | DeadlineEvent['type'];

// Color configuration
const EVENT_COLORS: Record<EventType, string> = {
  audit: '#4c6ef5',
  education: '#28a745',
  consulting: '#ffc107',
  deadline: '#74c0fc',
  recruitment: '#ff6b6b',
  important: '#845ef7',
};

const EVENT_LABELS: Record<EventType, string> = {
  audit: '심사',
  education: '교육',
  consulting: '컨설팅',
  deadline: '마감일정',
  recruitment: '채용',
  important: '중요',
};

// Main Component
const ScheduleManager: React.FC<{ navigation: any }> = ({ navigation }) => {
  // Calendar state
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedView, setSelectedView] = useState<'month' | 'day'>('month');
  const [events, setEvents] = useState<CalendarEvent[]>([
    {
      id: '1',
      title: 'ISMS-P 심사',
      type: 'audit',
      startDate: new Date(2025, 10, 15),
      endDate: new Date(2025, 10, 16),
    },
    {
      id: '2',
      title: 'ISMS-P 교육',
      type: 'education',
      startDate: new Date(2025, 10, 22),
    },
    {
      id: '3',
      title: 'A은행 컨설팅',
      type: 'consulting',
      startDate: new Date(2025, 10, 25),
      endDate: new Date(2025, 10, 26),
    },
    {
      id: '4',
      title: 'ISO 27001 심사',
      type: 'audit',
      startDate: new Date(2025, 10, 28),
      endDate: new Date(2025, 10, 29),
    },
  ]);

  // Mock deadline events
  const [deadlineEvents] = useState<DeadlineEvent[]>([
    {
      id: 'd1',
      title: '정보보호 교육 신청',
      type: 'education',
      date: new Date(2025, 10, 5),
      description: '정보보호 전문가 과정 교육 신청 마감',
    },
    {
      id: 'd2',
      title: '보안관제 채용',
      type: 'recruitment',
      date: new Date(2025, 10, 8),
      description: '보안관제 전문가 채용 공고 마감',
    },
    {
      id: 'd3',
      title: '개인정보보호 교육',
      type: 'education',
      date: new Date(2025, 10, 12),
      description: '개인정보보호 담당자 교육 신청 마감',
    },
  ]);

  // Settings state
  const [settings, setSettings] = useState({
    notifications: true,
    sharing: false,
    googleCalendar: false,
    educationDeadlines: true,
    recruitmentDeadlines: true,
    importantDeadlines: true,
  });

  // Modal state
  const [showAddModal, setShowAddModal] = useState(false);
  const [newEvent, setNewEvent] = useState<Partial<CalendarEvent>>({
    title: '',
    type: 'audit',
    startDate: new Date(),
  });
  // 월 캘린더 그리드 너비 측정 상태 (박스 크기 유동 계산용)
  const [monthGridWidth, setMonthGridWidth] = useState(0);

  // Helper functions
  const getDaysInMonth = (date: Date): Date[] => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const days: Date[] = [];

    // Add previous month's trailing days
    const startDay = firstDay.getDay();
    for (let i = startDay - 1; i >= 0; i--) {
      days.push(new Date(year, month, -i));
    }

    // Add current month's days
    for (let i = 1; i <= lastDay.getDate(); i++) {
      days.push(new Date(year, month, i));
    }

    // Calculate the number of weeks needed (4-6 weeks)
    const totalDays = days.length;
    const weeksNeeded = Math.ceil(totalDays / 7);
    const totalDaysNeeded = weeksNeeded * 7;

    // Add next month's leading days to complete the grid
    const remainingDays = totalDaysNeeded - days.length;
    for (let i = 1; i <= remainingDays; i++) {
      days.push(new Date(year, month + 1, i));
    }

    return days;
  };

  const isToday = (date: Date): boolean => {
    const today = new Date();
    return (
      date.getDate() === today.getDate() &&
      date.getMonth() === today.getMonth() &&
      date.getFullYear() === today.getFullYear()
    );
  };

  const isCurrentMonth = (date: Date): boolean => {
    return date.getMonth() === currentDate.getMonth();
  };

  const getEventsForDate = (date: Date): CalendarEvent[] => {
    return events.filter((event) => {
      const eventDate = new Date(event.startDate);
      const eventEndDate = event.endDate ? new Date(event.endDate) : eventDate;
      return date >= eventDate && date <= eventEndDate;
    });
  };

  const getDeadlinesForDate = (date: Date): DeadlineEvent[] => {
    return deadlineEvents.filter((deadline) => {
      if (!settings[`${deadline.type}Deadlines` as keyof typeof settings]) {
        return false;
      }
      return (
        date.getDate() === deadline.date.getDate() &&
        date.getMonth() === deadline.date.getMonth() &&
        date.getFullYear() === deadline.date.getFullYear()
      );
    });
  };

  // 종일(시간 정보가 없는) 이벤트 여부 판별
  const isAllDayEvent = (event: CalendarEvent): boolean => {
    const startIsMidnight = event.startDate.getHours() === 0 && event.startDate.getMinutes() === 0;
    const endIsMidnight = !event.endDate || (event.endDate.getHours() === 0 && event.endDate.getMinutes() === 0);
    return startIsMidnight && endIsMidnight;
  };

  // 현재 날짜가 속한 달의 몇 번째 주인지 계산 (주 시작: 일요일 기준)
  const getWeekOfMonth = (date: Date): number => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const firstOfMonth = new Date(year, month, 1);
    // 해당 달의 첫 번째 주 시작(일요일)으로 보정
    const firstWeekStart = new Date(firstOfMonth);
    firstWeekStart.setDate(firstOfMonth.getDate() - firstOfMonth.getDay());

    // 현재 주 시작(일요일)으로 보정
    const currentWeekStart = new Date(date);
    currentWeekStart.setDate(date.getDate() - date.getDay());

    const diffDays = Math.floor(
      (currentWeekStart.getTime() - firstWeekStart.getTime()) / (1000 * 60 * 60 * 24)
    );
    const weekIndex = Math.floor(diffDays / 7) + 1;
    return weekIndex;
  };

  const navigateMonth = (direction: number) => {
    const newDate = new Date(currentDate);
    newDate.setMonth(newDate.getMonth() + direction);
    setCurrentDate(newDate);
  };

  const navigateWeek = (direction: number) => {
    const newDate = new Date(currentDate);
    newDate.setDate(newDate.getDate() + (direction * 7));
    setCurrentDate(newDate);
  };

  const navigateDay = (direction: number) => {
    const newDate = new Date(currentDate);
    newDate.setDate(newDate.getDate() + direction);
    setCurrentDate(newDate);
  };

  const handleEventPress = (event: CalendarEvent | DeadlineEvent) => {
    const typeLabel = EVENT_LABELS[event.type] || '일반';
    Alert.alert(`${typeLabel} 일정`, event.title);
  };

  const handleAddEvent = () => {
    if (!newEvent.title) {
      Alert.alert('오류', '일정 제목을 입력해주세요.');
      return;
    }

    const event: CalendarEvent = {
      id: Date.now().toString(),
      title: newEvent.title!,
      type: newEvent.type as CalendarEvent['type'],
      startDate: newEvent.startDate!,
      endDate: newEvent.endDate,
      location: newEvent.location,
      memo: newEvent.memo,
    };

    setEvents([...events, event]);
    setShowAddModal(false);
    setNewEvent({ title: '', type: 'audit', startDate: new Date() });
    Alert.alert('성공', '일정이 추가되었습니다.');
  };

  const updateSetting = (key: keyof typeof settings, value: boolean) => {
    setSettings({ ...settings, [key]: value });
  };

  // Render functions
  const renderMonthView = () => {
    const days = getDaysInMonth(currentDate);
    const weekDays = ['일', '월', '화', '수', '목', '금', '토'];
    // 각 날짜 박스 크기 동적 계산: 7열 유지, margin 1px * 14를 감안하여 폭 계산
    const daySize = monthGridWidth
      ? Math.floor((monthGridWidth - 14) / 7)
      : 45;

    return (
      <View style={styles.calendarContainer}>
        <View style={styles.calendarHeader}>
          <Text style={styles.calendarTitle}>
            {currentDate.getFullYear()}년 {currentDate.getMonth() + 1}월
          </Text>
          <View style={styles.calendarNav}>
            <TouchableOpacity onPress={() => navigateMonth(-1)}>
              <Ionicons name="chevron-back" size={20} color="#5c7cfa" />
            </TouchableOpacity>
            <TouchableOpacity onPress={() => navigateMonth(1)}>
              <Ionicons name="chevron-forward" size={20} color="#5c7cfa" />
            </TouchableOpacity>
            <TouchableOpacity onPress={() => setCurrentDate(new Date())}>
              <Ionicons name="calendar" size={20} color="#5c7cfa" />
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.weekDays}>
          {weekDays.map((day, index) => (
            <View key={index} style={[styles.weekDay, isToday(new Date()) && new Date().getDay() === index && styles.todayColumn]}>
              <Text style={styles.weekDayText}>{day}</Text>
            </View>
          ))}
        </View>

        <View
          style={styles.calendarGrid}
          onLayout={(e) => setMonthGridWidth(e.nativeEvent.layout.width)}
        >
          {days.map((date, index) => {
            const dayEvents = getEventsForDate(date);
            const dayDeadlines = getDeadlinesForDate(date);
            const isCurrentMonthDay = isCurrentMonth(date);
            const isTodayDate = isToday(date);

            return (
              <TouchableOpacity
                key={index}
                style={[
                  styles.calendarDay,
                  { width: daySize },
                  !isCurrentMonthDay && styles.otherMonthDay,
                  isTodayDate && styles.todayDay,
                ]}
                onPress={() => {
                  setCurrentDate(date);
                  setSelectedView('day');
                }}
              >
                <Text style={[
                  styles.dayNumber,
                  !isCurrentMonthDay && styles.otherMonthText,
                  isTodayDate && styles.todayText,
                ]}>
                  {date.getDate()}
                </Text>

                <View style={styles.eventContainer}>
                  {dayEvents.slice(0, 2).map((event, eventIndex) => (
                    <TouchableOpacity
                      key={event.id}
                      style={[
                        styles.eventBar,
                        { backgroundColor: EVENT_COLORS[event.type] },
                      ]}
                      onPress={() => handleEventPress(event)}
                    >
                      <Text style={styles.eventBarText} numberOfLines={1}>
                        {event.title}
                      </Text>
                    </TouchableOpacity>
                  ))}
                  {dayDeadlines.slice(0, 1).map((deadline, deadlineIndex) => (
                    <TouchableOpacity
                      key={deadline.id}
                      style={[
                        styles.eventBar,
                        { backgroundColor: EVENT_COLORS.deadline },
                      ]}
                      onPress={() => handleEventPress(deadline)}
                    >
                      <Text style={styles.eventBarText} numberOfLines={1}>
                        {deadline.title}
                      </Text>
                    </TouchableOpacity>
                  ))}
                </View>
              </TouchableOpacity>
            );
          })}
        </View>
      </View>
    );
  };

  const renderWeekView = () => {
    const weekDays = ['일', '월', '화', '수', '목', '금', '토'];
    const startOfWeek = new Date(currentDate);
    const day = startOfWeek.getDay();
    startOfWeek.setDate(startOfWeek.getDate() - day);

    const weekDates = [];
    for (let i = 0; i < 7; i++) {
      const date = new Date(startOfWeek);
      date.setDate(startOfWeek.getDate() + i);
      weekDates.push(date);
    }

    const timeSlots = ['09:00', '10:00', '11:00', '12:00', '13:00', '14:00', '15:00', '16:00', '17:00', '18:00'];

    return (
      <View style={styles.calendarContainer}>
        <View style={styles.calendarHeader}>
          <Text style={styles.calendarTitle}>
            {currentDate.getFullYear()}년 {currentDate.getMonth() + 1}월 {getWeekOfMonth(currentDate)}주
          </Text>
          <View style={styles.calendarNav}>
            <TouchableOpacity onPress={() => navigateWeek(-1)}>
              <Ionicons name="chevron-back" size={20} color="#5c7cfa" />
            </TouchableOpacity>
            <TouchableOpacity onPress={() => navigateWeek(1)}>
              <Ionicons name="chevron-forward" size={20} color="#5c7cfa" />
            </TouchableOpacity>
            <TouchableOpacity onPress={() => setCurrentDate(new Date())}>
              <Ionicons name="calendar" size={20} color="#5c7cfa" />
            </TouchableOpacity>
          </View>
        </View>

        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          <View style={styles.weekGrid}>
            <View style={styles.timeColumn}>
              <View style={styles.timeSlotHeader} />
              {timeSlots.map((time, index) => (
                <View key={index} style={styles.timeSlot}>
                  <Text style={styles.timeSlotText}>{time}</Text>
                </View>
              ))}
            </View>

            {weekDates.map((date, dayIndex) => {
              const dayEvents = getEventsForDate(date);
              const dayDeadlines = getDeadlinesForDate(date);
              const isTodayDate = isToday(date);
              const allDayEvents = dayEvents.filter(isAllDayEvent);

              return (
                <View key={dayIndex} style={styles.dayColumn}>
                  <View style={[styles.dayHeader, isTodayDate && styles.todayDayHeader]}>
                    <Text style={styles.dayHeaderText}>{weekDays[dayIndex]}</Text>
                    <Text style={[
                      styles.dayHeaderText,
                      isTodayDate && styles.todayHeaderText,
                    ]}>
                      {date.getDate()}
                    </Text>
                  </View>
                  <View style={styles.allDayRow}>
                    {allDayEvents.map((event) => (
                      <TouchableOpacity
                        key={event.id}
                        style={[styles.allDayChip, { backgroundColor: EVENT_COLORS[event.type] }]}
                        onPress={() => handleEventPress(event)}
                      >
                        <Text style={styles.chipText} numberOfLines={1}>{event.title}</Text>
                      </TouchableOpacity>
                    ))}
                    {dayDeadlines.map((deadline) => (
                      <TouchableOpacity
                        key={deadline.id}
                        style={[styles.deadlineChip, { backgroundColor: EVENT_COLORS.deadline }]}
                        onPress={() => handleEventPress(deadline)}
                      >
                        <Text style={styles.chipText} numberOfLines={1}>{deadline.title}</Text>
                      </TouchableOpacity>
                    ))}
                  </View>
                  {timeSlots.map((time, timeIndex) => {
                    const slotHour = parseInt(time.slice(0, 2), 10);
                    const slotEvents = dayEvents.filter(event => event.startDate.getHours() === slotHour);

                    return (
                      <View key={timeIndex} style={[
                        styles.weekTimeSlot,
                        isTodayDate && styles.todayTimeSlot,
                      ]}>
                        {slotEvents.map((event, eventIndex) => (
                          <TouchableOpacity
                            key={event.id}
                            style={[
                              styles.weekEvent,
                              { backgroundColor: EVENT_COLORS[event.type] },
                            ]}
                            onPress={() => handleEventPress(event)}
                          >
                            <Text style={styles.weekEventText} numberOfLines={1}>
                              {event.title}
                            </Text>
                          </TouchableOpacity>
                        ))}
                      </View>
                    );
                  })}
                </View>
              );
            })}
          </View>
        </ScrollView>
      </View>
    );
  };

  const renderDayView = () => {
    const timeSlots = ['09:00', '10:00', '11:00', '12:00', '13:00', '14:00', '15:00', '16:00', '17:00', '18:00'];
    const dayEvents = getEventsForDate(currentDate);
    const dayDeadlines = getDeadlinesForDate(currentDate);
    // 종일 이벤트와 시간 슬롯 이벤트를 분리
    const allDayEvents = dayEvents.filter(isAllDayEvent);

    const weekDays = ['일요일', '월요일', '화요일', '수요일', '목요일', '금요일', '토요일'];

    return (
      <View style={styles.calendarContainer}>
        <View style={styles.dayViewHeader}>
          <Text style={styles.dayViewTitle}>
            {currentDate.getFullYear()}년 {currentDate.getMonth() + 1}월 {currentDate.getDate()}일 {weekDays[currentDate.getDay()]}
          </Text>
        </View>

        <View style={styles.calendarNav}>
          <TouchableOpacity onPress={() => navigateDay(-1)}>
            <Ionicons name="chevron-back" size={20} color="#5c7cfa" />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => setCurrentDate(new Date())}>
            <Ionicons name="calendar" size={20} color="#5c7cfa" />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => navigateDay(1)}>
            <Ionicons name="chevron-forward" size={20} color="#5c7cfa" />
          </TouchableOpacity>
        </View>

        {/* 종일 이벤트 및 마감일 칩 영역 */}
        <View style={styles.allDayRow}>
          {allDayEvents.map((event) => (
            <TouchableOpacity
              key={event.id}
              style={[styles.allDayChip, { backgroundColor: EVENT_COLORS[event.type] }]}
              onPress={() => handleEventPress(event)}
            >
              <Text style={styles.chipText} numberOfLines={1}>{event.title}</Text>
            </TouchableOpacity>
          ))}
          {dayDeadlines.map((deadline) => (
            <TouchableOpacity
              key={deadline.id}
              style={[styles.deadlineChip, { backgroundColor: EVENT_COLORS.deadline }]}
              onPress={() => handleEventPress(deadline)}
            >
              <Text style={styles.chipText} numberOfLines={1}>{deadline.title}</Text>
            </TouchableOpacity>
          ))}
        </View>

        <View style={styles.dayGrid}>
          {timeSlots.map((time, index) => {
            const slotHour = parseInt(time.slice(0, 2), 10);
            const slotEvents = dayEvents.filter(event => !isAllDayEvent(event) && event.startDate.getHours() === slotHour);

            return (
              <View key={index} style={styles.dayRow}>
                <View style={styles.dayTimeSlot}>
                  <Text style={styles.dayTimeSlotText}>{time}</Text>
                </View>
                <View style={styles.dayEventColumn}>
                  {slotEvents.map((event, eventIndex) => (
                    <TouchableOpacity
                      key={event.id}
                      style={[
                        styles.dayEvent,
                        {
                          borderLeftColor: EVENT_COLORS[event.type],
                          backgroundColor: EVENT_COLORS[event.type] + '20',
                        },
                      ]}
                      onPress={() => handleEventPress(event)}
                    >
                      <Text style={styles.dayEventTitle}>{event.title}</Text>
                      {event.endDate && (
                        <Text style={styles.dayEventTime}>
                          {time} - {event.endDate.toTimeString().slice(0, 5)}
                        </Text>
                      )}
                    </TouchableOpacity>
                  ))}
                </View>
              </View>
            );
          })}
        </View>
      </View>
    );
  };

  const renderEventList = () => {
    const allEvents = [...events, ...deadlineEvents.filter(d =>
      settings[`${d.type}Deadlines` as keyof typeof settings]
    )];

    return (
      <View style={styles.eventList}>
        <View style={styles.eventListHeader}>
          <Text style={styles.eventListTitle}>이번달 일정</Text>
        </View>

        <FlatList
          data={allEvents}
          keyExtractor={(item) => item?.id || 'unknown'}
          renderItem={({ item }) => {
            if (!item) return null;
            const color = EVENT_COLORS[item.type as EventType];
            const metaText = 'date' in item
              ? item.date.toLocaleDateString('ko-KR', { month: 'long', day: 'numeric' })
              : `${item.startDate.toLocaleDateString('ko-KR', { month: 'long', day: 'numeric' })}${item.endDate ? ` - ${item.endDate.toLocaleDateString('ko-KR', { month: 'long', day: 'numeric' })}` : ''}`;
            return (
              <TouchableOpacity
                style={styles.eventItem}
                onPress={() => handleEventPress(item)}
              >
                <View style={[
                  styles.eventColor,
                  { backgroundColor: color },
                ]} />
                <View style={styles.eventInfo}>
                  <Text style={styles.eventTitle}>{item.title}</Text>
                  <Text style={styles.eventMeta}>{metaText}</Text>
                </View>
              </TouchableOpacity>
            );
          }}
          ItemSeparatorComponent={() => <View style={styles.eventSeparator} />}
        />

        <View style={styles.colorLegend}>
          <Text style={styles.legendTitle}>색상 범례</Text>
          <View style={styles.legendItems}>
            {Object.entries(EVENT_LABELS).map(([key, label]) => (
              <View key={key} style={styles.legendItem}>
                <View style={[
                  styles.legendColor,
                  { backgroundColor: EVENT_COLORS[key as keyof typeof EVENT_COLORS] },
                ]} />
                <Text style={styles.legendText}>{label} 일정</Text>
              </View>
            ))}
          </View>
        </View>
      </View>
    );
  };

  const renderSettings = () => {
    return (
      <View style={styles.settingsSection}>
        <Text style={styles.settingsTitle}>일정 설정</Text>

        <View style={styles.settingItem}>
          <View style={styles.settingLabel}>
            <Ionicons name="notifications" size={20} color="#5c7cfa" />
            <Text style={styles.settingLabelText}>일정 알림</Text>
          </View>
          <Switch
            value={settings.notifications}
            onValueChange={(value) => updateSetting('notifications', value)}
            trackColor={{ false: '#ccc', true: '#5c7cfa' }}
          />
        </View>

        <View style={styles.settingItem}>
          <View style={styles.settingLabel}>
            <Ionicons name="share" size={20} color="#5c7cfa" />
            <Text style={styles.settingLabelText}>일정 공유</Text>
          </View>
          <Switch
            value={settings.sharing}
            onValueChange={(value) => updateSetting('sharing', value)}
            trackColor={{ false: '#ccc', true: '#5c7cfa' }}
          />
        </View>

        <View style={styles.settingItem}>
          <View style={styles.settingLabel}>
            <Ionicons logo="google" size={20} color="#5c7cfa" />
            <Text style={styles.settingLabelText}>Google Calendar 연동</Text>
          </View>
          <Switch
            value={settings.googleCalendar}
            onValueChange={(value) => updateSetting('googleCalendar', value)}
            trackColor={{ false: '#ccc', true: '#5c7cfa' }}
          />
        </View>

        <View style={styles.settingDivider} />

        <View style={styles.settingItem}>
          <View style={styles.settingLabel}>
            <Ionicons name="school" size={20} color="#28a745" />
            <Text style={styles.settingLabelText}>북마크한 교육 마감일정</Text>
          </View>
          <Switch
            value={settings.educationDeadlines}
            onValueChange={(value) => updateSetting('educationDeadlines', value)}
            trackColor={{ false: '#ccc', true: '#28a745' }}
          />
        </View>

        <View style={styles.settingItem}>
          <View style={styles.settingLabel}>
            <Ionicons name="briefcase" size={20} color="#ff7a45" />
            <Text style={styles.settingLabelText}>채용공고 마감일</Text>
          </View>
          <Switch
            value={settings.recruitmentDeadlines}
            onValueChange={(value) => updateSetting('recruitmentDeadlines', value)}
            trackColor={{ false: '#ccc', true: '#ff7a45' }}
          />
        </View>

        <View style={styles.settingItem}>
          <View style={styles.settingLabel}>
            <Ionicons name="star" size={20} color="#74c0fc" />
            <Text style={styles.settingLabelText}>기타 중요일정</Text>
          </View>
          <Switch
            value={settings.importantDeadlines}
            onValueChange={(value) => updateSetting('importantDeadlines', value)}
            trackColor={{ false: '#ccc', true: '#74c0fc' }}
          />
        </View>
      </View>
    );
  };

  const renderAddEventModal = () => {
    return (
      <Modal
        visible={showAddModal}
        animationType="slide"
        presentationStyle="pageSheet"
      >
        <SafeAreaView style={styles.modalContainer}>
          <View style={styles.modalHeader}>
            <Text style={styles.modalTitle}>일정 추가</Text>
            <TouchableOpacity onPress={() => setShowAddModal(false)}>
              <Ionicons name="close" size={24} color="#999" />
            </TouchableOpacity>
          </View>

          <ScrollView style={styles.modalBody}>
            <View style={styles.formGroup}>
              <Text style={styles.formLabel}>일정 유형</Text>
              <View style={styles.eventTypeSelector}>
                {Object.entries(EVENT_LABELS).map(([key, label]) => (
                  <TouchableOpacity
                    key={key}
                    style={[
                      styles.eventTypeOption,
                      newEvent.type === key && styles.eventTypeOptionSelected,
                      { backgroundColor: newEvent.type === key ? EVENT_COLORS[key as keyof typeof EVENT_COLORS] : '#f8f9fa' },
                    ]}
                    onPress={() => setNewEvent({ ...newEvent, type: key as CalendarEvent['type'] })}
                  >
                    <Text style={[
                      styles.eventTypeOptionText,
                      newEvent.type === key && styles.eventTypeOptionTextSelected,
                    ]}>
                      {label}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>
            </View>

            <View style={styles.formGroup}>
              <Text style={styles.formLabel}>제목</Text>
              <TextInput
                style={styles.textInput}
                value={newEvent.title || ''}
                onChangeText={(text) => setNewEvent({ ...newEvent, title: text })}
                placeholder="일정 제목을 입력하세요"
              />
            </View>

            <View style={styles.formRow}>
              <View style={styles.formGroup}>
                <Text style={styles.formLabel}>시작일</Text>
                <TextInput
                  style={styles.textInput}
                  value={newEvent.startDate?.toLocaleDateString('ko-KR') || ''}
                  placeholder="시작일을 선택하세요"
                  editable={false}
                />
              </View>
              <View style={styles.formGroup}>
                <Text style={styles.formLabel}>종료일</Text>
                <TextInput
                  style={styles.textInput}
                  value={newEvent.endDate?.toLocaleDateString('ko-KR') || ''}
                  placeholder="종료일을 선택하세요"
                  editable={false}
                />
              </View>
            </View>

            <View style={styles.formGroup}>
              <Text style={styles.formLabel}>장소</Text>
              <TextInput
                style={styles.textInput}
                value={newEvent.location || ''}
                onChangeText={(text) => setNewEvent({ ...newEvent, location: text })}
                placeholder="일정 장소를 입력하세요"
              />
            </View>

            <View style={styles.formGroup}>
              <Text style={styles.formLabel}>메모</Text>
              <TextInput
                style={[styles.textInput, styles.textArea]}
                value={newEvent.memo || ''}
                onChangeText={(text) => setNewEvent({ ...newEvent, memo: text })}
                placeholder="메모를 입력하세요"
                multiline
                numberOfLines={3}
              />
            </View>
          </ScrollView>

          <View style={styles.modalFooter}>
            <TouchableOpacity
              style={[styles.modalButton, styles.modalButtonSecondary]}
              onPress={() => setShowAddModal(false)}
            >
              <Text style={styles.modalButtonTextSecondary}>취소</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.modalButton, styles.modalButtonPrimary]}
              onPress={handleAddEvent}
            >
              <Text style={styles.modalButtonTextPrimary}>추가</Text>
            </TouchableOpacity>
          </View>
        </SafeAreaView>
      </Modal>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <SubformHeader
        title="일정관리"
        showBack={true}
        showHome={true}
        navigation={navigation}
      />

      {/* View Toggle */}
      <View style={styles.viewToggle}>
        <TouchableOpacity
          style={[styles.viewOption, selectedView === 'month' && styles.viewOptionActive]}
          onPress={() => setSelectedView('month')}
        >
          <Text style={[styles.viewOptionText, selectedView === 'month' && styles.viewOptionTextActive]}>
            월
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.viewOption, selectedView === 'day' && styles.viewOptionActive]}
          onPress={() => setSelectedView('day')}
        >
          <Text style={[styles.viewOptionText, selectedView === 'day' && styles.viewOptionTextActive]}>
            일
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.addEventButton}
          onPress={() => setShowAddModal(true)}
        >
          <Ionicons name="add" size={16} color="white" />
          <Text style={styles.addEventButtonText}>일정 추가</Text>
        </TouchableOpacity>
      </View>

      {/* Content */}
      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {selectedView === 'month' && renderMonthView()}
        {selectedView === 'day' && renderDayView()}

        {renderEventList()}
        {renderSettings()}
      </ScrollView>

      {/* Add Event Modal */}
      {renderAddEventModal()}
    </SafeAreaView>
  );
};

// Styles
const styles = StyleSheet.create({
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
    // 부모 컨테이너 너비에 맞게 확장하여 onLayout으로 측정 가능하도록 설정
    alignSelf: 'stretch',
  },
  calendarDay: {
    // 폭은 동적으로 지정, 정사각형 유지
    aspectRatio: 1,
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
  eventContainer: {
    flex: 1,
    justifyContent: 'flex-start',
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
  allDayRow: {
    paddingHorizontal: 6,
    paddingVertical: 4,
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'flex-start',
  },
  allDayChip: {
    borderRadius: 6,
    paddingHorizontal: 8,
    paddingVertical: 4,
    marginRight: 6,
    marginBottom: 6,
  },
  deadlineChip: {
    borderRadius: 6,
    paddingHorizontal: 8,
    paddingVertical: 4,
    marginRight: 6,
    marginBottom: 6,
    opacity: 0.9,
  },
  chipText: {
    fontSize: 12,
    color: '#fff',
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
});

export default ScheduleManager;