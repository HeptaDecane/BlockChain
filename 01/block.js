const {GENESIS_DATA} = require('./config')
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
        let hash,timestamp
        let nonce = 0
        const lastHash = lastBlock.hash
        const {difficulty} = lastBlock

        do{
            nonce++;
            timestamp = Date.now()
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
}

exports.Block = Block