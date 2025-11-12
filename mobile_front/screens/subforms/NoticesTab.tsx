import React from 'react';
import { View } from 'react-native';
import { styles } from '../styles/styles';
import { type Notice } from '../../services/dataService';
import { SectionTitle } from '../components/SectionTitle';
import { NoticeItem } from '../components/NoticeItem';

interface NoticesTabProps {
    notices: Notice[];
}

export const NoticesTab: React.FC<NoticesTabProps> = ({ notices }) => {
    return (
        <View>
            <SectionTitle icon="bullhorn" title="공지사항 및 뉴스" />
            {notices.map((n, idx) => (
                <NoticeItem
                    key={idx}
                    title={n.title}
                    category={n.category}
                    date={n.date}
                    description={n.description}
                    organization={n.organization}
                />
            ))}
        </View>
    );
};