import { useState, useEffect } from 'react';
import Title from './Title';
import History from './History';
import { fetchData } from '../utils/fetchData';
import { guessCheck } from '../utils/guessCheck';
import { messages } from '../utils/messages';
import '../stylings/App.scss';

function App() {
  const [state, setState] = useState({
    attempts: 1,
    data: [],
    guess: "",
    history: [],
  });

  useEffect(() => {
    fetchData().then(res => {
      console.log(res);
      setState({ ...state, data: res });
    });

    // eslint-disable-next-line
  }, []);

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

    if (state.attempts === 10) {
      alert('No more attempts, game over!');
      setState({
        attempts: 0,
        data: [],
        guess: "",
        history: []
      });
    }

    else if (code === 0 || code === 1) {
      alert(message);
      setState({ ...state, guess: "" });

    } else if (code === 2) {
      alert(message);
      setState({
        attempts: 0,
        data: [],
        guess: "",
        history: []
      });

    } else if (code === 3 || code === 4 || code === 5) {
      setState({
        ...state,
        attempts: state.attempts += 1,
        guess: "",
        history: state.history.concat(`${state.attempts - 1}: ${state.guess} ${message}`),
      });
    }
  }

  return (
    <div className="app">

      {/* title */}
      <Title attempts={state.attempts} />

      {/* current guess */}
      <h2 className="app__dashes">_ _ _ _</h2>
      {/* <h2 className="app__numbers">{state.data}</h2> */}

      {/* user's guess */}
      <h2 className="app__question">Please guess the number combination:</h2>
      <form>
        <input
          value={state.guess || ""}
          onChange={handleInputChange}
          name="guess"
          label="Guess"
        />
        <button
          onClick={submitHandler}
          className="app__submit"
          type="submit">
          Submit
        </button>
      </form>
      <br />
      <br />

      {/* guess history */}
      <History guessHistory={state.history} />
    </div>
  );
}

export default App;
