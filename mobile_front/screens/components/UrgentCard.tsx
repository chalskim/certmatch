import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { styles } from '../styles/styles';

interface UrgentCardProps {
    badge: string;
    title: string;
    company: string;
    price: string;
    deadline: string;
    onPress?: () => void;
}

export const UrgentCard: React.FC<UrgentCardProps> = ({
    badge,
    title,
    company,
    price,
    deadline,
    onPress,
}) => (
    <TouchableOpacity style={styles.urgentCard} onPress={onPress} activeOpacity={0.9}>
        <Text style={styles.cardBadge}>{badge}</Text>
        <Text style={styles.cardTitle}>{title}</Text>
        <Text style={styles.cardCompany}>{company}</Text>
        <View style={styles.cardFooter}>
            <Text style={styles.cardPrice}>{price}</Text>
            <View style={{ backgroundColor: 'rgba(255, 255, 255, 0.6)', padding: 3, paddingHorizontal: 8, borderRadius: 12 }}>
                <Text style={{ color: '#333', fontSize: 12 }}>{deadline}</Text>
            </View>
        </View>
    </TouchableOpacity>
);