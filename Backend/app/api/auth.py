from anyio import Path
from fastapi.security.oauth2 import OAuth2PasswordRequestForm
from fastapi import APIRouter, BackgroundTasks, Depends, HTTPException, Response, UploadFile, status
from sqlalchemy.orm import Session

from app.utils.oa2 import get_current_user
from ..schema import schemas, auth
from ..models import models
from ..database.configuration import get_db
from app.core import user
from ..utils import hash, token
# from app.services import storage

router = APIRouter(tags=["Authentication"], prefix="/auth")

@router.post("/login", response_model=auth.Token)
def login(
    user_cred: OAuth2PasswordRequestForm = Depends(),
    db: Session = Depends(get_db)
):
    user: schemas.User = (
        db.query(models.User).filter(models.User.email == user_cred.username).first()
    )

    if not user:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND, detail=f"Invalid Credentials"
        )
    if not hash.verify_password(user_cred.password, user.password):
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND, detail=f"Incorrect password"
        )

    access_token = token.create_access_token(data={"sub": user.email})

    return {"access_token": access_token, "token_type": "bearer"}


@router.post("/signup", response_model=schemas.ShowUser, status_code=status.HTTP_201_CREATED)
def create_user_account(new_user: schemas.User, db: Session = Depends(get_db)):
    return user.create(new_user, db)


@router.post("/forgot-password")
def forgot_password(
    user_email: schemas.UserForgotPassword,
    background_tasks: BackgroundTasks,
    db: Session = Depends(get_db)
):
    user.forgot_password(user_email.email, background_tasks,  db)
    return Response(status_code=status.HTTP_200_OK)


@router.post("/update-password")
def update_password(
    user_info: schemas.UserUpdatePassword,
    db: Session = Depends(get_db),
):
    user.hash_update_password(user_info, db)
    return Response(status_code=status.HTTP_200_OK)


@router.post("/verify-account")
def verify_account(
    background_tasks: BackgroundTasks,
    user_email: schemas.UserVerifyAccount,
    db: Session = Depends(get_db),
):
    user.verify_user_account(user_email.email, background_tasks,  db)
    return Response(status_code=status.HTTP_200_OK)


@router.post("/confirm_verification")
def confirm_verification(
    verify: schemas.VerificationCode, 
    db: Session = Depends(get_db),
):
    user.confirm_verification(verify.code, verify.email, db)
    return Response(status_code=status.HTTP_200_OK)

