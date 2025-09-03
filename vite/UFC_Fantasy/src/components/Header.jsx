import { useEffect, useState } from "react";
import { getStateContext } from "../StateProvider";
import "./styles/Header.css";
import {Link, useLocation} from "react-router-dom";

export default function Header({setShowSidebar, showSidebar}){
    const {state, dispatch} = getStateContext();

    //for checking if on profile
    const [onProfile, setOnProfile] = useState()
    const current_route = useLocation().pathname;
    

    //checks if on profile page everytime new page rendered
    useEffect( () => {
        if (current_route == "/profile") setOnProfile(true);
        else if (current_route != "/profile") setOnProfile(false)
    },[current_route])

    
    const handleLogout = () => {
        if ((state.user != null) && onProfile){
            dispatch({
                type: "LOGOUT"
            })
        }
    }

    return(
        <div className="header">
            
            <img className="drop_down_button" src="/bars.svg" onClick={() => setShowSidebar(!showSidebar)}/>
            
            
            <Link to="/get-started">
                <p style={{position: "absolute", left: "160px", top: "0px"}}>get started</p>
            </Link>

    
            
            <Link to={state.user ? (onProfile ? "/" : "/profile") : "/login"}>
                <button className="logout" onClick={handleLogout}>
                    {state.user ? (onProfile ? "Log Out" : "Profile") : "Log in"}
                </button>
            </Link>
            

        </div>

    )
}