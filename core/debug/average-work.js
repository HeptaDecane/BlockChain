const {Blockchain} = require('../blockchain')

const blockchain = new Blockchain()
const miningRates = []
let prevTimestamp, currentTimestamp, currentBlock, miningRate, average

for (let i=1; ;i++){
    prevTimestamp = blockchain.chain[blockchain.chain.length-1].timestamp

    blockchain.addBlock({data: `block ${i}`})
    currentBlock = blockchain.chain[blockchain.chain.length-1]
    currentTimestamp = currentBlock.timestamp

    miningRate = currentTimestamp-prevTimestamp
    miningRates.push(miningRate)
    average = miningRates.reduce((total,num)=>total+num, 0)/miningRates.length

    console.log(`Mining Rate: ${miningRate}ms, Difficulty: ${currentBlock.difficulty}, Average: ${average}ms`)
}