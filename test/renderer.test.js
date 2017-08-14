import assert from 'assert';
import React, { isValidElement } from 'react';
import { render, walkTree } from './utils';

function assertStructure(input, expected) {
  walkTree(input, expected, (input, expected) => {
    if (!input || typeof input === 'string') {
      assert.strictEqual(input, expected);
    } else {
      assert(isValidElement(input));
      assert.strictEqual(input.type, expected.type);
    }
  });
}

function assertProps(input, expected) {
  walkTree(input, expected, (input, expected) => {
    Object.keys((expected.props || {})).forEach((prop) => {
      assert.deepEqual(input.props[prop], expected.props[prop]);
    });
  });
}

function assertKey(input, expected) {
  walkTree(input, expected, (input, expected) => {
    assert.equal(input.key, expected.key);
  });
}

function CustomComponent(props){
  return <span {...props} />
}

describe('Renderer', () => {
  describe('components', () => {
    describe('<blockquote>', () => {
      const fixture = `

> Blockquote

      `;

      it('default', () => {
        assertStructure(render(fixture), [{
          type: 'blockquote',
          children: [{
            type: 'p',
            children: ['Blockquote'],
          }]
        }]);
      });

      it('custom', () => {
        assertStructure(render(fixture, {}, {
          components: {
            blockquote: CustomComponent,
          }
        }), [{
          type: CustomComponent,
          children: [{
            type: 'p',
            children: ['Blockquote'],
          }],
        }]);
      });
    });


    describe('<ul> <li>', () => {
      const fixture = `

* Level 1 Item 1
* Level 1 Item 2
  * Level 2 Item 1
    * Level 3 Item 1
  * Level 2 Item 2

      `;

      it('default', () => {
        assertStructure(render(fixture), [{
          type: 'ul',
          children: [{
            type: 'li',
            children: [{
              type: 'p',
              children: ['Level 1 Item 1'],
            }]
          }, {
            type: 'li',
            children: [{
              type: 'p',
              children: ['Level 1 Item 2', {
                type: 'ul',
                children: [{
                  type: 'li',
                  children: [{
                    type: 'p',
                    children: ['Level 2 Item 1', {
                      type: 'ul',
                      children: [{
                        type: 'li',
                        children: [{
                          type: 'p',
                          children: ['Level 3 Item 1'],
                        }],
                      }],
                    }],
                  }],
                }, {
                  type: 'li',
                  children: [{
                    type: 'p',
                    children: ['Level 2 Item 2']
                  }]
                }],
              }],
            }],
          }],
        }]);
      });

      it('custom', () => {
        assertStructure(render(fixture, {}, {
          components: {
            ul: CustomComponent,
            li: CustomComponent,
          }
        }), [{
          type: CustomComponent,
          children: [{
            type: CustomComponent,
            children: [{
              type: 'p',
              children: ['Level 1 Item 1'],
            }]
          }, {
            type: CustomComponent,
            children: [{
              type: 'p',
              children: ['Level 1 Item 2', {
                type: CustomComponent,
                children: [{
                  type: CustomComponent,
                  children: [{
                    type: 'p',
                    children: ['Level 2 Item 1', {
                      type: CustomComponent,
                      children: [{
                        type: CustomComponent,
                        children: [{
                          type: 'p',
                          children: ['Level 3 Item 1'],
                        }],
                      }],
                    }],
                  }],
                }, {
                  type: CustomComponent,
                  children: [{
                    type: 'p',
                    children: ['Level 2 Item 2']
                  }]
                }],
              }],
            }],
          }],
        }]);
      });
    });

    describe('<code>', () => {
      const fixture = `

\`Code\`

      `;

      it('default', () => {
        assertStructure(render(fixture), [{
          type: 'p',
          children: [{
            type: 'code',
            children: 'Code',
          }],
        }]);
      });

      it('custom', () => {
        assertStructure(render(fixture, {}, {
          components: {
            code: CustomComponent,
          },
        }), [{
          type: 'p',
          children: [{
            type: CustomComponent,
            children: 'Code',
          }],
        }]);
      });
    });

    describe('<del>', () => {
      const fixture = `

~~Deleted~~

      `;

      it('default', () => {
        assertStructure(render(fixture), [{
          type: 'p',
          children: [{
            type: 'del',
            children: ['Deleted'],
          }],
        }]);
      });

      it('custom', () => {
        assertStructure(render(fixture, {}, {
          components: {
            del: CustomComponent,
          },
        }), [{
          type: 'p',
          children: [{
            type: CustomComponent,
            children: ['Deleted'],
          }],
        }]);
      });
    });

    describe('<em>', () => {
      const fixture = `

*Italic*

      `;

      it('default', () => {
        assertStructure(render(fixture), [{
          type: 'p',
          children: [{
            type: 'em',
            children: ['Italic'],
          }],
        }]);
      });

      it('custom', () => {
        assertStructure(render(fixture, {}, {
          components: {
            em: CustomComponent,
          },
        }), [{
          type: 'p',
          children: [{
            type: CustomComponent,
            children: ['Italic'],
          }],
        }]);
      });
    });

    describe('<pre> <code>', () => {
      const fixture = `

\`\`\`
Code
\`\`\`

      `;

      it('default', () => {
        assertStructure(render(fixture), [{
          type: 'pre',
          children: [{
            type: 'code',
            children: 'Code',
          }],
        }]);
      });

      it('custom', () => {
        assertStructure(render(fixture, {}, {
          components: {
            pre: CustomComponent,
          },
        }), [{
          type: CustomComponent,
          children: [{
            type: 'code',
            children: 'Code',
          }],
        }]);
      });
    });

    describe('<br>', () => {
      const fixture = `

New\nLine

      `;

      describe('with breaks true', () => {
        it('default', () => {
          assertStructure(render(fixture, { breaks: true }), [{
            type: 'p',
            children: ['New', {
              type: 'br',
            }, 'Line'],
          }]);
        });

        it('custom', () => {
          assertStructure(render(fixture, { breaks: true }, {
            components: {
              br: CustomComponent,
            },
          }), [{
            type: 'p',
            children: ['New', {
              type: CustomComponent,
            }, 'Line'],
          }]);
        });
      });

      describe('with breaks false', () => {
        it('default', () => {
          assertStructure(render(fixture, { breaks: false }, {}), [{
            type: 'p',
            children: ['New', undefined, 'Line'],
          }]);
        });
      });
    });

    describe('<h1>', () => {
      const fixture = `

# Heading 1

      `;

      it('default', () => {
        assertStructure(render(fixture), [{
          type: 'h1',
          children: ['Heading 1'],
        }]);
      });

      it('custom', () => {
        assertStructure(render(fixture, {}, {
          components: {
            h1: CustomComponent,
          },
        }), [{
          type: CustomComponent,
          children: ['Heading 1'],
        }]);
      });
    });

    describe('<h2>', () => {
      const fixture = `

## Heading 2

      `;

      it('default', () => {
        assertStructure(render(fixture), [{
          type: 'h2',
          children: ['Heading 2'],
        }]);
      });

      it('custom', () => {
        assertStructure(render(fixture, {}, {
          components: {
            h2: CustomComponent,
          },
        }), [{
          type: CustomComponent,
          children: ['Heading 2'],
        }]);
      });
    });

    describe('<h3>', () => {
      const fixture = `

### Heading 3

      `;

      it('default', () => {
        assertStructure(render(fixture), [{
          type: 'h3',
          children: ['Heading 3'],
        }]);
      });

      it('custom', () => {
        assertStructure(render(fixture, {}, {
          components: {
            h3: CustomComponent,
          },
        }), [{
          type: CustomComponent,
          children: ['Heading 3'],
        }]);
      });
    });

    describe('<h4>', () => {
      const fixture = `

#### Heading 4

      `;

      it('default', () => {
        assertStructure(render(fixture), [{
          type: 'h4',
          children: ['Heading 4'],
        }]);
      });

      it('custom', () => {
        assertStructure(render(fixture, {}, {
          components: {
            h4: CustomComponent,
          },
        }), [{
          type: CustomComponent,
          children: ['Heading 4'],
        }]);
      });
    });

    describe('<h5>', () => {
      const fixture = `

##### Heading 5

      `;

      it('default', () => {
        assertStructure(render(fixture), [{
          type: 'h5',
          children: ['Heading 5'],
        }]);
      });

      it('custom', () => {
        assertStructure(render(fixture, {}, {
          components: {
            h5: CustomComponent,
          },
        }), [{
          type: CustomComponent,
          children: ['Heading 5'],
        }]);
      });
    });

    describe('<h6>', () => {
      const fixture = `

###### Heading 6

      `;

      it('default', () => {
        assertStructure(render(fixture), [{
          type: 'h6',
          children: ['Heading 6'],
        }]);
      });

      it('custom', () => {
        assertStructure(render(fixture, {}, {
          components: {
            h6: CustomComponent,
          },
        }), [{
          type: CustomComponent,
          children: ['Heading 6'],
        }]);
      });
    });

    describe('<hr>', () => {
      const fixture = `

___

      `;

      it('default', () => {
        assertStructure(render(fixture), [{
          type: 'hr',
        }]);
      });

      it('custom', () => {
        assertStructure(render(fixture, {}, {
          components: {
            hr: CustomComponent,
          },
        }), [{
          type: CustomComponent,
        }]);
      });
    });

    describe('<img>', () => {
      const fixture = `

![Alt](http://image.com "Title")

      `;

      it('default', () => {
        assertStructure(render(fixture), [{
          type: 'p',
          children: [{
            type: 'img',
          }],
        }]);
      });

      it('custom', () => {
        assertStructure(render(fixture, {}, {
          components: {
            img: CustomComponent,
          },
        }), [{
          type: 'p',
          children: [{
            type: CustomComponent,
          }],
        }]);
      });
    });

    describe('<ins>', () => {
      const fixture = `

++Insert++

      `;

      it('default', () => {
        assertStructure(render(fixture), [{
          type: 'p',
          children: [{
            type: 'ins',
            children: ['Insert'],
          }],
        }]);
      });

      it('custom', () => {
        assertStructure(render(fixture, {}, {
          components: {
            ins: CustomComponent,
          },
        }), [{
          type: 'p',
          children: [{
            type: CustomComponent,
            children: ['Insert'],
          }],
        }]);
      });
    });

    describe('<a>', () => {
      const fixture = `

[Link](http://link.com "Title")

      `;

      it('default', () => {
        assertStructure(render(fixture), [{
          type: 'p',
          children: [{
            type: 'a',
            children: ['Link'],
          }],
        }]);
      });

      it('custom', () => {
        assertStructure(render(fixture, {}, {
          components: {
            a: CustomComponent,
          },
        }), [{
          type: 'p',
          children: [{
            type: CustomComponent,
            children: ['Link'],
          }],
        }]);
      });
    });

    describe('<mark>', () => {
      const fixture = `

==Mark==

      `;

      it('default', () => {
        assertStructure(render(fixture), [{
          type: 'p',
          children: [{
            type: 'mark',
            children: ['Mark'],
          }],
        }]);
      });

      it('custom', () => {
        assertStructure(render(fixture, {}, {
          components: {
            mark: CustomComponent,
          },
        }), [{
          type: 'p',
          children: [{
            type: CustomComponent,
            children: ['Mark'],
          }],
        }]);
      });
    });

    describe('<ol> <li>', () => {
      const fixture = `

1. Level 1 Item 1
2. Level 1 Item 2
3. Level 1 Item 3

      `;

      it('default', () => {
        assertStructure(render(fixture), [{
          type: 'ol',
          children: [{
            type: 'li',
            children: [{
              type: 'p',
              children: ['Level 1 Item 1'],
            }]
          }, {
            type: 'li',
            children: [{
              type: 'p',
              children: ['Level 1 Item 2'],
            }]
          }, {
            type: 'li',
            children: [{
              type: 'p',
              children: ['Level 1 Item 3'],
            }]
          }],
        }]);
      });

      it('custom', () => {
        assertStructure(render(fixture, {}, {
          components: {
            ol: CustomComponent,
            li: CustomComponent,
          },
        }), [{
          type: CustomComponent,
          children: [{
            type: CustomComponent,
            children: [{
              type: 'p',
              children: ['Level 1 Item 1'],
            }]
          }, {
            type: CustomComponent,
            children: [{
              type: 'p',
              children: ['Level 1 Item 2'],
            }]
          }, {
            type: CustomComponent,
            children: [{
              type: 'p',
              children: ['Level 1 Item 3'],
            }]
          }],
        }]);
      });
    });

    describe('<p>', () => {
      const fixture = `

Paragraph

      `;

      it('default', () => {
        assertStructure(render(fixture), [{
          type: 'p',
          children: ['Paragraph'],
        }]);
      });

      it('custom', () => {
        assertStructure(render(fixture, {}, {
          components: {
            p: CustomComponent,
          },
        }), [{
          type: CustomComponent,
          children: ['Paragraph'],
        }]);
      });
    });

    describe('<strong>', () => {
      const fixture = `

**Strong**

      `;

      it('default', () => {
        assertStructure(render(fixture), [{
          type: 'p',
          children: [{
            type: 'strong',
            children: ['Strong'],
          }],
        }]);
      });

      it('custom', () => {
        assertStructure(render(fixture, {}, {
          components: {
            strong: CustomComponent,
          },
        }), [{
          type: 'p',
          children: [{
            type: CustomComponent,
            children: ['Strong'],
          }],
        }]);
      });
    });

    describe('<sub>', () => {
      const fixture = `

~Subscript~

      `;

      it('default', () => {
        assertStructure(render(fixture), [{
          type: 'p',
          children: [{
            type: 'sub',
            children: 'Subscript',
          }],
        }]);
      });

      it('custom', () => {
        assertStructure(render(fixture, {}, {
          components: {
            sub: CustomComponent,
          },
        }), [{
          type: 'p',
          children: [{
            type: CustomComponent,
            children: 'Subscript',
          }],
        }]);
      });
    });

    describe('<sup>', () => {
      const fixture = `

^Superscript^

      `;

      it('default', () => {
        assertStructure(render(fixture), [{
          type: 'p',
          children: [{
            type: 'sup',
            children: 'Superscript',
          }],
        }]);
      });

      it('custom', () => {
        assertStructure(render(fixture, {}, {
          components: {
            sup: CustomComponent,
          },
        }), [{
          type: 'p',
          children: [{
            type: CustomComponent,
            children: 'Superscript',
          }],
        }]);
      });
    });

    describe('<table> <thead> <tbody> <tr> <th> <td>', () => {
      const fixture = `

| Header 1 | Header 2 |
| -------- | -------- |
| Row 1 Cell 1 | Row 1 Cell 2 |
| Row 2 Cell 1 | Row 2 Cell 2 |

      `;

      it('default', () => {
        assertStructure(render(fixture), [{
          type: 'table',
          children: [{
            type: 'thead',
            children: [{
              type: 'tr',
              children: [{
                type: 'th',
                children: ['Header 1'],
              }, {
                type: 'th',
                children: ['Header 2'],
              }],
            }],
          }, {
            type: 'tbody',
            children: [{
              type: 'tr',
              children: [{
                type: 'td',
                children: ['Row 1 Cell 1'],
              }, {
                type: 'td',
                children: ['Row 1 Cell 2'],
              }],
            }, {
              type: 'tr',
              children: [{
                type: 'td',
                children: ['Row 2 Cell 1'],
              }, {
                type: 'td',
                children: ['Row 2 Cell 2'],
              }],
            }],
          }],
        }]);
      });

      it('custom', () => {
        assertStructure(render(fixture, {}, {
          components: {
            table: CustomComponent,
            thead: CustomComponent,
            tbody: CustomComponent,
            tr: CustomComponent,
            th: CustomComponent,
            td: CustomComponent,
          },
        }), [{
          type: CustomComponent,
          children: [{
            type: CustomComponent,
            children: [{
              type: CustomComponent,
              children: [{
                type: CustomComponent,
                children: ['Header 1'],
              }, {
                type: CustomComponent,
                children: ['Header 2'],
              }],
            }],
          }, {
            type: CustomComponent,
            children: [{
              type: CustomComponent,
              children: [{
                type: CustomComponent,
                children: ['Row 1 Cell 1'],
              }, {
                type: CustomComponent,
                children: ['Row 1 Cell 2'],
              }],
            }, {
              type: CustomComponent,
              children: [{
                type: CustomComponent,
                children: ['Row 2 Cell 1'],
              }, {
                type: CustomComponent,
                children: ['Row 2 Cell 2'],
              }],
            }],
          }],
        }]);
      });
    });
  });

  describe('tokens', () => {
    it('custom', () => {
      assertStructure(render('% Lorem', {}, {
        components: {
          video: CustomComponent,
        },
        tokens: {
          video_token: 'video',
        },
      }), [{
        type: 'p',
        children: [{
          type: CustomComponent,
        }],
      }]);
    });
  });

  describe('config', () => {
    describe('properties', () => {
      describe('defaults', () => {

        it('[align]', () => {
          assertProps(render(`

| Header 1 | Header 2 | Header 3 |
| :-------- | ---------| --------: |

          `), [{
            children: [{
              children: [{
                children: [{
                  props: { style: { textAlign: 'left' } },
                  children: [''],
                }, {
                  children: [''],
                }, {
                  props: { style: { textAlign: 'right' } },
                  children: [''],
                }],
              }, { }],
            }],
          }]);
        });

        it('[alt]', () => {
          assertProps(render(`

![Alt]()

          `), [{
            children: [{
              props: {
                alt: 'Alt',
              },
            }],
          }]);
        });

        it('[block]', () => {
          assertProps(render(`

\`Code\`

          `), [{
            children: [{
              props: {
                block: undefined,
              },
            }],
          }]);
        });

        it('[content]', () => {
          assertProps(render(`

\`Code\`

          `), [{
            children: [{
              props: {
                content: undefined,
              },
            }],
          }]);
        });

        it('[hLevel]', () => {
          assertProps(render(`

# Heading 1

          `), [{
            children: [''],
            props: {
              hLevel: undefined,
            },
          }]);
        });

        it('[href]', () => {
          assertProps(render(`

[](http://google.com)

          `), [{
            children: [{
              props: {
                href: 'http://google.com',
              },
            }],
          }]);
        });

        it('[level]', () => {
          assertProps(render(`

Paragraph

          `), [{
            children: [''],
            props: {
              level: undefined,
            },
          }]);
        });

        it('[lines]', () => {
          assertProps(render(`

Paragraph

          `), [{
            children: [''],
            props: {
              lines: undefined,
            },
          }]);
        });

        it('[order]', () => {
          assertProps(render(`

1. List item 1

          `), [{
            props: {
              order: undefined,
            },
            children: [{
              children: [{
                children: [''],
              }],
            }],
          }]);
        });

        it('[params]', () => {
           assertProps(render(`

\`\`\`js
Code
\`\`\`

          `), [{
            children: [{}],
            props: {
              params: undefined,
            },
          }]);
        });

        it('[src]', () => {
          assertProps(render(`

![](http://google.com)

          `), [{
            children: [{
              props: {
                src: 'http://google.com',
              },
            }],
          }]);
        });

        it('[tight]', () => {
          assertProps(render(`

1. List item 1

          `), [{
            children: [{
              children: [{
                children: [''],
                props: {
                  tight: undefined,
                },
              }],
            }],
          }]);
        });

        it('[title]', () => {
          assertProps(render(`

![](http://google.com "Title")

          `), [{
            children: [{
              props: {
                title: 'Title',
              },
            }],
          }]);
        });

        it('[type]', () => {
          assertProps(render(`

# Heading 1

          `), [{
            children: [''],
            props: {
              type: undefined,
            },
          }]);
        });
      });

      describe('custom', () => {
        describe('function', () => {
          it('key', () => {
            assertProps(render(`

![](http://google.com "Title")

            `, {}, {
              remarkableProps: {
                title() {
                  return {
                    key: 'newTitle'
                  };
                }
              },
            }), [{
              children: [{
                props: {
                  newTitle: 'Title',
                  title: undefined,
                },
              }],
            }]);
          });

          it('value', () => {
            assertProps(render(`

![](http://google.com "Title")

            `, {}, {
              remarkableProps: {
                title(title) {
                  return {
                    value: title.toUpperCase(),
                  };
                }
              },
            }), [{
              children: [{
                props: {
                  title: 'TITLE',
                },
              }],
            }]);
          });
        });

        it('string', () => {
          assertProps(render(`

![](http://google.com "Title")

          `, {}, {
            remarkableProps: {
              title: 'newTitle'
            },
          }), [{
            children: [{
              props: {
                newTitle: 'Title',
                title: undefined,
              },
            }],
          }]);
        });

        describe('boolean', () => {
          it('true', () => {
            assertProps(render(`

![](http://google.com "Title")

            `, {}, {
              remarkableProps: {
                type: true
              },
            }), [{
              children: [{
                props: {
                  type: 'image',
                },
              }],
            }]);
          });

          it('false', () => {
            assertProps(render(`

![](http://google.com "Title")

            `, {}, {
              remarkableProps: {
                title: false
              },
            }), [{
              children: [{
                props: {
                  title: undefined,
                },
              }],
            }]);
          });
        });
      });
    });

    describe('keyGen', () => {
      it('default', () => {
        assertKey(render(`

Paragraph

        `), [{
          key: 0,
          children: [''],
        }]);
      });

      it('custom', () => {
        assertKey(render(`

Paragraph

        `, {}, {
          keyGen(token, index) {
            return index + 10;
          }
        }), [{
          key: 10,
          children: [''],
        }]);
      });
    });
  });
});

