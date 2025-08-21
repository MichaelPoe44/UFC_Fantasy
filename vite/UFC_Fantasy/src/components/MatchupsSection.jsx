
import { getStateContext } from '../StateProvider';
import './styles/MatchupsSection.css';

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

// Example props structure:
// matchups = [
//   {
//     team1: { username: "Tom", picks: { Flyweight: "Brandon Moreno", Bantamweight: "Sean O'Malley", ... } },
//     team2: { username: "Mike", picks: { Flyweight: "Tatsuro Taira", Bantamweight: "Cory Sandhagen", ... } }
//   },
//   ...
//    {
//        id: {"Fw": {name: stat}, ...
//        id: {"Fw": {name: stat}, ...
 //   }

// ];

export default function MatchupsSection({ matchups, leagueId }) {
  const { state, dispatch } = getStateContext();

  const matchupArray = Object.values(matchups).map(match => match.user_info);

  return (
    <div className="matchups-section">
      <h2>This Week's Matchups</h2>


      {matchupArray.map((userInfo, index) => {
        const [userId1, userId2] = Object.keys(userInfo);
        const team1 = state.leagues[leagueId].league_participants[userId1];
        const team2 = state.leagues[leagueId].league_participants[userId2];
        const picks1 = userInfo[userId1];
        const picks2 = userInfo[userId2];

        return (
          <div key={index} className="matchup-container">
            <div className="matchup-header">
              <div className="team-name">{team1?.username || `User ${userId1}`}</div>
              <div className="vs"> VS </div>
              <div className="team-name">{team2?.username || `User ${userId2}`}</div>
            </div>

            <div className="matchup-body">
              {weightClasses.map((wc) => {
                const pick1 = picks1?.[wc] ? Object.keys(picks1[wc])[0] : '-';
                const pick2 = picks2?.[wc] ? Object.keys(picks2[wc])[0] : '-';

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
  );
}