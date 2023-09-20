import { TimerDiv } from './timer-div'

export const Prueba = () => {
    //tengo que usar aca el usereducer
    //pasar la logica a este componente
    return(
        <div className='princ'>
        <TimerDiv
        hour = {1}
        minute = {10}
        second = {10}
        />
      </div>
    )
}