from fastapi import Depends, HTTPException, status
from sqlalchemy.orm import Session

from auth.token import verify_token
from utils.get_db import get_db
from models.models import User


# verify user / user authentication
def get_current_user(
    user_id: str = Depends(verify_token), db: Session = Depends(get_db)
):
    user = db.query(User).filter(User.id == user_id).first()

    if not user:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND, detail="User not found"
        )

    return user
