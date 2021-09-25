import Web3 from "web3";
const {infuraId} = require('./secrets')

let web3
if (typeof window.ethereum !== 'undefined') {
    console.log('MetaMask is installed!');
    web3 = new Web3(window.ethereum);
    window.ethereum.request({ method: 'eth_requestAccounts' })
        .then(console.log).catch(console.log)
} else {
    console.log('MetaMask is NOT installed!');
    const provider = new Web3.providers.HttpProvider(`https://rinkeby.infura.io/v3/${infuraId}`)
    web3 = new Web3(provider)
}

export default web3;
