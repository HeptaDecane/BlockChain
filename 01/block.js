const {GENESIS_DATA} = require('./config')

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
}

exports.Block = Block