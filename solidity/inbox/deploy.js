const HDWalletProvider = require('@truffle/hdwallet-provider')
const Web3 = require('web3')
const {abi,bytecode} = require('./compile')
const {mnemonicPhrase, infuraId} = require('./secrets')

const initialMessage = "Hello"

const provider = new HDWalletProvider({
    mnemonic: {
        phrase: mnemonicPhrase
    },
    providerOrUrl: `https://rinkeby.infura.io/v3/${infuraId}`
})
const web3 = new Web3(provider)

async function deploy(){
    let accounts = await web3.eth.getAccounts()
    console.log('author: ' + accounts[0])

    const inbox = new web3.eth.Contract(abi)
    const inboxTxn = await inbox.deploy({data: bytecode, arguments: [initialMessage]})
        .send({from: accounts[0]})
    console.log('deployed at: ' + inboxTxn.options.address)
}
deploy()