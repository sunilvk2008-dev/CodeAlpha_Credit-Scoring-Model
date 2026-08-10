import joblib

from sklearn.metrics import (
    accuracy_score,
    precision_score,
    recall_score,
    f1_score,
    roc_auc_score,
    confusion_matrix,
    classification_report
)

from app.preprocessing import preprocess_data
from app.config import MODEL_PATH


def evaluate_model():
    """
    Evaluate the trained machine learning model.
    """

    # Load preprocessed data
    X_train, X_test, y_train, y_test = preprocess_data()

    # Load trained model
    model = joblib.load(MODEL_PATH)

    # Predict labels
    y_pred = model.predict(X_test)

    # Predict probabilities
    y_prob = model.predict_proba(X_test)[:, 1]

    # Calculate metrics
    accuracy = accuracy_score(y_test, y_pred)
    precision = precision_score(y_test, y_pred)
    recall = recall_score(y_test, y_pred)
    f1 = f1_score(y_test, y_pred)
    roc_auc = roc_auc_score(y_test, y_prob)

    # Print results
    print("=" * 60)
    print("MODEL EVALUATION")
    print("=" * 60)

    print(f"Accuracy      : {accuracy:.4f}")
    print(f"Precision     : {precision:.4f}")
    print(f"Recall        : {recall:.4f}")
    print(f"F1 Score      : {f1:.4f}")
    print(f"ROC-AUC Score : {roc_auc:.4f}")

    print("\nConfusion Matrix")
    print("-" * 60)
    print(confusion_matrix(y_test, y_pred))

    print("\nClassification Report")
    print("-" * 60)
    print(classification_report(y_test, y_pred))


if __name__ == "__main__":
    evaluate_model()