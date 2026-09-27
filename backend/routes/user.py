from fastapi import APIRouter, Depends, HTTPException, status
from fastapi.security import OAuth2PasswordRequestForm
from sqlalchemy.orm import Session
from schemas.request import UserCreateSchema
from schemas.response import (
    UserProfileResponseSchema,
    UserDeletedResponseSchema,
    UserLoginResponseSchema,
)
from models.models import User
from utils.get_db import get_db
from auth.password import hash_password, verify_password
from auth.token import create_token, verify_token

router = APIRouter()


# Create user
@router.post(
    "/signup",
    status_code=status.HTTP_201_CREATED,
    response_model=UserProfileResponseSchema,
)
def create_user(user_data: UserCreateSchema, db: Session = Depends(get_db)):
    user = db.query(User).filter(User.email == user_data.email).first()

    if user:
        raise HTTPException(
            status_code=status.HTTP_409_CONFLICT, detail="Email already exists"
        )

    hashed_pswd = hash_password(user_data.password)
    new_user = User(name=user_data.name, email=user_data.email, password=hashed_pswd)

    db.add(new_user)
    db.commit()
    db.refresh(new_user)

    return {"message": "User created successfully", "user": new_user}


# Login user
@router.post(
    "/login", status_code=status.HTTP_200_OK, response_model=UserLoginResponseSchema
)
def login(
    form_data: OAuth2PasswordRequestForm = Depends(), db: Session = Depends(get_db)
):
    user = db.query(User).filter(User.email == form_data.username).first()

    if not user or not verify_password(form_data.password, user.password):
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST, detail="Invalid email or password"
        )

    token = create_token(user)
    return {
        "message": "Login suuccessfull",
        "access_token": token,
        "token_type": "bearer",
    }


# User Profile
@router.get(
    "/profile", status_code=status.HTTP_200_OK, response_model=UserProfileResponseSchema
)
def profile(user_id: str = Depends(verify_token), db: Session = Depends(get_db)):
    user = db.query(User).filter(User.id == user_id).first()

    if not user:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND, detail="User not found"
        )

    return {"message": "Fetched profile details", "user": user}


# Delete user
@router.delete(
    "/profile", status_code=status.HTTP_200_OK, response_model=UserDeletedResponseSchema
)
def delete_user(user_id: str = Depends(verify_token), db: Session = Depends(get_db)):
    user = db.query(User).filter(User.id == user_id).first()

    if not user:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND, detail="User not found"
        )

    db.delete(user)
    db.commit()

    return {"message": "User deleted successfully"}
