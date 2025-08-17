import { useEffect, useState } from 'react';
import { useLocation, useParams } from 'react-router-dom';
// import FighterCard from '../components/FighterCard';
// import WeightClassPicker from '../components/WeightClassPicker';
import { getStateContext } from '../StateProvider';

export default function MyMatchup(){
	const {state, dispatch} = getStateContext();

	const location = useLocation();
	const myMatchup = location.state || {};
	const { leagueId } = useParams();
	const userId = state.user.user_id
	const userTeam = state.leagues[leagueId].league_participants[userId].team
	const [picks, setPicks] = useState({});
	const [submitted, setSubmitted] = useState(false);

	
	console.log("matchup: ", myMatchup)
	


	const handlePick = (weightClass, fighterId) => {
		setPicks(prev => ({
		...prev,
		[weightClass]: fighterId
		}));
	};

	const handleSubmit = () => {
		const matchupId = Object.keys(myMatchup[0]);

		Promise.all(Object.entries(picks).map(([weightClass, fighterId]) => {
		return fetch(`/api/matchup/${matchupId}/submit_pick`, {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({
			user_id: currentUserId,
			weight_class: weightClass,
			fighter_id: fighterId
			})
		});
		})).then(() => {
		setSubmitted(true);
		});
	};

	
	if (submitted) return <div>Your picks have been submitted!</div>;

	console.log(userTeam)
	const uniqueWeightClasses = [...new Set(Object.keys(userTeam))];

	return (
		<div>
		<h2>Matchup: You vs </h2>

		<h3>Your Team</h3>
		<div className="team-list">
			{Object.entries(userTeam).map(([weightClass, fighters_obj]) => {
				<FighterCard />
			})}
		</div>

		<h3>Your Picks</h3>
		{uniqueWeightClasses.map(wc => (
			<WeightClassPicker
			key={wc}
			weightClass={wc}
			fighters={userTeam.filter(f => f.weight_class === wc)}
			onPick={handlePick}
			selectedId={picks[wc]}
			/>
		))}

		<button onClick={handleSubmit} disabled={submitted || Object.keys(picks).length !== uniqueWeightClasses.length}>
			Submit Picks
		</button>

		<h3>Opponent's Team</h3>
		<div className="team-list">
			{opponentTeam.map(f => <FighterCard key={f.id} fighter={f} />)}
		</div>
		</div>
	);
};
