import { useEffect, useState } from "react"
import TeamDisplay from "../components/TeamDisplay.jsx"
import { getStateContext } from "../StateProvider.jsx";



{/*async since having to fetch*/}
const get_stats = async (fighter_name, set_fighter) => {    //my flask endpoint
    try {     
        const response = await fetch(`http://127.0.0.1:5000/api/fighter?name=${fighter_name}`);//a query string used to send data with request
        const data = await response.json();   //uses "URL?key=value&key1=value1" ? starts it and keyvalues separated with &
        
        set_fighter(data);
    } 
    catch (e) {
        console.error("Error fetching fighter", e);
    }
}



export default function Profile({team, change_team}){
    //////example
    const [user, set_user] = getUserContext();

    const [fighter_stats, set_fighter] = useState({});
    


    //grab stats when page first renders
    useEffect(() => {
        get_stats("jon-jones",set_fighter);
        console.log(fighter_stats);
    },[])
    


    //logs stats when they change (preventing empty json while waiting)
    useEffect(() => {
        console.log(fighter_stats)
    }, [fighter_stats])
    
    //example
    const log_amount = () => {
        console.log(user)
    }

    
    return(
        <div className="profile">
        
        <button onClick={() => console.log(team)}>this</button>
        <button onClick={log_amount}>log stats</button>

        <TeamDisplay />

        </div>
    )
}


