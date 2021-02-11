const logger = require('../logger');
module.exports = function SecurityMiddleware(req, res, next) {
    logger.info("Security Middleware executed");
    next();
}