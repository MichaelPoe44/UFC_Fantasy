
/*
backend storage outline:
store every user:
user:{ 
    credentials: { 
        username:
        pass:
        id:
    },   
}
User_leagues   
    user and league id 

store leagues:
League_id:{
    info:{ name, id, admin, #participants,join code,  score, ect},
    
}
}   
---------------------------------------------------------------
in frontend
state{
    user: {
        userName:
        password: //maybe dont store password in front end
        id:
    },
    leagues_in: [ID, ID, ID],
    leagues: [
        league_id: {
                "league_info":{
                    "name": name,
                    "admin_id": user_id,
                    "num_particpiants": 1,
                    "join_code": code
                },
                "league_participants":{
                    user_id:{
                        "username": username
                    }
                }
            }  
    ],
}




const initialState = {
    user: null,
    leagues: [],
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
                //fix
                ...state,
                leagues: [...state.leagues, action.name],
                league_ids: [...state.league_ids, uniqueID]
            }

        case "JOIN_LEAGUE":
            return {
                //fix
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

            return {
                ...state,
                user: action.user,
                leagues: action.leagues
            }
        
        case "LOGOUT":
            return {
                user: null,
                leagues: [],
                
            }

        case "do something else":
            // do sum else and update state

        default:
            return state;
    }

}