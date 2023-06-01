import axios from 'axios';
import {Connection, TokenAccountsFilter, clusterApiUrl, PublicKey} from '@solana/web3.js'

const url = `https://api.helius.xyz/v0/token-metadata?api-key=${process.env.HELIUS}`

export default async function getMetadata(selectedAccount: any, mint: any) {
    console.log(url)
    const DEVNET_ENDPOINT = clusterApiUrl('devnet');
    const connection = new Connection(DEVNET_ENDPOINT, 'confirmed');
    const mintPublicKey = new PublicKey(mint)
    const filter: TokenAccountsFilter = {
        mint: mintPublicKey
    }
    const tokenAccounts = await connection.getTokenAccountsByOwner(selectedAccount.publicKey, filter, 'confirmed');
    console.log(tokenAccounts)
    const { data } = await axios.post(url, {
        mintAccounts: tokenAccounts,
        includeOffChain: true,
        disableCache: false,
    });
    console.log("metadata: ", data);
    return tokenAccounts
};
