import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { styles } from '../styles/styles';

interface NoticeItemProps {
    title: string;
    category: string;
    date: string;
    description?: string;
    organization?: string;
}

export const NoticeItem: React.FC<NoticeItemProps> = ({
    title,
    category,
    date,
    description,
    organization
}) => {
    const navigation = useNavigation<any>();
    // Determine icon and gradient based on category
    const getIconAndGradient = () => {
        switch (category) {
            case '속보':
                return { icon: '📰', gradientStyle: styles.noticeIconGradient1 };
            case '마감임박':
                return { icon: '📢', gradientStyle: styles.noticeIconGradient2 };
            case '긴급공지':
                return { icon: '🔥', gradientStyle: styles.noticeIconGradient3 };
            case '산업뉴스':
                return { icon: '📈', gradientStyle: styles.noticeIconGradient4 };
            case '글로벌':
                return { icon: '🌍', gradientStyle: styles.noticeIconGradient5 };
            default:
                return { icon: '💰', gradientStyle: styles.noticeIconGradient4 };
        }
    };

    const { icon, gradientStyle } = getIconAndGradient();

    // Determine category style
    const getCategoryStyle = () => {
        switch (category) {
            case '속보':
                return styles.breakingNews;
            case '마감임박':
                return styles.applicationDeadline;
            case '긴급공지':
                return styles.urgentNotice;
            case '산업뉴스':
                return styles.industryNews;
            case '글로벌':
                return styles.globalNews;
            default:
                return styles.noticeCategory;
        }
    };

    return (
        <TouchableOpacity
            style={styles.noticeItem}
            onPress={() => navigation.navigate('NoticeItemlistDetail')}
            accessibilityRole="button"
            accessibilityLabel="공지사항 및 뉴스 상세 보기"
        >
            <View style={[styles.noticeIcon, gradientStyle]}>
                <Text style={{ color: 'white', fontSize: 20 }}>{icon}</Text>
            </View>
            <View style={styles.noticeContent}>
                <Text style={styles.noticeTitle}>{title}</Text>
                <Text style={styles.noticeDesc}>{description || '간단한 설명 텍스트가 여기에 들어갑니다.'}</Text>
                <View style={styles.noticeMeta}>
                    <Text style={styles.noticeDate}>📅 {date}</Text>
                    <Text style={styles.noticeOrg}>🏢 {organization || '조직명'}</Text>
                    <Text style={getCategoryStyle()}>{category}</Text>
                </View>
            </View>
        </TouchableOpacity>
    );
};