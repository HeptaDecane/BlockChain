const MINE_RATE = 1000
const INITIAL_DIFFICULTY = 3
const GENESIS_DATA = {
    timestamp: Date.now(),
    data: [],
    hash: "first-hash",
    lastHash: null,
    nonce: 0,
    difficulty: INITIAL_DIFFICULTY
}

exports.GENESIS_DATA = GENESIS_DATA
exports.MINE_RATE = MINE_RATE