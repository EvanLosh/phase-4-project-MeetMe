#!/usr/bin/env python3

# Standard library imports
from flask import Flask
from flask_restful import Api

# Local imports
from models import db
from calendarResource import CalendarResource

app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///example.db'  # Use your actual database URI
db.init_app(app)

api = Api(app)  # Initialize the api object

# Add your model imports
api.add_resource(CalendarResource, '/calendar/<int:user_id>')

# Views go here!
@app.route('/')
def index():
    return '<h1>Project Server</h1>'

if __name__ == '__main__':
    app.run(debug=True)