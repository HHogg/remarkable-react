import createRemarkable from './createRemarkable';

export default (fixture = '', rOptions = {}, ttOptions = {}) => {
  const remarkable = createRemarkable(rOptions, ttOptions);

  return remarkable.renderer.render(
    remarkable.parse(fixture, {}), rOptions
  );
};
