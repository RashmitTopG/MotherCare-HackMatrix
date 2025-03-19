from flask import Flask, request, jsonify
import joblib
import numpy as np
from flask_cors import CORS

app = Flask(__name__)
CORS(app)  # Enable CORS to allow frontend to access backend

# Load the trained ML model and scaler
model = joblib.load("best_model.pkl")  # Your trained ML model
scaler = joblib.load("scaler.pkl")  # Your data scaler model

@app.route("/api/predict", methods=["POST"])
def predict():
    try:
        data = request.json
        print(data)
        features = np.array([
            [
                float(data["age"]),
                float(data["bmi"]),
                float(data["blood_pressure"]),
                float(data["heart_rate"]),
                float(data["glucose_level"]),
            ]
        ])

        # Scale input features
        scaled_features = scaler.transform(features)

        # Predict the Risk Level
        prediction = model.predict(scaled_features)[0]

        # Convert int64 to int
        prediction = int(prediction)  # 🔥 This line will fix the error

        # Return Prediction as JSON
        return jsonify({"risk_level": prediction})

    except Exception as e:
        return jsonify({"error": str(e)})

if __name__ == "__main__":
    app.run(port=5002, debug=True)