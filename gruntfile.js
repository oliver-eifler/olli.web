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
            assets: 'web/_assets'
        },
        //copy files
        copy: {
          icons: {
              files:[
                {expand: true,cwd: '<%= dir.build %>/icons',src: ['**/*.png'],dest: '<%= dir.release %>/css'},
                  /*{expand: true,cwd: '<%= dir.build %>/icons',src: ['*.js'],dest: '<%= dir.release %>/js'},*/
                  {expand: true,cwd: '<%= dir.build %>/icons',src: ['*.scss'],dest: '<%= dir.assets %>/sass/icons'}
          ]}
        },
        rollup: {
            options: {
                format: 'iife',
                banner: '<%= banner %>'
            },
            /*
            jsInline: {
                options: {
                    format: 'es6'
                },
                'dest':'<%= dir.build %>/js/inline.js',
                'src' :'<%= dir.assets %>/js/inline.js' // Only one source file is permitted
            },
            */
            jsAsync: {
                options: {
                    moduleName: 'olli'
                },
                'dest':'<%= dir.build %>/js/async.js',
                'src' :'<%= dir.assets %>/js/async.js' // Only one source file is permitted
            },
            jsPage: {
                'dest':'<%= dir.build %>/js/page.js',
                'src' :'<%= dir.assets %>/js/page.js' // Only one source file is permitted
            },
            jsPromise: {
                options: {
                    format: 'es6'
                },
                'dest':'<%= dir.build %>/js/promise.js',
                'src' :'<%= dir.assets %>/js/promise.js' // Only one source file is permitted
            },
            jsHistory: {
                options: {
                    format: 'es6'
                },
                'dest':'<%= dir.build %>/js/history.js',
                'src' :'<%= dir.assets %>/js/history.js' // Only one source file is permitted
            }
        },
        uglify: {
            options: {
                //banner: '<%= banner %>'
            },
            dist: {
                options: {
                    compress: {
                        drop_console:true,
                        global_defs: {
                        'DEBUG': false
                        },
                        dead_code: true
                    }
                },
                files: [
                    {
                        expand: true,
                        cwd: '<%= dir.build %>/js',
                        src: ['*.js','!*.min.js'],
                        dest: '<%= dir.release %>/js',
                        ext: '.js'
                    }
                ]
            },
            dev: {
                options: {
                    mangle:false,
                    compress:false,
                    beautify: true,
                    banner: '<%= banner %>\n/** @const */var DEBUG = true;\n'
                },
                files: [
                    {
                        expand: true,
                        cwd: '<%= dir.build %>/js',
                        src: ['*.js','!*.min.js'],
                        dest: '<%= dir.release %>/js',
                        ext: '.js'
                    }
                ]
            }


        },
        /* Compile SASS to CSS */
        sass: {
            dist: {
                options: {
                    style: 'expanded',
                    sourcemap: 'none'
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
                    src: ['*.css','!*.min.css'],
                    dest: '<%= dir.release %>/css',
                    ext: '.css'
                }]
            },
            dist: {
                options: {
                    processors: [
                        require('pixrem')(), // rem to pixel the result
                        require('css-mqpacker')(), // rem to pixel the result
                        require('cssnano')() // minify the result
                    ]
                },
                files: [{
                    expand: true,
                    cwd: '<%= dir.build %>/css',
                    src: ['*.css','!*.min.css'],
                    dest: '<%= dir.release %>/css',
                    ext: '.css'
                }]
            }
        },
        /*GRUNTICON*/
        ollicon: {
            icons: {
                files: [{
                    expand: true,
                    cwd: '<%= dir.assets %>/icons/source',
                    src: ['*.svg', '*.png'],
                    dest: '<%= dir.build %>/icons'
                }],
                options: {
                    cssprefix: '$icon-',
                    datasvgcss: '_svg.scss',
                    datapngcss: '_png.scss',
                    urlpngcss:  '_fallback.scss',
                    pngfolder: 'icons/',
                    enhanceSVG: false,
                    compressPNG:true,optimizationLevel:4
                }
            }
        },
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
    grunt.loadTasks('grunt-tasks/ollicon');
    // Default task(s).
    grunt.registerTask('icons', ['ollicon:icons','copy:icons']);
    grunt.registerTask('dev-js', ['rollup','uglify:dev']);
    grunt.registerTask('dist-js', ['rollup','uglify:dist']);
    grunt.registerTask('dev-css', ['sass','postcss:dev']);
    grunt.registerTask('dist-css', ['sass','postcss:dist']);

    grunt.registerTask('default', ['icons','dist-css','dist-js']);
};