import {transact} from '@solana-mobile/mobile-wallet-adapter-protocol-web3js';
import React, {ComponentProps, useState, useCallback} from 'react';
import {Button, Pressable, StyleSheet, Text, Image} from 'react-native';

import {useAuthorization} from './providers/AuthorizationProvider';
import {Colors} from './Colors';
import { mintToStakePool, stakeNFT, unstakeNFT } from '../src';
import { PublicKey } from '@metaplex-foundation/js';
import { Transaction } from '@solana/web3.js';
import { getAssociatedTokenAddressSync } from '@solana/spl-token';
import { useGuardedCallback } from '../src/useGuardedCallback';

type Props = {
    nft: any
};

export const APP_IDENTITY = {
    name: 'Stabit',
  };  

export default function Unstake({nft}: Props) {
  const {authorizeSession, selectedAccount} = useAuthorization();
  const [stakeInProgress, setStakeInProgress] = useState(false);
  const token = getAssociatedTokenAddressSync(new PublicKey(nft.mintAddress), new PublicKey(selectedAccount!.publicKey), true);
  const handleStakePress = useGuardedCallback(async () => {
    setStakeInProgress(true);

    const signature = await transact(async (wallet) => {  
        if (wallet) {
            const authorizationResult = await authorizeSession(wallet);
            const stake = await mintToStakePool(wallet, authorizationResult.publicKey)
            console.log(stake)
            setStakeInProgress(false);
            return stake
        }
        setStakeInProgress(false);
    })
        setStakeInProgress(false);
  }, []);
  return (
    <Pressable
      disabled={stakeInProgress}
      onPress={() => handleStakePress()}
      style={styles.button}>
        <Text>Init Stake Pool</Text>
      </Pressable>
  );
}

export const styles = StyleSheet.create(({
  button: {
    borderRadius: 30,
    height: 64,
    justifyContent: 'center',
    padding: 14,
    backgroundColor: Colors.mint
  }
}))