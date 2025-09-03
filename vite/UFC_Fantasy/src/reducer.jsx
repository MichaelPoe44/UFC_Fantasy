import { clearState } from "./Storage"

// const initialState = {
//     user: null,
//     leagues: {},
// }


export default function reducer(state, action){
    switch (action.type){
        case "DEBUG":
            return action.state
       
        case "CREATE_LEAGUE":
            return{
                ...state,
                leagues: {...state.leagues, [action.league_id]: action.league}
            }

        case "JOIN_LEAGUE":
            return {
                //fix
                ...state,
                leagues: {...state.leagues, [action.league_id]: action.league}
            } 

        case "REGISTER":
            return {
                ...state,
                user: action.user
            }

        case "LOGIN":

            return {
                ...state,
                user: action.user,
                leagues: action.leagues
            }
        
        case "LOGOUT":
            clearState();
            return {
                user: null,
                leagues: [],
                
            }
        
        case "UPDATE_WEEK":
            const leagueId = action.leagueId
            const new_week = action.new_week;
            return {
                ...state,
                leagues: {
                    ...state.leagues, 
                    [leagueId]: {
                        ...state.leagues[leagueId], 
                        league_info: {
                            ...state.leagues[leagueId].league_info, 
                            current_week: new_week}}}
            }

        case "do something else":
            // do sum else and update state

        default:
            return state;
    }

}