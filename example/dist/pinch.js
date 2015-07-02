require=(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict';

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var React = require('react');
var Tappable = require('react-tappable');

var App = React.createClass({
	displayName: 'App',

	getInitialState: function getInitialState() {
		return {
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

React.render(React.createElement(App, null), document.getElementById('app'));

},{"react":undefined,"react-tappable":undefined}]},{},[1])
//# sourceMappingURL=data:application/json;charset:utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9yZWFjdC1jb21wb25lbnQtZ3VscC10YXNrcy9ub2RlX21vZHVsZXMvYnJvd3NlcmlmeS9ub2RlX21vZHVsZXMvYnJvd3Nlci1wYWNrL19wcmVsdWRlLmpzIiwiL1VzZXJzL25tbi9Ecm9wYm94L2NvZGUvcmVhY3QtdGFwcGFibGUvZXhhbXBsZS9zcmMvcGluY2guanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7O0FDQUEsSUFBSSxLQUFLLEdBQUcsT0FBTyxDQUFDLE9BQU8sQ0FBQyxDQUFDO0FBQzdCLElBQUksUUFBUSxHQUFHLE9BQU8sQ0FBQyxnQkFBZ0IsQ0FBQyxDQUFDOztBQUV6QyxJQUFJLEdBQUcsR0FBRyxLQUFLLENBQUMsV0FBVyxDQUFDOzs7QUFDM0IsZ0JBQWUsRUFBRSwyQkFBWTtBQUM1QixTQUFPO0FBQ04sU0FBTSxFQUFFLEVBQUU7R0FDVixDQUFDO0VBQ0Y7QUFDRCxtQkFBa0IsRUFBRSw4QkFBWTtBQUMvQixNQUFJLEdBQUcsR0FBRyxJQUFJLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxVQUFVLEVBQUUsQ0FBQztBQUMxQyxLQUFHLENBQUMsU0FBUyxHQUFHLEdBQUcsQ0FBQyxZQUFZLENBQUM7RUFDakM7QUFDRCxZQUFXLEVBQUUscUJBQVUsSUFBSSxjQUFhO0FBQ3ZDLE1BQUksTUFBTSxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsTUFBTSxDQUFDO0FBQy9CLFFBQU0sQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7QUFDbEIsTUFBSSxDQUFDLFFBQVEsQ0FBQztBQUNiLFNBQU0sRUFBRSxNQUFNO0dBQ2QsQ0FBQyxDQUFDO0VBQ0g7QUFDRCxPQUFNLEVBQUUsa0JBQVk7QUFDbkIsTUFBSSxZQUFZLEdBQUc7QUFDbEIsZUFBWSxFQUFFLElBQUksQ0FBQyxXQUFXLENBQUMsSUFBSSxDQUFDLElBQUksRUFBRSxhQUFhLENBQUM7QUFDeEQsY0FBVyxFQUFFLElBQUksQ0FBQyxXQUFXLENBQUMsSUFBSSxDQUFDLElBQUksRUFBRSxZQUFZLENBQUM7QUFDdEQsYUFBVSxFQUFFLElBQUksQ0FBQyxXQUFXLENBQUMsSUFBSSxDQUFDLElBQUksRUFBRSxXQUFXLENBQUM7R0FDcEQsQ0FBQztBQUNGLFNBQ0M7O0tBQUssU0FBUyxFQUFDLFNBQVM7R0FDdkI7O01BQUssU0FBUyxFQUFDLE1BQU07SUFDcEI7Ozs7S0FBdUI7SUFDdkI7O09BQUssU0FBUyxFQUFDLGVBQWU7O0tBRTdCO0FBQUMsY0FBUTtpQkFBQyxlQUFlLE1BQUEsRUFBQyxTQUFTLEVBQUMsaUJBQWlCLElBQUssWUFBWTs7TUFBNkI7S0FDOUY7SUFDRDtHQUNOOztNQUFLLFNBQVMsRUFBQyxPQUFPO0lBQ3JCOzs7O0tBQW1CO0lBQ25COztPQUFLLEdBQUcsRUFBQyxVQUFVLEVBQUMsU0FBUyxFQUFDLFdBQVc7S0FDdkMsSUFBSSxDQUFDLEtBQUssQ0FBQyxNQUFNLENBQUMsR0FBRyxDQUFDLFVBQVUsRUFBRSxFQUFFLENBQUMsRUFBRTtBQUN2QyxhQUFPOztTQUFLLEdBQUcsRUFBRSxHQUFHLEdBQUcsQ0FBQyxBQUFDO09BQUUsRUFBRTtPQUFPLENBQUM7TUFDckMsQ0FBQztLQUNHO0lBQ0Q7R0FDRCxDQUNMO0VBQ0Y7Q0FDRCxDQUFDLENBQUM7O0FBRUgsS0FBSyxDQUFDLE1BQU0sQ0FBQyxvQkFBQyxHQUFHLE9BQUcsRUFBRSxRQUFRLENBQUMsY0FBYyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMiLCJmaWxlIjoiZ2VuZXJhdGVkLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXNDb250ZW50IjpbIihmdW5jdGlvbiBlKHQsbixyKXtmdW5jdGlvbiBzKG8sdSl7aWYoIW5bb10pe2lmKCF0W29dKXt2YXIgYT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2lmKCF1JiZhKXJldHVybiBhKG8sITApO2lmKGkpcmV0dXJuIGkobywhMCk7dmFyIGY9bmV3IEVycm9yKFwiQ2Fubm90IGZpbmQgbW9kdWxlICdcIitvK1wiJ1wiKTt0aHJvdyBmLmNvZGU9XCJNT0RVTEVfTk9UX0ZPVU5EXCIsZn12YXIgbD1uW29dPXtleHBvcnRzOnt9fTt0W29dWzBdLmNhbGwobC5leHBvcnRzLGZ1bmN0aW9uKGUpe3ZhciBuPXRbb11bMV1bZV07cmV0dXJuIHMobj9uOmUpfSxsLGwuZXhwb3J0cyxlLHQsbixyKX1yZXR1cm4gbltvXS5leHBvcnRzfXZhciBpPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7Zm9yKHZhciBvPTA7bzxyLmxlbmd0aDtvKyspcyhyW29dKTtyZXR1cm4gc30pIiwidmFyIFJlYWN0ID0gcmVxdWlyZSgncmVhY3QnKTtcbnZhciBUYXBwYWJsZSA9IHJlcXVpcmUoJ3JlYWN0LXRhcHBhYmxlJyk7XG5cbnZhciBBcHAgPSBSZWFjdC5jcmVhdGVDbGFzcyh7XG5cdGdldEluaXRpYWxTdGF0ZTogZnVuY3Rpb24gKCkge1xuXHRcdHJldHVybiB7XG5cdFx0XHRldmVudHM6IFtdXG5cdFx0fTtcblx0fSxcblx0Y29tcG9uZW50RGlkVXBkYXRlOiBmdW5jdGlvbiAoKSB7XG5cdFx0dmFyIGxvZyA9IHRoaXMucmVmcy5ldmVudExvZy5nZXRET01Ob2RlKCk7XG5cdFx0bG9nLnNjcm9sbFRvcCA9IGxvZy5zY3JvbGxIZWlnaHQ7XG5cdH0sXG5cdGhhbmRsZUV2ZW50OiBmdW5jdGlvbiAobmFtZS8qLCBldmVudCovKSB7XG5cdFx0dmFyIGV2ZW50cyA9IHRoaXMuc3RhdGUuZXZlbnRzO1xuXHRcdGV2ZW50cy5wdXNoKG5hbWUpO1xuXHRcdHRoaXMuc2V0U3RhdGUoe1xuXHRcdFx0ZXZlbnRzOiBldmVudHNcblx0XHR9KTtcblx0fSxcblx0cmVuZGVyOiBmdW5jdGlvbiAoKSB7XG5cdFx0dmFyIG5lc3RlZEV2ZW50cyA9IHtcblx0XHRcdG9uUGluY2hTdGFydDogdGhpcy5oYW5kbGVFdmVudC5iaW5kKHRoaXMsICdwaW5jaCBzdGFydCcpLFxuXHRcdFx0b25QaW5jaE1vdmU6IHRoaXMuaGFuZGxlRXZlbnQuYmluZCh0aGlzLCAncGluY2ggbW92ZScpLFxuXHRcdFx0b25QaW5jaEVuZDogdGhpcy5oYW5kbGVFdmVudC5iaW5kKHRoaXMsICdwaW5jaCBlbmQnKVxuXHRcdH07XG5cdFx0cmV0dXJuIChcblx0XHRcdDxkaXYgY2xhc3NOYW1lPVwiZXhhbXBsZVwiPlxuXHRcdFx0XHQ8ZGl2IGNsYXNzTmFtZT1cImxlZnRcIj5cblx0XHRcdFx0XHQ8aDM+VGFwcGFibGUgYXJlYTo8L2gzPlxuXHRcdFx0XHRcdDxkaXYgY2xhc3NOYW1lPVwidGFwcGFibGUtYXJlYVwiPlxuXHRcdFx0XHRcdFx0VG91Y2ggbWVcblx0XHRcdFx0XHRcdDxUYXBwYWJsZSBzdG9wUHJvcGFnYXRpb24gY2xhc3NOYW1lPVwibmVzdGVkLXRhcHBhYmxlXCIgey4uLm5lc3RlZEV2ZW50c30+TmVzdGVkIFBpbmNoYWJsZTwvVGFwcGFibGU+XG5cdFx0XHRcdFx0PC9kaXY+XG5cdFx0XHRcdDwvZGl2PlxuXHRcdFx0XHQ8ZGl2IGNsYXNzTmFtZT1cInJpZ2h0XCI+XG5cdFx0XHRcdFx0PGgzPkV2ZW50IGxvZzo8L2gzPlxuXHRcdFx0XHRcdDxkaXYgcmVmPVwiZXZlbnRMb2dcIiBjbGFzc05hbWU9XCJldmVudC1sb2dcIj5cblx0XHRcdFx0XHRcdHt0aGlzLnN0YXRlLmV2ZW50cy5tYXAoZnVuY3Rpb24gKGV2LCBpKSB7XG5cdFx0XHRcdFx0XHRcdHJldHVybiA8ZGl2IGtleT17J2UnICsgaX0+e2V2fTwvZGl2Pjtcblx0XHRcdFx0XHRcdH0pfVxuXHRcdFx0XHRcdDwvZGl2PlxuXHRcdFx0XHQ8L2Rpdj5cblx0XHRcdDwvZGl2PlxuXHRcdCk7XG5cdH1cbn0pO1xuXG5SZWFjdC5yZW5kZXIoPEFwcCAvPiwgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2FwcCcpKTtcbiJdfQ==
