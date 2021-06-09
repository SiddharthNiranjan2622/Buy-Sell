import { NavigationContainer } from '@react-navigation/native';
import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import AuthNavigation from './navigation/AuthNavigation';
import { navigationRef } from './navigation/rootNavigation';
import ChatScreen from './screens/ChatScreen';
import MyListing from './screens/MyListing';
import MyMessages from './screens/MyMessages';

export default function App() {

  return (
    <View style={styles.container}>
      <StatusBar style="auto" />

      <NavigationContainer ref={navigationRef} >

        <AuthNavigation />
      </NavigationContainer>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
