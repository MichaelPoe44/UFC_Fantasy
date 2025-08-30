import { useState, useEffect } from "react";
import { useParams, useNavigate } from 'react-router-dom';
import { getStateContext } from "../StateProvider"
import TeamDisplay from "../components/TeamsDisplay";
import MatchupsSection from "../components/MatchupsSection";
import Leaderboard from "../components/Leaderboard";
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
	const [week, setWeek] = useState(leagueState.league_info.current_week)
	const is_admin = (state.user.user_id == leagueState.league_info.admin_id);
	const participantEntries = Object.entries(leagueState.league_participants || {}); //later replace this with a draft status in
	const hasTeams = (participantEntries.length > 0);							// the league info ei fix backend etc
	const [view, setView] = useState("matchups")
	const [matchupsStatus, setMatchupsStatus] = useState("sim_pending")
	const [refreshKey, setRefreshKey] = useState(0);
	
	const navigate = useNavigate();


	useEffect(() => {
		setLeagueState(state.leagues[leagueId]);
		fetch_current_matchups();
	}, [refreshKey]);
	


	const fetch_current_matchups = async () => {
    	try {
	      	const response = await fetch(`http://127.0.0.1:5000/api/league/${leagueId}/get_current_matchups`);
    	  	const data = await response.json();
			if (!data.success){
				console.error(data.error);
				
			}
      		if (data.success){							
				setCurrentMatchups(data.payload);
				
				let hasPicks = true;
				let isComplete = false;
				for (const m_id in data.payload){
					const match = data.payload[m_id]
					if (state.user.user_id in match.user_info){//finds which match has user in it
						setMyMatchup({[m_id]: match});
					}
					if (match.status == "pending"){//checks that every match id ready (has picks for every class)
						hasPicks = false;
					}
					if (match.status == "completed"){//checks if they are complete 
						isComplete = true;
					}
				}
				
				
				if (hasPicks && !isComplete) setMatchupsStatus("ready_to_sim")
			
				if (isComplete || week == 0) setMatchupsStatus("sim_complete")
				

			
			}
			// setCurrentMatchups(state.matchups_payload.payload);
			// 	for (const m_id in state.matchups_payload.payload){			//for debug away from local sql
			// 		const match = state.matchups_payload.payload[m_id]
			// 		if (state.user.user_id in match.user_info){
			// 			setMyMatchup({[m_id]: match});
			// 			break;
			// 		}
			// 	}	
		} 
    	catch (error) {
			console.error("Failed to fetch matchup state", error);
		}
		
		
	};
	
	const try_start_draft = async () => {
		try {
	      	const response = await fetch(`http://127.0.0.1:5000/api/draft/start/${leagueId}`, {
				method: 'POST',
				headers: {'Content-Type': 'application/json'}
			});
    	  	const data = await response.json();
			if (!data.success){
				console.error(data.error)
			}	
		} 
    	catch (error) {
			console.error("Failed to start draft", error);
		}
	}
	
	const try_simulate_matchups = async () => {
		try {
	      	const response = await fetch(`http://127.0.0.1:5000/api/matchup/${leagueId}/simulate`, {
				method: 'POST',
				headers: {'Content-Type': 'application/json'}
			});
    	  	const data = await response.json();

			if (!data.success){
				console.error(data.error)
			}	
			if (data.success){
				console.log(data.results)
				setCurrentMatchups(data.results)
				setMatchupsStatus("sim_complete")
			}	
		} 
    	catch (error) {
			console.error("Failed to simulate matches", error);
		}
	}

	const try_create_matchups = async () => {
		
		try {
	      	const response = await fetch(`http://127.0.0.1:5000/api/league/${leagueId}/create_matchups`, {
				method: 'POST',
				headers: {'Content-Type': 'application/json'}
			});

    	  	const data = await response.json();
			if (!data.success){
				console.error(data.error)
			}
			setMatchupsStatus("sim_pending")
			const new_week = week + 1
			dispatch({
				type: "UPDATE_WEEK",
				leagueId: leagueId,
				new_week: new_week
			})
			setWeek(new_week)
				
		} 
    	catch (error) {
			console.error("Failed to fetch matchup state", error);
		}
	}
	


	const admin_button = (state) => {
		switch (state){

			case "draft":
				try_start_draft();
				setRefreshKey(prevKey => prevKey + 1);
				break;
				
			case "ready_to_sim":
				try_simulate_matchups();
				
				setRefreshKey(prevKey => prevKey + 1);
				break;
				
			case "sim_complete":
				try_create_matchups();
				
				
				fetch_current_matchups();
				setRefreshKey(prevKey => prevKey + 1);
				break;

			case "sim_pending":
				window.alert("Not all teams have made their selections")
				break;
			
			default:
				break;

		}
	};

	const renderAdminButton = () => {
		if (!hasTeams) return <button type="button" onClick={() => admin_button("draft")}>Start Draft</button>
		let text = "";
		if (matchupsStatus == "sim_complete" || currentMatchups.status == "completed") text = "Start Next Matchups";
		if (matchupsStatus == "ready_to_sim") text = "Fight!";
		if (matchupsStatus == "sim_pending") text = "Waiting for selections";
		return <button type="button" onClick={() => admin_button(matchupsStatus)}>{text}</button>
	}

	const navigation_button = () => {
		if (Object.keys(myMatchup).length === 0){
			window.alert("You have no matchup for this week!");
		}
		else{
			hasTeams ? navigate(`/my-league/${leagueId}/my-matchup`, {state : myMatchup}) : navigate(`/draft/${leagueId}`)
		}
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
		<div className="league-header">
			<div className="league-info">
				<p><strong>Admin ID:</strong> {leagueState.league_info.admin_id}</p>
				<p><strong># Participants:</strong> {leagueState.league_info.num_participants}</p>
				<p><strong>Join Code:</strong> {leagueState.league_info.join_code}</p>
				<p><strong>week:</strong> {week}</p>
			</div>
			<div className="leaderboard-window">
				<Leaderboard leagueId={leagueId} />
			</div>
		</div>
		<button type="button" onClick={() => navigate(`/my-league/${leagueId}/all-matchups`)}>See All Matchups</button>

		{is_admin && renderAdminButton()}

		
		<button type="button" onClick={navigation_button}>
			{hasTeams ? "Go to my Matchup" : "Go to Draft"}
		</button>
		
      	

		<button type="button" onClick={toggleContent}>{(view == "teams") ? "See Matchups" : "See Teams"}</button>
		<div>{renderContent()}</div>
      	
    </div>
  )
}