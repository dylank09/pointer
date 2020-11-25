import './PointsCalculator.css';
import { useEffect, useState } from 'react';
import CountUp from 'react-countup';

const PointsCalculator = () => {

    let defaultDays = 10;
    let defaultPeople = 7;
    let defaultEstPoints = 30;

    const[errors, setErrors] = useState('');
    const[days, setDays] = useState(defaultDays);
    const[absents, setAbsents] = useState(0);
    const[people, setPeople] = useState(defaultPeople);
    const[estPoints, setEstPoints] = useState(defaultEstPoints);
    const[points, setPoints] = useState(0);
    const[pts, setPts] = useState(true);

    const sprintDays = (e) => {
        let d = e.target.value;
        if (!d) {
            setDays(defaultDays);
            setErrors('');
        }
        else if(d < 1) {
            setErrors('Sprint days cannot be less than 1');
        }
        else {
            setErrors('');
            setDays(d);
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
        let p = e.target.value;
        if(!p) {
            setPeople(defaultPeople);
            setErrors('');
        }
        else if(p < 1) {
            setErrors('Not enough people');
        }
        else {
            setErrors('');
            setPeople(p);
        }
    }

    const estdPoints = (e) => {
        let ep = e.target.value;
        if(!ep) {
            setEstPoints(defaultEstPoints);
            setErrors('');
        }
        else if(ep < 1) {
            setErrors('Estimated points cannot be less than 1');
        }
        else {
            setErrors('');
            setEstPoints(ep);
        }
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        calculatePoints();
        setPts(false);
    }

    const calculatePoints = () => {
        let totalDays = people*days;
        let avail = (totalDays - absents)/totalDays;
        let nextSprint = avail * estPoints; 

        setPoints(nextSprint);
    }

    useEffect (() => {
        setPts(true);
    }, [])

    return (
        <div className="PointsCalculator">
            {errors ? <p className="errors">{errors}</p> : <span><br></br><br></br></span>}
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
                    placeholder="Average Sprint Velocity:"
                />

                <input type="submit" value="Calculate"/>
            </form>

            <p className="story-points" hidden={pts}>
                <CountUp decimals={2} preserveValue={true} end={points}/>
            </p>

        </div>
    );
}

export default PointsCalculator;
