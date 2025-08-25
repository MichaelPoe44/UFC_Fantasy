import { getStateContext } from "../StateProvider";
import { useParams } from "react-router-dom";
import "../pages_css/AllMatchups.css"; 
import { useEffect } from "react";

const weightClasses = [
  "Flyweight",
  "Bantamweight",
  "Featherweight",
  "Lightweight",
  "Welterweight",
  "Middleweight",
  "Light Heavyweight",
  "Heavyweight"
];

export default function AllMatchups() {

	const { state, dispatch } = getStateContext();

	const [allMatchups, setAllMatchups] = useState({})
  	const { leagueId } = useParams();

	
	useEffect(() => {
		fetch_all_matchups();
	}, [])

	const fetch_all_matchups = () => {
		
	}


  	return (
    	<div className="all-matchups-page">
		<h1>All Matchups by Week</h1>

		{Object.entries(allMatchups).map(([week, matchups]) => (
			<div key={week} className="week-section">
				<h2>Week {week}</h2>

				{Object.values(matchups).map((match, index) => {
					const userInfo = match.user_info;
					const [userId1, userId2] = Object.keys(userInfo);

					const team1 = state.leagues[leagueId]?.league_participants?.[userId1];
					const team2 = state.leagues[leagueId]?.league_participants?.[userId2];
					const picks1 = userInfo[userId1];
					const picks2 = userInfo[userId2];

					return (
					<div key={index} className="matchup-container">
						<div className="matchup-header">
						<div className="team-name">{team1?.username || `User ${userId1}`}</div>
						<div className="vs">VS</div>
						<div className="team-name">{team2?.username || `User ${userId2}`}</div>
						</div>

						<div className="matchup-body">
							{weightClasses.map((wc) => {
								const pick1 = picks1?.[wc] ? Object.keys(picks1[wc])[0] : "-";
								const pick2 = picks2?.[wc] ? Object.keys(picks2[wc])[0] : "-";

								return (
								<div key={wc} className="matchup-row">
									<div className="fighter-name">{pick1}</div>
									<div className="weight-class-label">{wc}</div>
									<div className="fighter-name">{pick2}</div>
								</div>
								);
							})}
						</div>
					</div>
					);
				})}
			</div>
		))}
		</div>
	);
}