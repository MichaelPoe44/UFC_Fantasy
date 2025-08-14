import { useState, useEffect } from "react";
import { useParams, useNavigate } from 'react-router-dom';
import { getStateContext } from "../StateProvider"
import "../pages_css/MyLeague.css"

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
                        team: {
							name, "team Name",
							"bantamweight": {1: "sean", 2: "petyr"},
							"featherweight": {1: "volk", 2: "yair"}, ...
						},
						username: "name"
                    }
                }
        }


*/

export default function MyLeague(){
    const {state, dispatch} = getStateContext()

  	const { leagueId } = useParams();
    const [leagueState, setLeagueState] = useState(state.leagues[leagueId]);
	const is_admin = (state.user.user_id == leagueState.league_info.admin_id);
	
	
	const navigate = useNavigate();


	useEffect(() => {
		setLeagueState(state.leagues[leagueId]);
	}, [state.leagues[leagueId]]);
	
	console.log("admin? ", is_admin);
	console.log(leagueState);
	const participantEntries = Object.entries(leagueState.league_participants || {}); //later replace this with a draft status in
	const hasTeams = (participantEntries.length > 0);							// the league info ei fix backend etc


	const admin_button = () => {
		//start matchup
	}

	const navigation_button = () => {
		
		hasTeams ? navigate("matchup page") : navigate(`/draft/${leagueId}`)
	}

    return (
    <div className="my-league-page">
    	<h1>League: {leagueState.league_info.name}</h1>
      	<p><strong>Admin ID:</strong> {leagueState.league_info.admin_id}</p>
      	<p><strong># Participants:</strong> {leagueState.league_info.num_participants}</p>
     	<p><strong>Join Code:</strong> {leagueState.league_info.join_code}</p>

		{is_admin && (
			<button type="button" onClick={admin_button}>
				{hasTeams ? "Start Next Matchups" : "Start Draft"}
			</button>
		)}

		
		<button type="button" onClick={navigation_button}>
			{hasTeams ? "Go to Matchups" : "Go to Draft"}
		</button>
		
      	

      	{hasTeams && (
        	<div className="participants-section">
			<h2>Participants & Teams</h2>
				{participantEntries.map(([userId, { team, username }]) => (
					<div key={userId} className="participant">
						<h3>Team: {team.name}</h3>
						<p>Coach: {username} ({userId})</p>
						<div className="team-details">
							{Object.entries(team)
								.filter(([key]) => key !== "name") // ignore team name when displaying weight classes
								.map(([weightClass, fighterObj]) => (
								<div key={weightClass} className="weight-class">
									<strong>{weightClass}:</strong> {Object.values(fighterObj).join(', ')}
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