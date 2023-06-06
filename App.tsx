import { ConnectionProvider } from './components/providers/ConnectionProvider';
import { clusterApiUrl } from '@solana/web3.js';
import React, { useEffect } from 'react';
import { SafeAreaView, StyleSheet, Platform } from 'react-native';
import { AuthorizationProvider } from './components/providers/AuthorizationProvider';
import { Header } from './components/Header';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import {Provider as PaperProvider} from 'react-native-paper';
import PushNotification from 'react-native-push-notification';

import MainScreen from './screens/MainScreen';
import NewHabit from './screens/NewHabit';
import Calendar from './screens/Calendar';

import { Colors } from './components/Colors';

const DEVNET_ENDPOINT = clusterApiUrl('devnet');
const Stack = createNativeStackNavigator();

export default function App() {
  PushNotification.createChannel(
    {
      channelId: 'default-channel', // Channel ID
      channelName: 'Default Channel', // Channel name
      channelDescription: 'A default notification channel', // Channel description
      soundName: 'default', // Sound for notifications (optional)
      importance: 4, // Importance level: 0 - 4 (0 being the lowest)
      vibrate: true, // Enable vibration
    },
    // Callback function
    (created) => console.log(`Notification channel '${created}' created`)
  );
  
  return (
    <ConnectionProvider
      config={{commitment: 'confirmed'}}
      endpoint={DEVNET_ENDPOINT}>
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
              <Stack.Screen name="NewHabit" component={NewHabit} options={{ header: (props) => <></> }} />
              <Stack.Screen name="Calendar" component={Calendar} options={{ header: (props) => <Header date={true}></Header> }} />
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
