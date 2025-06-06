import { useState } from "react"


export default function GetStarted({team, change_team}){
    const [name, setName] = useState("");
    
    const add_team = () => {
        change_team([...team,
            name
        ])
        console.log(team)
    }



    return(
        <div className="getstarted">
            <input 
                type="text"
                value={name}
                onChange={e => setName(e.target.value)}
            />

            <button onClick={add_team}>
                Add
            </button>

            <button onClick={() => console.log(team)}>print</button>
        </div>
    )
}