from flask_sqlalchemy import SQLAlchemy
from sqlalchemy_serializer import SerializerMixin
from sqlalchemy.ext.associationproxy import association_proxy
from sqlalchemy.orm import validates

from config import db
db = SQLAlchemy()


# Models go here!

class User(db.Model, SerializerMixin):
    __tablename__= 'users'
    serialize_rules = ('-appointment.user')
   
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(255), nullable=False)
    
    appointment = db.relatioship('Attendance', backref='user')
    
    def __repr__(self):
        return f'User(id={self.id}, username={self.username})'
        
    

        
        

class Appointment(db.Model, SerializerMixin):
    __tablename__= 'appointments'
    serialize_rules = ('-user.appointment',)
   
    id = db.Column(db.Integer, primary_key=True)
    owner_id = db.Column(db.Integer, db.ForeignKey('user.id'), nullable=False)
    start_time = db.Column(db.DateTime, nullable=False)
    duration = db.Column(db.Integer, nullable=False)
    title = db.Column(db.String(255), nullable=False)
    location = db.Column(db.String(255), nullable=False)
    description = db.Column(db.Text, nullable=True)
    status = db.Column(db.String(50), nullable=False) 
    
    user = db.relationship('Attendance', backref= 'appointment')
    
    def __repr__(self):
        return f'Appointment(id={self.id}, owner_id={self.owner_id}, title={self.title}, location={self.location}, description={self.description})'
    
    @validates('title')
    def validates_title(self,key,value):
        if not value:
            raise ValueError("Title cannot be empty")
        if len(value) > 255:
            raise ValueError("Title cannot exceed 255 characters")
        
        return value
     

class Attendance(db.Model, SerializerMixin):
    __tablename__= 'attendees'
    serializer_rules = ('-user.appointment','-appointment.user')
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'), nullable=False)
    appointment_id = db.Column(db.Integer, db.ForeignKey('appointment.id'), nullable=False)
    status = db.Column(db.String(50), nullable=False)  
