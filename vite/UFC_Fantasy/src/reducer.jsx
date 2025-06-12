
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
*/

//https://www.frontendmag.com/tutorials/usereducer-vs-usestate/
export default function reducer(state, action){
    switch (action.type){

        case "ADD_LEAGUE":
            return {
                ...state,
                leagueNames: [...state.leagueNames, action.league]
            } 

        case "do something else":
            // do sum else and update state

        default:
            return state;
    }

}