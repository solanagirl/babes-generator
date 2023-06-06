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
  nft: any,
}>;

export function Milestone({nft}: Props) {
  return (
    <View style={styles.container}>
        <View>
            <Text style={styles.title}>{ nft.attributes.status == 'new' ? 'Starting ' : 'Quitting ' }{nft.name}</Text>
            <Text>Goal: {nft.attributes.milestone} Days</Text>
            <Text>Streak: {nft.attributes.streak} Days</Text>
        </View>
        <View>
            <Pressable style={styles.button}>
                <Text>{nft.attributes.checkedIn ? 'Check In Completed' : 'Check In'}</Text>
            </Pressable>
            <Pressable style={styles.button}>
                <Stake nft={nft} />
            </Pressable>

        </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    maxHeight: 120,
    width: '100%',
    backgroundColor: Colors.component,
    borderRadius: 12,
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    gap: 8,
    rowGap: 24,
    padding: 24,
  },
  button: {
    backgroundColor: Colors.pink,
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 24
  },
  text: {
    color: Colors.font,
    marginLeft: 8
  },
  title: {
    fontSize: 16,
    fontFamily: "Nunito",
    color: Colors.font,
  },
  options: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'space-between'
  }
});
