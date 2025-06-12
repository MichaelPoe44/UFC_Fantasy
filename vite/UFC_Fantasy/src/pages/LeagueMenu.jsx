import { useState } from "react";
import { getStateContext } from "../StateProvider";




export default function LeagueMenu(){

    const [name, setName] = useState("");
    const {state, dispatch} = getStateContext();

    const create_league = () => {
        console.log(name)
    }

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
            <input type="text" onChange={(e) => setName(e.target.value)}/>
            <button onClick={create_league}>create</button>

            <button onClick={addLeague}>here</button>
            <button onClick={do_this}>check</button>
        </div>
    );
}





