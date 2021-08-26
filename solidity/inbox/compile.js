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
        optimizer: {
            enabled: true
        },
        evmVersion: "byzantium",
        outputSelection: {
            "*": {
                "": [
                    "legacyAST",
                    "ast"
                ],
                "*": [
                    "abi",
                    "evm.bytecode.object",
                    "evm.bytecode.sourceMap",
                    "evm.deployedBytecode.object",
                    "evm.deployedBytecode.sourceMap",
                    "evm.gasEstimates"
                ]
            },
        }
    }
};

input = JSON.stringify(input);
let output = solc.compile(input);
// output = JSON.parse(output);

// for (let contractName in output.contracts['Inbox.sol']) {
//     console.log(
//         contractName +
//         ': ' +
//         output.contracts['Inbox.sol'][contractName].evm.bytecode.object
//     );
// }
console.log(output)

// console.log(output.contracts['Inbox.sol']['Inbox'])