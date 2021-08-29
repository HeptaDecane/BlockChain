const Web3 = require('web3')
const {abi,bytecode} = require('../compile')
const assert = require("assert");

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

    it('allow accounts to enter', async ()=>{
        for(let account of accounts){
            await lotteryTxn.methods.enter().send({
                from: account,
                value: web3.utils.toWei('0.01','ether')
            })
        }

        let players = await lotteryTxn.methods.getPlayers().call()

        for(let account of accounts)
            expect(players).toContain(account)
    })

    it('requires min 0.01ETH to enter',async ()=>{
        let error = null
        try {
            await lotteryTxn.methods.enter().send({
                from: accounts[1],
                value: web3.utils.toWei('0.009', 'ether')
            })
        } catch (e){
            error = e;
        }
        expect(error).toBeTruthy()

        error = null;
        try {
            await lotteryTxn.methods.enter().send({
                from: accounts[1],
                value: web3.utils.toWei('0.01', 'ether')
            })
        } catch (e){
            error = e;
        }
        expect(error).toBeFalsy()
    })

    it('allows only manager to pick winner',async ()=>{
        await lotteryTxn.methods.enter().send({
            from: accounts[3],
            value: web3.utils.toWei('0.01', 'ether')
        })

        // invoked by an ordinary account
        let error = null
        try{
            await lotteryTxn.methods.pickWinner().send({from: accounts[1]})
        }catch (e){
            error = e;
        }
        expect(error).toBeTruthy()

        // invoked by a manager
        error = null
        try {
            await lotteryTxn.methods.pickWinner().send({from: accounts[0]})
        }catch (e) {
            error = e
            console.log(e)
        }
        expect(error).toBeFalsy()
    })

    it('sends ether to the winner and resets the players', async ()=>{
        await lotteryTxn.methods.enter().send({
            from: accounts[1],
            value: web3.utils.toWei('2','ether')
        })
        let prizePool = await web3.eth.getBalance(lotteryTxn.options.address)

        let initialBalance = await web3.eth.getBalance(accounts[1])
        await lotteryTxn.methods.pickWinner().send({from: accounts[0]})
        let finalBalance = await web3.eth.getBalance(accounts[1])

        expect(finalBalance-initialBalance).toEqual(parseInt(prizePool))

        let players = await lotteryTxn.methods.getPlayers().call()
        expect(players).toEqual([])
    })
})