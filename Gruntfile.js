module.exports = function (grunt) {
	grunt.initConfig({

		jshint: {
			options: {
				jshintrc: '.jshintrc'
			},
			target: {
				src: 'src/frame.js'
			}
		},

		jasmine: {
			src: 'src/*.js',
			options: {
				specs: 'tests/specs/*.js'
			}
		}

	});
	
	grunt.loadNpmTasks('grunt-contrib-jshint');
	grunt.loadNpmTasks('grunt-contrib-jasmine');
	
	grunt.registerTask('default', ['jshint', 'jasmine']);
}
