import { useState, useEffect } from "react";
import { useParams, useNavigate } from 'react-router-dom';
import { getStateContext } from "../StateProvider"
import TeamDisplay from "../components/TeamsDisplay";
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
	const [currentMatchups, setCurrentMatchups] = useState(null)
	const [myMatchup, setMyMatchup] = useState(null)
	const is_admin = (state.user.user_id == leagueState.league_info.admin_id);
	const participantEntries = Object.entries(leagueState.league_participants || {}); //later replace this with a draft status in
	const hasTeams = (participantEntries.length > 0);							// the league info ei fix backend etc
	const navigate = useNavigate();


	useEffect(() => {
		setLeagueState(state.leagues[leagueId]);
	}, [state.leagues[leagueId]]);
	

	useEffect(() => {
		fetch_matchups;
	},[]);



	const fetch_matchups = async () => {
		console.log("here")
    	try {
	      	const response = await fetch(`http://127.0.0.1:5000/api/league/${leagueId}/get_current_matchups`);
    	  	const data = await response.json();
			if (!data.success){
				console.error(data.error)
				
			}
      		if (data.success){							
				setCurrentMatchups(data.payload)
			}
		} 
    	catch (error) {
			setError("Failed to fetch matchup state", error);
		}
		
		
	};
	console.log(currentMatchups)
	

	const try_create_matchups = async () => {
		try {
	      	const response = await fetch(`http://127.0.0.1:5000/api/league/${leagueId}/create_matchups`);
    	  	const data = await response.json();
			if (!data.success){
				console.error(data.error)
			}	
		} 
    	catch (error) {
			setError("Failed to fetch matchup state", error);
		}
	}
	
	const admin_button = () => {
		try_create_matchups;
	}

	const navigation_button = () => {
		
		hasTeams ? navigate("") : navigate(`/draft/${leagueId}`)
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
        	<TeamDisplay participantEntries={participantEntries} />
      	)}
    </div>
  )
}