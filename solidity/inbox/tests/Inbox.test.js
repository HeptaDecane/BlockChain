const ganache = require('ganache-cli')
const Web3 = require('web3')

const provider = ganache.provider()
const web3 = new Web3(provider)


let accounts
beforeEach(async ()=>{
    accounts = await web3.eth.getAccounts()
})

describe('Inbox',()=>{
    it('deploys a contract',()=>{
        console.log(accounts)
        expect(true).toBe(true)
    })
})