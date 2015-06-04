var React = require('react');

// Enable React Touch Events
React.initializeTouchEvents(true);

function getTouchProps(touch) {
	if (!touch) return {};
	return {
		pageX: touch.pageX,
		pageY: touch.pageY,
		clientX: touch.clientX,
		clientY: touch.clientY
	};
}

function isDataOrAriaProp(key) {
	return key.indexOf('data-') === 0 || key.indexOf('aria-') === 0;
}

function getPinchProps(touches) {
	return {
		touches: Array.prototype.map.call(touches, function copyTouch(touch) {
			return { identifier: touch.identifier, pageX: touch.pageX, pageY: touch.pageY };
		}),
		center: { x: (touches[0].pageX + touches[1].pageX) / 2, y: (touches[0].pageY + touches[1].pageY) / 2 },
		angle: Math.atan() * (touches[1].pageY - touches[0].pageY) / (touches[1].pageX - touches[0].pageX) * 180 / Math.PI,
		distance: Math.sqrt(Math.pow(Math.abs(touches[1].pageX - touches[0].pageX), 2) + Math.pow(Math.abs(touches[1].pageY - touches[0].pageY), 2))
	};
}

var extend = require('react/lib/Object.assign');

/**
 * Tappable Mixin
 * ==============
 */

var Mixin = {
	propTypes: {
		moveThreshold: React.PropTypes.number,       // pixels to move before cancelling tap
		pressDelay: React.PropTypes.number,          // ms to wait before detecting a press
		pressMoveThreshold: React.PropTypes.number,  // pixels to move before cancelling press
		preventDefault: React.PropTypes.bool,        // whether to preventDefault on all events
		stopPropagation: React.PropTypes.bool,       // whether to stopPropagation on all events

		onTap: React.PropTypes.func,                 // fires when a tap is detected
		onPress: React.PropTypes.func,               // fires when a press is detected
		onTouchStart: React.PropTypes.func,          // pass-through touch event
		onTouchMove: React.PropTypes.func,           // pass-through touch event
		onTouchEnd: React.PropTypes.func,            // pass-through touch event
		onMouseDown: React.PropTypes.func,           // pass-through mouse event
		onMouseUp: React.PropTypes.func,             // pass-through mouse event
		onMouseMove: React.PropTypes.func,           // pass-through mouse event
		onMouseOut: React.PropTypes.func,            // pass-through mouse event

		onPinchStart: React.PropTypes.func,          // fires when a pinch gesture is started
		onPinchMove: React.PropTypes.func,           // fires on every touch-move when a pinch action is active
		onPinchEnd: React.PropTypes.func             // fires when a pinch action ends
	},

	getDefaultProps: function() {
		return {
			moveThreshold: 100,
			pressDelay: 1000,
			pressMoveThreshold: 5
		};
	},

	getInitialState: function() {
		return {
			isActive: false,
			touchActive: false,
			pinchActive: false
		};
	},

	componentWillUnmount: function() {
		this.cleanupScrollDetection();
		this.cancelPressDetection();
	},

	processEvent: function(event) {
		if (this.props.preventDefault) event.preventDefault();
		if (this.props.stopPropagation) event.stopPropagation();
	},

	onTouchStart: function(event) {
		if (this.props.onTouchStart && this.props.onTouchStart(event) === false) return;
		this.processEvent(event);
		window._blockMouseEvents = true;

		if (event.touches.length === 1) {
			this._initialTouch = this._lastTouch = getTouchProps(event.touches[0]);
			this.initScrollDetection();
			this.initPressDetection(event, this.endTouch);
			this.setState({
				isActive: true
			});
		} else if ((this.props.onPinchStart || this.props.onPinchMove || this.props.onPinchEnd) && event.touches.length === 2) {
			this.onPinchStart(event);
		}
	},

	onPinchStart: function(event) {
		// in case the two touches didn't start exactly at the same time
		if (this._initialTouch) this.endTouch();

		var touches = event.touches;

		this._initialPinch = getPinchProps(touches);

		this._initialPinch = extend(this._initialPinch, {
			displacement: { x: 0, y: 0 },
			displacementVelocity: { x: 0, y: 0 },
			rotation: 0,
			rotationVelocity: 0,
			zoom: 1,
			zoomVelocity: 0,
			time: Date.now()
		});

		this._lastPinch = this._initialPinch;

		this.props.onPinchStart && this.props.onPinchStart(this._initialPinch, event);
	},

	onPinchMove: function(event) {
		if (this._initialTouch) this.endTouch();

		var touches = event.touches;

		if(touches.length !== 2){
			return this.onPinchEnd(event) // bail out before disaster
		}

		var currentPinch =
			touches[0].identifier === this._initialPinch.touches[0].identifier && touches[1].identifier === this._initialPinch.touches[1].identifier ?
				getPinchProps(touches) // the touches are in the correct order
			: touches[1].identifier === this._initialPinch.touches[0].identifier && touches[0].identifier === this._initialPinch.touches[1].identifier ?
				getPinchProps(touches.reverse()) // the touches have somehow changed order
			:
				getPinchProps(touches); // something is wrong, but we still have two touch-points, so we try not to fail

		currentPinch.displacement = {
			x: currentPinch.center.x - this._initialPinch.center.x,
			y: currentPinch.center.y - this._initialPinch.center.y
		};

		currentPinch.time = Date.now();
		var timeSinceLastPinch = currentPinch.time - this._lastPinch.time;

		currentPinch.displacementVelocity = {
			x: (currentPinch.displacement.x - this._lastPinch.displacement.x) / timeSinceLastPinch,
			y: (currentPinch.displacement.y - this._lastPinch.displacement.y) / timeSinceLastPinch
		};

		currentPinch.rotation = currentPinch.angle - this._initialPinch.angle;
		currentPinch.rotationVelocity = currentPinch.rotation - this._lastPinch.rotation / timeSinceLastPinch;

		currentPinch.zoom = currentPinch.distance / this._initialPinch.distance;
		currentPinch.zoomVelocity = (currentPinch.zoom - this._lastPinch.zoom) / timeSinceLastPinch;

		this.props.onPinchMove && this.props.onPinchMove(currentPinch, event);

		this._lastPinch = currentPinch;
	},

	onPinchEnd: function(event) {
		// TODO use helper to order touches by identifier and use actual values on touchEnd.
		var currentPinch = extend({}, this._lastPinch);
		currentPinch.time = Date.now();

		if (currentPinch.time - this._lastPinch.time > 16) {
			currentPinch.displacementVelocity = 0;
			currentPinch.rotationVelocity = 0;
			currentPinch.zoomVelocity = 0;
		}

		this.props.onPinchEnd && this.props.onPinchEnd(currentPinch, event);

		this._initialPinch = this._lastPinch = null;

		// If one finger is still on screen, it should start a new touch event for swiping etc
		// But it should never fire an onTap or onPress event.
		// Since there is no support swipes yet, this should be disregarded for now
		// if (event.touches.length === 1) {
		// 	this.onTouchStart(event);
		// }
	},

	initScrollDetection: function() {
		this._scrollParents = [];
		this._scrollPos = { top: 0, left: 0 };
		var node = this.getDOMNode();
		while (node) {
			if (node.scrollHeight > node.offsetHeight || node.scrollWidth > node.offsetWidth) {
				this._scrollParents.push(node);
				this._scrollPos.top += node.scrollTop;
				this._scrollPos.left += node.scrollLeft;
			}
			node = node.parentNode;
		}
	},

	calculateMovement: function(touch) {
		return {
			x: Math.abs(touch.clientX - this._initialTouch.clientX),
			y: Math.abs(touch.clientY - this._initialTouch.clientY)
		};
	},

	detectScroll: function() {
		var currentScrollPos = { top: 0, left: 0 };
		for (var i = 0; i < this._scrollParents.length; i++) {
			currentScrollPos.top += this._scrollParents[i].scrollTop;
			currentScrollPos.left += this._scrollParents[i].scrollLeft;
		}
		return !(currentScrollPos.top === this._scrollPos.top && currentScrollPos.left === this._scrollPos.left);
	},

	cleanupScrollDetection: function() {
		this._scrollParents = undefined;
		this._scrollPos = undefined;
	},

	initPressDetection: function(event, callback) {
		if (!this.props.onPress) return;
		this._pressTimeout = setTimeout(function() {
			this.props.onPress(event);
			callback();
		}.bind(this), this.props.pressDelay);
	},

	cancelPressDetection: function() {
		clearTimeout(this._pressTimeout);
	},

	onTouchMove: function(event) {
		if (this._initialTouch) {
			this.processEvent(event);

			if (this.detectScroll()) return this.endTouch(event);

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
				}
			} else {
				if (!this.state.isActive) {
					this.setState({
						isActive: true
					});
				}
			}
		} else if (this._initialPinch && event.touches.length === 2) {
			this.onPinchMove(event);
			event.preventDefault();
		}
	},

	onTouchEnd: function(event) {
		if (this._initialTouch) {
			this.processEvent(event);
			var movement = this.calculateMovement(this._lastTouch);
			if (movement.x <= this.props.moveThreshold && movement.y <= this.props.moveThreshold && this.props.onTap) {
				this.props.onTap(event);
			}
			this.endTouch(event);
		} else if (this._initialPinch && (event.touches.length + event.changedTouches.length) === 2) {
			this.onPinchEnd(event);
			event.preventDefault();
		}
	},

	endTouch: function(event) {
		this.cancelPressDetection();
		if (event && this.props.onTouchEnd) this.props.onTouchEnd(event);
		this._initialTouch = null;
		this._lastTouch = null;
		this.setState({
			isActive: false
		});
	},

	onMouseDown: function(event) {
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

	onMouseMove: function(event) {
		if (window._blockMouseEvents || !this._mouseDown) return;
		this.processEvent(event);
		this.props.onMouseMove && this.props.onMouseMove(event);
	},

	onMouseUp: function(event) {
		if (window._blockMouseEvents || !this._mouseDown) return;
		this.processEvent(event);
		this.props.onMouseUp && this.props.onMouseUp(event);
		this.props.onTap && this.props.onTap(event);
		this.endMouseEvent();
	},

	onMouseOut: function(event) {
		if (window._blockMouseEvents || !this._mouseDown) return;
		this.processEvent(event);
		this.props.onMouseOut && this.props.onMouseOut(event);
		this.endMouseEvent();
	},

	endMouseEvent: function() {
		this.cancelPressDetection();
		this._mouseDown = false;
		this.setState({
			isActive: false
		});
	},

	handlers: function() {
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

/**
 * Tappable Component
 * ==================
 */

var component = React.createClass({

	displayName: 'Tappable',

	mixins: [Mixin],

	propTypes: {
		classBase: React.PropTypes.string,        // base for generated classNames
		className: React.PropTypes.string,        // optional className
		component: React.PropTypes.any            // component to create
	},

	getDefaultProps: function() {
		return {
			component: 'span',
			classBase: 'Tappable'
		};
	},

	render: function() {
		var props = this.props;
		var className = props.classBase + (this.state.isActive ? ' is-pressed' : '');

		if (props.className) {
			className += ' ' + props.className;
		}

		var newComponentProps = extend({}, props, {
			className: className,
			handlers: this.handlers
		}, this.handlers());

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

component.Mixin = Mixin;
module.exports = component;
