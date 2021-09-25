const HDWalletProvider = require('@truffle/hdwallet-provider')
const Web3 = require('web3')
const factoryInterface = require('./build/Factory.json');
const {mnemonicPhrase,infuraId} = require('./secrets')


const provider = new HDWalletProvider({
    mnemonic: {phrase: mnemonicPhrase},
    providerOrUrl: `https://rinkeby.infura.io/v3/${infuraId}`
})
const web3 = new Web3(provider)

async function deploy(){
    const accounts = await web3.eth.getAccounts()
    console.log(`author: ${accounts[0]}`)

    let factory = new web3.eth.Contract(factoryInterface.abi)
    factory = await factory.deploy({data:factoryInterface.evm.bytecode.object})
        .send({from: accounts[0]})
    console.log(`deployed at: ${factory.options.address}`)
}
deploy().then(()=>process.exit(0))