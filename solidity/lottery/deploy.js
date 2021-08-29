const HDWalletProvider = require('@truffle/hdwallet-provider')
const Web3 = require('web3')
const {abi,bytecode} = require('./compile')
const {mnemonicPhrase,infuraId} = require('./secrets')
const util = require("util");


console.log('abi:',util.inspect(abi,false,null))

const provider = new HDWalletProvider({
    mnemonic: {phrase: mnemonicPhrase},
    providerOrUrl: `https://rinkeby.infura.io/v3/${infuraId}`
})
const web3 = new Web3(provider)

async function deploy(){
    const accounts = await web3.eth.getAccounts()
    console.log(`author: ${accounts[0]}`)

    const lottery = new web3.eth.Contract(abi)
    const lotteryTxn = await lottery.deploy({data:bytecode})
        .send({from: accounts[0]})
    console.log(`deployed at: ${lotteryTxn.options.address}`)
}
deploy().then(r=>process.exit(0))