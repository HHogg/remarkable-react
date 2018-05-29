export default {
  align: (align) => align ? ({
    key: 'style',
    value: { textAlign: align },
  }) : false,
  alt: true,
  block: false,
  content: (content, type) => type === 'html' && ({
    key: 'dangerouslySetInnerHTML',
    value: { __html: content },
  }),
  hLevel: false,
  href: true,
  id: (id, type, token) => {
    switch (token.type) {
      case 'footnote_anchor':
        return {
          key: 'href',
          value: `fn${id}:${token.subId || 0}`,
        };
      case 'footnote_open':
        return { value: `#fn${id}` };
      case 'footnote_ref':
        return type === 'a' ? ({
          key: 'href',
          value: `#fn${id}`,
        }) : ({
          value: `fn${id}:${token.subId || 0}`,
        });
    }
  },
  level: false,
  lines: false,
  linkTarget: (target, type) => type === 'a' && ({
    key: 'target',
  }),
  order: false,
  params: false,
  src: true,
  subId: false,
  tight: false,
  title: true,
  type: false,
};
