require=(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
var React = require('react'),
	Tappable = require('react-tappable');

var App = React.createClass({displayName: 'App',
	getInitialState: function() {
		return {
			scrolling: false,
			events: []
		};
	},
	componentDidUpdate: function() {
		var log = this.refs.eventLog.getDOMNode();
		log.scrollTop = log.scrollHeight;
	},
	handleEvent: function(name, event) {
		var events = this.state.events;
		events.push(name);
		this.setState({
			events: events
		});
	},
	toggleScrolling: function() {
		console.log('scrolling: ' + !this.state.scrolling);
		this.setState({
			scrolling: !this.state.scrolling
		});
	},
	render: function() {
		var events = {
			onTap: this.handleEvent.bind(this, 'tap'),
			onPress: this.handleEvent.bind(this, 'press'),
			onTouchStart: this.handleEvent.bind(this, 'touchStart'),
			//onTouchMove: this.handleEvent.bind(this, 'touchMove'),
			onTouchEnd: this.handleEvent.bind(this, 'touchEnd'),
			onMouseDown: this.handleEvent.bind(this, 'mouseDown'),
			//onMouseMove: this.handleEvent.bind(this, 'mouseMove'),
			onMouseUp: this.handleEvent.bind(this, 'mouseUp'),
			onMouseOut: this.handleEvent.bind(this, 'mouseOut')
		}
		var toggleClass = this.state.scrolling ? 'scrolling-enabled' : 'scrolling-disabled';
		return (
			React.createElement("div", {className: "example"}, 
				React.createElement("div", {className: "scrolling"}, 
					React.createElement(Tappable, {preventDefault: true, onTap: this.toggleScrolling, className: toggleClass}, 
						React.createElement("span", {className: "link"}, "Toggle Scrolling"), ": ", this.state.scrolling ? 'on' : 'off'
					)
				), 
				React.createElement("div", {className: "left"}, 
					React.createElement("h3", null, "Tappable area:"), 
					React.createElement(Tappable, React.__spread({preventDefault: !this.state.scrolling, component: "div", className: "tappable-area"},  events), 
						"Touch me"
					)
				), 
				React.createElement("div", {className: "right"}, 
					React.createElement("h3", null, "Event log:"), 
					React.createElement("div", {ref: "eventLog", className: "event-log"}, 
						this.state.events.map(function(ev, i) {
							return React.createElement("div", {key: 'e'+i}, ev);
						})
					)
				)
			)
		)
	}
});

React.render(React.createElement(App, null), document.getElementById('app'));

},{"react":undefined,"react-tappable":undefined}]},{},[1]);
