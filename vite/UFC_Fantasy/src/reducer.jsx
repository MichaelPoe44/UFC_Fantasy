
/*
backend storage outline:
store every user:
user:{ 
    credentials: { 
        username:
        pass:
        id:
    },   
    leagues_in: [League_id, id, id, id] 
}
store leagues:
League_id:{
    info:{ name, id, date, #participants, score, ect},
    participants: [ 
        username/id:{team, //maybe score},
        username/id:{team, //maybe score}
    ]
}   
---------------------------------------------------------------
in frontend
state{
    user: {
        userName:
        password:
        id:
    },
    leagues_in: [ID, ID, ID],
    leagues: [
        League_id:{
            info:{ name, id, date, #participants, score, ect},
            participants: [ 
                username/id:{team, //maybe score},
                username/id:{team, //maybe score}
            ]
        }   
    ],
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
        
        case "LOGOUT":
            return {
                user: null,
                leagues: [],
                league_ids: []
            }

        case "do something else":
            // do sum else and update state

        default:
            return state;
    }

}