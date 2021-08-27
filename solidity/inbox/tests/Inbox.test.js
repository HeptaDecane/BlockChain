const ganache = require('ganache-cli')
const Web3 = require('web3')
const {abi,bytecode} = require('../compile')

const provider = ganache.provider()
const web3 = new Web3(provider)


let accounts
let inbox
const initialMessage = "Hello"

beforeEach(async ()=>{
    accounts = await web3.eth.getAccounts()
    inbox = await new web3.eth.Contract(abi)
        .deploy({data: bytecode, arguments:[initialMessage]})
        .send({from: accounts[0], gas:1000000})
})

describe('Inbox',()=>{
    it('deploys a contract',()=>{
        expect(inbox.options.address).toBeTruthy()
    })

    it('has a default message',async ()=>{
        let message = await inbox.methods.message().call()
        expect(message).toEqual(initialMessage)
    })

    it('can update the message', async ()=>{
        let newMessage = "Bye"
        await inbox.methods.setMessage(newMessage).send({from: accounts[0]})

        let message = await inbox.methods.message().call()
        expect(message).toEqual(newMessage)

    })
})