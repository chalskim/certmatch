import React from 'react';
import { View, Text } from 'react-native';
import { FontAwesome5 } from '@expo/vector-icons';
import { styles } from '../styles/styles';
import { notices, type Notice } from '../data/homeData';

const SectionTitle = ({ icon, title }: { icon: any; title: string }) => (
  <View style={styles.sectionTitle}>
    <FontAwesome5 name={icon} size={16} color="#455a64" />
    <Text style={styles.sectionTitleText}>{title}</Text>
  </View>
);

const NoticeItem = ({ title, category, date }: Notice) => (
  <View style={styles.urgentCard}>
    <Text style={styles.cardBadge}>{category}</Text>
    <Text style={styles.cardTitle}>{title}</Text>
    <Text style={styles.cardCompany}>{date}</Text>
  </View>
);

const NewsItem = ({ title, source, date }: { title: string; source?: string; date: string }) => (
  <View style={styles.jobCard}>
    <Text style={styles.jobTitle}>{title}</Text>
    {source ? <Text style={styles.jobCompany}>{source}</Text> : null}
    <View style={styles.cardFooter}>
      <Text style={styles.cardDeadline}>{date}</Text>
    </View>
  </View>
);

const NoticeNewsTab: React.FC = () => {
  const noticeList = notices.filter((n) => n.category === '공지');
  const newsList = notices.filter((n) => n.category === '뉴스');

  type NoticeItemType = typeof noticeList[number];
  type NewsItemType = typeof newsList[number];

  return (
    <View>
      <SectionTitle icon="bullhorn" title="공지사항" />
      {/* 2열 그리드 수동 렌더링 (FlatList 중첩 경고 방지) */}
      {noticeList
        .reduce((rows: NoticeItemType[][], item: NoticeItemType, index: number) => {
          if (index % 2 === 0) rows.push([item]);
          else rows[rows.length - 1].push(item);
          return rows;
        }, [])
        .map((row: NoticeItemType[], rowIdx: number) => (
          <View key={`notice-row-${rowIdx}`} style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
            {row.map((item: NoticeItemType, colIdx: number) => (
              <NoticeItem key={`${item.title}-${colIdx}`} {...item} />
            ))}
          </View>
        ))}

      <SectionTitle icon="newspaper" title="뉴스" />
      {newsList
        .reduce((rows: NewsItemType[][], item: NewsItemType, index: number) => {
          if (index % 2 === 0) rows.push([item]);
          else rows[rows.length - 1].push(item);
          return rows;
        }, [])
        .map((row: NewsItemType[], rowIdx: number) => (
          <View key={`news-row-${rowIdx}`} style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
            {row.map((item: NewsItemType, colIdx: number) => (
              <NewsItem key={`${item.title}-${colIdx}`} title={item.title} date={item.date} />
            ))}
          </View>
        ))}
    </View>
  );
};

export default NoticeNewsTab;