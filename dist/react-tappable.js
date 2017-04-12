(function(f){if(typeof exports==="object"&&typeof module!=="undefined"){module.exports=f()}else if(typeof define==="function"&&define.amd){define([],f)}else{var g;if(typeof window!=="undefined"){g=window}else if(typeof global!=="undefined"){g=global}else if(typeof self!=="undefined"){g=self}else{g=this}g.Tappable = f()}})(function(){var define,module,exports;return (function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict';

var TappableMixin = require('./TappableMixin');
var getComponent = require('./getComponent');
var touchStyles = require('./touchStyles');

var Component = getComponent([TappableMixin]);

module.exports = Component;
module.exports.touchStyles = touchStyles;
module.exports.Mixin = TappableMixin;

},{"./TappableMixin":2,"./getComponent":3,"./touchStyles":4}],2:[function(require,module,exports){
(function (global){
'use strict';

var React = (typeof window !== "undefined" ? window['React'] : typeof global !== "undefined" ? global['React'] : null);
var ReactDOM = (typeof window !== "undefined" ? window['ReactDOM'] : typeof global !== "undefined" ? global['ReactDOM'] : null);
var PropTypes = (typeof window !== "undefined" ? window['PropTypes'] : typeof global !== "undefined" ? global['PropTypes'] : null);

var SPACE_KEY = 32;
var ENTER_KEY = 13;

function getTouchProps(touch) {
  if (!touch) return {};
  return {
    pageX: touch.pageX,
    pageY: touch.pageY,
    clientX: touch.clientX,
    clientY: touch.clientY
  };
}

var Mixin = {
  propTypes: {
    moveThreshold: PropTypes.number, // pixels to move before cancelling tap
    activeDelay: PropTypes.number, // ms to wait before adding the `-active` class
    pressDelay: PropTypes.number, // ms to wait before detecting a press
    pressMoveThreshold: PropTypes.number, // pixels to move before cancelling press
    preventDefault: PropTypes.bool, // whether to preventDefault on all events
    stopPropagation: PropTypes.bool, // whether to stopPropagation on all events

    onTap: PropTypes.func, // fires when a tap is detected
    onPress: PropTypes.func, // fires when a press is detected
    onTouchStart: PropTypes.func, // pass-through touch event
    onTouchMove: PropTypes.func, // pass-through touch event
    onTouchEnd: PropTypes.func, // pass-through touch event
    onMouseDown: PropTypes.func, // pass-through mouse event
    onMouseUp: PropTypes.func, // pass-through mouse event
    onMouseMove: PropTypes.func, // pass-through mouse event
    onMouseOut: PropTypes.func, // pass-through mouse event
    onKeyDown: PropTypes.func, // pass-through key event
    onKeyUp: PropTypes.func },

  // pass-through key event
  getDefaultProps: function getDefaultProps() {
    return {
      activeDelay: 0,
      moveThreshold: 100,
      pressDelay: 1000,
      pressMoveThreshold: 5
    };
  },

  getInitialState: function getInitialState() {
    return {
      isActive: false,
      touchActive: false,
      pinchActive: false
    };
  },

  componentWillUnmount: function componentWillUnmount() {
    this.cleanupScrollDetection();
    this.cancelPressDetection();
    this.clearActiveTimeout();
  },

  processEvent: function processEvent(event) {
    if (this.props.preventDefault) event.preventDefault();
    if (this.props.stopPropagation) event.stopPropagation();
  },

  onTouchStart: function onTouchStart(event) {
    if (this.props.onTouchStart && this.props.onTouchStart(event) === false) return;
    this.processEvent(event);
    window._blockMouseEvents = true;
    if (event.touches.length === 1) {
      this._initialTouch = this._lastTouch = getTouchProps(event.touches[0]);
      this.initScrollDetection();
      this.initPressDetection(event, this.endTouch);
      this.initTouchmoveDetection();
      this._activeTimeout = setTimeout(this.makeActive, this.props.activeDelay);
    } else if (this.onPinchStart && (this.props.onPinchStart || this.props.onPinchMove || this.props.onPinchEnd) && event.touches.length === 2) {
      this.onPinchStart(event);
    }
  },

  makeActive: function makeActive() {
    if (!this.isMounted()) return;
    this.clearActiveTimeout();
    this.setState({
      isActive: true
    });
  },

  clearActiveTimeout: function clearActiveTimeout() {
    clearTimeout(this._activeTimeout);
    this._activeTimeout = false;
  },

  initScrollDetection: function initScrollDetection() {
    this._scrollPos = { top: 0, left: 0 };
    this._scrollParents = [];
    this._scrollParentPos = [];
    var node = ReactDOM.findDOMNode(this);

    while (node) {
      if (node.scrollHeight > node.offsetHeight || node.scrollWidth > node.offsetWidth) {
        this._scrollParents.push(node);
        this._scrollParentPos.push(node.scrollTop + node.scrollLeft);
        this._scrollPos.top += node.scrollTop;
        this._scrollPos.left += node.scrollLeft;
      }

      node = node.parentNode;
    }
  },

  initTouchmoveDetection: function initTouchmoveDetection() {
    this._touchmoveTriggeredTimes = 0;
  },

  cancelTouchmoveDetection: function cancelTouchmoveDetection() {
    if (this._touchmoveDetectionTimeout) {
      clearTimeout(this._touchmoveDetectionTimeout);
      this._touchmoveDetectionTimeout = null;
      this._touchmoveTriggeredTimes = 0;
    }
  },

  calculateMovement: function calculateMovement(touch) {
    return {
      x: Math.abs(touch.clientX - this._initialTouch.clientX),
      y: Math.abs(touch.clientY - this._initialTouch.clientY)
    };
  },

  detectScroll: function detectScroll() {
    var currentScrollPos = { top: 0, left: 0 };
    for (var i = 0; i < this._scrollParents.length; i++) {
      currentScrollPos.top += this._scrollParents[i].scrollTop;
      currentScrollPos.left += this._scrollParents[i].scrollLeft;
    }
    return !(currentScrollPos.top === this._scrollPos.top && currentScrollPos.left === this._scrollPos.left);
  },

  cleanupScrollDetection: function cleanupScrollDetection() {
    this._scrollParents = undefined;
    this._scrollPos = undefined;
  },

  initPressDetection: function initPressDetection(event, callback) {
    if (!this.props.onPress) return;
    this._pressTimeout = setTimeout((function () {
      this.props.onPress(event);
      callback();
    }).bind(this), this.props.pressDelay);
  },

  cancelPressDetection: function cancelPressDetection() {
    clearTimeout(this._pressTimeout);
  },

  onTouchMove: function onTouchMove(event) {
    if (this._initialTouch) {
      this.processEvent(event);

      if (this.detectScroll()) {
        return this.endTouch(event);
      } else {
        if (this._touchmoveTriggeredTimes++ === 0) {
          this._touchmoveDetectionTimeout = setTimeout((function () {
            if (this._touchmoveTriggeredTimes === 1) {
              this.endTouch(event);
            }
          }).bind(this), 64);
        }
      }

      this.props.onTouchMove && this.props.onTouchMove(event);
      this._lastTouch = getTouchProps(event.touches[0]);
      var movement = this.calculateMovement(this._lastTouch);
      if (movement.x > this.props.pressMoveThreshold || movement.y > this.props.pressMoveThreshold) {
        this.cancelPressDetection();
      }
      if (movement.x > this.props.moveThreshold || movement.y > this.props.moveThreshold) {
        if (this.state.isActive) {
          this.setState({
            isActive: false
          });
        } else if (this._activeTimeout) {
          this.clearActiveTimeout();
        }
      } else {
        if (!this.state.isActive && !this._activeTimeout) {
          this.setState({
            isActive: true
          });
        }
      }
    } else if (this._initialPinch && event.touches.length === 2 && this.onPinchMove) {
      this.onPinchMove(event);
      event.preventDefault();
    }
  },

  onTouchEnd: function onTouchEnd(event) {
    var _this = this;

    if (this._initialTouch) {
      this.processEvent(event);
      var afterEndTouch;
      var movement = this.calculateMovement(this._lastTouch);
      if (movement.x <= this.props.moveThreshold && movement.y <= this.props.moveThreshold && this.props.onTap) {
        event.preventDefault();
        afterEndTouch = function () {
          var finalParentScrollPos = _this._scrollParents.map(function (node) {
            return node.scrollTop + node.scrollLeft;
          });
          var stoppedMomentumScroll = _this._scrollParentPos.some(function (end, i) {
            return end !== finalParentScrollPos[i];
          });
          if (!stoppedMomentumScroll) {
            _this.props.onTap(event);
          }
        };
      }
      this.endTouch(event, afterEndTouch);
    } else if (this.onPinchEnd && this._initialPinch && event.touches.length + event.changedTouches.length === 2) {
      this.onPinchEnd(event);
      event.preventDefault();
    }
  },

  endTouch: function endTouch(event, callback) {
    this.cancelTouchmoveDetection();
    this.cancelPressDetection();
    this.clearActiveTimeout();
    if (event && this.props.onTouchEnd) {
      this.props.onTouchEnd(event);
    }
    this._initialTouch = null;
    this._lastTouch = null;
    if (callback) {
      callback();
    }
    if (this.state.isActive) {
      this.setState({
        isActive: false
      });
    }
  },

  onMouseDown: function onMouseDown(event) {
    if (window._blockMouseEvents) {
      window._blockMouseEvents = false;
      return;
    }
    if (this.props.onMouseDown && this.props.onMouseDown(event) === false) return;
    this.processEvent(event);
    this.initPressDetection(event, this.endMouseEvent);
    this._mouseDown = true;
    this.setState({
      isActive: true
    });
  },

  onMouseMove: function onMouseMove(event) {
    if (window._blockMouseEvents || !this._mouseDown) return;
    this.processEvent(event);
    this.props.onMouseMove && this.props.onMouseMove(event);
  },

  onMouseUp: function onMouseUp(event) {
    if (window._blockMouseEvents || !this._mouseDown) return;
    this.processEvent(event);
    this.props.onMouseUp && this.props.onMouseUp(event);
    this.props.onTap && this.props.onTap(event);
    this.endMouseEvent();
  },

  onMouseOut: function onMouseOut(event) {
    if (window._blockMouseEvents || !this._mouseDown) return;
    this.processEvent(event);
    this.props.onMouseOut && this.props.onMouseOut(event);
    this.endMouseEvent();
  },

  endMouseEvent: function endMouseEvent() {
    this.cancelPressDetection();
    this._mouseDown = false;
    this.setState({
      isActive: false
    });
  },

  onKeyUp: function onKeyUp(event) {
    if (!this._keyDown) return;
    this.processEvent(event);
    this.props.onKeyUp && this.props.onKeyUp(event);
    this.props.onTap && this.props.onTap(event);
    this._keyDown = false;
    this.cancelPressDetection();
    this.setState({
      isActive: false
    });
  },

  onKeyDown: function onKeyDown(event) {
    if (this.props.onKeyDown && this.props.onKeyDown(event) === false) return;
    if (event.which !== SPACE_KEY && event.which !== ENTER_KEY) return;
    if (this._keyDown) return;
    this.initPressDetection(event, this.endKeyEvent);
    this.processEvent(event);
    this._keyDown = true;
    this.setState({
      isActive: true
    });
  },

  endKeyEvent: function endKeyEvent() {
    this.cancelPressDetection();
    this._keyDown = false;
    this.setState({
      isActive: false
    });
  },

  cancelTap: function cancelTap() {
    this.endTouch();
    this._mouseDown = false;
  },

  handlers: function handlers() {
    return {
      onTouchStart: this.onTouchStart,
      onTouchMove: this.onTouchMove,
      onTouchEnd: this.onTouchEnd,
      onMouseDown: this.onMouseDown,
      onMouseUp: this.onMouseUp,
      onMouseMove: this.onMouseMove,
      onMouseOut: this.onMouseOut,
      onKeyDown: this.onKeyDown,
      onKeyUp: this.onKeyUp
    };
  }
};

module.exports = Mixin;

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{}],3:[function(require,module,exports){
(function (global){
'use strict';

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var React = (typeof window !== "undefined" ? window['React'] : typeof global !== "undefined" ? global['React'] : null);
var PropTypes = (typeof window !== "undefined" ? window['PropTypes'] : typeof global !== "undefined" ? global['PropTypes'] : null);
var touchStyles = require('./touchStyles');

/**
 * Tappable Component
 * ==================
 */
module.exports = function (mixins) {
  return React.createClass({
    displayName: 'Tappable',

    mixins: mixins,

    propTypes: {
      component: PropTypes.any, // component to create
      className: PropTypes.string, // optional className
      classBase: PropTypes.string, // base for generated classNames
      classes: PropTypes.object, // object containing the active and inactive class names
      style: PropTypes.object, // additional style properties for the component
      disabled: PropTypes.bool // only applies to buttons
    },

    getDefaultProps: function getDefaultProps() {
      return {
        component: 'span',
        classBase: 'Tappable'
      };
    },

    render: function render() {
      var props = this.props;
      var className = props.classBase + (this.state.isActive ? '-active' : '-inactive');

      if (props.className) {
        className += ' ' + props.className;
      }

      if (props.classes) {
        className += ' ' + (this.state.isActive ? props.classes.active : props.classes.inactive);
      }

      var style = {};
      _extends(style, touchStyles, props.style);

      var newComponentProps = _extends({}, props, {
        style: style,
        className: className,
        disabled: props.disabled,
        handlers: this.handlers
      }, this.handlers());

      delete newComponentProps.activeDelay;
      delete newComponentProps.classBase;
      delete newComponentProps.classes;
      delete newComponentProps.handlers;
      delete newComponentProps.onTap;
      delete newComponentProps.onPress;
      delete newComponentProps.onPinchStart;
      delete newComponentProps.onPinchMove;
      delete newComponentProps.onPinchEnd;
      delete newComponentProps.moveThreshold;
      delete newComponentProps.pressDelay;
      delete newComponentProps.pressMoveThreshold;
      delete newComponentProps.preventDefault;
      delete newComponentProps.stopPropagation;
      delete newComponentProps.component;

      return React.createElement(props.component, newComponentProps, props.children);
    }
  });
};

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{"./touchStyles":4}],4:[function(require,module,exports){
'use strict';

var touchStyles = {
  WebkitTapHighlightColor: 'rgba(0,0,0,0)',
  WebkitTouchCallout: 'none',
  WebkitUserSelect: 'none',
  KhtmlUserSelect: 'none',
  MozUserSelect: 'none',
  msUserSelect: 'none',
  userSelect: 'none',
  cursor: 'pointer'
};

module.exports = touchStyles;

},{}]},{},[1])(1)
});