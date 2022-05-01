import '../stylings/shapes.scss';

function Shapes({ shapes }) {

  return (
    <div className="shapes">
      {shapes?.map((shape, i) => <div key={i} className={`shapes__${shape}`}></div>)}
    </div>
  );
}

export default Shapes;
