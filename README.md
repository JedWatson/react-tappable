React-Tappable
==============

Tappable component for React. Abstracts touch events to implement `onTap`, `onPress`, and pinch events.

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

* `activeDelay` ms delay before the `-hilight` class is added, defaults to `0`
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
* `onPinchStart` fired when two fingers land on the screen
* `onPinchMove` fired on any movement while two fingers are on screen
* `onPinchEnd` fired when less than two fingers are left on the screen, onTouchStart is triggerred, if one touch remains

#### Pinch Events

Pinch events come with a special object with additional data to actually be more useful than the native events:

* touches: Array of Objects - {identifier, pageX, pageY} - raw data from the event
* center: Object - {x, y} - Calculated center between the two touch points
* angle: Degrees - angle of the line connecting the two touch points to the X-axis
* distance: Number of pixels - beween the two touch points
* displacement: Object {x, y} - offset of the center since the pinch began
* displacementVelocity: Object {x, y} : Pixels/ms - Immediate velocity of the displacement
* rotation: degrees - delta rotation since the beginning of the gesture
* rotationVelocity: degrees/millisecond - immediate rotational velocity
* zoom: Number - Zoom factor - ratio between distance between the two touch points now over initial
* zoomVelocity: zoomFactor/millisecond - immediate velocity of zooming
* time: milliseconds since epoch - Timestamp

#### Known Issues

* The pinch implementation has not been thoroughly tested
* Any touch event with 3 three or more touches is completely ignored.

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

## Changelog

See [CHANGES.md](https://github.com/JedWatson/react-tappable/blob/master/CHANGES.md)

## License

(The MIT License)

Copyright (c) 2015 Jed Watson

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the 'Software'), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED 'AS IS', WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
