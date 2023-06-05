import React, { useEffect, useState } from 'react';
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
import { updateNFT } from '../src';
import moment from 'moment';
import Unstake from './Unstake';

type Props = Readonly<{
  nft: any,
}>;

export function StakedHabit({nft}: Props) {
    const [checkInStatus, setCheckInStatus] = useState('')
    async function checkIn() {
        const response = await updateNFT(nft);
        console.log(response)
    }

    useEffect(() => {
        const lastCheckIn = moment(nft.attributes.lastCheckIn);    
        const now = moment();
        const timeElapsed = moment.duration(now.diff(lastCheckIn));
        const timeInHours = timeElapsed.asHours();
        const timeInDays = timeElapsed.asDays();
        const timeInMonths = timeElapsed.asMonths();

        if (nft.attributes.frequency == 'daily') {
            if (timeInHours >= 24 && timeInHours < 48) {
                setCheckInStatus('can check in')
            } else if (timeInHours < 24) {
                setCheckInStatus('checked in')
            } else if (timeInHours >= 48) {
                setCheckInStatus('unstaked')
            }
        } else if (nft.attributes.frequency == 'weekly') {
            if (timeInDays >= 7 && timeInHours < 14) {
                setCheckInStatus('can check in')
            } else if (timeInDays < 7) {
                setCheckInStatus('checked in')
            } else if (timeInDays >= 14) {
                setCheckInStatus('unstaked')
            }
        } else if (nft.attributes.frequency == 'monthly') {
            if (timeInMonths >= 1 && timeInHours < 2) {
                setCheckInStatus('can check in')
            } else if (timeInMonths < 1) {
                setCheckInStatus('checked in')
            } else if (timeInMonths >= 2) {
                setCheckInStatus('unstaked')
            }
        }
    }, [nft])
  return (
    <View style={styles.container}>
        <View>
            <Text style={styles.title}>{ nft.attributes.newOrQuit == 'new' ? 'Starting ' : 'Quitting ' }{nft.name}</Text>
            <Text>Check In: {nft.attributes.frequency}</Text>
            <Text>Milestone {nft.attributes.milestone} Days</Text>
        </View>
        <View>
            {
                checkInStatus == 'can check in' ? (
                    <Pressable style={styles.button} onPress={() =>  checkIn()}>
                        <Text>Check In</Text>
                    </Pressable>
                ) : (
                    <></>
                )
            }
            {
                checkInStatus == 'unstaked' ? (
                    <Pressable style={styles.button} onPress={() =>  checkIn()}>
                        <Text>Unstake</Text>
                    </Pressable>
                ) : (
                    <></>
                )
            }
            {
                checkInStatus == 'checked in' ? (
                    <Pressable style={styles.button} onPress={() =>  checkIn()}>
                        <Text>checked in</Text>
                    </Pressable>
                ) : (
                    <></>
                )
            }
            <Unstake nft={nft} />
        </View>
        <Text>
            Day {nft.attributes.streak}
        </Text>
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
