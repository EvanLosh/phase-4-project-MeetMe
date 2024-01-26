from flask import Flask, request, make_response
from flask_migrate import Migrate
from flask_restful import Resource, Api
from models import User, Appointment, Attendance, db 
from flask_sqlalchemy import SQLAlchemy
from flask_cors import CORS
import requests
from datetime import datetime

app = Flask(__name__)
api = Api(app)
cors = CORS(app, resources={r'/*': {"origins": "*"}})
# configure the database connection to the local file app.db
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///app.db'

# configure flag to disable modification tracking and use less memory
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

# create a Migrate object to manage schema modifications
migrate = Migrate(app, db)

# initialize the Flask application to use the database
db.init_app(app)

class UsersResource(Resource):
    def get(self):
        users = [u.to_dict() for u in User.query.all()]
        return users

    def post(self):
        user_data = request.get_json()
        user = User(**user_data)
        db.session.add(user)
        db.session.commit()
        return user.to_dict(), 201

    def populate_users(self):
        usernames = ['user1', 'user2', 'user3']  # Example usernames to create
        for username in usernames:
            self.create_user(username)

    def create_user(self, username):
        url = 'http://127.0.0.1:5000/users'  # Update with your API URL
        data = {'username': username}
        response = requests.post(url, json=data)
        if response.status_code == 201:
            print(f"User '{username}' created successfully!")
        else:
            print(f"Failed to create user '{username}'")

class UserResource(Resource):
    def get(self, id):
        user = User.query.get(id)
        return user.to_dict()

    def put(self, id):
        user_data = request.get_json()
        user = User.query.get(id)
        if user:
            user.update(**user_data)
            db.session.commit()
            return user.to_dict()
        else:
            return {'error': 'User not found'}, 404

    def delete(self, id):
        user = User.query.get(id)
        if user:
            db.session.delete(user)
            db.session.commit()
            return '', 204
        else:
            return {'error': 'User not found'}, 404

    
class AppointmentsResource(Resource):
    def get(self):
        appointments = [a.to_dict() for a in Appointment.query.all()]
        return appointments

    def post(self):
        print(request.get_json())
        data = request.get_json()
        appointment = Appointment(title = data['title'], location = data['location'], start_time = datetime.now(), end_time = datetime.now() , description = data['description'], owner_id = data['owner_id'], status = 'Active')
        db.session.add(appointment)
        db.session.commit()
        attendances = [Attendance(appointment_id = appointment.id, user_id = appointment.owner_id, status = 'Going')]
        for a in data['attendances']:
            attendances.append(Attendance(appointment_id = appointment.id, user_id = a['user_id'], status = 'Uncomfirmed'))
        return appointment.to_dict(), 201

class AppointmentResource(Resource):
    def get(self, id):
        appointment = Appointment.query.get(id)
        if appointment:
            return appointment.to_dict()
        else:
            return {'error': 'Appointment not found'}, 404

    def put(self, id):
        appointment_data = request.get_json()
        appointment = Appointment.query.get(id)
        if appointment:
            appointment.update(**appointment_data)
            db.session.commit()
            return appointment.to_dict()
        else:
            return {'error': 'Appointment not found'}, 404

    def delete(self, id):
        appointment = Appointment.query.get(id)
        if appointment:
            db.session.delete(appointment)
            db.session.commit()
            return '', 204
        else:
            return {'error': 'Appointment not found'}, 404


api.add_resource(UsersResource, '/users')
api.add_resource(UserResource, '/users/<int:id>')
api.add_resource(AppointmentResource, '/appointments/<int:id>')
api.add_resource(AppointmentsResource, '/appointments')

if __name__ == "__main__":
    app.run(debug=True)