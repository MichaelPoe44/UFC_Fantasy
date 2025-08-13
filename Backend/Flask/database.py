import mysql.connector 
from mysql.connector import Error
import string 
import secrets
import json


host="localhost"
user="root"
passwd="Froggy122204"
database="mytest"




"""
Example Use Case Flow
User signs up → insert into users

User creates or joins a league → insert into leagues and league_participants

User builds team → insert into teams, then insert fighters into team_fighters

You can score teams based on real UFC event results and logic you define in backend
"""



#mycursor.execute("CREATE DATABASE mytest")

#mycursor.execute("CREATE TABLE Users (user_id int AUTO_INCREMENT NOT NULL PRIMARY KEY, username varchar(128) NOT NULL UNIQUE, password_hash varchar(128) NOT NULL)")
#mycursor.execute("CREATE TABLE Leagues (league_id int AUTO_INCREMENT NOT NULL PRIMARY KEY, name varchar(128) NOT NULL, admin_id int NOT NULL, num_participants int NOT NULL, join_code varchar(6) NOT NULL UNIQUE, FOREIGN KEY (admin_id) REFERENCES Users(user_id))")

# #many to many users-leagues table     swap order to match name user then league!!!!!!!!!!!!!                                                      So the combo is not repeated            
# mycursor.execute("CREATE TABLE Users_Leagues (league_id int NOT NULL, user_id int NOT NULL, UNIQUE (league_id, user_id), FOREIGN KEY (league_id) REFERENCES Leagues(league_id) ON DELETE CASCADE, FOREIGN KEY (user_id) REFERENCES Users(user_id) ON DELETE CASCADE)")

# #one to many teams table
#mycursor.execute("CREATE TABLE Teams (user_id int NOT NULL, league_id int NOT NULL, name varchar(128) NOT NULL, Flyweight_1 varchar(50), Bantamweight_1 varchar(50), Featherweight_1 varchar(50), Lightweight_1 varchar(50), Welterweight_1 varchar(50), Middleweight_1 varchar(50), Light_Heavyweight_1 varchar(50), Heavyweight_1 varchar(50), Flyweight_2 varchar(50), Bantamweight_2 varchar(50), Featherweight_2 varchar(50), Lightweight_2 varchar(50), Welterweight_2 varchar(50), Middleweight_2 varchar(50), Light_Heavyweight_2 varchar(50), Heavyweight_2 varchar(50), UNIQUE (league_id, user_id), FOREIGN KEY (league_id) REFERENCES Leagues(league_id) ON DELETE CASCADE, FOREIGN KEY (user_id) REFERENCES Users(user_id) ON DELETE CASCADE)")

#fighter pool
# mycursor.execute("CREATE TABLE Fighter_Pool (fighter_id int PRIMARY KEY AUTO_INCREMENT, name varchar(50) NOT NULL, weight_class varchar(50) NOT NULL, ranking int NOT NULL, last_updated DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP)")

#league draft tables
# mycursor.execute("CREATE TABLE League_Drafts (id int PRIMARY KEY AUTO_INCREMENT, league_id int NOT NULL, current_round int NOT NULL, current_pick_user_id int NOT NULL, total_rounds int NOT NULL, draft_order JSON NOT NULL, status ENUM('not_started', 'in_progress', 'complete'), FOREIGN KEY (league_id) REFERENCES Leagues(league_id), FOREIGN KEY (current_pick_user_id) REFERENCES Users(user_id))")                                                                                     
# mycursor.execute("CREATE TABLE Draft_Picks (id int PRIMARY KEY AUTO_INCREMENT, league_id int NOT NULL, user_id int NOT NULL, fighter_name varchar(50) NOT NULL, weight_class varchar(50) NOT NULL, round_picked int NOT NULL, FOREIGN KEY (league_id) REFERENCES Leagues(league_id), FOREIGN KEY (user_id) REFERENCES Users(user_id))")





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
#users and leagues handling

#creating a user should take a user and pass a return the user id
def create_user(username, hashedpassword):

    #create connection  
    db = mysql.connector.connect(
        host=host,
        user=user,
        passwd=passwd,
        database=database
    )
    db.autocommit = False
    mycursor = db.cursor()

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
    
    finally:
        mycursor.close()
        db.close()


#take league name and creator id and return the league info 
def create_league(name, user_id):


    db = mysql.connector.connect(
            host=host,
            user=user,
            passwd=passwd,
            database=database
        )
    db.autocommit = False
    mycursor = db.cursor()


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
    
    finally:
        mycursor.close()
        db.close()



