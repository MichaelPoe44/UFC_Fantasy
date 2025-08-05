import { useState } from "react";
import { DraftContext } from "./DraftContext";


const weightClasses = [
    "Flyweight",
    "Bantamweight",
    "Featherweight",
    "Lightweight",
    "Welterweight",
    "Middleweight",
    "Light Heavyweight",
    "Heavyweight"
]

export default function FighterPool({ fighters, onSelect, selectedFighter }){
    
    const [filter, setFilter] = useState("All");
    
    const filtered = (filter == "All") ? fighters : fighters.filter(f => f.weight_class === filter)
    
    
    return(
        <div className="fighter_pool">

            <h3>Available Fighters</h3>
            <select onChange={e => setFilter(e.target.value)} value={filter}>
                <option value="All">All</option>
                {weightClasses.map(wc => (
                    <option key={wc} value={wc}>{wc}</option>
                ))}
            </select>
            
            <ul className="fighter_list">
                {filtered.map(f => (
                    <li
                        key={f.name}
                        className={(selectedFighter?.name === f.name) ? "selected" : ""}
                        onClick={() => onSelect(f)}
                    >
                        {f.name} ({f.weight_class})    
                    </li>
                ))}
        
            </ul>

        </div>
    )
}