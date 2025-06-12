import { useContext, createContext, useReducer } from "react";
import reducer from "./reducer";


const initialState = {
    user: null,
    leagues: [],
}


const StateContext = createContext();

///should prolly use a reducer to manage teams based on league
export const StateProvider = ({ children }) => {

    const [state, dispatch ] = useReducer(reducer, initialState);
    //https://react.dev/learn/passing-data-deeply-with-context#step-2-use-the-context


    return(
        <StateContext.Provider value={{state, dispatch}}>
            {children}
        </StateContext.Provider>
    );
};


export const getStateContext = () => useContext(StateContext)