import { useState, useEffect } from "react";
import { useParams, useNavigate } from 'react-router-dom';
import { getStateContext } from "../StateProvider"

/*
league_id: {
                "league_info":{
                    "name": name,
                    "admin_id": user_id,
                    "num_particpiants": 1,
                    "join_code": code
                },
                "league_participants":{
                    user_id:{
                        team: {two fighters per weightclass}
                    }
                }
        }


*/

export default function MyLeague(){
    const {state, dispatch} = getStateContext()

  	const { leagueId } = useParams();
    const [leagueState, setLeagueState] = useState(state.leagues[leagueId]);
	
	const navigate = useNavigate();


	useEffect(() => {
		// if (!state.leagues == null) navigate("/");
		// console.log(state.leagues);
		setLeagueState(state.leagues[leagueId]);
	}, [state.leagues[leagueId]]);
	
	console.log(state.leagues[leagueId]);
	console.log(leagueState);
	const participantEntries = Object.entries(leagueState.league_participants || {}); //later replace this with a draft status in
	const hasTeams = (participantEntries.length > 0);							// the league info ei fix backend etc




    return (
    <div className="my-league-page">
    	<h1>League: {leagueState.name}</h1>
      	<p><strong>Admin ID:</strong> {leagueState.admin_id}</p>
      	<p><strong># Participants:</strong> {leagueState.num_particpiants}</p>
     	<p><strong>Join Code:</strong> {leagueState.join_code}</p>

      	{!hasTeams && (
        	<button type="button" onClick={() => {/* handleStartDraft logic */}}>
          	Start Draft
        	</button>
      	)}

      	{hasTeams && (
        	<div className="participants-section">
          	<h2>Participants & Teams</h2>
          	{participantEntries.map(([userId, { team }]) => (
            	<div key={userId} className="participant">
              		<h3>User: {userId}</h3>
              		<div className="team-details">
                		{Object.entries(team).map(([weightClass, fighters]) => (
                  			<div key={weightClass} className="weight-class">
                    			<strong>{weightClass}:</strong> {fighters.join(', ')}
                  			</div>
                		))}
              		</div>
            	</div>
          	))}
        	</div>
      	)}
    </div>
  )
}