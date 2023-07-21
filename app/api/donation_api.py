from typing import List
from fastapi import APIRouter, Depends, status
from app.db import db
from app.utils.oa2 import get_current_user
from ..schema import schemas


router = APIRouter(tags=["Manage Donations"], prefix="/donation")



@router.get("/", response_model=List[schemas.DonationOutput])
def get_all_donations(cur_user:schemas.UserOutput = Depends(get_current_user)):
    donations = db.donation.find_many(where={"type": "ALUMNI"},order={"created_at": "desc"}, include={"user": True})
    return donations

@router.post("/", status_code=status.HTTP_201_CREATED)
def make_donation(donation: schemas.MakeDonation, cur_user:schemas.UserOutput = Depends(get_current_user)):
    
    created_donation = db.donation.create(data={
        "user_id": cur_user.id,
        "message": donation.message
    })

    return {"status": status.HTTP_201_CREATED, "detail": "Donation Successfully created ", "data": created_donation}

@router.get("/admin")
def get_admin_donation_message(cur_user:schemas.UserOutput = Depends(get_current_user)):
    donation_message = db.donation.find_first(where={"type": "ADMIN"},order={"created_at": "desc"})
    return donation_message

@router.post("/admin", status_code=status.HTTP_202_ACCEPTED)
def update_admin_donation_message(donation: schemas.MakeDonation, cur_user:schemas.UserOutput = Depends(get_current_user)):
    donationInfo = db.donation.find_first(where={"user_id": "cur_user.id", "type": "ADMIN"})
    upsert_donation = db.donation.upsert(
        where={
            "id": donationInfo.id if donationInfo else "",
        },
        data={
            "create": {
                "user_id": cur_user.id,
                "message": donation.message,
                "type": "ADMIN"
            },
            "update": {
                "message": donation.message,
            }
            
        }, 
    )

    return {"status": status.HTTP_202_ACCEPTED, "detail": "Donation Successfully created ", "data": upsert_donation}