import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

// 기존 HomeScreen의 내용을 가져오되 Header/SideMenu는 제외
import { homeData } from './data/homeData';

export const ProjectsHiringHome = () => {
  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>단기 의뢰</Text>
        <Text style={styles.subtitle}>프로젝트 기반 전문가 매칭</Text>
      </View>

      {/* 추천 프로젝트 섹션 */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>긴급 의뢰</Text>
        <View style={styles.cardContainer}>
          {homeData.urgentProjects?.map((project, index) => (
            <TouchableOpacity key={index} style={styles.card}>
              <View style={styles.cardHeader}>
                <Ionicons name="flash" size={20} color="#FF6B6B" />
                <Text style={styles.urgency}>{project.urgency}</Text>
              </View>
              <Text style={styles.cardTitle}>{project.title}</Text>
              <Text style={styles.company}>{project.company}</Text>
              <View style={styles.cardFooter}>
                <Text style={styles.budget}>{project.budget}</Text>
                <Text style={styles.duration}>{project.duration}</Text>
              </View>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      {/* 카테고리별 의뢰 */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>분야별 의뢰</Text>
        <View style={styles.categoryGrid}>
          {homeData.categories?.map((category, index) => (
            <TouchableOpacity key={index} style={styles.categoryCard}>
              <Ionicons name={category.icon as any} size={24} color="#0066CC" />
              <Text style={styles.categoryName}>{category.name}</Text>
              <Text style={styles.categoryCount}>{category.count}개</Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f9fa',
  },
  header: {
    padding: 20,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#e9ecef',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 14,
    color: '#666',
  },
  section: {
    padding: 20,
    backgroundColor: '#fff',
    marginBottom: 10,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 15,
  },
  cardContainer: {
    flexDirection: 'column',
    gap: 12,
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 16,
    borderWidth: 1,
    borderColor: '#e9ecef',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  urgency: {
    fontSize: 12,
    color: '#FF6B6B',
    fontWeight: '600',
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginBottom: 4,
  },
  company: {
    fontSize: 14,
    color: '#666',
    marginBottom: 8,
  },
  cardFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  budget: {
    fontSize: 14,
    fontWeight: '600',
    color: '#0066CC',
  },
  duration: {
    fontSize: 12,
    color: '#666',
  },
  categoryGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    gap: 12,
  },
  categoryCard: {
    width: '48%',
    backgroundColor: '#f8f9fa',
    borderRadius: 8,
    padding: 16,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#e9ecef',
  },
  categoryName: {
    fontSize: 14,
    fontWeight: '600',
    color: '#333',
    marginTop: 8,
    marginBottom: 4,
  },
  categoryCount: {
    fontSize: 12,
    color: '#666',
  },
});