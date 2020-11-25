import './Pointer.css';
import PointsCalculator from './PointsCalculator';

function Pointer() {
  return (
    <div className="Pointer">
      <h1>Pointer</h1>
      <h4>The one stop shop for estimating the story points for upcoming sprints.</h4>

      <PointsCalculator />
      

      <footer>A Creation by Dylan Kearney</footer>
    </div>
  );
}

export default Pointer;
