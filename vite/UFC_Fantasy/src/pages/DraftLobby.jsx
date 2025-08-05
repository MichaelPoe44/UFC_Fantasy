import React, { useEffect, useState, useContext } from 'react';
import axios from 'axios';
import FighterPool from './FighterPool';
import DraftBoard from './DraftBoard';
import { getStateContext } from '../StateProvider.jsx'; // adjust path as needed

const DraftLobby = ({ leagueId }) => {
  const [state, dispatch] = getStateContext(); // assume you store id, username, etc.
  const [draftState, setDraftState] = useState(null);
  const [fighterPool, setFighterPool] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");


  const fetchDraftState = async () => {
    try {
      const response = await fetch(`/api/draft/state/${leagueId}`);
      const data = await response.json();
      if (data.success) setDraftState(data.payload);
    } 
    catch (error) {
      setError("Failed to fetch draft state", error);
    }
  };


  const fetchFighterPool = async () => {
    try {
      const response = await fetch(`/api/draft/get_fighter_pool`);
      const data = await response.json();
      setFighterPool(data);
    } 
    catch (err) {
      setError("Failed to fetch fighter pool", error);
    }
  };



  useEffect(() => {
    const fetchData = async () => {
      await fetchDraftState();
      await fetchFighterPool();
      setLoading(false);
    };
    fetchData();

    const interval = setInterval(fetchDraftState, 3000); // polling
    return () => clearInterval(interval);
  }, []);



  const handlePick = async (fighterName, weightClass) => {
    try {

        const response = await fetch("http://127.0.0.1:5000/api/register-user", {
            method: "POST",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify({
                user_id: user.id,
                league_id: leagueId,
                fighter_name: fighterName,
                weight_class: weightClass
            })
        });
        const data = await response.json();

      if (!data.success) {
        alert(data.error);
      } 
      else {
        await fetchDraftState();
      }
    } 
    catch (error) {
      console.error(error);
    }
  };

  if (loading) return <p>Loading draft...</p>;

  const isMyTurn = state.user.id === draftState.current_pick_user;
  const draftOver = draftState.status === "complete";

  return (
    <div className="draft-lobby">
      <h2>UFC Fantasy Draft</h2>
      <p>Status: {draftState.status}</p>
      <p>Round: {draftState.round}</p>
      <p>Current Pick: {isMyTurn ? "Your turn" : `User ${draftState.current_pick_user}'s turn`}</p>

      {draftOver ? (
        <h3>Draft Completed!</h3>
      ) : (
        <>
          <FighterPool
            fighterPool={fighterPool}
            onPick={handlePick}
            draftState={draftState}
            userId={user.id}
          />

          <DraftBoard picks={draftState.picks} />
        </>
      )}
    </div>
  );
};

export default DraftLobby;