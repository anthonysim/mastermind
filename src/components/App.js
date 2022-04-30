import { useState, useEffect } from 'react';
import axios from 'axios';
import Title from './Title';
import History from './History';
import '../stylings/App.scss';

function App() {
  const [state, setState] = useState({
    attempts: 0,
    data: null,
    guess: "",

  });

  useEffect(() => {
    const url = 'http://www.random.org/integers/?num=4&min=0&max=7&col=1&base=10&format=plain&rnd=new';
    axios.get(url)
      .then(res => setState({ ...state, data: res.data }))
      .catch(err => console.console.error(err));
    // eslint-disable-next-line
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setState({
      ...state,
      [name]: value,
    });
  };
  console.log(state);
  return (
    <div className="app">

      {/* title */}
      <Title attempts={state.attempts} />

      {/* current guess */}
      {state.data === null
        ? <h2 className="app__dashes">_ _ _ _</h2>
        : <h2 className="app__numbers">{state.data}</h2>}

      {/* user's guess */}
      <h2 className="app__question">Please guess a number:</h2>
      <form>
        <input
          value={state.guess || ""}
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
