import web3 from "../web3";

const address = '0xF93c05e8aB4bD28F5373A271E2bFC6Dff24Ddd45'

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
        name: 'manager',
        outputs: [ { internalType: 'address', name: '', type: 'address' } ],
        stateMutability: 'view',
        type: 'function'
    },
    {
        inputs: [],
        name: 'pickWinner',
        outputs: [ { internalType: 'address', name: '', type: 'address' } ],
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