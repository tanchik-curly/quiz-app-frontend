import React, {useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';


const Timer = ({timerMinutes, submitRef, status}) => {
    const [minutes, setMinutes] = useState(timerMinutes);
    const [seconds, setSeconds] = useState(0);
    const { id } = useParams();

    useEffect(() => {
        const startTimer = setInterval(() => {
            if(status){
                setMinutes(0);
                return;
            }
            if(seconds === 0 && minutes === 0){
                alert("Time is out!");
                clearInterval(startTimer);
                submitRef.current.click();
                return;
            }
            setSeconds(seconds - 1);

            if(seconds <= 0) {
                setMinutes(minutes - 1);
                setSeconds(59);
            }
        }, 1000);
        return () => clearInterval(startTimer);
    }, [timerMinutes, minutes, seconds, status]);
    
    return (
        <div className="container">
            <div>Time left:</div>
            <div className='timer-wrapper'>
                <div className='minutes-wrapper'>
                    <span>{minutes < 10 ? "0" + minutes : minutes}</span>
                </div>
                <div className='dot-wrapper'>:</div>
                <div className='seconds-wrapper'>
                    <span>{seconds < 10 ? "0" + seconds : seconds}</span>
                </div>
            </div>
        </div>
    );
};

export default Timer;