def join_league(user_id, join_code):

    db = mysql.connector.connect(
            host=host,
            user=user,
            passwd=passwd,
            database=database
        )
    db.autocommit = False
    mycursor = db.cursor()


    mycursor.execute("SELECT * FROM Leagues WHERE join_code = %s", (join_code,))
    row = mycursor.fetchone()
    #if couldnt find a league with that code
    if row == None:
        mycursor.close()
        db.close()
        return {"success": False, "error": "Wrong code or League DNE"}

    league_id = row[0]
    name = row[1]
    admin_id = row[2]
    current_num_participants = row[3]
    

    #if user already in that league
    mycursor.execute("SELECT * FROM Users_Leagues WHERE league_id = %s AND user_id = %s", (league_id, user_id))
    if mycursor.fetchone() != None:
        mycursor.close()
        db.close()
        return {"success": False, "error": "User already in this League"}
    

    #now user is not in league already and it exists                Just switching syntax between f string for practice
    try:
        mycursor.execute("INSERT INTO Users_Leagues (league_id, user_id) VALUES (%s,%s)", (league_id, user_id))
        mycursor.execute("UPDATE Leagues SET num_participants = num_participants + 1 WHERE league_id = %s", (league_id,))
        db.commit()

        num_participants = current_num_participants + 1
        #now need all other participants in league
        mycursor.execute("SELECT user_id FROM Users_Leagues WHERE league_id = %s",  (league_id,))
        temp_rows = mycursor.fetchall()
        if len(temp_rows) != num_participants:
            return {"success": False, "error": "Error getting information"}
        
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
        return {"success": False, "error": "Database Error"}
    
    finally:
        mycursor.close()
        db.close()



#will need to add info grabing for the teams of each player
def user_login(username):

    #create connection  
    db = mysql.connector.connect(
        host=host,
        user=user,
        passwd=passwd,
        database=database
    )
    db.autocommit = False
    mycursor = db.cursor()


    all_team_columns = "name, Flyweight_1, Bantamweight_1, Featherweight_1, Lightweight_1, Welterweight_1, Middleweight_1, Light_Heavyweight_1, Heavyweight_1, Flyweight_2, Bantamweight_2, Featherweight_2, Lightweight_2, Welterweight_2, Middleweight_2, Light_Heavyweight_2, Heavyweight_2"

    #look for the user
    mycursor.execute("SELECT user_id FROM Users WHERE username = %s", (username,))
    row = mycursor.fetchone()
    
    #if no user with those credentials
    if row == None:
        mycursor.close()
        db.close()
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
            mycursor.close()
            db.close()
            return {"success": False, "error": "Error getting information"}
        

        league_participants = {} 
        for y in temp_rows:
            participants_id = y[0]
            player_info = {}

            mycursor.execute("SELECT username FROM Users WHERE user_id = %s", (participants_id,))
            r = mycursor.fetchone()
            
            player_info["username"] = r[0]


            query = f"SELECT {all_team_columns} FROM Teams WHERE user_id = %s AND league_id = %s"
            mycursor.execute(query, (user_id, league_id))
            row = mycursor.fetchone()

            if (row != None): #make sure player has a team
                team = {}
                team["name"] = row[0]
                
                team["Flyweight"] = {"1": row[1], "2": row[9]}
                team["Bantamweight"] = {"1": row[2], "2": row[10]}
                team["Featherweight"] = {"1": row[3], "2": row[11]}
                team["Lightweight"] = {"1": row[4], "2": row[12]}
                team["Welterweight"] = {"1": row[5], "2": row[13]}
                team["Middleweight"] = {"1": row[6], "2": row[14]}
                team["Light Heavyweight"] = {"1": row[7], "2": row[15]}
                team["Heavyweight"] = {"1": row[8], "2": row[16]}
                
            
                player_info["team"] = team

            else: #player has no team
                player_info["team"] = None

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
    
    
    mycursor.close()
    db.close()
    return {"success": True, "user_data": all_info}


def get_hash_for_user(username):

    #create connection  
    db = mysql.connector.connect(
        host=host,
        user=user,
        passwd=passwd,
        database=database
    )
    db.autocommit = False
    mycursor = db.cursor()


    mycursor.execute("SELECT password_hash FROM Users WHERE username = %s", (username,))
    row = mycursor.fetchone()
    if (row == None):
        mycursor.close()
        db.close()
        return None
    
    mycursor.close()
    db.close()
    return row[0]


