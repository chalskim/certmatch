import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { ProjectsHiringHome } from '../../screens/ProjectsHiringHome';

// 단기 의뢰 관련 화면들 import
import ExpertRecruitmentList from '../../screens/menu/ExpertRecruitmentList';
import ExpertRecruitmentListDetail from '../../screens/menu/ExpertRecruitmentListDetail';
import InputExpertRecruitment from '../../screens/menu/InputExpertRecruitment';

const Stack = createNativeStackNavigator();

export const ProjectsHiringStack = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="HomeScreen" component={ProjectsHiringHome} />
      <Stack.Screen name="ExpertRecruitmentList" component={ExpertRecruitmentList} />
      <Stack.Screen name="ExpertRecruitmentListDetail" component={ExpertRecruitmentListDetail} />
      <Stack.Screen name="InputExpertRecruitment" component={InputExpertRecruitment} />
    </Stack.Navigator>
  );
};