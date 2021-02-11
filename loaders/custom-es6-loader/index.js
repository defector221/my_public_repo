module.exports = require("babel-loader").custom(babel => {
    function myPlugin() {
        return {
          visitor: {},
        };
    }

    return {  
    // Passed Babel's 'PartialConfig' object.
    config(cfg) {
        if (cfg.hasFilesystemConfig()) {
            // Use the normal config
            return cfg.options;
        }
    
        return {
            ...cfg.options,
            presets: ['@babel/preset-env'],
            plugins: [
                ...(cfg.options.plugins || []),
        
                // Include a custom plugin in the options.
                myPlugin,
            ],
        };
        },

      result(result) {
        return {
          ...result,
          code: result.code,
        };
      },
    };
  });
