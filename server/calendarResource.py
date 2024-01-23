from flask_restful import Resource
from models import User, Appointment

class CalendarResource(Resource):
    def get(self, user_id):
        user = User.query.filter_by(id=user_id).first()
        if user:
            appointments = Appointment.query.filter_by(owner_id=user_id).all()
            return {'appointments': [appointment.to_dict() for appointment in appointments]}
        return {'message': 'User not found'}, 404
    
    