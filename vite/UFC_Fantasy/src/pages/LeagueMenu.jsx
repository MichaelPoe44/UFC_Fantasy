import { useState } from "react";
import { getStateContext } from "../StateProvider";
import "./LeagueMenu.css"




export default function LeagueMenu(){
    //user data
    const {state, dispatch} = getStateContext();

    //for league creation
    const [showCreateForm, setShowCreateForm] = useState(false)
    const [leagueName, setName] = useState("");

    //for joining league
    const [showJoinForm, setShowJoinForm] = useState(false)
    const [leagueId, setId] = useState("");


    const create_league = (e) => {
        e.preventDefault()
        console.log("1");
        dispatch({
            type: "CREATE_LEAGUE",
            name: leagueName,
        })
        setName("")
        console.log("2");
    }

    const join_league = (e) => {
        e.preventDefault()
        dispatch({
            type: "JOIN_LEAGUE",
            id: leagueId,
        })
        setId("")
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

                {/*need to fix the onclick activating both and move the css over from get started*/}
            <div className="card">
                <button className="toggle_button" onClick={() => setShowJoinForm(!showJoinForm)}>
                    {showJoinForm ? "Cancel" : "Join a League"}
                </button>
                {showJoinForm && (
                    <form className="form" onSubmit={join_league}>
                        <input
                            type="text"
                            placeholder="Enter League Id"
                            value={leagueId}
                            onChange={(e) => setId(e.target.value)}
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





