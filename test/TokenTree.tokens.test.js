import buildTokenTree from './buildTokenTree';

describe('TokenTree tokens', () => {
  test('custom', () => {
    expect(buildTokenTree(`

% Lorem

      `, {}, {
        components: {
          video: 'video',
        },
        tokens: {
          video_token: 'video',
        },
      })).toMatchSnapshot();
  });
});
