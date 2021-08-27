const fs = require('fs')
const solc = require('solc')

let path = 'contracts/Inbox.sol'
const source = fs.readFileSync(path,'utf8')

let input = {
    language: "Solidity",
    sources: {
        'Inbox.sol': {
            content: source
        },
        // 'AnotherContract.sol' : {
        //     content: fs.readFileSync('contracts/AnotherContract.sol','utf8')
        // }

    },
    settings: {
        outputSelection: {
            '*': {
                '*': ['*'],
            },
        },
    },
};

input = JSON.stringify(input);
let output = solc.compile(input);
output = JSON.parse(output);

const contractFile = output.contracts['Inbox.sol']['Inbox']
module.exports = {
    abi: contractFile.abi,
    bytecode: contractFile.evm.bytecode.object
}
