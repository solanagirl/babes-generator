import React, {useCallback, useEffect, useState} from 'react';
import {Image, RefreshControl, ImageBackground, ScrollView, StyleSheet, Text, View, Touchable, TouchableOpacity} from 'react-native';

import {
  useAuthorization,
  Account,
} from '../components/providers/AuthorizationProvider';
import {useConnection} from '../components/providers/ConnectionProvider';
import ConnectButton from '../components/ConnectButton';
import DisconnectButton from '../components/DisconnectButton';
import { Menu } from '../components/Menu'
import { Colors } from '../components/Colors'
import { findNFT, getStakedNFTs } from '../src';
import NotificationButton from '../components/NotificationButton';
import { useGuardedCallback } from '../src/useGuardedCallback';
import { transact } from '@solana-mobile/mobile-wallet-adapter-protocol-web3js';

export default function MainScreen({ navigation }: any) {
  const {connection} = useConnection();
  const {authorizeSession, selectedAccount} = useAuthorization();
  const [balance, setBalance] = useState<number | null>(null);
  const [nfts, setNFTs] = useState<any>([]);
  const [stakedNFTs, setStakedNFTs] = useState<any>([]);
  const [authorizationInProgress, setAuthorizationInProgress] = useState(false);

  const fetchAndUpdateBalance = useGuardedCallback(
    async (account: Account) => {
      console.log('Fetching balance for: ' + account.publicKey);
      const fetchedBalance = await connection.getBalance(account.publicKey);
      console.log('Balance fetched: ' + fetchedBalance);
      setBalance(fetchedBalance);
    },
    [balance],
  );


  useEffect(() => {
    if (!selectedAccount) {
      return;
    }
    fetchAndUpdateBalance(selectedAccount);
  }, [fetchAndUpdateBalance, selectedAccount]);

    return (
      <ImageBackground source={require('../img/bg-pattern-4.jpg')} style={styles.backgroundImage}>
        <Image source={require('../img/banner.png')} style={styles.banner}/>
        <View style={styles.container}>
          <View style={styles.mainContainer}>
            <TouchableOpacity onPress={() => {navigation.navigate('Create')}}>
              <Text style={styles.title}>
              Make a Babe
              </Text>
            </TouchableOpacity>
          </View>
        <View style={styles.mainContainer}>
          <Text style={[styles.baseText, styles.title]}>
            See your Babes
          </Text>
          {
            selectedAccount ? (
              <></>
            ) : (
              <ConnectButton title='Connect'/>
            )
          }
        </View>
        </View>
        {
          selectedAccount ? (
              <Menu navigation={navigation}/>
          ): (
            <></>
          )
        }
        <Menu navigation={navigation} />
    </ImageBackground>
  )};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 30,
    paddingVertical: 20,
    flex: 1,
    rowGap: 20,
    height: '100%',
    width: '100%',
  },
  mainContainer: {
    backgroundColor: Colors.component,
    padding: 30,
    borderRadius: 30,
    width: '100%',
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    fontSize: 20,
    color: Colors.font,
    fontWeight: 'bold',
    fontFamily: 'CarterOne'
  },
  contentContainer: {
    flex: 1,
    rowGap: 20,
    gap: 20,
  },
  baseText: {
    fontFamily: 'Nunito',
    textAlign: 'center',
  },
  backgroundImage: {
    width: '100%',
    height: '100%',
    objectFit: 'repeat',
  }, 
  banner: {
    width: '100%',
    height: 200,
  }
});
