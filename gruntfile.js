/* olli.web */
module.exports = function (grunt) {
    // Project configuration.
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        banner: '/*! <%= pkg.title || pkg.name %> - v<%= pkg.version %> - ' +
        '<%= grunt.template.today("yyyy-mm-dd") %>\n' +
        '<%= pkg.homepage ? "* " + pkg.homepage + "\\n" : "" %>' +
        '* Copyright (c) <%= grunt.template.today("yyyy") %> <%= pkg.author %>;' +
        ' <%= pkg.license %> License */\n\n',
        dir: {
            release: 'web',
            build: 'build',
            assets: 'web/_assets',
            components: 'web/_assets/js/components'
        },
/* SVG ICON STUFF */
        svg2png: {
            iconpng: {
                // specify files in array format with multiple src-dest mapping
                files: [
                    // rasterize all SVG files in "img" and its subdirectories to "img/png"
                    { cwd: '<%= dir.assets %>/svg/icons/', src: ['**/*.svg'], dest: '<%= dir.build %>/icons/' }
                ]
            }
        },
        svgstore: {
            iconsvg : {
                options: {prefix:"icon-",includeTitleElement:false},
                files: {
                    '<%= dir.release %>/images/icons.svg': ['<%= dir.build %>/icons/*.svg'],
                },
            },
        },
/* IMAGE STUFF */
        imagemin: {                          // Task
            iconpng: {                         // Another target
                options: {                       // Target options
                    optimizationLevel: 3
                },
                files: [{
                    expand: true,                  // Enable dynamic expansion
                    cwd: '<%= dir.build %>/icons/',                   // Src matches are relative to this path
                    src: ['**/*.{png,jpg,gif}'],   // Actual patterns to match
                    dest: '<%= dir.release %>/images/icons/'                  // Destination path prefix
                }]
            },
            iconsvg: {                         // Another target
                options: {                       // Target options
                    optimizationLevel: 1,
                    svgoPlugins: [
                        {removeDimensions: true},
                        {removeMetadata: true},
                        {removeComments: true},
                        {convertPathData: true},
                        {removeUselessStrokeAndFill: false},
                        {
                            removeHiddenElems: {
                                displayNone: false,
                                opacity0: false
                            }
                        }]
                },
                files: [{
                    expand: true,                  // Enable dynamic expansion
                    cwd: '<%= dir.assets %>/svg/icons/', src: ['**/*.svg'], dest: '<%= dir.build %>/icons/'                }]
            }
        },
        responsive_images: {
            thumbs: {
                options: {
                    sizes: [{
                        name: 'thumb',
                        width: 800,
                        quality: 20
                    }]
                },
                files: [{
                    expand: true,
                    src: ['*.{jpg,gif,png}'],
                    cwd: 'images/',
                    dest: '<%= dir.release %>/images/gallery'
                }]
            }
        },
/* JAVASCRIPT STUFF */
        rollup: {
            options: {
                format: 'iife',
                banner: '<%= banner %>'
            },
            /*
            jsInline: {
                options: {format: 'es'},
                'dest': '<%= dir.build %>/js/inline.js',
                'src': '<%= dir.assets %>/js/inline.js' // Only one source file is permitted
            },
            */
            jsKickstart: {
                options: {
                    moduleName: 'olli'
                },
                'dest': '<%= dir.build %>/js/kickstart.js',
                'src': '<%= dir.assets %>/js/kickstart.js' // Only one source file is permitted
            },
            /*
            jsAsync: {
                options: {
                    moduleName: 'olli'
                },
                'dest': '<%= dir.build %>/js/async.js',
                'src': '<%= dir.assets %>/js/async.js' // Only one source file is permitted
            },
            */
            jsPage: {
                'dest': '<%= dir.build %>/js/page.js',
                'src': '<%= dir.assets %>/js/page.js' // Only one source file is permitted
            }/*,
             jsFonts: {
             options: {format:'es6'},
             'dest':'<%= dir.build %>/js/fonts.js',
             'src' :'<%= dir.assets %>/js/fonts.js' // Only one source file is permitted
             }*/
        },
        uglify: {
            options: {
                //banner: '<%= banner %>'
            },
            dist: {
                options: {
                    compress: {
                        drop_console: true,
                        global_defs: {
                            'DEBUG': false
                        },
                        dead_code: true
                    }
                },
                files: {
                    '<%= dir.release %>/js/kickstart.js': ['<%= dir.build %>/js/kickstart.js'],
                    //'<%= dir.release %>/js/inline.js': ['<%= dir.build %>/js/inline.js'],
                    //'<%= dir.release %>/js/async.js': ['<%= dir.build %>/js/async.js'],
                    '<%= dir.release %>/js/page.js': ['<%= dir.components %>/native.history.js', '<%= dir.build %>/js/page.js'],
                    '<%= dir.release %>/js/promise.js': ['<%= dir.components %>/promise.js']
                }
            },
            dev: {
                options: {
                    mangle: false,
                    compress: false,
                    beautify: true,
                    banner: '<%= banner %>\n/** @const */var DEBUG = true;\n'
                },
                files: {
                    '<%= dir.release %>/js/kickstart.js': ['<%= dir.build %>/js/kickstart.js'],
                    //'<%= dir.release %>/js/inline.js': ['<%= dir.build %>/js/inline.js'],
                    //'<%= dir.release %>/js/async.js': ['<%= dir.build %>/js/async.js'],
                    '<%= dir.release %>/js/page.js': ['<%= dir.components %>/native.history.js', '<%= dir.build %>/js/page.js'],
                    '<%= dir.release %>/js/promise.js': ['<%= dir.components %>/promise.js']
                }
            }


        },
        /* Compile SASS to CSS */
        sass: {
            dist: {
                options: {
                    style: 'expanded',
                    sourcemap: false
                },
                files: [{
                    expand: true,
                    cwd: '<%= dir.assets %>/sass',
                    src: ['*.scss'],
                    dest: '<%= dir.build %>/css',
                    ext: '.css'
                }]
            }
        },
        /*POSTCSS*/
        postcss: {
            options: {
                map: false
            },
            dev: {
                options: {
                    processors: [
                        require('pixrem')() // rem to pixel the result
                    ]
                },
                files: [{
                    expand: true,
                    cwd: '<%= dir.build %>/css',
                    src: ['*.css', '!*.min.css'],
                    dest: '<%= dir.release %>/css',
                    ext: '.css'
                }]
            },
            dist: {
                options: {
                    processors: [
                        require('pixrem')(), // rem to pixel the result
                        require('css-mqpacker')(), // rem to pixel the result
                        require('cssnano')({safe: true,autoprefixer:false,normalizeURL:false}) // minify the result
                    ]
                },
                files: [{
                    expand: true,
                    cwd: '<%= dir.build %>/css',
                    src: ['*.css', '!*.min.css'],
                    dest: '<%= dir.release %>/css',
                    ext: '.css'
                }]
            }
        },
        /*GRUNTICON*/
        watch: {
            sass: {
                files: ['<%= dir.assets %>/sass/**/*.{scss,sass}'],
                tasks: ['sass']
            },
            css: {
                files: ['<%= dir.release %>/css/*.css'],
                options: {
                    livereload: true
                }
            }
        }
    });
    grunt.loadNpmTasks('grunt-contrib-sass');
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-rollup');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-postcss');
    //svg stuff
    grunt.loadNpmTasks('grunt-responsive-images');
    //svg stuff
    grunt.loadNpmTasks('grunt-svg2png');
    grunt.loadNpmTasks('grunt-contrib-imagemin');
    grunt.loadNpmTasks('grunt-svgstore');
    // Default task(s).
    grunt.registerTask('icons',['imagemin:iconsvg','svgstore:iconsvg','svg2png:iconpng','imagemin:iconpng']);
    grunt.registerTask('dev-js', ['rollup', 'uglify:dev']);
    grunt.registerTask('dist-js', ['rollup', 'uglify:dist']);
    grunt.registerTask('dev-css', ['sass', 'postcss:dev']);
    grunt.registerTask('dist-css', ['sass', 'postcss:dist']);

    grunt.registerTask('default', ['dist-css', 'dist-js']);
};