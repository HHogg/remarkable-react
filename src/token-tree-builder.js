import { assign } from './utils';

const TOP_LEVEL = 0;
const OPEN_IDENTIFIER = '_open';
const CLOSE_IDENTIFIER = '_close';
const INLINE_TYPE = 'inline';

const isOpenToken = ({ type }) => type.includes(OPEN_IDENTIFIER);
const isCloseToken = ({ type }) => type.includes(CLOSE_IDENTIFIER);
const isInlineToken = ({ type }) => type === INLINE_TYPE;

const getType = (tokenMap, token, options) =>
  typeof tokenMap[token.type] === 'function'
    ? tokenMap[token.type](token, options)
    : tokenMap[token.type];

const expandToken = (token, types) =>
  types.reduceRight((child, type, index) => ({
    type,
    props: token,
    children: index === types.length - 1 ? token.content : [child],
  }) , null);

const buildToken = (tokenMap, token, options) => {
  const type = getType(tokenMap, token, options);

  if (Array.isArray(type)) {
    return expandToken(token, type);
  }

  return {
    type,
    props: token,
    children: options.html && type === 'html' ? null : token.content,
  };
}

const buildParentToken = (tokenMap, tokens, options, index, level) =>
  assign({}, buildToken(tokenMap, tokens[index], options), {
    children: buildTokenTree(tokenMap, tokens, options, index, level + 1),
  });

const buildTokenTree = (tokenMap, tokens, options, index = -1, level = TOP_LEVEL) => {
  const collection = [];

  while (++index < tokens.length) {
    if (level === tokens[index].level) {
      if (isInlineToken(tokens[index])) {
        return buildTokenTree(tokenMap, tokens[index].children, options);
      }

      if (isOpenToken(tokens[index])) {
        collection.push(buildParentToken(tokenMap, tokens, options, index, level));
      } else if (!isCloseToken(tokens[index])) {
        collection.push(buildToken(tokenMap, tokens[index], options));
      }
    } else if (level !== TOP_LEVEL && level > tokens[index].level) {
      return collection;
    }
  }

  return collection;
}

export default buildTokenTree;
