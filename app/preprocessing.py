import os
import joblib
import pandas as pd

from sklearn.model_selection import train_test_split
from sklearn.preprocessing import StandardScaler

from app.config import (
    DATASET_PATH,
    SCALER_PATH,
    TEST_SIZE,
    RANDOM_STATE
)


def load_dataset():
    """
    Load dataset safely.
    """

    # Check if file exists
    if not os.path.exists(DATASET_PATH):
        raise FileNotFoundError(
            f"Dataset file not found:\n{DATASET_PATH}"
        )

    # Check if file is empty
    if os.path.getsize(DATASET_PATH) == 0:
        raise Exception(
            f"Dataset file is EMPTY:\n{DATASET_PATH}\n\n"
            "Please paste the dataset into credit_data.csv"
        )

    try:
        df = pd.read_csv(DATASET_PATH)
    except pd.errors.EmptyDataError:
        raise Exception(
            "CSV file exists but contains no readable data."
        )



    if df.empty:
        raise Exception(
            "Dataset contains zero rows."
        )

    return df


def preprocess_data():

    df = load_dataset()

    # Remove duplicates
    df = df.drop_duplicates()

    # Fill missing numeric values
    numeric_columns = df.select_dtypes(include=["number"]).columns

    for column in numeric_columns:
        df[column] = df[column].fillna(df[column].median())

    # Check target column
    if "target" not in df.columns:
        raise Exception(
            "Target column 'target' not found in dataset."
        )

    X = df.drop("target", axis=1)
    y = df["target"]

    scaler = StandardScaler()

    X_train, X_test, y_train, y_test = train_test_split(
        X,
        y,
        test_size=TEST_SIZE,
        random_state=RANDOM_STATE,
        stratify=y
    )

    X_train = scaler.fit_transform(X_train)
    X_test = scaler.transform(X_test)

    joblib.dump(scaler, SCALER_PATH)

    return X_train, X_test, y_train, y_test


if __name__ == "__main__":

    try:
        X_train, X_test, y_train, y_test = preprocess_data()

        print("===================================")
        print("Dataset Loaded Successfully")
        print("Training Samples :", len(X_train))
        print("Testing Samples  :", len(X_test))
        print("Scaler Saved Successfully")
        print("===================================")

    except Exception as e:
        print(e)