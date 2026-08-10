from pydantic import BaseModel, Field


class CreditInput(BaseModel):
    """
    Input schema for credit prediction.
    """

    age: int = Field(
        ...,
        gt=18,
        lt=100,
        description="Customer Age"
    )

    income: float = Field(
        ...,
        gt=0,
        description="Annual Income"
    )

    loan_amount: float = Field(
        ...,
        gt=0,
        description="Requested Loan Amount"
    )

    loan_term: int = Field(
        ...,
        gt=0,
        description="Loan Term (Months)"
    )

    credit_history: int = Field(
        ...,
        ge=0,
        le=1,
        description="0 = Bad History, 1 = Good History"
    )

    debt_to_income: float = Field(
        ...,
        ge=0,
        description="Debt-to-Income Ratio"
    )

    employment_years: int = Field(
        ...,
        ge=0,
        description="Years of Employment"
    )

    class Config:
        json_schema_extra = {
            "example": {
                "age": 30,
                "income": 60000,
                "loan_amount": 10000,
                "loan_term": 24,
                "credit_history": 1,
                "debt_to_income": 0.35,
                "employment_years": 5
            }
        }


class PredictionOutput(BaseModel):
    """
    Response schema.
    """

    prediction: str
    probability: float

    class Config:
        json_schema_extra = {
            "example": {
                "prediction": "Creditworthy",
                "probability": 0.9478
            }
        }


class MetricsOutput(BaseModel):
    """
    Model evaluation metrics.
    """

    accuracy: float
    precision: float
    recall: float
    f1_score: float
    roc_auc: float


class ModelInfo(BaseModel):
    """
    Model information.
    """

    model_name: str
    status: str
    features: list[str]