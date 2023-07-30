import axios from 'axios'
import { Program, AnchorProvider, web3, Idl, BN, Wallet } from "@coral-xyz/anchor";
import { Transaction, Connection, clusterApiUrl, PublicKey, SystemProgram, TransactionInstruction, Keypair, TransactionMessage, VersionedMessage, VersionedTransaction, } from '@solana/web3.js'
import * as idl from './idl.json';
import { Web3MobileWallet } from '@solana-mobile/mobile-wallet-adapter-protocol-web3js';
import { transact } from '@solana-mobile/mobile-wallet-adapter-protocol-web3js' 
import { MINT_SIZE, TOKEN_PROGRAM_ID, createAssociatedTokenAccountInstruction, createInitializeMintInstruction, createMintToInstruction, getAssociatedTokenAddressSync } from '@solana/spl-token';
import { PROGRAM_ID, createCreateMetadataAccountV3Instruction } from '@metaplex-foundation/mpl-token-metadata';

async function createNFT(name: string, targetAddress: PublicKey, uri: string, attributes: any) {
    axios.defaults.headers.common["Authorization"] = `Bearer token`;
    try {
      const { data } = await axios.post('https://api.underdogprotocol.com/v2/projects/5/nfts', {
        name: name,
        image: uri,
        attributes: attributes,
        receiverAddress: targetAddress.toBase58()
      });
      console.log(data)
      return data;  
    } catch (err) {
      console.log(err);
    }
}

async function findNFT(address: PublicKey) {
    axios.defaults.headers.common["Authorization"] = `Bearer token`;
    const { data } = await axios.get(`https://api.underdogprotocol.com/v2/projects/5/nfts/search?search=${address}`)
    return data
}

async function updateNFT(nft: any) {
  axios.defaults.headers.common["Authorization"] = `Bearer token`;
  const update = JSON.stringify({
    attributes: {
    }
  })
  const {data} = await axios.patch(`https://api.underdogprotocol.com/v2/projects/5/nfts/${nft.id}`, update)
  return data

}

async function stakeNFT(smsWallet: Web3MobileWallet, publicKey: PublicKey, mintPublicKey: PublicKey, stakeTokenAccount: PublicKey) {
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
      [Buffer.from("stake_info"), publicKey.toBuffer(), mintPublicKey.toBuffer()],
      program.programId
    );

    console.log(stakeInfo)
  const [stakerStakeTokenAccount] = PublicKey.findProgramAddressSync(
      [Buffer.from("token"), publicKey.toBuffer()],
      program.programId
  );

  const tx = new Transaction()

  
  tx.add(await program.methods
  .stake(bnAmount)
  .accounts({
      stakeInfo: stakeInfo,
      signer: publicKey,
      mint: mintPublicKey,
      stakerStakeTokenAccount: stakerStakeTokenAccount,
      stakerTokenAccount: stakeTokenAccount,
  }).transaction());

  const latestBlockhash = (await connection.getLatestBlockhash()).blockhash;

  tx.feePayer = publicKey;
  tx.recentBlockhash = latestBlockhash;

  const t = await connection.simulateTransaction(tx);
  console.log(t)
  console.log("Starting Stake"); 
  const sendTransactionHash = await smsWallet.signAndSendTransactions({transactions: [tx]});
  console.log(sendTransactionHash);
  return sendTransactionHash; 
}


async function getStakedNFTs(publicKey: PublicKey) {
  const stake_programId = new PublicKey('B9cAgrXZ51EV8GXEGVgHuVjFAsdtJ1qm1aqi8KHyFXQd');

  const [stakerStakeTokenAccount] = PublicKey.findProgramAddressSync(
      [Buffer.from("token"), publicKey.toBuffer()],
      stake_programId
  );

  const nfts = await findNFT(stakerStakeTokenAccount);
  return nfts;
}


