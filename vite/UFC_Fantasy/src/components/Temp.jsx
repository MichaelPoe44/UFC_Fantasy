import { createContext, useContext, useState, useEffect } from 'react';

const DraftContext = createContext();
export const useDraft = () => useContext(DraftContext);

export const DraftProvider = ({ leagueId, children }) => {
  const { user } = useContext(StateProvider); // your existing state
  const [draftState, setDraftState] = useState(null);
  const [pool, setPool] = useState({});

  useEffect(() => {
    fetch(`/api/draft/get_fighter_pool`)
      .then(res => res.json())
      .then(data => setPool(data));

    const interval = setInterval(() => {
      fetch(`/api/draft/state/${leagueId}`)
        .then(res => res.json())
        .then(data => setDraftState(data.payload));
    }, 2000);
    return () => clearInterval(interval);
  }, [leagueId]);

  const makePick = (fighter) => {
    return fetch('/api/draft/pick', {
      method: 'POST',
      headers: { 'Content-Type':'application/json' },
      body: JSON.stringify({ league_id: leagueId, user_id: user.id, fighter_name: fighter.name, weight_class: fighter.weight_class })
    }).then(res => res.json());
  };

  return (
    <DraftContext.Provider value={{ draftState, pool, makePick, user }}>
      {children}
    </DraftContext.Provider>
  );
};