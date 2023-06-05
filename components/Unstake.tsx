import {transact} from '@solana-mobile/mobile-wallet-adapter-protocol-web3js';
import React, {ComponentProps, useState, useCallback} from 'react';
import {Button, Pressable, StyleSheet, Text, Image} from 'react-native';

import {useAuthorization} from './providers/AuthorizationProvider';
import {Colors} from './Colors';
import { stakeNFT, unstakeNFT } from '../src';
import { PublicKey } from '@metaplex-foundation/js';
import { Transaction } from '@solana/web3.js';

type Props = {
    nft: any
};

export const APP_IDENTITY = {
    name: 'Stabit',
  };  

export default function Unstake({nft}: Props) {
  const {authorizeSession, selectedAccount} = useAuthorization();
  const [stakeInProgress, setStakeInProgress] = useState(false);
  
  const handleStakePress = useCallback(async () => {
    setStakeInProgress(true);

    const signature = await transact(async (wallet) => {  
        if (wallet) {
            const authorizationResult = await authorizeSession(wallet);
            const stake = await unstakeNFT(wallet, authorizationResult.publicKey)
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
      onPress={() => handleStakePress()}>
        <Text>Unstake</Text>
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