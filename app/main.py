from pathlib import Path
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from fastapi.staticfiles import StaticFiles
from fastapi.responses import FileResponse

from app.routes import router
from app.config import (
    API_TITLE,
    API_VERSION,
    API_DESCRIPTION
)

# Create FastAPI application
app = FastAPI(
    title=API_TITLE,
    version=API_VERSION,
    description=API_DESCRIPTION
)

# Enable CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Include API routes under /api
app.include_router(router)


@app.get("/health", tags=["Health"])
def health_check():
    return {
        "status": "Healthy",
        "message": "API is running successfully."
    }


# Mount Frontend Dist build if available
FRONTEND_DIST = Path(__file__).parent.parent / "frontend" / "dist"

if FRONTEND_DIST.exists():
    app.mount("/assets", StaticFiles(directory=str(FRONTEND_DIST / "assets")), name="assets")

    @app.get("/", tags=["UI"])
    def serve_ui():
        return FileResponse(str(FRONTEND_DIST / "index.html"))
else:
    @app.get("/", tags=["Home"])
    def home():
        return {
            "message": "Welcome to Credit Scoring Prediction API",
            "status": "Running",
            "version": API_VERSION,
            "documentation": "/docs"
        }