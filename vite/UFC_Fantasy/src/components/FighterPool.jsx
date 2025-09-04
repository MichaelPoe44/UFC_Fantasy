import { useState } from 'react';
import "./styles/FighterPool.css"

export default function FighterPool({ fighterPool, onPick, draftState, userId }){
    const [selectedWeight, setSelectedWeight] = useState("Lightweight");

    const picks = draftState.picks.filter(pick => pick.user_id === userId);

    const countInClass = (weightClass) => picks.filter(p => p.weight_class === weightClass).length;


    const isTaken = (name, weightClass) => draftState.picks.some(p => p.fighter_name === name && p.weight_class === weightClass);

  	const handleSelect = (name) => {
    	if (countInClass(selectedWeight) >= 2) {
      		alert("You already have 2 fighters in this weight class.");
      		return;
    	}

    	onPick(name, selectedWeight);
  	};

  	return (
		<div className="fighter-pool">
			<h3>Available Fighters</h3>
			<select value={selectedWeight} onChange={(e) => setSelectedWeight(e.target.value)}>
				{Object.keys(fighterPool).map(weight => (
					<option key={weight}>{weight}</option>
				))}
			</select>

			<div className="fighters-list">
				{Object.entries(fighterPool[selectedWeight])
				.sort((a, b) => a[0] - b[0]) // sort by ranking
				.map(([rank, name]) => (
					<button
					key={name}
					disabled={isTaken(name, selectedWeight)}
					onClick={() => handleSelect(name)}
					className="fighter-button"
					>
					#{rank} - {name} {isTaken(name, selectedWeight) && "(Taken)"}
					</button>
				))}
			</div>
		</div>
  );
};

