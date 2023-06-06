import React, {useCallback, useEffect, useState} from 'react';
import {Image, RefreshControl, ImageBackground, ScrollView, StyleSheet, Text, View} from 'react-native';

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
import { UnstakedHabit } from '../components/UnstakedHabit';
import { StakedHabit } from '../components/StakedHabit';
import { useGuardedCallback } from '../src/useGuardedCallback';
import { transact } from '@solana-mobile/mobile-wallet-adapter-protocol-web3js';

export default function MainScreen({ navigation }: any) {
  const {connection} = useConnection();
  const {authorizeSession, selectedAccount} = useAuthorization();
  const [balance, setBalance] = useState<number | null>(null);
  const [nfts, setNFTs] = useState<any>([]);
  const [loading, setLoading] = useState(false);
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

  const onRefresh = useCallback(async () => {
    setLoading(true)
    if (selectedAccount) {
      const data = await findNFT(selectedAccount.publicKey);
      setNFTs(await data.results);
      const stakedNFTs = await getStakedNFTs(selectedAccount.publicKey);
      setStakedNFTs(stakedNFTs.results);  
      setLoading(false)    
    }
}, [loading]);


  useEffect(() => {
    if (!selectedAccount) {
      return;
    }
    fetchAndUpdateBalance(selectedAccount);
  }, [fetchAndUpdateBalance, selectedAccount]);

  useEffect(() => {
    async function getNFTs() {
      if (selectedAccount) {
        setLoading(true)
        const data = await findNFT(selectedAccount!.publicKey);
        setNFTs(await data.results);
        const stakedNFTs = await getStakedNFTs(selectedAccount!.publicKey);
        setStakedNFTs(stakedNFTs.results);  
        setLoading(false)  
      }
    };
    getNFTs();
  }, [selectedAccount])
  if (loading) {
    return (
      <ImageBackground source={require('../img/backgroundGradient.png')} style={styles.backgroundImage}>
      <View style={styles.contentContainer}>
        <Text style={styles.baseText}>
          <Text style={styles.title}>Loading...</Text>
        </Text>
      </View>
      </ImageBackground>
    )
  } else {
    return (
      <ImageBackground source={require('../img/backgroundGradient.png')} style={styles.backgroundImage}>
        <ScrollView refreshControl={
          <RefreshControl refreshing={loading} onRefresh={onRefresh} />
        }>
        <View style={styles.container}>
        <View style={styles.mainContainer}>
          <Text style={styles.baseText}>
            <Text style={styles.title}>
              Your habits and stakes,{"\n"}all in one place.
            </Text>
          </Text>
          {
            selectedAccount ? (
              <></>
            ) : (
              <ConnectButton title='Connect'/>
            )
          }
        </View>
        {
          nfts.map((nft: any) => {
            return (
              <UnstakedHabit key={`${nft.name}_${nft.id}`} nft={nft}/>
            )
          })
        }
        {
          stakedNFTs.length ? (
            <View>
              <Text>Staked NFTs</Text>
              {
                stakedNFTs.map((nft: any) => {
                  return (
                    <StakedHabit key={`${nft.name}_${nft.id}`} nft={nft}/>
                  )
                })                
              }
              </View>
          ) : (
            <></>
          )
        }
        {
        }
        </View>
        </ScrollView>
        {
          selectedAccount ? (
              <Menu navigation={navigation}/>
          ): (
            <></>
          )
        }
    </ImageBackground>
  )};
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 30,
    paddingVertical: 20,
    backgroundColor: Colors.background,
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
    flex: 1,
    width: '100%',
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  }
});
