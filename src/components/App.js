import { useState } from 'react';
import Modal from './Modal';
import Title from './Title';
import History from './History';
import Shapes from './Shapes';
import { fetchData } from '../utils/fetchData';
import { guessCheck } from '../utils/guessCheck';
import { messages } from '../utils/messages';
import { shapesGenerator } from '../utils/shapesGenerator';
import '../stylings/App.scss';

function App() {
  const [state, setState] = useState({
    attempts: 10,
    data: [],
    guess: '',
    history: [],
    difficultyLevel: '',
    shapes: [],
  });

  // opens modal
  const openModal = () => {
    const modal = document.querySelector(".modal__dialog");
    modal.setAttribute("open", "");
  }

  // gets user's input
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setState({
      ...state,
      [name]: value,
    });
  };

  // user's submissions
  const submitHandler = (e) => {
    e.preventDefault();

    const code = guessCheck(state.guess, state.data.join(''));
    const message = messages(code);

    if (state.attempts === 1) {
      alert('No more attempts, game over!');
      setState({
        attempts: 10,
        data: [],
        guess: '',
        history: [],
        difficultyLevel: '',
      });
    }

    else if (code === 0 || code === 1) {
      alert(message);
      setState({ ...state, guess: '' });

    } else if (code === 2) {
      setState({
        ...state,
        attempts: 10,
        data: [],
        history: [],
        difficultyLevel: '',
      });

      openModal();

    } else if (code === 3 || code === 4 || code === 5) {
      alert(message);
      setState({
        ...state,
        attempts: state.attempts -= 1,
        guess: '',
        history: state.history.concat(`** ${state.guess} ** ${message}`),
      });
    }
  }

  const difficultyHander = (e) => {
    const { name } = e.target;
    let max = 4;

    if (name === "medium") {
      max = 7;
    } else if (name === "hard") {
      max = 10;
    }

    fetchData(max).then(res => {
      console.log(res);
      setState({ ...state, data: res, difficultyLevel: name, guess: '', shapes: shapesGenerator(max) });
    });
  }

  // JS that's returned
  return (
    <div className="app">

      {/* Modal */}
      <Modal correctGuess={state.guess} />

      {/* welcome */}
      {state.difficultyLevel.length === 0 && <div className="welcome">
        <h1>Welcome to the Mastermind Game!</h1>
        <br />
        <h2 className="welcome__difficulty">Please choose a difficulty level:</h2>

        <div className="welcome__buttons">
          <button onClick={difficultyHander} name="easy" className="welcome__button">EASY</button>
          <button onClick={difficultyHander} name="medium" className="welcome__button">MEDIUM</button>
          <button onClick={difficultyHander} name="hard" className="welcome__button">HARD</button>
        </div>
      </div>}

      {/* title */}
      {state.difficultyLevel.length !== 0 && <div className="title">
        <Title attempts={state.attempts} />

        {/* shapes representing total numbers in combo */}
        <Shapes shapes={state.shapes} />

        {/* user's guess */}
        <h2 className="title__question">Please guess the number combination:</h2>
        <form>
          <input
            value={state.guess || ""}
            onChange={handleInputChange}
            name="guess"
            label="Guess"
          />
          <button
            onClick={submitHandler}
            className="title__submit"
            type="submit">
            Submit
          </button>
        </form>
        <br />
        <br />

        {/* guess history */}
        <History guessHistory={state.history} />
      </div>}
    </div>
  );
}

export default App;
