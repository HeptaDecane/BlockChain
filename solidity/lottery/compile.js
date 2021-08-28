const fs = require('fs')
const solc = require('solc')

const path = 'contracts/Lottery.sol'
const source = fs.readFileSync(path,'utf8')

let input = {
    language: 'Solidity',
    sources: {
        'Lottery.sol': {
            content: source
        }
    },
    settings: {
        outputSelection: {
            '*': {
                '*': ['*']
            }
        }
    }
};

input = JSON.stringify(input)
let output = solc.compile(input)
output = JSON.parse(output)

const contractFile = output.contracts['Lottery.sol']['Lottery']
module.exports = {
    abi: contractFile.abi,
    bytecode: contractFile.evm.bytecode.object
}