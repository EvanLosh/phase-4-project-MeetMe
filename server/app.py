#!/usr/bin/env python3

# Standard library imports

# Remote library imports
from flask import Flask
from flask import request
from flask_restful import Resource


app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///example.db'  # Use your actual database URI
db.init_app(app)


# Local imports
from config import app, db, api
# Add your model imports


# Views go here!

@app.route('/')
def index():
    return '<h1>Project Server</h1>'



if __name__ == '__main__':
    app.run(debug=True)