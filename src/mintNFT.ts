import { Connection, PublicKey, TransactionMessage, VersionedTransaction, SystemProgram, Signer, TransactionInstruction, Keypair } from '@solana/web3.js';
import { createInitializeMintInstruction, getAssociatedTokenAddress, createAssociatedTokenAccountInstruction, createMintToCheckedInstruction, TOKEN_PROGRAM_ID, MINT_SIZE } from '@solana/spl-token';
import { createCreateMetadataAccountV3Instruction, PROGRAM_ID} from '@metaplex-foundation/mpl-token-metadata';
import { Buffer } from 'buffer';
import { useConnection } from '../components/providers/ConnectionProvider';
import { useAuthorization } from '../components/providers/AuthorizationProvider';
import {
    transact,
    Web3MobileWallet,
  } from '@solana-mobile/mobile-wallet-adapter-protocol-web3js';
  
type Props = {
    config: any
}
export default async function mintNFT({config}: Props) {
    const {connection} = useConnection();
    const {selectedAccount} = useAuthorization();

    const mint = Keypair.generate();
    const mint_signer:Signer = mint;
    const creatorPubKey = selectedAccount!.publicKey;

    const associatedTokenPubkey = await getAssociatedTokenAddress(mint.publicKey, creatorPubKey);

    const tokenPubkey = PublicKey.findProgramAddressSync(
        [ Buffer.from('metadata'), PROGRAM_ID.toBuffer(), mint.publicKey.toBuffer()],
        PROGRAM_ID,
    )[0];
    
    const token_transaction : TransactionInstruction[] = [];

        console.log('Create Mint Account Instructions')
        const createMintAccountInstruction = SystemProgram.createAccount({
            fromPubkey: creatorPubKey,
            newAccountPubkey: mint.publicKey,
            lamports: await connection.getMinimumBalanceForRentExemption(MINT_SIZE),
            space: MINT_SIZE,
            programId: TOKEN_PROGRAM_ID,
        });
        token_transaction.push(createMintAccountInstruction);
    
        console.log('Create Mint Instructions');
        const initializeMintInstruction = createInitializeMintInstruction(
            mint.publicKey,
            0,
            creatorPubKey,
            creatorPubKey,
        );
        token_transaction.push(initializeMintInstruction);
    
        console.log('Create Token Instruction')
        const initializeTokenInstruction = createAssociatedTokenAccountInstruction(
            creatorPubKey, 
            associatedTokenPubkey,
            creatorPubKey,
            mint.publicKey
        )
        token_transaction.push(initializeTokenInstruction);
    
        console.log('Create Mint to Token Instruction')
        const initializeMintToTokenInstruction = createMintToCheckedInstruction(
            mint.publicKey,
            associatedTokenPubkey,
            creatorPubKey,
            1,
            0
        )
        token_transaction.push(initializeMintToTokenInstruction);
    
        console.log('Create Metadata Account')
        const createV3MetadataInstruction = createCreateMetadataAccountV3Instruction(
            {
                metadata: tokenPubkey,
                mint: mint.publicKey,
                mintAuthority: creatorPubKey,
                payer: creatorPubKey,
                updateAuthority: creatorPubKey,
            }, {
                createMetadataAccountArgsV3: {
                    data: {
                        name: config.name.slice(0,9),
                        symbol: 'STABIT',
                        uri: config.uri,
                        sellerFeeBasisPoints: 500,
                        creators: [
                            {
                                address: creatorPubKey,
                                verified: true,
                                share: 100
                            }
                        ],
                        collection: null,
                        uses: null
                    },
                    isMutable: true,
                    collectionDetails: null
                }
            }
        )
    
        token_transaction.push(createV3MetadataInstruction);
    
        let V0Message;
        let Blockhash = (await connection.getLatestBlockhash('finalized')).blockhash;

        V0Message = new TransactionMessage({
            payerKey: creatorPubKey,
            recentBlockhash: Blockhash,
            instructions: token_transaction
        }).compileToV0Message([]);    

    
        const transaction = new VersionedTransaction(V0Message);
    
        const mintSign = transaction.sign([mint_signer]);
    
        console.log('Mint Account Signed');
        
        const signature = await transact(async (wallet: Web3MobileWallet) => {
            const signedTransaction = await wallet.signTransactions({transactions: [transaction]});
            console.log('User Signed', signedTransaction)
        })

        console.log(`Transaction signature: ${signature}`)
}