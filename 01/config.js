const MINE_RATE = 1000
const INITIAL_DIFFICULTY = 3
const GENESIS_DATA = {
    timestamp: 0,
    data: [],
    hash: "first-hash",
    lastHash: null,
    nonce: 0,
    difficulty: INITIAL_DIFFICULTY
}

exports.GENESIS_DATA = GENESIS_DATA
exports.MINE_RATE = MINE_RATE