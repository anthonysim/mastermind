import '../stylings/title.scss';

function Title({ attempts }) {


  return (
    <div className="title">
      <h1 className="title__name">Mastermind Game</h1>
      <h2 className="title__attempts">Current Attempt: {attempts}</h2>
    </div>
  );
}

export default Title;
