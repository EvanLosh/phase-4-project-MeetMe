#!/usr/bin/env python3

# Standard library imports
from datetime import datetime, timedelta
import random
import math

# Remote library imports
from faker import Faker

# Local imports
from app import app
from models import db, User, Appointment, Attendance

fake = Faker()

# Function to generate fake users
def generate_fake_user():
    return User(
        username=fake.name(),
        # Add other user-related fields as needed
    )

# Function to generate fake appointments
def generate_fake_appointment(user_id):
    start_time = datetime.now() + timedelta(days=random.randint(1, 30))
    duration = random.randint(1, 4)
    
    return Appointment(
        owner_id=user_id,
        start_time=start_time,
        duration=duration,
        title=fake.text(max_nb_chars=50),  # Assuming title is a short text
        location=fake.address(),
        description=fake.text(),
        status="Scheduled"  # Assuming status is a string
    )

def generate_fake_attendance(user_id, appointment_id):
    statuses = ['Going', 'Not going', 'Uncomfirmed']
    return Attendance(user_id = user_id, appointment_id = appointment_id, status = random.choice(statuses))

# Main function to seed the database
def seed_database(num_users, num_appointments_per_user):
    with app.app_context():
        # delete all entries in the database
        for i in Attendance.query.all():
            db.session.delete(i)
        for i in Appointment.query.all():
            db.session.delete(i)
        for i in User.query.all():
            db.session.delete(i)
        db.session.commit()

        # generate new entries
        for _ in range(num_users):
            user = generate_fake_user()
            db.session.add(user)
            db.session.commit()
            
            for _ in range(num_appointments_per_user):
                appointment = generate_fake_appointment(user.id)
                db.session.add(appointment)
            
            db.session.commit()
        for i in range(math.floor(num_users*num_appointments_per_user*num_users/3)):
            attendance = generate_fake_attendance(random.choice([user.id for user in User.query.all()]), random.choice([a.id for a in Appointment.query.all()]))
            db.session.add(attendance)
        
        db.session.commit()

if __name__ == "__main__":
    seed_database(num_users=10, num_appointments_per_user=5)