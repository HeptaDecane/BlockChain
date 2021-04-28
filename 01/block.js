class Block {
    constructor({timestamp, data, hash, lastHash}) {
        this.timestamp = timestamp
        this.data = data
        this.hash = hash
        this.lastHash = lastHash
    }
}

exports.Block = Block