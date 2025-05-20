const { BAD_REQUEST_ERROR_CODE } = require('../utils/constants')

class BadRequestErr extends Error {
    constructor(message) {
        super(message);
        this.statusCode = BAD_REQUEST_ERROR_CODE;
    }
}

module.exports = BadRequestErr;