import React, { useMemo, useState } from 'react';
import { Alert, FlatList, Text, TouchableOpacity, View } from 'react-native';
import { FontAwesome5 } from '@expo/vector-icons';

import SubformHeader from '../components/SubformHeader';
import { styles } from '../styles/menu/NoticeNewsList';

type Notice = {
  id: number;
  title: string;
  content?: string;
  date: string; // 작성일자
  org: string; // 기관
  category: string;
  certifications: string[];
  publication: { type: 'immediate' | 'scheduled'; date?: string; time?: string };
  icon?: string; // emoji
  state?: 'posting' | 'scheduled' | 'completed';
};

const initialData: Notice[] = [
  {
    id: 1001,
    title: '자격증 제도 변경 안내',
    content: '2025년부터 자격증 제도가 일부 변경됩니다.',
    date: '2025-11-15',
    org: '한국자격관리원',
    category: '공지',
    certifications: ['국가기술자격', '민간자격'],
    publication: { type: 'immediate' },
    icon: '📢',
    state: 'posting',
  },
  {
    id: 1002,
    title: '신규 뉴스: 자격 취득자 증가',
    content: '올해 자격 취득자 수가 전년 대비 12% 증가했습니다.',
    date: '2025-11-12',
    org: '자격뉴스센터',
    category: '뉴스',
    certifications: ['정보처리기사'],
    publication: { type: 'scheduled', date: '2025-11-25', time: '09:30' },
    icon: '📰',
    state: 'scheduled',
  },
  {
    id: 1003,
    title: '행사 종료 안내',
    content: '지난주 진행된 인증 행사 종료 공지입니다.',
    date: '2025-11-01',
    org: '인증행사위원회',
    category: '공지',
    certifications: ['기타'],
    publication: { type: 'immediate' },
    icon: '✅',
    state: 'completed',
  },
];

const NoticeNewsList: React.FC<any> = ({ navigation }) => {
  const [notices, setNotices] = useState<Notice[]>(initialData);
  const [selectedTab, setSelectedTab] = useState<'all' | 'posting' | 'scheduled' | 'completed'>('all');

  const onAddNew = () => {
    navigation.navigate('NoticeNewsReg', {
      mode: 'create',
      onSave: (newItem: Notice) => {
        // publication 기준으로 기본 상태 설정
        const derivedState: Notice['state'] = newItem.publication?.type === 'scheduled' ? 'scheduled' : 'posting';
        setNotices(prev => [{ ...newItem, state: derivedState }, ...prev]);
      },
    });
  };

  const onEdit = (item: Notice) => {
    navigation.navigate('NoticeNewsReg', {
      mode: 'edit',
      item,
      onUpdate: (updated: Notice) => {
        setNotices(prev => prev.map(n => (n.id === updated.id ? { ...n, ...updated } : n)));
      },
    });
  };

  const onDelete = (item: Notice) => {
    Alert.alert('삭제 확인', '해당 공지/뉴스를 삭제하시겠습니까?', [
      { text: '취소', style: 'cancel' },
      {
        text: '삭제',
        style: 'destructive',
        onPress: () => {
          setNotices(prev => prev.filter(n => n.id !== item.id));
        },
      },
    ]);
  };

  const filteredNotices = useMemo(() => {
    if (selectedTab === 'all') return notices;
    return notices.filter(n => (n.state ?? 'posting') === selectedTab);
  }, [selectedTab, notices]);

  const renderItem = ({ item }: { item: Notice }) => {
    return (
      <View style={styles.card}>
        <View style={styles.cardHeader}>
          <Text style={styles.cardIcon}>{item.icon ?? '📰'}</Text>
          <Text style={styles.cardTitle} numberOfLines={1}>{item.title}</Text>
        </View>
        <View style={styles.metaRow}>
          <Text style={styles.metaText}>작성일: {item.date}</Text>
          <Text style={styles.metaDivider}>•</Text>
          <Text style={styles.metaText}>기관: {item.org}</Text>
          <Text style={styles.metaDivider}>•</Text>
          <Text style={styles.metaText}>게시: {item.publication.type === 'immediate' ? '즉시' : `예약(${item.publication.date} ${item.publication.time})`}</Text>
        </View>
        <View style={styles.chipRow}>
          <View style={[styles.chip, styles.chipPrimary]}><Text style={styles.chipText}>{item.category}</Text></View>
          {item.certifications?.map((c, idx) => (
            <View key={`${item.id}-cert-${idx}`} style={styles.chip}><Text style={styles.chipText}>{c}</Text></View>
          ))}
        </View>
        <View style={styles.actionsRow}>
          <TouchableOpacity style={[styles.actionBtn, styles.editBtn]} onPress={() => onEdit(item)} accessibilityLabel="공지 수정">
            <FontAwesome5 name="edit" size={14} color="#fff" />
            <Text style={styles.actionText}>수정</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.actionBtn, styles.deleteBtn]} onPress={() => onDelete(item)} accessibilityLabel="공지 삭제">
            <FontAwesome5 name="trash" size={14} color="#fff" />
            <Text style={styles.actionText}>삭제</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <SubformHeader
        title="공지사항 및 뉴스 목록"
        onBack={() => {
          try {
            if (navigation?.canGoBack?.()) {
              navigation.goBack();
            } else {
              navigation.navigate('Home');
            }
          } catch {}
        }}
        showHome
        onHome={() => navigation.navigate('Home')}
        navigation={navigation}
      />
      {/* 상단 탭 + 추가 버튼 */}
      <View style={styles.toolbar}>
        <View style={styles.tabs}>
          {(
            [
              { key: 'all', label: '전체' },
              { key: 'posting', label: '게시중' },
              { key: 'scheduled', label: '예약' },
              { key: 'completed', label: '완료' },
            ] as const
          ).map(tab => {
            const active = selectedTab === tab.key;
            return (
              <TouchableOpacity
                key={tab.key}
                onPress={() => setSelectedTab(tab.key)}
                style={[styles.tabBtn, active ? styles.tabBtnActive : undefined]}
                accessibilityLabel={`탭 선택: ${tab.label}`}
              >
                <Text style={[styles.tabText, active ? styles.tabTextActive : undefined]}>{tab.label}</Text>
              </TouchableOpacity>
            );
          })}
        </View>

        <TouchableOpacity onPress={onAddNew} style={styles.addBtn} accessibilityLabel="새 공지 등록">
          <Text style={styles.addBtnText}>+ 새 공지 등록</Text>
        </TouchableOpacity>
      </View>
      <FlatList
        data={filteredNotices}
        keyExtractor={(item) => String(item.id)}
        renderItem={renderItem}
        contentContainerStyle={styles.listContent}
        ItemSeparatorComponent={() => <View style={{ height: 12 }} />}
      />
    </View>
  );
};

export default NoticeNewsList;