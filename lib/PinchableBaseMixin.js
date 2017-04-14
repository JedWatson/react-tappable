'use strict';

var PropTypes = require('prop-types');
var React = require('react');

var Mixin = {
	propTypes: {
		preventDefault: PropTypes.bool, // whether to preventDefault on all events
		stopPropagation: PropTypes.bool, // whether to stopPropagation on all events

		onTouchStart: PropTypes.func, // pass-through touch event
		onTouchMove: PropTypes.func, // pass-through touch event
		onTouchEnd: PropTypes.func // pass-through touch event
	},

	getInitialState: function getInitialState() {
		return {
			isActive: false
		};
	},

	processEvent: function processEvent(event) {
		if (this.props.preventDefault) event.preventDefault();
		if (this.props.stopPropagation) event.stopPropagation();
	},

	onTouchStart: function onTouchStart(event) {
		if (this.props.onTouchStart && this.props.onTouchStart(event) === false) return;
		this.processEvent(event);

		if (this.onPinchStart && (this.props.onPinchStart || this.props.onPinchMove || this.props.onPinchEnd) && event.touches.length === 2) {
			this.onPinchStart && this.onPinchStart(event);
		}
	},

	onTouchMove: function onTouchMove(event) {
		if (this._initialPinch && event.touches.length === 2 && this.onPinchMove) {
			this.onPinchMove(event);
			event.preventDefault();
		}
	},

	onTouchEnd: function onTouchEnd(event) {
		if (this.onPinchEnd && this._initialPinch && event.touches.length + event.changedTouches.length === 2) {
			this.onPinchEnd(event);
			event.preventDefault();
		}
	},

	endTouch: function endTouch(event, callback) {
		this._initialTouch = null;
		this._lastTouch = null;
		if (this.state.isActive) {
			this.setState({
				isActive: false
			}, callback);
		} else if (callback) {
			callback();
		}
	},

	handlers: function handlers() {
		return {
			onTouchStart: this.onTouchStart,
			onTouchMove: this.onTouchMove,
			onTouchEnd: this.onTouchEnd,
			onMouseDown: this.onMouseDown,
			onMouseUp: this.onMouseUp,
			onMouseMove: this.onMouseMove,
			onMouseOut: this.onMouseOut
		};
	}
};

module.exports = Mixin;