// Credit to rsp on StackOverflow under CC BY-SA 4.0: https://stackoverflow.com/a/43053803
const cartesian =
  (...a) => a.reduce((a, b) => a.flatMap(d => b.map(e => [d, e].flat())));

export { cartesian };
