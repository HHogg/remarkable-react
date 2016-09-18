const React = require('react');
const ReactDOMFactories = require('react/lib/ReactDOMFactories');
const buildTokenTree = require('./token-tree-builder');

const defaultOptions = {
  remarkableProps: {
    align(align) {
      return {
        key: 'style',
        value: align && { textAlign: align },
      };
    },
    alt: true,
    block: false,
    content: false,
    hLevel: false,
    href: true,
    level: false,
    lines: false,
    order: false,
    params: false,
    src: true,
    tight: false,
    title: true,
    type: false,
  },
  keyGen(token, index) {
    return index;
  },
};

const defaultComponents = Object.keys(ReactDOMFactories)
  .reduce((components, DOMFactoryKey) => {
    components[DOMFactoryKey] = DOMFactoryKey;
    return components;
  }, {});

function Renderer(options = {}) {
  this.options = {
    ...defaultOptions,
    ...options,

    components: {
      ...defaultComponents,
      ...(options.components || {}),
    },

    remarkableProps: {
      ...defaultOptions.remarkableProps,
      ...(options.remarkableProps || {}),
    },
  };
}

Renderer.prototype.render = function(tokens = []) {
  return this.renderTokenTree(buildTokenTree(tokens));
}

Renderer.prototype.renderTokenTree = function(tokens) {
  if (!tokens || !Array.isArray(tokens)) {
    return tokens;
  }

  return tokens.map((token, index) => {
    return this.options.components[token.type]
      ? React.createElement(
          this.options.components[token.type],
          this.getTokenProps(token, index),
          this.renderTokenTree(token.children))
      : token.children;
  });
}

Renderer.prototype.getTokenProps = function(token, index) {
  const { props } = token;

  return Object.keys(props).reduce((newProps, prop) => {
    if (this.options.remarkableProps.hasOwnProperty(prop)) {
      if (typeof this.options.remarkableProps[prop] === 'function') {
        const { key = prop, value = props[prop] } = this.options.remarkableProps[prop](props[prop]);

        if (value) {
          newProps[key] = value;
        }
      } else if (typeof this.options.remarkableProps[prop] === 'string') {
        newProps[this.options.remarkableProps[prop]] = props[prop];
      } else if (this.options.remarkableProps[prop] === true) {
        newProps[prop] = props[prop];
      }
    }

    return newProps;
  }, {
    key: this.options.keyGen(token, index),
  });
}

module.exports = Renderer;


