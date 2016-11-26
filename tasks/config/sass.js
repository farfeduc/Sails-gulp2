/**
 * Compiles SASS files into CSS.
 *
 * ---------------------------------------------------------------
 *
 * This allows you to control the ordering yourself, i.e. import your
 * dependencies, mixins, variables, resets, etc. before other stylesheets)
 *
 */
module.exports = function(gulp, plugins, growl) {

	var sass = require('gulp-sass');
	
	gulp.task('sass:dev', function() {
		return gulp.src('assets/styles/importer.scss')
				.pipe(sass().on('error', sass.logError))
				.pipe(gulp.dest('.tmp/public/styles/'))
				.pipe(plugins.if(growl, plugins.notify({ message: 'less dev task complete' })));
	});
};
