import { useState } from "react";
import { getStateContext } from "../StateProvider";
import "./LeagueMenu.css"




export default function LeagueMenu(){
    
    const {state, dispatch} = getStateContext();

    //for league creation
    const [showCreateForm, setShowCreateForm] = useState(false)
    const [leageName, setName] = useState("");

    //for joining league
    const [showJoinForm, setShowJoinForm] = useState(false)
    const [leageId, setId] = useState("");


    const create_league = () => {
        dispatch({
            type: "CREATE_LEAGUE",
            name: leageName,
        })
        setName("")
    }

    const join_league = () => {
        dispatch({
            type: "JOIN_LEAGUE",
            id: leageId,
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
                            value={leageName}
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
                    {showCreateForm ? "Cancel" : "Join a League"}
                </button>
                {showCreateForm && (
                    <form className="form" onSubmit={join_league}>
                        <input
                            type="text"
                            placeholder="Enter League Id"
                            value={leageId}
                            onChange={(e) => setId(e.target.value)}
                            required 
                        />
                        <button type="submit">Join</button>
                    </form>
                )}
            </div>


        </div>
    );
}





