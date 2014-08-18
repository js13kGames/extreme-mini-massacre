module.exports = function (grunt) {
    // Load Grunt tasks declared in the package.json file
    require('matchdep').filterDev('grunt-*').forEach(grunt.loadNpmTasks);

    // Project configuration.
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        copy: {
            main: {
                files: [{
                    expand: true,
                    cwd: 'template/rel',
                    src: ['**'],
                    dest: 'build/src/'
                }]
            },
            dev: {
                files: [{
                    expand: true,
                    src: ['assets/**'],
                    dest: 'dev/'
                }]
            }
        },
        concat: {
            dist: {
                files: {
                    'build/src/game.js': [
                        ['src/main.js', 'src/**/*.js']
                    ]
                }
            }
        },
        uglify: {
            dist: {
                files: {
                    'build/g.js': [
                        'build/src/game.js'
                    ]
                }
            }
        },
        htmlmin: {
            dist: {
                options: {
                    removeComments: true,
                    collapseWhitespace: true
                },
                files: {
                    'build/index.html': 'build/src/index.html'
                }
            }
        },
        cssmin: {
            compress: {
                files: {
                    'build/s.css': ['template/css/**.css']
                }
            }
        },
        pngmin: {
            compile: {
                options: {
                    ext: '.png'
                },
                files: [{
                    src: 'assets/**.png',
                    dest: 'build/assets/'
                }]
            }
        },
        clean: {
            beforeRelease: [
                'build/**/',
                'dev/**/'
            ],
            afterRelease: [
                'build/src',
                'build/zip'
            ]
        },
        compress: {
            main: {
                options: {
                    archive: 'zip/<%= pkg.name %>.zip'
                },
                expand: true,
                cwd: 'build/',
                src: ['**'],
                dest: '/'
            }
        },
        includeSource: {
            myTarget: {
                files: {
                    'dev/index.html': 'template/dev/index.html'
                }
            }
        }
    });

    // Default task(s).
    grunt.registerTask('default', [
        'clean:beforeRelease',
        'copy',
        'concat',
        'uglify',
        'htmlmin',
        'cssmin',
        'pngmin',
        'clean:afterRelease',
        'includeSource',
        'compress'        
    ]);

    grunt.registerTask('dev', [
        'copy:dev',
        'includeSource'
    ]);
};