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
  const currentDate = moment().format('MMM d, YYYY');
  //   const isDarkMode = useColorScheme() === 'dark';
  if (date) {
    return (
      <View style={styles.container}>
        <Text style={styles.baseText}>
          <Text style={styles.title}>
            {currentDate}
          </Text>
        </Text>
        <TouchableOpacity activeOpacity={0.5}>
          <View style={styles.Button}>
            <Image style={{height:30, width:30}} source={require('../img/cog-solid-24.png')} tintColor={Colors.font}></Image>
          </View>
        </TouchableOpacity>
      </View>
    ) ;
  } else {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>
        </Text>
      </View>
    );  
  }
}

const styles = StyleSheet.create({
  container: {
    paddingTop: 30,
    paddingHorizontal: 30,
    flexDirection:'row',
    justifyContent:'space-between',
  },
  baseText: {
    fontFamily: 'Nunito',
  },
  title: {
    color: Colors.font,
    fontSize: 30,
    fontWeight: 'bold',
  },
  Button: {
    padding: 7.5, 
    borderRadius: 30,
    backgroundColor: Colors.component,
  }
});
