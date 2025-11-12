import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { FontAwesome5 } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { styles } from '../styles/styles';

interface RecommendedEducationCardProps {
    title: string;
    provider: string;
    duration: string;
    price: string;
    tags: string[];
    rating: number;
    students: number;
    level: string;
}

export const RecommendedEducationCard: React.FC<RecommendedEducationCardProps> = ({
    title,
    provider,
    duration,
    price,
    tags,
    rating,
    students,
    level
}) => {
    const navigation = useNavigation<any>();
    return (
        <TouchableOpacity style={styles.recommendedEducationCard} onPress={() => navigation.navigate('EduListDetail')} accessibilityRole="button">
            <View style={styles.recommendedEducationBadge}>
                <Text style={styles.recommendedEducationBadgeText}>추천</Text>
            </View>
            <Text style={styles.recommendedEducationTitle}>{title}</Text>
            <Text style={styles.recommendedEducationProvider}>{provider}</Text>
            <View style={styles.recommendedEducationMeta}>
                <Text style={styles.recommendedEducationDuration}>{duration}</Text>
                <Text style={styles.recommendedEducationPrice}>{price}</Text>
            </View>
            <View style={styles.recommendedEducationTags}>
                {tags.map((tag, i) => (
                    <View key={i} style={styles.recommendedEducationTagChip}>
                        <Text style={styles.recommendedEducationTagText}>{tag}</Text>
                    </View>
                ))}
            </View>
            <View style={styles.recommendedEducationFooter}>
                <View style={styles.recommendedEducationRating}>
                    <FontAwesome5 name="star" size={14} color="#f5a623" />
                    <Text style={styles.recommendedEducationRatingText}>{rating.toFixed(1)}</Text>
                </View>
                <Text style={styles.recommendedEducationStudents}>{students}명 수강</Text>
                <View style={styles.recommendedEducationLevel}>
                    <Text style={styles.recommendedEducationLevelText}>{level}</Text>
                </View>
            </View>
        </TouchableOpacity>
    );
};