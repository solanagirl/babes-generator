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


export function Header() {
  const isDarkMode = useColorScheme() === 'dark';
  return (
    <View style={styles.container} >
      <Text style={styles.baseText}>
        <Text style={styles.title}>
          Hello Amy!
        </Text>
      </Text>
      <TouchableOpacity activeOpacity={0.5}>
        <View style={styles.Button}>
          <Image style={{height:30, width:30}} source={require('../img/settings.png')} tintColor={Colors.font}></Image>
        </View>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingTop: 30,
    paddingHorizontal: 30,
    backgroundColor: Colors.background,
    flexDirection:'row',
    justifyContent:'space-between',
  },
  baseText: {
    fontFamily: 'Nunito',
  },
  title: {
    color: Colors.font,
    fontSize: 30,
    fontWeight: '900',
  },
  Button: {
    padding: 7.5, 
    borderRadius: 30,
    backgroundColor: Colors.component,
  }
});
