# remarkable-react

[![Build Status](https://travis-ci.org/HHogg/remarkable-react.svg?branch=master)](https://travis-ci.org/HHogg/remarkable-react)
[![npm version](https://badge.fury.io/js/remarkable-react.svg)](https://badge.fury.io/js/remarkable-react)
[![Code Climate](https://codeclimate.com/github/HHogg/remarkable-react/badges/gpa.svg)](https://codeclimate.com/github/HHogg/remarkable-react)

A configurable React component renderer for [Remarkable](https://github.com/jonschlinkert/remarkable). [Not a simple `dangerouslySetInnerHTML`!


## Install

```
npm install remarkable-react --save

# OR

yarn add remarkable-react
```


## Usage

Simply instantiate a new RemarkableReactRenderer and replace the standard Remarkable renderer. Like so...

```js
import Remarkable from 'remarkable';
import RemarkableReactRenderer from 'remarkable-react';

const md = new Remarkable();
md.renderer = new RemarkableReactRenderer();

console.log(md.render('# Remarkable rulezz!'));

/*
 * => [
 *  ReactComponent {
 *    type: 'h1',
 *    key: 0,
 *    props: {
 *      children: ['Remarkable ruleszz!']
 *    },
 *  }
 * ]
 */
}
```

### Options

See the configuration options below that can be passed to RemarkableReactRenderer.

```js
new RemarkableReactRenderer({

  // Key generator function used to generate the need React keys
  // Default: return `index`
  keyGen: function(token, index) {
    return 'A Key';
  },

  // This enables you to configure the properties that gets passed to
  // the React component. The value can either be a Function, String or Boolean.
  //
  // > Boolean: `true` will pass it through as it is, `false` will not pass it.
  // > String: Used to remap the prop and pass through under the new name.
  // > Function(value, type): Returns an object with new `key` and/or `value`.
  //
  remarkableProps: {
    align: '',    // Default: Function that remaps to style. (For tables)
    alt: '',      // Default: true (for images)
    block: '',    // Default: false
    content: '',  // Default: Function that returns `dangerouslySetInnerHTML` when HTML is enabled.
    hLevel:'',    // Default: false
    href:'',      // Default: true (for links)
    level: '',    // Default: false
    lines: '',    // Default: false
    order: '',    // Default: false
    params:'',    // Default: false
    src: '',      // Default: true (for images)
    tight: '',    // Default: false
    title: '',    // Default: true (for images and links)
    type:'',      // Default: false
  },

  // Pass in your own React components!
  //
  // Note: At the moment the following are not implemented.
  // * abbreviations
  // * definition lists
  // * footnotes
  //
  components: {
    a: Component,           // Default: <a />
    blockquote: Component,  // Default: <blockquote />
    br: Component,          // Default: <br />
    code: Component,        // Default: <code />
    del: Component,         // Default: <del />
    em: Component,          // Default: <em />
    h1: Component,          // Default: <h1 />
    h2: Component,          // Default: <h2 />
    h3: Component,          // Default: <h3 />
    h4: Component,          // Default: <h4 />
    h5: Component,          // Default: <h5 />
    h6: Component,          // Default: <h6 />
    html: Component,        // Default: <div />
    img: Component,         // Default: <img />
    ins: Component,         // Default: <ins />
    li: Component,          // Default: <li />
    mark: Component,        // Default: <mark />
    ol: Component,          // Default: <ol />
    p: Component,           // Default: <p />
    pre: Component,         // Default: <pre />
    strong: Component,      // Default: <strong />
    sub: Component,         // Default: <sub />
    sup: Component,         // Default: <sup />
    table: Component,       // Default: <table />
    tbody: Component,       // Default: <tbody />
    td: Component,          // Default: <td />
    th: Component,          // Default: <th />
    thead: Component,       // Default: <thead />
    tr: Component,          // Default: <tr />
    ul: Component,          // Default: <ul />

    /**
     * Custom components that are defined in the tokens
     * section below.
     */
    custom_component: Component
  },

  // This enables you to configure the mapping of remarkable tokens to component (above).
  // The value can either be a Function, String or Array.
  //
  // > Array[String]: Will nest components from parent down.
  // > String: Used to map directly to a single component.
  // > Function(tokenObject, remarkableOptions): Return a string or Component.
  //
  tokens: {

    // Use this to also handle your custom remarkable tokens!
    custom_token: 'custom_component',
  },

  // This enables you to quickly configure how children are rendered for tokens.
  // By default the `content` of a token is mapped to `children`.
  children: {
    footnote_anchor: () => `↩`,
  },
});
```

## Contributing

:heart: contribution, but please try to add any needed additional tests, make sure previous tests pass and linting is all groovy.

```
yarn test
yarn lint
```

## License

[MIT]('./LICENSE')
