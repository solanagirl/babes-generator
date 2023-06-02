import {transact} from '@solana-mobile/mobile-wallet-adapter-protocol-web3js';
import React, {ComponentProps, useState, useCallback} from 'react';
import {Button, Pressable, StyleSheet, View, Text} from 'react-native';

import {useAuthorization} from './providers/AuthorizationProvider';
import {useConnection} from './providers/ConnectionProvider';
import {Colors} from './Colors';

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
    <Pressable
      {...props}
      disabled={authorizationInProgress}
      onPress={handleConnectPress} style={styles.button}>
      {/* <View style={styles.glow}></View> */}
      <View style={styles.container}>
        <Text style={styles.text}>Connect Wallet</Text>
      </View>
    </Pressable>
  );
}

export const styles = StyleSheet.create(({
  button: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Colors.purple,
  },
  container: {
    backgroundColor: Colors.pink,
    borderRadius: 30,
    padding: 20,
    width: '100%',
    height: '100%'
  },
  text: {
    color: Colors.font,
    textAlign: 'center',
    width: '100%',
    height: '100%',
    textAlignVertical: 'center',
    fontSize: 20,
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