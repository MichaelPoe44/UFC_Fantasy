import mysql.connector 
from mysql.connector import Error

db = mysql.connector.connect(
    host="localhost",
    user="root",
    passwd="Froggy122204",
    database="mytest"
)

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
#mycursor.execute("CREATE TABLE Leagues (league_id int AUTO_INCREMENT NOT NULL PRIMARY KEY, name varchar(128) NOT NULL, admin_id int NOT NULL, num_participants int NOT NULL, FOREIGN KEY (admin_id) REFERENCES Users(user_id))")

# #many to many users-leagues table                                                           So the combo is not repeated            
# mycursor.execute("CREATE TABLE Users_Leagues (league_id int NOT NULL, user_id int NOT NULL, UNIQUE (league_id, user_id), FOREIGN KEY (league_id) REFERENCES Leagues(league_id) ON DELETE CASCADE, FOREIGN KEY (user_id) REFERENCES Users(user_id) ON DELETE CASCADE)")

# #one to many teams table
#mycursor.execute("CREATE TABLE Teams (user_id int NOT NULL, league_id int NOT NULL, name varchar(128) NOT NULL, fighter_name varchar(128), UNIQUE (league_id, user_id), FOREIGN KEY (league_id) REFERENCES Leagues(league_id) ON DELETE CASCADE, FOREIGN KEY (user_id) REFERENCES Users(user_id) ON DELETE CASCADE)")


# mycursor.execute("DESCRIBE Users")
#mycursor.execute("DESCRIBE Leagues")
# mycursor.execute("DESCRIBE Users_Leagues")
# mycursor.execute("DESCRIBE Teams")

# for i in mycursor:
#     print(i)

##################################################################################################################################

def create_user(username, hashedpassword):
    try:
        mycursor.execute("INSERT INTO Users (username, password_hash) VALUES (%s,%s)", (username, hashedpassword))
        db.commit()
        return {"success": True, "user_id": mycursor.lastrowid}
    
    except Error as e:
        if "Duplicate entry" in str(e):
            return {"success": False, "error": "Username already exists"}
        else:
            return {"success": False, "error": "Database Error"}
    


def create_league(name, user_id):
    try:
        mycursor.execute("INSERT INTO Leagues (name, admin_id, num_participants) VALUES (%s,%s,%s)", (name, user_id, 1))
        league_id = mycursor.lastrowid

        mycursor.execute("INSERT INTO Users_Leagues (league_id, user_id) VALUES (%s,%s)", (league_id, user_id))

        db.commit()
        return {"success": True}
    
    except Error as e:
        db.rollback()
        return {"success": False}



mycursor.execute("SELECT * FROM Users")
for x in mycursor:
    print(x)
