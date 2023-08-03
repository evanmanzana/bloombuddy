from flask import Flask, request, make_response, render_template, redirect, flash, session
from flask_migrate import Migrate
from models import Plant, User, CareTask, CareLog, UserPlant
import os
from flask_restful import Api, Resource
from flask_cors import CORS
from flask_sqlalchemy import SQLAlchemy
from flask_login import LoginManager, UserMixin, login_user, login_required, logout_user, current_user

from config import app, db, api, CORS

db.init_app(app)

login_manager = LoginManager(app)
login_manager.login_view = 'login'  # Replace 'login' with the endpoint of your login route

users = current_user

class Login(Resource):

    def post(self):
        email = request.get_json()['email']
        password = request.get_json()['password']

        user = User.query.filter(User.email == email).first()

        if user.authenticate(password):
            session['user_id'] = user.id
            return user.to_dict(), 200
        return {}, 401

class Logout(Resource):
    def delete(self):
        session['user_id'] = None
        return {}, 204

class CheckSession(Resource):
    def get(self):
        user_id = session.get('user_id')
        if user_id:
            user = User.query.filter(User.id == user_id).first()
            return user.to_dict()
        else:
            return {}, 401
        
class Plants(Resource):
    def get(self):
        plants = Plant.query.all()
        plants_dict = []
        for plant in plants:
            plants_dict.append(plant.to_dict())
        
        return make_response(plants_dict, 200)
    
class IndPlants(Resource):
        def get(self, id):
            print("indplant", id)
            plant = Plant.query.filter_by(id=id).first()
            if plant:
                return make_response(plant.to_dict(), 200)
            else:
                return make_response({"error": "Plant not found."}, 404)
            
class UserPlants(Resource):
    def get(self, user_id):
        print(user_id)
        user = User.query.get(user_id)
        if user:
            print(user.user_plants)
            user_plants = [plant.to_dict() for plant in user.user_plants]
            return make_response({"user_plants": user_plants}, 200)
        else:
            return make_response({"error": "User not found."}, 404)
    def delete(self, user_id):
        plant_id = request.args.get("plant_id")
        user = User.query.get(user_id)

        if not plant_id:
            return make_response({"error": "Plant ID not provided."}, 400)

        if user:
            user_plant = UserPlant.query.filter_by(user_id=user_id, plant_id=plant_id).first()

            if user_plant:
                db.session.delete(user_plant)
                db.session.commit()
                return make_response({"message": "Plant removed from collection."}, 200)
            else:
                return make_response({"error": "Plant not found in user's collection."}, 404)
        else:
            return make_response({"error": "User not found."}, 404)
    def post(self, user_id):
        plant_id = request.json.get('plant_id')  # Ensure that you access the 'plant_id' from the request JSON
        if not plant_id:
            return {"error": "Plant ID not provided."}, 400

        user_plant = UserPlant.query.filter_by(user_id=user_id, plant_id=plant_id).first()
        if user_plant:
            return {"error": "Plant already in the collection."}, 400

        # Add the plant to the user's collection
        user_plant = UserPlant(user_id=user_id, plant_id=plant_id)
        db.session.add(user_plant)
        db.session.commit()

        return {"message": "Plant added to collection successfully."}, 201

# class PlantSearch(Resource):
#     def search_plants():
#         search_term = request.args.get('q', '')
#         search_term = search_term.strip().lower()

#         # Perform the search in the database
#         filtered_plants = Plant.query.filter(
#             (Plant.latin.ilike(f"%{search_term}%")) |
#             (Plant.common_names.ilike(f"%{search_term}%"))
#         ).all()

#         # Convert the filtered plants to a list of dictionaries
#         plants_data = [
#             {
#                 'id': plant.id,
#                 'latin': plant.latin,
#                 'common_names': plant.common_names,
#                 # Add other plant attributes you want to include in the search results
#             }
#             for plant in filtered_plants
        # ]

        # return jsonify(plants_data)


api.add_resource(Plants, '/plants')
api.add_resource(IndPlants, '/plants/<int:id>')
api.add_resource(UserPlants, '/plants/user/<int:user_id>')
# api.add_resource(PlantSearch, '/plants/search')

api.add_resource(Login, '/login')
api.add_resource(Logout, '/logout')
api.add_resource(CheckSession, '/check_session')

if __name__ == '__main__':
    app.run(debug=True)
