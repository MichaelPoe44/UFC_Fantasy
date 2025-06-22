import { useEffect, useRef } from "react";
import "./Sidebar.css"
import { Link, useLocation }  from "react-router-dom";



export default function Sidebar({setShowSidebar, showSidebar}){
    
    //the current and previous route
    const current_route = useLocation().pathname;
    const previous_route = useRef(current_route).current;

    //when route changes will check if current matches old route and close if true
    useEffect( () => {
        if (current_route != previous_route){
            setShowSidebar(false)
        }
    }, [current_route])


    return(
        <div className="sidebar">
            <div className="nav_container">
                <Navigation name="Home" destination="/"/>
                <Navigation name="Profile" destination="/profile"/>
                <Navigation name="Leagues" destination="/league-menu"/>
            </div>


        </div>
    )
}




function Navigation({name, destination, }){

    return(
        <Link to={destination} style={{textDecoration: "none"}}>
            <div className="nav_item">
                {name}
            </div>
        </Link>
    )
}