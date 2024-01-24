#!/usr/bin/env python3

# Import modules and classes
from models import db, Restaurant, RestaurantPizza, Pizza
from flask_migrate import Migrate
from flask import Flask, request, make_response, jsonify
from flask_restful import Api, Resource
import os

# Define the base directory and database URI
BASE_DIR = os.path.abspath(os.path.dirname(__file__))
DATABASE = os.environ.get(
    "DB_URI", f"sqlite:///{os.path.join(BASE_DIR, 'app.db')}")

# Create Flask application
app = Flask(__name__)

# Config the  app with the database URI and other settings
app.config['SQLALCHEMY_DATABASE_URI'] = DATABASE
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
app.json.compact = False

# Initialize database migration
migrate = Migrate(app, db)

# Initialize the database with the app
db.init_app(app)


# Define a route for getting a restaurant by ID
@app.route('/restaurants/<int:id>', methods=['GET'])
def get_restaurant(id):
    restaurant = Restaurant.query.get(id)
    if restaurant is None:
        return jsonify({'error': 'Restaurant not found'}), 404
    return jsonify(restaurant.to_dict(include_restaurant_pizzas=True))

# Define a route for deleting a restaurant by ID
@app.route('/restaurants/<int:id>', methods=['DELETE'])
def delete_restaurant(id):
    restaurant = Restaurant.query.get(id)
    if restaurant is None:
        return jsonify({'error': 'Restaurant not found'}), 404
    db.session.delete(restaurant)
    db.session.commit()
    return jsonify({'message': 'Restaurant deleted'}), 204

# Define a route for getting all pizzas
@app.route('/pizzas', methods=['GET'])
def get_pizzas():
    pizzas = Pizza.query.all()
    return jsonify([pizza.to_dict() for pizza in pizzas])

# Define a route for creating a new restaurant pizza
@app.route('/restaurant_pizzas', methods=['POST'])
def create_restaurant_pizza():
    try:
        data = request.get_json()
        restaurant_pizza = RestaurantPizza(
            price=data['price'],
            pizza_id=data['pizza_id'],
            restaurant_id=data['restaurant_id']
        )
        db.session.add(restaurant_pizza)
        db.session.commit()

        # Fetch the restaurant and pizza from the database
        restaurant = Restaurant.query.get(data['restaurant_id'])
        pizza = Pizza.query.get(data['pizza_id'])

        # Include the restaurant and pizza data in the response
        response = restaurant_pizza.to_dict()
        response['restaurant'] = restaurant.to_dict()
        response['pizza'] = pizza.to_dict()

        return jsonify(response), 201
    except Exception as e:
        db.session.rollback()
        return jsonify({'errors': ["validation errors"]}), 400

# Define a route for the root URL
@app.route('/')
def index():
    return '<h1>Code challenge</h1>'

# If the script is run directly (not imported), run the application on port 5555 in debug mode
if __name__ == '__main__':
    app.run(port=5555, debug=True)