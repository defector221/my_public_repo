var uniqid = require('uniqid');

function generateUniqueCode(){
    return `${new Array(1).fill(Math.random().toString(36).substr(2)).join('-')}-${new Date().getTime().toString(36)}-${Math.random().toString().substr(2)}-${uniqid()}`;
}

module.exports = {
    UUID: generateUniqueCode
}