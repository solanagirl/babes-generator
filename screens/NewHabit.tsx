import React, {useCallback, useEffect, useState} from 'react';
import {ScrollView, StyleSheet, Text, View, Pressable, TextInput} from 'react-native';

import {Section} from '../components/Section';
import ConnectButton from '../components/ConnectButton';
import AccountInfo from '../components/AccountInfo';
import {
  useAuthorization,
  Account,
} from '../components/providers/AuthorizationProvider';
import {useConnection} from '../components/providers/ConnectionProvider';
import DisconnectButton from '../components/DisconnectButton';
import RequestAirdropButton from '../components/RequestAirdropButton';
import SignMessageButton from '../components/SignMessageButton';
import SignTransactionButton from '../components/SignTransactionButton';
import { Menu } from '../components/Menu';

export default function NewHabit({navigation}: any) {
  const {connection} = useConnection();
  const {selectedAccount} = useAuthorization();
  const [balance, setBalance] = useState<number | null>(null);
  const [newOrQuit, setNewOrQuit] = useState('');
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [state, setState] = useState('');
  const [frequency, setFrequency] = useState('');

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

  switch (state) {
    case 'info':
      return (
        <View style={styles.mainContainer}>
          <Menu navigation={navigation}/>
          <Text style={styles.subtitle}>Track your new beginnings.</Text>
          <TextInput onChangeText={(text) => {setName(text)}} placeholder='Name your habit' value={name} style={styles.input}></TextInput>
          <TextInput onChangeText={(text) => {setDescription(text)}} placeholder='Describe your goals' value={description} style={styles.inputLong} multiline={true}></TextInput>
          <Text>How often shall we check in?</Text>
          <View style={styles.buttonRow}>
            <Pressable onPress={() => {setFrequency('daily')}} style={frequency == 'daily' ? styles.buttonPressed : styles.button}>
              <Text>Daily</Text>
            </Pressable>
            
            <Pressable onPress={() => {setFrequency('weekly')}} style={frequency == 'weekly' ? styles.buttonPressed : styles.button}>
              <Text>Weekly</Text>
            </Pressable>
            
            <Pressable onPress={() => {setFrequency('monthly')}} style={frequency == 'monthly' ? styles.buttonPressed : styles.button}>
              <Text>Monthly</Text>
            </Pressable>
          </View>
          {
              frequency !== '' ? (
                <Pressable
                onPress={() => {setState('info')}} style={styles.nextButton}>
                  <View style={frequency !== '' && name !== '' && description !=='' ? styles.glow : styles.disabled}></View>
                    <Text style={styles.text}>Next</Text>
                </Pressable>
          
              ) : (
                <></>
              )
            }
        </View>
      )
    default:
      return (
        <>
          <View style={styles.mainContainer}>
            <Menu navigation={navigation}/>
            <Text style={styles.subtitle}>What is your goal?</Text>
            <Pressable style={newOrQuit == 'new' ? styles.buttonPressed : styles.button} onPress={() => {setNewOrQuit('new'); setState('selected')}}>
              <Text style={styles.buttonText}>Start something new</Text>
            </Pressable>
            <Pressable style={newOrQuit == 'quit' ? styles.buttonPressed : styles.button}>
              <Text style={styles.buttonText} onPress={() => {setNewOrQuit('quit'); setState('selected')}}>Quit an Old Habit</Text>
            </Pressable>
            {
              state == 'selected' ? (
                <Pressable
                onPress={() => {setState('info')}} style={styles.button}>
                  <View style={styles.glow}></View>
                    <Text style={styles.text}>Next</Text>
                </Pressable>
          
              ) : (
                <></>
              )
            }
          </View>
        </>
      );    
  }
}

const styles = StyleSheet.create({
  mainContainer: {
    padding: 16,
    flex: 1,
    backgroundColor: '#191D32',
    paddingHorizontal: 48,
    paddingVertical: 24,
    paddingBottom: 169,
    rowGap: 16,
  },
  subtitle: {
    fontSize: 24,
    color: '#C1B2C7'
  },
  button: {
    backgroundColor: '#282F44',
    paddingVertical: 12,
    borderRadius: 12,
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center'

  },
  buttonPressed: {
    backgroundColor: '#BA2C73',
    paddingVertical: 12,
    borderRadius: 12,
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center'
  },
  buttonText: {
    textAlign: 'center',
    fontSize: 18,
    color: '#C1B2C7'
  }, 
  nextButton: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center'
  },
  input: {
    height: 56,
    borderColor: '#453A49',
    backgroundColor: '#282F44',
    borderWidth: 2,
    borderRadius: 12,
    marginBottom: 16,
    paddingHorizontal: 18,
    fontSize: 18,
  },
  inputLong: {
    height: 128,
    borderColor: '#453A49',
    backgroundColor: '#282F44',
    borderWidth: 2,
    borderRadius: 12,
    marginBottom: 16,
    paddingHorizontal: 18,
    fontSize: 18,
    textAlignVertical: 'top',
  },
  container: {
    backgroundColor: '#453A49',
    borderRadius: 24,
    paddingVertical: 18,
    width: '100%',
    height: '100%'
  },
  text: {
    textAlign: 'center',
    width: '100%',
    height: '100%',
    textAlignVertical: 'center',
    fontSize: 20,
    color: '#C1B2C7'
  },
  glow: {
    borderColor: '#BA2C73',
    borderWidth: 4,
    width: '80%',
    height: '80%',
    position: 'absolute',
    shadowOffset: {width: -1, height: 1},
    flexGrow: 1,
    borderRadius: 24,
    zIndex: 1,
  },
  disabled: {
    backgroundColor: '#282F44',
    width: '80%',
    height: '80%',
    position: 'absolute',
    shadowOffset: {width: -1, height: 1},
    flexGrow: 1,
    borderRadius: 24,
  },
  buttonRow: {
    width: '100%',
    flex: 1,
    flexDirection: 'row',
    columnGap: 8
  }
});
