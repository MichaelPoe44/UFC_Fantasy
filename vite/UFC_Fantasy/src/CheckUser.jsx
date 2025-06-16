import { useEffect } from "react";
import { getStateContext } from "./StateProvider";


//check the user everytime page is updated
export default function CheckUser(){
    const {state, dispatch} = getStateContext();

    useEffect( () => {
        
    }, [])

    return null;
}