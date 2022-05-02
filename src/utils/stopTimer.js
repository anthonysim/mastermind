// clears all setTimeouts that are active in the "window"
export const stopTimer = () => {
  let id = window.setTimeout(function () { }, 0);
  while (id--) {
    window.clearTimeout(id);
  }
}