import './TestMatchup.css';
import { useEffect, useState } from 'react';
import { useLocation, useParams } from 'react-router-dom';
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
	const { leagueId } = useParams();
	const userId = state.user.user_id
	const userTeam = state.leagues[leagueId].league_participants[userId].team;
	const [picks, setPicks] = useState({});



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
    try {
      await fakeApiCall(picks);
      alert('Picks submitted successfully!');
    } catch (error) {
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
        <button className="submit-button" onClick={submitPicks}>Submit Picks</button>
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

// Simulated API call
const fakeApiCall = (picks) => {
  return new Promise((resolve) => {
    console.log('Sending picks to server:', picks);
    setTimeout(resolve, 1000);
  });
};

export default TestMatchup;


