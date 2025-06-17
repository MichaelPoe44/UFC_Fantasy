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
            console.log("ran")
        }
    }, [current_route])


    return(
        <div className="sidebar">
            
            <Navigation name="Home" destination="/"/>


        </div>
    )
}




function Navigation({name, destination, }){

    return(
        <Link to={destination}>
            <div>
                {name}
            </div>
        </Link>
    )
}