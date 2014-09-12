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
                    'temp/game.js': [
                        //['src_original/main.js', 'src_original/utils.js', 'src_original/audio.js', 'src_original/**/*.js']
                        ['src/utils.js', 'src/audio.js', 'src/**/*.js', 'src/main.js']
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
                    ext: '.png',
                    colors: 3
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
                'temp/',
                'build/src',
                'build/zip',
                'build/g.js.report.txt'
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
        },
        'closure-compiler': {
            frontend: {
                closurePath: 'node_modules',
                js: 'temp/game.js',
                jsOutputFile: 'build/g.js',
                options: {
                    compilation_level: 'ADVANCED_OPTIMIZATIONS'
                }
            }
        },
        replace: {
            another_example: {
                src: ['temp/game.js'],
                overwrite: true,
                replacements: [{
                    from: /(GFX\b)/g,
                    to: 'GF'
                }, {
                    from: /(Rectangle\b)/g,
                    to: 'b'
                }, {
                    from: /(GamePad\b)/g,
                    to: 'c'
                }, {
                    from: /(LAST_POS\b)/g,
                    to: 'd'
                }, {
                    from: /(Bullet\b)/g,
                    to: 'f'
                }, {
                    from: /(GAME_WIDTH\b)/g,
                    to: 'H'
                }, {
                    from: /(Player\b)/g,
                    to: 'PL'
                }, {
                    from: /(keyboard\b)/g,
                    to: 'j'
                }, {
                    from: /(mouse\b)/g,
                    to: 'k'
                }, {
                    from: /(Graphics\b)/g,
                    to: 'l'
                }, {
                    from: /(Room\b)/g,
                    to: 'm'
                }, {
                    from: /(State\b)/g,
                    to: 'n'
                }, {
                    from: /(GAME_HEIGHT\b)/g,
                    to: 'O'
                }, {
                    from: /(mainLoop\b)/g,
                    to: 'ml'
                }, {
                    from: /(FONT_BLACK\b)/g,
                    to: 'q'
                }, {
                    from: /(Sound\b)/g,
                    to: 'r'
                }, {
                    from: /(Collision\b)/g,
                    to: 'COL'
                }, {
                    from: /(overlap\b)/g,
                    to: 't'
                }, {
                    from: /(fdsfsdfdsfs\b)/g,
                    to: 'u'
                }, {
                    from: /(FONT_WHITE\b)/g,
                    to: 'v'
                }, {
                    from: /(Game\b)/g,
                    to: 'w'
                }, {
                    from: /(Particle\b)/g,
                    to: 'y'
                }, {
                    from: /(Base\b)/g,
                    to: 'z'
                }, {
                    from: /(mix\b)/g,
                    to: 'A'
                }]
            }
        },
        uglify: {
            dist: {
                files: {
                    'build/g.js': [
                        'temp/game.js'
                    ]
                }
            }
        }
    });

    // Default task(s).
    grunt.registerTask('default', [
        'clean:beforeRelease',
        'copy',
        'concat',
        //'replace',
        'closure-compiler',
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