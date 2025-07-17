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
    #check other usernames to make sure no repeats
    #create a unique id
    #need to update info in frontend here or somewhere else
    #201 is created
    #409 is conflict like duplicate username

@app.rout('/api/get-user-data', methods=["GET"])
def get_user_data():
    #get data for user
    return jsonify("""stats stored in db""")


