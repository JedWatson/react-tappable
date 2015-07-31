'use strict';

var TappableMixin = require('./TappableMixin');
var getComponent = require('./getComponent');
var touchStyles = require('./touchStyles');

var Component = getComponent([TappableMixin]);

module.exports = Component;
module.exports.touchStyles = touchStyles;
module.exports.Mixin = TappableMixin;