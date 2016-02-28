/* olli.web */
module.exports = function (grunt) {
    // Project configuration.
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        dir: {
            release: 'web',
            assets: 'web/_assets'
        },
        /* Compile SASS to CSS */
        sass: {
            dist: {
                files: [{
                    expand: true,
                    cwd: '<%= dir.assets %>/sass',
                    src: ['*.scss'],
                    dest: '<%= dir.release %>/css',
                    ext: '.css'
                }]
            }
        },
        /*GRUNTICON*/
        grunticon: {
            myIcons: {
                files: [{
                    expand: true,
                    cwd: '<%= dir.assets %>/icons/source',
                    src: ['*.svg', '*.png'],
                    dest: '<%= dir.release %>/css/icons'
                }],
                options: {
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
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-grunticon');
    // Default task(s).
    grunt.registerTask('css-d', ['sass']);
    grunt.registerTask('default', ['css-d']);
};