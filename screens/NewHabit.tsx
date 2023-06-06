

import React, { useCallback, useEffect, useRef, useState } from 'react';
import { Animated, ScrollView, StyleSheet, Text, View, Pressable, TextInput, Image, ImageBackground, TouchableOpacity } from 'react-native';

import {
  useAuthorization,
} from '../components/providers/AuthorizationProvider';
import { useConnection } from '../components/providers/ConnectionProvider';
import { Colors } from '../components/Colors'
import { Menu } from '../components/Menu';
import { Habit } from '../components/Habit';
import { createNFT, findNFT } from '../src';
import moment from 'moment';
import LoadingComponent from '../components/Loading';

export default function NewHabit({ navigation }: any) {
  const { connection } = useConnection();
  const { selectedAccount } = useAuthorization();
  const [newOrQuit, setNewOrQuit] = useState('');
  const [name, setName] = useState('');
  const [state, setState] = useState('');
  const [frequency, setFrequency] = useState('');
  const [currentIcon, setCurrentIcon] = useState('');
  const [milestone, setMilestone] = useState<number>();
  const address = selectedAccount!.publicKey;

  async function mintHabitNFT() {
    const attributes = {
      status: newOrQuit,
      frequency: frequency,
      streak: 0,
      milestone: milestone,
      lastCheckIn: moment.now().toString(),
    }

    const response = await createNFT(name, address, currentIcon, attributes);
    if (response) {
      setState('success');
    }
  }

  const icons = [
    'https://bafkreiglw4rpka4idig6o2sa5gt2pa7owgkf5nwvsu2c3mms4nfiubb7i4.ipfs.nftstorage.link/'
  ]

  useEffect(() => {
    if (!selectedAccount) {
      return;
    }
    async function findOwnedNFT() {
      const data = await findNFT(address);
      console.log('nft', data)
    }
    findOwnedNFT();
  }, [data]);



  console.log(state)
  switch (state) {
    case 'success':
      setTimeout(() => {
        navigation.navigate('Calendar')
      }, 1500)
      return (
        <ImageBackground source={require('../img/backgroundGradient.png')} style={styles.backgroundImage}>
          <Menu navigation={navigation} />
          <View style={styles.mainContainer}>
            <View>
              <Text style={styles.subtitle}>Successfully created new habit!</Text>
            </View>
            <View>
              <Text style={styles.subtitle}>Set your milestone:</Text>
              <ScrollView>

              </ScrollView>
            </View>
          </View>
        </ImageBackground>
      )
    case 'loading':
      return (
        <ImageBackground source={require('../img/backgroundGradient.png')} style={styles.backgroundImage}>
          <LoadingComponent/>
        </ImageBackground>
      )
    case 'nft':
      return (
        <ImageBackground source={require('../img/backgroundGradient.png')} style={styles.backgroundImage}>
          <Menu navigation={navigation} />
          <View style={styles.mainContainer}>
            <View style={styles.contentContainer}>
              <TouchableOpacity activeOpacity={0.5} // Button not showing
                style={styles.button}
                onPress={() => { mintHabitNFT(); setState('loading') }}>
                <Text style={styles.textBase}>
                  <Text style={styles.buttonText}>Next</Text>
                </Text>
              </TouchableOpacity>
            </View>
            <Text style={styles.textBase}>
              <Text style={styles.subtitle}>Track your progress with tokens. Press and hold to mint your new habit.</Text>
            </Text>
          </View>
          <Text style={styles.textBase}>
            <Text style={styles.subtitle}>Choose an Icon for {name}</Text>
          </Text>
        </ImageBackground>
      )
    case 'info':
      return (
        <ImageBackground source={require('../img/backgroundGradient.png')} style={styles.backgroundImage}>
          <Menu navigation={navigation} />
          <View style={styles.mainContainer}>
            <View style={styles.topContainer}>
              <Text style={styles.textBase}>
                <Text style={styles.subtitle}>Track your new Beginnings.</Text>
              </Text>
              <TextInput onChangeText={(text) => { setName(text); }} placeholderTextColor="#eee" placeholder='Name your habit...' value={name} style={styles.input}></TextInput>
              <Text style={styles.textBase}>
                <Text style={styles.text}>How often shall we check in?</Text>
              </Text>
    
              <View style={styles.buttonRow}>
                <TouchableOpacity activeOpacity={0.5} onPress={() => { setFrequency('daily') }} style={frequency == 'daily' ? styles.buttonPressed : styles.button}>
                  <Text style={styles.textBase}>
                    <Text style={styles.buttonText}>Daily</Text>
                  </Text>
                </TouchableOpacity>
    
                <TouchableOpacity activeOpacity={0.5} onPress={() => { setFrequency('weekly') }} style={frequency == 'weekly' ? styles.buttonPressed : styles.button}>
                  <Text style={styles.textBase}>
                    <Text style={styles.buttonText}>Weekly</Text>
                  </Text>
                </TouchableOpacity>
    
                <TouchableOpacity activeOpacity={0.5} onPress={() => { setFrequency('monthly') }} style={frequency == 'monthly' ? styles.buttonPressed : styles.button}>
                  <Text style={styles.textBase}>
                    <Text style={styles.buttonText}>Monthly</Text>
                  </Text>
                </TouchableOpacity>
              </View>
              {
                frequency !== '' && name !== '' ? (
                  <TouchableOpacity activeOpacity={0.5} 
                    style={StyleSheet.compose(styles.button, {marginTop: 50, width: '100%'})}
                    onPress={() => { setState('nft') }}>
                    <Text style={styles.textBase}>
                      <Text style={styles.buttonText}>Next</Text>
                    </Text>
                  </TouchableOpacity>
                ) : (
                  <></>
                )
              }
            </View>
          </View>
        </ImageBackground>
      )    
    default:
      return (
        <>
          <ImageBackground source={require('../img/backgroundGradient.png')} style={styles.backgroundImage}>
            <Menu navigation={navigation} />
            <View style={styles.mainContainer}>
              <View style={styles.topContainer}>
                <Text style={styles.textBase}>
                  <Text style={styles.subtitle}>What is your goal?</Text>
                </Text>
                <TouchableOpacity activeOpacity={0.5} style={newOrQuit == 'new' ? styles.buttonPressed : styles.button} onPress={() => { setNewOrQuit('new'); setState('selected') }}>
                  <Text style={styles.textBase}>
                    <Text style={styles.buttonText}>Start a New Habit</Text>
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity activeOpacity={0.5} style={newOrQuit == 'quit' ? styles.buttonPressed : styles.button}>
                  <Text style={styles.textBase}>
                    <Text style={styles.buttonText} onPress={() => { setNewOrQuit('quit'); setState('selected') }}>Quit an Old Habit</Text>
                  </Text>
                </TouchableOpacity>
                {
                  state == 'selected' ? (
                    <TouchableOpacity activeOpacity={0.5}
                      onPress={() => { setState('info') }} style={StyleSheet.compose(styles.button, {marginTop: 60})}>
                      <Text style={styles.textBase}>
                        <Text style={styles.buttonText}>Next</Text>
                      </Text>
                    </TouchableOpacity>
                  ) : (
                    <></>
                  )
                }
              </View>
            </View>
          </ImageBackground>
        </>
      );
  }
}

