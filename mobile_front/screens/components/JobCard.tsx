import React from 'react';
import { View, Text } from 'react-native';
import { styles } from '../styles/styles';

interface JobCardProps {
    badge: string;
    badgeType: 'new' | 'hot' | 'default';
    title: string;
    company: string;
    tags: string[];
    price: string;
    deadline: string;
}

export const JobCard: React.FC<JobCardProps> = ({
    badge,
    badgeType,
    title,
    company,
    tags,
    price,
    deadline
}) => (
    <View style={styles.jobCard}>
        <View style={[styles.jobBadge, badgeType === 'new' && styles.jobBadgeNew, badgeType === 'hot' && styles.jobBadgeHot]}>
            <Text style={styles.jobBadgeText}>{badge}</Text>
        </View>
        <Text style={styles.jobTitle}>{title}</Text>
        <Text style={styles.jobCompany}>{company}</Text>
        <View style={styles.tagRow}>
            {tags.map((t, i) => (
                <View key={i} style={styles.tagChip}><Text style={styles.tagText}>{t}</Text></View>
            ))}
        </View>
        <View style={styles.cardFooter}>
            <Text style={styles.cardPrice}>{price}</Text>
            <Text style={styles.cardDeadline}>{deadline}</Text>
        </View>
    </View>
);