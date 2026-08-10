import json
import joblib

from sklearn.linear_model import LogisticRegression
from sklearn.tree import DecisionTreeClassifier
from sklearn.ensemble import RandomForestClassifier

from sklearn.metrics import (
    accuracy_score,
    precision_score,
    recall_score,
    f1_score,
    roc_auc_score
)

from app.preprocessing import preprocess_data
from app.config import MODEL_PATH, METRICS_PATH


def train_models():
    """
    Train multiple models and save the best one.
    """

    # Load preprocessed data
    X_train, X_test, y_train, y_test = preprocess_data()

    # Models to compare
    models = {
        "Logistic Regression": LogisticRegression(
            random_state=42,
            max_iter=1000
        ),

        "Decision Tree": DecisionTreeClassifier(
            random_state=42
        ),

        "Random Forest": RandomForestClassifier(
            n_estimators=100,
            random_state=42
        )
    }

    best_model = None
    best_accuracy = 0
    best_metrics = {}
    best_name = ""

    print("=" * 50)
    print("Training Models...")
    print("=" * 50)

    for name, model in models.items():

        # Train
        model.fit(X_train, y_train)

        # Predict
        y_pred = model.predict(X_test)

        # Probability
        y_prob = model.predict_proba(X_test)[:, 1]

        # Metrics
        accuracy = accuracy_score(y_test, y_pred)
        precision = precision_score(y_test, y_pred)
        recall = recall_score(y_test, y_pred)
        f1 = f1_score(y_test, y_pred)
        roc_auc = roc_auc_score(y_test, y_prob)

        print(f"\n{name}")
        print(f"Accuracy : {accuracy:.4f}")
        print(f"Precision: {precision:.4f}")
        print(f"Recall   : {recall:.4f}")
        print(f"F1 Score : {f1:.4f}")
        print(f"ROC-AUC  : {roc_auc:.4f}")

        if accuracy > best_accuracy:
            best_accuracy = accuracy
            best_model = model
            best_name = name

            best_metrics = {
                "model": name,
                "accuracy": round(accuracy, 4),
                "precision": round(precision, 4),
                "recall": round(recall, 4),
                "f1_score": round(f1, 4),
                "roc_auc": round(roc_auc, 4)
            }

    # Save best model
    joblib.dump(best_model, MODEL_PATH)

    # Save metrics
    with open(METRICS_PATH, "w") as file:
        json.dump(best_metrics, file, indent=4)

    print("\n" + "=" * 50)
    print(f"Best Model Saved: {best_name}")
    print(f"Accuracy: {best_accuracy:.4f}")
    print("=" * 50)


if __name__ == "__main__":
    train_models()