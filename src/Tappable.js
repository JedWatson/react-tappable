var React = require('react');

// Enable React Touch Events
React.initializeTouchEvents(true);

function isDataOrAriaProp (key) {
	return key.indexOf('data-') === 0 || key.indexOf('aria-') === 0;
}

var extend = require('react/lib/Object.assign');
var Mixin = require('./TappableMixin');
/**
 * Tappable Component
 * ==================
 */

var component = React.createClass({

	displayName: 'Tappable',

	mixins: [Mixin],

	propTypes: {
		component: React.PropTypes.any,           // component to create
		className: React.PropTypes.string,        // optional className
		classBase: React.PropTypes.string,        // base for generated classNames
		style: React.PropTypes.object,            // additional style properties for the component
		disabled: React.PropTypes.bool            // only applies to buttons
	},

	getDefaultProps: function () {
		return {
			component: 'span',
			classBase: 'Tappable'
		};
	},

	render: function () {

		var className = this.props.classBase + (this.state.isActive ? '-active' : '-inactive');
		if (this.props.className) {
			className += ' ' + this.props.className;
		}

		var style = {};
		extend(style, this.touchStyles(), this.props.style);

		var newComponentProps = {
			style: style,
			className: className,
			disabled: this.props.disabled,
			onTouchStart: this.onTouchStart,
			onTouchMove: this.onTouchMove,
			onTouchEnd: this.onTouchEnd,
			onMouseDown: this.onMouseDown,
			onMouseMove: this.onMouseMove,
			onMouseUp: this.onMouseUp,
			onMouseOut: this.onMouseOut
		};

		var props = this.props;
		var dataOrAriaPropNames = Object.keys(props).filter(isDataOrAriaProp);
		dataOrAriaPropNames.forEach(function (propName) {
			newComponentProps[propName] = props[propName];
		});

		return React.createElement(this.props.component, newComponentProps, this.props.children); // eslint-disable-line react/prop-types
	}
});

component.Mixin = Mixin;
module.exports = component;
