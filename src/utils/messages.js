export const messages = (code) => {
  switch (code) {
    case 0:
      return 'Guess is either too short or too long';

    case 1:
      return 'Please type in numbers';

    case 2:
      return 'Guess matches data';

    case 3:
      return 'The player had guessed a correct number and its correct location';

    case 4:
      return 'The player had guess a correct number';

    default:
      return 'Something went wrong';
  }
}