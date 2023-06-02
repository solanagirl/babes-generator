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
import moment from 'moment';

type Props = {
  date: boolean
}
export function Header({date}: Props) {
  const currentDate = moment().format("MM/DD/YYYY");

  if (date) {
    return (
      <View style={styles.container}>
        <Text style={styles.baseText}>
          <Text style={styles.title}>
            {currentDate}
          </Text>
        </Text>
      </View>
    );  
  } else {
    return (
      <View style={styles.container}>
      </View>
    );  
  }
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
