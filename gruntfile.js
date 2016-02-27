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
    // Load the plugin that provides the "uglify" task.
    grunt.loadNpmTasks('grunt-contrib-sass');
    grunt.loadNpmTasks('grunt-contrib-watch');
    // Default task(s).
    //grunt.registerTask('default', ['clean',"compass:clean_dev",'preprocess:dev','compass:dev','imagemin:dev','watch']);
    //grunt.registerTask('dev', ['default']);
    //grunt.registerTask('release', ['clean',"compass:clean_release",'preprocess:release','compass:release','cssmin:release','lib','uglify:release','imagemin:release']);
    grunt.registerTask('css-d', ['sass']);
    grunt.registerTask('default', ['css-d']);
};