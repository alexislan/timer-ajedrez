import React, { useRef, useState } from "react";
import './timer-div.css';

//usar el handleclick en el button
export const TimerDiv = ({hour, minute, second, turn, handleClick}) =>{
    const [hours, setHours] = useState(hour);
    const [minutes, setMinutes] = useState(minute);
    const [seconds, setSeconds] = useState(second);
    const [isStarted, setIsStarted] = useState(turn);
    const timerRef = useRef(null);

    const handleStart = () => {
        clearInterval(timerRef.current);
        timerRef.current = setInterval(()=>{
        setMinutes((prevCount) => prevCount - 1 )
        },60000)
        timerRef.current = setInterval(()=>{
        setSeconds((prevCount) => prevCount == 0 ? 59 : prevCount - 1)
        },1000)
        setIsStarted(true);
    }

    const handleStop = () => {
        clearInterval(timerRef.current);
        setSeconds((prevCount) =>  prevCount + 3 > 59 ? (prevCount + 3) - 60 : prevCount + 3);
        setIsStarted(false);
    }
    
    return(
            <div className="TimerDiv">
                <p>{hours < 10 ? '0' + hours : hours}:{minutes < 10 ? '0'+minutes: minutes}:{seconds< 10 ? '0'+seconds : seconds}</p>
                <button onClick={isStarted ? handleStop : handleStart}></button>
            </div>
    )
}

