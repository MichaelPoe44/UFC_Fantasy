
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
    leagues: {
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
                        "team": {
                            "name": name
                            "class": {1: fighter, 2: fighter}
                            "class": {1: fighter, 2: fighter}...
                        }
                    }
                }
        }  
    }
}




const initialState = {
    user: null,
    leagues: {},
}
*/
//mayber keep username logged in state and only store password in backend

//https://www.frontendmag.com/tutorials/usereducer-vs-usestate/
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
            return {
                user: null,
                leagues: [],
                
            }
        
        case "UPDATE_WEEK":
            const new_week = state.leagues[action.leagueId].league_info.current_week + 1;
            return {
                ...state,
                leagues: {...state.leagues, [action.leagueId]: {...state.leagues[action.leagueId], current_week: new_week}}
            }

        case "do something else":
            // do sum else and update state

        default:
            return state;
    }

}