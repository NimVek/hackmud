module.exports = function(grunt) {
    "use strict";

    grunt.initConfig({
	meta: {
	    user: grunt.option("user") || "nimvek",
	},
        clean: {
	    build: [ "build/" ],
	    release: [ "release/" ],
	},
        copy: {
            pre: {
                expand: true,
                flatten: true,
                src: [ "tools/*.js", "hacking/*.js" ],
                dest: "build/",
                options: {
                    process: function(content) {
                        return content.replace(/#s\./g, "SCRIPTOR.").replace(/#db\./g, "DATABASE.").replace(/([\s\S]*)/, "($1)();").replace(/INCLUDE\((\w+)\)/g, function (match,name) { return "var "+name+" = " + grunt.file.read("lib/"+name+".js")+";"; });
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
                        return content.replace(/^\!([\s\S]*)\(\);$/, "$1").replace(/^\(([\s\S]*)\)\(\);$/, "$1").replace(/SCRIPTOR\./g, "#s.").replace(/DATABASE\./g, "#db.").replace(/LIBRARY/g, grunt.template.process("#s.<%= meta.user %>.lib()"));
                    }
                }
            }
        },
	concat: {
	    lib: {
		options: {
		    banner: "(function () {\nvar l = SCRIPTOR.scripts.lib();\nreturn {\n",
		    footer: "};\n})();",
		    separator: ",\n",
		    process: function(src, filepath) {
			var path = require('path');
			return path.basename(filepath, ".js") + ": " + src.replace(/\s*$/, "");
		    }
		},
		files: {
		"build/lib.js": [ "lib/*.js" ],
		},
	    },
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
    grunt.loadNpmTasks("grunt-contrib-concat");
    grunt.loadNpmTasks("grunt-contrib-jshint");
    grunt.loadNpmTasks("grunt-contrib-uglify");

    grunt.registerTask("default", [ "clean", "copy:pre", "concat", "jshint", "uglify", "copy:post", "clean:build" ]);
};
