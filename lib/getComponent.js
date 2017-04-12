'use strict';

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var createReactClass = require('create-react-class');
var PropTypes = require('prop-types');
var React = require('react');
var touchStyles = require('./touchStyles');

/**
 * Tappable Component
 * ==================
 */
module.exports = function (mixins) {
	return createReactClass({
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