def get_league_members(league_id):

    #create connection  
    db = mysql.connector.connect(
        host=host,
        user=user,
        passwd=passwd,
        database=database
    )
    db.autocommit = False
    mycursor = db.cursor()


    mycursor.execute("SELECT user_id FROM Users_Leagues WHERE league_id = %s", (league_id,))
    rows = mycursor.fetchall()
    
    participants = {}
    for x in rows:
        participant_id = x[0]
        mycursor.execute("SELECT username FROM Users WHERE user_id = %s", (participant_id,))
        row = mycursor.fetchone()
        participants[participant_id] = row[0]

    mycursor.close()
    db.close()
    return participants

#####################################################################################
#fighters and drafting

def update_fighter_pool(pool):
    
    #create connection  
    db = mysql.connector.connect(
        host=host,
        user=user,
        passwd=passwd,
        database=database
    )
    db.autocommit = False
    mycursor = db.cursor()


    #clear out everything in previous table
    mycursor.execute("TRUNCATE TABLE Fighter_Pool")

    for weight_class, rankings in pool.items():
        for rank, fighter in rankings.items():
            mycursor.execute("INSERT INTO Fighter_Pool (name, weight_class, ranking) VALUES (%s,%s,%s)", (fighter, weight_class, rank))
    
    db.commit()
    mycursor.close()
    db.close()

def get_fighter_pool():

    #create connection  
    db = mysql.connector.connect(
        host=host,
        user=user,
        passwd=passwd,
        database=database
    )
    db.autocommit = False
    mycursor = db.cursor()


    #weight_class: {rank: name, rank:name}
    fighter_pool = {
        "Flyweight": {},
        "Bantamweight":{},
        "Featherweight":{},
        "Lightweight":{},
        "Welterweight":{},
        "Middleweight":{},
        "Light Heavyweight":{},
        "Heavyweight":{}
    }
    
    for weight_class in fighter_pool:
        mycursor.execute("SELECT name, ranking FROM Fighter_Pool WHERE weight_class = %s", (weight_class,))
        rows = mycursor.fetchall()

        for row in rows:
            (fighter_name, rank) = row
            fighter_pool[weight_class][rank] = fighter_name

    mycursor.close()
    db.close()
    return fighter_pool



def print_my_info():
    db = mysql.connector.connect(
        host=host,
        user=user,
        passwd=passwd,
        database=database
    )
    db.autocommit = False
    mycursor = db.cursor()

    # print("Users--------------------------------")
    # mycursor.execute("SELECT * FROM Users")
    # for x in mycursor:
    #     print(x)

    # print("leagues-------------------------------")
    # mycursor.execute("SELECT * FROM Leagues")
    # for x in mycursor:
    #     print(x)

    # print("Teams-------------------------------")
    # mycursor.execute("SELECT * FROM Teams")
    # for x in mycursor:
    #     print(x)

    # print("Users_Leagues-------------------------")
    # mycursor.execute("SELECT * FROM Users_Leagues")
    # for x in mycursor:
    #     print(x)

    # print("Fighter_Pool-------------------------")
    # mycursor.execute("SELECT * FROM Fighter_Pool")
    # for x in mycursor:
    #     print(x)

    # print("League_Drafts-------------------------")
    # mycursor.execute("SELECT * FROM League_Drafts")
    # for x in mycursor:
    #     print(x)

    # print("Draft_Picks-------------------------")
    # mycursor.execute("SELECT * FROM Draft_Picks")
    # for x in mycursor:
        # print(x)
    
    # mycursor.execute("DESCRIBE Teams")
    # for x in mycursor:
    #     print(x)

    mycursor.close()
    db.close()









def start_draft(league_id, draft_order, total_rounds):

    #create connection  
    db = mysql.connector.connect(
        host=host,
        user=user,
        passwd=passwd,
        database=database
    )
    db.autocommit = False
    mycursor = db.cursor()


    #check if draft aleardy started
    mycursor.execute("SELECT status FROM League_Drafts WHERE league_id = %s", (league_id,))
    row = mycursor.fetchone()

    if row:
        mycursor.close()
        db.close()
        return{"success": False, "error":"League already started/completed draft"}


    current_pick = draft_order[0]

    try:
        draft_order_json = json.dumps(draft_order)
        mycursor.execute("INSERT INTO League_Drafts (league_id, current_round, current_pick_user_id, total_rounds, draft_order, status) VALUES (%s,%s,%s,%s,%s,%s)", (league_id, 1, current_pick, total_rounds, draft_order_json, "in_progress"))
        db.commit()
        return {"success":True, "draft_info":{
            "current_pick": current_pick,
            "draft_order": draft_order
        }}

    except Error as e:
        db.rollback()
        return {"success": False, "error": "Database Error"}
    
    finally:
        mycursor.close()
        db.close()
    
  

