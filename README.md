# remarkable-react

A configurable React component renderer for Remarkable. [Not a simple `dangerouslySetInnerHTML`!


## Install

```
Soon // npm install remarkable-react --save
```


## Usage

Simply instantiate a new RemarkableReactRenderer and replace the standard Remarkable renderer. Like so...

```js
var Remarkable = require('remarkable');
var RemarkableReactRenderer = require('remarkable-react');

var md = new Remarkable();
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
  // > Function(value): Returns an object with new `key` and/or `value`.
  // 
  remarkableProps: {
    align: '',    // Default: Function that remaps to style. (For tables)
    alt: '',      // Default: true (for images)
    block: '',    // Default: false
    content: '',  // Default: false
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
  },
});
```

## Contributing

I always love a contribution, but please try to add any needed additional tests, make sure previous tests pass and liniting is all good. 

```
npm run test
npm run lint
```

## License

[MIT]('./LICENSE')
