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
      onPress={handleConnectPress} style={styles.container}>
        {/* <View style={styles.glow}></View> */}
          <Text style={styles.text}>Connect Wallet</Text>
      </Pressable>
  );
}

export const styles = StyleSheet.create(({
  container: {
    backgroundColor: Colors.pink,
    borderRadius: 24,
    padding: 18,
    height: 91
  },
  text: {
    color: Colors.font,
    textAlign: 'center',
    width: '100%',
    height: '100%',
    textAlignVertical: 'center',
    fontSize: 20,
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