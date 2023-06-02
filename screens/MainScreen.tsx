import React, {useCallback, useEffect, useState} from 'react';
import {Pressable, ScrollView, StyleSheet, Text, View} from 'react-native';

import {
  useAuthorization,
  Account,
} from '../components/providers/AuthorizationProvider';
import {useConnection} from '../components/providers/ConnectionProvider';
import ConnectButton from '../components/ConnectButton';
import { Habit } from '../components/Habit';
import { Menu } from '../components/Menu'
import { Colors } from '../components/Colors'
import { findNFT, underdog } from '../src';

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
    },
    [connection, balance],
  );

  useEffect(() => {
    if (!selectedAccount) {
      return;
    }
    fetchAndUpdateBalance(selectedAccount);
  }, [fetchAndUpdateBalance, selectedAccount]);

  useEffect(() => {
    if (!selectedAccount) {
      return;
    }
    async function findOwnedNFT() {
      setLoading(true)
      const data = await findNFT(selectedAccount?.publicKey);
      setNFTs(await data.results);
      console.log(nfts)
      setLoading(false)
    }
    findOwnedNFT();
  }, [balance]);

  if (loading) {
    return (
      <View style={styles.container}>
        <Text>Loading</Text>        
      </View>
    )
  } else {
    return (
      <View style={styles.container}>
        <View style={styles.mainContainer}>
          <Text style={styles.title}>Your habits and stakes, all in one place</Text>
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
                <Text style={styles.title}>Your {nfts.length} Habits</Text>
                  {
                    nfts?.map((nft: any, index: number) => {
                      return (
                        <Habit nft={nft} key={`${nft.name}_${index}`} imageURI={nft.image} name={nft.name} attributes={nft.attributes}/>
                      )
                    })
                  }
                  <Text style={styles.title}>Press and hold icon to complete check in.</Text>
                </View>
            ) : (
              <Text style={styles.title}>Connect your Solana wallet to view your habits</Text>
            )
          }
          {
            selectedAccount ? (
              <Menu navigation={navigation}/>
            ): (
              <></>
            )
          }
    </View>
  )};
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 48,
    paddingVertical: 12,
    backgroundColor: Colors.background,
    flex: 1,
    rowGap: 24,
    height: '100%'
  },
  mainContainer: {
    backgroundColor: Colors.component,
    paddingVertical: 24,
    paddingHorizontal: 32,
    borderRadius: 24,
    alignItems: "center",
  },
  title: {
    fontSize: 24,
    color: Colors.font,
    marginBottom: 12,
    fontFamily: 'Nunito',
    textAlign: 'center',
  },
  contentContainer: {
    gap: 8,
    paddingHorizontal: 8,
    marginVertical: 8,
  }
});
