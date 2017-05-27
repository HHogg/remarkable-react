const React = require('react');
const buildTokenTree = require('./token-tree-builder');

const defaultOptions = {
  keyGen: (token, index) => index,
};

const defaultComponents = {
  a: 'a',
  blockquote: 'blockquote',
  br: 'br',
  code: 'code',
  del: 'del',
  em: 'em',
  h1: 'h1',
  h2: 'h2',
  h3: 'h3',
  h4: 'h4',
  h5: 'h5',
  h6: 'h6',
  hr: 'hr',
  img: 'img',
  ins: 'ins',
  li: 'li',
  mark: 'mark',
  ol: 'ol',
  p: 'p',
  pre: 'pre',
  strong: 'strong',
  sub: 'sub',
  sup: 'sup',
  table: 'table',
  tbody: 'tbody',
  td: 'td',
  th: 'th',
  thead: 'thead',
  tr: 'tr',
  ul: 'ul',
};

const defaultRemarkableProps = {
  align: (align) => ({
    key: 'style',
    value: align && { textAlign: align },
  }),
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
};

const defaultTokens = {
  blockquote_open: 'blockquote',
  bullet_list_open: 'ul',
  code: 'code',
  del_open: 'del',
  em_open: 'em',
  fence: ['pre', 'code'],
  hardbreak: 'br',
  heading_open: (token) => `h${token.hLevel}`,
  hr: 'hr',
  image: 'img',
  ins_open: 'ins',
  link_open: 'a',
  list_item_open: 'li',
  mark_open: 'mark',
  ordered_list_open: 'ol',
  paragraph_open: 'p',
  softbreak: 'br',
  strong_open: 'strong',
  sub: 'sub',
  sup: 'sup',
  table_open: 'table',
  tbody_open: 'tbody',
  td_open: 'td',
  th_open: 'th',
  thead_open: 'thead',
  tr_open: 'tr',
};

function Renderer(options = {}) {
  this.options = {
    ...defaultOptions,
    ...options,

    components: {
      ...defaultComponents,
      ...(options.components || {}),
    },

    remarkableProps: {
      ...defaultRemarkableProps,
      ...(options.remarkableProps || {}),
    },

    tokens: {
      ...defaultTokens,
      ...(options.tokens || {}),
    }
  };
}

Renderer.prototype.render = function(tokens = [], remarkableOptions) {
  return this.renderTokenTree(
    buildTokenTree(this.options.tokens, tokens),
    remarkableOptions);
}

Renderer.prototype.renderTokenTree = function(tokens, remarkableOptions) {
  if (!tokens || !Array.isArray(tokens)) {
    return tokens;
  }

  return tokens.map((token, index) => {
    return this.options.components[token.type]
      ? React.createElement(
          this.options.components[token.type],
          this.getTokenProps(token, index, remarkableOptions),
          this.renderTokenTree(token.children, remarkableOptions))
      : token.children;
  });
}

Renderer.prototype.getTokenProps = function(token, index, remarkableOptions) {
  const { props, type } = token;
  const tokenProps = {
    key: this.options.keyGen(token, index),
  };

  if (typeof this.options.components[type] === 'function') {
    tokenProps.options = remarkableOptions;
  }

  Object.keys(props).forEach((prop) => {
    if (this.options.remarkableProps.hasOwnProperty(prop)) {
      if (typeof this.options.remarkableProps[prop] === 'function') {
        const { key = prop, value = props[prop] } = this.options.remarkableProps[prop](props[prop]);

        if (value) {
          tokenProps[key] = value;
        }
      } else if (typeof this.options.remarkableProps[prop] === 'string') {
        tokenProps[this.options.remarkableProps[prop]] = props[prop];
      } else if (this.options.remarkableProps[prop] === true ||
          typeof this.options.components[type] === 'function') {
        tokenProps[prop] = props[prop];
      }
    }
  });

  return tokenProps;
}

module.exports = Renderer;


