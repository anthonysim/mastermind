import { useState, useEffect } from 'react';
import '../stylings/App.scss';

function App() {
  const [state, setState] = useState({
    attempt: 0,
    numberCombo: null,
  });

  useEffect(() => {


  }, []);

  return (
    <div className="app">

      <h1 className="app__name">Mastermind Game</h1>
      <h2 className="app__attempts">Total Attempts: {state.attempt}</h2>

      {state.numberCombo === null
        ? <h2 className="app__dashes">_ _ _ _</h2>
        : <h2 className="app_numbers">{state.numberCombo}</h2>}

      <h2 className="app__question">Please guess a number:</h2>
      <form>
        <input type="text" name="name" />
        <button className="app__submit" type="submit"> Submit </button>
      </form>


    </div>
  );
}

export default App;
