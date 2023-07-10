from fastapi import APIRouter, Depends, status
from app.db import db
from app.utils.oa2 import get_current_user
from ..schema import schemas


router = APIRouter(tags=["Obtain Pass"], prefix="/request_pass")


@router.get("/")
def get_all_pass_requests(cur_user:schemas.UserOutput = Depends(get_current_user)):

    pass_requests = db.passrequest.find_many(where={"user_id": cur_user.id},order={"requested_date": "desc"})
    return pass_requests

@router.post("/", status_code=status.HTTP_201_CREATED)
def order_pass(pass_request: schemas.OrderPassRequest, cur_user:schemas.UserOutput = Depends(get_current_user)):
    guest_info = ""
    if pass_request.guests:
        guest_info ="*_*".join(pass_request.guests)

    requested_pass = db.passrequest.create(data={
        "user_id": cur_user.id,
        "description": pass_request.description,
        "requested_date": pass_request.requested_date.isoformat(),
        "guest_info": guest_info
    })

    return {"status": status.HTTP_201_CREATED, "detail": "Successfully created pass order"}