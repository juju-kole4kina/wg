const { FORBITTEN_ERROR_CODE } = require('../utils/constants')

class ForbittenErr extends Error {
    constructor(message) {
        super(message);
        this.statusCode = FORBITTEN_ERROR_CODE
    }
}

module.exports = ForbittenErr