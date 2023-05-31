import axios from 'axios';
import {Connection, TokenAccountsFilter, clusterApiUrl} from '@solana/web3.js'
import { useConnection } from '../components/providers/ConnectionProvider';
import { useAuthorization } from '../components/providers/AuthorizationProvider';

const url = `https://api.helius.xyz/v0/token-metadata?api-key=${process.env.HELIUS}`

export default async function getMetadata(mint: any) {
    const DEVNET_ENDPOINT = clusterApiUrl('devnet');
    const connection = new Connection(DEVNET_ENDPOINT, 'confirmed');
    const { selectedAccount } = useAuthorization();
    const filter: TokenAccountsFilter = {
        mint: mint
    }
    const tokenAccounts = await connection.getTokenAccountsByOwner(selectedAccount!.publicKey, filter, 'confirmed');
    console.log(tokenAccounts)
    const { data } = await axios.post(url, {
        mintAccounts: tokenAccounts,
        includeOffChain: true,
        disableCache: false,
    });
    console.log("metadata: ", data);
};
