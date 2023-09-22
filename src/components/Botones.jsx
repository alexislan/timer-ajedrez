import { TimerDiv } from './timer-div'
import React, { useEffect, useReducer, useRef, useState } from "react";
import { Modal } from './Modal';
import { useModal } from '../useModal';

const timerReducer = (state, action) =>{
  const {type} = action;
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
    const [player, setPlayer] = useState("");
    const [horas, setH] = useState();
    const [minutos, setM] = useState();
    const [segundos, setS] = useState();
    const [suma, setSuma] = useState();
    const [isStarted1, setIsStarted1] = useState(false);
    const [isStarted2, setIsStarted2] = useState(false);
    const timerRefP1 = useRef(null);
    const timerRefP2 = useRef(null);
    const [timer, dispatch] = useReducer(timerReducer, {
      jugador1: {hours: 0, minutes: 0, seconds: 0},
      jugador2: {hours: 0, minutes: 0, seconds: 0}
    });
    
    const { isShowing, toggle } = useModal();

    const handleStart = () => {
        if(horas || minutos || segundos)
        {
          if(!player || player === "jugador1"){
            setPlayer("jugador1");
            setIsStarted1(true)
          }else if ("jugador2"){
            setPlayer("jugador2");
            setIsStarted2(true)
          }
        }
    }

    const handleStart1 = () => {
    if(horas || minutos || segundos){
      if(!player || player == "jugador1"){
        clearInterval(timerRefP1.current)
        setPlayer("jugador2")
        setIsStarted1(true);
        setIsStarted2(false);
        if(timerRefP1.current){
          if(timer.jugador1.seconds + suma > 59){
            timer.jugador1.seconds = (timer.jugador1.seconds + suma) - 60
            if(timer.jugador1.minutes + 1 > 59){
              timer.jugador1.minutes = (timer.jugador1.minutes + 1) - 60;
            }else{
              timer.jugador1.minutes = timer.jugador1.minutes + 1
            }
          }else{
            timer.jugador1.seconds = timer.jugador1.seconds + suma;
          }
        }
      }
    }
    }
    const handleStart2 = () => {
    if(horas || minutos || segundos){
      
        if(!player || player == "jugador2"){
          clearInterval(timerRefP2.current)
          setPlayer("jugador1")
          setIsStarted2(true);
          setIsStarted1(false);
          if(timerRefP2.current){
            if(timer.jugador2.seconds + suma > 59){
              timer.jugador2.seconds = (timer.jugador2.seconds + suma) - 60;
              if(timer.jugador2.minutes + 1 > 59){
                timer.jugador2.minutes = (timer.jugador2.minutes + 1) - 60;
              }else{
                timer.jugador2.minutes = timer.jugador2.minutes + 1;
              }
            }else{
              timer.jugador2.seconds = timer.jugador2.seconds + suma ;
            }
          }
        }
      
    }
  }
  
  const handleStop = () =>{
    clearInterval(timerRefP1.current);
    clearInterval(timerRefP2.current);
    setIsStarted1(false);
    setIsStarted2(false);
  } 
  const handleConfig = () => {
    clearInterval(timerRefP1.current);
    clearInterval(timerRefP2.current);
    setIsStarted1(false);
    setIsStarted2(false);
    toggle();
  }

  const handleReset = () => {
    //hacer la logica con las cosas que vienen de afuera (setear los timer con los argumentos)
    if(horas || minutos || segundos){
      clearInterval(timerRefP2.current)
      clearInterval(timerRefP1.current)
      timerRefP1.current = null;
      timerRefP2.current = null;
      setIsStarted1(false);
      setIsStarted2(false);
      setPlayer("");
      timer.jugador2.hours = horas
      timer.jugador2.minutes = minutos
      timer.jugador2.seconds = segundos
      timer.jugador1.hours = horas
      timer.jugador1.minutes = minutos
      timer.jugador1.seconds = segundos
    }
  }

  const handleSave = (values) =>{
    setH(!parseInt(values.valor1) ? 0 : parseInt(values.valor1))
    setM(!parseInt(values.valor2) ? 0 : parseInt(values.valor2))
    setS(!parseInt(values.valor3) ? 0 : parseInt(values.valor3))
    setSuma(!parseInt(values.valor4) ? 0 : parseInt(values.valor4))
    timer.jugador2.hours = !parseInt(values.valor1) ? 0 : parseInt(values.valor1)
    timer.jugador2.minutes = !parseInt(values.valor2) ? 0 : parseInt(values.valor2)
    timer.jugador2.seconds = !parseInt(values.valor3) ? 0 : parseInt(values.valor3)
    timer.jugador1.hours = !parseInt(values.valor1) ? 0 : parseInt(values.valor1)
    timer.jugador1.minutes = !parseInt(values.valor2) ? 0 : parseInt(values.valor2)
    timer.jugador1.seconds = !parseInt(values.valor3) ? 0 : parseInt(values.valor3)
  }
    
    useEffect(() => {
        if(player == "jugador1"){
          timerRefP1.current = setInterval(() => {
            dispatch({ type: "jugador1"})
          }, 1000);
        }else if(player === "jugador2"){
          timerRefP2.current = setInterval(() => {
              console.log("no para");
              dispatch({type: "jugador2"})
            }, 1000);
        }
        return () => {
            clearInterval(timerRefP1.current);
            clearInterval(timerRefP2.current);
        }
    }, [isStarted1,isStarted2, player])


    useEffect(()=>{
      if(timer.jugador1.hours === 0 && timer.jugador1.minutes === 0 && timer.jugador1.seconds === 0){
        clearInterval(timerRefP2.current);
        clearInterval(timerRefP1.current);
        setIsStarted2(false);
        setIsStarted1(false);
        setPlayer("");
      }
      if(timer.jugador2.hours === 0 && timer.jugador2.minutes === 0 && timer.jugador2.seconds === 0){
        clearInterval(timerRefP2.current);
        clearInterval(timerRefP1.current);
        setIsStarted2(false);
        setIsStarted1(false);
        setPlayer("");
        return;
      }
      if(!isStarted1 && !isStarted2){
        clearInterval(timerRefP1.current);
        clearInterval(timerRefP2.current);
        return;
    }
    })

    return(
        <div className='princ'>
        <TimerDiv
        hour = {timer.jugador1.hours}
        minute = {timer.jugador1.minutes}
        second = {timer.jugador1.seconds}
        player = {"jugador1"}
        handleClick = {handleStart1}
        turn = {player === "jugador1"}
        />
        <div className='conf'>

        <i className={isStarted1 || isStarted2 ? "fa-solid fa-pause" : !isStarted1 && !isStarted2 ? "fa-solid fa-play" : "fa-solid fa-play"} 
        onClick={isStarted1 || isStarted2 ? handleStop : handleStart}>
        </i>
        <i className="fa-solid fa-arrow-rotate-left" onClick={handleReset}></i>
        <Modal show={isShowing} onCloseButtonClick={toggle}
        onSave={handleSave}
        >
        </Modal>
        <i className="fa-solid fa-gear" onClick={handleConfig}></i>
        </div>
        <TimerDiv
        hour = {timer.jugador2.hours}
        minute = {timer.jugador2.minutes}
        second = {timer.jugador2.seconds}
        player = {"jugador2"}
        turn = {player === "jugador2"}
        handleClick = {handleStart2}
        />
      </div>
    )
}