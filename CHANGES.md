# React-Tappable Changelog

## v0.5.2 / 2015-06-23

* Added `activeDelay` prop, delays adding the `-active` class by the provided milliseconds for situations when you don't want to hilight a tap immediately (e.g. iOS Scrollable Lists)

## v0.5.1 / 2015-06-17

* Fixed issue where halting momentum scrolling would incorrectly fire a tap event
* `onTap` now fires after the tappable's `setState` is complete, resolves some animation edge-case issues

## v0.5.0 / 2015-06-16

* Using Babel's polyfill for Object.assign
* `lib` build (via Babel) is provided for use without further transpilation
* `preventDefault` is called to clock the click event firing after a touch has been detected
* React has been changed to a dev/peerDependency
* Added pinch events - `onPinchStart`, `onPinchMove`, `onPinchEnd`
* Older single touch based events don't fire when dealing with multi-touch
* Refactored the way props are passed to component. You can now pass in custom properties for the target component that are not meant for React-Tappable

## v0.4.0 / 2015-03-12

### Updated

- Now works with React 0.13, backwards compatible with 0.12

## v0.3.3 / 2015-02-19

### Added

- Support for `data-` and `aria-` props on the Component, thanks [Tom Hicks](https://github.com/tomhicks-bsf)

## v0.3.2 / 2015-02-19

### Fixed

- Cleanup around removal of Reactify, build-examples is working again

## v0.3.1 / 2015-02-18

### Fixed

- Reactify is no longer included as a Browserify transform, thanks [Naman Goel](https://github.com/nmn)

## v0.3.0 / 2015-02-07

This release restructured the code so that most methods are now on a Mixin, which is used by the Component (`module.exports`);

You can now mix `react-tappable` into your own Components by using the Mixin directly:

```
var Tappable = require('react-tappable');

var MyComponent = React.createComponent({
	mixins: [Tappable.Mixin],
	/* ... */
});
```
