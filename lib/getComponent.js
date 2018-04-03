'use strict';

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
			Object.assign(style, touchStyles, props.style);

			var newComponentProps = Object.assign({}, props, {
				style: style,
				className: className,
				disabled: props.disabled,
				handlers: this.handlers
			}, this.handlers());

			delete newComponentProps.activeDelay;
			delete newComponentProps.allowReactivation;
			delete newComponentProps.classBase;
			delete newComponentProps.classes;
			delete newComponentProps.handlers;
			delete newComponentProps.onTap;
			delete newComponentProps.onPress;
			delete newComponentProps.onPinchStart;
			delete newComponentProps.onPinchMove;
			delete newComponentProps.onPinchEnd;
			delete newComponentProps.onDeactivate;
			delete newComponentProps.onReactivate;
			delete newComponentProps.moveThreshold;
			delete newComponentProps.moveXThreshold;
			delete newComponentProps.moveYThreshold;
			delete newComponentProps.pressDelay;
			delete newComponentProps.pressMoveThreshold;
			delete newComponentProps.preventDefault;
			delete newComponentProps.stopPropagation;
			delete newComponentProps.component;

			return React.createElement(props.component, newComponentProps, props.children);
		}
	});
};