import React, { useEffect } from 'react';
import {
  Image,
  StyleSheet,
  Text,
  useColorScheme,
  View,
  Pressable,
  ScrollView
} from 'react-native';
import { Colors } from './Colors';
import Burn from './Burn';
import Stake from './Stake';

type Props = Readonly<{
  imageURI: string,
  attributes: any,
  name: string,
  nft: any,
}>;

export function Habit({imageURI, attributes, name, nft}: Props) {
  console.log(nft)
  return (
    <View style={styles.container}>
      <Pressable style={styles.iconBackground}>
        {
          nft.image ? (
            <Image source={{uri: nft.image}} style={styles.icon}></Image>
          ) : (
            <></>
          )
        }
      </Pressable>
      <ScrollView>
        <Text style={styles.title}>{name}</Text>
        <Text style={styles.text}>{attributes.frequency} reminders</Text>
      </ScrollView>
      <View style={styles.options}>
        <Stake nft={nft}></Stake>
        <Burn nft={nft}></Burn>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    minHeight: 91,
    maxHeight: 91,
    width: '100%',
    backgroundColor: Colors.component,
    borderRadius: 30,
    flex: 1,
    flexDirection: 'row',
    gap: 8,
    rowGap: 24,
    borderBottomLeftRadius: 48,
    borderTopLeftRadius: 48,
    padding: 8,
  },
  text: {
    color: Colors.font,
    marginLeft: 8
  },
  title: {
    fontSize: 16,
    fontFamily: "Nunito",
    color: Colors.font,
    padding: 8,
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
  },
  options: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'space-between'
  }
});
