from typing import List
from fastapi import Depends, HTTPException
from app.schema import schemas
from app.utils.oa2 import get_current_user

class RoleChecker:
    def __init__(self, allowed_roles: List[str]) -> None:
        self.allowed_roles = allowed_roles

    def __call__(self, user: schemas.InternalUser = Depends(get_current_user)):
        if user.role not in self.allowed_roles:
            raise HTTPException(status_code=403, detail="Unauthorized [Role] - Operation not permitted")

admin_role = RoleChecker(["ADMIN"])