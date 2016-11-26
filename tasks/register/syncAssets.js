module.exports = function (gulp, plugins) {
	gulp.task('syncAssets', function(cb) {
		plugins.sequence(
			// 'jst:dev',
			// 'images',
			'sass:dev',
			'less:dev',
			'sync:dev',
			'coffee:dev',
			'compileAssets',
			'images',
			'linkAssets',
			cb
		);
	});
};
