from flask import Flask, request, make_response, render_template, redirect, flash, session
from flask_migrate import Migrate
from models import Plant, User
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
            plant = Plant.query.filter_by(id=id).first()
            if plant:
                return make_response(plant.to_dict(), 200)
            else:
                return make_response({"error": "Plant not found."}, 404)


api.add_resource(Plants, '/plants')
api.add_resource(IndPlants, '/plants/<int:id>')

api.add_resource(Login, '/login')
api.add_resource(Logout, '/logout')
api.add_resource(CheckSession, '/check_session')

if __name__ == '__main__':
    app.run(debug=True)
