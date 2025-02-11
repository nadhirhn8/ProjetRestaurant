from flask import Flask, request, jsonify
from flask_cors import CORS
from flask_jwt_extended import create_access_token, JWTManager, jwt_required, get_jwt_identity
from elasticsearch import Elasticsearch
from werkzeug.security import generate_password_hash, check_password_hash
import uuid, base64
from datetime import timedelta



app = Flask(__name__)
CORS(app, supports_credentials=True)
app.config['JWT_SECRET_KEY'] = 'secret-key'
app.config['JWT_ACCESS_TOKEN_EXPIRES'] = timedelta(days=1)
jwt = JWTManager(app)

# Connexion à Elasticsearch
es = Elasticsearch([{'host': 'localhost', 'port': 9200, 'scheme': 'http'}])

# Vérifier si Elasticsearch fonctionne
@app.route('/health', methods=['GET'])
def health_check():
    if es.ping():
        return jsonify({"status": "Elasticsearch est opérationnel"})
    return jsonify({"status": "Problème de connexion à Elasticsearch"}), 500

# Endpoint pour l'inscription
@app.route('/register', methods=['POST'])
def register():
    data = request.json
    if data['password'] != data['confirm_password']:
        return jsonify({"error": "Les mots de passe ne correspondent pas"}), 400
    
    user_id = str(uuid.uuid4())  # Générer un ID unique
    user = {
        "id": user_id,
        "username": data['username'],
        "email": data['email'],
        "password": generate_password_hash(data['password']),
        "phoneNumber": data['phoneNumber'],
        "sexe": data['sexe'],
        "nationality": data['nationality']
    }
    es.index(index="users", id=user_id, body=user)
    return jsonify({"message": "Utilisateur créé avec succès"})

# Endpoint pour l'authentification
@app.route('/login', methods=['POST'])
def login():
    data = request.json
    res = es.search(index="users", body={"query": {"match": {"email": data['email']}}})
    if res['hits']['total']['value'] == 0:
        return jsonify({"error": "Utilisateur non trouvé"}), 401
    
    user = res['hits']['hits'][0]['_source']
    if not check_password_hash(user['password'], data['password']):
        return jsonify({"error": "Mot de passe incorrect"}), 401
    
    access_token = create_access_token(identity=user['email'])
    return jsonify(access_token=access_token)

# Endpoint pour ajouter un plat avec une image
@app.route('/plats', methods=['POST'])
@jwt_required()
def add_plat():
    data = request.json
    plat_id = str(uuid.uuid4())
    plat = {
        "id": plat_id,
        "nom": data['nom'],
        "description": data['description'],
        "prix": data['prix'],
        "image": data['image']  # Image en base64
    }
    es.index(index="plats", id=plat_id, body=plat)
    return jsonify({"message": "Plat ajouté avec succès"})

# Endpoint pour récupérer tous les plats
@app.route('/plats', methods=['GET'])
def get_plats():
    res = es.search(index="plats", body={"query": {"match_all": {}}})
    plats = [hit['_source'] for hit in res['hits']['hits']]
    return jsonify(plats)

# Endpoint pour récupérer un plat par ID
@app.route('/plats/<id>', methods=['GET'])
def get_plat(id):
    res = es.get(index="plats", id=id, ignore=404)
    if not res or '_source' not in res:
        return jsonify({"error": "Plat non trouvé"}), 404
    return jsonify(res['_source'])

# Endpoint pour mettre à jour un plat
@app.route('/plats/<id>', methods=['PUT'])
@jwt_required()
def update_plat(id):
    data = request.json
    es.update(index="plats", id=id, body={"doc": data})
    return jsonify({"message": "Plat mis à jour avec succès"})

# Endpoint pour supprimer un plat
@app.route('/plats/<id>', methods=['DELETE'])
@jwt_required()
def delete_plat(id):
    es.delete(index="plats", id=id, ignore=404)
    return jsonify({"message": "Plat supprimé avec succès"})

if __name__ == '__main__':
    app.run(debug=True)