import React from 'react';
import {
  Button,
  ImageBackground,
  StyleSheet,
  Text,
  useColorScheme,
  View,
} from 'react-native';
import {Colors} from './Colors';


export function Header() {
  const isDarkMode = useColorScheme() === 'dark';
  return (
    <View style={styles.container}>
      <Text style={styles.baseText}>
        <Text style={styles.title}>
          Hello Amy!
        </Text>
      </Text>
      <Button color={Colors.component} title="ajwdoa"/>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingTop: 25,
    paddingHorizontal: 40,
    backgroundColor: Colors.background,
  },
  baseText: {
    fontFamily: 'Nunito',
  },
  title: {
    color: Colors.font,
    fontSize: 32,
    fontWeight: 'bold',
  },
});
