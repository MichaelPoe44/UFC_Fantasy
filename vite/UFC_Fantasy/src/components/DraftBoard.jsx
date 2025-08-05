// DraftBoard.jsx
import React from 'react';

const DraftBoard = ({ picks }) => {
  return (
    <div className="draft-board">
      <h3>Draft Picks</h3>
      <table>
        <thead>
          <tr>
            <th>User</th>
            <th>Fighter</th>
            <th>Weight Class</th>
            <th>Round</th>
          </tr>
        </thead>
        <tbody>
          {picks.map((pick, idx) => (
            <tr key={idx}>
              <td>{pick.user_id}</td>
              <td>{pick.fighter_name}</td>
              <td>{pick.weight_class}</td>
              <td>{pick.round_picked}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default DraftBoard;