def draft_pick(league_id, user_id, fighter_name, weight_class):

    #create connection  
    db = mysql.connector.connect(
        host=host,
        user=user,
        passwd=passwd,
        database=database
    )
    db.autocommit = False
    mycursor = db.cursor()


    #assume can make the pick after checking the state

    try:
        mycursor.execute("SELECT draft_order, current_round, total_rounds FROM League_Drafts where league_id = %s", (league_id,)) 
        row = mycursor.fetchone()
        order, current_round, total_rounds = row
        draft_order = json.loads(order)

        mycursor.execute("INSERT INTO Draft_Picks (league_id, user_id, fighter_name, weight_class, round_picked) VALUES (%s,%s,%s,%s,%s)", (league_id, user_id, fighter_name, weight_class, current_round))


        #find the next turn using snake draft
        #last player of round 1 starts round 2 and goes in reverse
        
        is_end_of_draft = False
        is_end_of_round = False
        position = draft_order.index(user_id)
        length = len(draft_order)
        is_last = True if (position % length == (length - 1)) else False
        is_first = True if (position % length == 0) else False
        is_odd_round = True if (current_round % 2 == 1) else False 
        

        if is_odd_round:
            if (not is_last):
                next_pick = draft_order[(position + 1)]
            elif (is_last):
                next_pick = user_id #next pick will be himself
                is_end_of_round = True

        elif (not is_odd_round):
            if (not is_first):
                next_pick = draft_order[(position - 1)]
            elif (is_first):
                next_pick = user_id #next pick himself
                is_end_of_round = True

        if (is_end_of_round and (current_round == total_rounds)):
            is_end_of_draft = True


        #update state of league draft
        query = "UPDATE League_Drafts SET current_pick_user_id = %s WHERE league_id = %s"
        params = (next_pick, league_id)

        if is_end_of_round:
            query = "UPDATE League_Drafts SET current_pick_user_id = %s, current_round = current_round + 1  WHERE league_id = %s"
            if is_end_of_draft:
                query = "UPDATE League_Drafts SET status = %s WHERE league_id = %s"
                params = ('complete', league_id)
                end_of_draft_finalization(league_id, mycursor)
                #can prolly delete the picks from the Draft_picks table here

        mycursor.execute(query, params)

        db.commit()

        return {"success": True}
    
        
    except Error as e:
        db.rollback()
        return {"success": False, "error": "Database Error"}
    
    finally:
        mycursor.close()
        db.close()




def draft_status(league_id):

    #create connection  
    db = mysql.connector.connect(
        host=host,
        user=user,
        passwd=passwd,
        database=database
    )
    db.autocommit = False
    mycursor = db.cursor()


    try:
        
        mycursor.execute("SELECT current_round, current_pick_user_id, status FROM League_Drafts WHERE league_id = %s", (league_id,))
        row = mycursor.fetchone()
        if row == None:
            return {"success":False, "error": "draft not started"}
        (current_round, current_pick_user_id, status) = row


        mycursor.execute("SELECT user_id, fighter_name, weight_class, round_picked FROM Draft_Picks WHERE league_id = %s", (league_id,))
        rows = mycursor.fetchall()
        
        
        picks = []
        for row in rows:
            (user_id, fighter_name, weight_class, round_picked) = row
            
            picks.append({"user_id": user_id, "fighter_name": fighter_name, "weight_class": weight_class, "round_picked": round_picked})
            

        return {"success":True, "payload": {
            "status": status,
            "current_pick_user": current_pick_user_id,
            "round": current_round,
            "picks": picks,
        }}

    except Error as e:
        db.rollback()
        return {"success": False, "error": "Database Error"}
    
    finally:
        mycursor.close()
        db.close()




