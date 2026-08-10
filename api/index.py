import sys
from pathlib import Path

# Add project root directory to sys.path so app module can be imported in Vercel Serverless
root_dir = Path(__file__).parent.parent
if str(root_dir) not in sys.path:
    sys.path.insert(0, str(root_dir))

from app.main import app

# Export FastAPI app instance for Vercel Python Runtime
__all__ = ["app"]
