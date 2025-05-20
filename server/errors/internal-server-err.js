const { INTERNAL_SERVER_ERROR_CODE } = require('../utils/constants')

class InternalServerErr extends Error {
    constructor(message) {
        super(message);
        this.statusCode = INTERNAL_SERVER_ERROR_CODE
    }
}

module.exports = InternalServerErr