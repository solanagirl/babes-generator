import {transact} from '@solana-mobile/mobile-wallet-adapter-protocol-web3js';
import React, {ComponentProps, useState, useCallback} from 'react';
import {Button, Image, ImageSourcePropType, Pressable, StyleSheet, TouchableOpacity, View} from 'react-native';
import { Colors } from "./Colors"

import {useAuthorization} from './providers/AuthorizationProvider';
import {useConnection} from './providers/ConnectionProvider';

type Props = {
    navigation: any
}

export const Menu = ({navigation}: Props) => {
    const [expanded, setExpanded] = useState(false);

    if (expanded) {
        return (
            <View style={styles.container}>
                <TouchableOpacity activeOpacity={0.5} style={styles.button} onPress={() => {setExpanded(!expanded)}}>
                    <Image source={require('../img/menu-regular-24.png')} style={styles.iconLarge} tintColor={Colors.font}/>
                </TouchableOpacity>
                <View style={styles.buttonGroup}>
                    <TouchableOpacity activeOpacity={0.5} style={styles.smallButton} onPress={() => {setExpanded(!expanded); navigation.navigate('NewHabit')}}>
                        <Image source={require('../img/plus-regular-24.png')} style={styles.icon} tintColor={Colors.font}/>
                    </TouchableOpacity>
                    <TouchableOpacity activeOpacity={0.5} style={styles.smallButton} onPress={() => {setExpanded(!expanded); navigation.navigate('Calendar')}}>
                        <Image source={require('../img/calendar-regular-24.png')} style={styles.icon} tintColor={Colors.font}/>
                    </TouchableOpacity>
                    <TouchableOpacity activeOpacity={0.5} style={styles.smallButton} onPress={() => {setExpanded(!expanded); navigation.navigate('Analytics')}}>
                        <Image source={require('../img/line-chart-regular-24.png')} style={styles.icon} tintColor={Colors.font}/>
                    </TouchableOpacity>
                    <TouchableOpacity activeOpacity={0.5} style={styles.smallButtonBottom} onPress={() => {setExpanded(!expanded); navigation.navigate('Home')}}>
                        <Image source={require('../img/home-alt-2-regular-24.png')} style={styles.icon} tintColor={Colors.font}/>
                    </TouchableOpacity>
                </View>
            </View>
    
        )
    } else {
        return (
            <View style={styles.container}>
                <TouchableOpacity activeOpacity={0.5} style={styles.button} onPress={() => {setExpanded(!expanded)}}>
                    <Image source={require('../img/menu-regular-24.png')} style={styles.iconLarge} tintColor={Colors.font}/>
                </TouchableOpacity>
            </View>
        );        
    }
}

const styles = StyleSheet.create({
    container: {
      position: 'absolute',
      bottom: 0,
      right: 0,
      paddingEnd: 30,
      paddingBottom: 30,
      flex: 1,
      flexDirection: 'column-reverse',
      alignItems: 'center',
      zIndex: 1,
    },
    button: {
        height: 80,
        width: 80,
        backgroundColor: Colors.component,
        borderRadius: 999,
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center', 
    },
    smallButton: {
        width: 60,
        height: 40,  
        backgroundColor: Colors.component,
        borderRadius: 999,
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',  
    },
    smallButtonBottom: {
        width: 60,
        height: 40,  
        backgroundColor: Colors.component,
        borderRadius: 999,
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',  
        elevation: 1,
        marginBottom: 20
    },
    icon: {
      resizeMode: 'contain',
      width: 30,
    },
    iconLarge: {
        resizeMode: 'contain',
        width: 40,
    },
    buttonGroup: {
      flexDirection: 'column',
      rowGap: 20
    },
  });
  
