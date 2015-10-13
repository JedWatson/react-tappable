var React = require('react');
var ReactDOM = require('react-dom');
var Tappable = require('react-tappable');

var App = React.createClass({
	getInitialState: function () {
		return {
			events: []
		};
	},
	componentDidUpdate: function () {
		var log = this.refs.eventLog;
		log.scrollTop = log.scrollHeight;
	},
	handleEvent: function (name/*, event*/) {
		var events = this.state.events;
		events.push(name);
		this.setState({
			events: events
		});
	},
	render: function () {
		var nestedEvents = {
			onPinchStart: this.handleEvent.bind(this, 'pinch start'),
			onPinchMove: this.handleEvent.bind(this, 'pinch move'),
			onPinchEnd: this.handleEvent.bind(this, 'pinch end')
		};
		return (
			<div className="example">
				<div className="left">
					<h3>Tappable area:</h3>
					<div className="tappable-area">
						Touch me
						<Tappable stopPropagation className="nested-tappable" {...nestedEvents}>Nested Pinchable</Tappable>
					</div>
				</div>
				<div className="right">
					<h3>Event log:</h3>
					<div ref="eventLog" className="event-log">
						{this.state.events.map(function (ev, i) {
							return <div key={'e' + i}>{ev}</div>;
						})}
					</div>
				</div>
			</div>
		);
	}
});

ReactDOM.render(<App />, document.getElementById('app'));
