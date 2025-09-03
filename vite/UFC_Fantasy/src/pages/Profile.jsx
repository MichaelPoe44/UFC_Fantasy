import { getStateContext } from "../StateProvider.jsx";
import { useNavigate } from "react-router-dom";
import "../pages_css/Profile.css"



export default function Profile(){
    
    const {state, dispatch} = getStateContext();
    const navigate = useNavigate();
    
    
    const handleClick = (leagueId) => {
        navigate(`/my-league/${leagueId}`)  
    }
    

    return(
        <div className="profile-container">
            <h1 className="profile-title">My Leagues</h1>
            <div className="league-list">
                {Object.entries(state.leagues).map(([leagueId, leagueObj]) => {
                    const info = leagueObj.league_info;
                    return (
                        <button
                            key={leagueId}
                            className="league-button"
                            onClick={() => handleClick(leagueId)}
                            
                        >
                            <div className="league-content">
                                <h2 className="league-name">{info.name || `League ID: ${leagueId}`}</h2>

                            </div>
                        </button>
                    );
                })}
            </div>
        </div>
    )
}


