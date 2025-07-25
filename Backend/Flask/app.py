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

    #hash password
    password_bytes = password.encode("utf-8")
    hash = bcrypt.hashpw(password_bytes, bcrypt.gensalt())
    hashed_pass = hash.decode("utf-8")

    response = database.create_user(username, hashed_pass)

    return jsonify(response)




@app.route('/api/register-league', methods=["POST"])
def register_league():
    data = request.get_json()
    league_name = data.get("name")
    user_id = data.get("id")

    response = database.create_league(league_name, user_id)
    
    return jsonify(response)



@app.route('/api/try-login', methods=["POST"])
def try_login():
    data = request.get_json()
    currentUsername = data.get("currentUserName")
    currentPassword = data.get("currentPassword")

    #check if currentPassword matches the password stored
    stored_hash = database.get_hash_for_user(currentUsername)
    if stored_hash == None:
        return jsonify({"success": False, "error": "User does not exist"})
    
    if stored_hash and bcrypt.checkpw(currentPassword.encode("utf-8"), stored_hash.encode("utf-8")):
        response = database.user_login(currentUsername)
    
        return jsonify(response)
    
    return jsonify({"success": False, "error": "username or password incorrect"})
    



@app.route('/api/join-league', methods=["POST"])
def join__league():
    data = request.get_json()
    join_code = data.get("join_code")
    user_id = data.get("id")

    response = database.join_league(user_id, join_code)

    return jsonify(response)