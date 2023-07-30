import {transact} from '@solana-mobile/mobile-wallet-adapter-protocol-web3js';
import React, {ComponentProps, useState, useCallback} from 'react';
import {Button, Pressable, StyleSheet, Text, Image} from 'react-native';

import {useAuthorization} from './providers/AuthorizationProvider';
import {Colors} from './Colors';
import { stakeNFT } from '../src';
import { getAssociatedTokenAddressSync } from '@solana/spl-token';
import { PublicKey } from '@metaplex-foundation/js';
import { Transaction } from '@solana/web3.js';
import { useGuardedCallback } from '../src/useGuardedCallback';

type Props = {
    nft: any
};

export const APP_IDENTITY = {
    name: 'Stabit',
  };  

export default function Stake({nft}: Props) {
  const {authorizeSession, selectedAccount} = useAuthorization();
  const [stakeInProgress, setStakeInProgress] = useState(false);
  
  const handleStakePress = useGuardedCallback(async () => {
    setStakeInProgress(true);
    const token = getAssociatedTokenAddressSync(new PublicKey(nft.mintAddress), new PublicKey(selectedAccount!.publicKey));
    const signature = await transact(async (wallet) => {  
        if (wallet) {
            const authorizationResult = await authorizeSession(wallet);
            const stake = await stakeNFT(wallet, authorizationResult.publicKey, nft.mintAddress, token)
            return stake
        }
        setStakeInProgress(false);
    })
    if (signature) {
        setStakeInProgress(false);
    }
  }, []);
  return (
    <Pressable
      disabled={stakeInProgress}
      onPress={() => handleStakePress()}>
        <Text>Stake</Text>
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