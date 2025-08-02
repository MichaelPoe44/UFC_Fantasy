import mysql.connector 
from mysql.connector import Error
import string 
import secrets

db = mysql.connector.connect(
    host="localhost",
    user="root",
    passwd="Froggy122204",
    database="mytest"
)
db.autocommit = False

"""
Example Use Case Flow
User signs up → insert into users

User creates or joins a league → insert into leagues and league_participants

User builds team → insert into teams, then insert fighters into team_fighters

You can score teams based on real UFC event results and logic you define in backend
"""

mycursor = db.cursor()

#mycursor.execute("CREATE DATABASE mytest")

#mycursor.execute("CREATE TABLE Users (user_id int AUTO_INCREMENT NOT NULL PRIMARY KEY, username varchar(128) NOT NULL UNIQUE, password_hash varchar(128) NOT NULL)")
#mycursor.execute("CREATE TABLE Leagues (league_id int AUTO_INCREMENT NOT NULL PRIMARY KEY, name varchar(128) NOT NULL, admin_id int NOT NULL, num_participants int NOT NULL, join_code varchar(6) NOT NULL UNIQUE, FOREIGN KEY (admin_id) REFERENCES Users(user_id))")

# #many to many users-leagues table     swap order to match name user then league!!!!!!!!!!!!!                                                      So the combo is not repeated            
# mycursor.execute("CREATE TABLE Users_Leagues (league_id int NOT NULL, user_id int NOT NULL, UNIQUE (league_id, user_id), FOREIGN KEY (league_id) REFERENCES Leagues(league_id) ON DELETE CASCADE, FOREIGN KEY (user_id) REFERENCES Users(user_id) ON DELETE CASCADE)")

# #one to many teams table
#mycursor.execute("CREATE TABLE Teams (user_id int NOT NULL, league_id int NOT NULL, name varchar(128) NOT NULL, fighter_name varchar(128), UNIQUE (league_id, user_id), FOREIGN KEY (league_id) REFERENCES Leagues(league_id) ON DELETE CASCADE, FOREIGN KEY (user_id) REFERENCES Users(user_id) ON DELETE CASCADE)")

# mycursor.execute("DESCRIBE Users")
# mycursor.execute("DESCRIBE Leagues")
# # mycursor.execute("DESCRIBE Users_Leagues")
# # mycursor.execute("DESCRIBE Teams")

# for i in mycursor:
#     print(i)
"""
Users
user_id     username    password_hash

Leagues
league_id   name        admin_id        num_participants    join_code

Users_Leagues
league_id   user_id

Teams
user_id     league_id    name       fighter_name  
"""
##################################################################################################################################
#creating a user should take a user and pass a return the user id
def create_user(username, hashedpassword):
    try:
        mycursor.execute("INSERT INTO Users (username, password_hash) VALUES (%s,%s)", (username, hashedpassword))
        db.commit()
        return {"success": True, 
                "user": {
                    "username": username,
                    "user_id": mycursor.lastrowid
                }}
    
    except Error as e:
        db.rollback()
        if "Duplicate entry" in str(e):
            return {"success": False, "error": "Username already exists"}
        else:
            return {"success": False, "error": "Database Error"}


#take league name and creator id and return the league info 
def create_league(name, user_id):

    #to make a unique code
    characters = string.ascii_letters + string.digits
    while True:
        
        code = ''.join(secrets.choice(characters) for i in range(6))
        
        mycursor.execute("SELECT league_id FROM Leagues WHERE join_code = %s", (code,))
        row = mycursor.fetchone()
        if row == None:
            break


    try:
        mycursor.execute("INSERT INTO Leagues (name, admin_id, num_participants, join_code) VALUES (%s,%s,%s,%s)", (name, user_id, 1, code))
        league_id = mycursor.lastrowid

        mycursor.execute("INSERT INTO Users_Leagues (league_id, user_id) VALUES (%s,%s)", (league_id, user_id))

        db.commit()

        mycursor.execute("SELECT username FROM Users WHERE user_id = %s", (user_id,))
        row = mycursor.fetchone()
        username = row[0]
        return {"success": True, "league_id": league_id, "league": {
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
            
        }}
    
    except Error as e:
        db.rollback()
        return {"success": False, "error": "Database Error"}



