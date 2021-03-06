/**
 * @file views.js
 * Attach all view contstructors that have templates to Backbone,
 * because this app relies heavily on naming conventions for clean abstraction.
 *
 * This is done so that constructors can be called by name, as to not use eval().
 * @TODO this may need to be addressed differently, so views aren't attached to Backbone
 */

// @see grunt-includes
//#include "_views.js"

define(['backbone'].concat(list), function (Backbone) {
  'use strict';

  // The names of the view constructors can be inferred from the filenames
  var constructorNames = _.map(list, function (viewPath) {
    return viewPath.replace(/views(\/[a-z]+)?\//, '');
  });

  // The constructors are passed in to the define[] context, after Backbone
  var constructors = _.toArray(arguments).slice(1);

  // Make an object of {constructorName => constructor} for all views globally available
  Backbone.viewConstructors = _.object(constructorNames, constructors);
});
