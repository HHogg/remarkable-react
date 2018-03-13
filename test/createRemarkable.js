import Remarkable from 'remarkable';
import Renderer from '../src/Renderer';

export default (rOptions = {}, ttOptions = {}) => {
  const remarkable = new Remarkable(rOptions);
  const renderer = new Renderer(ttOptions);

  remarkable.renderer = renderer;
  remarkable.block.ruler.enable(['footnote']);
  remarkable.inline.ruler.enable(['footnote_inline', 'ins', 'mark', 'sub', 'sup']);
  remarkable.inline.ruler.push('video_rule', (state, silent) => {
    if (state.src[state.pos] !== '%') return false;
    if (!silent) {
      state.push({
        type: 'video_token',
        text: state.src,
        level: state.level,
      });
    }
    state.pos += state.src.length;
    return true;
  });

  return remarkable;
};
