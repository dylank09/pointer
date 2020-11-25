import './PointsCalculator.css';
import { useEffect, useState } from 'react';

const PointsCalculator = () => {

    const[errors, setErrors] = useState('');
    const[days, setDays] = useState(10);
    const[absents, setAbsents] = useState(0);
    const[people, setPeople] = useState(7);
    const[estPoints, setEstPoints] = useState(1);
    const[points, setPoints] = useState(0);
    const[pts, setPts] = useState(true);

    const sprintDays = (e) => {
        if(e.target.value < 1) {
            setErrors('Sprint days cannot be less than 1');
        }
        else {
            setErrors('');
            setDays(e.target.value);
        }
    }

    const absentDays = (e) => {
        let abs = e.target.value;
        if(abs >= days*people) {
            setErrors('Too many absent days');
        }
        else if (abs < 0) {
            setErrors('Absent days cannot be negative');
        }
        else {
            setErrors('');
            setAbsents(abs);
        }
    }

    const numPeople = (e) => {
        if(e.target.value < 1) {
            setErrors('Not enough people');
        }
        else {
            setErrors('');
            setPeople(e.target.value);
        }
    }

    const estdPoints = (e) => {
        if(e.target.value < 1) {
            setErrors('Estimated points cannot be less than 1');
        }
        else {
            setErrors('');
            setEstPoints(e.target.value);
        }
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        calculatePoints();
        setPts(false);
    }

    const calculatePoints = () => {
        let temp = ((days*people)-absents)/100 * estPoints 
        setPoints(Number(temp.toFixed(2)));
    }

    useEffect (() => {
        setPts(true);
    }, [])

    return (
        <div className="PointsCalculator">
            {errors ? <p className="errors">{errors}</p> : null}
            <form onSubmit={handleSubmit}>
                <input type="number" 
                    onChange={sprintDays}
                    placeholder="Number of days in sprint: (default = 10) "
                    />

                <input type="number" 
                    onChange={numPeople}
                    placeholder="Number of people: (default = 7) "
                    />

                <input type="number" 
                    onChange={absentDays}
                    placeholder="Number of days absent:"
                    />

                <input type="number" 
                    onChange={estdPoints}
                    placeholder="Points achievable with full capacity:"
                    />

                <input type="submit" value="Calculate"/>
            </form>

            <p className="story-points" hidden={pts}>{points}</p>
        </div>
    );
}

export default PointsCalculator;
