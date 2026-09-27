from fastapi import APIRouter, status
from utils.health import get_uptime, get_db_status
from schemas.response import HealthApiSchema

router = APIRouter()


@router.get("/health", status_code=status.HTTP_200_OK, response_model=HealthApiSchema)
def health_check():
    return {
        "status": "OK",
        "message": "API is healthy",
        "db_status": get_db_status(),
        "server_uptime": get_uptime(),
    }
