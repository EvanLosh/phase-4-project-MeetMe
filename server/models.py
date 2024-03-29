from flask_sqlalchemy import SQLAlchemy
from sqlalchemy_serializer import SerializerMixin
from sqlalchemy.orm import validates


db = SQLAlchemy()

# Models 

class User(db.Model, SerializerMixin):
    __tablename__ = 'users'
   
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.VARCHAR(20), nullable=False)
    
    serialize_rules = ('-appointments.owner', "-attendances.user", '-appointments.attendances', '-attendances.appointment')
   
    appointments = db.relationship('Appointment', backref='owner', lazy=True)
    
    def __repr__(self):
        return f'User(id={self.id}, username={self.username})'

    @validates('username')
    def validates_username(self, key, value):
        if not value:
            raise ValueError('Invalid username')
        if len(value) > 20:
            raise ValueError('Username cannot exceed 20 characters')
        return value

class Appointment(db.Model, SerializerMixin):
    __tablename__ = 'appointments'

    serialize_rules = ('-owner.appointments', '-attendances.appointment', '-owner.attendances', '-attendances.user')

    id = db.Column(db.Integer, primary_key=True)
    owner_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
    start_time = db.Column(db.DateTime, nullable=False)
    end_time = db.Column(db.DateTime, nullable=False)
    title = db.Column(db.String(255), nullable=False)

    location = db.Column(db.VARCHAR, nullable=False)
    description = db.Column(db.String, nullable=True)  
    status = db.Column(db.String(50), nullable=False) 
    
    def __repr__(self):
        return f'Appointment(id={self.id}, owner_id={self.owner_id}, title={self.title}, location={self.location}, description={self.description})'

    @validates('title')
    def validates_title(self, key, value):
        if not value:
            raise ValueError("Title cannot be empty")
        if len(value) > 255:
            raise ValueError("Title cannot exceed 255 characters")
        return value

    @validates('description')
    def validates_description(self, key, value):
        if value is not None and len(value) > 255:
            raise ValueError("Description cannot exceed 255 characters")
        return value

    @validates('status')
    def validates_status(self, key, value):
        if not value:
            raise ValueError("Status cannot be empty")
        if len(value) > 50:
            raise ValueError("Status cannot exceed 50 characters")
        return value


class Attendance(db.Model, SerializerMixin):
    __tablename__ = 'attendances'  

    serialize_rules = ('-user.attendances', "-appointment.attendances", )
    
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
    appointment_id = db.Column(db.Integer, db.ForeignKey('appointments.id'), nullable=False)
    status = db.Column(db.String(50), nullable=False)

    user = db.relationship('User', backref="attendances", lazy=True)
    appointment = db.relationship('Appointment', backref="attendances", lazy=True)

    @validates('status')
    def validates_status(self, key, value):
        if not value:
            raise ValueError("Status cannot be empty")
        if len(value) > 50:
            raise ValueError("Status cannot exceed 50 characters")
        return value

