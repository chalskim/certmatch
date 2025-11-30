import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

// 전문가 관련 화면들 import
import ExpertProfessionalList from '../../screens/menu/ExpertProfessionalList';
import ProfessionalistDetail from '../../screens/menu/ProfessionalistDetail';
import InputExpertProfessional from '../../screens/menu/InputExpertProfessional';

const Stack = createNativeStackNavigator();

export const ExpertsStack = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="ExpertProfessionalList" component={ExpertProfessionalList} />
      <Stack.Screen name="ProfessionalistDetail" component={ProfessionalistDetail} />
      <Stack.Screen name="InputExpertProfessional" component={InputExpertProfessional} />
    </Stack.Navigator>
  );
};