import React from 'react';
import { View, Text } from 'react-native';
import { FontAwesome5 } from '@expo/vector-icons';
import { styles } from '../styles/styles';
import { courses, type Course } from '../data/homeData';

const SectionTitle = ({ icon, title }: { icon: any; title: string }) => (
  <View style={styles.sectionTitle}>
    <FontAwesome5 name={icon} size={16} color="#4caf50" />
    <Text style={styles.sectionTitleText}>{title}</Text>
  </View>
);

const EducationCard = ({ title, provider, period, price, tags }: Course) => (
  <View style={styles.eduCard}>
    <Text style={styles.eduTitle}>{title}</Text>
    <Text style={styles.eduProvider}>{provider}</Text>
    <View style={styles.courseMetaRow}>
      <Text>{period}</Text>
      <Text style={{ fontWeight: '700' }}>{price}</Text>
    </View>
    <View style={styles.courseTagRow}>
      {tags.map((t, i) => (
        <View key={i} style={styles.courseTagChip}><Text style={styles.courseTagText}>{t}</Text></View>
      ))}
    </View>
  </View>
);

const EducationTab: React.FC = () => {
  return (
    <View>
      <SectionTitle icon="graduation-cap" title="교육" />
      {courses
        .reduce((rows: Course[][], item: Course, index: number) => {
          if (index % 2 === 0) rows.push([item]);
          else rows[rows.length - 1].push(item);
          return rows;
        }, [])
        .map((row: Course[], rowIdx: number) => (
          <View
            key={`course-row-${rowIdx}`}
            style={{ flexDirection: 'row', justifyContent: 'space-between' }}
          >
            {row.map((course: Course, colIdx: number) => (
              <EducationCard key={`course-${course.title}-${colIdx}`} {...course} />
            ))}
          </View>
        ))}
    </View>
  );
};

export default EducationTab;