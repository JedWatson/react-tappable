'use strict';

var PinchableBaseMixin = require('./PinchableBaseMixin');
var PinchableMixin = require('./PinchableMixin');
var getComponent = require('./getComponent');

var Component = getComponent([PinchableBaseMixin, PinchableMixin]);

module.exports = Component;