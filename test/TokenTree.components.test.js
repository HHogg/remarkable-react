import buildTokenTree from './buildTokenTree';

describe('TokenTree components', () => {
  test('<a>', () => {
    expect(buildTokenTree(`

[Link](http://link.com "Title")

    `)).toMatchSnapshot();
  });

  test('<blockquote>', () => {
    expect(buildTokenTree(`

> Blockquote

    `)).toMatchSnapshot();
  });

  describe('<br>', () => {
    test('with breaks', () => {
      expect(buildTokenTree(`

New\nLine

      `, { breaks: true })).toMatchSnapshot();
    });

    test('without breaks', () => {
      expect(buildTokenTree(`

New\nLine

      `)).toMatchSnapshot();
    });
  });

  test('<code>', () => {
    expect(buildTokenTree(`

\`Code\`

    `)).toMatchSnapshot();
  });

  test('<del>', () => {
    expect(buildTokenTree(`

~~Deleted~~

    `)).toMatchSnapshot();
  });

  test('<em>', () => {
    expect(buildTokenTree(`

*Italic*

    `)).toMatchSnapshot();
  });

  describe('<footnote>', () => {
    test('inline', () => {
      expect(buildTokenTree(`

Footnote^[Foonote body].

      `)).toMatchSnapshot();
    });

    test('separated', () => {
      expect(buildTokenTree(`

Footnote[^first].

[^first]: #### Footnote

    Footnote body

      `)).toMatchSnapshot();
    });
  });

  test('<h1>', () => {
    expect(buildTokenTree(`

# Heading 1

    `)).toMatchSnapshot();
  });

  test('<h2>', () => {
    expect(buildTokenTree(`

## Heading 2

    `)).toMatchSnapshot();
  });

  test('<h3>', () => {
    expect(buildTokenTree(`

### Heading 3

    `)).toMatchSnapshot();
  });

  test('<h4>', () => {
    expect(buildTokenTree(`

#### Heading 4

    `)).toMatchSnapshot();
  });

  test('<h5>', () => {
    expect(buildTokenTree(`

##### Heading 5

    `)).toMatchSnapshot();
  });

  test('<h6>', () => {
    expect(buildTokenTree(`

###### Heading 6

    `)).toMatchSnapshot();
  });

  test('<hr>', () => {
    expect(buildTokenTree(`

___

    `)).toMatchSnapshot();
  });

  describe('<html>', () => {
    test('with html', () => {
      expect(buildTokenTree(`

<p>Hello</p>
<iframe src="/something.html" />

      `, { html: true })).toMatchSnapshot();
    });

    test('without html', () => {
      expect(buildTokenTree(`

<p>Hello</p>
<iframe src="/something.html" />

      `)).toMatchSnapshot();
    });
  });

  test('<img>', () => {
    expect(buildTokenTree(`

![Alt](http://image.com "Title")

    `)).toMatchSnapshot();
  });

  test('<ins>', () => {
    expect(buildTokenTree(`

++Insert++

    `)).toMatchSnapshot();
  });

  test('<mark>', () => {
    expect(buildTokenTree(`

==Mark==

    `)).toMatchSnapshot();
  });

  test('<ol> <li>', () => {
    expect(buildTokenTree(`

1. Level 1 Item 1
2. Level 1 Item 2
3. Level 1 Item 3

    `)).toMatchSnapshot();
  });

  test('<p>', () => {
    expect(buildTokenTree(`

Paragraph

    `)).toMatchSnapshot();
  });

  test('<pre> <code>', () => {
    expect(buildTokenTree(`

\`\`\`
Code
\`\`\`

    `)).toMatchSnapshot();
  });

  test('<strong>', () => {
    expect(buildTokenTree(`

**Strong**

    `)).toMatchSnapshot();
  });

  test('<sub>', () => {
    expect(buildTokenTree(`

~Subscript~

    `)).toMatchSnapshot();
  });

  test('<sup>', () => {
    expect(buildTokenTree(`

^Superscript^

    `)).toMatchSnapshot();
  });

  test('<table> <thead> <tbody> <tr> <th> <td>', () => {
    expect(buildTokenTree(`

| Header 1 | Header 2 |
| -------- | -------- |
| Row 1 Cell 1 | Row 1 Cell 2 |
| Row 2 Cell 1 | Row 2 Cell 2 |

    `)).toMatchSnapshot();
  });

  test('<ul> <li>', () => {
    expect(buildTokenTree(`

* Level 1 Item 1
* Level 1 Item 2
  * Level 2 Item 1
    * Level 3 Item 1
  * Level 2 Item 2

    `)).toMatchSnapshot();
  });
});
