import Web3 from "web3";

let web3
if (typeof window.ethereum !== 'undefined') {
    console.log('MetaMask is installed!');
    web3 = new Web3(window.ethereum);
    window.ethereum.enable()
        .then(r=>console.log(r))
        .catch(e=>console.log(e))
}

export default web3;