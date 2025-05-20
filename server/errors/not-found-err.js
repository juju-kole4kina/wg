const { NOT_FOUND_ERROR_CODE } = require('../utils/constants')

class NotFoundErr extends Error {
    constructor(message) {
        super(message);
        this.statusCode = NOT_FOUND_ERROR_CODE
    }
}

module.exports = NotFoundErr