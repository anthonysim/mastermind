export const messages = (code) => {
  switch (code) {
    case 0:
      return 'Not a number, please type in numbers!';

    case 1:
      return 'Guess is either too short or too long!';

    case 2:
      return 'Guess matches data!';

    case 3:
      return 'The player had guessed a correct number and its correct location!';

    case 4:
      return 'The player had guess a correct number!';

    case 5:
      return 'The player\'s guess was incorrect!';

    default:
      return 'Something went wrong!';
  }
}