async function initStakePool(smsWallet: Web3MobileWallet, publicKey: PublicKey, mint: PublicKey) {
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
    
          return tx;
        });
        return signedTransactions;
      },
      publicKey
  };
  
  const provider = new AnchorProvider(connection, wallet, {preflightCommitment: 'confirmed', commitment: 'confirmed'});
  const program = new Program(
      idl as Idl,
      'B9cAgrXZ51EV8GXEGVgHuVjFAsdtJ1qm1aqi8KHyFXQd',
      provider,
    ) as Program;  
      
  const [stakePoolTokenAccount] = PublicKey.findProgramAddressSync(
    [Buffer.from("determination")],
    program.programId
  );

  const tx = new Transaction()


  const latestBlockhash = (await connection.getLatestBlockhash()).blockhash;

  tx.feePayer = publicKey;
  tx.recentBlockhash = latestBlockhash;

  
  const simulate = await connection.simulateTransaction(tx);
  console.log(simulate)
  console.log("Starting Init Pool"); 
  const sendTransactionHash = await smsWallet.signAndSendTransactions({transactions: [tx]});
  console.log(sendTransactionHash);
  return sendTransactionHash; 
}

async function mintNFT(smsWallet: Web3MobileWallet, publicKey: PublicKey, stakePoolAccount: PublicKey, connection: Connection, uri: string) {
  const mint = Keypair.generate();
  const programAccount = new PublicKey('B9cAgrXZ51EV8GXEGVgHuVjFAsdtJ1qm1aqi8KHyFXQd')

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
    
          return tx;
        });
        return signedTransactions;
      },
      publicKey
  };

  let Blockhash = (await connection.getLatestBlockhash('confirmed'));
  const associatedToken = await getAssociatedTokenAddressSync(mint.publicKey, stakePoolAccount, true)
  const tokenPubkey = PublicKey.findProgramAddressSync(
      [ Buffer.from('metadata'), PROGRAM_ID.toBuffer(), mint.publicKey.toBuffer()],
      PROGRAM_ID,
  )[0];

  const provider = new AnchorProvider(connection, wallet, {preflightCommitment: 'confirmed', commitment: 'confirmed'});
  const program = new Program(
      idl as Idl,
      'B9cAgrXZ51EV8GXEGVgHuVjFAsdtJ1qm1aqi8KHyFXQd',
      provider,
    ) as Program;  
      
  const [stakePoolTokenAccount] = PublicKey.findProgramAddressSync(
    [Buffer.from("determination")],
    program.programId
  );

  const token_transaction = new Transaction();
  token_transaction.feePayer = publicKey;
  token_transaction.recentBlockhash = Blockhash.blockhash;

  console.log('Create Mint Account Instructions')
  const createMintAccountInstruction = SystemProgram.createAccount({
      fromPubkey: publicKey,
      newAccountPubkey: mint.publicKey,
      lamports: await connection.getMinimumBalanceForRentExemption(MINT_SIZE),
      space: MINT_SIZE,
      programId: TOKEN_PROGRAM_ID,
  });
  token_transaction.instructions.push(createMintAccountInstruction);

  console.log('Create Mint Instructions');
  const initializeMintInstruction = createInitializeMintInstruction(
      mint.publicKey,
      9,
      programAccount,
      programAccount,
      TOKEN_PROGRAM_ID
  );
  token_transaction.instructions.push(initializeMintInstruction)

  console.log('Create Token Instruction')
  const initializeTokenInstruction = createAssociatedTokenAccountInstruction(
      publicKey, 
      associatedToken,
      stakePoolAccount,
      mint.publicKey,
      TOKEN_PROGRAM_ID
  )
  token_transaction.instructions.push(initializeTokenInstruction);

  console.log('Create Mint to Token Instruction')
  const initializeMintToTokenInstruction = createMintToInstruction(
      mint.publicKey,
      associatedToken,
      programAccount,
      1000000000000
  )
  token_transaction.instructions.push(initializeMintToTokenInstruction);

  console.log('Create Metadata Account')
  const createV3MetadataInstruction = createCreateMetadataAccountV3Instruction(
      {
          metadata: tokenPubkey,
          mint: mint.publicKey,
          mintAuthority: programAccount,
          payer: publicKey,
          updateAuthority: programAccount,
      }, {
          createMetadataAccountArgsV3: {
              data: {
                  name: 'Determination Points',
                  symbol: 'DP',
                  uri: uri,
                  sellerFeeBasisPoints: 500,
                  creators: null,
                  collection: null,
                  uses: null
              },
              isMutable: true,
              collectionDetails: null,
          }
      }
  )

  token_transaction.instructions.push(createV3MetadataInstruction);

  console.log('Init Stake Pool')
  token_transaction.add(await program.methods
    .init_stakepool()
    .accounts({
      signer: publicKey,
      stakePoolTokenAccount: stakePoolTokenAccount,
      mint: mint.publicKey
    }).transaction());

  const tx = await smsWallet.signTransactions({transactions: [token_transaction]});

  console.log(tx)

  try {
    //@ts-ignore
      const hash = await connection.sendTransaction(tx, {
        skipPreflight: true,
        maxRetries: 5
      });
      console.log(hash)
      return mint.publicKey
  } catch (err) {
    console.log(err)
  } finally {
    return mint.publicKey;
  }
}