def join_league(user_id, join_code):
    DEBUG = ""

    mycursor.execute("SELECT * FROM Leagues WHERE join_code = %s", (join_code,))
    row = mycursor.fetchone()
    #if couldnt find a league with that code
    if row == None:
        return {"success": False, "error": "Wrong code or League DNE"}

    league_id = row[0]
    name = row[1]
    admin_id = row[2]
    current_num_participants = row[3]
    
    DEBUG = "1"
    #if user already in that league
    mycursor.execute("SELECT * FROM Users_Leagues WHERE league_id = %s AND user_id = %s", (league_id, user_id))
    if mycursor.fetchone() != None:
        return {"success": False, "eror": "User already in this League"}
    
    DEBUG = "2"
    #now user is not in league already and it exists                Just switching syntax between f string for practice
    try:
        mycursor.execute("INSERT INTO Users_Leagues (league_id, user_id) VALUES (%s,%s)", (league_id, user_id))
        mycursor.execute("UPDATE Leagues SET num_participants = num_participants + 1 WHERE league_id = %s", (league_id,))
        db.commit()
        DEBUG = "3"
        num_participants = current_num_participants + 1
        #now need all other participants in league
        mycursor.execute("SELECT user_id FROM Users_Leagues WHERE league_id = %s",  (league_id,))
        temp_rows = mycursor.fetchall()
        if len(temp_rows) != num_participants:
            return {"success": False, "error": "Error getting information"}
        
        DEBUG = "4"
        league_participants = {} 
        for x in temp_rows:
            participants_id = x[0]
            player_info = {}

            ##can swap name for team name
            ###########################get each player team in here
            mycursor.execute("SELECT username FROM Users WHERE user_id = %s", (participants_id,))
            r = mycursor.fetchone()

            player_info["username"] = r[0]
            league_participants[participants_id] = player_info
        DEBUG = "5"
        return {"success": True, "league_id": league_id,
                "league":{
                    "league_info":{
                        "name": name,
                        "admin_id": admin_id,
                        "num_particpiants": num_participants,
                        "join_code": join_code
                    },
                    "league_participants": league_participants
                }
        }

    except Error as e:
        db.rollback()
        return {"success": False, "error": "Database Error", "debug": DEBUG}



#will need to add info grabing for the teams of each player
def user_login(username):
    
    #look for the user
    mycursor.execute("SELECT user_id FROM Users WHERE username = %s", (username,))
    row = mycursor.fetchone()
    
    #if no user with those credentials
    if row == None:
        return {"success": False, "error": "User not found username or password may be wrong"}
    
    #now we know user matches credentials
    user_id = row[0]

    #get all the leagues they are in and get all the info from them
    mycursor.execute("SELECT league_id FROM Users_Leagues WHERE user_id = %s", (user_id,))
    rows = mycursor.fetchall()

    leagues_in = {}
    for x in rows:
        league_id = x[0]
        league = {}
        league_info = {}

        #grab the league info                         
        mycursor.execute("SELECT * FROM Leagues WHERE league_id = %s", (league_id,))
        temp_row = mycursor.fetchone()
        num_participants = temp_row[3]

        league_info["name"] = temp_row[1]
        league_info["admin_id"] = temp_row[2]
        league_info["num_participants"] = temp_row[3]
        league_info["join_code"] = temp_row[4]
        league["league_info"] = league_info
                    
        #grab the info for each player in that league
        mycursor.execute("SELECT user_id FROM Users_Leagues WHERE league_id = %s", (league_id,))
        temp_rows = mycursor.fetchall()
        if len(temp_rows) != num_participants:
            return {"success": False, "error": "Error getting information"}
        

        league_participants = {} 
        for y in temp_rows:
            participants_id = y[0]
            player_info = {}

            ##can swap name for team name
            ###########################get each player team in here
            mycursor.execute("SELECT username FROM Users WHERE user_id = %s", (participants_id,))
            r = mycursor.fetchone()
            
            player_info["username"] = r[0]

            league_participants[participants_id] = player_info
            league["league_participants"] = league_participants

        
        leagues_in[league_id] = league
    
    all_info = {
        "user": {
            "username": username,
            "user_id": user_id
        },
        "leagues": leagues_in
    }
    
    return {"success": True, "user_data": all_info}


def get_hash_for_user(username):

    mycursor.execute("SELECT password_hash FROM Users WHERE username = %s", (username,))
    row = mycursor.fetchone()
    if (row == None):
        return None
    return row[0]



# print("Users--------------------------------")
# mycursor.execute("SELECT * FROM Users")
# for x in mycursor:
#     print(x)

# print("leagues-------------------------------")
# mycursor.execute("SELECT * FROM Leagues")
# for x in mycursor:
#     print(x)

# print("Users_Leagues-------------------------")
# mycursor.execute("SELECT * FROM Users_Leagues")
# for x in mycursor:
#     print(x)


"""
CREATE TABLE Fighter_pool (
    id INT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(255) NOT NULL,
    weight_class VARCHAR(50) NOT NULL,
    rank INT,                -- 1 to 15
    active BOOLEAN DEFAULT TRUE,
    last_updated DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

!!!!!!!!!!!!!!!!!!!
mycursor.execute("CREATE TABLE Fighter_Pool (fighter_id int PRIMARY KEY AUTO_INCREMENT, name varchar(50) NOT NULL, weight_class varchar(50) NOT NULL, rank int NOT NULL, last_updated DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP)")


def update_fighter_pool(pool):

    #clear out everything in previous table
    mycursor.execute("TRUNCATE TABLE Fighter_Pool")

    for weight_class, rankings in pool.items():

        for rank, fighter in rankings.items():

            mycursor.execute("INSERT INTO Fighter_Pool (name, weight_class, rank) VALUES (%s,%s,%s)", (fighter, weight_class, rank))

"""