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
        concat: {
            options: {
                banner: '<%= banner %>',
                stripBanners: true
            },
            jsAsync: {
                src: [
                    '<%= dir.assets %>/js/async/loadCSS.js',
                    '<%= dir.assets %>/js/async/onloadCSS.js',
                    '<%= dir.assets %>/js/async/grunticon-loader.js',
                    '<%= dir.assets %>/js/async/async.js'
                ],
                dest: '<%= dir.release %>/js/async.js'
            }
            // CSS concat handled by SASS
        },
        uglify: {
            options: {
                //banner: '<%= banner %>'
            },
            jsAsync: {
                src: '<%= concat.jsAsync.dest %>',
                dest: '<%= dir.release %>/js/async.min.js'
            }
        },

        /* Compile SASS to CSS */
        sass: {
            dist: {
                options: {
                    style: 'expanded',
                    sourcemap: 'file'
                },
                files: [{
                    expand: true,
                    cwd: '<%= dir.assets %>/sass',
                    src: ['*.scss'],
                    dest: '<%= dir.release %>/css',
                    ext: '.css'
                }]
            }
        },
        cssmin: {
            dist: {
                options: {
                    //banner: '<%= banner %>'
                },
                files: [{
                    expand: true,
                    cwd: '<%= dir.release %>/css',
                    src: ['*.css','!*.min.css'],
                    dest: '<%= dir.release %>/css',
                    ext: '.min.css'
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
                    datasvgcss: '_svg.scss',
                    datapngcss: '_png.scss',
                    urlpngcss:  '_fallback.scss',
                    pngfolder: 'icons/',
                    enhanceSVG: false,
                    compressPNG:true
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
    grunt.loadNpmTasks('grunt-contrib-cssmin');
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadTasks('grunt-tasks/ollicon');
    // Default task(s).
    grunt.registerTask('icons', ['ollicon:icons','copy:icons']);
    grunt.registerTask('js', ['concat','uglify']);
    grunt.registerTask('css', ['sass','cssmin']);

    grunt.registerTask('default', ['icons','css','js']);
};