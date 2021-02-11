class ApplicationBase{
    constructor(){}
    compute_host_name(){
        if(!this.config.webpack.USE_MANIFEST()){
            return '';
        }
        return this.config.webpack.HOST;
    }
}
module.exports = ApplicationBase;