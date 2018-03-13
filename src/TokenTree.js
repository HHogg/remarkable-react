const OPEN_IDENTIFIER = '_open';
const CLOSE_IDENTIFIER = '_close';
const INLINE_TYPE = 'inline';

const isOpenToken = ({ type }) => type.includes(OPEN_IDENTIFIER);
const isCloseToken = ({ type }) => type.includes(CLOSE_IDENTIFIER);
const isInlineToken = ({ type }) => type === INLINE_TYPE;

export default class TokenTree {
  constructor(tokens = [], options, rOptions) {
    this.i = -1;
    this.tokens = tokens;
    this.options = options;
    this.rOptions = rOptions;

    return this.buildTokenTree();
  }

  getType(token) {
    return typeof this.options.tokens[token.type] === 'function'
      ? this.options.tokens[token.type](token, this.rOptions)
      : this.options.tokens[token.type];
  }

  buildToken(token, type = this.getType(token), children) {
    if (Array.isArray(type)) {
      return type.reduceRight((child, typee, index) => (
        this.buildToken(token, typee, index < type.length - 1 ? [child] : undefined)
      ), null);
    }

    if (!type) {
      return token.content;
    }

    return ({
      type,
      props: this.buildTokenProps(type, token),
      children: token.content,
    });
  }

  buildTokenTree() {
    const ts = this.tokens;
    const collection = [];

    while (++this.i < ts.length) {
      if (isOpenToken(ts[this.i])) {
        collection.push(
          this.buildToken(
            ts[this.i],
            this.getType(ts[this.i]),
            this.buildTokenTree()
          )
        );
      } else if (isCloseToken(ts[this.i])) {
        return collection;
      } else if (isInlineToken(ts[this.i])) {
        new TokenTree(ts[this.i].children, this.options, this.rOptions)
          .forEach((token) => collection.push(token));
      } else {
        collection.push(this.buildToken(ts[this.i]));
      }
    }

    return collection;
  }

  buildTokenProps(type, token) {
    const props = {};

    if (typeof this.options.components[type] === 'function') {
      props.options = this.rOptions;
    }

    [token, this.rOptions].forEach((prps) => {
      Object.keys(prps).forEach((prop) => {
        const propValue = this.resolveProp(type, prop, prps[prop]);
        if (propValue) props[propValue.key] = propValue.value;
      });
    });

    return props;
  }

  resolveProp(type, prop, propValue) {
    const component = this.options.components[type];
    const resolver = this.options.remarkableProps[prop];

    if (!resolver) return;

    if (typeof resolver === 'function') {
      return this.resolveFunctionProp(type, resolver(propValue, type), prop, propValue);
    }

    if (typeof resolver === 'string') {
      return this.resolveStringProp(resolver, propValue);
    }

    if (resolver === true || typeof component === 'function') {
      return this.resolveTrueProp(prop, propValue);
    }
  }

  resolveFunctionProp(type, keyValue, prop, propValue) {
    if (keyValue) {
      return {
        key: keyValue.key || prop,
        value: keyValue.hasOwnProperty('value')
          ? keyValue.value
          : propValue,
      };
    }
  }

  resolveStringProp(resolver, propValue) {
    return {
      key: resolver,
      value: propValue,
    };
  }

  resolveTrueProp(prop, propValue) {
    return {
      key: prop,
      value: propValue,
    };
  }
}
