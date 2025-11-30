import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

// 커뮤니티/구인 관련 화면들 import
import NoticeNewsList from '../../screens/menu/NoticeNewsList';
import NoticeNewsReg from '../../screens/menu/NoticeNewsReg';
import NoticeItemlistDetail from '../../screens/menu/NoticeItemlistDetail';
import QnaList from '../../screens/menu/QnaList';

const Stack = createNativeStackNavigator();

export const CommunityStack = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="NoticeNewsList" component={NoticeNewsList} />
      <Stack.Screen name="NoticeNewsReg" component={NoticeNewsReg} />
      <Stack.Screen name="NoticeItemlistDetail" component={NoticeItemlistDetail} />
      <Stack.Screen name="QnaList" component={QnaList} />
    </Stack.Navigator>
  );
};