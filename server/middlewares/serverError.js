const { INTERNAL_SERVER_ERROR_CODE, INTERNAL_SERVER_ERROR_MESSAGE } = require('../utils/constants')

const serverError = (err, req, res, next) => {
    const { statusCode = INTERNAL_SERVER_ERROR_CODE, message } = err;
    res.status(statusCode).send({
        message: statusCode === 500
         ? INTERNAL_SERVER_ERROR_MESSAGE
            : message,
    })
    next()
}

module.exports = serverError;