import "./Header.css";
import {Link} from "react-router-dom";

export default function Header(){
    return(
        <div className="header">
            {/*temp linkage*/}
            <Link to="/">
                <img className="drop_down_button" src="bars.svg" />
            </Link>
            
            <Link to="/profile">
                <img className="profile_icon" src="profile.svg"/>
            </Link>
        </div>

    )
}