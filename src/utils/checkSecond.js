export const checkSecond = (seconds) => {
  if (seconds < 10 && seconds >= 0) {
    seconds = "0" + seconds;
  };

  if (seconds < 0) {
    seconds = 59;
  };

  return seconds;
}


