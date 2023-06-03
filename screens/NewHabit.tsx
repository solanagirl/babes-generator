

import React, {useCallback, useEffect, useRef, useState} from 'react';
import {Animated, ScrollView, StyleSheet, Text, View, Pressable, TextInput, Image} from 'react-native';

import {
  useAuthorization,
} from '../components/providers/AuthorizationProvider';
import {useConnection} from '../components/providers/ConnectionProvider';
import { Colors } from '../components/Colors'
import { Menu } from '../components/Menu';
import { Habit } from '../components/Habit';
import { createNFT, findNFT } from '../src';

export default function NewHabit({navigation}: any) {
  const {connection} = useConnection();
  const {selectedAccount} = useAuthorization();
  const [newOrQuit, setNewOrQuit] = useState('');
  const [name, setName] = useState('');
  const [state, setState] = useState('');
  const [frequency, setFrequency] = useState('');
  const [currentIcon, setCurrentIcon] = useState('');
  const [data, setData] = useState<any>();
  const address = selectedAccount!.publicKey;

  async function mintHabitNFT(imageURI: string) {
    const attributes = {
      status: newOrQuit,
      frequency: frequency
    }

    const response = await createNFT(name, address, imageURI, attributes);
    setData(response)
    setState('success')  
  }


  const icons = [
    'https://cdn-icons-png.flaticon.com/512/2043/2043787.png',
    'https://cdn-icons-png.flaticon.com/512/5223/5223155.png',
    'https://cdn-icons-png.flaticon.com/512/2829/2829162.png',
    'https://cdn-icons-png.flaticon.com/512/2553/2553628.png',
    'https://cdn-icons-png.flaticon.com/512/883/883378.png',
    'https://cdn-icons-png.flaticon.com/512/7081/7081325.png',
    'https://cdn-icons-png.flaticon.com/512/525/525853.png'
      ]

  useEffect(() => {
    if (!selectedAccount) {
      return;
    }
    async function findOwnedNFT() {
      const data = await findNFT(address);
    }
    findOwnedNFT();
  }, [data]);

  switch (state) {
    case 'success':
      return (
        <View style={styles.mainContainer}>
          <Menu navigation={navigation}/>
          <View>
            <Text style={styles.subtitle}>Successfully created new habit!</Text>
            <Habit imageURI={data.image} attributes={{status: newOrQuit, frequency}} name={data.title} nft={data}></Habit>
          </View>
          <View>
            <Text style={styles.subtitle}>Set your milestone</Text>
            <ScrollView>
              
            </ScrollView>
          </View>
        </View>
      )
    case 'loading':
      return (
        <View style={styles.mainContainer}>
          <Text style={styles.subtitle}>Loading</Text>
        </View>
      )
    case 'nft': 
      return (
        <View style={styles.mainContainer}>
          <Menu navigation={navigation}/>
            <Text style={styles.subtitle}>Choose an Icon for {name}</Text>
            <View style={styles.contentContainer}>
            {
              icons.map(icon => 
                  <Pressable onLongPress={() => {setCurrentIcon(icon); mintHabitNFT(currentIcon); setTimeout(() => {setState('loading')}, 900)}} key={icon} style={icon == currentIcon ? styles.iconBackgroundPressed : styles.iconBackground}>
                    <Image source={{uri: icon}} style={styles.icon}></Image>
                  </Pressable>
              )
            }
            </View>
          <Text style={styles.subtitle}>Track your progress with tokens. Press and hold to mint your new habit.</Text>
        </View>
      )
    case 'info':
      return (
        <View style={styles.mainContainer}>
          <Menu navigation={navigation}/>
          <View style={styles.topContainer}>
            <Text style={styles.subtitle}>Track your new beginnings.</Text>
            <TextInput onChangeText={(text) => {setName(text); StyleSheet.compose(styles.button, styles.buttonPressed)}} placeholder='Name your habit' value={name} style={styles.input}></TextInput>
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
          </View>
          {
              frequency !== '' ? (
                <Pressable
                onPress={() => {setState('nft')}} style={styles.nextButton}>
                  <View style={frequency !== '' && name !== '' ? styles.glow : styles.disabled}></View>
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
          <Menu navigation={navigation}/>
          <View style={styles.mainContainer}>
            <View style={styles.topContainer}>
              <Text style={styles.subtitle}>What is your goal?</Text>
              <Pressable style={newOrQuit == 'new' ? styles.buttonPressed : styles.button} onPress={() => {setNewOrQuit('new'); setState('selected')}}>
                <Text style={styles.buttonText}>Start something new</Text>
              </Pressable>
              <Pressable style={newOrQuit == 'quit' ? styles.buttonPressed : styles.button}>
                <Text style={styles.buttonText} onPress={() => {setNewOrQuit('quit'); setState('selected')}}>Quit an Old Habit</Text>
              </Pressable>
            </View>
            {
              state == 'selected' ? (
                <Pressable
                onPress={() => {setState('info')}} style={styles.button}>
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
    backgroundColor: Colors.background,
    paddingHorizontal: 48,
    paddingBottom: 256,
    paddingTop: 64,
    flex: 1,
    rowGap: 24,
    minHeight: 800,
    justifyContent: 'space-between'
  },
  itemContainer: {
    height: 300,
    gap: 12
  },
  contentContainer: {
    gap: 8,
    marginTop: 12,
    paddingVertical: 12,
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
    minHeight: 256,
    maxHeight: 420
  },
  topContainer: {
    height: '70%',
    gap: 36
  },
  icon: {
    width: 64,
    height: 64,
    zIndex: 1
  },
  iconBackground: {
    backgroundColor: Colors.font,
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    maxWidth: 92,
    maxHeight: 92,
    minWidth: 81,
    minHeight: 81,
    borderRadius: 48,
    padding: 12
  },
  iconBackgroundPressed: {
    padding: 12,
    backgroundColor: Colors.pink,
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 48,
    minWidth: 81,
    minHeight: 81,
    maxHeight: 92,
    maxWidth: 92,    
  },
  subtitle: {
    fontSize: 24,
    color: Colors.font
  },
  button: {
    backgroundColor: Colors.component,
    paddingVertical: 12,
    borderRadius: 12,
    maxHeight: 81,
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center'

  },
  buttonPressed: {
    backgroundColor: Colors.pink,
    paddingVertical: 12,
    borderRadius: 12,
    flex: 1,
    maxHeight: 81,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center'
  },
  buttonText: {
    textAlign: 'center',
    fontSize: 18,
    color: Colors.font
  }, 
  nextButton: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
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
