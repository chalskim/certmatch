import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { styles } from '../styles/styles';

interface EducationCardProps {
    title: string;
    provider: string;
    period: string;
    price: string;
    tags: string[];
}

export const EducationCard: React.FC<EducationCardProps> = ({
    title,
    provider,
    period,
    price,
    tags
}) => {
    const navigation = useNavigation<any>();
    return (
        <TouchableOpacity style={styles.eduCard} onPress={() => navigation.navigate('EduListDetail')} accessibilityRole="button">
            <Text style={styles.eduTitle}>{title}</Text>
            <Text style={styles.eduProvider}>{provider}</Text>
            <View style={styles.courseMetaRow}>
                <Text style={{ fontSize: 12, color: '#555' }}>{period}</Text>
                <Text style={{ fontWeight: '700', color: '#0066CC', fontSize: 16 }}>{price}</Text>
            </View>
            <View style={styles.courseTagRow}>
                {tags.map((t, i) => (
                    <View key={i} style={styles.courseTagChip}><Text style={styles.courseTagText}>{t}</Text></View>
                ))}
            </View>
        </TouchableOpacity>
    );
};