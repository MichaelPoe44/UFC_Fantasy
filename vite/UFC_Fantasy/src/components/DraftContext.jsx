import { createContext, useState } from "react";



export const DraftContext = createContext();


export const DraftProvider = ({ children }) => {

    const [status, setStatus] = useState("not_started");
    const [currentRound, setCurrentRound] = useState(null);
    const [currentPickUserId, setCurrentPickUserId] = useState(null);
    const [myUserId, setMyUserId] = useState(null);
    const [leagueId, setLeagueId] = useState(null);
    const [picks, setPicks] = useState([]);
    const [fullFighterPool, setFullFighterPool] = useState({});
    const [loading, setLoading] = useState(true);






    //fetch the fighter pool
    const fetchFighterPool = async () => {
        try{
            const response = await fetch("http://127.0.0.1:5000/api/draft/get_fighter_pool");
            if (!response.ok) throw new Error("Failed to fetch fighter pool");
            const data = await response.json();
            setFullFighterPool(data)
        }
        catch (error){
            console.error("Error fetching fighter pool: ", error)
        }
    }





    //fetch the draft state
    const fetchDraftState = async (leagueId, UserId) => {
        try {
            setLoading(true);
            const response = await fetch(`http://127.0.0.1:5000/api/draft/state/${leageId}`)
            if (!response.ok) throw new Error("Failed to fetch draft state");
            const data = await response.json();

            if (data.success == false){
                throw new Error(data.error);
            }
                
            payload = data.payload;
            setStatus(payload.status);
            setCurrentRound(payload.round);
            setCurrentPickUserId(payload.current_pick_user_id);
            setMyUserId(UserId);
            setPicks(payload.picks || []);
            setLeagueId(leagueId)
        }
        catch (error){
            console.error("Error fetching draft state: ", error);
        }
        finally{
            setLoading(false);
        }

    }




    const makePick = async (fighterName, weightClass) => {
        
        if (!leagueId || !myUserId){ //make sure have the league and myid
            console.error("Missing leagueId or userId needed for making pick")
            return;
        }


        try{
            const response = await fetch("http://127.0.0.1:5000/api/draft/pick", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    league_id: leagueId,
                    user_id: myUserId,
                    fighter_name: fighterName,
                    weight_class: weightClass
                })
            });

            if (!response.ok) throw new Error("Failed to make pick")
            data = await response.json()
            if (data.success == false) throw new Error(data.error)

            
            await fetchDraftState(leagueId)
                
        }
        catch (error){
            console.error("Error making Pick: ", error)
        }
    }



    const isMyTurn = currentPickUserId === myUserId;


    const availableFighters = useMemo(() => {
        if (!fullFighterPool || !picks){ //if no picks or dont have the pool
            return {};
        }

        const pickedFighters = new Set(picks.map((pick) => pick.fighter_name));
        const filteredPool = {};

        for (const [weightClass, rankedFighters] of Object.entries(fullFighterPool)){
            filteredPool[weightClass] = {};
            for (const [rank, name] of Object.entries(rankedFighters)){
                if (!pickedFighters.has(name)){
                    filteredPool[weightClass][rank] = name;
                }
            }
        }

        return filteredPool;
    }, [fullFighterPool, picks])



    return (
        <DraftContext.Provider value={{
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
            loading,
        }}>
            {children}
        </DraftContext.Provider>
    )





















}