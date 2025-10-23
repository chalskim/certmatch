import React from 'react';
import { View, ScrollView } from 'react-native';
import { styles } from '../styles/styles';
import {
    type Consultant
} from '../../services/dataService';
import { SectionTitle } from '../components/SectionTitle';
import { RecommendedConsultantCard } from '../components/RecommendedConsultantCard';
import { ConsultantCard } from '../components/ConsultantCard';

interface ConsultantsTabProps {
    recommendedConsultants: Consultant[];
    consultants: Consultant[];
}

export const ConsultantsTab: React.FC<ConsultantsTabProps> = ({
    recommendedConsultants,
    consultants
}) => {
    return (
        <View>
            {/* 추천 전문가 섹션 */}
            <View style={styles.recommendedSection}>
                <SectionTitle icon="star" title="추천 전문가" />
                <ScrollView
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    contentContainerStyle={{ paddingLeft: 0 }}
                >
                    {recommendedConsultants.map((consultant: Consultant) => (
                        <RecommendedConsultantCard
                            key={`recommended-${consultant.id}`}
                            name={consultant.name}
                            title={consultant.title}
                            expertise={consultant.expertise}
                            rating={consultant.rating}
                            location={consultant.region}
                        />
                    ))}
                </ScrollView>
            </View>

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
                            <ConsultantCard
                                key={`consultant-${c.name}-${colIdx}`}
                                name={c.name}
                                title={c.title}
                                expertise={c.expertise}
                                rating={c.rating}
                                location={c.region}
                            />
                        ))}
                        {row.length === 1 && <View style={{ flex: 1, marginHorizontal: 6 }} />}
                    </View>
                ))}
        </View>
    );
};