import React, { Component } from 'react';
import { render } from 'react-dom';
import Remarkable from 'remarkable';
import HighlightJS from 'highlight.js';
import RemarkableReactRenderer from '../src';
import initialMarkdownContent from './demo.md';
import CodeHighlighted from './CodeHighlighted';
import 'highlight.js/styles/agate.css';
import './demo.scss';

class Demo extends Component {
  componentWillMount() {
    this.setState({
      markdown: initialMarkdownContent,
    });
  }

  render() {
    const { markdown } = this.state;
    const renderer = new RemarkableReactRenderer({
      components: {
        code: CodeHighlighted,
      },
    });

    /* eslint-disable no-empty */
    const remarkable = new Remarkable({
      highlight: function (str, lang) {
        if (lang && HighlightJS.getLanguage(lang)) {
          try {
            return HighlightJS.highlight(lang, str).value;
          } catch (err) {}
        }

        try {
          return HighlightJS.highlightAuto(str).value;
        } catch (err) {}

        return '';
      }
    });
    /* eslint-enable */

    remarkable.inline.ruler.enable(['ins', 'mark', 'sub', 'sup']);
    remarkable.renderer = renderer;

    return (
      <div className="rr-demo-layout">
        <div className="rr-demo-layout__column">
          <textarea
              className="rr-markdown-input"
              onChange={ (event)  => this.setState({ markdown: event.target.value }) }
              value={ markdown } />
        </div>

        <div className="rr-demo-layout__column">
          <div className="rr-markdown-output">
            { remarkable.render(markdown) }
          </div>
        </div>
      </div>
    );
  }
}

render(<Demo />, document.getElementById('demo'));
