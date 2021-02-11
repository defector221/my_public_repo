const loaderUtils = require('loader-utils')
const path = require('path');
const dust = require('dustjs-linkedin');

module.exports = function(content) {
    const options = loaderUtils.getOptions(this) || {};

    //If rootDir is configured then omit it from the template name
    const rootDir = options['rootDir'] ? `${path.normalize(options['rootDir'])}${path.sep}` : '';
    const context = this.rootContext || this.options.context; 

    if (typeof options === "string" && options.indexOf('preserveWhitespace') > -1) {
        dust.config.whitespace = true;
    }

    if (options['preserveWhitespace']) {
        dust.config.whitespace = true;
    }

    const name = this.resourcePath
      .replace(context + path.sep + rootDir, '')
      .replace('.dust', '')
      .split(path.sep)
      .join('/');

    if (this.cacheable) {
        this.cacheable();
    }

    const compiled = dust.compile(content, name);
    
    let newSource = 
        `define("${name}", 
            ["dust", "dust-helpers"], function(dust, dust_helpers) {
            ${compiled}
            return function(locals, callback) {
                var rendered;
            
                dust.render("${name}", locals, function(err, result) {
                    if (typeof callback === "function") {
                        try {
                        callback(err, result);
                        } catch (e) {}
                    }
                
                    if (err) {
                        throw err
                    } else {
                        rendered = result;
                    }
                });
        
                return rendered;
            };
        });`;
    
    newSource = newSource.replace("}.call(window));", "").replace("/*** IMPORTS FROM imports-loader ***/(function() {", "");
    return newSource;
}