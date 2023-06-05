import React, {useCallback, useEffect, useState} from 'react';
import {ScrollView, StyleSheet, Text, View, ImageBackground} from 'react-native';

import {
  useAuthorization,
  Account,
} from '../components/providers/AuthorizationProvider';
import {useConnection} from '../components/providers/ConnectionProvider';
import ConnectButton from '../components/ConnectButton';
import { Menu } from '../components/Menu'
import { Colors } from '../components/Colors'
import { findNFT, getStakedNFTs } from '../src';
import { Milestone } from '../components/Milestone';
import { StakedHabit } from '../components/StakedHabit';
import { UnstakedHabit } from '../components/UnstakedHabit';

export default function MainScreen({ navigation }: any) {
  const {connection} = useConnection();
  const {selectedAccount} = useAuthorization();
  const [balance, setBalance] = useState<number | null>(null);
  const [unstakedNFTs, setUnstakedNFTs] = useState<any>([]);
  const [stakedNFTs, setStakedNFTs] = useState([]);

  const fetchAndUpdateBalance = useCallback(
    async (account: Account) => {
      console.log('Fetching balance for: ' + account.publicKey);
      const fetchedBalance = await connection.getBalance(account.publicKey);
      console.log('Balance fetched: ' + fetchedBalance);
      setBalance(fetchedBalance);
      const data = await findNFT(account.publicKey);
      setUnstakedNFTs(await data.results);

      const stakedNFTs = await getStakedNFTs(account.publicKey);
      console.log(stakedNFTs)
      setStakedNFTs(stakedNFTs);
    },
    [connection, balance],
  );

  useEffect(() => {
    if (!selectedAccount) {
      return;
    }
    fetchAndUpdateBalance(selectedAccount);
  }, [fetchAndUpdateBalance, selectedAccount]);



  return (
    <ImageBackground source={require('../img/backgroundGradient.png')} style={styles.backgroundImage}>
    <View style={styles.container}>
        <Text>Upcoming Check Ins</Text>
        <View style={styles.contentContainer}>
            <Text>Habit 1 time date</Text>
            <Text>Habit 1 time date</Text>
            <Text>Habit 1 time date</Text>
        </View>
        <Text>Set Milestone</Text>
        <Text style={styles.title}>Your Milestones</Text>
        {
          unstakedNFTs?.map((nft: any) => {
            return (
              <UnstakedHabit key={`${nft.name}_${nft.id}`} nft={nft}/>
            )
          })
        }
        {
          stakedNFTs ? (
            <>
              <Text style={styles.title}>Your Staked Habits</Text>
              {
                stakedNFTs?.map((nft: any) => {
                  return (
                    <StakedHabit key={`${nft.name}_${nft.id}`} nft={nft}/>
                  )
                })
              }
            </>
          ) : (
            <></>
          )
        }
    </View>
    <Menu navigation={navigation}/>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 30,
    paddingVertical: 20,
    backgroundColor: Colors.background,
    flex: 1,
    rowGap: 24,
    height: '100%',
    width: "100%"
  },
  mainContainer: {
    backgroundColor: Colors.component,
    paddingVertical: 24,
    paddingHorizontal: 32,
    borderRadius: 24,
    height: 222,
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
  },
  backgroundImage: {
    flex: 1,
    width: '100%',
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  }
});
