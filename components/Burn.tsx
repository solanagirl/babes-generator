import {transact} from '@solana-mobile/mobile-wallet-adapter-protocol-web3js';
import React, {ComponentProps, useState, useCallback} from 'react';
import {Button, Pressable, StyleSheet, View, Image} from 'react-native';

import {useAuthorization} from './providers/AuthorizationProvider';
import {Colors} from './Colors';
import { createBurnCheckedInstruction } from '@solana/spl-token'
import { getAssociatedTokenAddressSync } from '@solana/spl-token'
import { Connection, PublicKey, Transaction, clusterApiUrl } from '@solana/web3.js';

type Props = {
    nft: any
};

export const APP_IDENTITY = {
    name: 'Stabit',
  };  

export default function Burn({nft}: Props) {
  const {authorizeSession, selectedAccount} = useAuthorization();
  const [burnInProgress, setBurnInProgress] = useState(false);
  const messageBuffer = new Buffer(`Burning ${nft.name} Habit`);
  
  const handleBurnPress = useCallback(async () => {
    const token = getAssociatedTokenAddressSync(new PublicKey(nft.mintAddress), new PublicKey(nft.ownerAddress));
    const connection = new Connection(clusterApiUrl('devnet'), 'confirmed');

    setBurnInProgress(true);
    await transact(async (wallet) => {  
        if (wallet) {
            const [authorizationResult, latestBlockhash] = await Promise.all([
                authorizeSession(wallet),
                connection.getLatestBlockhash(),
                ]);
            let tx = new Transaction({...latestBlockhash, feePayer: authorizationResult.publicKey}).add(createBurnCheckedInstruction(
                token,
                nft.mintAddress,
                selectedAccount!.publicKey,
                1,
                0
            ));
    
            const signedMessages = await wallet.signAndSendTransactions({
                transactions: [tx],
            });
    
            if (signedMessages) {
                setBurnInProgress(false);
            } else {
                setTimeout(() => {
                    return(
                        <View>
                            Timout
                        </View>
                    )
                }, 1000)
            }
        } else {
            setBurnInProgress(false);
        }
        console.log(burnInProgress)
    });
  }, [authorizeSession]);
  return (
    <Pressable
      disabled={burnInProgress}
      onPress={() => handleBurnPress()}>
        <Image source={require('../img/bin.png')} style={styles.icon}></Image>
      </Pressable>
  );
}

export const styles = StyleSheet.create(({
  icon: {
    width: 36,
    height: 36,
    tintColor: '#ffffff'
  },
}))