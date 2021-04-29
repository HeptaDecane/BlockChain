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
            blockchain = new Blockchain()
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

    describe('replaceChain()', ()=>{
        let originalChain
        beforeEach(()=>{
            blockchain = new Blockchain()
            originalChain = blockchain.chain
            blockchain.addBlock({data: 'January'})
            blockchain.addBlock({data: 'February'})
        })

        describe('when the new chain is not longer', ()=>{
            it('does not replaces the chain',()=>{
                const blockchain1 = new Blockchain()
                blockchain1.addBlock({data: 'January'})

                blockchain.replaceChain(blockchain1.chain)
                expect(blockchain.chain).toEqual(originalChain)
            })
        })

        describe('when the chain is longer but invalid', ()=>{
            it('does not replaces the chain',()=>{
                const blockchain1 = new Blockchain()
                blockchain1.addBlock({data: 'January'})
                blockchain1.addBlock({data: 'February'})
                blockchain1.addBlock({data: 'March'})
                blockchain1.chain[2].hash = 'mod-hash'

                blockchain.replaceChain(blockchain1.chain)
                expect(blockchain.chain).toEqual(originalChain)
            })
        })

        describe('when the chain is longer and valid', ()=>{
            it('replaces the chain', ()=>{
                const blockchain1 = new Blockchain()
                blockchain1.addBlock({data: 'January'})
                blockchain1.addBlock({data: 'February'})
                blockchain1.addBlock({data: 'March'})

                blockchain.replaceChain(blockchain1.chain)
                expect(blockchain.chain).toEqual(blockchain1.chain)
            })
        })
    });
})