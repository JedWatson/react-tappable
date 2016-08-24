# React-Tappable Changelog

## v0.8.4 / 2016-08-24

* fixed; Actually include React 15.2+ compatability patches this time!

## v0.8.3 / 2016-08-07

* fixed; React 15.2+ compatiblity patches from the last version were lost during build, correctly included in this version

## v0.8.2 / 2016-07-30

* fixed; warnings from React 15.2+ about invalid dom attributes have been resolved, thanks [Olivier Tassinari](https://github.com/oliviertassinari)
* fixed; pinch angle calculations have been fixed, thanks [Yusuke Shibata](https://github.com/yusukeshibata)
* fixed; `detectScroll()` didn't work properly on Android, thanks [Fangzhou Li](https://github.com/riophae)
* fixed; `ReactDOM` global is now used in the `dist` build

## v0.8.1 / 2016-03-20

Updated to allow compatiblity with React 15.x

## v0.8.0 / 2015-12-28

Tappable now supports keyboard events; a `keyDown` event with the `space` or `enter` keys followed by a `keyUp` event will fire the `onTap` handler.

New props `onKeyDown` and `onKeyUp` have also been added; return `false` from `onKeyDown` to prevent event handling.

Thanks to [Will Binns-Smith](https://github.com/wbinnssmith) for this update.

## v0.7.2 / 2015-12-13

* added; new `classes` prop (`Object`) adds support for defining the complete className applied with the component is `active` or `inactive`. Handy for use with [css-modules](https://github.com/css-modules/css-modules), thanks [Rudin Swagerman](https://github.com/rudin).

## v0.7.1 / 2015-10-16

* fixed; use `react-dom` for `findDOMNode`, thanks [Daniel Cousens](https://github.com/dcousens)

## v0.7.0 / 2015-10-13

Tappable is updated for React 0.14. If you're still using React 0.13, please continue to use `react-tappable@0.6.x`. There are no functional differences between v0.7.0 and v0.6.0.

## v0.6.0 / 2015-07-31

This release contains a major refactor that makes `react-tappable` more modular, thanks to [Naman Goel](https://github.com/nmn)

You can now use _just_ the `Tappable` component, or choose to use the `TapAndPinchable` (default export). Instructions will be added to the Readme with more information soon.

## v0.5.7 / 2015-07-30

* fixed; removed former hacky attempts to handle the React eventpooling problem
* added; support for React `0.14.0-beta1`

## v0.5.6 / 2015-07-29

* fixed; regression introduced in `v0.5.5` where errors would occur in certain conditions

## v0.5.5 / 2015-07-29

* fixed; `afterEndTouch` is now called synchronously, which means the SyntheticTouch event behaves as expected. See [#39](https://github.com/JedWatson/react-tappable/issues/39) and [#47](https://github.com/JedWatson/react-tappable/pull/47) for more information.

## v0.5.4 / 2015-07-25

* fixed; removed `React.initializeTouchEvents`, no longer needed and breaks in React 0.14

## v0.5.3 / 2015-07-24

* fixed; `preventDefault` issue on iOS

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
