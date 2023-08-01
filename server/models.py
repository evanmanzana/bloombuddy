from flask_sqlalchemy import SQLAlchemy
from sqlalchemy import MetaData
from sqlalchemy.orm import validates
from sqlalchemy_serializer import SerializerMixin
from sqlalchemy.ext.hybrid import hybrid_property

from config import db, bcrypt

convention = {
    "ix": "ix_%(column_0_label)s",
    "uq": "uq_%(table_name)s_%(column_0_name)s",
    "ck": "ck_%(table_name)s_%(constraint_name)s",
    "fk": "fk_%(table_name)s_%(column_0_name)s_%(referred_table_name)s",
    "pk": "pk_%(table_name)s"
}

metadata = MetaData(naming_convention=convention)

class User(db.Model, SerializerMixin):
    __tablename__ = "users"

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String)
    username = db.Column(db.String)
    email = db.Column(db.String)
    _password_hash = db.Column(db.String)

    @hybrid_property
    def password_hash(self):
        return self._password_hash

    @password_hash.setter
    def password_hash(self, password):
        password_hash = bcrypt.generate_password_hash(
            password.encode('utf-8'))
        self._password_hash = password_hash.decode('utf-8')
    
    def authenticate(self, password):
        return bcrypt.check_password_hash(
            self._password_hash, password.encode('utf-8'))

    def __repr__(self):
        return f'<User {self.username}>'

    @validates('email')
    def validate_email(self, key, email):
        if '@' not in email:
            raise ValueError("Invalid email address. Email must contain an '@' symbol.")
        if len(email) > 40:
                raise ValueError("Invalid email address. Email must be a maximum of 40 characters long.")
        return email

   
    care_tasks = db.relationship("CareTask", backref="user")

class Plant(db.Model, SerializerMixin):
    __tablename__ = "plants"

    id = db.Column(db.Integer, primary_key=True)
    latin = db.Column(db.String)
    img = db.Column(db.String)
    family = db.Column(db.String)
    common_names = db.Column(db.String)  
    category = db.Column(db.String)
    origin = db.Column(db.String)
    climate = db.Column(db.String)
    ideal_light = db.Column(db.String)
    watering = db.Column(db.String)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'))
     

    serialize_only = ("id", "img", "latin", "family", "common_names", "category", "origin", "climate","ideal_light", "watering")
    user = db.relationship("User", backref="plants")  # Define the relationship backref
    care_logs = db.relationship("CareLog", backref="plant")

class CareLog(db.Model):
    __tablename__ = "care_logs"

    id = db.Column(db.Integer, primary_key=True)
    date = db.Column(db.Date)
    notes = db.Column(db.String)
    plant_id = db.Column(db.Integer, db.ForeignKey('plants.id'))
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'))

   

class CareTask(db.Model):
    __tablename__ = "care_tasks"

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String)
    desc = db.Column(db.String)
    completed = db.Column(db.Boolean)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'))

