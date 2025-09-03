import { useContext, createContext, useReducer, useEffect } from "react";
import { loadState, saveState } from "./Storage";
import reducer from "./reducer";


const initialState = {
    user: null,
    leagues: {},
};


const StateContext = createContext();

export const StateProvider = ({ children }) => {

    const [state, dispatch ] = useReducer(reducer, loadState() || initialState);//trys to load state first

    useEffect(() => {
        saveState(state);
    }, [state])

    
    return(
        <StateContext.Provider value={{state, dispatch}}>
            {children}
        </StateContext.Provider>
    );
};


export const getStateContext = () => useContext(StateContext)