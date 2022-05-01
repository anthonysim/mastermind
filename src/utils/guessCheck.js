export const guessCheck = (guess, data) => {
  if (isNaN(Number(guess))) return 0;
  if (guess.length !== data.length) return 1;

  if (guess === data) return 2;

  for (let i = 0; i < guess.length; i++) {
    if (data.includes(guess[i]) && data[i] === guess[i]) {
      return 3;
    }
  }

  for (let i = 0; i < guess.length; i++) {
    if (data.split('').includes(guess[i])) {
      return 4;
    }
  }
}
