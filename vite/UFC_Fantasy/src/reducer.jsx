
/*
state{
user: {
    id:
    username:
    pass:
    leagues: [
        leagueName:{
            id:
            members: [usernmaes]
            roster:
        }
 
    ]},
}




const initialState = {
    user: null,
    leagues: [],
    league_ids: [],
}
*/

//https://www.frontendmag.com/tutorials/usereducer-vs-usestate/
export default function reducer(state, action){
    switch (action.type){

        case "CREATE_LEAGUE":
            const uniqueID = (Date.now() * Math.random()).toString().substring(0,5)
            return{
                ...state,
                leagues: [...state.leagues, action.name],
                league_ids: [...state.league_ids, uniqueID]
            }
        case "JOIN_LEAGUE":
            return {
                ...state,
                leagues: [...state.leagues, action.name]
            } 

        case "do something else":
            // do sum else and update state

        default:
            return state;
    }

}