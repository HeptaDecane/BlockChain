const {Block} = require('./block')
const {GENESIS_DATA} = require('./config')

describe('Block', () => {
    const timestamp = "ssmmhhddMMYYYY"
    const data = ['alpha','beta','gamma']
    const hash = 'foo-hash'
    const lastHash = 'bar-hash'
    const block = new Block({
        timestamp: timestamp,
        data: data,
        hash: hash,
        lastHash: lastHash
    })

    it('has timestamp, data, hash and lastHash property', () => {
        expect(block.timestamp).toEqual(timestamp)
        expect(block.data).toEqual(data)
        expect(block.hash).toEqual(hash)
        expect(block.lastHash).toEqual(lastHash)
    })

    describe('genesis()',() => {
        const genesisBlock = Block.genesis()
        console.log('genesisBlock', genesisBlock)

        it('returns a Block instance', () =>{
            expect(genesisBlock instanceof Block).toBe(true)
        })

        it('has the genesis data', () => {
            expect(genesisBlock).toEqual(GENESIS_DATA)
        })
    })
});