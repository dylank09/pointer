import './PointsCalculator.css';
import { useEffect, useState } from 'react';

const PointsCalculator = () => {

    const[errors, setErrors] = useState('');
    const[days, setDays] = useState(10);
    const[people, setPeople] = useState(5);

    const sprintDays = (e) => {
        if(e.target > 0) {
            setDays(e.target);
        }
        else {
            setErrors('Sprint days cannot be less than 1');
        }
    }

    const absentDays = (e) => {
        let aDays = e.target;
        if(aDays >= days) {
            setErrors('Too many absent days');
        }
        else {
            setDays(days - aDays);
        }
    }

    const numPeople = (e) => {
        if(e.target < 1) {
            setErrors('Not enough people');
        }
        else {
            setPeople(e.target);
        }
    }

    const handleSubmit = (e) => {
        e.preventDefault();
    }

    useEffect (() => {

    }, [])

    return (
        <div className="PointsCalculator">
            <form>
                <input type="number" 
                    onChange={sprintDays}
                    placeholder="Number of days in sprint: (default = 10) "
                    name="sprint days"/>

                <input type="number" 
                    onChange={numPeople}
                    placeholder="Number of people:"
                    name="number of staff"/>

                <input type="number" 
                    onChange={absentDays}
                    placeholder="Number of days absent:"
                    name="absent days"/>

                <input type="submit"
                    onSubmit={handleSubmit}/>
            </form>


        </div>
    );
}

export default PointsCalculator;
