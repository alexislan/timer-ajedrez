import { TimerDiv } from './timer-div'
import React, { useEffect, useReducer, useRef, useState } from "react";

const timerReducer = (state, action) =>{
  const {type} = action;
  //se rompe cuando el minuto llega a 0
  switch(type){
      case "jugador1":
      return {
          ...state,
          jugador1: {
            hours:
            state.jugador1.minutes === 0 && state.jugador1.seconds === 0
            ? state.jugador1.hours - 1
            : state.jugador1.hours,
            minutes:
            state.jugador1.seconds !== 0
            ? state.jugador1.minutes
            : state.jugador1.minutes === 0 
            ? 59
            : state.jugador1.minutes -1,
            seconds:
            state.jugador1.seconds === 0 
            ? 59 
            : state.jugador1.seconds - 1,
              
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
              state.jugador2.minutes === 0 && state.jugador2.seconds === 0
              ? state.jugador2.hours - 1
              : state.jugador2.hours,
              minutes:
              state.jugador2.seconds !== 0
              ? state.jugador2.minutes
              : state.jugador2.minutes === 0 
              ? 59
              : state.jugador2.minutes -1,
              seconds:
              state.jugador2.seconds === 0 
              ? 59 
              : state.jugador2.seconds - 1,
              
          },
          jugador1:{
              ...state.jugador1
          }
      }
      default:
          return state;
  }
}


export const Botones = () => {
    //tengo que usar aca el usereducer
    //pasar la logica a este componente
    const [player, setPlayer] = useState("");
    const [isStarted1, setIsStarted1] = useState(false);
    const [isStarted2, setIsStarted2] = useState(false);
    const timerRefP1 = useRef(null);
    const timerRefP2 = useRef(null);
    const [timer, dispatch] = useReducer(timerReducer, {
      jugador1: {hours: 1, minutes: 0, seconds: 10},
      jugador2: {hours: 1, minutes: 0, seconds: 10}
    });

    const handleStart1 = () => {
      if(!player || player == "jugador1"){
        clearInterval(timerRefP1.current)
        setPlayer("jugador2")
        setIsStarted1(true);
        setIsStarted2(false);
        if(timerRefP1.current){
          if(timer.jugador1.seconds + 3 > 59){
            timer.jugador1.seconds = (timer.jugador1.seconds + 3) - 60
            if(timer.jugador1.minutes + 1 > 59){
              timer.jugador1.minutes = (timer.jugador1.minutes + 1) - 60;
            }else{
              timer.jugador1.minutes = timer.jugador1.minutes + 1
            }
          }else{
            timer.jugador1.seconds = timer.jugador1.seconds + 3;
          }
        }
      }
    }
    const handleStart2 = () => {
      if(!player || player == "jugador2"){
        clearInterval(timerRefP2.current)
        setPlayer("jugador1")
        setIsStarted2(true);
        setIsStarted1(false);
        if(timerRefP2.current){
          if(timer.jugador2.seconds + 3 > 59){
            timer.jugador2.seconds = (timer.jugador2.seconds + 3) - 60;
            if(timer.jugador2.minutes + 1 > 59){
              timer.jugador2.minutes = (timer.jugador2.minutes + 1) - 60;
            }else{
              timer.jugador2.minutes = timer.jugador2.minutes + 1;
            }
          }else{
            timer.jugador2.seconds = timer.jugador2.seconds + 3;
          }
        }
      }
  }
    
    
    useEffect(() => {
        if(!isStarted1 && !isStarted2){
            clearInterval(timerRefP1.current);
            clearInterval(timerRefP2.current);
            return;
        }
        if(player == "jugador1"){
            timerRefP1.current = setInterval(() => {
              dispatch({ type: "jugador1"})
            }, 1000);
        }else if(player === "jugador2"){
            timerRefP2.current = setInterval(() => {
              dispatch({type: "jugador2"})
            }, 1000);
        }
        return () => {
            clearInterval(timerRefP1.current);
            clearInterval(timerRefP2.current);
        }
    }, [isStarted1,isStarted2, player])

    return(
        <div className='princ'>
        <TimerDiv
        hour = {timer.jugador1.hours}
        minute = {timer.jugador1.minutes}
        second = {timer.jugador1.seconds}
        player = {"jugador1"}
        handleClick = {handleStart1}
        />
        
        <TimerDiv
        hour = {timer.jugador2.hours}
        minute = {timer.jugador2.minutes}
        second = {timer.jugador2.seconds}
        player = {"jugador2"}
        handleClick = {handleStart2}
        />
      </div>
    )
}