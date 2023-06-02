import React, {useCallback, useEffect, useState} from 'react';
import {ScrollView, StyleSheet, Text, View} from 'react-native';

import {
  useAuthorization,
  Account,
} from '../components/providers/AuthorizationProvider';
import {useConnection} from '../components/providers/ConnectionProvider';
import ConnectButton from '../components/ConnectButton';
import { Habit } from '../components/Habit';
import { Menu } from '../components/Menu'
import { Colors } from '../components/Colors'

export default function MainScreen({ navigation }: any) {
  const {connection} = useConnection();
  const {selectedAccount} = useAuthorization();
  const [balance, setBalance] = useState<number | null>(null);

  const fetchAndUpdateBalance = useCallback(
    async (account: Account) => {
      console.log('Fetching balance for: ' + account.publicKey);
      const fetchedBalance = await connection.getBalance(account.publicKey);
      console.log('Balance fetched: ' + fetchedBalance);
      setBalance(fetchedBalance);
    },
    [connection],
  );

  useEffect(() => {
    if (!selectedAccount) {
      return;
    }
    fetchAndUpdateBalance(selectedAccount);
  }, [fetchAndUpdateBalance, selectedAccount]);

  return (
    <View style={styles.container}>
      <View style={styles.mainContainer}>
        <Text style={styles.title}>Your habits and stakes, all in one place</Text>
        {
          selectedAccount ? (
            <View>
              <Text>Your Balance: {balance} SOL</Text>
              <Text>Connected to: {selectedAccount.publicKey.toBase58()}</Text>
            </View>
          ) : (
            <ConnectButton title='Connect to view data' />
          )
        }
      </View>
      {
          selectedAccount ? (
            <Text style={styles.title}>Connect your Solana wallet to view your habits</Text>
            // <View>
            //   <Text style={styles.title}>Your Habits</Text>
            //   <ScrollView contentContainerStyle={styles.contentContainer} horizontal={true} showsHorizontalScrollIndicator={true} fadingEdgeLength={100} persistentScrollbar={true}>
            //     <Habit />
            //     <Habit />
            //     <Habit />
            //   </ScrollView>
            //   </View>
          ) : (
            // <Text style={styles.title}>Connect your Solana wallet to view your habits</Text>
            <View>
              <Text style={styles.title}>Your Habits</Text>
              <ScrollView contentContainerStyle={styles.contentContainer} horizontal={true} showsHorizontalScrollIndicator={false} fadingEdgeLength={50} persistentScrollbar={true}>
                <Habit />
                <Habit />
                <Habit />
              </ScrollView>
            </View>
          )
        }
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 30,
    paddingVertical: 12,
    backgroundColor: Colors.background,
    flex: 1,
    rowGap: 24
  },
  mainContainer: {
    backgroundColor: Colors.component,
    paddingVertical: 20,
    paddingHorizontal: 20,
    borderRadius: 30,
    height: 200,
    alignItems: "center",
  },
  title: {
    fontSize: 20,
    color: Colors.font,
    marginBottom: 12,
    fontFamily: 'Nunito',
    textAlign: 'center',
  },
  contentContainer: {
    gap: 10,
    marginVertical: 10,
  }
});
