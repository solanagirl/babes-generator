import { ConnectionProvider } from './components/providers/ConnectionProvider';
import { clusterApiUrl } from '@solana/web3.js';
import React, { useEffect, useState } from 'react';
import { SafeAreaView, StyleSheet, Platform } from 'react-native';
import { AuthorizationProvider } from './components/providers/AuthorizationProvider';
import { Header } from './components/Header';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import {Provider as PaperProvider} from 'react-native-paper';
import PushNotification from 'react-native-push-notification';

import MainScreen from './screens/MainScreen';
import Create from './screens/Create';

import { Colors } from './components/Colors';
import Store from './screens/Store';
import Salon from './screens/Salon';

const ENDPOINT = clusterApiUrl('mainnet-beta');
const Stack = createNativeStackNavigator();

export default function App() {
  
  return (
    <ConnectionProvider
      config={{commitment: 'confirmed'}}
      endpoint={ENDPOINT}>
      <AuthorizationProvider>
        <NavigationContainer>
        <SafeAreaView style={styles.shell}>
          <PaperProvider>
            <Stack.Navigator>
              <Stack.Screen
                name="Home"
                component={MainScreen}
                options={{ header: (props) => <Header date={true}></Header> }}
              />
              <Stack.Screen name="Salon" component={Salon} options={{ header: (props) => <Header date={false}></Header> }} />
              <Stack.Screen name="Store" component={Store} options={{ header: (props) => <Header date={false}></Header> }} />
              <Stack.Screen name="Create" component={Create} options={{ header: (props) => <Header date={false}></Header> }} />
            </Stack.Navigator>
            </PaperProvider>
          </SafeAreaView>
        </NavigationContainer>
      </AuthorizationProvider>
    </ConnectionProvider>
  );
}

const styles = StyleSheet.create({
  shell: {
    height: '100%',
    backgroundColor: Colors.black,
  },
});
