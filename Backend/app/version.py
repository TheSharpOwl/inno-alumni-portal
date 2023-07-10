from fastapi import APIRouter
from app.api import user_api
from app.api import elective_course_api
from app.api import pass_request_api

# from app.api import seedapi


router = APIRouter()

def version_one():
    router.include_router(user_api.router)
    router.include_router(pass_request_api.router)
    router.include_router(elective_course_api.router)


version_one()
