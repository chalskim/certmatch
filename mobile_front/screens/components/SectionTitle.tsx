import React from 'react';
import { View, Text } from 'react-native';
import { FontAwesome5 } from '@expo/vector-icons';
import { styles } from '../styles/styles';

interface SectionTitleProps {
    icon: any;
    title: string;
}

export const SectionTitle: React.FC<SectionTitleProps> = ({ icon, title }) => (
    <View style={styles.sectionTitle}>
        <FontAwesome5 name={icon} size={18} color="#0066CC" />
        <Text style={styles.sectionTitleText}>{title}</Text>
    </View>
);