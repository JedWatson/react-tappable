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
			// onTouchMove: this.handleEvent.bind(this, 'touchMove'),
			onTouchEnd: this.handleEvent.bind(this, 'touchEnd'),
			onMouseDown: this.handleEvent.bind(this, 'mouseDown'),
			// onMouseMove: this.handleEvent.bind(this, 'mouseMove'),
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
//# sourceMappingURL=data:application/json;charset:utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9yZWFjdC1jb21wb25lbnQtZ3VscC10YXNrcy9ub2RlX21vZHVsZXMvYnJvd3NlcmlmeS9ub2RlX21vZHVsZXMvYnJvd3Nlci1wYWNrL19wcmVsdWRlLmpzIiwiL1VzZXJzL25tbi9Ecm9wYm94L2NvZGUvcmVhY3QtdGFwcGFibGUvZXhhbXBsZS9zcmMvZXhhbXBsZS5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7Ozs7QUNBQSxJQUFJLEtBQUssR0FBRyxPQUFPLENBQUMsT0FBTyxDQUFDLENBQUM7QUFDN0IsSUFBSSxRQUFRLEdBQUcsT0FBTyxDQUFDLGdCQUFnQixDQUFDLENBQUM7O0FBRXpDLElBQUksR0FBRyxHQUFHLEtBQUssQ0FBQyxXQUFXLENBQUM7OztBQUMzQixnQkFBZSxFQUFFLDJCQUFZO0FBQzVCLFNBQU87QUFDTixZQUFTLEVBQUUsS0FBSztBQUNoQixTQUFNLEVBQUUsRUFBRTtHQUNWLENBQUM7RUFDRjtBQUNELG1CQUFrQixFQUFFLDhCQUFZO0FBQy9CLE1BQUksR0FBRyxHQUFHLElBQUksQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLFVBQVUsRUFBRSxDQUFDO0FBQzFDLEtBQUcsQ0FBQyxTQUFTLEdBQUcsR0FBRyxDQUFDLFlBQVksQ0FBQztFQUNqQztBQUNELFlBQVcsRUFBRSxxQkFBVSxJQUFJLGNBQWE7QUFDdkMsTUFBSSxNQUFNLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxNQUFNLENBQUM7QUFDL0IsUUFBTSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQztBQUNsQixNQUFJLENBQUMsUUFBUSxDQUFDO0FBQ2IsU0FBTSxFQUFFLE1BQU07R0FDZCxDQUFDLENBQUM7RUFDSDtBQUNELGdCQUFlLEVBQUUsMkJBQVk7QUFDNUIsU0FBTyxDQUFDLEdBQUcsQ0FBQyxhQUFhLEdBQUcsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLFNBQVMsQ0FBQyxDQUFDO0FBQ25ELE1BQUksQ0FBQyxRQUFRLENBQUM7QUFDYixZQUFTLEVBQUUsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLFNBQVM7R0FDaEMsQ0FBQyxDQUFDO0VBQ0g7QUFDRCxPQUFNLEVBQUUsa0JBQVk7QUFDbkIsTUFBSSxNQUFNLEdBQUc7QUFDWixRQUFLLEVBQUUsSUFBSSxDQUFDLFdBQVcsQ0FBQyxJQUFJLENBQUMsSUFBSSxFQUFFLEtBQUssQ0FBQztBQUN6QyxVQUFPLEVBQUUsSUFBSSxDQUFDLFdBQVcsQ0FBQyxJQUFJLENBQUMsSUFBSSxFQUFFLE9BQU8sQ0FBQztBQUM3QyxlQUFZLEVBQUUsSUFBSSxDQUFDLFdBQVcsQ0FBQyxJQUFJLENBQUMsSUFBSSxFQUFFLFlBQVksQ0FBQzs7QUFFdkQsYUFBVSxFQUFFLElBQUksQ0FBQyxXQUFXLENBQUMsSUFBSSxDQUFDLElBQUksRUFBRSxVQUFVLENBQUM7QUFDbkQsY0FBVyxFQUFFLElBQUksQ0FBQyxXQUFXLENBQUMsSUFBSSxDQUFDLElBQUksRUFBRSxXQUFXLENBQUM7O0FBRXJELFlBQVMsRUFBRSxJQUFJLENBQUMsV0FBVyxDQUFDLElBQUksQ0FBQyxJQUFJLEVBQUUsU0FBUyxDQUFDO0FBQ2pELGFBQVUsRUFBRSxJQUFJLENBQUMsV0FBVyxDQUFDLElBQUksQ0FBQyxJQUFJLEVBQUUsVUFBVSxDQUFDO0dBQ25ELENBQUM7QUFDRixNQUFJLFlBQVksR0FBRztBQUNsQixRQUFLLEVBQUUsSUFBSSxDQUFDLFdBQVcsQ0FBQyxJQUFJLENBQUMsSUFBSSxFQUFFLGNBQWMsQ0FBQztHQUNsRCxDQUFDO0FBQ0YsTUFBSSxXQUFXLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxTQUFTLEdBQUcsbUJBQW1CLEdBQUcsb0JBQW9CLENBQUM7QUFDcEYsU0FDQzs7S0FBSyxTQUFTLEVBQUMsU0FBUztHQUN2Qjs7TUFBSyxTQUFTLEVBQUMsV0FBVztJQUN6QjtBQUFDLGFBQVE7T0FBQyxjQUFjLE1BQUEsRUFBQyxLQUFLLEVBQUUsSUFBSSxDQUFDLGVBQWUsQUFBQyxFQUFDLFNBQVMsRUFBRSxXQUFXLEFBQUM7S0FDNUU7O1FBQU0sU0FBUyxFQUFDLE1BQU07O01BQXdCOztLQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsU0FBUyxHQUFHLElBQUksR0FBRyxLQUFLO0tBQzFFO0lBQ047R0FDTjs7TUFBSyxTQUFTLEVBQUMsTUFBTTtJQUNwQjs7OztLQUF1QjtJQUN2QjtBQUFDLGFBQVE7Z0JBQUMsY0FBYyxFQUFFLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxTQUFTLEFBQUMsRUFBQyxTQUFTLEVBQUMsS0FBSyxFQUFDLFNBQVMsRUFBQyxlQUFlLElBQUssTUFBTTs7S0FFcEc7QUFBQyxjQUFRO2lCQUFDLGVBQWUsTUFBQSxFQUFDLFNBQVMsRUFBQyxpQkFBaUIsSUFBSyxZQUFZOztNQUE0QjtLQUN4RjtJQUNOO0dBQ047O01BQUssU0FBUyxFQUFDLE9BQU87SUFDckI7Ozs7S0FBbUI7SUFDbkI7O09BQUssR0FBRyxFQUFDLFVBQVUsRUFBQyxTQUFTLEVBQUMsV0FBVztLQUN2QyxJQUFJLENBQUMsS0FBSyxDQUFDLE1BQU0sQ0FBQyxHQUFHLENBQUMsVUFBVSxFQUFFLEVBQUUsQ0FBQyxFQUFFO0FBQ3ZDLGFBQU87O1NBQUssR0FBRyxFQUFFLEdBQUcsR0FBRyxDQUFDLEFBQUM7T0FBRSxFQUFFO09BQU8sQ0FBQztNQUNyQyxDQUFDO0tBQ0c7SUFDRDtHQUNELENBQ0w7RUFDRjtDQUNELENBQUMsQ0FBQzs7QUFFSCxLQUFLLENBQUMsTUFBTSxDQUFDLG9CQUFDLEdBQUcsT0FBRyxFQUFFLFFBQVEsQ0FBQyxjQUFjLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyIsImZpbGUiOiJnZW5lcmF0ZWQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uIGUodCxuLHIpe2Z1bmN0aW9uIHMobyx1KXtpZighbltvXSl7aWYoIXRbb10pe3ZhciBhPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7aWYoIXUmJmEpcmV0dXJuIGEobywhMCk7aWYoaSlyZXR1cm4gaShvLCEwKTt2YXIgZj1uZXcgRXJyb3IoXCJDYW5ub3QgZmluZCBtb2R1bGUgJ1wiK28rXCInXCIpO3Rocm93IGYuY29kZT1cIk1PRFVMRV9OT1RfRk9VTkRcIixmfXZhciBsPW5bb109e2V4cG9ydHM6e319O3Rbb11bMF0uY2FsbChsLmV4cG9ydHMsZnVuY3Rpb24oZSl7dmFyIG49dFtvXVsxXVtlXTtyZXR1cm4gcyhuP246ZSl9LGwsbC5leHBvcnRzLGUsdCxuLHIpfXJldHVybiBuW29dLmV4cG9ydHN9dmFyIGk9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtmb3IodmFyIG89MDtvPHIubGVuZ3RoO28rKylzKHJbb10pO3JldHVybiBzfSkiLCJ2YXIgUmVhY3QgPSByZXF1aXJlKCdyZWFjdCcpO1xudmFyIFRhcHBhYmxlID0gcmVxdWlyZSgncmVhY3QtdGFwcGFibGUnKTtcblxudmFyIEFwcCA9IFJlYWN0LmNyZWF0ZUNsYXNzKHtcblx0Z2V0SW5pdGlhbFN0YXRlOiBmdW5jdGlvbiAoKSB7XG5cdFx0cmV0dXJuIHtcblx0XHRcdHNjcm9sbGluZzogZmFsc2UsXG5cdFx0XHRldmVudHM6IFtdXG5cdFx0fTtcblx0fSxcblx0Y29tcG9uZW50RGlkVXBkYXRlOiBmdW5jdGlvbiAoKSB7XG5cdFx0dmFyIGxvZyA9IHRoaXMucmVmcy5ldmVudExvZy5nZXRET01Ob2RlKCk7XG5cdFx0bG9nLnNjcm9sbFRvcCA9IGxvZy5zY3JvbGxIZWlnaHQ7XG5cdH0sXG5cdGhhbmRsZUV2ZW50OiBmdW5jdGlvbiAobmFtZS8qLCBldmVudCovKSB7XG5cdFx0dmFyIGV2ZW50cyA9IHRoaXMuc3RhdGUuZXZlbnRzO1xuXHRcdGV2ZW50cy5wdXNoKG5hbWUpO1xuXHRcdHRoaXMuc2V0U3RhdGUoe1xuXHRcdFx0ZXZlbnRzOiBldmVudHNcblx0XHR9KTtcblx0fSxcblx0dG9nZ2xlU2Nyb2xsaW5nOiBmdW5jdGlvbiAoKSB7XG5cdFx0Y29uc29sZS5sb2coJ3Njcm9sbGluZzogJyArICF0aGlzLnN0YXRlLnNjcm9sbGluZyk7XG5cdFx0dGhpcy5zZXRTdGF0ZSh7XG5cdFx0XHRzY3JvbGxpbmc6ICF0aGlzLnN0YXRlLnNjcm9sbGluZ1xuXHRcdH0pO1xuXHR9LFxuXHRyZW5kZXI6IGZ1bmN0aW9uICgpIHtcblx0XHR2YXIgZXZlbnRzID0ge1xuXHRcdFx0b25UYXA6IHRoaXMuaGFuZGxlRXZlbnQuYmluZCh0aGlzLCAndGFwJyksXG5cdFx0XHRvblByZXNzOiB0aGlzLmhhbmRsZUV2ZW50LmJpbmQodGhpcywgJ3ByZXNzJyksXG5cdFx0XHRvblRvdWNoU3RhcnQ6IHRoaXMuaGFuZGxlRXZlbnQuYmluZCh0aGlzLCAndG91Y2hTdGFydCcpLFxuXHRcdFx0Ly8gb25Ub3VjaE1vdmU6IHRoaXMuaGFuZGxlRXZlbnQuYmluZCh0aGlzLCAndG91Y2hNb3ZlJyksXG5cdFx0XHRvblRvdWNoRW5kOiB0aGlzLmhhbmRsZUV2ZW50LmJpbmQodGhpcywgJ3RvdWNoRW5kJyksXG5cdFx0XHRvbk1vdXNlRG93bjogdGhpcy5oYW5kbGVFdmVudC5iaW5kKHRoaXMsICdtb3VzZURvd24nKSxcblx0XHRcdC8vIG9uTW91c2VNb3ZlOiB0aGlzLmhhbmRsZUV2ZW50LmJpbmQodGhpcywgJ21vdXNlTW92ZScpLFxuXHRcdFx0b25Nb3VzZVVwOiB0aGlzLmhhbmRsZUV2ZW50LmJpbmQodGhpcywgJ21vdXNlVXAnKSxcblx0XHRcdG9uTW91c2VPdXQ6IHRoaXMuaGFuZGxlRXZlbnQuYmluZCh0aGlzLCAnbW91c2VPdXQnKVxuXHRcdH07XG5cdFx0dmFyIG5lc3RlZEV2ZW50cyA9IHtcblx0XHRcdG9uVGFwOiB0aGlzLmhhbmRsZUV2ZW50LmJpbmQodGhpcywgJ3RhcCAobmVzdGVkKScpXG5cdFx0fTtcblx0XHR2YXIgdG9nZ2xlQ2xhc3MgPSB0aGlzLnN0YXRlLnNjcm9sbGluZyA/ICdzY3JvbGxpbmctZW5hYmxlZCcgOiAnc2Nyb2xsaW5nLWRpc2FibGVkJztcblx0XHRyZXR1cm4gKFxuXHRcdFx0PGRpdiBjbGFzc05hbWU9XCJleGFtcGxlXCI+XG5cdFx0XHRcdDxkaXYgY2xhc3NOYW1lPVwic2Nyb2xsaW5nXCI+XG5cdFx0XHRcdFx0PFRhcHBhYmxlIHByZXZlbnREZWZhdWx0IG9uVGFwPXt0aGlzLnRvZ2dsZVNjcm9sbGluZ30gY2xhc3NOYW1lPXt0b2dnbGVDbGFzc30+XG5cdFx0XHRcdFx0XHQ8c3BhbiBjbGFzc05hbWU9XCJsaW5rXCI+VG9nZ2xlIFNjcm9sbGluZzwvc3Bhbj46IHt0aGlzLnN0YXRlLnNjcm9sbGluZyA/ICdvbicgOiAnb2ZmJ31cblx0XHRcdFx0XHQ8L1RhcHBhYmxlPlxuXHRcdFx0XHQ8L2Rpdj5cblx0XHRcdFx0PGRpdiBjbGFzc05hbWU9XCJsZWZ0XCI+XG5cdFx0XHRcdFx0PGgzPlRhcHBhYmxlIGFyZWE6PC9oMz5cblx0XHRcdFx0XHQ8VGFwcGFibGUgcHJldmVudERlZmF1bHQ9eyF0aGlzLnN0YXRlLnNjcm9sbGluZ30gY29tcG9uZW50PVwiZGl2XCIgY2xhc3NOYW1lPVwidGFwcGFibGUtYXJlYVwiIHsuLi5ldmVudHN9PlxuXHRcdFx0XHRcdFx0VG91Y2ggbWVcblx0XHRcdFx0XHRcdDxUYXBwYWJsZSBzdG9wUHJvcGFnYXRpb24gY2xhc3NOYW1lPVwibmVzdGVkLXRhcHBhYmxlXCIgey4uLm5lc3RlZEV2ZW50c30+TmVzdGVkIFRhcHBhYmxlPC9UYXBwYWJsZT5cblx0XHRcdFx0XHQ8L1RhcHBhYmxlPlxuXHRcdFx0XHQ8L2Rpdj5cblx0XHRcdFx0PGRpdiBjbGFzc05hbWU9XCJyaWdodFwiPlxuXHRcdFx0XHRcdDxoMz5FdmVudCBsb2c6PC9oMz5cblx0XHRcdFx0XHQ8ZGl2IHJlZj1cImV2ZW50TG9nXCIgY2xhc3NOYW1lPVwiZXZlbnQtbG9nXCI+XG5cdFx0XHRcdFx0XHR7dGhpcy5zdGF0ZS5ldmVudHMubWFwKGZ1bmN0aW9uIChldiwgaSkge1xuXHRcdFx0XHRcdFx0XHRyZXR1cm4gPGRpdiBrZXk9eydlJyArIGl9Pntldn08L2Rpdj47XG5cdFx0XHRcdFx0XHR9KX1cblx0XHRcdFx0XHQ8L2Rpdj5cblx0XHRcdFx0PC9kaXY+XG5cdFx0XHQ8L2Rpdj5cblx0XHQpO1xuXHR9XG59KTtcblxuUmVhY3QucmVuZGVyKDxBcHAgLz4sIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdhcHAnKSk7XG4iXX0=
