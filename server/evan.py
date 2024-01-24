from flask_sqlalchemy import SQLAlchemy
from sqlalchemy_serializer import SerializerMixin
from sqlalchemy.orm import validates

db = SQLAlchemy()

# Models go here!

class User(db.Model, SerializerMixin):
    __tablename__ = 'users'
    serialize_rules = ('-appointment.user',)
   
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.Varchar(20), nullable=False)


    # users own multiple appointments
    appointment = db.relationship('Attendance', backref='user')
    # users automatically have attendance to their own appointments
    # users also have attendance to appointments they are invited to
    
    

        
        
class Appointments(db.Model, SerializerMixin):
    __tablename__ = 'appointments'
    serialize_rules = ('-user.appointment',)
   
    id = db.Column(db.Integer, primary_key=True)
    owner_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)  # Check on this
    start_time = db.Column(db.DateTime, nullable=False)
    duration = db.Column(db.Varchar, nullable=False)
    title = db.Column(db.String(255), nullable=False)
    location = db.Column(db.Varchar, nullable=False)
    description = db.Column(db.String, nullable=True)  # Removed (255)
    status = db.Column(db.String(50), nullable=False) 
    
    # every appointment is owned by one user
    user = db.relationship('Attendance', backref='appointment')
    




class Attendance(db.Model, SerializerMixin):
    __tablename__ = 'attendances'  
    serialize_rules = ('-user.appointment', '-appointment.user')
    
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)  
    appointment_id = db.Column(db.Integer, db.ForeignKey('appointments.id'), nullable=False)  
    status = db.Column(db.String(50), nullable=False)
    

