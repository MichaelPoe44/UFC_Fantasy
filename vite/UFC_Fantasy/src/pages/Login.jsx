import { useState } from "react";
import { getStateContext } from "../StateProvider";
import "../pages_css/Login.css"






export default function Login(){
    const {state, dispatch} = getStateContext();


    const [userName, setUserName] = useState("");
    const [password, setPassword] = useState("");


    const register = (e) => {
        e.preventDefault();
        dispatch({
            type: "REGISTER",
            user: {
                userName: userName,
                password: password,
            }
        })

        //push back
    }

    const login = (e) => {
        e.preventDefault();
        dispatch({
            type: "LOGIN",
            user: {
                userName: userName,
                password: password,
            }
        })
        //push back
    }

    return(
        <div className="login">

            <div className="login_container">
            <h1>Sign In</h1>

            <form>
                <h5>Username</h5>
                <input type="text" value={userName} placeholder="Username" onChange={(e) => setUserName(e.target.value)}></input>

                <h5>Password</h5>
                <input type="password" value={password} placeholder="Password" onChange={(e) => setPassword(e.target.value)}></input>
            
                <button className="logInButton" type="submit" onClick={login}>Log In</button>
                <button className="registerButton" type="submit" onClick={register}>Register</button>
            </form>
            </div>

        </div>
    )
}