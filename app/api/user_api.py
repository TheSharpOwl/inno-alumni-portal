
from fastapi.security.oauth2 import OAuth2PasswordRequestForm
from fastapi.encoders import jsonable_encoder
from fastapi import APIRouter, BackgroundTasks, Depends, HTTPException, Request, Response, status

from app.utils.oa2 import get_current_user
from ..schema import schemas

# from ..database.configuration import get_db
from ..utils import hash, token, email_handler
from app.db import db


router = APIRouter(tags=["User Authentication"], prefix="/user")


@router.post("/login")
def login_alumni(
    user_cred: OAuth2PasswordRequestForm = Depends()
):
    user = db.user.find_first(where={"email": user_cred.username})
    print(user, user_cred)
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


@router.post("/register",status_code=status.HTTP_201_CREATED)
def create_alumni_account(user_to_create: schemas.SignUpUser):
    password = user_to_create.password
    confirm_password = user_to_create.confirm_password
    if password != confirm_password:
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail="Password doesn't match Confirm password")

    new_user_email = user_to_create.email
    found_user = db.user.find_first(where={"email": new_user_email})

    # If user is found return with error
    if found_user:
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail='User with email already exists')

    encrypted_password = hash.hash_password(password)
    db.user.create(data={
        "name": user_to_create.name,
        "email": new_user_email, 
        "password": encrypted_password
    })
    return {
            "status": status.HTTP_201_CREATED,
            "message": 'Successfully registered user'
        }



@router.post("/update", status_code=status.HTTP_201_CREATED, response_model=schemas.UserOutput)
def update_alumni_account(up_user: schemas.UpdateUser, 
                        cur_user:schemas.InternalUser = Depends(get_current_user)):
    updated_user = db.user.update(where={"id": cur_user.id}, 
    data={
        "name": up_user.name if up_user.name else cur_user.name,
        "phone_number": up_user.phone_number if up_user.phone_number else cur_user.phone_number,
        "contact_email": up_user.contact_email if up_user.contact_email else cur_user.contact_email,
        "graduation_year": up_user.graduation_year if up_user.graduation_year else cur_user.graduation_year,
        "graduated_track": up_user.graduated_track if up_user.graduated_track else cur_user.graduated_track,
        "about_you": up_user.about_you if up_user.about_you else cur_user.about_you,
        "city": up_user.city if up_user.city else cur_user.city,
        "company": up_user.company if up_user.company else cur_user.company,
        "position": up_user.position if up_user.position else cur_user.position,
        "telegram_handle": up_user.telegram_handle if up_user.telegram_handle else cur_user.telegram_handle,
        "telegram_id": up_user.telegram_id if up_user.telegram_id else cur_user.telegram_id,
        "is_volunteer": up_user.is_volunteer if up_user.is_volunteer else cur_user.is_volunteer
        })
    return updated_user

@router.get("/", response_model=schemas.UserOutput, status_code=status.HTTP_200_OK)
def get_current_alumni(cur_user:schemas.UserOutput = Depends(get_current_user)):
    return cur_user


@router.post("/forgot-password")
def forgot_password(
    university_email: str,
    background_tasks: BackgroundTasks,
):
    # user.forgot_password(user_email.email, background_tasks,  db)
    user = db.user.find_first(where={"email": university_email})

    if not user:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND,detail="User not found")
    
    email_handler.send_email(
        background_tasks, 
        'Forgotten Password: Reset your password', 
        university_email, {'title': 'Welcome'}, 
        "forgot_password.html")
    # background_tasks.add_task(reset_can_update_password, user, PASSWORD_RESET_INTERVAL, db)
    
    return Response(status_code=status.HTTP_200_OK)


@router.post("/update-password")
def update_password(
    user_info,
):
    # user.hash_update_password(user_info, db)
    return Response(status_code=status.HTTP_200_OK)


@router.post("/verify-account")
def verify_account(
    university_email: str,
    background_tasks: BackgroundTasks
):
    # user.verify_user_account(user_email.email, background_tasks,  db)
    user = db.user.find_first(where={"email": university_email})

    if not user:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND,detail="User not found")
    if user.is_verified:
        raise HTTPException(status_code=status.HTTP_202_ACCEPTED, detail="User already verified")

    verification_code = token.generate_user_verification_code()
    db.user.update(where={"id": user.id}, data={"verification_code": verification_code})
    print(verification_code)

    email_handler.send_email(background_tasks, "Account Verification: Let's make sure it is you", university_email, {'verification_code': verification_code}, "account_verification.html")
    # background_tasks.add_task(verification_expired, user, VERIFICATION_EXPIRATION_INTERVAL, db)
    
    return Response(status_code=status.HTTP_200_OK)


@router.post("/confirm_verification")
def confirm_verification(
    verify:schemas.VerificationCode,
):
    # user.confirm_verification(verify.code, verify.email, db)
    user = db.user.find_first(where={"email": verify.email})

    if not user:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND,detail="User not found")
    if user.is_verified:
        raise HTTPException(status_code=status.HTTP_202_ACCEPTED, detail="User already verified")
    if user.verification_code == "":
        raise HTTPException(status_code=status.HTTP_406_NOT_ACCEPTABLE, detail="Verification code expired")
    if user.verification_code != verify.code:
        raise HTTPException(status_code=status.HTTP_406_NOT_ACCEPTABLE, detail="Incorrect code")
    
    db.user.update(where={"id":user.id}, data={"is_verified": True})
    return Response(status_code=status.HTTP_200_OK)


from fastapi_sso.sso.generic import create_provider
from typing import Any, Callable, Dict, List, Optional, Type, Union
discovery = {
    "authorization_endpoint": 'https://sso.university.innopolis.ru/adfs/oauth2/authorize',
    "token_endpoint": "http://127.0.0.1:9001/api/v1/user/token_sso",
    "userinfo_endpoint": "http://127.0.0.1:9001/api/v1/user/user_sso",
}
# https://moodle.innopolis.university/auth/oauth2/login.php?id=1&wantsurl=%2F&sesskey=bxqcQ7BJwf
# https://sso.university.innopolis.ru/adfs/oauth2/authorize/?client_id=c393d763-6d21-4f25-9e64-857b6822336c&
# response_type=code&redirect_uri=https%3A%2F%2Fmoodle.innopolis.university%2Fadmin%2Foauth2callback.php&
# state=%2Fauth%2Foauth2%2Flogin.php%3Fwantsurl%3Dhttps%253A%252F%252F

# moodle.innopolis.university%252F%26sesskey%3DEfWRDuEBqD%26id%3D1&scope=openid%20profile%20email%20allatclaims&
# response_mode=form_post
SSOProvider = create_provider(name="oidc", discovery_document=discovery)
sso = SSOProvider(
    client_id="c393d763-6d21-4f25-9e64-857b6822336c",
    client_secret="secret",
    redirect_uri="http://127.0.0.1:9001/api/v1/user/callback",
    allow_insecure_http=True,
    scope=["openid"],
    )

@router.get("/login_sso")
async def login_with_sso():
    print("login_sso")
    print(sso)
    return await sso.get_login_redirect()

@router.get("/token_sso")
def token_callback_with_sso():
    print("token_sso")
    pass

@router.get("/user_sso")
def user_callback_with_sso():
    print("user_sso")
    pass

@router.get("/callback")
async def authentication_callback_with_sso(request: Request):
    print("callback", request)
    user = await sso.verify_and_process(request)
    print(user)
    pass