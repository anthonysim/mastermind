import '../stylings/modal.scss';

const Modal = ({ correctGuess }) => {
  const closeModalHandler = () => {
    const modal = document.querySelector(".modal__dialog");
    modal.removeAttribute("open");
  }

  return (
    <div className="modal">
      <dialog
        className="modal__dialog">
        <h1>Congratulations, you won!</h1>
        <p className="modal__message" >The correct number combination is: {correctGuess}</p>
        <button className="modal__close" onClick={closeModalHandler}>New Game</button>
      </dialog>
    </div>
  );
}

export default Modal;