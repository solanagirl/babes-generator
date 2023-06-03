import axios from 'axios'
import { Program, AnchorProvider, web3, Wallet, Idl, BN } from "@project-serum/anchor";
import { Transaction, Connection, clusterApiUrl } from '@solana/web3.js'
import { createBurnCheckedInstruction, getOrCreateAssociatedTokenAccount } from '@solana/spl-token'
import { PublicKey } from '@metaplex-foundation/js';
import * as idl from './idl.json';
import { Web3MobileWallet } from '@solana-mobile/mobile-wallet-adapter-protocol-web3js';
import { MobileWallet } from '@solana-mobile/mobile-wallet-adapter-protocol';
async function createNFT(name: string, targetAddress: PublicKey, uri: string, attributes: any) {
    axios.defaults.headers.common["Authorization"] = `Bearer b9ac6f302136c1.1aed9740ff8d4ff0b707eabc41293644`;
    const { data } = await axios.post('https://dev.underdogprotocol.com/v2/projects/t/1/nfts', {
        name: name,
        image: uri,
        attributes: attributes,
        receiverAddress: targetAddress
    });
    console.log(data)
    return data;
}

async function findNFT(address: PublicKey) {
    axios.defaults.headers.common["Authorization"] = `Bearer b9ac6f302136c1.1aed9740ff8d4ff0b707eabc41293644`;
    const { data } = await axios.get(`https://dev.underdogprotocol.com/v2/projects/t/1/nfts/search?search=${address}`)
    return data
}

async function stakeNFT(wallet: Web3MobileWallet, publicKey: PublicKey, mintPublicKey: PublicKey, stakeTokenAccount: PublicKey) {
    const connection = new Connection(clusterApiUrl('devnet'), 'confirmed');

    const provider = new AnchorProvider(connection, Wallet, {preflightCommitment: 'confirmed', commitment: 'confirmed'});
    console.log(provider)
    const program = new Program(
        idl as Idl,
        'B9cAgrXZ51EV8GXEGVgHuVjFAsdtJ1qm1aqi8KHyFXQd',
        provider,
      ) as Program;    

      console.log(program)
      
    let [stakeInfo] = PublicKey.findProgramAddressSync(
        [Buffer.from("stake_info"), publicKey.toBuffer()],
        program.programId
      );
  
    const [stakerStakeTokenAccount] = PublicKey.findProgramAddressSync(
        [Buffer.from("token"), publicKey.toBuffer()],
        program.programId
    );

    const tx = await program.methods
    .stake(new BN(1))
    .accounts({
        stakeInfo: stakeInfo,
        signer: publicKey,
        mint: mintPublicKey,
        stakerStakeTokenAccount: stakerStakeTokenAccount,
        stakerTokenAccount: stakeTokenAccount,
    })
    .rpc();
    console.log("Your stake transaction signature", tx); 
    return tx; 
}

export { createNFT, findNFT, stakeNFT }