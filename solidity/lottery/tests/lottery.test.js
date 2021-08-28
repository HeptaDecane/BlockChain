const Web3 = require('web3')
const {abi,bytecode} = require('../compile')

const web3 = new Web3('http://localhost:8545')

let accounts
let lottery, lotteryTxn

beforeEach(async ()=>{
    accounts = await web3.eth.getAccounts()
    lottery = new web3.eth.Contract(abi)
    lotteryTxn = await lottery.deploy({data:bytecode})
        .send({from:accounts[0], gas:1000000})
})

describe('Lottery',()=>{
    it('has an address',()=>{
        expect(lotteryTxn.options.address).toBeTruthy()
    })

    it('assigns creator as manage',async ()=>{
        let manager = await lotteryTxn.methods.manager().call()
        expect(manager).toEqual(accounts[0])
    })

    it('allows an address to enter', async ()=>{
        let sender = accounts[1]
        await lotteryTxn.methods.enter().send({
            from: sender,
            value: web3.utils.toWei('0.01','ether')
        })

        let players = await lotteryTxn.methods.getPlayers().call()
        let [lastPlayer] = players.slice(-1)
        expect(lastPlayer).toEqual(sender)
    })
})