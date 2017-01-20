'use strict';

var fs = require('fs');

exports.exists_ = function(filepath) {
  return function(success, error) {
    try {
      // http://phantomjs.org/api/fs/method/exists.html
      var exists = fs.exists(filepath);
    } catch (e) {
      error(e);
    }
    success(exists);
  }
}

exports.remove_ = function(filepath) {
  return function(success, error) {
    try {
      // http://phantomjs.org/api/fs/method/remove.html
      fs.remove(filepath);
    } catch (e) {
      error(e);
    }
    success();
  }
}

exports.write_ = function(filepath) {
  function (str) {
    function (filemode) {
      return function(success, error) {
        try {
          // http://phantomjs.org/api/fs/method/write.html
          fs.write(filepath, str, filemode);
        } catch (e) {
          error(e);
        }
        success();
      }
    }
  }
}

exports.lastModified_ = function(filepath) {
  function(toDateTime) {
    return function(success, error) {
      try {
        // http://phantomjs.org/api/fs/method/lastModified.html
        var modified = fs.lastModified(filepath);
        if (modified == null) throw new Error(filepath + ' does not exist.');
        var instant = modified.toTime();
      } catch (e) {
        error(e);
      }
      success(instant);
    }
  }
}
