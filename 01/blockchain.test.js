const {Block} = require('./block')
const {Blockchain} = require('./blockchain')

describe('Blockchain', ()=>{
    const blockchain = new Blockchain();

    it('contains a `chain` of Array instance', ()=>{
        expect(blockchain.chain instanceof Array).toBe(true)
    })
    it('has genesis block at start of the `chain`', ()=>{
        expect(blockchain.chain[0]).toEqual(Block.genesis())
    })

    describe('addBlock()', ()=>{

        it('adds new block to the `chain`', ()=>{
            const data = 'new data'
            blockchain.addBlock({data: data})
            // console.log(blockchain)

            expect(blockchain.chain[blockchain.chain.length-1].data).toEqual(data)
        })
    })
})