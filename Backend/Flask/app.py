from flask import Flask, jsonify, request
from flask_cors import CORS
from scrape import get_fighter_stats
import database
import bcrypt
import random
import json

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


# @app.route('/', methods=["POST"])
# def add_fighter():
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


#starts draft
@app.route('/api/draft/start/<int:league_id>', methods=["POST"])
def start_draft(league_id):

    participants = database.get_league_members(league_id)
    participants_id = [id for id in participants]

    draft_order = random.sample(participants_id, len(participants_id))
    total_rounds = 16  #2 fighters per weightclass maybe later add dynamic amount of fighters per class

    
    response = database.start_draft(league_id, draft_order, total_rounds)

    return response


#checks state of draft
@app.route('/api/draft/state/<int:league_id>', methods=["GET"])
def get_draft_state(league_id):

    response = database.draft_status(league_id)

    return response



@app.route('/api/draft/pick', methods=["POST"])
def draft_pick():
    data = request.get_json()
    league_id = data.get("league_id")
    user_id = data.get("user_id")
    fighter_name = data.get("fighter_name")
    weight_class = data.get("weight_class")
        
    can_make_pick = database.can_make_pick(league_id,user_id, fighter_name, weight_class)
    
    if (can_make_pick["success"] == True):
        response = database.draft_pick(league_id, user_id, fighter_name, weight_class)
        return response
    
    elif (can_make_pick["success"] == False):
        return can_make_pick



@app.route('/api/draft/get_fighter_pool', methods=["GET"])
def get_pool():
    
    response = database.get_fighter_pool()
    return response


@app.route('/api/league/<int:league_id>/create_matchups', methods=['POST'])
def create_matchups(league_id):
    users = database.get_league_members(league_id)
    user_ids = [id for id in users]
    random.shuffle(user_ids)

    response = database.create_matchups()

    return response
    


#checks  matchups
@app.route('/api/league/<int:league_id>/get_matchups', methods=["GET"])
def get_matchups(league_id):

    response = database.draft_status(league_id)

    return response



@app.route('/api/matchup/<int:matchup_id>/submit_pick', methods=['POST'])
def submit_pick(matchup_id):
    data = request.json
    user_id = data.get("user_id")
    fighter_name = data.get("fighter_name")
    weight_class = data.get("weight_class")

    response = database.matchup_pick(matchup_id, user_id, weight_class, fighter_name)


    



# @app.route('/api/matchup/<int:matchup_id>/simulate', methods=['POST'])
# def simulate_matchup(matchup_id):
#     picks = db.query("""
#         SELECT * FROM matchup_picks WHERE matchup_id = %s
#     """, (matchup_id,))
    
#     weight_class_map = {}
#     for pick in picks:
#         wc = pick['weight_class']
#         if wc not in weight_class_map:
#             weight_class_map[wc] = []
#         weight_class_map[wc].append(pick)
    
#     results = []
#     for wc, pair in weight_class_map.items():
#         if len(pair) < 2: continue
#         winner = random.choice(pair)
#         loser = pair[0] if pair[1] == winner else pair[1]

#         db.execute("UPDATE matchup_picks SET result = 'win' WHERE id = %s", (winner['id'],))
#         db.execute("UPDATE matchup_picks SET result = 'loss' WHERE id = %s", (loser['id'],))
        
#         results.append({
#             'weight_class': wc,
#             'winner_user_id': winner['user_id'],
#             'loser_user_id': loser['user_id']
#         })
    
#     db.execute("UPDATE league_matchups SET status = 'completed' WHERE id = %s", (matchup_id,))
    
#     return jsonify({'status': 'completed', 'results': results})