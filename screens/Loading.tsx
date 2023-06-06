import React from 'react';
import {ImageBackground, StyleSheet} from 'react-native';

import LoadingComponent from '../components/Loading'

export default function Loading({ navigation }: any) {
    return (
        <ImageBackground source={require('../img/backgroundGradient.png')} style={styles.backgroundImage}>
            <LoadingComponent/>
        </ImageBackground>
    )
};

const styles = StyleSheet.create({
  backgroundImage: {
    flex: 1,
    width: '100%',
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  }
});