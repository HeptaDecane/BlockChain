const {GENESIS_DATA} = require('./config')
const {cryptoHash} = require('./crypto-hash')

class Block {
    constructor({timestamp, data, hash, lastHash}) {
        this.timestamp = timestamp
        this.data = data
        this.hash = hash
        this.lastHash = lastHash
    }

    static genesis(){
        return new Block(GENESIS_DATA)
    }

    static mineBlock({lastBlock, data}){
        const timestamp = Date.now()
        const lastHash = lastBlock.hash

        return new Block({
            timestamp: timestamp,
            data: data,
            hash: cryptoHash(timestamp,data,lastHash),
            lastHash: lastHash
        })
    }
}

exports.Block = Block