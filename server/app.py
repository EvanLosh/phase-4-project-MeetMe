from flask import Flask, request
from flask_restful import Resource, Api
from models import User, Appointment  # Assuming you have these models defined

app = Flask(__name__)
api = Api(app)

class UserResource(Resource):
    def get(self, id):
        user = User.query.get(id)
        return user.to_dict()

    def post(self):
        user_data = request.get_json()
        user = User(**user_data)
        db.session.add(user)
        db.session.commit()
        return user.to_dict(), 201

    def put(self, id):
        user_data = request.get_json()
        user = User.query.get(id)
        user.update(**user_data)
        db.session.commit()
        return user.to_dict()

    def delete(self, id):
        user = User.query.get(id)
        db.session.delete(user)
        db.session.commit()
        return '', 204

class AppointmentResource(Resource):
    def get(self, id):
        appointment = Appointment.query.get(id)
        return appointment.to_dict()

    def post(self):
        appointment_data = request.get_json()
        appointment = Appointment(**appointment_data)
        db.session.add(appointment)
        db.session.commit()
        return appointment.to_dict(), 201

    def put(self, id):
        appointment_data = request.get_json()
        appointment = Appointment.query.get(id)
        appointment.update(**appointment_data)
        db.session.commit()
        return appointment.to_dict()

    def delete(self, id):
        appointment = Appointment.query.get(id)
        db.session.delete(appointment)
        db.session.commit()
        return '', 204

api.add_resource(UserResource, '/users/<int:id>')
api.add_resource(AppointmentResource, '/appointments/<int:id>')

if __name__ == "__main__":
    app.run(debug=True)