import {ConnectionProvider} from './components/providers/ConnectionProvider';
import {clusterApiUrl} from '@solana/web3.js';
import React from 'react';
import {SafeAreaView, StyleSheet} from 'react-native';
import {AuthorizationProvider} from './components/providers/AuthorizationProvider';
import {Header} from './components/Header';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {Provider as PaperProvider} from 'react-native-paper';

import MainScreen from './screens/MainScreen';
import NewHabit from './screens/NewHabit';
import Calendar from './screens/Calendar';

const DEVNET_ENDPOINT = clusterApiUrl('devnet');
const Stack = createNativeStackNavigator();

export default function App() {
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
    backgroundColor: '#191D32',
  },
});
