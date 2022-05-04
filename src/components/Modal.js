import '../stylings/modal.scss';

const Modal = ({ correctGuess, isCountdownOver }) => {
  const closeModalHandler = () => {
    const modal = document.querySelector(".modal__dialog");
    modal.removeAttribute("open");
    window.location.reload(false);
  }
  console.log(correctGuess);
  return (
    <div className="modal">
      {!isCountdownOver
        ? <dialog
          className="modal__dialog">
          <h1>Congratulations, you won!</h1>
          <button className="modal__close" onClick={closeModalHandler}>New Game</button>
        </dialog>

        : <dialog
          className="modal__dialog">
          <h1>Game Over!</h1>
          <p className="modal__message" >You lost!</p>
          <button className="modal__close" onClick={closeModalHandler}>New Game</button>
        </dialog>}
    </div>
  );
}

export default Modal;