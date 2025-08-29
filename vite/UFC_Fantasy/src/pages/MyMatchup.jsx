import '../pages_css/MyMatchup.css';
import { useEffect, useState } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { getStateContext } from '../StateProvider';


const weightClasses = [
  'Flyweight',
  'Bantamweight',
  'Featherweight',
  'Lightweight',
  'Welterweight',
  'Middleweight',
  'Light Heavyweight',
  'Heavyweight'
];


const TestMatchup = () => {
  const {state, dispatch} = getStateContext();

	const location = useLocation();
	const myMatchup = location.state || {};
	const matchup_id = Object.keys(myMatchup)[0]
	const { leagueId } = useParams();
	const userId = state.user.user_id
	const userTeam = state.leagues[leagueId].league_participants[userId].team;
	const [picks, setPicks] = useState({});
	const navigate = useNavigate();
	
	
	
	const checkPicks = () => {
		console.log(myMatchup.status)
		
	}
	const [madePicks, setmadePicks] = useState(checkPicks)

    const getOppentId = () => {
		const both_users_id = Object.values(myMatchup)[0].user_info;
		const oppId = Object.keys(both_users_id).filter(id => id != userId);
		return oppId[0];
	}
	const opponentId = getOppentId();
	const opponentTeam = state.leagues[leagueId].league_participants[opponentId].team;




	const handlePick = (weightClass, fighterName) => {
		setPicks(prev => ({
		...prev,
		[weightClass]: fighterName
		}));
	};

  	const submitPicks = async () => {
		if (Object.keys(picks).length != 8){
			alert('Need to pick 1 fighter per weightclass');
			return;
		} 
        
		try {
			if (madePicks){
				window.alert("Already made your Picks");
				return
			}
			const payload = {
				user_id: userId,
				picks: picks
			}
  			const response = await fetch(`http://127.0.0.1:5000/api/matchup/${matchup_id}/submit_pick`, {
				method: 'POST',
				headers: {'Content-Type': 'application/json'},
				body: JSON.stringify(payload)
			})

			const data = await response.json();
			if (data.success) setmadePicks(true)
			if (!data.success) window.alert(data.error)
		} 
	
		catch (error) {
			console.error('Failed to submit picks', error);
		}
	};


	return (
		<div className="matchup-container">
			<div className="team-column">
				<h2>Your Team & Picks</h2>
				{weightClasses.map(wc => (
				<div key={wc} className="weight-class">
					<h3>{wc}</h3>
					<div className="fighter-options">
						{Object.values(userTeam[wc]).map(fighter => (
							<button
							key={fighter}
							className={`fighter-button ${picks[wc] === fighter ? 'selected' : ''}`}
							onClick={() => handlePick(wc, fighter)}
							>
							{fighter}
							</button>
						))}
					</div>
				</div>
				))}
				{madePicks ?
					<button className="submit-button" onClick={() => navigate(-1)}>Go Back</button>
					:
					<button className="submit-button" onClick={submitPicks}>Submit Picks</button>
				}
			</div>

			<div className="team-column opponent">
				<h2>Opponent’s Team</h2>
				{weightClasses.map(wc => (
					<div key={wc} className="weight-class">
						<h3>{wc}</h3>
						<div className="fighter-options">
							{Object.values(opponentTeam[wc]).map(fighter => (
								<div key={fighter} className="opponent-fighter">
									{fighter}
								</div>
							))}
						</div>
					</div>
				))}
			</div>
		</div>
  );
};



export default TestMatchup;


