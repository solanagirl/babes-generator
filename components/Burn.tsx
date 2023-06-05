import {transact} from '@solana-mobile/mobile-wallet-adapter-protocol-web3js';
import React, {ComponentProps, useState, useCallback} from 'react';
import {Text, Pressable, StyleSheet, View, Image} from 'react-native';

import {useAuthorization} from './providers/AuthorizationProvider';
import {Colors} from './Colors';
import { getAssociatedTokenAddressSync, createBurnInstruction} from '@solana/spl-token'
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
  const [burnt, setBurnt] = useState(false);
  const handleBurnPress = useCallback(async () => {
    const token = getAssociatedTokenAddressSync(new PublicKey(nft.mintAddress), new PublicKey(nft.ownerAddress));

    setBurnInProgress(true);
    
    const signature = await transact(async (wallet) => {  
        const connection = new Connection(clusterApiUrl('devnet'), 'confirmed');
        if (wallet) {
            const latestBlockhash = await connection.getLatestBlockhash();

            const authorizationResult = await authorizeSession(wallet);

            let tx = new Transaction()

            const payer = new PublicKey(authorizationResult.publicKey)
            const mint = new PublicKey(nft.mintAddress);
            
            const instruction = createBurnInstruction(
                token,
                mint,
                payer,
                1
            )

            tx.instructions.push(instruction);
            tx.feePayer = payer;
            tx.recentBlockhash = latestBlockhash.blockhash;

            const hash =  await wallet.signAndSendTransactions({
              transactions: [tx],
            });
            return hash;
            } else {
            setBurnInProgress(false);
        }
    });
    if (signature) {
        setBurnInProgress(false);
        setBurnt(true);
    }
  }, [authorizeSession]);
  return (
    <Pressable
      disabled={burnInProgress}
      onPress={() => handleBurnPress()}
      style={burnInProgress ? styles.buttonBurning : styles.button}>
        {
          burnt ? (
            <Text>Burnt</Text>
          ):(
            <Image source={require('../img/bin.png')} style={styles.icon}></Image>
          )
        }
      </Pressable>
  );
}

export const styles = StyleSheet.create(({
  icon: {
    width: 24,
    height: 24,
    tintColor: '#ffffff'
  },
  button: {
    backgroundColor: Colors.blue,
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 24
  },
  buttonBurning: {
    backgroundColor: Colors.pink,
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 24
  },
}))