const ApplicationBase = require('./application.base');
const logger = require('../logger');
class ApplicationHelper extends ApplicationBase{
    constructor(config){
        super(config);
        this.config = config;
    }

    webpack_manifest_script(){
        if(!this.config.webpack.USE_MANIFEST()){
            return '';
        }
       return this.webpack_bundle_script('runtime');
    }

    webpack_bundle_script(bundle){
        if(this.config.webpack.USE_MANIFEST()){
            var manifest = this.config.webpack.ASSET_MANIFEST();
            var fileName = fileName = manifest[bundle+".js"];
            return `${fileName}`;
        }
        return `${this.compute_host_name()}${process.env.JS_PUBLIC_ASSET_PATH}/${bundle}.bundle.js`;
    }

}
module.exports = ApplicationHelper;