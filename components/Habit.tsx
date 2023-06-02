import React, { useEffect } from 'react';
import {
  ImageBackground,
  StyleSheet,
  Text,
  useColorScheme,
  View,
} from 'react-native';
import getMetadata from '../src/ownedNFT';
import { useAuthorization } from './providers/AuthorizationProvider';
import { Colors } from './Colors';

export function Habit() {
  const { selectedAccount } = useAuthorization();

  useEffect(() => {
    async function getHabits() {
      const tokens = await getMetadata(selectedAccount, '');
      console.log(tokens)
    };
    getHabits();
  })

  return (
    <View style={styles.container}>
      <Text style={styles.title}>stabit</Text>
      <Text style={styles.text}>asdasda</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 24,
    height: 150,
    width: '30%',
    backgroundColor: Colors.component,
    borderRadius: 30,
  },
  text: {
    color: Colors.font,
  },
  title: {
    fontSize: 24,
    fontFamily: "Nunito",
    color: Colors.font,
  }
});
