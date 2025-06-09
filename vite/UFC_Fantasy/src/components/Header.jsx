import "./Header.css"
import {Link} from "react-router-dom"

export default function Header(){
    return(
        <div className="header">
            {/*temp linkage*/}
            <Link to="/">
            <p className="header_text" id="drop_down_button">Three dots here</p>
            </Link>
            
            <Link to="/profile">
                <p className="header_text" id="profile_button">Profile icon</p>
            </Link>
        </div>

    )
}