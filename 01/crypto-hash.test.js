const {cryptoHash} = require('./crypto-hash')

describe('cryptoHash()', () => {

    it('generates a SHA256 hashed output', ()=>{
        expect(cryptoHash('foo')).toEqual('2c26b46b68ffc68ff99b453c1d30413413422d706483bfa0f98a5e886266e7ae')
    })
    it('generates same hash for same set of inputs irrespective of order', ()=>{
        expect(cryptoHash('foo','bar')).toEqual(cryptoHash('bar','foo'))
    })
})