import web3 from "../web3";

const address = '0xe36333EFe14d6D78AA8EB56b545330C02e8B0708'

const abi = [
    { inputs: [], stateMutability: 'nonpayable', type: 'constructor' },
    {
        inputs: [],
        name: 'enter',
        outputs: [],
        stateMutability: 'payable',
        type: 'function'
    },
    {
        inputs: [],
        name: 'getCount',
        outputs: [ { internalType: 'uint256', name: '', type: 'uint256' } ],
        stateMutability: 'view',
        type: 'function'
    },
    {
        inputs: [],
        name: 'getPlayers',
        outputs: [ { internalType: 'address[]', name: '', type: 'address[]' } ],
        stateMutability: 'view',
        type: 'function'
    },
    {
        inputs: [],
        name: 'lastWinner',
        outputs: [ { internalType: 'address', name: '', type: 'address' } ],
        stateMutability: 'view',
        type: 'function'
    },
    {
        inputs: [],
        name: 'manager',
        outputs: [ { internalType: 'address', name: '', type: 'address' } ],
        stateMutability: 'view',
        type: 'function'
    },
    {
        inputs: [],
        name: 'pickWinner',
        outputs: [],
        stateMutability: 'nonpayable',
        type: 'function'
    },
    {
        inputs: [ { internalType: 'uint256', name: '', type: 'uint256' } ],
        name: 'players',
        outputs: [ { internalType: 'address', name: '', type: 'address' } ],
        stateMutability: 'view',
        type: 'function'
    }
]



const Lottery = new web3.eth.Contract(abi,address)
export default Lottery;