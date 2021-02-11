module.exports = function(grunt){

    // require('load-grunt-task')(grunt);

    grunt.initConfig({
        asestsJSPath: 'app/assests/javascripts',
        pkg: grunt.file.readJSON('package.json'),
        babel:{
            options:{
                sourceMap:false,
                presets:["@babel/preset-react"]
            },
            dist:{
                files:[{
                    expand: true,
                    // cwd:"app/assests/javascripts/",
                    src:"**/*.jsx",
                    // des:"app/assests/javascripts/",
                    ext:".js"
                }]
            }
        },
        watch:{
            configFiles:{
                files:['Gruntfile.js'],
                options:{
                    reload:true
                }
            },
            js:{
                files:['*.jsx'],
                tasks:['babel'],
                options:{
                    livereload:true
                }
            }
        }
    });
    
    grunt.loadNpmTasks('grunt-babel');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.registerTask('default', ['babel']);
}