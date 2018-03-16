export default {
  htmlblock: ({ content }, { html }) => html ? null : content,
};
