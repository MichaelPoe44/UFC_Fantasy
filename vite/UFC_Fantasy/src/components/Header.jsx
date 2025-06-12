import "./Header.css";
import {Link} from "react-router-dom";

export default function Header(){
    return(
        <div className="header">
            <Link to="/">
                <img className="drop_down_button" src="bars.svg" />
            </Link>
            
            <Link to="/get-started">
                <p style={{position: "absolute", left: "160px", top: "0px"}}>get started</p>
            </Link>


            <Link to="/profile">
                <img className="profile_icon" src="profile.svg"/>
            </Link>
        </div>

    )
}