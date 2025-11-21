import React, { useMemo, useState } from 'react';
import { View, Text, TouchableOpacity, FlatList } from 'react-native';
import { FontAwesome5 } from '@expo/vector-icons';
import SubformHeader from '../components/SubformHeader';
import { styles } from '../styles/menu/AlarmManagement';

type NoticeItem = {
  id: string;
  title: string;
  message: string;
  date: string; // YYYY-MM-DD HH:mm
  read: boolean;
  category?: string;
};

const initialNotices: NoticeItem[] = [
  {
    id: 'n1',
    title: '결제 완료',
    message: '기업 광고 결제가 정상적으로 완료되었습니다.',
    date: '2025-01-15 09:12',
    read: false,
    category: '결제',
  },
  {
    id: 'n2',
    title: '새 Q&A 답변',
    message: '문의하신 ISMS-P 준비 절차에 대한 답변이 등록되었습니다.',
    date: '2025-01-14 16:40',
    read: false,
    category: 'Q&A',
  },
  {
    id: 'n3',
    title: '일정 알림',
    message: '내일 10:00 인증 컨설팅 미팅 일정이 있습니다.',
    date: '2025-01-14 08:00',
    read: true,
    category: '일정',
  },
  {
    id: 'n4',
    title: '배너 승인',
    message: '교육기관 프로모션 배너가 승인되어 게시되었습니다.',
    date: '2025-01-13 14:22',
    read: true,
    category: '배너',
  },
];

const filters = ['전체', '미확인', '확인됨'] as const;
type FilterType = typeof filters[number];

const AlarmManagement: React.FC<any> = ({ navigation }) => {
  const [notices, setNotices] = useState<NoticeItem[]>(initialNotices);
  const [filter, setFilter] = useState<FilterType>('전체');

  const filteredNotices = useMemo(() => {
    let arr = notices;
    if (filter === '미확인') arr = arr.filter((n) => !n.read);
    if (filter === '확인됨') arr = arr.filter((n) => n.read);
    // 최신순
    return arr.sort((a, b) => (a.date < b.date ? 1 : -1));
  }, [notices, filter]);

  const markAllRead = () => {
    setNotices((prev) => prev.map((n) => ({ ...n, read: true })));
  };

  const clearAll = () => {
    setNotices([]);
  };

  const toggleRead = (id: string) => {
    setNotices((prev) => prev.map((n) => (n.id === id ? { ...n, read: !n.read } : n)));
  };

  const removeOne = (id: string) => {
    setNotices((prev) => prev.filter((n) => n.id !== id));
  };

  const renderItem = ({ item }: { item: NoticeItem }) => {
    const iconName = item.read ? 'check-circle' : 'bell';
    const iconColor = item.read ? '#4caf50' : '#ff9800';
    return (
      <View style={styles.card} accessible accessibilityLabel={`알림: ${item.title}, ${item.read ? '확인됨' : '미확인'}`}>
        <View style={styles.cardHeader}>
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <FontAwesome5 name={iconName} size={18} color={iconColor} style={{ marginRight: 8 }} />
            <Text style={styles.cardTitle}>{item.title}</Text>
          </View>
          <Text style={styles.cardDate}>{item.date}</Text>
        </View>
        <Text style={styles.cardMessage}>{item.message}</Text>
      </View>
    );
  };

  return (
    <View style={{ flex: 1, backgroundColor: '#fff' }}>
      <SubformHeader title="알림 관리" onBack={() => navigation?.goBack?.()} onHome={() => navigation?.navigate?.('Home')} />

      <View style={{ padding: 12 }}>
        <View style={styles.toolbar}>
          <View style={{ flexDirection: 'row' }}>
            <TouchableOpacity style={[styles.toolbarBtn, styles.toolbarBtnPrimary]} onPress={markAllRead} accessibilityLabel="전체 읽음 처리">
              <FontAwesome5 name="check" size={14} color="#fff" />
              <Text style={styles.toolbarBtnText}>전체 읽음</Text>
            </TouchableOpacity>
            <TouchableOpacity style={[styles.toolbarBtn, styles.toolbarBtnDanger]} onPress={clearAll} accessibilityLabel="전체 삭제">
              <FontAwesome5 name="trash" size={14} color="#fff" />
              <Text style={styles.toolbarBtnText}>전체 삭제</Text>
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.filterRow}>
          {filters.map((f) => {
            const active = f === filter;
            return (
              <TouchableOpacity key={f} style={[styles.chip, active ? styles.chipActive : undefined]} onPress={() => setFilter(f)} accessibilityLabel={`필터: ${f}`}>
                <Text style={[styles.chipText, active ? { color: '#fff', fontWeight: '700' } : undefined]}>{f}</Text>
              </TouchableOpacity>
            );
          })}
        </View>

        <FlatList
          data={filteredNotices}
          keyExtractor={(item) => item.id}
          renderItem={renderItem}
          ListEmptyComponent={() => (
            <View style={styles.empty}>
              <FontAwesome5 name="inbox" size={20} color="#999" />
              <Text style={{ color: '#999', marginTop: 6 }}>표시할 알림이 없습니다.</Text>
            </View>
          )}
          contentContainerStyle={{ paddingBottom: 40 }}
        />
      </View>
    </View>
  );
};

export default AlarmManagement;