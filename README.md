React-Tappable
==============

Tappable component for React. Abstracts touch events to implement `onTap` and `onPress`.

The events mimic their native equivalents as closely as possible:

* the baseClass (default: `Tappable`) has `-active` or `-inactive` added to it to enable pressed-state styling
* the pressed state is visually cancelled if the touch moves too far away from the element, but resumes if the touch comes back again
* when you start scrolling a parent element, the touch event is cancelled
* if the `onPress` property is set, it will cancel the touch event after the press happens

When touch events are not supported, it will fall back to mouse events.


## Demo & Examples

Live demo: [jedwatson.github.io/react-tappable](http://jedwatson.github.io/react-tappable/)

To build the examples locally, run:

```
npm install
gulp dev
```

Then open [`localhost:8000`](http://localhost:8000) in a browser.


## Installation

The easiest way to use React-tappable is to install it from NPM and include it in your own React build process (using [Browserify](http://browserify.org), etc).

You can also use the standalone build by including `dist/react-tappable.js` in your page. If you use this, make sure you have already included React, and it is available as a global variable.

```
npm install react-tappable --save
```


## Usage

React-tappable generates a React component (defaults to `<span>`) and binds touch events to it.

To disable default event handling (e.g. scrolling) set the `preventDefault` prop.

```
var Tappable = require('react-tappable');

<Tappable onTap={this.handleTapEvent}>Tap me</Tappable>
```

### Properties

* `component` component to render, defaults to `'span'`
* `className` optional class name for the component
* `classBase` base to use for the active/inactive classes
* `moveThreshold` px to allow movement before cancelling a tap; defaults to `100`
* `pressDelay` ms delay before a press event is detected, defaults to `1000`
* `pressMoveThreshold` px to allow movement before ignoring long presses; defaults to `5`
* `preventDefault` (boolean) automatically call preventDefault on all events
* `stopPropagation` (boolean) automatically call stopPropagation on all events

### Special Events

These are the special events implemented by `Tappable`.

* `onTap` fired when touchStart or mouseDown is followed by touchEnd or mouseUp within the moveThreshold
* `onPress` fired when a touch is held for the specified ms

### Native Events

The following native event handlers can also be specified.

* `onTouchStart`
* `onTouchMove`
* `onTouchEnd`
* `onMouseDown`
* `onMouseUp`
* `onMouseMove`
* `onMouseOut`

Returning `false` from `onTouchStart` or `onMouseDown` handlers will prevent `Tappable` from handling the event.
