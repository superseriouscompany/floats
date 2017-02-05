# Floats

## Requirements

1. React Native https://facebook.github.io/react-native/docs/getting-started.html
1. Facebook SDK https://developers.facebook.com/docs/ios/getting-started/
1. Carthage https://github.com/Carthage/Carthage#installing-carthage

## Installation

    $ npm install

## Running

    # iOS
    $ (cd ios && carthage bootstrap)
    $ open ios/floats.xcodeproj

    # Android
    Run android studio, open android folder

## Architecture

We modeled our architecture on redux best practices. Read more here:  http://redux.js.org/docs/basics/DataFlow.html

### Flow

`render state => respond => update state => render state`

_render_: `containers` render `components` with injected `actions`. `components` may use `styles` and `images`.

_respond_: When a user taps something or a push is received, the `component` triggers an `action`. The `action` might use a `service` to do its processing.

_update state_: Each `action` will dispatch one or more actions to a `reducer`, which updates the state.

_render state_: `containers` map state to props and re-render their `component` if the props have changed.

### Responsibilities

`app/containers/`

Containers could also be called controllers. They translate state to properties for rendering and inject listeners into their components. They follow the pattern outlined here: https://medium.com/@dan_abramov/smart-and-dumb-components-7ca2f9a7c7d0#.3f41m3lyx

`app/actions/`

Actions provide logic that can be dispatched from containers or components in response to user interaction.

`app/reducers/`

Reducers contain the logic for translating dispatched actions into state changes.

`app/services/`

These are reusable stateless behaviors, for example an api wrapper or string manipulator.


### Presentation

`app/components/`

Components are purely presentational: they take props and render them into jsx.

`app/images/`

Images are assets in 1x, 1.5x, 2x and 3x resolutions.

`app/styles/`

Styles are reusable stylesheets. One-off styles are defined inline in components.
