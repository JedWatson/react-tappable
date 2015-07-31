'use strict';

var PinchableBaseMixin = require('./PinchableBaseMixin');
var PinchableMixin = require('./PinchableMixin');
var getComponent = require('./getComponent');
var touchStyles = require('./touchStyles');

var Component = getComponent([PinchableBaseMixin, PinchableMixin]);

module.exports = Component;
module.exports.touchStyles = touchStyles;