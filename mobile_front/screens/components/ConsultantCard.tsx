import React from 'react';
import { View, Text } from 'react-native';
import { FontAwesome5 } from '@expo/vector-icons';
import { styles } from '../styles/styles';

interface ConsultantCardProps {
    name: string;
    title: string;
    expertise: string[];
    rating: number;
    location: string;
}

export const ConsultantCard: React.FC<ConsultantCardProps> = ({
    name,
    title,
    expertise,
    rating,
    location
}) => (
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
            <View style={styles.ratingLeft}>
                <FontAwesome5 name="star" size={14} color="#f5a623" />
                <Text style={styles.ratingText}>{rating.toFixed(1)}</Text>
            </View>
        </View>
    </View>
);