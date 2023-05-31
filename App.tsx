import {ConnectionProvider} from './components/providers/ConnectionProvider';
import {clusterApiUrl} from '@solana/web3.js';
import React from 'react';
import {SafeAreaView, StyleSheet} from 'react-native';
import {AuthorizationProvider} from './components/providers/AuthorizationProvider';
import {Header} from './components/Header';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

import MainScreen from './screens/MainScreen';
import {Menu} from './components/Menu';
import NewHabit from './screens/NewHabit';

const DEVNET_ENDPOINT = clusterApiUrl('devnet');
const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <ConnectionProvider
      config={{commitment: 'processed'}}
      endpoint={DEVNET_ENDPOINT}>
      <AuthorizationProvider>
        <NavigationContainer>
        <SafeAreaView style={styles.shell}>
          <Stack.Navigator>
            <Stack.Screen
              name="stabit"
              component={MainScreen}
              options={{ header: (props) => <Header></Header> }}
            />
            <Stack.Screen name="NewHabit" component={NewHabit} options={{ header: (props) => <Header></Header> }} />
          </Stack.Navigator>
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
