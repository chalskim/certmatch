import React from 'react';
import { View, ScrollView } from 'react-native';
import { styles } from '../styles/styles';
import {
    type UrgentRecruitment,
    type GeneralRecruitment
} from '../../services/dataService';
import { UrgentCard } from '../components/UrgentCard';
import { JobCard } from '../components/JobCard';
import { SectionTitle } from '../components/SectionTitle';

interface JobsTabProps {
    urgentRecruitments: UrgentRecruitment[];
    generalRecruitments: GeneralRecruitment[];
}

export const JobsTab: React.FC<JobsTabProps> = ({
    urgentRecruitments,
    generalRecruitments
}) => {
    return (
        <View>
            <SectionTitle icon="fire" title="긴급 모집" />
            <ScrollView horizontal showsHorizontalScrollIndicator={false} style={{ marginVertical: 8 }}>
                {urgentRecruitments.map((item, idx) => (
                    <UrgentCard
                        key={idx}
                        badge={item.badges[0] || '긴급'}
                        title={item.title}
                        company={`${item.company} · ${item.location}`}
                        price={item.salary}
                        deadline={item.deadline}
                    />
                ))}
            </ScrollView>

            <SectionTitle icon="briefcase" title="일반 모집" />
            {generalRecruitments
                .reduce((rows: GeneralRecruitment[][], item: GeneralRecruitment, index: number) => {
                    if (index % 2 === 0) rows.push([item]);
                    else rows[rows.length - 1].push(item);
                    return rows;
                }, [])
                .map((row: GeneralRecruitment[], rowIndex: number) => (
                    <View key={rowIndex} style={{ flexDirection: 'row', marginBottom: 12 }}>
                        {row.map((item: GeneralRecruitment, itemIndex: number) => (
                            <JobCard
                                key={`${item.title}-${itemIndex}`}
                                badge={item.badges[0] || '신규'}
                                badgeType={'default' as 'new' | 'hot' | 'default'}
                                title={item.title}
                                company={`${item.company} · ${item.location}`}
                                tags={item.tags}
                                price={item.salary}
                                deadline={item.deadline}
                            />
                        ))}
                        {row.length === 1 && <View style={{ flex: 1, marginHorizontal: 6 }} />}
                    </View>
                ))
            }
        </View>
    );
};