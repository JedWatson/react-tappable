var React = require('react'),
	Hammer = require('hammerjs');

/**
 * Tappable Component
 * ==================
 */

var Tappable = React.createClass({
	
	displayName: 'Tappable',
	
	propTypes: {
		component: React.PropTypes.func,
		className: React.PropTypes.string
	},
	
	getDefaultProps: function() {
		return {
			component: React.DOM.span
		};
	},
	
	componentDidMount: function() {
		this.hammer = new Hammer(this.getDOMNode());
		if (this.props.action)		this.hammer.on('tap press', 	this.props.action);
		if (this.props.onTap)		this.hammer.on('tap',			this.props.onTap);
		if (this.props.onDoubleTap)	this.hammer.on('doubletap',		this.props.onDoubleTap);
		if (this.props.onPan)		this.hammer.on('pan',			this.props.onPan);
		if (this.props.onSwipe)		this.hammer.on('swipe',			this.props.onSwipe);
		if (this.props.onPress)		this.hammer.on('press',			this.props.onPress);
		if (this.props.onPinch)		this.hammer.on('pinch',			this.props.onPinch);
		if (this.props.onRotate)	this.hammer.on('rotate',		this.props.onRotate);
	},
	
	componentWillUnmount: function() {
		this.hammer.stop();
		this.hammer.destroy();
		this.hammer = null;
	},
	
	render: function() {
		return this.props.component({
			className: this.props.className
		}, this.props.children);
	}
	
});

module.exports = Tappable;
