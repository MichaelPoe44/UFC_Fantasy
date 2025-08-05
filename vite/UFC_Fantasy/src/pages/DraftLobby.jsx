import { useEffect, useState, useContext } from "react";
import { getStateContext } from "./StateProvider";
import FighterPool from "../components/FighterPool.jsx";
import DraftBoard from "../components/DraftBoard.jsx";
//import PickTimer from "../components/PickTimer.jsx"; //do i want pick timer?
import { DraftContext} from "../components/DraftContext.jsx";


export default function DraftLobby({ leagueId, UserId }){
    const [state, dispatch] = getStateContext();

    const {
            status,
            currentRound,
            currentPickUserId,
            myUserId,
            leagueId,
            isMyTurn,
            picks,
            fullFighterPool,
            availableFighters,
            fetchDraftState,
            fetchFighterPool,
            makePick,
            loading
        } = useContext(DraftContext);

    const [selectedFighter, setSelectedFighter] = useState(null);

    useEffect( () => {
        fetchDraftState(leagueId, UserId);
        const interval = setInterval(() => fetchDraftState(leagueId,  UserId), 3000); //gets any updates to the state every 3s
        return () => clearInterval(interval); //stops getting updates if leave page
    }, [leagueId]);


    const handlePick = () => {
        if (isMyTurn && selectedFighter) {
            makePick(selectedFighter.name, selectedFighter.weight_class);
            setSelectedFighter(null)
        }
    };



    return(
        <div className="draft_lobby">
            <h2>{state.leagueId.league_info.name} Draft</h2>

            {loading ? (<p>Loading draft...</p>) :(
                <>
                <FighterPool
                    fighters={fighters}
                    onSelect={setSelectedFighter}
                    selectedFighter={selectedFighter}
                />

                <button disabled={!isMyTurn || !selectedFighter} onClick={handlePick}>
                    Draft Selected Fighter
                </button>

                <DraftBoard draftState={draftState} />
                </>
            )}


        </div>
    )}