import { useState, useEffect } from 'react';
import Title from './Title';
import History from './History';
import '../stylings/App.scss';

function App() {
  const [state, setState] = useState({
    attempts: 0,
    numberCombo: null,
    guess: "",
  });

  useEffect(() => {
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setState({
      ...state,
      [name]: value,
    });
  };

  return (
    <div className="app">

      {/* title */}
      <Title attempts={state.attempts} />

      {/* current guess */}
      {state.numberCombo === null
        ? <h2 className="app__dashes">_ _ _ _</h2>
        : <h2 className="app__numbers">{state.numberCombo}</h2>}

      {/* user's guess */}
      <h2 className="app__question">Please guess a number:</h2>
      <form>
        <input
          value={state.guess}
          onChange={handleInputChange}
          name="guess"
          label="Guess"
        />
        <button className="app__submit" type="submit"> Submit </button>
      </form>

      {/* guess history */}
      <History />

    </div>
  );
}

export default App;
