import { useState } from "react";
import { getStateContext } from "../StateProvider";
import "./Header.css";
import {Link} from "react-router-dom";

export default function Header(){
    const {state, dispatch} = getStateContext();

    const [onProfile, setOnProfile] = useState(false)

    return(
        <div className="header">
            <Link to="/">
                <img className="drop_down_button" src="bars.svg" />
            </Link>
            
            <Link to="/get-started">
                <p style={{position: "absolute", left: "160px", top: "0px"}}>get started</p>
            </Link>

            {/*check if on profile page if are change icon to sign out button 
            
            {onProfile && 
                <link>
                <sign out button>
            }
            */}
        
            <Link to="/profile">
                <img className="profile_icon" src="profile.svg"/>
                <p className="hello">
                    Hello {state.user ? "Guest" : state.user.userName}
                </p>
            </Link>
        </div>

    )
}