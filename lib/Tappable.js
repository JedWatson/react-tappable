/** @jsx React.DOM */

var React = require('react'),
	Hammer = require('hammerjs');

/**
 * Touchstone Tappable Component
 * =============================
 */

module.exports = React.createClass({
	
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
		if (!this.hammer && this.props.action) {
			this.hammer = new Hammer(this.getDOMNode()).on('tap press', this.props.action);
		}
	},
	
	componentWillUnmount: function() {
		if (this.hammer) {
			this.hammer.stop();
			this.hammer.destroy();
			this.hammer = null;
		}
	},
	
	render: function() {
		return this.props.component({
			className: this.props.className
		}, this.props.children);
	}
	
});
