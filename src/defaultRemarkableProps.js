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
  level: false,
  lines: false,
  linkTarget: (target, type) => type === 'a' && ({
    key: 'target',
  }),
  order: false,
  params: false,
  src: true,
  tight: false,
  title: true,
  type: false,
};
