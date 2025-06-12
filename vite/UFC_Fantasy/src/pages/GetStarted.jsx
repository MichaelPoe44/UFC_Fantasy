import React, { useState } from 'react';
/*
function GetStarted() {
  const [showInput1, setShowInput1] = useState(false);
  const [showInput2, setShowInput2] = useState(false);

  return (
    <div style={{ padding: '20px' }}>
      <h1>Input Revealer</h1>

      <button onClick={() => setShowInput1(true)}>Show Input 1</button>
      {showInput1 && (
        <div>
          <input type="text" placeholder="Enter something for Input 1" />
        </div>
      )}

      <button onClick={() => setShowInput2(true)} style={{ marginLeft: '10px' }}>
        Show Input 2
      </button>
      {showInput2 && (
        <div>
          <input type="text" placeholder="Enter something for Input 2" />
        </div>
      )}
    </div>
  );
}

export default GetStarted;
*/
import "./GetStarted.css"

function GetStarted() {
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [showJoinForm, setShowJoinForm] = useState(false);
  const [leagueName, setLeagueName] = useState('');
  const [joinCode, setJoinCode] = useState('');

  const handleCreate = () => {

  }
  const handleJoin = () => {
    
  }
  return(
    <div className="league-container">
      <h1>🏆 UFC Fantasy Leagues</h1>

      <div className="card">
        <button className="toggle-btn" onClick={() => setShowCreateForm(!showCreateForm)}>
          {showCreateForm ? 'Cancel' : 'Create a League'}
        </button>
        {showCreateForm && (
          <form className="form" onSubmit={handleCreate}>
            <input
              type="text"
              placeholder="Enter league name"
              value={leagueName}
              onChange={(e) => setLeagueName(e.target.value)}
              required
            />
            <button type="submit">Create</button>
          </form>
        )}
      </div>

      <div className="card">
        <button className="toggle-btn" onClick={() => setShowJoinForm(!showJoinForm)}>
          {showJoinForm ? 'Cancel' : 'Join a League'}
        </button>
        {showJoinForm && (
          <form className="form" onSubmit={handleJoin}>
            <input
              type="text"
              placeholder="Enter league code"
              value={joinCode}
              onChange={(e) => setJoinCode(e.target.value)}
              required
            />
            <button type="submit">Join</button>
          </form>
        )}
      </div>
    </div>

  );
}

export default GetStarted;




