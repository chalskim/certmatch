import React from 'react';
import { View, Text } from 'react-native';
import { FontAwesome5 } from '@expo/vector-icons';
import { styles } from '../styles/styles';

interface RecommendedConsultantCardProps {
    name: string;
    title: string;
    expertise: string[];
    rating: number;
    location: string;
}

export const RecommendedConsultantCard: React.FC<RecommendedConsultantCardProps> = ({
    name,
    title,
    expertise,
    rating,
    location
}) => (
    <View style={styles.recommendedCard}>
        <Text style={styles.recommendedBadge}>추천</Text>
        <View style={styles.recommendedHeader}>
            <FontAwesome5 name="user-tie" size={18} color="#333" />
            <View style={{ marginLeft: 10 }}>
                <Text style={styles.recommendedName}>{name}</Text>
                <Text style={styles.recommendedTitle}>{title}</Text>
            </View>
        </View>
        <View style={styles.recommendedExpertise}>
            {expertise.map((e, i) => (
                <View key={i} style={styles.recommendedExpertiseChip}>
                    <Text style={styles.recommendedExpertiseText}>{e}</Text>
                </View>
            ))}
        </View>
        <View style={styles.recommendedRating}>
            <View style={styles.recommendedRatingLeft}>
                <FontAwesome5 name="star" size={16} color="#333" />
                <Text style={styles.recommendedRatingText}>{rating.toFixed(1)}</Text>
            </View>
            <Text style={styles.recommendedLocation}>{location}</Text>
        </View>
    </View>
);