export default Object.assign || ((target, ...args) => {
  for (let i = 1; i < args.length; i++) {
    const source = args[i];

    for (const key in source) {
      if (Object.prototype.hasOwnProperty.call(source, key)) {
        target[key] = source[key];
      }
    }
  }

  return target;
});
