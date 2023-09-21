import { Botones } from "./Botones";
import "./Modal.css";
import { createPortal } from "react-dom";
import { useModal } from '../useModal';
import React, { useEffect, useReducer, useRef, useState } from "react";

export const Modal = ({ show, onCloseButtonClick, children, onSave}) => {
    if (!show) {
    return null;
    }

const [input1, setInput1] = useState("");
const [input2, setInput2] = useState("");
const [input3, setInput3] = useState("");
const { isShowing, toggle } = useModal();
const [close, setClose] = useState(false);

const handleSave = () => {
    const values = {
      valor1: input1,
      valor2: input2,
      valor3: input3,
    };
    onSave(values);
    setClose(true);
    onCloseButtonClick();

}
  

  return createPortal(
    <div className="modal-wrapper">
      <section className="modal">
        <main>{children}</main>
        <footer>
          <button onClick={onCloseButtonClick} className="botonmodal">Close Modal</button>
        </footer>
        <div className="inputsTimer">
            <label htmlFor="1">ingrese las horas</label>
            <input 
            type="number"
            placeholder="Valor 1"
            value={input1}
            onChange={(e) => setInput1(e.target.value)}
            />
            <label htmlFor="1">ingrese los minutos</label>
            <input 
            type="number"
            placeholder="Valor 2"
            value={input2}
            onChange={(e) => setInput2(e.target.value)} 
            />
            <label htmlFor="1">ingrese los segundos</label>
            <input 
            type="number"
            placeholder="Valor 3"
            value={input3}
            onChange={(e) => setInput3(e.target.value)}
            />
            <button onClick={handleSave}>guardar</button>
            {close ? <Botones/> : ''}
        </div>
      </section>
    </div>,
    document.body
  );
};
