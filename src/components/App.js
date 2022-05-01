import { useState, useEffect } from 'react';
import axios from 'axios';
import Title from './Title';
import History from './History';
import '../stylings/App.scss';

function App() {
  const [state, setState] = useState({
    attempts: 0,
    data: [],
    guess: "",
    history: [
      'The player had guess a correct number',
      'The player had guessed a correct number and its correct location',
      'The player’s guess was incorrect'
    ],
  });

  useEffect(() => {
    const url = 'http://www.random.org/integers/?num=4&min=0&max=7&col=1&base=10&format=plain&rnd=new';

    const fetchData = async () => {
      const fetchedNums = await axios.get(url);
      const nums = fetchedNums.data.match(/[0-9]/gi);

      setState({ ...state, data: nums });
    }

    fetchData()
      .catch(console.error);

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
    console.log('clicked');
  }
  console.log(state.data);
  return (
    <div className="app">

      {/* title */}
      <Title attempts={state.attempts} />

      {/* current guess */}
      {state.data.length === 0
        ? <h2 className="app__dashes">_ _ _ _</h2>
        : <h2 className="app__numbers">{state.data}</h2>}

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
