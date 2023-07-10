from typing import List
from fastapi import APIRouter, Depends, status
from app.db import db
from app.utils.oa2 import get_current_user
from ..schema import schemas

router = APIRouter(tags=["Elective Courses"], prefix="/elective_course")


@router.get("/", response_model=List[schemas.ElectiveCourseOutput])
def get_all_elective_courses(cur_user:schemas.UserOutput = Depends(get_current_user)):
    courses = db.electivecourse.find_many()
    return courses

@router.get("/booked")
def get_booked_elective_courses(cur_user:schemas.UserOutput = Depends(get_current_user)):
    courses = db.courserequest.find_many(where={"user_id":cur_user.id})
    return courses

@router.post("/",  response_model=schemas.ElectiveCourse, status_code=status.HTTP_201_CREATED)
def create_elective_course(course: schemas.ElectiveCourse, cur_user:schemas.UserOutput = Depends(get_current_user)):
    courses: schemas.ElectiveCourse = db.electivecourse.create(data={
        "course_name": course.course_name,
        "instructor_name": course.instructor_name,
        "description": course.description,
        "available_places": course.available_places if course.available_places else 0
        })
    return courses


@router.post("/request", status_code=status.HTTP_201_CREATED)
def request_elective_course(course_id: str, cur_user:schemas.UserOutput = Depends(get_current_user)):
    user_id = cur_user.id
    created_elective_request = db.courserequest.create(data={
        "user_id": user_id,
        "course_id": course_id
    })
    return {"data": created_elective_request, "status": status.HTTP_201_CREATED, 
            "detail": "request for elective course was created successfully"}