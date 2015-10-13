require=(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict';

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var React = require('react');
var ReactDOM = require('react-dom');
var Tappable = require('react-tappable');

var App = React.createClass({
	displayName: 'App',

	getInitialState: function getInitialState() {
		return {
			events: []
		};
	},
	componentDidUpdate: function componentDidUpdate() {
		var log = this.refs.eventLog;
		log.scrollTop = log.scrollHeight;
	},
	handleEvent: function handleEvent(name /*, event*/) {
		var events = this.state.events;
		events.push(name);
		this.setState({
			events: events
		});
	},
	render: function render() {
		var nestedEvents = {
			onPinchStart: this.handleEvent.bind(this, 'pinch start'),
			onPinchMove: this.handleEvent.bind(this, 'pinch move'),
			onPinchEnd: this.handleEvent.bind(this, 'pinch end')
		};
		return React.createElement(
			'div',
			{ className: 'example' },
			React.createElement(
				'div',
				{ className: 'left' },
				React.createElement(
					'h3',
					null,
					'Tappable area:'
				),
				React.createElement(
					'div',
					{ className: 'tappable-area' },
					'Touch me',
					React.createElement(
						Tappable,
						_extends({ stopPropagation: true, className: 'nested-tappable' }, nestedEvents),
						'Nested Pinchable'
					)
				)
			),
			React.createElement(
				'div',
				{ className: 'right' },
				React.createElement(
					'h3',
					null,
					'Event log:'
				),
				React.createElement(
					'div',
					{ ref: 'eventLog', className: 'event-log' },
					this.state.events.map(function (ev, i) {
						return React.createElement(
							'div',
							{ key: 'e' + i },
							ev
						);
					})
				)
			)
		);
	}
});

ReactDOM.render(React.createElement(App, null), document.getElementById('app'));

},{"react":undefined,"react-dom":undefined,"react-tappable":undefined}]},{},[1]);
