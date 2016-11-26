/**
 * Run predefined tasks whenever watched file patterns are added, changed or deleted.
 *
 * ---------------------------------------------------------------
 *
 * Watch for changes on
 * - files in the `assets` folder
 * - the `tasks/pipeline.js` file
 * and re-run the appropriate tasks.
 *
 *
 */
module.exports = function(gulp, plugins, growl) {
	var livereload = require('gulp-livereload');

	gulp.task('watch:api', function() {
		// Watch Style files
		livereload.listen();
		return gulp.watch('api/**/*', ['syncAssets'])
			.on('change',function(){setTimeout(function(){livereload.reload();},1000)});
	});
		
	gulp.task('watch:assets', function() {
		// Watch assets
		livereload.listen();
		return gulp.watch(['assets/**/*', 'tasks/pipeline.js'], ['syncAssets'])
			.on('change',function(){setTimeout(function(){livereload.reload();},1000)});
	});

	gulp.task('watch:views', function() {
		// Watch assets
		livereload.listen();
		return gulp.watch('views/*.ejs', [''])
			.on('change',function(){setTimeout(function(){livereload.reload();},1000)});
	});

};
