import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import FighterPool from '../components/FighterPool.jsx';
import DraftBoard from '../components/DraftBoard.jsx';
import { getStateContext } from '../StateProvider.jsx'; 


//to go to
//<Link to={`/draft/${leagueId}`}> 


export default function DraftLobby(){


  	const {state, dispatch} = getStateContext(); // assume you store id, username, etc.
  	const { leagueId } = useParams();
  	const [draftState, setDraftState] = useState(null);
  	const [fighterPool, setFighterPool] = useState({});
  	const [loading, setLoading] = useState(true);
  	const [error, setError] = useState("");



	const navigate = useNavigate();
  	//make sure the user is actaully in league
  	useEffect(() => {
    	try{
			let in_league = false
			for (const key in state.leagues){
				if (key == leagueId){
					in_league = true;
				}
				
			}
			if (!in_league) navigate('/')
    	}
		catch (error){
			console.error(error)
		}
  	}, [])


  	const fetchDraftState = async () => {
    	try {
	      	const response = await fetch(`http://127.0.0.1:5000/api/draft/state/${leagueId}`);
    	  	const data = await response.json();
			if (!data.success){
				console.error(data.error)
				navigate('/')
			}
      		if (data.success){							//draft state is not updating according
				console.log("payload ", data.payload);	// to the payload
				setDraftState(data.payload);
				console.log("state: ", draftState);
			}
    		} 
    	catch (error) {
      		setError("Failed to fetch draft state", error);
 	   	}
 	};


  	const fetchFighterPool = async () => {
    	try {
      		const response = await fetch(`http://127.0.0.1:5000/api/draft/get_fighter_pool`);
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
			console.log("I WANT TO MAKE PICK: ", state.user.user_id)
        	const response = await fetch("http://127.0.0.1:5000/api/draft/pick", {
            	method: "POST",
            	headers: {"Content-Type": "application/json"},
            	body: JSON.stringify({
                	user_id: state.user.user_id,
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

  	const isMyTurn = state.user.user_id === draftState.current_pick_user;
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
					userId={state.user.user_id}
				/>
				<br/>
				<hr/>
				<DraftBoard picks={draftState.picks} />
				</>
			)}
    	</div>
  );
};

