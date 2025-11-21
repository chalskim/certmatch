import React from 'react';
import { View, ScrollView } from 'react-native';
import { styles } from '../styles/styles';
import {
    type Course,
    type RecommendedCourse
} from '../../services/dataService';
import { SectionTitle } from '../components/SectionTitle';
import { RecommendedEducationCard } from '../components/RecommendedEducationCard';
import { EducationCard } from '../components/EducationCard';

interface EducationTabProps {
    recommendedCourses: RecommendedCourse[];
    courses: Course[];
}

export const EducationTab: React.FC<EducationTabProps> = ({
    recommendedCourses,
    courses
}) => {
    return (
        <View>
            {/* 추천 교육 섹션 */}
            <View style={styles.recommendedEducationSection}>
                <SectionTitle icon="star" title="추천 교육" />
                <ScrollView horizontal showsHorizontalScrollIndicator={false} style={{ marginBottom: 12 }}>
                    {recommendedCourses.map((course: RecommendedCourse, index: number) => (
                        <RecommendedEducationCard
                            key={`recommended-course-${index}`}
                            title={course.title}
                            provider={course.provider}
                            duration={course.duration}
                            price={course.price}
                            tags={course.tags}
                            rating={course.rating}
                            students={course.students}
                            level={course.level}
                        />
                    ))}
                </ScrollView>
            </View>

            <SectionTitle icon="graduation-cap" title="전문 교육" />
            {courses
                .reduce((rows: Course[][], item: Course, index: number) => {
                    if (index % 2 === 0) rows.push([item]);
                    else rows[rows.length - 1].push(item);
                    return rows;
                }, [])
                .map((row: Course[], rowIdx: number) => (
                    <View
                        key={`course-row-${rowIdx}`}
                        style={{ flexDirection: 'row', justifyContent: 'space-between' }}
                    >
                        {row.map((course: Course, colIdx: number) => (
                            <EducationCard
                                key={`course-${course.title}-${colIdx}`}
                                title={course.title}
                                provider={course.provider}
                                period={course.duration}
                                price={course.price}
                                tags={course.tags}
                            />
                        ))}
                        {row.length === 1 && <View style={{ flex: 1, marginHorizontal: 6 }} />}
                    </View>
                ))}
        </View>
    );
};