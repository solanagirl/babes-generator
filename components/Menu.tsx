import {transact} from '@solana-mobile/mobile-wallet-adapter-protocol-web3js';
import React, {ComponentProps, useState, useCallback} from 'react';
import {Button, Image, ImageSourcePropType, Pressable, StyleSheet, View} from 'react-native';

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
                <Pressable style={styles.button} onPress={() => {setExpanded(!expanded)}}>
                    <Image source={require('../img/stake.png')} style={styles.icon}/>
                </Pressable>
                <View style={styles.buttonGroup}>
                    <Pressable style={styles.smallButton} onPress={() => {setExpanded(!expanded); navigation.navigate('NewHabit')}}>
                        <Image source={require('../img/add.png')} style={styles.icon}/>
                    </Pressable>
                    <Pressable style={styles.smallButton} onPress={() => {setExpanded(!expanded)}}>
                        <Image source={require('../img/calendar.png')} style={styles.icon}/>
                    </Pressable>
                    <Pressable style={styles.smallButton} onPress={() => {setExpanded(!expanded)}}>
                        <Image source={require('../img/analytics.png')} style={styles.icon}/>
                    </Pressable>
                </View>
            </View>
    
        )
    } else {
        return (
            <View style={styles.container}>
                <Pressable style={styles.button} onPress={() => {setExpanded(!expanded)}}>
                    <Image source={require('../img/stake.png')} style={styles.icon}/>
                </Pressable>
            </View>
            );        
    }
}

const styles = StyleSheet.create({
    container: {
      position: 'absolute',
      bottom: 0,
      right: 0,
      paddingEnd: 24,
      paddingBottom: 48,
      flex: 1,
      flexDirection: 'column-reverse',
      alignItems: 'center',
      zIndex: 1,
      elevation: 1
    },
    button: {
        height: 81,
        width: 81,
        padding: 2,
        backgroundColor: '#C1B2C7',
        borderRadius: 360,
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',  
        elevation: 1
    },
    smallButton: {
        width: 64,
        height: 38,  
        backgroundColor: '#C1B2C7',
        borderRadius: 360,
        marginBottom: 24,
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',  
        elevation: 1
    },
    icon: {
      resizeMode: 'contain',
      width: 48,
      height: 48,  
    },
    buttonGroup: {
      flexDirection: 'column',
      rowGap: 8
    },
  });
  
