
import './timer-div.css';


//usar el handleclick en el button



export const TimerDiv = ({hour, minute, second, player, handleClick}) =>{

    return(<>
        <div className={player == "jugador1" ? "TimerDiv j1" : "TimerDiv"} onClick={handleClick}>
            <p>{hour < 10 ? '0' + hour : hour}:{minute < 10 ? '0'+minute: minute}:{second< 10 ? '0'+second : second}</p>
            <p>{player}</p>
        </div>
    </>)
}

