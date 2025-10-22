import React from 'react';
import { View, Text } from 'react-native';
import { FontAwesome5 } from '@expo/vector-icons';
import { styles } from '../styles/styles';
import { consultants, type Consultant } from '../data/homeData';

const SectionTitle = ({ icon, title }: { icon: any; title: string }) => (
  <View style={styles.sectionTitle}>
    <FontAwesome5 name={icon} size={16} color="#2d89ef" />
    <Text style={styles.sectionTitleText}>{title}</Text>
  </View>
);

const ConsultantCard = ({ name, title, expertise, rating, location }: Consultant) => (
  <View style={styles.consultantCard}>
    <View style={styles.consultantHeader}>
      <FontAwesome5 name="user-tie" size={16} color="#2d89ef" />
      <View style={{ marginLeft: 8 }}>
        <Text style={styles.consultantName}>{name}</Text>
        <Text style={styles.consultantTitle}>{title} · {location}</Text>
      </View>
    </View>
    <View style={styles.expertiseRow}>
      {expertise.map((e, i) => (
        <View key={i} style={styles.expertiseChip}><Text style={styles.expertiseText}>{e}</Text></View>
      ))}
    </View>
    <View style={styles.ratingRow}>
      <FontAwesome5 name="star" size={14} color="#f5a623" />
      <Text style={styles.ratingText}>{rating.toFixed(1)}</Text>
    </View>
  </View>
);

const ConsultantsTab: React.FC = () => {
  return (
    <View>
      <SectionTitle icon="user-tie" title="전문가 매칭" />
      {consultants
        .reduce((rows: Consultant[][], item: Consultant, index: number) => {
          if (index % 2 === 0) rows.push([item]);
          else rows[rows.length - 1].push(item);
          return rows;
        }, [])
        .map((row: Consultant[], rowIdx: number) => (
          <View
            key={`consultant-row-${rowIdx}`}
            style={{ flexDirection: 'row', justifyContent: 'space-between' }}
          >
            {row.map((c: Consultant, colIdx: number) => (
              <ConsultantCard key={`consultant-${c.name}-${colIdx}`} {...c} />
            ))}
          </View>
        ))}
    </View>
  );
};

export default ConsultantsTab;