

import React, {useCallback, useEffect, useState} from 'react';
import {ScrollView, StyleSheet, Text, View, Pressable, TextInput, Image} from 'react-native';

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
import { Habit } from '../components/Habit';

export default function NewHabit({navigation}: any) {
  const {connection} = useConnection();
  const {selectedAccount} = useAuthorization();
  const [balance, setBalance] = useState<number | null>(null);
  const [newOrQuit, setNewOrQuit] = useState('');
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [state, setState] = useState('');
  const [frequency, setFrequency] = useState('');
  const [icon, setIcon] = useState('');

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
    case 'nft': 
      return (
        <View style={styles.mainContainer}>
          <Menu navigation={navigation}/>
          <View>
            <Text style={styles.subtitle}>Choose an Icon!</Text>
            <ScrollView contentContainerStyle={styles.contentContainer} horizontal={true} showsHorizontalScrollIndicator={true} fadingEdgeLength={100} persistentScrollbar={true}>
              <Pressable style={icon == 'checklist' ? styles.iconBackgroundPressed : styles.iconBackground} onPress={() => {setIcon('checklist')}} >
                <Image source={require('../img/checklist.png')} alt='checklist' style={styles.icon}/>
              </Pressable>
              <Pressable style={icon == 'medicine' ? styles.iconBackgroundPressed : styles.iconBackground} onPress={() => {setIcon('medicine')}}>
                <Image source={require('../img/medicine.png')} alt='medicine' style={styles.icon}/>
              </Pressable>
              <Pressable style={icon == 'person' ? styles.iconBackgroundPressed : styles.iconBackground} onPress={() => {setIcon('person')}}>
                <Image source={require('../img/person.png')} alt='person' style={styles.icon}/>
              </Pressable>
              <Pressable style={icon == 'self-love' ? styles.iconBackgroundPressed : styles.iconBackground} onPress={() => {setIcon('self-love')}}>
                <Image source={require('../img/self-love.png')} alt='self-love' style={styles.icon}/>
              </Pressable>
              <Pressable style={icon == 'sleeping' ? styles.iconBackgroundPressed : styles.iconBackground} onPress={() => {setIcon('sleeping')}}>
                <Image source={require('../img/sleeping.png')} alt='sleeping' style={styles.icon}/>
              </Pressable>
              <Pressable style={icon == 'water' ? styles.iconBackgroundPressed : styles.iconBackground} onPress={() => {setIcon('water')}}>
                <Image source={require('../img/water-bottle.png')} alt='water' style={styles.icon}/>
              </Pressable>
              <Pressable style={icon == 'yoga' ? styles.iconBackgroundPressed : styles.iconBackground} onPress={() => {setIcon('yoga')}}>
                <Image source={require('../img/yoga.png')} alt='yoga' style={styles.icon}/>
              </Pressable>
            </ScrollView>
          </View>
          <Text style={styles.subtitle}>Keep yourself accountable, track your progress with a token.</Text>
          {
              icon !== '' ? (
                <Pressable
                onPress={() => {setState('nft')}} style={styles.nextButton}>
                  <View style={frequency !== '' && name !== '' && description !=='' ? styles.glow : styles.disabled}></View>
                    <Text style={styles.text}>Create habit</Text>
                </Pressable>
          
              ) : (
                <></>
              )
            }
        </View>
      )
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
                onPress={() => {setState('nft')}} style={styles.nextButton}>
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
  contentContainer: {
    gap: 8,
    paddingHorizontal: 8,
    marginTop: 12,
    paddingVertical: 24
  },
  icon: {
    width: 64,
    height: 64,
  },
  iconBackground: {
    padding: 12,
    backgroundColor: '#C1B2C7',
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 48
  },
  iconBackgroundPressed: {
    padding: 12,
    backgroundColor: '#BA2C73',
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 48
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
    height: '50%',
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
