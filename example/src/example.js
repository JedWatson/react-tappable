var React = require('react');
var Tappable = require('react-tappable');

var App = React.createClass({
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
	handleEvent: function(name/*, event*/) {
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
		};
		var nestedEvents = {
			onTap: this.handleEvent.bind(this, 'tap (nested)')
		};
		var toggleClass = this.state.scrolling ? 'scrolling-enabled' : 'scrolling-disabled';
		return (
			<div className="example">
				<div className="scrolling">
					<Tappable preventDefault onTap={this.toggleScrolling} className={toggleClass}>
						<span className="link">Toggle Scrolling</span>: {this.state.scrolling ? 'on' : 'off'}
					</Tappable>
				</div>
				<div className="left">
					<h3>Tappable area:</h3>
					<Tappable preventDefault={!this.state.scrolling} component="div" className="tappable-area" {...events}>
						Touch me
						<Tappable stopPropagation className="nested-tappable" {...nestedEvents}>Nested Tappable</Tappable>
					</Tappable>
				</div>
				<div className="right">
					<h3>Event log:</h3>
					<div ref="eventLog" className="event-log">
						{this.state.events.map(function(ev, i) {
							return <div key={'e'+i}>{ev}</div>;
						})}
					</div>
				</div>
			</div>
		);
	}
});

React.render(<App />, document.getElementById('app'));
