import web3 from "../web3";

const address = '0x1119eA37F43b3C4d795e3Dcd4B47E40D99ea65ec'

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