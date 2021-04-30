const {Block} = require('./block')
const {cryptoHash} = require('./crypto-hash')

class Blockchain {
    constructor() {
        this.chain = [Block.genesis()]
    }

    addBlock({data}) {
        const newBlock = Block.mineBlock({
            lastBlock: this.chain[this.chain.length-1],
            data: data
        })

        this.chain.push(newBlock)
    }

    static isValidChain(chain){
        if(JSON.stringify(chain[0]) !== JSON.stringify(Block.genesis()))
            return false

        for(let i=1; i<chain.length; i++){
            const {timestamp, data, hash, lastHash, nonce, difficulty} = chain[i]
            const previousHash = chain[i-1].hash
            const previousDifficulty = chain[i-1].difficulty
            if(lastHash !== previousHash)
                return false

            const reHash = cryptoHash(timestamp, data, lastHash, nonce, difficulty)
            if(hash !== reHash)
                return false

            if(Math.abs(previousDifficulty-difficulty)>1)
                return false
        }

        return true
    }

    replaceChain(chain){
        if(chain.length <= this.chain.length)
            return;

        if(!Blockchain.isValidChain(chain))
            return;

        this.chain = chain
    }
}

exports.Blockchain = Blockchain