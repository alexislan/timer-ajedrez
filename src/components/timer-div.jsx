
import './timer-div.css';


//usar el handleclick en el button



export const TimerDiv = ({hour, minute, second, player, handleClick}) =>{

    return(<>
        <div className="TimerDiv">
            <p>{hour < 10 ? '0' + hour : hour}:{minute < 10 ? '0'+minute: minute}:{second< 10 ? '0'+second : second}</p>
            <p>{player}</p>
            <button onClick={handleClick}></button>
        </div>
    </>)
}

