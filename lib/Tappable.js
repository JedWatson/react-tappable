'use strict';

var TappableMixin = require('./TappableMixin');
var getComponent = require('./getComponent');

var Component = getComponent([TappableMixin]);

module.exports = Component;