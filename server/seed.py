#!/usr/bin/env python3

# Standard library imports
from datetime import datetime, timedelta
import random

# Remote library imports
from faker import Faker

# Local imports
from app import app
from models import db, User, Appointment

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

# Main function to seed the database
def seed_database(num_users, num_appointments_per_user):
    with app.app_context():
        for _ in range(num_users):
            user = generate_fake_user()
            db.session.add(user)
            db.session.commit()
            
            for _ in range(num_appointments_per_user):
                appointment = generate_fake_appointment(user.id)
                db.session.add(appointment)
            
            db.session.commit()

if __name__ == "__main__":
    seed_database(num_users=10, num_appointments_per_user=5)