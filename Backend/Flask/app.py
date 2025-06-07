from flask import Flask, jsonify, request
from flask_cors import CORS

app = Flask(__name__)
#for developement allows requests from same ports
CORS(app, origins=["http://localhost:5173"])#the dev react server

incomes = [{
    "description":"salary",
    "amount":5000,
}]


@app.route('/incomes')
def get_incomes():
    return jsonify(incomes)


@app.route('/incomes', methods=["POST"])
def add_income():
    incomes.append(request.get_json())
    return '', 204

