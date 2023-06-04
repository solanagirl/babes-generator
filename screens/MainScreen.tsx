import React, {useCallback, useEffect, useState} from 'react';
import {Image, ImageBackground, Pressable, ScrollView, StyleSheet, Text, View} from 'react-native';

import {
  useAuthorization,
  Account,
} from '../components/providers/AuthorizationProvider';
import {useConnection} from '../components/providers/ConnectionProvider';
import ConnectButton from '../components/ConnectButton';
import DisconnectButton from '../components/DisconnectButton';
import { Habit } from '../components/Habit';
import { Menu } from '../components/Menu'
import { Colors } from '../components/Colors'
import { findNFT } from '../src';

export default function MainScreen({ navigation }: any) {
  const {connection} = useConnection();
  const {selectedAccount} = useAuthorization();
  const [balance, setBalance] = useState<number | null>(null);
  const [nfts, setNFTs] = useState<any>([]);
  const [loading, setLoading] = useState(false);

  const fetchAndUpdateBalance = useCallback(
    async (account: Account) => {
      console.log('Fetching balance for: ' + account.publicKey);
      const fetchedBalance = await connection.getBalance(account.publicKey);
      console.log('Balance fetched: ' + fetchedBalance);
      setBalance(fetchedBalance);
      setLoading(true)
      const data = await findNFT(account.publicKey);
      setNFTs(await data.results);
      setLoading(false)
    },
    [balance],
  );

  useEffect(() => {
    if (!selectedAccount) {
      return;
    }
    fetchAndUpdateBalance(selectedAccount);
  }, [fetchAndUpdateBalance, selectedAccount]);


  if (loading) {
    return (
      <View style={styles.contentContainer}>
        <Text style={styles.baseText}>
          <Text style={styles.title}>Loading...</Text>
        </Text>
      </View>
    )
  } else {
    return (
      <ImageBackground source={require('../img/backgroundGradient.png')} style={styles.backgroundImage}>
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
            selectedAccount ? (
              <View style={styles.contentContainer}>
              <Text style={styles.baseText}>
                <Text style={styles.title}>Your {nfts.length} Habits</Text>
                  {
                    nfts?.map((nft: any, index: number) => {
                      return (
                        <Habit nft={nft} key={`${nft.name}_${index}`} imageURI={nft.image} name={nft.name} attributes={nft.attributes}/>
                      )
                    })
                  }
              </View>
            ) : (
              <Text style={styles.baseText}>
                <Text style={styles.title}>Connect your Solana Wallet{"\n"}to view your habits.</Text>
              </Text>
            )
          }
          {
            selectedAccount ? (
              <></>
              // <Menu navigation={navigation}/>
            ): (
              // <></>
              <Menu navigation={navigation}/>
            )
          }
    </View>
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
    gap: 10,
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
