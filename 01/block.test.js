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
        // console.log('genesisBlock', genesisBlock)

        it('returns a Block instance', () =>{
            expect(genesisBlock instanceof Block).toBe(true)
        })

        it('has the genesis data', () => {
            expect(genesisBlock).toEqual(GENESIS_DATA)
        })
    })

    describe('mineBlock()', () => {
        const lastBlock = Block.genesis()
        const data = 'mined data'
        const minedBlock = Block.mineBlock({
            lastBlock: lastBlock,
            data: data
        })
        // console.log(minedBlock)

        it('returns a Block instance', () => {
            expect(minedBlock instanceof Block).toBe(true)
        })

        it('sets the `lastHash` to the `hash` of lastBlock', () => {
            expect(minedBlock.lastHash).toEqual(lastBlock.hash)
        })

        it('sets the `data`', () => {
            expect(minedBlock.data).toEqual(data)
        })

        it('sets the `timestamp`', () => {
            expect(minedBlock.timestamp).not.toEqual(undefined)
        })

        it('sets proper sha256 `hash`', () => {
            expect(minedBlock.hash).toHaveLength(64)
            expect(minedBlock.hash).toMatch(/^[a-z0-9]+$/i)
        })
    })
});