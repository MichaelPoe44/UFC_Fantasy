import React, { useEffect, useState } from 'react';
// import FighterCard from '../components/FighterCard';
// import WeightClassPicker from '../components/WeightClassPicker';
import { getStateContext } from '../StateProvider';

export default function Matchup(matchupState){
	const {state, dispatch} = getStateContext();

		
	const { leagueId } = useParams();
	
	const [picks, setPicks] = useState({});
	const [submitted, setSubmitted] = useState(false);





	const handlePick = (weightClass, fighterId) => {
		setPicks(prev => ({
		...prev,
		[weightClass]: fighterId
		}));
	};

	const handleSubmit = () => {
		const matchupId = matchup.id;

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

	if (!matchup || !userTeam.length) return <div>Loading matchup...</div>;
	if (submitted) return <div>Your picks have been submitted!</div>;

	const uniqueWeightClasses = [...new Set(userTeam.map(f => f.weight_class))];

	return (
		<div>
		<h2>Matchup: You vs {matchup.user1_id === currentUserId ? matchup.user2_name : matchup.user1_name}</h2>

		<h3>Your Team</h3>
		<div className="team-list">
			{userTeam.map(f => <FighterCard key={f.id} fighter={f} />)}
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
