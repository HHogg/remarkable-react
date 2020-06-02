import renderer from 'react-test-renderer';
import buildReactTree from './buildReactTree';

const renderToJson = (...args) =>
   renderer.create(buildReactTree(...args)).toJSON();

describe('Renderer components', () => {
  test('<a>', () => {
    expect(renderToJson(`

[Link](http://link.com "Title")

    `)).toMatchSnapshot();
  });

  test('<blockquote>', () => {
    expect(renderToJson(`

> Blockquote

    `)).toMatchSnapshot();
  });

  describe('<br>', () => {
    test('with breaks', () => {
      expect(renderToJson(`

New
Line

      `, { breaks: true })).toMatchSnapshot();
    });

    test('without breaks', () => {
      expect(renderToJson(`

New
Line

      `)).toMatchSnapshot();
    });
  });

  test('<code>', () => {
    expect(renderToJson(`

\`Code\`

    `)).toMatchSnapshot();
  });

  test('<del>', () => {
    expect(renderToJson(`

~~Deleted~~

    `)).toMatchSnapshot();
  });

  test('<em>', () => {
    expect(renderToJson(`

*Italic*

    `)).toMatchSnapshot();
  });

  describe('<footnote>', () => {
    test('inline', () => {
      expect(renderToJson(`

Footnote^[Foonote body].

      `)).toMatchSnapshot();
    });

    test('separated', () => {
      expect(renderToJson(`

Footnote[^first].

[^first]: #### Footnote

    Footnote body

      `)).toMatchSnapshot();
    });
  });

  test('<h1>', () => {
    expect(renderToJson(`

# Heading 1

    `)).toMatchSnapshot();
  });

  test('<h2>', () => {
    expect(renderToJson(`

## Heading 2

    `)).toMatchSnapshot();
  });

  test('<h3>', () => {
    expect(renderToJson(`

### Heading 3

    `)).toMatchSnapshot();
  });

  test('<h4>', () => {
    expect(renderToJson(`

#### Heading 4

    `)).toMatchSnapshot();
  });

  test('<h5>', () => {
    expect(renderToJson(`

##### Heading 5

    `)).toMatchSnapshot();
  });

  test('<h6>', () => {
    expect(renderToJson(`

###### Heading 6

    `)).toMatchSnapshot();
  });

  test('<hr>', () => {
    expect(renderToJson(`

___

    `)).toMatchSnapshot();
  });

  describe('<html>', () => {
    test('with html', () => {
      expect(renderToJson(`

<p>Hello</p>
<iframe src="/something.html" />

      `, { html: true })).toMatchSnapshot();
    });

    test('without html', () => {
      expect(renderToJson(`

<p>Hello</p>
<iframe src="/something.html" />

      `)).toMatchSnapshot();
    });
  });

  test('<img>', () => {
    expect(renderToJson(`

![Alt](http://image.com "Title")

    `)).toMatchSnapshot();
  });

  test('<ins>', () => {
    expect(renderToJson(`

++Insert++

    `)).toMatchSnapshot();
  });

  test('<mark>', () => {
    expect(renderToJson(`

==Mark==

    `)).toMatchSnapshot();
  });

  test('<ol> <li>', () => {
    expect(renderToJson(`

1. Level 1 Item 1
2. Level 1 Item 2
3. Level 1 Item 3

    `)).toMatchSnapshot();
  });

  test('<p>', () => {
    expect(renderToJson(`

Paragraph

    `)).toMatchSnapshot();
  });

  test('<pre> <code>', () => {
    expect(renderToJson(`

\`\`\`
Code
\`\`\`

    `)).toMatchSnapshot();
  });

  test('<strong>', () => {
    expect(renderToJson(`

**Strong**

    `)).toMatchSnapshot();
  });

  test('<sub>', () => {
    expect(renderToJson(`

~Subscript~

    `)).toMatchSnapshot();
  });

  test('<sup>', () => {
    expect(renderToJson(`

^Superscript^

    `)).toMatchSnapshot();
  });

  test('<table> <thead> <tbody> <tr> <th> <td>', () => {
    expect(renderToJson(`

| Header 1 | Header 2 |
| -------- | -------- |
| Row 1 Cell 1 | Row 1 Cell 2 |
| Row 2 Cell 1 | Row 2 Cell 2 |

    `)).toMatchSnapshot();
  });

  test('<ul> <li>', () => {
    expect(renderToJson(`

* Level 1 Item 1
* Level 1 Item 2
  * Level 2 Item 1
    * Level 3 Item 1
  * Level 2 Item 2

    `)).toMatchSnapshot();
  });

  test('CustomComponent', () => {

  });
});
