
import './timer-div.css';


//usar el handleclick en el button



export const TimerDiv = ({hour, minute, second, player, handleClick, turn}) =>{
    return(<>
        <div onClick={handleClick} className={ turn ? "timeMove" : "TimerDiv"}>
            <p className={player == "jugador1" ? "j1" : ""}>{hour < 10 ? '0' + hour : hour}:{minute < 10 ? '0'+minute: minute}:{second< 10 ? '0'+second : second}</p>
        </div>
    </>)
}

