from fastapi import HTTPException, status, Depends
from fastapi.security import OAuth2PasswordBearer
from app.db import db

from app.utils.token import verify_access_token


oauth2_scheme = OAuth2PasswordBearer(tokenUrl="/api/v1/user/login")

def get_current_user(token: str = Depends(oauth2_scheme)):
    credentials_exception = HTTPException(
        status_code = status.HTTP_401_UNAUTHORIZED,
        detail="Could not validate credentials",
        headers={"WWW-Authenticate": "bearer"}
    )
    email = verify_access_token(token, credentials_exception=credentials_exception)
    user = db.user.find_first(where={"email": email})
    return user