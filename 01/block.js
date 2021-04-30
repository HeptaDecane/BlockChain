const {GENESIS_DATA, MINE_RATE} = require('./config')
const {cryptoHash} = require('./crypto-hash')

class Block {
    constructor({timestamp, data, hash, lastHash, nonce, difficulty}) {
        this.timestamp = timestamp
        this.data = data
        this.hash = hash
        this.lastHash = lastHash
        this.nonce = nonce
        this.difficulty = difficulty
    }

    static genesis(){
        return new Block(GENESIS_DATA)
    }

    static mineBlock({lastBlock, data}){
        const lastHash = lastBlock.hash
        let hash,timestamp
        let nonce = 0
        let {difficulty} = lastBlock

        do{
            nonce++;
            timestamp = Date.now()
            difficulty = Block.adjustDifficulty({
                originalBlock: lastBlock,
                timestamp: timestamp
            })
            hash = cryptoHash(timestamp,data,lastHash,nonce,difficulty)

        }while (hash.substring(0,difficulty) !== '0'.repeat(difficulty))

        return new Block({
            timestamp: timestamp,
            data: data,
            hash: hash,
            lastHash: lastHash,
            nonce: nonce,
            difficulty: difficulty
        })
    }

    static adjustDifficulty({originalBlock, timestamp}){
        const {difficulty} = originalBlock
        if(difficulty < 1)
            return 1

        let difference = timestamp - originalBlock.timestamp
        if(difference > MINE_RATE)
            return difficulty-1

        return difficulty+1
    }
}

exports.Block = Block