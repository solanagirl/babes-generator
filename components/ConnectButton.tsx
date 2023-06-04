import {transact} from '@solana-mobile/mobile-wallet-adapter-protocol-web3js';
import React, {ComponentProps, useState, useCallback} from 'react';
import {Button, Pressable, StyleSheet, View, Text, TouchableOpacity} from 'react-native';

import {useAuthorization} from './providers/AuthorizationProvider';
import {useConnection} from './providers/ConnectionProvider';
import {Colors} from './Colors';
import LinearGradient from 'react-native-linear-gradient';

type Props = Readonly<ComponentProps<typeof Button>>;

export default function ConnectButton(props: Props) {
  const {authorizeSession} = useAuthorization();
  const [authorizationInProgress, setAuthorizationInProgress] = useState(false);
  const handleConnectPress = useCallback(async () => {
    try {
      if (authorizationInProgress) {
        return;
      }
      setAuthorizationInProgress(true);
      await transact(async wallet => {
        await authorizeSession(wallet);
      });
    } finally {
      setAuthorizationInProgress(false);
    }
  }, [authorizationInProgress, authorizeSession]);
  return (
    <TouchableOpacity // was originally pressable component
      activeOpacity={0.5} 
      {...props}
      disabled={authorizationInProgress}
      onPress={handleConnectPress}
      style={{ justifyContent: 'center', alignItems: 'center', paddingTop: 30}}>
      {/* <View style={styles.glow}></View> */}
      <LinearGradient 
        colors={[Colors.purple, Colors.blue, Colors.mint]} 
        start={{x: 0.2, y: 0}} 
        end={{x: 1, y: 1.8}}
        // locations={[0,0.5,0.6]} 
        style={styles.button}>
        <Text style={styles.baseText}>
          <Text style={styles.text}>
            Connect Wallet
          </Text>
        </Text>
      </LinearGradient>
    </TouchableOpacity>
  );
}

export const styles = StyleSheet.create(({
  button: {
    borderRadius: 30,
    height: 80,
    justifyContent: 'center',
    padding: 20,
  },
  text: {
    color: Colors.font,
    textAlign: 'center',
    fontSize: 20,
    fontWeight: 'bold',
  },
  baseText: {
    fontFamily: 'Nunito',
  },
  // glow: {
  //   borderColor: '#BA2C73',
  //   borderWidth: 4,
  //   width: '90%',
  //   height: '75%',
  //   position: 'absolute',
  //   shadowOffset: {width: -1, height: 1},
  //   flexGrow: 1,
  //   borderRadius: 24,
  //   zIndex: 1,
  // }
}))