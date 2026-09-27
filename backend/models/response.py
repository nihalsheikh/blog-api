from pydantic import BaseModel


class HealthApiResponse(BaseModel):
    status: str
    message: str
    db_status: str
    server_uptime: int
