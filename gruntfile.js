/* olli.web */
module.exports = function (grunt) {
    // Project configuration.
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
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
                  {expand: true,cwd: '<%= dir.build %>/icons',src: ['*.js'],dest: '<%= dir.release %>/js'},
                  {expand: true,cwd: '<%= dir.build %>/icons',src: ['*.scss'],dest: '<%= dir.assets %>/sass/icons'}
          ]}
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
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadTasks('grunt-tasks/ollicon');
    // Default task(s).
    grunt.registerTask('css-d', ['sass']);
    grunt.registerTask('default', ['css-d']);
    grunt.registerTask('icons', ['ollicon:icons','copy:icons']);
};