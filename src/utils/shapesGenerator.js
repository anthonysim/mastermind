export const shapesGenerator = (guessLength) => {
  const shapes = ['circle', 'square', 'triangle'];
  let totalShapes = [];

  while (guessLength > 0) {
    let idx = Math.floor(Math.random() * 3);
    totalShapes.push(shapes[idx]);
    guessLength -= 1;
  }
  return totalShapes;
}