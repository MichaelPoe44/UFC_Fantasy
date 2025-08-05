import { useState } from "react";
import { getStateContext } from "../StateProvider";
import { useNavigate } from "react-router-dom"
import "../pages_css/Login.css";


const try_login = async (currentUserName, currentPassword, dispatch, navigate, setErrorMessage) => {
    const payload = {
        currentUserName: currentUserName,
        currentPassword: currentPassword
    }

    //send to database
    const response = await fetch("http://127.0.0.1:5000/api/try-login",{
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify(payload)
    });
    const data = await response.json();

    //look at the response
    if (data.success == true){
        dispatch({
            type: "LOGIN",
            user: data.user_data.user,
            leagues: data.user_data.leagues
        })
        navigate("/")
    }
    else if (data.success == false){
        setErrorMessage(data.error)
    }
}


const try_register = async (currentUserName, currentPassword, dispatch, navigate, setErrorMessage) => {
    const payload = {
        username: currentUserName,
        password: currentPassword
    }

    //send to database
    const response = await fetch("http://127.0.0.1:5000/api/register-user", {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify(payload)
    });
    const data = await response.json();
    
    //store in frontend
    if (data.success == true){
        dispatch({
            type: "REGISTER",
            user: data.user
        })
        navigate("/")
    }

    else if (data.success == false){
        setErrorMessage(data.error)
    }
    
}




export default function Login(){
    const {state, dispatch} = getStateContext();
    const navigate = useNavigate();
    const [errorMessage, setErrorMessage] = useState("")

    const [currentUserName, setcurrentUserName] = useState("");
    const [currentPassword, setCurrentPassword] = useState("");


    const register = (e) => {
        e.preventDefault();
        if (currentUserName == ""){
            return;
        }   
        try_register(currentUserName, currentPassword, dispatch, navigate, setErrorMessage)
        //if successful push back to home page or profile
    }

    const login = (e) => {
        e.preventDefault();
        try_login(currentUserName, currentPassword, dispatch, navigate, setErrorMessage);
        //call api
        //get info and dispatch info to context layer

        //push back
    }

    return(
        <div className="login">

            <div className="login_container">
            <h1>Sign In</h1>

            {errorMessage && (
                <div className="error">
                    <p>{errorMessage}</p>
                </div>
            )}

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