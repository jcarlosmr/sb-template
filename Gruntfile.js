
// our wrapper function (required by grunt and its plugins)
// all configuration goes inside this function
module.exports = function(grunt) {
    'use strict';
    require('load-grunt-tasks')(grunt);
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

        watch: {
            bower: {
                files: ['bower.json'],
                tasks: ['wiredep']
            },
            js: {
                files: ['<%= jshint.files %>'],
                tasks: ['newer:jshint', 'injector'],
                options: {
                    livereload: '<%= connect.options.livereload %>'
                },
            },
            html: {
                files: ['<%= appDir.app %>/**/*.html'],
                options: {
                    livereload: '<%= connect.options.livereload %>'
                },
            },
            gruntfile: {
                files: ['Gruntfile.js']
            }
        },

        clean: {
          dist: {
            files: [{
              dot: true,
              src: [
                '.tmp',
                '<%= yeoman.dist %>/{,*/}*',
                '!<%= yeoman.dist %>/.git*'
              ]
            }]
          },
          server: '.tmp'
        },

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

        connect: {
            options: {
                port: 9000,
                // Change this to '0.0.0.0' to access the server from outside.
                hostname: 'localhost',
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

    });

    grunt.registerTask('serve', 'Compile then start a connect web server', function (target) {
        if (target === 'dist') {
            return grunt.task.run(['build', 'connect:dist:keepalive']);
        }

        grunt.task.run([
            'injector',
            'connect:livereload',
            'watch'
        ]);
    });

    // Default task(s).
    grunt.registerTask('default', ['serve']);
};
