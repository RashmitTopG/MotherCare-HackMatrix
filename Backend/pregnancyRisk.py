import pandas as pd
import numpy as np

# Set random seed for reproducibility
np.random.seed(42)

# Generate a larger dataset with 10,000 samples
num_samples = 10000

# Generate features
data = {
    "high_blood_pressure": np.random.choice([0, 1], num_samples, p=[0.85, 0.15]),  # 15% have HBP
    "nausea": np.random.choice([0, 1], num_samples, p=[0.7, 0.3]),  # 30% experience nausea
    "swelling": np.random.choice([0, 1], num_samples, p=[0.75, 0.25]),  # 25% have swelling
    "headache": np.random.choice([0, 1], num_samples, p=[0.8, 0.2]),  # 20% have headaches
    "blurred_vision": np.random.choice([0, 1], num_samples, p=[0.9, 0.1]),  # 10% experience blurred vision
    "age": np.random.randint(18, 45, num_samples),  # Age range 18-45
    "bmi": np.round(np.random.normal(25, 5, num_samples), 1),  # More realistic BMI (normal distribution)
    "blood_pressure": np.random.randint(90, 160, num_samples),  # Systolic BP
    "heart_rate": np.random.randint(60, 110, num_samples),  # Heart rate range
    "glucose_level": np.random.normal(100, 30, num_samples).astype(int),  # More realistic glucose distribution
    "previous_pregnancies": np.random.choice([0, 1, 2, 3, 4, 5, 6], num_samples, p=[0.3, 0.25, 0.2, 0.15, 0.07, 0.02, 0.01]),  # Most have 0-3 previous pregnancies
    "morning_sickness": np.random.choice([0, 1], num_samples, p=[0.6, 0.4]),  # 40% experience morning sickness
}

# Gestational diabetes: Higher BMI increases the probability
data["gestational_diabetes"] = np.random.choice([0, 1], num_samples, p=[0.9, 0.1])  # Base 10% probability
data["gestational_diabetes"] = np.where(data["bmi"] > 30, 
                                        np.random.choice([0, 1], num_samples, p=[0.7, 0.3]), 
                                        data["gestational_diabetes"])  # Higher risk if BMI > 30

# Preeclampsia: More likely with high BP & swelling
data["pre_eclampsia"] = np.where((data["high_blood_pressure"] == 1) & (data["swelling"] == 1), 
                                 np.random.choice([0, 1], num_samples, p=[0.5, 0.5]), 
                                 np.random.choice([0, 1], num_samples, p=[0.95, 0.05]))  # 5% baseline probability

# More accurate risk level calculation
data["risk_level"] = np.where(
    (data["pre_eclampsia"] == 1) | 
    ((data["high_blood_pressure"] == 1) & (data["swelling"] == 1) & (data["blurred_vision"] == 1)), 
    3,  # High risk

    np.where(
        (data["gestational_diabetes"] == 1) | 
        (data["nausea"] == 1) | 
        (data["headache"] == 1) | 
        (data["glucose_level"] > 140) | 
        (data["bmi"] > 30) | 
        (data["previous_pregnancies"] >= 3), 
        2,  # Medium risk

        1  # Low risk otherwise
    )
)

# Convert to DataFrame
df = pd.DataFrame(data)

# Ensure glucose values are within a reasonable range
df["glucose_level"] = df["glucose_level"].clip(70, 200)

# Ensure BMI is within a reasonable range
df["bmi"] = df["bmi"].clip(18.5, 40)

# Show dataset overview
print(df.head())

# Save dataset to CSV
df.to_csv("pregnancy_health_risk_data.csv", index=False)