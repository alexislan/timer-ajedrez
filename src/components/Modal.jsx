import { Botones } from "./Botones";
import "./Modal.css";
import { createPortal } from "react-dom";
import React, { useState } from "react";

export const Modal = ({ show, onCloseButtonClick, children, onSave}) => {
    if (!show) {
    return null;
    }

const [input1, setInput1] = useState("");
const [input2, setInput2] = useState("");
const [input3, setInput3] = useState("");
const [input4, setInput4] = useState("");
const [close, setClose] = useState(false);
const [error, setError] = useState(false);
const [error2, setError2] = useState(false);
const [error3, setError3] = useState(false);
const [error4, setError4] = useState(false);


const handleChange = (event) => {
  let inputValue = event.target.value;
  setInput1(inputValue);
  setError(false); 
}

const handleChange2 = (event) =>{
  let inputValue = event.target.value;
  setInput2(inputValue);
  setError2(false); 
}
const handleChange3 = (event) =>{
  let inputValue = event.target.value;
  setInput3(inputValue);
  setError3(false); 
}
const handleChange4 = (event) => {
  let inputValue = event.target.value;
  setInput4(inputValue);
  setError4(false); 
}
const handleSave = () => {
    let n1 = !parseInt(input1) ? 0 : parseInt(input1);
    let n2 = !parseInt(input2) ? 0 : parseInt(input2);
    let n3 = !parseInt(input3) ? 0 : parseInt(input3);
    let n4 = !parseInt(input4) ? 0 : parseInt(input4);
    setError(n1 > 24 )
    setError2(n2 > 59 )
    setError3(n3 > 59 )
    setError4(n4 > 59 )
    if (n1 < 25 && n2 < 60 && n3 < 60 && n4 < 60 ){
      const values = {
        valor1: input1,
        valor2: input2,
        valor3: input3,
        valor4: input4,
      };
      onSave(values);
      setClose(true);
      onCloseButtonClick();
    } 
  }
  

  return createPortal(
    <div className="modal-wrapper">
      <section className="modal">
        <footer>
          <button onClick={onCloseButtonClick} className="botonmodal"><i class="fa-solid fa-x"></i></button>
        </footer>
        <main>
        <div className="inputsTimer">
          <div className="inpu">
            <p>Horas:</p>
            <input 
            type="number"
            placeholder="0"
            value={input1}
            onChange={handleChange}
            maxLength={2}
            />
            {error && <p style={{ color: 'red' }}>Debe ser menor que 25</p>}
          </div>
          <div className="inpu">
            <p>Minutos:</p>
            <input 
            type="number"
            placeholder="0"
            value={input2}
            onChange={handleChange2} 
            />
            {error2 && <p style={{ color: 'red' }}>Debe ser menor que 60</p>}
          </div>
          <div className="inpu">
            <p>Segundos:</p>
            <input 
            type="number"
            placeholder="0"
            value={input3}
            onChange={handleChange3}
            />
            {error3 && <p style={{ color: 'red' }}>Debe ser menor que 60</p>}
          </div>
          <div className="inpu">
            <p>Segundos a sumar:</p>
            <input 
            type="number"
            placeholder="0"
            value={input4}
            onChange={handleChange4}
            />
            {error4 && <p style={{ color: 'red' }}>Debe ser menor que 60</p>}
          </div>
        </div>
        <div className="botonG">
            <button onClick={handleSave} className="botonGuardar">Empezar</button>
            {close ? <Botones/> : ''}
        </div>

        </main>
      </section>
    </div>,
    document.body
  );
};
