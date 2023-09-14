import React, { useRef, useState } from "react";
import './timer-div.css';


export const TimerDiv = () =>{
    const [hoursA, setHoursA] = useState(15);
    const [hoursB, setHoursB] = useState(15);
    const [minutesA, setMinutesA] = useState(59);
    const [minutesB, setMinutesB] = useState(10);
    const [secondsA, setSecondsA] = useState(59);
    const [secondsB, setSecondsB] = useState(10);
    const [isStartedA, setIsStartedA] = useState(false);
    const [isStartedB, setIsStartedB] = useState(false);
    const timerRefA = useRef(null);
    const timerRefB = useRef(null);

    const handleStartA = () => {

        clearInterval(timerRefA.current);
        timerRefA.current = setInterval(()=>{
        setMinutesA((prevCount) => prevCount - 1 )
        },60000)
        timerRefA.current = setInterval(()=>{
        setSecondsA((prevCount) => prevCount == 0 ? 59 : prevCount - 1)
        },1000)
        setIsStartedA(true)
        
    }

    const handleStopA = () => {
        clearInterval(timerRefA.current);
        if(timerRefA.current !== null && !isStartedB){
            setSecondsA((prevCount) => prevCount + 3)
        }
        if(!isStartedB){
            setIsStartedA(false);
            handleStartB();
        }
    }
    const handleStartB = () => {
        clearInterval(timerRefB.current);
        timerRefB.current = setInterval(()=>{
        setMinutesB((prevCount) => prevCount - 1 )
        },60000)
        timerRefB.current = setInterval(()=>{
        setSecondsB((prevCount) => prevCount == 0 ? 59 : prevCount - 1)
        },1000)
        setIsStartedB(true);
    }

    const handleStopB = () => {
        clearInterval(timerRefB.current);
        if(timerRefB.current !== null && !isStartedA){
            setSecondsB((prevCount) =>  prevCount + 3)
        }
        if(!isStartedA){
            setIsStartedB(false);
            handleStartA();
        }
    }
    return(
        <div className="princ">
            <div className="TimerDiv">
                <p>{secondsA < 10 ?  minutesA + ':' + '0' + secondsA : minutesA + ':' + secondsA}</p>
                <button onClick={handleStopA}></button>
            </div>
            <div className="TimerDiv">
                <p>{minutesB < 10 && secondsB < 10 ? '0' + minutesB + ':' + '0' + secondsB : minutesB < 10 ? '0' + minutesB + ':' + secondsB : secondsB < 10 ? minutesB + ':' + '0' + secondsB : minutesB + ':' + secondsB}</p>
                <button onClick={handleStopB}></button>
            </div>
        </div>
    )
}