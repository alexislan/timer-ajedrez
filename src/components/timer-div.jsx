import React, { useEffect, useReducer, useRef, useState } from "react";
import './timer-div.css';


//usar el handleclick en el button
const timerReducer = (state, action) =>{
    const {type} = action;
    console.log(state);
    switch(type){
        case "jugador1":
        return {
            ...state,
            jugador1: {
                hours:
                state.jugador1.minutes === 0
                ? state.jugador1.hours - 1
                : state.jugador1.hours,
                minutes:
                state.jugador1.seconds === 0
                ? state.jugador1.minutes - 1
                : state.jugador1.minutes,
                seconds:
                state.jugador1.seconds === 0 
                ? 59 
                : state.jugador1.seconds - 1

            },
            jugador2: {
                ...state.jugador2,
            },
        };
        case "jugador2":
        return {
            ...state,
            jugador2: {
                hours:
                state.jugador2.minutes === 0
                ? state.jugador2.hours - 1
                : state.jugador2.hours,
                minutes:
                state.jugador2.seconds === 0
                ? state.jugador2.minutes - 1
                : state.jugador2.minutes,
                seconds:
                state.jugador2.seconds === 0 
                ? 59 
                : state.jugador2.seconds - 1
            },
            jugador1:{
                ...state.jugador1
            }
        }
        default:
            return state;
    }
}


export const TimerDiv = ({hour, minute, second}) =>{
    const [player, setPlayer] = useState("");
    const [isStarted, setIsStarted] = useState(false);
    const timerRefP1 = useRef(null);
    const timerRefP2 = useRef(null);
    const [timer, dispatch] = useReducer(timerReducer, {
        jugador1: {hours: hour, minutes: minute, seconds: second},
        jugador2: {hours: hour, minutes: minute, seconds: second}
    });


    const handleStart = () => {
        setIsStarted(true)
        setPlayer("jugador1")
        
    }

    // const handleStop = () => {
    //     // clearInterval(timerRef.current);
    //     // setSeconds((prevCount) =>  prevCount + 3 > 59 ? (prevCount + 3) - 60 : prevCount + 3);
    //     // setIsStarted(false);
    // }

    const handleClick = () =>{
        if(isStarted){
            setPlayer((prev) => 
                prev === 'jugador1' ? 'jugador2' : 'jugador1'
            );
        }
    }
    
    useEffect(() => {
        console.log("hola mundo")
        console.log(player)
        if(!isStarted){
            clearInterval(timerRefP1.current);
            clearInterval(timerRefP2.current);
            return;
        }
        if(player === "jugador1"){
            console.log('porque no anda')
            timerRefP1.current = setInterval(() => {
                dispatch({ type: "jugador1"})
            }, 1000);
            console.log(timerRefP1)
        }else{
            console.log('no se')
            timerRefP2.current = setInterval(() => {
                dispatch({type: "jugador2"})
            }, 1000);
        }
        return () => {
            clearInterval(timerRefP1.current);
            clearInterval(timerRefP2.current);
        }
    }, [isStarted, player])




    return(<>
        <div className="TimerDiv">
            <p>{timer.jugador1.hours < 10 ? '0' + timer.jugador1.hours : timer.jugador1.hours}:{timer.jugador1.minutes < 10 ? '0'+timer.jugador1.minutes: timer.jugador1.minutes}:{timer.jugador1.seconds< 10 ? '0'+timer.jugador1.seconds : timer.jugador1.seconds}</p>
            <button onClick={!isStarted ? handleStart :handleClick }></button>
        </div>
        <div className="TimerDiv" >
            <p>{timer.jugador2.hours < 10 ? '0' + timer.jugador2.hours : timer.jugador2.hours}:{timer.jugador2.minutes < 10 ? '0'+timer.jugador2.minutes: timer.jugador2.minutes}:{timer.jugador2.seconds< 10 ? '0'+timer.jugador2.seconds : timer.jugador2.seconds}</p>
            <button onClick={!isStarted ? handleStart :handleClick }></button>
        </div>
    </>)
}

