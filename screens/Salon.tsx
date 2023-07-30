import React, {useCallback, useEffect, useRef, useState} from 'react';
import {ScrollView, StyleSheet, Text, View, ImageBackground, Image, TouchableOpacity} from 'react-native';
import {
  useAuthorization,
  Account,
} from '../components/providers/AuthorizationProvider';
import {useConnection} from '../components/providers/ConnectionProvider';
import { Colors } from '../components/Colors'
import { useGuardedCallback } from '../src/useGuardedCallback';
import { Menu } from '../components/Menu';
import { Hair, Tops } from '../img/babes';

export default function Salon({ navigation }: any) {
  const {connection} = useConnection();
  const {selectedAccount} = useAuthorization();
  const [balance, setBalance] = useState<number | null>(null);
  const [isYang, setIsYang] = useState(false);


  const fetchAndUpdateBalance = useGuardedCallback(
    async (account: Account) => {
      console.log('Fetching balance for: ' + account.publicKey);
      const fetchedBalance = await connection.getBalance(account.publicKey);
      console.log('Balance fetched: ' + fetchedBalance);
      setBalance(fetchedBalance);
    },
    [balance],
  );

  useEffect(() => {
    if (!selectedAccount) {
      return;
    }
    fetchAndUpdateBalance(selectedAccount);
  }, [fetchAndUpdateBalance, selectedAccount]);

  return (
    <ImageBackground source={require('../img/bg-pattern-4.jpg')} style={styles.backgroundImage}>
        <View style={styles.container}>
            <View style={styles.horizontalContainer}>
                <Text style={styles.title}>Hair Salon</Text>
                <TouchableOpacity style={styles.button} onPress={() => {setIsYang(false)}}>
                    <Text style={styles.buttonText}>Yin</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.button} onPress={() => {setIsYang(true)}}>
                    <Text style={styles.buttonText}>Yang</Text>
                </TouchableOpacity>
            </View>
            <ImageBackground source={require('../img/bg-pattern-3.jpg')} style={styles.backgroundImage}>
            <ScrollView contentContainerStyle={{flexDirection: "row", flexWrap: "wrap"}}>
                {
                    isYang ? (
                        Hair.yang.map((top: any) => {
                            return (
                                <View style={styles.itemContainer} key={top.name}>
                                    <Image source={top.path} style={styles.image} />
                                    <Text style={styles.text}>{top.name}</Text>
                                    <Text style={styles.text}>{top.price} SOL</Text>
                                </View>
                            )
                        })    
                    ) : (
                        Hair.yin.map((top: any) => {
                            return (
                                <View style={styles.itemContainer} key={top.name}>
                                    <Image source={top.path} style={styles.image} />
                                    <Text style={styles.text}>{top.name}</Text>
                                    <Text style={styles.text}>{top.price} SOL</Text>
                                </View>
                            )
                        })    
                    )
                }
            </ScrollView>
            </ImageBackground>
            <View style={styles.horizontalContainer}>
                <TouchableOpacity style={styles.fullButton}>
                    <Text style={styles.title}>Checkout</Text>
                </TouchableOpacity>
            </View>
        </View>
        <Menu navigation={navigation} />
    </ImageBackground>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    height: '100%',
    width: "100%"
  },
  button: {
    borderTopStartRadius: 30,
    borderTopEndRadius: 30,
    borderTopColor: Colors.mint,
    borderTopWidth: 12,
    height: 60,
    width: 100,
    justifyContent: 'center',
    paddingTop: 8,
    paddingBottom: 6,
    backgroundColor: Colors.purple
  },
  fullButton: {
    borderRadius: 30,
    borderBottomColor: Colors.purple,
    borderBottomWidth: 12,
    borderTopWidth: 4,
    borderTopColor: Colors.blue,
    height: 70,
    width: 150,
    justifyContent: 'center',
    paddingTop: 8,
    paddingBottom: 6,
    backgroundColor: Colors.mint
  },
  mainContainer: {
    flexDirection: 'column',
    flexWrap: 'wrap',
  },
  paddedContainer: {
    width: '100%',
    paddingHorizontal: 24,
    paddingVertical: 24,
    gap: 12,
  },
  itemContainer: {
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    color: Colors.font,
    fontFamily: 'Nunito',
    textAlign: 'center',
  },
  switch: {
    marginTop: -36
  },
  buttonText: {
    fontSize: 12,
    textAlign: 'center',
  },
  backgroundImage: {
    flex: 1,
    width: '100%',
    height: '100%',
  },
  horizontalContainer: {
    flexDirection: 'row',
    gap: 12,
    alignItems: 'center',
    justifyContent: 'flex-end',
    paddingTop: 12,
    paddingHorizontal: 24
  },
  image: {
    width: 200,
    height: 200,
  },  
  text: {
    textAlign: 'left',
    textAlignVertical: 'center',
    fontSize: 12,
    color: Colors.white,
    paddingVertical: 4,
    paddingHorizontal: 8,
    backgroundColor: Colors.tintedTransparent
  },
});
