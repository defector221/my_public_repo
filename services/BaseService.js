const logger = require('../logger');

module.exports = class BaseService {
    constructor(request){
        this.request = request;
        this.props = {};
        this.preprocess();
    }
    preprocess(){
        if(this.request){
            this.props =  this.request.body
        }
    }
}