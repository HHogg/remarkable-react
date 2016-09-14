import React, { Component } from 'react';
import { render } from 'react-dom';
import Remarkable from 'remarkable';
import RemarkableReactRenderer from '../src';
import initialMarkdownContent from './demo.md';
import './demo.scss';

class Demo extends Component {
  componentWillMount() {
    this.setState({
      markdown: initialMarkdownContent,
    });
  }

  render() {
    const { markdown } = this.state;
    const remarkable = new Remarkable();
    const renderer = new RemarkableReactRenderer();

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
