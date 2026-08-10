from fastapi import APIRouter, HTTPException

from app.schemas import CreditInput, PredictionOutput
from app.predictor import (
    predict_credit,
    get_model_info,
    get_metrics
)

# Create API Router
router = APIRouter(
    prefix="/api",
    tags=["Credit Scoring"]
)


@router.get("/")
def api_home():
    """
    API Home Endpoint
    """
    return {
        "message": "Credit Scoring API",
        "status": "Running"
    }


@router.post("/predict", response_model=PredictionOutput)
def predict(data: CreditInput):
    """
    Predict whether a customer is creditworthy.
    """
    try:
        prediction, probability = predict_credit(data)

        return PredictionOutput(
            prediction=prediction,
            probability=round(probability, 4)
        )

    except Exception as e:
        raise HTTPException(
            status_code=500,
            detail=f"Prediction Error: {str(e)}"
        )


@router.get("/metrics")
def metrics():
    """
    Return model evaluation metrics.
    """
    try:
        return get_metrics()

    except Exception as e:
        raise HTTPException(
            status_code=500,
            detail=f"Unable to load metrics: {str(e)}"
        )


@router.get("/model-info")
def model_information():
    """
    Return model information.
    """
    try:
        return get_model_info()

    except Exception as e:
        raise HTTPException(
            status_code=500,
            detail=f"Unable to load model info: {str(e)}"
        )