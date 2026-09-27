from fastapi.security import OAuth2PasswordBearer
from fastapi import Depends, HTTPException
from datetime import datetime, timezone, timedelta
from jose import jwt, JWTError
from models.models import User
from config.env_config import settings

oauth2_schema = OAuth2PasswordBearer(tokenUrl="/api/login")

secret_key = settings.secret_key
algo = settings.algorithm
access_token_expiry_days = settings.access_token_expire_days


# Create token
def create_token(user: User):
    to_encode = {"sub": user.id, "email": user.email}

    expire_time = datetime.now(timezone.utc) + timedelta(days=access_token_expiry_days)

    to_encode.update({"exp": expire_time})

    token = jwt.encode(to_encode, secret_key, algorithm=algo)
    return token


# Verify Token
def verify_token(token: str = Depends(oauth2_schema)):
    try:
        payload = jwt.decode(token, secret_key, algorithms=[algo])
        user_id = payload.get("sub")

        if user_id is None:
            raise HTTPException(status_code=401, detail="Invalid Token")

        return user_id
    except JWTError, ValueError, TypeError:
        raise HTTPException(status_code=401, detail="Invalid or expired token")
