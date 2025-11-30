import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';

// Stack Navigators for each tab
import { ProjectsHiringStack } from './stacks/ProjectsHiringStack';
import { ExpertsStack } from './stacks/ExpertsStack';
import { EducationStack } from './stacks/EducationStack';
import { CommunityStack } from './stacks/CommunityStack';

const Tab = createBottomTabNavigator();

export const MainTabNavigator = () => {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName: keyof typeof Ionicons.glyphMap;

          if (route.name === 'ProjectsHiring') {
            iconName = focused ? 'briefcase' : 'briefcase-outline';
          } else if (route.name === 'Experts') {
            iconName = focused ? 'people' : 'people-outline';
          } else if (route.name === 'Education') {
            iconName = focused ? 'school' : 'school-outline';
          } else if (route.name === 'Community') {
            iconName = focused ? 'chatbubbles' : 'chatbubbles-outline';
          } else {
            iconName = 'help-outline';
          }

          return <Ionicons name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: '#0066CC',
        tabBarInactiveTintColor: 'gray',
        headerShown: false,
      })}
    >
      <Tab.Screen
        name="ProjectsHiring"
        component={ProjectsHiringStack}
        options={{ title: '단기 의뢰' }}
      />
      <Tab.Screen
        name="Experts"
        component={ExpertsStack}
        options={{ title: '전문가' }}
      />
      <Tab.Screen
        name="Education"
        component={EducationStack}
        options={{ title: '교육' }}
      />
      <Tab.Screen
        name="Community"
        component={CommunityStack}
        options={{ title: '구인' }}
      />
    </Tab.Navigator>
  );
};