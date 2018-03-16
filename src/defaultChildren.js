export default {
  footnote_anchor: () => '↩',
  footnote_ref: ({ id }) => `[${id + 1}]`,
  htmlblock: ({ content }, { html }) => html ? null : content,
};