def can_make_pick(league_id, user_id, fighter_name, weight_class):


    #check if can make pick
    get_draft_state = draft_status(league_id)

    if (get_draft_state["success"] != True):
        return {"success": False, "error":"error getting status"}

    draft_state = get_draft_state["payload"]

    current_pick_user_id = draft_state["current_pick_user"]
    status = draft_state["status"]
    picks = draft_state["picks"]
    
    #is the draft in progress
    if (status != "in_progress"):
        return {"success": False, "error": "draft not in progress"}
    
    #is it their pick
    if (user_id != current_pick_user_id):
        return {"success": False, "error": "not your turn"}
    
    #do they already have 2 fighters in that weightclass
    #picks.append({"user_id": user_id, "fighter_name": fighter_name, "weight_class": weight_class, "round_picked": round_picked})
    count = 0            
    for pick in picks:
        if (pick["user_id"] == user_id and pick["weight_class"] == weight_class):
            count += 1
    if count >= 2:
        return {"success": False, "error": "Already have 2 fighters in that weight class"}


    #is the fighter taken
    for pick in picks:
        if (pick["fighter_name"] == fighter_name and pick["weight_class"] == weight_class):
            return {"success": False, "error": "fighter already taken"}

    #is the fighter in the pool
    fighter_pool = get_fighter_pool()
    if (fighter_name not in fighter_pool[weight_class].values()):
        return {"success": False, "error": "Fighter not in draft pool"}


    return {"success": True}


def end_of_draft_finalization(league_id, mycursor):

    mycursor.execute("SELECT user_id FROM Users_Leagues WHERE league_id = %s", (league_id,))
    rows = mycursor.fetchall()

    #for each user in the league
    for x in rows:
        user_id = x[0]
        mycursor.execute("INSERT INTO Teams (user_id, league_id, name) VALUES (%s,%s,%s)", (user_id, league_id, "Team Name"))

        #get all their picks
        mycursor.execute("SELECT fighter_name, weight_class FROM Draft_Picks WHERE user_id = %s", (user_id,))
        fighter_rows = mycursor.fetchall()

        placed = {
            "Flyweight": 0,
            "Bantamweight": 0,
            "Featherweight":0,
            "Lightweight":0,
            "Welterweight":0,
            "Middleweight":0,
            "Light Heavyweight":0,
            "Heavyweight":0
        }
        #for each fighter picked by the user
        for row in fighter_rows:
            (fighter_name, weight_class) = row
            
            #this handles the space in Light heavyweight to match column 
            col_name = f"{weight_class.replace(" ", "_")}_{placed[weight_class] + 1}"
            query = f"UPDATE Teams SET {col_name} = %s WHERE user_id = %s AND league_id = %s"
            mycursor.execute(query, (fighter_name, user_id, league_id))
            placed[weight_class] += 1
    
    



def delete_league_draft(league_id):

    #create connection  
    db = mysql.connector.connect(
        host=host,
        user=user,
        passwd=passwd,
        database=database
    )
    db.autocommit = False
    mycursor = db.cursor()


    try:
        mycursor.execute("DELETE FROM League_Drafts WHERE league_id = %s", (league_id,))
        if mycursor.rowcount != 1:
            raise RuntimeError("MORE THAN 1 League AFFECTED: " + str(mycursor.rowcount))

        mycursor.execute("DELETE FROM Draft_Picks WHERE league_id = %s", (league_id,))

        mycursor.execute("DELETE FROM Teams WHERE league_id = %s", (league_id))

        db.commit()
    except:
        db.rollback()
    
    finally:
        mycursor.close()
        db.close()
"""



!!!!!!!!!!!!!!!!!!!

mycursor.execute("CREATE TABLE League_Matchups (id int AUTO_INCREMENT PRIMARY KEY, league_id int, week int, user_1_id int, user_2_id int, status ENUM('pending', 'completed') DEFAULT 'pending', FOREIGN KEY (league_id) REFERENCES Leagues(league_id), FOREIGN KEY (user_1_id) REFERENCES Users(user_id), FOREIGN KEY (user_2_id) REFERENCES Users(user_id))")
mycursor.execute("CREATE TABLE Matchup_Picks (id int AUTO_INCREMENT PRIMARY KEY, matchup_id int, user_id int, weight_class varchar(50), fighter_name int, result ENUM('win', 'loss', 'pending') DEFAULT 'pending', FOREIGN KEY (matchup_id) REFERENCES League_Matchups(id))")


CREATE TABLE league_matchups (
    id INT AUTO_INCREMENT PRIMARY KEY,
    league_id INT,
    week INT,
    user1_id INT,
    user2_id INT,
    status ENUM('pending', 'completed') DEFAULT 'pending'
);

-- Picks for each matchup
CREATE TABLE matchup_picks (
    id INT AUTO_INCREMENT PRIMARY KEY,
    matchup_id INT,
    user_id INT,
    weight_class VARCHAR(50),
    fighter_id INT,
    result ENUM('win', 'loss', 'pending') DEFAULT 'pending'
);


"""