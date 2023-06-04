import axios from 'axios'
import { Program, AnchorProvider, web3, Idl, BN, Wallet } from "@coral-xyz/anchor";
import { Transaction, Connection, clusterApiUrl, MessageV0 } from '@solana/web3.js'
import { createBurnCheckedInstruction, getOrCreateAssociatedTokenAccount } from '@solana/spl-token'
import { PublicKey } from '@metaplex-foundation/js';
import * as idl from './idl.json';
import { Web3MobileWallet } from '@solana-mobile/mobile-wallet-adapter-protocol-web3js';
import { transact } from '@solana-mobile/mobile-wallet-adapter-protocol-web3js' 
import { VersionedTransaction } from '@solana/web3.js';
import { VersionedMessage } from '@solana/web3.js';
  
async function createNFT(name: string, targetAddress: PublicKey, uri: string, attributes: any) {
    axios.defaults.headers.common["Authorization"] = `Bearer 5ce739510d5961.1c3a184261ed46dfb66e214f3e19480e`;
    const { data } = await axios.post('https://dev.underdogprotocol.com/v2/projects/t/1/nfts', {
        name: name,
        image: uri,
        attributes: attributes,
        receiverAddress: targetAddress.toBase58()
    });
    console.log(data)
    return data;
}

async function findNFT(address: PublicKey) {
    axios.defaults.headers.common["Authorization"] = `Bearer 5ce739510d5961.1c3a184261ed46dfb66e214f3e19480e`;
    const { data } = await axios.get(`https://dev.underdogprotocol.com/v2/projects/t/1/nfts/search?search=${address}`)
    return data
}

async function stakeNFT(publicKey: PublicKey, mintPublicKey: PublicKey, stakeTokenAccount: PublicKey) {
    const connection = new Connection(clusterApiUrl('devnet'), 'confirmed');

    const wallet: Wallet = {
      //@ts-ignore
        signTransaction: async (transaction: Transaction) => {
          const signedTransaction: Transaction = await transact(async wallet => {
            const transactions: Transaction[] = await wallet.signTransactions({
              transactions: [transaction],
            });
            return transactions[0];
          });
          return signedTransaction;
        },
        //@ts-ignore
        signAllTransactions: async (transactions: Transaction[]) => {
          const signedTransactions: Transaction[] = await transact(async wallet => {
            // Construct a transaction then request for signing
            const tx: Transaction[] = await wallet.signTransactions({
              transactions: transactions
            });
      
            return transactions;
          });
          return signedTransactions;
        },
        publicKey
    };
    
    const provider = new AnchorProvider(connection, wallet, {preflightCommitment: 'confirmed', commitment: 'confirmed'});
    const bnAmount = new BN(1);
    const program = new Program(
        idl as Idl,
        'B9cAgrXZ51EV8GXEGVgHuVjFAsdtJ1qm1aqi8KHyFXQd',
        provider,
      ) as Program;    
      
    let [stakeInfo] = PublicKey.findProgramAddressSync(
        [Buffer.from("stake_info"), publicKey.toBuffer()],
        program.programId
      );
  
      console.log(stakeInfo)
    const [stakerStakeTokenAccount] = PublicKey.findProgramAddressSync(
        [Buffer.from("token"), publicKey.toBuffer()],
        program.programId
    );
    console.log(stakerStakeTokenAccount)

    console.log("Starting Stake"); 
    const tx = await program.methods
    .stake(bnAmount)
    .accounts({
        stakeInfo: stakeInfo,
        signer: publicKey,
        mint: mintPublicKey,
        stakerStakeTokenAccount: stakerStakeTokenAccount,
        stakerTokenAccount: stakeTokenAccount,
    }).transaction();


    const latestBlockhash = (await connection.getLatestBlockhash()).blockhash;

    tx.feePayer = publicKey;
    tx.recentBlockhash = latestBlockhash;

    
    const signedTransaction = await wallet.signTransaction(tx);
    console.log("Your stake transaction", signedTransaction); 
    return signedTransaction; 
}

export { createNFT, findNFT, stakeNFT }