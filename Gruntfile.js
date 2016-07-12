
// our wrapper function (required by grunt and its plugins)
// all configuration goes inside this function
module.exports = function(grunt) {
    'use strict';

    require('time-grunt')(grunt);
    var serveStatic = require('serve-static');
    // CONFIGURE GRUNT
    var appConfig = {
        app: require('./bower.json').appPath || 'app',
        dist: 'dist'
    };

    grunt.initConfig({
        appDir: appConfig,

        // get the configuration info from package.json file
        // this way we can use things like name and version (pkg.name)
        pkg: grunt.file.readJSON('package.json'),

        wiredep: {
            js: {
                src: ['<%= appDir.app %>/index.html'],
                ignorePath:  /\.\.\//
            },
        },

        jshint: {
            files: [
                'Gruntfile.js',
                '<%= appDir.app %>/feature/**/*.js',
                '<%= appDir.app %>/common/**/*.js'
            ],
            options: {
                // more options here if you want to override JSHint defaults
                globals: {
                    jQuery: true
                }
            }
        },

        // all of our configuration goes here
        uglify: {
            // uglify task configuration
            options: {},
            build: {}
        },

//        connect: {
//            all: {
//                options: {
////                    open: true,
//                    port: 9000,
//                    // Change this to '0.0.0.0' to access the server from outside.
//                    hostname: 'localhost',
//                    livereload: 35729,
//                    base: 'app'
//                },
//            },
//        },
// The actual grunt server settings
        connect: {
            options: {
                port: 9000,
                // Change this to '0.0.0.0' to access the server from outside.
                hostname: '0.0.0.0',
                livereload: 35729
            },
            livereload: {
                options: {
                    open: true,
                    middleware: function (connect) {
                        return [
                            serveStatic('.tmp'),
                            connect().use(
                                '/bower_components',
                                serveStatic('./bower_components')
                            ),
                            connect().use(
                                '/<%= appDir.app %>/feature',
                                serveStatic('./<%= appDir.app %>/feature')
                            ),
                            serveStatic(appConfig.app)
                        ];
                    }
                }
            },
            test: {
                options: {
                    port: 9001,
                    middleware: function (connect) {
                        return [
                            serveStatic('.tmp'),
                            serveStatic('test'),
                            connect().use(
                                '/bower_components',
                                serveStatic('./bower_components')
                            ),
                            serveStatic(appConfig.app)
                        ];
                    }
                }
            },

            dist: {
                options: {
                    open: true,
                    base: '<%= appDir.dist %>'
                }
            }
        },

        injector: {
            options: {
                relative: true
            },
            feature_dependencies: {
                files: {
                    '<%= appDir.app %>/index.html': [
                        '<%= appDir.app %>/feature/**/*.js',
                        '<%= appDir.app %>/feature/**/*.css',
                        '<%= appDir.app %>/common/**/*.js',
                        '<%= appDir.app %>/common/**/*.css'
                    ],
                }
            },
        },

        watch: {
            options: {
                livereload: true,
            },
            js: {
                files: ['<%= jshint.files %>'],
                tasks: ['newer:jshint', 'injector']

            },
            html: {
                files: ['<%= appDir.app %>/**/*.html']
            },
            bower: {
                files: ['bower.json'],
                tasks: ['wiredep']
            },
            gruntfile: {
                files: ['Gruntfile.js']
            }
        }

    });

    grunt.registerTask('serve', 'Compile then start a connect web server', function (target) {
        if (target === 'dist') {
            return grunt.task.run(['build', 'connect:dist:keepalive']);
        }

        grunt.task.run([
            'wiredep',
            'injector',
            'connect:livereload',
            'watch'
        ]);
    });

    // Load the plugin that provides the "uglify" task.
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-connect');
    grunt.loadNpmTasks('grunt-injector');
    grunt.loadNpmTasks('grunt-newer');
    grunt.loadNpmTasks('grunt-wiredep');

    // Default task(s).
    grunt.registerTask('default', ['serve']);
};
