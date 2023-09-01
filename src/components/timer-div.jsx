import React, { useRef, useState } from "react";
import './timer-div.css';


export const TimerDiv = () =>{
    const [countA, setCountA] = useState(15);
    const [countB, setCountB] = useState(15);
    const [isStartedA, setIsStartedA] = useState(true);
    const [isStartedB, setIsStartedB] = useState(true);
    const timerRefA = useRef(null);
    const timerRefB = useRef(null);

    const handleStartA = () => {
        clearInterval(timerRefA.current);
        timerRefA.current = setInterval(()=>{
        setCountA((prevCount) => prevCount - 1)
        },1000)
        setIsStartedA(false);
        setIsStartedB(false);
    }

    const handleStopA = () => {
        clearInterval(timerRefA.current);
        if(!isStartedB){
            setCountA((prevCount) => prevCount + 3)
        }
        handleStartB();
    }
    const handleStartB = () => {
        clearInterval(timerRefB.current);
        timerRefB.current = setInterval(()=>{
        setCountB((prevCount) => prevCount - 1)
        },1000)
        setIsStartedB(false);
    }

    const handleStopB = () => {
        clearInterval(timerRefB.current);
        if(!isStartedB){
            setCountB((prevCount) => prevCount + 3)
        }
        handleStartA();
    }
    return(
        <div className="princ">
            <div className="TimerDiv">
                <p>{countA}</p>
                <button onClick={handleStopA}></button>
            </div>
            <div className="TimerDiv">
                <p>{countB}</p>
                <button onClick={handleStopB}></button>
            </div>
        </div>
    )
}