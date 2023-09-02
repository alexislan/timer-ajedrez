import React, { useRef, useState } from "react";
import './timer-div.css';


export const TimerDiv = () =>{
    const [countA, setCountA] = useState(60);
    const [countB, setCountB] = useState(60);
    const [isStartedA, setIsStartedA] = useState(false);
    const [isStartedB, setIsStartedB] = useState(false);
    const timerRefA = useRef(null);
    const timerRefB = useRef(null);

    const handleStartA = () => {

        clearInterval(timerRefA.current);
        timerRefA.current = setInterval(()=>{
        setCountA((prevCount) => prevCount - 1)
        },1000)
        setIsStartedA(true)
        
    }

    const handleStopA = () => {
        clearInterval(timerRefA.current);
        if(timerRefA.current !== null && !isStartedB){
            setCountA((prevCount) => prevCount + 3)
        }
        if(!isStartedB){
            setIsStartedA(false);
            handleStartB();
        }
    }
    const handleStartB = () => {
        clearInterval(timerRefB.current);
        timerRefB.current = setInterval(()=>{
        setCountB((prevCount) => prevCount - 1)
        },1000)
        setIsStartedB(true);
    }

    const handleStopB = () => {
        clearInterval(timerRefB.current);
        if(timerRefB.current !== null && !isStartedA){
            setCountB((prevCount) => prevCount + 3)
        }
        if(!isStartedA){
            setIsStartedB(false);
            handleStartA();
        }
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