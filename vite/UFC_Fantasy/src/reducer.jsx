
/*
state{
    user: {
        userName:
        password:    
    },
    leagues: [],
    league_ids: [],
}




const initialState = {
    user: null,
    leagues: [],
    league_ids: [],
}
*/
//mayber keep username logged in state and only store password in backend

//https://www.frontendmag.com/tutorials/usereducer-vs-usestate/
export default function reducer(state, action){
    switch (action.type){
        //should prolly send to the api to store this stuff
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
                leagues: [...state.leagues, action.name],
                league_ids: [...state.league_ids, action.id]
            } 

        case "REGISTER":
            return {
                ...state,
                user: action.user
            }

        case "LOGIN":
            //check if username in database
            //do nothing for now
            return {
                ...state,

            }

        case "do something else":
            // do sum else and update state

        default:
            return state;
    }

}