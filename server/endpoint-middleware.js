/**
 * @file endpoint-middleware.js
 * Middleware for express requests to determine which set of endpoint functions to use,
 * based on type of data requested, and version of data requested.
 *
 * @author Justin Helmer 8/11/2013
 */

(function () {
  'use strict';

  module.exports = function (controller, resourceName, resourcesByVersion) {

    return function (req, res, next) {
      var config = require('./config'),
          _      = require('underscore');

      // Extract the accept header information by assuming only one accept header
      var accept = req.accepted[0];

      // Determine the version requested; default to version '1.0' if no particlar version requested
      var version = accept.params.version || '1.0';

      // Determine the type of data requested (e.g. JSON,XML,HTML,etc)
      var vendorContentType = accept.value;

      // Create a reference to the appropriate resource for the version and type requested.
      var resource, endpoint;
      if (typeof resourcesByVersion[version] !== 'undefined') {
        endpoint = resourcesByVersion[version][resourceName]; // still might be undefined

        if (typeof endpoint !== 'undefined') {
          var standardContentType = config.contentNegotiation[vendorContentType];
          resource = endpoint.api[standardContentType];
        }
        else {
          res.send(404, 'Resource "' + resourceName + '" does not exist');
          next(new Error('Resource "' + resourceName + '" does not exist'));
        }
      }

      if (typeof resource !== 'undefined' && typeof resource[controller] === 'function') {
        res.set('Content-Type', vendorContentType);
        resource[controller](req, res, next);
      }
      else {
        res.send(406, 'Resource "' + resourceName + '" not avaliable for Content-Type: ' + vendorContentType);
        next(new Error('Resource "' + resourceName + '" not avaliable for Content-Type: ' + vendorContentType));
      }
    };
  };
}());
