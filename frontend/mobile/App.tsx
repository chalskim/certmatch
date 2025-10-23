import React, { useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaView, View, StyleSheet } from 'react-native';
import { Header } from './components/Header';
import { SideMenu } from './components/SideMenu';
import { HomeScreen } from './screens/HomeScreen';

export default function App() {
  const [menuVisible, setMenuVisible] = useState(false);

  return (
    <SafeAreaView style={styles.root}>
      <Header onMenuPress={() => setMenuVisible(true)} />
      <View style={styles.content}>
        <HomeScreen />
      </View>
      <SideMenu visible={menuVisible} onClose={() => setMenuVisible(false)} />
      <StatusBar style="auto" />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: '#fff',
  },
  content: {
    flex: 1,
  },
});
