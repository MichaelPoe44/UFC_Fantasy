import { useState, useEffect } from "react";
import { useParams, useNavigate } from 'react-router-dom';
import { getStateContext } from "../StateProvider"
import TeamDisplay from "../components/TeamsDisplay";
import MatchupsSection from "../components/MatchupsSection";
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
	const [currentMatchups, setCurrentMatchups] = useState({})
	const [myMatchup, setMyMatchup] = useState({})
	const is_admin = (state.user.user_id == leagueState.league_info.admin_id);
	const participantEntries = Object.entries(leagueState.league_participants || {}); //later replace this with a draft status in
	const hasTeams = (participantEntries.length > 0);							// the league info ei fix backend etc
	const [view, setView] = useState("matchups")
	const [matchupsStatus, setMatchupsStatus] = useState("pending")
	
	const navigate = useNavigate();


	useEffect(() => {
		setLeagueState(state.leagues[leagueId]);
		fetch_current_matchups();
	}, [state.leagues[leagueId]]);
	


	const fetch_current_matchups = async () => {
    	try {
	      	// const response = await fetch(`http://127.0.0.1:5000/api/league/${leagueId}/get_current_matchups`);
    	  	// const data = await response.json();
			// if (!data.success){
			// 	console.error(data.error);
				
			// }
      		// if (data.success){							
			// 	setCurrentMatchups(data.payload);
			//	let hasPicks = True
			//	let isComplete = False
			// 	for (const m_id in data.payload){
			// 		const match = data.payload[m_id]
			// 		if (state.user.user_id in match.user_info){//finds which match has user in it
			// 			setMyMatchup({[m_id]: match});
			// 		}
			//		if (match.status == "pending"){//checks that every match id ready (has picks for every class)
			//			hasPicks = False
			//		}
			//		if (match.status == "complete"){//checks if they are complete 
			//			isComplete == True
			//		}
			// 	}
			//	
			//	if (hasPicks == True && isComplete == False) setMatchupsStatus("ready")
			
			// 	else if (isComplete == True) setMatchupsState("complete")
			// }
			setCurrentMatchups(state.matchups_payload.payload);
				for (const m_id in state.matchups_payload.payload){
					const match = state.matchups_payload.payload[m_id]
					if (state.user.user_id in match.user_info){
						setMyMatchup({[m_id]: match});
						break;
					}
				}	
		} 
    	catch (error) {
			setError("Failed to fetch matchup state", error);
		}
		
		
	};
	
	const try_start_draft = async () => {
		try {
	      	const response = await fetch(`http://127.0.0.1:5000`);
    	  	const data = await response.json();
			if (!data.success){
				console.error(data.error)
			}	
		} 
    	catch (error) {
			setError("Failed to simulate matches", error);
		}
	}
	
	const try_simulate_matchups = async () => {
		try {
	      	const response = await fetch(`http://127.0.0.1:5000/api/league/${leagueId}/create_matchups`);
    	  	const data = await response.json();
			if (!data.success){
				console.error(data.error)
			}	
		} 
    	catch (error) {
			setError("Failed to simulate matches", error);
		}
	}

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
	


	const admin_button = (state) => {
		switch (state){

			case "draft":
				try_start_draft();
				break;
				
			case "ready":
				try_create_matchups();
				break;

			case "complete":
				try_simulate_matchups();
				break;

			case "pending":

			default:

		}

		// if (fights for week simulated) make
		// if (fights not simulated && all picks made) simulate
		try_create_matchups;
	}

	const rederAdminButton = () => {
		if (!hasTeams) return <button type="button" onClick={admin_button("draft")}>Start Draft</button>

		if (matchupsStatus == "ready") return <button type="button" onClick={admin_button("ready")}>Fight!</button>
		
		if (matchupsStatus == "complete") return <button type="button" onClick={admin_button("complete")}>Start Next Matchups</button>

		if (matchupsStatus == "pending") return <button type="button" onClick={admin_button("pending")}>Waiting for selections</button>


	const navigation_button = () => {
		hasTeams ? navigate(`/my-league/${leagueId}/my-matchup`, {state : myMatchup}) : navigate(`/draft/${leagueId}`)
	}

	const toggleContent = () => {
		if (view == "matchups") setView("teams");
		if (view == "teams") setView("matchups");
	}

	const renderContent = () => {

		if (!hasTeams) return <h3>Please Complete Draft</h3>
		
		switch (view) {
			case "matchups":
				if (Object.keys(currentMatchups).length > 0) return <MatchupsSection matchups={currentMatchups} leagueId={leagueId} />
				else return <h3>No Matchups this week</h3>
				break;
			
			case "teams":
				return <TeamDisplay participantEntries={participantEntries}/>
				break;

			default:
				break;
		}
		
		

		return <h3>Error loading content</h3>
	}


    return (
    <div className="my-league-page">
    	<h1>League: {leagueState.league_info.name}</h1>
      	<p><strong>Admin ID:</strong> {leagueState.league_info.admin_id}</p>
      	<p><strong># Participants:</strong> {leagueState.league_info.num_participants}</p>
     	<p><strong>Join Code:</strong> {leagueState.league_info.join_code}</p>
		<button type="button" onClick={console.log("go to")}>See All Matchups</button>

		{is_admin && (
			<button type="button" onClick={admin_button}>
				{hasTeams ? "Start Next Matchups" : "Start Draft"}
			</button>
		)}

		
		<button type="button" onClick={navigation_button}>
			{hasTeams ? "Go to Matchups" : "Go to Draft"}
		</button>
		
      	

		<button type="button" onClick={toggleContent}>See All Teams</button>
		<div>{renderContent()}</div>
      	{/* {hasTeams && Object.keys(currentMatchups).length > 0 && (

			// <MatchupsSection matchups={currentMatchups} leagueId={leagueId} />
      	)} */}
    </div>
  )
}