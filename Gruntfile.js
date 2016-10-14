module.exports = function(grunt) {
    "use strict";

    grunt.initConfig({
        clean: [ "build/", "release/" ],
        copy: {
            pre: {
                expand: true,
                flatten: true,
                src: [ "tools/*.js", "hacking/*.js" ],
                dest: "build/",
                options: {
                    process: function(content) {
                        return content.replace(/#s\./g, "SCRIPTOR.").replace(/#db\./g, "DATABASE.").replace(/([\s\S]*)/, "($1)();");
                    }
                }
            },
            post: {
                expand: true,
                flatten: true,
                src: [ "build/*.js" ],
                dest: "release/",
                options: {
                    process: function(content) {
                        return content.replace(/^\!([\s\S]*)\(\);$/, "$1").replace(/^\(([\s\S]*)\)\(\);$/, "$1").replace(/SCRIPTOR\./g, "#s.").replace(/DATABASE\./g, "#db.");
                    }
                }
            }
        },
        jshint: {
            files: [ "Gruntfile.js", "build/*.js" ]
        },
        uglify: {
            all: {
                files: [ {
                    expand: true,
                    src: "build/*.js",
                } ]
            }
        }
    });

    grunt.loadNpmTasks("grunt-contrib-clean");
    grunt.loadNpmTasks("grunt-contrib-copy");
    grunt.loadNpmTasks("grunt-contrib-jshint");
    grunt.loadNpmTasks("grunt-contrib-uglify");

    grunt.registerTask("default", [ "clean", "copy:pre", "jshint", "uglify", "copy:post" ]);
};
