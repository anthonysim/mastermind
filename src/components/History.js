import '../stylings/history.scss';

function History({ guessHistory }) {

  return (
    <div className="history">
      <h2 className="history__title">Guess History</h2>
      <ul className="history__guesses" >
        {guessHistory?.map((guess, i) => <li key={i}>{guess}</li>)}
      </ul>
    </div>
  );
}

export default History;
