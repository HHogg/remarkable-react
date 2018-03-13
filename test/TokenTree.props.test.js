import buildTokenTree from './buildTokenTree';

describe('TokenTree props', () => {
  test('[align]', () => {
    expect(buildTokenTree(`

| Header 1 | Header 2 | Header 3 |
| :-------- | ---------| --------: |

    `)).toMatchSnapshot();
  });

  test('[alt]', () => {
    expect(buildTokenTree(`

![Alt]()

    `)).toMatchSnapshot();
  });

  test('[block]', () => {
    expect(buildTokenTree(`

\`Code\`

    `)).toMatchSnapshot();
  });

  describe('[content]', () => {
    test('without option html', () => {
      expect(buildTokenTree(`

<p>Hello</p>
<iframe src="/something.html" />

      `)).toMatchSnapshot();
    });

    test('with option html', () => {
      expect(buildTokenTree(`

<p>Hello</p>
<iframe src="/something.html" />

      `, { html: true })).toMatchSnapshot();
    });
  });

  test('[hLevel]', () => {
    expect(buildTokenTree(`

# Heading 1

      `)).toMatchSnapshot();
  });

  test('[href]', () => {
    expect(buildTokenTree(`

[](http://google.com)

    `)).toMatchSnapshot();
  });

  test('[level]', () => {
    expect(buildTokenTree(`

Paragraph

      `)).toMatchSnapshot();
  });

  test('[lines]', () => {
    expect(buildTokenTree(`

Paragraph

      `)).toMatchSnapshot();
  });

  describe('[linkTarget]', () => {
    test('without remarkableOption', () => {
      expect(buildTokenTree(`

[Link](http://link.com "Title")

      `)).toMatchSnapshot();
    });

    test('with remarkableOption', () => {
      expect(buildTokenTree(`

[Link](http://link.com "Title")

      `, { linkTarget: '_blank' })).toMatchSnapshot();
    });
  });

  test('[order]', () => {
    expect(buildTokenTree(`

1. List item 1

      `)).toMatchSnapshot();
  });

  test('[params]', () => {
    expect(buildTokenTree(`

\`\`\`js
Code
\`\`\`

      `)).toMatchSnapshot();
  });

  test('[src]', () => {
    expect(buildTokenTree(`

![](http://google.com)

    `)).toMatchSnapshot();
  });

  test('[title]', () => {
    expect(buildTokenTree(`

![](http://google.com "Title")

    `)).toMatchSnapshot();
  });

  test('[type]', () => {
    expect(buildTokenTree(`

# Heading 1

      `)).toMatchSnapshot();
  });
});

describe('types', () => {
  describe('Function', () => {
    test('String', () => {
      expect(buildTokenTree(`

![](http://google.com "Title")

      `, {}, {
        remarkableProps: {
          title: (value) => ({
            key: 'newTitle',
            value: value.toUpperCase(),
          }),
        },
      })).toMatchSnapshot();
    });

    test('Boolean (true)', () => {
      expect(buildTokenTree(`

![](http://google.com "true")

      `, {}, {
        remarkableProps: {
          title: (value) => ({
            value: value && value.toLowerCase() === 'true',
          }),
        },
      })).toMatchSnapshot();
    });

    test('Boolean (false)', () => {
      expect(buildTokenTree(`

![](http://google.com "false")

      `, {}, {
        remarkableProps: {
          title: (value) => ({
            value: value && value.toLowerCase() === 'true',
          }),
        },
      })).toMatchSnapshot();
    });
  });

  test('String', () => {
    expect(buildTokenTree(`

![](http://google.com "Title")

        `, {}, {
          remarkableProps: {
            title: 'newTitle',
          },
        })).toMatchSnapshot();
  });

  describe('Boolean', () => {
    test('false', () => {
      expect(buildTokenTree(`

![](http://google.com "Title")

      `, {}, {
        remarkableProps: {
          title: false,
        },
      })).toMatchSnapshot();
    });

    test('true', () => {
      expect(buildTokenTree(`

![](http://google.com "Title")

      `, {}, {
        remarkableProps: {
          type: true,
        },
      })).toMatchSnapshot();
    });
  });
});
