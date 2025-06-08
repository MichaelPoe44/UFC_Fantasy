


{/*async since having to fetch*/}
const get_data = (fighter_name) => {         //my flask endpoint
    return fetch(`http://127.0.0.1:5000/api/fighter?name=${fighter_name}`)//a query string used to send data with request
        .then(response => response.json())  //uses "URL?key=value&key1=value1" ? starts it and keyvalues separated with &
}


export default function Profile({team, change_team}){


    const fighter_stats = get_data("jon-jones")
    
    
    
    //get_data("jon-jones")
    console.log(fighter_stats)

    const log_amount = () => {
        console.log(fighter_stats)
    }

    return(
        <div className="profile">
        
        <button onClick={() => console.log(team)}>this</button>
        <button onClick={log_amount}>log stats</button>


        </div>
    )
}