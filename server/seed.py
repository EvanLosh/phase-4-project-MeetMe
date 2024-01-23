#!/usr/bin/env python3

# Standard library imports
from random import randint, choice as rc

# Remote library imports
from faker import Faker

# Local imports
from app import app
from models import db

if __name__ == '__main__':
    fake = Faker()
    with app.app_context():
        print("Starting seed...")
        # Seed code goes here!

from faker import Faker
from datetime import datetime, timedelta
import random
from your_database_module import DatabaseHandler  # Replace with your actual database module

fake = Faker()

# Initialize your database connection
db_handler = DatabaseHandler()

# Function to generate fake users
def generate_fake_user():
    return {
        'name': fake.name(),
        'email': fake.email(),
        # Add other user-related fields as needed
    }

# Function to generate fake appointments
def generate_fake_appointment():
    start_time = datetime.now() + timedelta(days=random.randint(1, 30))
    end_time = start_time + timedelta(hours=random.randint(1, 4))
    
    return {
        'user_id': random.randint(1, 100),  # Assuming user IDs are in the range 1-100
        'start_time': start_time,
        'end_time': end_time,
        'description': fake.text(),
        # Add other appointment-related fields as needed
    }

# Main function to seed the database
def seed_database(num_users, num_appointments_per_user):
    for _ in range(num_users):
        user_data = generate_fake_user()
        user_id = db_handler.add_user(user_data)  # Replace with your actual method to add users
        
        for _ in range(num_appointments_per_user):
            appointment_data = generate_fake_appointment()
            appointment_data['user_id'] = user_id
            db_handler.add_appointment(appointment_data)  # Replace with your actual method to add appointments

if __name__ == "__main__":
    seed_database(num_users=10, num_appointments_per_user=5)
