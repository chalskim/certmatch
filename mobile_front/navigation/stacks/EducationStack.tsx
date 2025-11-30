import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

// 교육 관련 화면들 import
import EducationList from '../../screens/menu/EducationList';
import EducationListDetail from '../../screens/menu/EducationListDetail';
import EduListDetail from '../../screens/menu/EduListDetail';
import InputEducationRegistration from '../../screens/menu/InputEducationRegistration';

const Stack = createNativeStackNavigator();

export const EducationStack = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="EducationList" component={EducationList} />
      <Stack.Screen name="EducationListDetail" component={EducationListDetail} />
      <Stack.Screen name="EduListDetail" component={EduListDetail} />
      <Stack.Screen name="InputEducationRegistration" component={InputEducationRegistration} />
    </Stack.Navigator>
  );
};