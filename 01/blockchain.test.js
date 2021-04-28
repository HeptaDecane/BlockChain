const {Block} = require('./block')
const {Blockchain} = require('./blockchain')

describe('Blockchain', ()=>{
    let blockchain
    beforeEach(()=>{
        blockchain = new Blockchain();
    })

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

    describe('isValidChain()', ()=>{
        beforeEach(()=>{
            blockchain.addBlock({data: 'January'})
            blockchain.addBlock({data: 'February'})
            blockchain.addBlock({data: 'March'})
            blockchain.addBlock({data: 'April'})
        })

        describe('when chain does not start with genesis block', ()=>{
            it('returns false',()=>{
                blockchain.chain[0] = {
                    timestamp: Date.now(),
                    data: "mod-data",
                    hash: "mod-first-hash",
                    lastHash: null
                }
                expect(Blockchain.isValidChain(blockchain.chain)).toBe(false)
            })
        })

        describe('when a `lastHash` reference is invalid', ()=>{
            it('returns false', ()=>{
                blockchain.chain[2].lastHash = 'mod-last-hash'
                expect(Blockchain.isValidChain(blockchain.chain)).toBe(false)
            })
        })

        describe('when a chain contain blocks with invalid field', ()=>{
            it('returns true', ()=>{
                blockchain.chain[3].data = "mod-data"
                blockchain.chain[3].timestamp = Date.now();
                expect(Blockchain.isValidChain(blockchain.chain)).toBe(false)
            })
        })

        describe('when all blocks are valid', ()=>{
            it('returns true', ()=>{
                expect(Blockchain.isValidChain(blockchain.chain)).toBe(true)
            })
        })
    })
})