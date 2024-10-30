from flask import Flask, jsonify, request
from flask_cors import CORS
import json
import os

app = Flask(__name__)
CORS(app)

DATA_FILE = 'dados.json'

@app.route('/usuarios', methods=['GET'])
def get_usuarios():
    with open(DATA_FILE, 'r') as f:
        usuarios = json.load(f)
    return jsonify(usuarios)

@app.route('/usuarios', methods=['POST'])
def add_usuario():
    novo_usuario = request.json
    with open(DATA_FILE, 'r') as f:
        usuarios = json.load(f)
    usuarios.append(novo_usuario)
    with open(DATA_FILE, 'w') as f:
        json.dump(usuarios, f, indent=2)
    return jsonify(novo_usuario), 201

if __name__ == '__main__':
    app.run(port=5000)
