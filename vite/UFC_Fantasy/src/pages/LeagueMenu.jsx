import { getStateContext } from "../StateProvider";




export default function LeagueMenu(){
    
    const {state, dispatch} = getStateContext();

    const addLeague = () => {
        dispatch({
            type: "ADD_LEAGUE",
            league: "myname"
        })
    }

    const do_this = () => {
        console.log(state)
    }
    return(
        <div className="league_menu">
            <button onClick={addLeague}>here</button>
            <button onClick={do_this}>check</button>
        </div>
    );
}





