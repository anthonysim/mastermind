import { useState, useRef } from 'react';
import Modal from './Modal';
import Title from './Title';
import History from './History';
import Shapes from './Shapes';
import { fetchData } from '../utils/fetchData';
import { guessCheck } from '../utils/guessCheck';
import { messages } from '../utils/messages';
import { shapesGenerator } from '../utils/shapesGenerator';
import { checkSecond } from '../utils/checkSecond';
import { stopTimer } from '../utils/stopTimer';
import '../stylings/App.scss';

function App() {
  const inputEl = useRef();

  const [state, setState] = useState({
    attempts: 10,
    data: [],
    guess: '',
    history: [],
    difficultyLevel: '',
    shapes: [],
    time: '01:12',
    isCountdownOver: false,
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
        isCountdownOver: false,
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
        time: '1:12',
        isCountdownOver: false,
      });

      stopTimer();
      openModal();
      inputEl.current.classList.remove('background');

    } else if (code === 3 || code === 4 || code === 5) {
      setState({
        ...state,
        attempts: state.attempts -= 1,
        guess: '',
        history: state.history.concat(`** ${state.guess} ** ${message}`),
      });
    }
  }

  // user selects difficulty level
  const difficultyHander = (e) => {
    const { name } = e.target;
    let max = 4;

    if (name === "medium") {
      max = 7;
    } else if (name === "hard") {
      max = 10;
    }

    fetchData(max).then(res => {
      // for the sake of a demo, the answer is logged in the console.
      console.log(res);
      setState({ ...state, data: res, difficultyLevel: name, guess: '', shapes: shapesGenerator(max), isCountdownOver: false });
    });

    startTimer();
  }

  // countdown timer
  const startTimer = () => {
    inputEl.current.classList.add('background');
    let presentTime = inputEl.current.innerHTML;


    let timeArray = presentTime.split(/[:]+/);
    let m = timeArray[0];
    let s = checkSecond(timeArray[1] - 1);

    if (s === 59) {
      m = m - 1;
    }

    // game over if time runs out
    if (m < 0) {
      setState({
        ...state,
        attempts: 10,
        data: [],
        history: [],
        difficultyLevel: '',
        time: '1:12',
        isCountdownOver: true,
      });

      let timer = document.querySelector('.timer');
      timer.classList.remove('background');
      stopTimer();
      openModal();
      return;
    }

    inputEl.current.innerHTML = m + ":" + s;
    setTimeout(startTimer, 1000);
  }

  // JS that's returned
  return (
    <div className="app">

      {/* time */}
      <div ref={inputEl} className="timer">{state.time}</div>

      {/* Modal */}
      <Modal correctGuess={state.guess} isCountdownOver={state.isCountdownOver} />

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
        <p>{state.data.length} Number Combination</p>

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
