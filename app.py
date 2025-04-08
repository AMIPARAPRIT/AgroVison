from flask import Flask, request, jsonify, render_template
from crop_logic import recommend_crop
from flask_cors import CORS
import os

app = Flask(__name__)
CORS(app)

# API key validation
API_KEY = "9b3667c38506486a7828dc365c252998"


@app.route("/")
def index():
    return render_template("index.html")


@app.route("/get-weather", methods=["POST"])
def get_weather():
    try:
        # Validate API key
        api_key = request.headers.get("x-api-key")
        if api_key != API_KEY:
            return jsonify({"error": "Unauthorized"}), 401

        data = request.json
        pincode = data.get("pincode")
        city = data.get("city")

        if not pincode or not city:
            return jsonify({"error": "Pincode and city are required"}), 400

        # For demo purposes, we'll return mock data
        # In a real implementation, you would call a weather API service

        # Mock weather data based on the first digit of pincode
        first_digit = int(pincode[0]) if pincode and pincode[0].isdigit() else 5

        if first_digit <= 3:
            weather_type = "sunny"
            temperature = 28 + first_digit
            humidity = 50 + first_digit * 2
            rainfall = 50 + first_digit * 10
        elif first_digit <= 6:
            weather_type = "cloudy"
            temperature = 22 + first_digit % 3
            humidity = 65 + first_digit % 3 * 5
            rainfall = 100 + first_digit * 10
        else:
            weather_type = "rainy"
            temperature = 18 + first_digit % 3
            humidity = 75 + first_digit % 3 * 5
            rainfall = 150 + first_digit * 15

        weather_data = {
            "temperature": temperature,
            "humidity": humidity,
            "rainfall": rainfall,
            "weatherType": weather_type,
            "location": f"{city} - {pincode}",
        }

        return jsonify(weather_data)
    except Exception as e:
        return jsonify({"error": str(e)}), 500


@app.route("/recommend", methods=["POST"])
def recommend():
    try:
        # Validate API key
        api_key = request.headers.get("x-api-key")
        if api_key != API_KEY:
            return jsonify({"error": "Unauthorized"}), 401

        data = request.json
        prediction = recommend_crop(data)
        return jsonify(prediction)
    except Exception as e:
        return jsonify({"error": str(e)}), 500


if __name__ == "__main__":
    app.run(debug=True)
