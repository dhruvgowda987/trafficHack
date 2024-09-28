from flask import Flask, jsonify, request
from dotenv import load_dotenv
import os
from flask_cors import CORS
from flask_sqlalchemy import SQLAlchemy
from sqlalchemy import func, extract

load_dotenv()

app = Flask(__name__)
CORS(app)

app.config['SQLALCHEMY_DATABASE_URI'] = os.getenv('SQLALCHEMY_DATABASE_URI')
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

db = SQLAlchemy(app)


class CarSum(db.Model):
    __tablename__ = 'CarSum'
    
    id = db.Column(db.Integer, primary_key=True)
    camera_id = db.Column(db.String(50))
    date = db.Column(db.Date, nullable=False)
    day_of_week = db.Column(db.String(10), nullable=False)
    hour = db.Column(db.String(2), nullable=False)
    car_count = db.Column(db.Integer, nullable=False)



@app.route('/average-cars-hourly', methods=['GET'])
def get_average_cars():
    camera_id = request.args.get('camera_id')
    if not camera_id:
        return jsonify({'error': 'camera_id is required'}), 400

    # Query to get the average car counts per hour, grouped by day of the week
    results = (
        db.session.query(
            CarSum.day_of_week,
            CarSum.hour,
            func.avg(CarSum.car_count).label('average_count')
        )
        .filter(CarSum.camera_id == camera_id)
        .group_by(CarSum.day_of_week, CarSum.hour)
        .order_by(CarSum.day_of_week, CarSum.hour)
        .all()
    )
    print(results)

    # Organizing results into a structured response
    response = {}
    for day_of_week, hour, average_count in results:
        if day_of_week not in response:
            response[day_of_week] = []
        response[day_of_week].append({
            'hour': hour,
            'average_count': average_count
        })

    return jsonify(response)


@app.route('/cars-yearly')
def get_average_cars_yearly():
    camera_id = request.args.get('camera_id')
    if not camera_id:
        return jsonify({'error': 'camera_id is required'}), 400

    # Query to get the average car counts per hour, grouped by day of the week
    results = (
        db.session.query(
            extract('year', CarSum.date).label('year'),
            func.sum(CarSum.car_count).label('total_cars')
        )
        .filter(CarSum.camera_id == camera_id)
        .group_by('year')
        .order_by('year')
        .all()
    )
    print(results)

    response = {}
    for year, sum in results:
        if year not in response:
            response[year] = []
        response[year].append({
            'sum': sum,
        })

    return jsonify(response)


@app.route('/cars-monthly')
def get_average_cars_monthly():
    camera_id = request.args.get('camera_id')
    if not camera_id:
        return jsonify({'error': 'camera_id is required'}), 400
    
    results =  (
        db.session.query(
        extract('month', CarSum.date).label('month'),
        func.sum(CarSum.car_count).label('total_cars')
    )
    .filter(CarSum.camera_id == camera_id)
    .group_by('month')
    .order_by('month')
    .all()
    )
    print(results)

    response = {}
    for month, sum in results:
        if month not in response:
            response[month] = []
        response[month].append({
            'sum': sum
        })

    return jsonify(response)


@app.route('/cars', methods=['GET'])
def get_all_cars():
    cars = CarSum.query.all()
    return jsonify([{
        'id': car.id,
        'camera_id': car.camera_id,
        'date': car.date.strftime('%Y-%m-%d'),
        'day_of_week': car.day_of_week,
        'hour': car.hour,
        'car_count': car.car_count
    } for car in cars])


@app.route('/')
def hello_world():
    return 'Hello World!'


if __name__ == '__main__':
    app.run()
