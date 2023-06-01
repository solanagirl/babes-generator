import React, {useCallback, useEffect, useState} from 'react';
import {ScrollView, StyleSheet, Text, View} from 'react-native';

import {
  useAuthorization,
  Account,
} from '../components/providers/AuthorizationProvider';
import {useConnection} from '../components/providers/ConnectionProvider';
import ConnectButton from '../components/ConnectButton';
import { Habit } from '../components/Habit';
import { Menu } from '../components/Menu';

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
    <>
    <View style={styles.container}>
      <View style={styles.mainContainer}>
        <Text style={styles.title}>Your habits and the stakes, all in one place</Text>
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
            <View>
              <Text style={styles.habitTitle}>Your Habits</Text>
              <ScrollView contentContainerStyle={styles.contentContainer} horizontal={true} showsHorizontalScrollIndicator={true} fadingEdgeLength={100} persistentScrollbar={true}>
                <Habit />
                <Habit />
                <Habit />
              </ScrollView>
              <Menu navigation={navigation}/>
              </View>
          ) : (
            <></>
          )
        }
    </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 48,
    paddingVertical: 12,
    backgroundColor: '#191D32',
    flex: 1,
    rowGap: 24
  },
  mainContainer: {
    backgroundColor: '#282F44',
    paddingVertical: 24,
    paddingHorizontal: 32,
    borderRadius: 24,
    height: 222
  },
  title: {
    fontSize: 24,
    color: '#C1B2C7',
    marginBottom: 12
  },
  contentContainer: {
    gap: 8,
    paddingHorizontal: 8
  },
  habitTitle: {
    fontSize: 24,
    color: '#C1B2C7',
  }
});
