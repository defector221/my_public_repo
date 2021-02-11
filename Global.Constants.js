const path = require('path');
module.exports = {
    MEDIA_PATH: path.resolve(__dirname, 'media', 'assets'),
    DB:{
        LOBBY:'Lobby',
        TICKETS:'Tickets',
        MEMBERS:'Members',
        WINNERS:'Winners',
        STATS:'Stats'
    },
    host:'localhost:9000' 
};