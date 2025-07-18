import { useState } from "react";
import { getStateContext } from "../StateProvider";
import "../pages_css/Login.css";


const try_login = async (currentUserName, currentPassword, dispatch) => {
    const response = await fetch("http://127.0.0.1:5000/api/try-login");
    const user_info = await response.json();
    console.log(user_info);
    dispatch({
            type: "LOGIN",
            user: user_info.user,
            leagues: user_info.leagues
        })
}




export default function Login(){
    const {state, dispatch} = getStateContext();


    const [currentUserName, setcurrentUserName] = useState("");
    const [currentPassword, setCurrentPassword] = useState("");


    const register = (e) => {
        e.preventDefault();
        //call api
        //get info and dispatch info to context layer
        dispatch({
            type: "REGISTER",
            user: {
                userName: currentUserName,
                password: currentPassword,
            }
        })

        //push back
    }

    const login = (e) => {
        e.preventDefault();
        try_login(currentUserName, currentPassword, dispatch);
        //call api
        //get info and dispatch info to context layer

        //push back
    }

    return(
        <div className="login">

            <div className="login_container">
            <h1>Sign In</h1>

            <form>
                <h5>Username</h5>
                <input type="text" value={currentUserName} placeholder="Username" onChange={(e) => setcurrentUserName(e.target.value)}></input>

                <h5>Password</h5>
                <input type="password" value={currentPassword} placeholder="Password" onChange={(e) => setCurrentPassword(e.target.value)}></input>
            
                <button className="logInButton" type="submit" onClick={login}>Log In</button>
                <button className="registerButton" type="submit" onClick={register}>Register</button>
            </form>
            </div>

        </div>
    )
}