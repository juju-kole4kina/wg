const { UNAUTHORIZATION_ERROR_CODE } = require('../utils/constants')

class UnauthorizationErr extends Error {
    constructor(message) {
        super(message);
        this.statusCode = UNAUTHORIZATION_ERROR_CODE
    }
}

module.exports = UnauthorizationErr