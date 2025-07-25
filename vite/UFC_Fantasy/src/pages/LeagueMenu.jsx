import { useState } from "react";
import { getStateContext } from "../StateProvider";
import "../pages_css/LeagueMenu.css"



const try_create_league = async (leagueName, state, dispatch) => {
    const user_id = state.user.user_id;
    const payload = {
        "name": leagueName,
        "id": user_id
    }

    const response = await fetch("http://127.0.0.1:5000/api/register-league", {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify(payload)
    }
    );
    const data = await response.json();
    console.log(data)
    if (data.success == true){
        dispatch({
            type: "CREATE_LEAGUE",
            league_id: data.league_id,
            league: data.league
        })
    }
}


const try_join_league = async (joinCode, state, dispatch) => {
    const user_id = state.user.user_id;
    const payload = {
        "join_code": joinCode,
        "id": user_id
    };

    const response = await fetch("http://127.0.0.1:5000/api/join-league", {
        method: "POST",
        headers: { "Content-Type": "application/json"},
        body: JSON.stringify(payload)
    })
    const data = await response.json()
    console.log(data)
}



export default function LeagueMenu(){
    //user data
    const {state, dispatch} = getStateContext();

    //for league creation
    const [showCreateForm, setShowCreateForm] = useState(false)
    const [leagueName, setName] = useState("");

    //for joining league
    const [showJoinForm, setShowJoinForm] = useState(false)
    const [joinCode, setJoinCode] = useState("");


    const create_league = (e) => {
        e.preventDefault();
        try_create_league(leagueName, state, dispatch);
    }

    const join_league = (e) => {
        e.preventDefault();
        try_join_league(joinCode, state, dispatch);
        
    }

    const do_this = () => {
        console.log(state)
    }
    return(
        <div className="league_menu">
            <h1>🏆 UFC Fantasy Leagues</h1>

            <div className="card">
                <button className="toggle_button" onClick={() => setShowCreateForm(!showCreateForm)}>
                    {showCreateForm ? "Cancel" : "Create a League"}
                </button>
                {showCreateForm && (
                    <form className="form" onSubmit={create_league}>
                        <input
                            type="text"
                            placeholder="Enter League Name"
                            value={leagueName}
                            onChange={(e) => setName(e.target.value)}
                            required 
                        />
                        <button type="submit">Create</button>
                    </form>
                )}
            </div>

                
            <div className="card">
                <button className="toggle_button" onClick={() => setShowJoinForm(!showJoinForm)}>
                    {showJoinForm ? "Cancel" : "Join a League"}
                </button>
                {showJoinForm && (
                    <form className="form" onSubmit={join_league}>
                        <input
                            type="text"
                            placeholder="Enter League's Join Code"
                            value={joinCode}
                            onChange={(e) => setJoinCode(e.target.value)}
                            required 
                        />
                        <button type="submit">Join</button>
                    </form>
                )}
            </div>

            <button onClick={do_this}>log leagues</button>
        </div>
    );
}





