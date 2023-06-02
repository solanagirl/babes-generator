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

export default function Analytics({ navigation }: any) {
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
      <Text>Analytics</Text>
    </View>
  );
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
  }
});
