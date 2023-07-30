import React from 'react';
import {
  TouchableOpacity,
  ImageBackground,
  Image,
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
  return (
    <ImageBackground source={require('../img/backgroundGradient.png')} style={styles.backgroundImage}>
      <View style={styles.container}>
        <Image source={require('../img/BabesGenerator.png')} style={styles.logo} />
      </View>
    </ImageBackground>
  ) ;
}

const styles = StyleSheet.create({
  container: {
    paddingTop: 8,
    flexDirection:'row',
    justifyContent:'space-between',
  },
  logo: {
    width: 300,
    height: 100,
    resizeMode: 'contain'
  },
  backgroundImage: {
  }
});
