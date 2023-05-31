import React from 'react';
import {
  ImageBackground,
  StyleSheet,
  Text,
  useColorScheme,
  View,
} from 'react-native';
import {Colors} from './Colors';

export function Habit() {
  const isDarkMode = useColorScheme() === 'dark';
  return (
    <View style={styles.container}>
      <Text style={styles.title}>stabit</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingTop: 24,
    paddingHorizontal: 24,
    height: 150,
    width: '50%',
    backgroundColor: '#282F44',
    borderRadius: 12
  },
  title: {
    fontSize: 24,
    color: '#C1B2C7',
  }
});
