'use strict';

var TappableMixin = require('./TappableMixin');
var PinchableMixin = require('./PinchableMixin');
var getComponent = require('./getComponent');
var touchStyles = require('./touchStyles');

var Component = getComponent([TappableMixin, PinchableMixin]);

module.exports = Component;
module.exports.touchStyles = touchStyles;
module.exports.Mixin = Object.assign({}, TappableMixin, {
  onPinchStart: PinchableMixin.onPinchStart,
  onPinchMove: PinchableMixin.onPinchMove,
  onPinchEnd: PinchableMixin.onPinchEnd
});