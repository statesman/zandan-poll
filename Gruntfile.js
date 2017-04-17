module.exports = function(grunt) {
  'use strict';

  // Project configuration.
  grunt.initConfig({

    // Clean files from dist/ before build
    clean: {
      css: ["public/dist/*.css", "public/dist/*.css.map"],
      js: ["public/dist/*.js", "public/dist/*.js.map"],
      fonts: ["public/fonts/**"]
    },

    // Copy FontAwesome files to the fonts/ directory
    copy: {
      fonts: {
        src: [
          'bower_components/font-awesome/fonts/**'
        ],
        dest: 'public/fonts/',
        flatten: true,
        expand: true
      },
      select2: {
        src: [
          'bower_components/select2/*.png',
          'bower_components/select2/*.gif'
        ],
        dest: 'public/dist/',
        flatten: true,
        expand: true
      }
    },

    // Transpile LESS
    less: {
      options: {
        sourceMap: true,
        paths: ['bower_components/bootstrap/less']
      },
      prod: {
        options: {
          compress: true,
          cleancss: true
        },
        files: {
          "public/dist/style.css": "src/css/style.less"
        }
      }
    },

    // Run our JavaScript through JSHint
    jshint: {
      js: {
        src: ['src/js/**/*.js']
      }
    },

    // Runs the r.js optimizer
    requirejs: {
      compile: {
        options: {
          baseUrl: 'src/js',
          mainConfigFile: 'src/js/config.js',
          out: 'public/dist/scripts.js',
          optimize: 'uglify2',
          include: ['config', 'main'],
          name: '../../bower_components/almond/almond',
          generateSourceMaps: true,
          preserveLicenseComments: false
        }
      }
    },

    // turn a google doc of archieML into JSON
    // code for this task lives in tasks/google_archie.js
    data: {
      options:  {
        csvPath: '/ZandanPoll2017_StatesmanData_v1.csv',
        jsonPath: '/../../public/data/questions.json'
      }
    },

    // Watch for changes in LESS and JavaScript files,
    // relint/retranspile when a file changes
    watch: {
      options: {
        livereload: true
      },
      markup: {
        files: ['public/index.php']
      },
      scripts: {
        files: ['src/js/**/*.js'],
        tasks: ['jshint', 'clean:js', 'requirejs']
      },
      styles: {
        files: ['src/css/**.less'],
        tasks: ['clean:css', 'less']
      },
      templates: {
        files: ['src/templates/**/*.hbs'],
        tasks: ['clean:js', 'requirejs']
      }
    },

    // Deploy to CMG servers with FTP
    ftpush: {
      stage: {
        auth: {
          host: 'cmgdtcpxahost.cmg.int',
          port: 21,
          authKey: 'cmg'
        },
        src: 'public',
        dest: '/stage_aas/projects/news/zandan-poll-2017',
        exclusions: ['dist/tmp','Thumbs.db'],
        simple: true,
        useList: false
      },
      prod: {
        auth: {
          host: 'cmgdtcpxahost.cmg.int',
          port: 21,
          authKey: 'cmg'
        },
        src: 'public',
        dest: '/prod_aas/projects/news/zandan-poll-2017',
        exclusions: ['dist/tmp','Thumbs.db'],
        simple: true,
        useList: false
      }
    }

  });

  // Load the task plugins
  grunt.loadNpmTasks('grunt-contrib-less');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-contrib-requirejs');
  grunt.loadNpmTasks('grunt-ftpush');
  grunt.loadTasks('src/data/');

  grunt.registerTask('default', ['jshint', 'clean', 'copy', 'less', 'requirejs']);
  grunt.registerTask('stage', ['default','ftpush:stage']);
  grunt.registerTask('prod', ['default','ftpush:prod']);

};
