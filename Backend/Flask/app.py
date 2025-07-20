from flask import Flask, jsonify, request
from flask_cors import CORS
from scrape import get_fighter_stats

#Set-ExecutionPolicy Unrestricted -Scope Process
#to use activate.ps1 and to use npm
#flask --app <name of file> run

app = Flask(__name__)

#for developement allows requests from same ports
CORS(app, origins=["http://localhost:5173"])#the dev react server

 

@app.route('/api/fighter', methods=["GET"])
def get_stats():
    fighter_name = request.args.get('name')
    fighter_stats = get_fighter_stats(fighter_name)
    return jsonify(fighter_stats)


@app.route('/', methods=["POST"])
def add_fighter():
    #need the user and fighter
    #get team append fighter
    #incomes.append(request.get_json())
    return '', 204

@app.route('/api/register-user', methods=["POST"])
def create_user(username, password):
    #encrypt passwords with sha256
    #check other usernames to make sure no repeats
    #create a unique id
    #need to update info in frontend here or somewhere else
    #201 is created
    #409 is conflict like duplicate username
    return

@app.route('/api/try-login', methods=["GET"])
def try_login(currentUsername, CurrentPassword):
    #check if username and pass match a current user
    #if so
    #get data for user and the leagues they in
    #return jsonify("""stats stored in db""")

    #if not return an error login
    user_info = {
        "credentials": { 
            "username": "michael",
            "pass": 1234,
            "id": 111
        },   
        "leagues_in": [12, 34]
    }

    Leagues_info = {
        12:{
            "info":{
                "name": "first one",
                "id": 12,
                "admin": "my id",
                "num_participants": 3
            },
            "participants": {
                "michael": "great team",
                "ryne": "bad team",
                "seth": "good team"
            }
        },

        34:{
            "info":{
                "name": "second one",
                "id": 34, 
                "admin": "my id",
                "num_participants": 3
            },
            "participants": {
                "michael": "great team",
                "cole": "booty team",
                "chad": "no team"
            }

        } 
    }
    temp = {
        "user": user_info,
        "leagues": Leagues_info 
    }
    return jsonify(temp)


@app.route('/api/create-league', methods=["POST"])
def create_user():
    """make a random leauge id like 5 long and dont match others
    store it with the admin 
    return the id and league 
    """
    return


@app.route('/api/join-league', methods=["POST"])
def create_user():
    """ check for a league with that id
     add user to leauge and return league id and leage info
    """
    return