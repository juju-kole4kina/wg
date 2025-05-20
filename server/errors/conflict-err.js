const { CONFLICT_ERROR_CODE } = require('../utils/constants')

class ConflictErr extends Error {
    constructor(message) {
        super(message);
        this.statusCode = CONFLICT_ERROR_CODE;
    }
}

module.exports = ConflictErr;