import axios from 'axios'
import { Transaction } from '@solana/web3.js'
import { createBurnCheckedInstruction } from '@solana/spl-token'
import { transact } from '@solana-mobile/mobile-wallet-adapter-protocol';

async function underdog() {
    axios.defaults.headers.common["Authorization"] = `Bearer b9ac6f302136c1.1aed9740ff8d4ff0b707eabc41293644`;
    const { data } = await axios.get('https://dev.underdogprotocol.com/v2/projects/t/1');
    console.log(res)
    return res;
}

async function createNFT(name, targetAddress, uri, attributes) {
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

async function findNFT(address) {
    axios.defaults.headers.common["Authorization"] = `Bearer b9ac6f302136c1.1aed9740ff8d4ff0b707eabc41293644`;
    const { data } = await axios.get(`https://dev.underdogprotocol.com/v2/projects/t/1/nfts/search?search=${address}`)
    return data
}


export { underdog, createNFT, findNFT }