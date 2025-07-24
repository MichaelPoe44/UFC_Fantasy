from flask import Flask, jsonify, request
from flask_cors import CORS
from scrape import get_fighter_stats
import database
import bcrypt

#Set-ExecutionPolicy Unrestricted -Scope Process
#to use activate.ps1 and to use npm
#flask --app <name of file> run

app = Flask(__name__)

#for developement allows requests from same ports
CORS(app, origins=["http://localhost:5173"])#the dev react server

 
#maybe switch to json package as argument
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
def register_user():
    data = request.get_json()
    username = data.get("username")
    password = data.get("password")

    #encrypt password
    password_bytes = password.encode("utf-8")
    hash = bcrypt.hashpw(password_bytes, bcrypt.gensalt())
    hashed_pass = hash.decode("utf-8")

    response = database.create_user(username, hashed_pass)

    return jsonify(response)




@app.route('/api/register -league', methods=["POST"])
def register_league():
    data = request.get_json()
    league_name = data.get("name")
    user_id = data.get("id")

    response = database.create_league(league_name, user_id)
    
    if response["success"] == True:
        return jsonify(response["league"])
    
    elif response["success"] == False:
        return response["error"] 

    return "Unknown Error"


@app.route('/api/try-login', methods=["GET"])
def try_login(currentUsername, CurrentPassword):
    data = request.get_json()
    currentUsername = data.get("currentUsername")
    CurrentPassword = data.get("currentPassword")

    response = database.user_login(currentUsername, CurrentPassword)
    
    if response["success"] == True:
        return jsonify(response["user_data"])
    
    elif response["success"] == False:
        return response["error"] 

    return "Unknown Error"

    



@app.route('/api/join-league', methods=["POST"])
def join__league():
    data = request.get_json()
    join_code = data.get("join_code")
    user_id = data.get("id")

    response = database.join_league(user_id, join_code)

    if response["success"] == True:
        return jsonify(response["league"])
    
    elif response["success"] == False:
        return response["error"] 

    return "Unknown Error"