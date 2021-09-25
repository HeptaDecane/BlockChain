const Web3 = require('web3');
const campaignInterface = require('../build/Campaign.json');
const factoryInterface = require('../build/Factory.json');

const web3 = new Web3('http://localhost:8545')

let accounts
let campaign
let factory

beforeEach(async ()=>{
    accounts = await web3.eth.getAccounts()
    factory = new web3.eth.Contract(factoryInterface.abi)
    factory = await factory.deploy({data: factoryInterface.evm.bytecode.object})
        .send({from:accounts[0], gas:2000000})

    await factory.methods.createCampaign(web3.utils.toWei('0.01','ether'))
        .send({from:accounts[0], gas: 2000000})
    let [campaignAddress] = await factory.methods.getDeployedCampaigns().call()

    campaign = new web3.eth.Contract(campaignInterface.abi,campaignAddress)
})

describe('Factory',()=>{
    it('has an address',()=>{
        expect(factory.options.address).toBeTruthy()
    })

    it('deploys an instance of Campaign', ()=>{
        expect(campaign.options.address).toBeTruthy()
    })
})


describe('Campaign',()=>{
    it('assigns creator as manager',async ()=>{
        let manager = await campaign.methods.manager().call()
        expect(manager).toEqual(accounts[0])
    })

    it('allow accounts to contribute and mark them as contributors', async ()=>{
        await campaign.methods.contribute().send({
            from: accounts[1],
            value: web3.utils.toWei('0.1','ether')
        })

        let isContributor = await campaign.methods.contributors(accounts[1]).call()
        expect(isContributor).toBe(true)
    })

    it('requires min 0.01ETH to contribute',async ()=>{
        let error = null
        try {
            await campaign.methods.contribute().send({
                from: accounts[1],
                value: web3.utils.toWei('0.009', 'ether')
            })
        } catch (e){
            error = e;
        }
        expect(error).toBeTruthy()

        error = null;
        try {
            await campaign.methods.contribute().send({
                from: accounts[1],
                value: web3.utils.toWei('0.01', 'ether')
            })
        } catch (e){
            error = e;
        }
        expect(error).toBeFalsy()
    })

    it('allows the manager to create a payment request',async ()=>{
        let description = 'Test Request'
        let value = web3.utils.toWei('0.01', 'ether')
        let recipient = accounts[7]
        await campaign.methods.createRequest(description,value,recipient)
            .send({from:accounts[0], gas:2000000})

        let request = await campaign.methods.requests(0).call()
        expect(request.description).toEqual(description)
        expect(request.value).toEqual(value)
        expect(request.recipient).toEqual(recipient)
    })
})