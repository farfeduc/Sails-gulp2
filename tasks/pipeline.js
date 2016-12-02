/**
 * grunt/pipeline.js
 *
 * The order in which your css, javascript, and template files should be
 * compiled and linked from your views and static HTML files.
 *
 * (Note that you can take advantage of Grunt-style wildcard/glob/splat expressions
 * for matching multiple files.)
 */



// CSS files to inject in order
var cssFilesToInject = [
  //bower_components
  '/bower_components/angular-ui-notification/dist/angular-ui-notification.min.css',
  '/bower_components/ng-dialog/css/ngDialog.min.css',
  '/bower_components/ng-dialog/css/ngDialog-theme-default.css',
  'styles/**/*.css'
];


// Client-side javascript files to inject in order
var jsFilesToInject = [

  //bower_components
  '/bower_components/jquery/dist/jquery.min.js',
  '/bower_components/angular/angular.min.js',
  '/bower_components/angular-route/angular-route.min.js',
  '/bower_components/ng-dialog/js/ngDialog.min.js',
  '/bower_components/angular-ui-notification/dist/angular-ui-notification.min.js',
  //Angular App and Controllers
  'js/app.js',

  '/bower_components/angular-bootstrap/ui-bootstrap-tpls.min.js',
  '/bower_components/bootstrap/dist/js/boostrap.min.js',


  // Dependencies like jQuery, or Angular are brought in here
  'js/dependencies/**/*.js',
  '/js/*.js',

  // All of the rest of your client-side js files
  // will be injected here in no particular order.
  'js/**/*.js'
];


// Client-side HTML templates are injected using the sources below
// The ordering of these templates shouldn't matter.
// (uses Grunt-style wildcard/glob/splat expressions)
//
// By default, Sails uses JST templates and precompiles them into
// functions for you.  If you want to use jade, handlebars, dust, etc.,
// with the linker, no problem-- you'll just want to make sure the precompiled
// templates get spit out to the same file.  Be sure and check out `tasks/README.md`
// for information on customizing and installing new tasks.
var templateFilesToInject = [
  'templates/**/*.html'
];







// Default path for public folder (see documentation for more information)
var tmpPath = '.tmp/public/';

// Prefix relative paths to source files so they point to the proper locations
// (i.e. where the other Grunt tasks spit them out, or in some cases, where
// they reside in the first place)
module.exports.cssFilesToInject = cssFilesToInject.map(function(cssPath) {
  return require('path').join('.tmp/public/', cssPath);
});
module.exports.jsFilesToInject = jsFilesToInject.map(function(jsPath) {
  return require('path').join('.tmp/public/', jsPath);
});
module.exports.templateFilesToInject = templateFilesToInject.map(function(tplPath) {
  return require('path').join('assets/',tplPath);
});
