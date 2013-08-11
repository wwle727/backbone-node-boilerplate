/**
 * @file watch-config.js
 * Holds the configuration options for the grunt-contrib-watch plugin
 *
 * @author Justin Helmer 8/5/2013
 */

(function () {
  'use strict';

  module.exports = {
    dev: {
      files: [
        '<%= client.rootPath %>/*.html',
        '<%= client.rootPath %>/templates/*.html',
        '<%= client.rootPath %>/templates/**/*.html',
        '<%= client.scriptPath %>/*.js',
        '<%= client.scriptPath %>/models/*.js',
        '<%= client.scriptPath %>/views/*.js',
        '<%= client.scriptPath %>/views/**/*.js',
        '<%= client.scriptPath %>/collections/*.js',
        '<%= client.scriptPath %>/utils/*.js',
        '<%= client.cssPath %>/*.scss',
        '!<%= client.cssPath %>/*_all.scss',
        '<%= client.cssPath %>/views/*.scss'
      ],
      tasks: ['prepareBuild:dev']
    }
  };
}());