const styles = StyleSheet.create({
  mainContainer: {
    backgroundColor: Colors.background,
    width: '100%',
    padding: 30,
    paddingBottom: 260,
    paddingTop: 60,
    flex: 1,
    rowGap: 20,
    minHeight: 800,
    justifyContent: 'space-between',
  },
  itemContainer: {
    height: 300,
    gap: 10,
  },
  contentContainer: {
    gap: 8,
    marginTop: 10,
    paddingVertical: 10,
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
    minHeight: 260,
    maxHeight: 420,
  },
  topContainer: {
    height: '200%',
    gap: 40,
    padding: 30,
    alignItems: 'center',
  },
  icon: {
    width: 60,
    height: 60,
    zIndex: 1
  },
  iconBackground: {
    backgroundColor: Colors.font,
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    maxWidth: 90,
    maxHeight: 90,
    minWidth: 80,
    minHeight: 80,
    borderRadius: 50,
    padding: 10,
  },
  iconBackgroundPressed: {
    padding: 10,
    backgroundColor: Colors.pink,
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 50,
    minWidth: 80,
    minHeight: 80,
    maxHeight: 90,
    maxWidth: 90,
  },
  subtitle: {
    fontSize: 30,
    color: Colors.font,
    fontWeight: 'bold',
  },
  button: {
    backgroundColor: Colors.component,
    paddingVertical: 10,
    borderRadius: 30,
    maxHeight: 80,
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    width: '80%',
    height: 80,
  },
  buttonPressed: {
    backgroundColor: Colors.blueTransparent,
    paddingVertical: 10,
    borderRadius: 30,
    flex: 1,
    maxHeight: 80,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    width: '80%',
    height: 80,
  },
  buttonText: {
    textAlign: 'center',
    fontSize: 20,
    color: Colors.font,
    fontWeight: 'bold',
  },
  textBase: {
    fontFamily: 'Nunito',
    textAlign: 'center',
  },
  nextButton: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
  },
  input: {
    height: 60,
    borderColor: Colors.backgroundMain,
    backgroundColor: Colors.component,
    color: Colors.font,
    borderWidth: 3,
    borderRadius: 15,
    marginBottom: 30,
    paddingHorizontal: 20,
    width: '90%',
    fontSize: 20,
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
    fontWeight: 'bold',
    color: Colors.font
  },
  glow: {
    borderColor: '#BA2C73',
    borderWidth: 4,
    width: '80%',
    height: '50%',
    position: 'absolute',
    shadowOffset: { width: -1, height: 1 },
    flexGrow: 1,
    borderRadius: 24,
    zIndex: 1,
  },
  disabled: {
    backgroundColor: '#282F44',
    width: '80%',
    height: '80%',
    position: 'absolute',
    shadowOffset: { width: -1, height: 1 },
    flexGrow: 1,
    borderRadius: 30,
  },
  buttonRow: {
    width: '100%',
    maxHeight: 50,
    flex: 1,
    flexDirection: 'row',
    columnGap: 10,
  },
  backgroundImage: {
    flex: 1,
    width: '100%',
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  }
});
