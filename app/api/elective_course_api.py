from typing import List
from fastapi import APIRouter, Depends, status, HTTPException
from app.db import db
from app.utils.oa2 import get_current_user
from app.utils.role_checker import admin_role
from app.schema import schemas

router = APIRouter(tags=["Elective Courses"], prefix="/elective_course")


@router.get("/", response_model=List[schemas.ElectiveCourseOutput],
            #  dependencies=[Depends(admin_role)]
             )
def get_all_elective_courses(cur_user:schemas.UserOutput = Depends(get_current_user)):
    booked_courses = db.courserequest.find_many(where={"user_id":cur_user.id, "status": "PENDING"})
    booked_courses_id = list(map(lambda c: c.course_id, booked_courses))
    courses = db.electivecourse.find_many(where={
        "id":   { "not_in": booked_courses_id }
    })
    return courses

@router.get("/booked")
def get_booked_elective_courses(cur_user:schemas.UserOutput = Depends(get_current_user)):
    courses = db.courserequest.find_many(where={"user_id":cur_user.id}, include={"elective_course": True})
    return courses

@router.post("/",  response_model=schemas.ElectiveCourse, status_code=status.HTTP_201_CREATED)
def create_elective_course(course: schemas.ElectiveCourse, cur_user:schemas.UserOutput = Depends(get_current_user)):
    courses: schemas.ElectiveCourse = db.electivecourse.create(data={
        "course_name": course.course_name,
        "instructor_name": course.instructor_name,
        "description": course.description,
        "mode": course.mode
        })
    return courses

@router.delete("/", status_code=status.HTTP_200_OK)
def disconnect_elective_course_request(course_request_id: str, cur_user:schemas.UserOutput = Depends(get_current_user)):
    course_to_delete = db.courserequest.find_first(where={
        "id": course_request_id,
        "user_id": cur_user.id
    })
    print(f"{course_request_id} ---- {cur_user.id} ---- {course_to_delete}")

    return db.courserequest.delete(where={
        "id": course_to_delete.id
        }, include={"elective_course": True})

@router.post("/request", status_code=status.HTTP_201_CREATED)
def request_elective_course(course_id: str, cur_user:schemas.UserOutput = Depends(get_current_user)):
    user_id = cur_user.id
    found_elective = db.electivecourse.find_unique(where={"id": course_id})
    if not found_elective:
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail="Course with this Id doesn't exist")
    
    already_being_processed = db.courserequest.find_first(where={"user_id": user_id, "course_id": course_id, "status": "PENDING"})
    if already_being_processed:
        raise HTTPException(status_code=status.HTTP_406_NOT_ACCEPTABLE, detail="Your request is already being processed. Be patient")
    created_elective_request = db.courserequest.create(data={
        "user_id": user_id,
        "course_id": course_id
    }, include={"elective_course": True})
    return created_elective_request