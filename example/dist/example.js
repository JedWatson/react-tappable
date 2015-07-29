require=(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict';

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var React = require('react');
var Tappable = require('react-tappable');

var App = React.createClass({
	displayName: 'App',

	getInitialState: function getInitialState() {
		return {
			scrolling: false,
			events: []
		};
	},
	componentDidUpdate: function componentDidUpdate() {
		var log = this.refs.eventLog.getDOMNode();
		log.scrollTop = log.scrollHeight;
	},
	handleEvent: function handleEvent(name /*, event*/) {
		var events = this.state.events;
		events.push(name);
		this.setState({
			events: events
		});
	},
	toggleScrolling: function toggleScrolling() {
		console.log('scrolling: ' + !this.state.scrolling);
		this.setState({
			scrolling: !this.state.scrolling
		});
	},
	render: function render() {
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
		};
		var nestedEvents = {
			onTap: this.handleEvent.bind(this, 'tap (nested)')
		};
		var toggleClass = this.state.scrolling ? 'scrolling-enabled' : 'scrolling-disabled';
		return React.createElement(
			'div',
			{ className: 'example' },
			React.createElement(
				'div',
				{ className: 'scrolling' },
				React.createElement(
					Tappable,
					{ preventDefault: true, onTap: this.toggleScrolling, className: toggleClass },
					React.createElement(
						'span',
						{ className: 'link' },
						'Toggle Scrolling'
					),
					': ',
					this.state.scrolling ? 'on' : 'off'
				)
			),
			React.createElement(
				'div',
				{ className: 'left' },
				React.createElement(
					'h3',
					null,
					'Tappable area:'
				),
				React.createElement(
					Tappable,
					_extends({ preventDefault: !this.state.scrolling, component: 'div', className: 'tappable-area' }, events),
					'Touch me',
					React.createElement(
						Tappable,
						_extends({ stopPropagation: true, className: 'nested-tappable' }, nestedEvents),
						'Nested Tappable'
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

React.render(React.createElement(App, null), document.getElementById('app'));

},{"react":undefined,"react-tappable":undefined}]},{},[1])
//# sourceMappingURL=data:application/json;charset:utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9yZWFjdC1jb21wb25lbnQtZ3VscC10YXNrcy9ub2RlX21vZHVsZXMvYnJvd3NlcmlmeS9ub2RlX21vZHVsZXMvYnJvd3Nlci1wYWNrL19wcmVsdWRlLmpzIiwiL1VzZXJzL0plZC9EZXZlbG9wbWVudC9wYWNrYWdlcy9yZWFjdC10YXBwYWJsZS9leGFtcGxlL3NyYy9leGFtcGxlLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7OztBQ0FBLElBQUksS0FBSyxHQUFHLE9BQU8sQ0FBQyxPQUFPLENBQUMsQ0FBQztBQUM3QixJQUFJLFFBQVEsR0FBRyxPQUFPLENBQUMsZ0JBQWdCLENBQUMsQ0FBQzs7QUFFekMsSUFBSSxHQUFHLEdBQUcsS0FBSyxDQUFDLFdBQVcsQ0FBQzs7O0FBQzNCLGdCQUFlLEVBQUUsMkJBQVc7QUFDM0IsU0FBTztBQUNOLFlBQVMsRUFBRSxLQUFLO0FBQ2hCLFNBQU0sRUFBRSxFQUFFO0dBQ1YsQ0FBQztFQUNGO0FBQ0QsbUJBQWtCLEVBQUUsOEJBQVc7QUFDOUIsTUFBSSxHQUFHLEdBQUcsSUFBSSxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsVUFBVSxFQUFFLENBQUM7QUFDMUMsS0FBRyxDQUFDLFNBQVMsR0FBRyxHQUFHLENBQUMsWUFBWSxDQUFDO0VBQ2pDO0FBQ0QsWUFBVyxFQUFFLHFCQUFTLElBQUksY0FBYTtBQUN0QyxNQUFJLE1BQU0sR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLE1BQU0sQ0FBQztBQUMvQixRQUFNLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDO0FBQ2xCLE1BQUksQ0FBQyxRQUFRLENBQUM7QUFDYixTQUFNLEVBQUUsTUFBTTtHQUNkLENBQUMsQ0FBQztFQUNIO0FBQ0QsZ0JBQWUsRUFBRSwyQkFBVztBQUMzQixTQUFPLENBQUMsR0FBRyxDQUFDLGFBQWEsR0FBRyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsU0FBUyxDQUFDLENBQUM7QUFDbkQsTUFBSSxDQUFDLFFBQVEsQ0FBQztBQUNiLFlBQVMsRUFBRSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsU0FBUztHQUNoQyxDQUFDLENBQUM7RUFDSDtBQUNELE9BQU0sRUFBRSxrQkFBVztBQUNsQixNQUFJLE1BQU0sR0FBRztBQUNaLFFBQUssRUFBRSxJQUFJLENBQUMsV0FBVyxDQUFDLElBQUksQ0FBQyxJQUFJLEVBQUUsS0FBSyxDQUFDO0FBQ3pDLFVBQU8sRUFBRSxJQUFJLENBQUMsV0FBVyxDQUFDLElBQUksQ0FBQyxJQUFJLEVBQUUsT0FBTyxDQUFDO0FBQzdDLGVBQVksRUFBRSxJQUFJLENBQUMsV0FBVyxDQUFDLElBQUksQ0FBQyxJQUFJLEVBQUUsWUFBWSxDQUFDOztBQUV2RCxhQUFVLEVBQUUsSUFBSSxDQUFDLFdBQVcsQ0FBQyxJQUFJLENBQUMsSUFBSSxFQUFFLFVBQVUsQ0FBQztBQUNuRCxjQUFXLEVBQUUsSUFBSSxDQUFDLFdBQVcsQ0FBQyxJQUFJLENBQUMsSUFBSSxFQUFFLFdBQVcsQ0FBQzs7QUFFckQsWUFBUyxFQUFFLElBQUksQ0FBQyxXQUFXLENBQUMsSUFBSSxDQUFDLElBQUksRUFBRSxTQUFTLENBQUM7QUFDakQsYUFBVSxFQUFFLElBQUksQ0FBQyxXQUFXLENBQUMsSUFBSSxDQUFDLElBQUksRUFBRSxVQUFVLENBQUM7R0FDbkQsQ0FBQztBQUNGLE1BQUksWUFBWSxHQUFHO0FBQ2xCLFFBQUssRUFBRSxJQUFJLENBQUMsV0FBVyxDQUFDLElBQUksQ0FBQyxJQUFJLEVBQUUsY0FBYyxDQUFDO0dBQ2xELENBQUM7QUFDRixNQUFJLFdBQVcsR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLFNBQVMsR0FBRyxtQkFBbUIsR0FBRyxvQkFBb0IsQ0FBQztBQUNwRixTQUNDOztLQUFLLFNBQVMsRUFBQyxTQUFTO0dBQ3ZCOztNQUFLLFNBQVMsRUFBQyxXQUFXO0lBQ3pCO0FBQUMsYUFBUTtPQUFDLGNBQWMsTUFBQSxFQUFDLEtBQUssRUFBRSxJQUFJLENBQUMsZUFBZSxBQUFDLEVBQUMsU0FBUyxFQUFFLFdBQVcsQUFBQztLQUM1RTs7UUFBTSxTQUFTLEVBQUMsTUFBTTs7TUFBd0I7O0tBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxTQUFTLEdBQUcsSUFBSSxHQUFHLEtBQUs7S0FDMUU7SUFDTjtHQUNOOztNQUFLLFNBQVMsRUFBQyxNQUFNO0lBQ3BCOzs7O0tBQXVCO0lBQ3ZCO0FBQUMsYUFBUTtnQkFBQyxjQUFjLEVBQUUsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLFNBQVMsQUFBQyxFQUFDLFNBQVMsRUFBQyxLQUFLLEVBQUMsU0FBUyxFQUFDLGVBQWUsSUFBSyxNQUFNOztLQUVwRztBQUFDLGNBQVE7aUJBQUMsZUFBZSxNQUFBLEVBQUMsU0FBUyxFQUFDLGlCQUFpQixJQUFLLFlBQVk7O01BQTRCO0tBQ3hGO0lBQ047R0FDTjs7TUFBSyxTQUFTLEVBQUMsT0FBTztJQUNyQjs7OztLQUFtQjtJQUNuQjs7T0FBSyxHQUFHLEVBQUMsVUFBVSxFQUFDLFNBQVMsRUFBQyxXQUFXO0tBQ3ZDLElBQUksQ0FBQyxLQUFLLENBQUMsTUFBTSxDQUFDLEdBQUcsQ0FBQyxVQUFTLEVBQUUsRUFBRSxDQUFDLEVBQUU7QUFDdEMsYUFBTzs7U0FBSyxHQUFHLEVBQUUsR0FBRyxHQUFDLENBQUMsQUFBQztPQUFFLEVBQUU7T0FBTyxDQUFDO01BQ25DLENBQUM7S0FDRztJQUNEO0dBQ0QsQ0FDTDtFQUNGO0NBQ0QsQ0FBQyxDQUFDOztBQUVILEtBQUssQ0FBQyxNQUFNLENBQUMsb0JBQUMsR0FBRyxPQUFHLEVBQUUsUUFBUSxDQUFDLGNBQWMsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDIiwiZmlsZSI6ImdlbmVyYXRlZC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzQ29udGVudCI6WyIoZnVuY3Rpb24gZSh0LG4scil7ZnVuY3Rpb24gcyhvLHUpe2lmKCFuW29dKXtpZighdFtvXSl7dmFyIGE9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtpZighdSYmYSlyZXR1cm4gYShvLCEwKTtpZihpKXJldHVybiBpKG8sITApO3ZhciBmPW5ldyBFcnJvcihcIkNhbm5vdCBmaW5kIG1vZHVsZSAnXCIrbytcIidcIik7dGhyb3cgZi5jb2RlPVwiTU9EVUxFX05PVF9GT1VORFwiLGZ9dmFyIGw9bltvXT17ZXhwb3J0czp7fX07dFtvXVswXS5jYWxsKGwuZXhwb3J0cyxmdW5jdGlvbihlKXt2YXIgbj10W29dWzFdW2VdO3JldHVybiBzKG4/bjplKX0sbCxsLmV4cG9ydHMsZSx0LG4scil9cmV0dXJuIG5bb10uZXhwb3J0c312YXIgaT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2Zvcih2YXIgbz0wO288ci5sZW5ndGg7bysrKXMocltvXSk7cmV0dXJuIHN9KSIsInZhciBSZWFjdCA9IHJlcXVpcmUoJ3JlYWN0Jyk7XG52YXIgVGFwcGFibGUgPSByZXF1aXJlKCdyZWFjdC10YXBwYWJsZScpO1xuXG52YXIgQXBwID0gUmVhY3QuY3JlYXRlQ2xhc3Moe1xuXHRnZXRJbml0aWFsU3RhdGU6IGZ1bmN0aW9uKCkge1xuXHRcdHJldHVybiB7XG5cdFx0XHRzY3JvbGxpbmc6IGZhbHNlLFxuXHRcdFx0ZXZlbnRzOiBbXVxuXHRcdH07XG5cdH0sXG5cdGNvbXBvbmVudERpZFVwZGF0ZTogZnVuY3Rpb24oKSB7XG5cdFx0dmFyIGxvZyA9IHRoaXMucmVmcy5ldmVudExvZy5nZXRET01Ob2RlKCk7XG5cdFx0bG9nLnNjcm9sbFRvcCA9IGxvZy5zY3JvbGxIZWlnaHQ7XG5cdH0sXG5cdGhhbmRsZUV2ZW50OiBmdW5jdGlvbihuYW1lLyosIGV2ZW50Ki8pIHtcblx0XHR2YXIgZXZlbnRzID0gdGhpcy5zdGF0ZS5ldmVudHM7XG5cdFx0ZXZlbnRzLnB1c2gobmFtZSk7XG5cdFx0dGhpcy5zZXRTdGF0ZSh7XG5cdFx0XHRldmVudHM6IGV2ZW50c1xuXHRcdH0pO1xuXHR9LFxuXHR0b2dnbGVTY3JvbGxpbmc6IGZ1bmN0aW9uKCkge1xuXHRcdGNvbnNvbGUubG9nKCdzY3JvbGxpbmc6ICcgKyAhdGhpcy5zdGF0ZS5zY3JvbGxpbmcpO1xuXHRcdHRoaXMuc2V0U3RhdGUoe1xuXHRcdFx0c2Nyb2xsaW5nOiAhdGhpcy5zdGF0ZS5zY3JvbGxpbmdcblx0XHR9KTtcblx0fSxcblx0cmVuZGVyOiBmdW5jdGlvbigpIHtcblx0XHR2YXIgZXZlbnRzID0ge1xuXHRcdFx0b25UYXA6IHRoaXMuaGFuZGxlRXZlbnQuYmluZCh0aGlzLCAndGFwJyksXG5cdFx0XHRvblByZXNzOiB0aGlzLmhhbmRsZUV2ZW50LmJpbmQodGhpcywgJ3ByZXNzJyksXG5cdFx0XHRvblRvdWNoU3RhcnQ6IHRoaXMuaGFuZGxlRXZlbnQuYmluZCh0aGlzLCAndG91Y2hTdGFydCcpLFxuXHRcdFx0Ly9vblRvdWNoTW92ZTogdGhpcy5oYW5kbGVFdmVudC5iaW5kKHRoaXMsICd0b3VjaE1vdmUnKSxcblx0XHRcdG9uVG91Y2hFbmQ6IHRoaXMuaGFuZGxlRXZlbnQuYmluZCh0aGlzLCAndG91Y2hFbmQnKSxcblx0XHRcdG9uTW91c2VEb3duOiB0aGlzLmhhbmRsZUV2ZW50LmJpbmQodGhpcywgJ21vdXNlRG93bicpLFxuXHRcdFx0Ly9vbk1vdXNlTW92ZTogdGhpcy5oYW5kbGVFdmVudC5iaW5kKHRoaXMsICdtb3VzZU1vdmUnKSxcblx0XHRcdG9uTW91c2VVcDogdGhpcy5oYW5kbGVFdmVudC5iaW5kKHRoaXMsICdtb3VzZVVwJyksXG5cdFx0XHRvbk1vdXNlT3V0OiB0aGlzLmhhbmRsZUV2ZW50LmJpbmQodGhpcywgJ21vdXNlT3V0Jylcblx0XHR9O1xuXHRcdHZhciBuZXN0ZWRFdmVudHMgPSB7XG5cdFx0XHRvblRhcDogdGhpcy5oYW5kbGVFdmVudC5iaW5kKHRoaXMsICd0YXAgKG5lc3RlZCknKVxuXHRcdH07XG5cdFx0dmFyIHRvZ2dsZUNsYXNzID0gdGhpcy5zdGF0ZS5zY3JvbGxpbmcgPyAnc2Nyb2xsaW5nLWVuYWJsZWQnIDogJ3Njcm9sbGluZy1kaXNhYmxlZCc7XG5cdFx0cmV0dXJuIChcblx0XHRcdDxkaXYgY2xhc3NOYW1lPVwiZXhhbXBsZVwiPlxuXHRcdFx0XHQ8ZGl2IGNsYXNzTmFtZT1cInNjcm9sbGluZ1wiPlxuXHRcdFx0XHRcdDxUYXBwYWJsZSBwcmV2ZW50RGVmYXVsdCBvblRhcD17dGhpcy50b2dnbGVTY3JvbGxpbmd9IGNsYXNzTmFtZT17dG9nZ2xlQ2xhc3N9PlxuXHRcdFx0XHRcdFx0PHNwYW4gY2xhc3NOYW1lPVwibGlua1wiPlRvZ2dsZSBTY3JvbGxpbmc8L3NwYW4+OiB7dGhpcy5zdGF0ZS5zY3JvbGxpbmcgPyAnb24nIDogJ29mZid9XG5cdFx0XHRcdFx0PC9UYXBwYWJsZT5cblx0XHRcdFx0PC9kaXY+XG5cdFx0XHRcdDxkaXYgY2xhc3NOYW1lPVwibGVmdFwiPlxuXHRcdFx0XHRcdDxoMz5UYXBwYWJsZSBhcmVhOjwvaDM+XG5cdFx0XHRcdFx0PFRhcHBhYmxlIHByZXZlbnREZWZhdWx0PXshdGhpcy5zdGF0ZS5zY3JvbGxpbmd9IGNvbXBvbmVudD1cImRpdlwiIGNsYXNzTmFtZT1cInRhcHBhYmxlLWFyZWFcIiB7Li4uZXZlbnRzfT5cblx0XHRcdFx0XHRcdFRvdWNoIG1lXG5cdFx0XHRcdFx0XHQ8VGFwcGFibGUgc3RvcFByb3BhZ2F0aW9uIGNsYXNzTmFtZT1cIm5lc3RlZC10YXBwYWJsZVwiIHsuLi5uZXN0ZWRFdmVudHN9Pk5lc3RlZCBUYXBwYWJsZTwvVGFwcGFibGU+XG5cdFx0XHRcdFx0PC9UYXBwYWJsZT5cblx0XHRcdFx0PC9kaXY+XG5cdFx0XHRcdDxkaXYgY2xhc3NOYW1lPVwicmlnaHRcIj5cblx0XHRcdFx0XHQ8aDM+RXZlbnQgbG9nOjwvaDM+XG5cdFx0XHRcdFx0PGRpdiByZWY9XCJldmVudExvZ1wiIGNsYXNzTmFtZT1cImV2ZW50LWxvZ1wiPlxuXHRcdFx0XHRcdFx0e3RoaXMuc3RhdGUuZXZlbnRzLm1hcChmdW5jdGlvbihldiwgaSkge1xuXHRcdFx0XHRcdFx0XHRyZXR1cm4gPGRpdiBrZXk9eydlJytpfT57ZXZ9PC9kaXY+O1xuXHRcdFx0XHRcdFx0fSl9XG5cdFx0XHRcdFx0PC9kaXY+XG5cdFx0XHRcdDwvZGl2PlxuXHRcdFx0PC9kaXY+XG5cdFx0KTtcblx0fVxufSk7XG5cblJlYWN0LnJlbmRlcig8QXBwIC8+LCBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnYXBwJykpO1xuIl19
