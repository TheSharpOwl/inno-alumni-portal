from datetime import datetime
from app.telegram import data
from app.db import db

# USERS RELATED


def get_user(user_id):
    user = db.user.find_unique(where={'telegram_id': user_id})
    return user

def get_full_user(user_id):
    user = db.user.find_unique(
        where={'telegram_id': user_id},
        include={'pass_request': True, 'course_request': True}
    )
    return user

def register_user(user_id, email="", fullname="", handle=""):
    return db.user.create(data={
        "telegram_id": user_id,
        "telegram_handle": handle,
        "email": email,
        "name": fullname,
    })

def update_user(user_id, email="", fullname="", handle=""):
    return db.user.update(data={
        "telegram_handle": handle,
        "email": email,
        "name": fullname,
    }, where={
        "telegram_id": user_id
    })

def update_user_alias(user_id, handle):
    return db.user.update(where={'telegram_id': user_id}, data={"telegram_handle": handle})





def get_user_with_settings(user_id):
    user = db.user.find_unique(
        where={'telegram_id': user_id})
    return user


def get_user_with_course(user_id):
    user = db.user.find_unique(
        where={'telegram_id': user_id}, include={"course_request": True})
    return user


# GENERAL REQUESTS

# not done yet
def print_request(request):
    date = datetime.strptime(
        f"{request.created_at}", "%Y-%m-%d %H:%M:%S.%f%z")
    result = ""
    if request.type == 'ELECTIVE':
        result += f"ELECTIVE request is {request.status} for {request.course.description} - {date.strftime('%d/%m/%Y')}\n"
    else:
        result += f"{request.type} request is {request.status} - {date.strftime('%d/%m/%Y')}\n"
    return result

# not done yet
def print_request_result(request):
    date = datetime.strptime(
        f"{request.created_at}", "%Y-%m-%d %H:%M:%S.%f%z")
    result = ""
    if request.type == 'ELECTIVE':
        result += f"ELECTIVE request has been {request.status} for {request.course.description} - {date.strftime('%d/%m/%Y')}\n"
    else:
        result += f"PASS request has been {request.status} - {date.strftime('%d/%m/%Y')}\n"
    return result


def get_pass_request(user_id):
    requests = db.passrequest.find_many(
        where={'user_id': user_id},
        order={'created_at': 'desc'}
    )
    return requests

def get_course_request(user_id):
    requests = db.courserequest.find_many(
        where={'user_id': user_id},
        include={'elective_course': True},
        order={'created_at': 'desc'}
    )
    return requests

def get_pass_request_by_id(request_id):
    return db.passrequest.find_unique(where={"id":request_id})

def get_course_request_by_id(request_id):
    return db.courserequest.find_unique(where={"id":request_id})

def clear_pass_request_history(user_id):
    requests = db.passrequest.delete_many(
        where={'user_id': user_id,
               'status': {
                   "in": ["APPROVED", "REJECTED"]
               }
        })
    return requests

def clear_course_request_history(user_id):
    requests = db.courserequest.delete_many(
        where={'user_id': user_id,
               'status': {
                   "in": ["APPROVED", "REJECTED"]
               }
        })
    return requests
# '2023-03-24 08:11:10.059000+00:00' does not match format '%d/%m'

# ELECTIVE RELATED

# not done yet
def update_user_courses(user_id, course_id):
    return db.user.update(
        data={
            "courses": {
                "connect": {
                    "telegram_id": course_id
                }
            }
        },
        where={"telegram_id": user_id}
    )

def get_pending_elective_request(user_id):
    requests = db.courserequest.find_many(
        where={'user_id': user_id, "status": "PENDING"},
        include={'elective_course': True}
    )
    return requests

def get_pending_pass_requests(user_id):
    return db.passrequest.find_many(
        where={'user_id': user_id, "status": "PENDING"},
        include={'user': True}
    )

def clear_pending_elective_request(user_id):
    deleted = db.courserequest.delete_many(
        where={'user_id': user_id, "status": "PENDING"},
    )
    return deleted


def get_elective_courses():
    elective_courses = db.electivecourse.find_many()
    return elective_courses

def get_elective_by_name(elective_name):
    return db.electivecourse.find_first(where={"name": elective_name})

def request_elective(elective, user_id):
    course = db.electivecourse.find_first(where={"name": elective})
    if not course:
        return []

    return db.courserequest.create(data={
        "user_id": user_id,
        "course_id": course.id
    })


def clear_elective_courses(user_id, ids_to_disconnect):
    return db.user.update(
        data={
            "courses": {
                "disconnect": ids_to_disconnect
            }
        }, where={"telegram_id": user_id})


def get_electives(user_id):
    user = db.user.find_unique(
        where={"telegram_id": user_id},
        include={"course_request": True}
    )
    return user.elective_courses


# PASS RELATED

def request_pass(requested_date, description, user_id):
    user = db.user.find_unique(where={"telegram_id": user_id})
    return db.passrequest.create(data={
        "user_id": user.id,
        "description": description,
        "requested_date": requested_date
    })


def approve_pass_request(request_id, feedback):
    try:
        request = db.passrequest.update(
            data={"status": "APPROVED", "feedback": feedback},
            where={"id": request_id})
    except:
        print(
            f"Error: Probably request with id - {request_id} does not exist anymore")
    return request

def approve_course_request(request_id, feedback):
    try:
        request = db.courserequest.update(
            data={"status": "APPROVED", "feedback": feedback},
            where={"id": request_id}, include={"elective_course": True})
    except:
        print(
            f"Error: Probably request with id - {request_id} does not exist anymore")
    return request

def reject_pass_request(request_id, feedback):
    try:
        request = db.passrequest.update(
            data={"status": "REJECTED", "feedback": feedback},
            where={"id": request_id})
    except:
        print(
            f"Error: Probably request with id - {request_id} does not exist anymore")
    return request

def reject_course_request(request_id, feedback):
    try:
        request = db.courserequest.update(
            data={"status": "REJECTED", "feedback": feedback},
            where={"id": request_id},
            include={'elective_course': True})
    except:
        print(
            f"Error: Probably request with id - {request_id} does not exist anymore")
    return request

def get_pending_pass_request(user_id):
    user = db.user.find_unique(where={"telegram_id": user_id})
    requests = db.passrequest.find_many(
        where={'user_id': user.id, "status": "PENDING"}
    )
    return requests


def delete_pending_pass_request(user_id):
    user = db.user.find_unique(where={"telegram_id": user_id})
    deleted = db.passrequest.delete_many(
        where={'user_id': user.id, "status": "PENDING"},
    )
    return deleted


# \copy public."Slot" (telegram_id, instructor_name, room_number, start_time, end_time, course_id, type, group_id, specific_group, course_name) FROM '/Users/danielatonge/Downloads/week3_schedule/slot.csv' DELIMITER ',' CSV HEADER QUOTE '"' ESCAPE '''';


###############
# Helper methods
###############
