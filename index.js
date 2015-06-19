var gutil = require('gulp-util');
var through = require('through2');
var cssImprt = require('rework-import');
var rework = require('rework');
var path = require('path');

// Consts
var PLUGIN_NAME = 'gulp-rework-import';

module.exports = function() {
  return through.obj(function (file, enc, next) {
      if (file.isStream()) {
          //todo support stream 
          this.emit('error', new gutil.PluginError(PLUGIN_NAME, 'Streaming not supported'));
          return next();
      }

      if (file.isBuffer()) {
          var css = rework(file.contents.toString(enc)).use(cssImprt({ path: path.dirname(file.path) }))
          file.contents = new Buffer(css.toString(enc))
      }
      // make sure the file goes through the next gulp plugin
      this.push(file);
      // tell the stream engine that we are done with this file
      next();
  })
}
