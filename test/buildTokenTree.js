import createRemarkable from './createRemarkable';

export default (fixture = '', rOptions = {}, ttOptions = {}) => {
  const remarkable = createRemarkable(rOptions, ttOptions);

  return remarkable.renderer.buildTokenTree(
    remarkable.parse(fixture, {}), rOptions
  );
};
