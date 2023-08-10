from flask import (
    Flask,
    request,
    make_response,
    render_template,
    redirect,
    flash,
    session,
)
from flask_migrate import Migrate
from models import Plant, User, CareTask, CareLog, UserPlant
import os
from flask_restful import Api, Resource, reqparse
from flask_cors import CORS
from flask_sqlalchemy import SQLAlchemy
from flask_login import (
    LoginManager,
    UserMixin,
    login_user,
    login_required,
    logout_user,
    current_user,
)
import json
import dateutil.parser

from config import app, db, api, CORS

db.init_app(app)

login_manager = LoginManager(app)
login_manager.login_view = (
    "login"  # Replace 'login' with the endpoint of your login route
)

users = current_user


class Login(Resource):
    def post(self):
        email = request.get_json()["email"]
        password = request.get_json()["password"]

        user = User.query.filter(User.email == email).first()

        if user.authenticate(password):
            session["user_id"] = user.id
            return user.to_dict(), 200
        return {}, 401


class Logout(Resource):
    def delete(self):
        session["user_id"] = None
        return {}, 204


class CheckSession(Resource):
    def get(self):
        user_id = session.get("user_id")
        if user_id:
            user = User.query.filter(User.id == user_id).first()
            if user:
                return user.to_dict(), 200
            else:
                return {"message": "User not found"}, 404
        else:
            return {"message": "Unauthorized"}, 401


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
        user_plant_id = user_id
        id = request.args.get("plant_id")
        print(id)
        # print(user_plant_id)
        # request.args.get("id")
        # user = User.query.get(user_id)

        if not user_plant_id:
            return make_response({"error": "Plant ID not provided."}, 400)

        if user_plant_id:
            user_plants = UserPlant.query.filter_by(id=id).first()
            print(user_plants)
            if user_plants:
                db.session.delete(user_plants)
                db.session.commit()
                return make_response({"message": "Plant removed from collection."}, 200)
            else:
                return make_response(
                    {"error": "Plant not found in user's collection."}, 404
                )
        else:
            return make_response({"error": "User not found."}, 404)

    def post(self, user_id):
        plant_id = request.json.get(
            "plant_id"
        )  # Ensure that you access the 'plant_id' from the request JSON
        if not plant_id:
            return {"error": "Plant ID not provided."}, 400

        # user_plant = UserPlant.query.filter_by(user_id=user_id, plant_id=plant_id).first()
        # if user_plant:
        #     return {"error": "Plant already in the collection."}, 400

        # Add the plant to the user's collection
        user_plant = UserPlant(user_id=user_id, plant_id=plant_id)
        db.session.add(user_plant)
        db.session.commit()

        return {"message": "Plant added to collection successfully."}, 201


class UpdatePlantName(Resource):
    def put(self, user_id):
        plant_id = request.args.get("plant_id")
        new_plant_name = request.json.get("plant_name")

        if not plant_id:
            return {"error": "Plant ID not provided."}, 400

        if not new_plant_name:
            return {"error": "New plant name not provided."}, 400

        user_plant = UserPlant.query.get(plant_id)

        if not user_plant or user_plant.user_id != user_id:
            return {"error": "Plant not found in the user's collection."}, 404

        user_plant.plant_name = new_plant_name
        db.session.commit()

        return {"message": "Plant name updated successfully."}, 200


class CreateTask(Resource):
    def post(self):
        task_data = request.json

        # Get the user plant id from the user plant object.
        user_plant_id = task_data["user_plant_id"]["id"]

        # Get the user id from the user plant object.
        user_id = task_data["user_plant_id"]["user_id"]

        # Get the plant name from the plant_name object.
        plant_name = task_data["user_plant_id"]["plant_name"]
        if not plant_name:
            plant_name = task_data["user_plant_id"]["plant"]["common_names"][0]

        # Convert the user_plant_id parameter to a string.
        user_plant_id_string = json.dumps(user_plant_id)

        new_task = CareTask(
            name=task_data.get("name"),
            desc=task_data.get("desc"),
            due_date=dateutil.parser.isoparse(task_data.get("due_date")),
            user_id=user_id,
            user_plant_id=user_plant_id_string,
            # plant_name=plant_name,
        )

        db.session.add(new_task)
        try:
            db.session.commit()
            return {"message": "Task created successfully"}, 201
        except Exception as e:
            db.session.rollback()  # Rollback the transaction on error
            return {"error": "Error creating task: " + str(e)}, 500

    def delete(self, task_id):
        task = CareTask.query.get(task_id)

        if not task:
            return {"error": "Task not found."}, 404

        db.session.delete(task)
        db.session.commit()

        return {"message": "Task deleted successfully."}, 204


class GetUserTasks(Resource):
    def get(self, user_id):
        user_tasks = CareTask.query.filter_by(user_id=user_id).all()

        if not user_tasks:
            return {"message": "No tasks found for the user."}, 404

        task_list = []

        for task in user_tasks:
            task_data = {
                "task_id": task.id,
                "name": task.name,
                "desc": task.desc,
                "completed": task.completed,
                "due_date": task.due_date.isoformat(),
            }
            task_list.append(task_data)

        return {"tasks": task_list}, 200


api.add_resource(Plants, "/plants")
api.add_resource(IndPlants, "/plants/<int:id>")
api.add_resource(UserPlants, "/plants/user/<int:user_id>")
api.add_resource(UpdatePlantName, "/plants/user/<int:user_id>")
api.add_resource(CreateTask, "/tasks", "/tasks/<int:task_id>")
api.add_resource(GetUserTasks, "/user/<int:user_id>/tasks")


api.add_resource(Login, "/login")
api.add_resource(Logout, "/logout")
api.add_resource(CheckSession, "/check_session")

if __name__ == "__main__":
    app.run(debug=True)
