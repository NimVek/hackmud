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
			// Determine includes
			var sources = [ content ];
			var topology = [];
			while (sources.length) {
			    var source = sources.shift();
			    var includes = source.match(/.*INCLUDE\(\w+\).*/g);
			    while (includes && includes.length) {
				var include = includes.pop().replace(/.*\((.*)\).*/, "$1");
				sources.push(grunt.file.read("include/"+include+".js"));
				topology.unshift(include);
			    }
			}
			// Collect includes
			var done = [];
			var code = "";
			while (topology.length) {
			    var name = topology.shift();
			    if (done.indexOf( name) < 0) {
				code += "var "+name+" = " + grunt.file.read("include/"+name+".js")+";\n";
				done.push(name);
			    }
			}

			// prepare code for linting and uglifing
			content = content.replace(/.*INCLUDE\(\w+\).*/, code);
			content = content.replace(/.*INCLUDE\(\w+\).*/g, "");
			content = content.replace(/#s\./g, "SCRIPTOR.");
			content = content.replace(/#db\./g, "DATABASE.");
			content = content.replace(/([\s\S]*)/, "($1)();");
                        return content;
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
        jshint: {
            files: [ "Gruntfile.js", "build/*.js" ]
        },
        uglify: {
	    options: {
		mangle: true,
		compress: true,
		beautify: true
	    },
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

    grunt.registerTask("default", [ "static" ]);
    grunt.registerTask("static", "build static scripts", [ "clean", "copy:pre", "jshint", "uglify", "copy:post", "clean:build" ]);
};