async function mintToStakePool(smsWallet: Web3MobileWallet, publicKey: PublicKey) {
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
    
          return tx;
        });
        return signedTransactions;
      },
      publicKey
  };
  
  const provider = new AnchorProvider(connection, wallet, {preflightCommitment: 'confirmed', commitment: 'confirmed'});
  const program = new Program(
      idl as Idl,
      'B9cAgrXZ51EV8GXEGVgHuVjFAsdtJ1qm1aqi8KHyFXQd',
      provider,
    ) as Program;  
      
  const [stakePoolAccount] = PublicKey.findProgramAddressSync(
    [Buffer.from("determination")],
    program.programId
  );

  const mint = await mintNFT(smsWallet, publicKey, stakePoolAccount, connection, 'ipfs://bafybeic3c5k3p2tu4rke43d5ghrvpymlhfajekggpawnahgn72gpnrntv4')

  const stakePool = await initStakePool(smsWallet, publicKey, mint);


  console.log('stakepool', stakePool)


}



async function unstakeNFT(smsWallet: Web3MobileWallet, publicKey: PublicKey, mint: PublicKey, tokenAccount: PublicKey) {
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
  const program = new Program(
      idl as Idl,
      'B9cAgrXZ51EV8GXEGVgHuVjFAsdtJ1qm1aqi8KHyFXQd',
      provider,
    ) as Program;  
        
  let [stakeInfo] = PublicKey.findProgramAddressSync(
      [Buffer.from("stake_info"), publicKey.toBuffer(), mint.toBuffer()],
      program.programId
    );

  const [stakerStakeTokenAccount] = PublicKey.findProgramAddressSync(
      [Buffer.from("token"), publicKey.toBuffer()],
      program.programId
  );

  const [stakerStakePoolAccount] = PublicKey.findProgramAddressSync(
    [Buffer.from("determination")],
    program.programId
  );

  const tx = new Transaction()
  tx.add(await program.methods
  .unstake()
  .accounts({
      stakeInfo: stakeInfo,
      signer: publicKey,
      mint: mint,
      stakerStakeTokenAccount: stakerStakeTokenAccount,
      stakerTokenAccount: tokenAccount,
      stakePoolTokenAccount: stakerStakePoolAccount
  }).transaction());

  const latestBlockhash = (await connection.getLatestBlockhash()).blockhash;

  tx.feePayer = publicKey;
  tx.recentBlockhash = latestBlockhash;

  const simulate = await connection.simulateTransaction(tx);
  console.log(simulate)
  console.log("Starting Unstake"); 
  try {
    const sendTransactionHash = await smsWallet.signAndSendTransactions({transactions: [tx]});
    console.log(sendTransactionHash);
    return sendTransactionHash; 
  } catch (err) {
    console.log(err)
  }
}

export { createNFT, findNFT, stakeNFT, getStakedNFTs, updateNFT, unstakeNFT, mintToStakePool }