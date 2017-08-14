import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { utils } from 'remarkable';

export default class CodeHighlighted extends Component {
  render() {
    const { children, params, options } = this.props;
    let fences
    let className;
    let content = utils.escapeHtml(children);

    if (params) {
      fences = params.split(/\s+/g);
      className = `hljs ${options.langPrefix}${utils.escapeHtml(
        utils.replaceEntities(utils.unescapeMd(fences.join(' ')))
      )}`;

      if (options.highlight) {
        content = options.highlight.apply(
          options.highlight, [content].concat(fences)) || content;
      }
    }

    return (
      <code
          className={ className }
          dangerouslySetInnerHTML={ { __html: content } } />
    );
  }
}

CodeHighlighted.propTypes = {
  children: PropTypes.node,
  params: PropTypes.string,
  options: PropTypes.shape({
    highlight: PropTypes.func,
  }).isRequired,
};
