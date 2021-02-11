var logger = require('../logger');
var domain = require('domain');

function initialize() {
    if (process.env.NODE_ENV === 'production') { 
        process.on('uncaughtException', function (er) {
            logger.error(er.stack);
            process.exit(1)
        });

        domain.create().on("error", function(err){
            logger.error(er.stack)
            process.exit(1)
        })
    }
}

module.exports ={
    initialize
}