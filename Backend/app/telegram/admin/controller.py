from app.db import db
from app.telegram import data


def get_all_users():
    return db.user.find_many()


def get_user_by_alias(user_handle):
    return db.user.find_first(where={"handle": user_handle})


def get_elective_courses():
    return db.course.find_many(
        where={"is_elective": True}
    )


def get_groups():
    return db.group.find_many()


def get_group_users(group_name):
    group = db.group.find_first(
        where={"specific_group": group_name}, include={"users": True})
    if not group:
        return []
    return group.users


def get_elective_course_users(course_short_name):
    course = db.course.find_first(
        where={"short_name": course_short_name},
        include={"optional_course_users": True, "elective_users": True})
    if not course:
        return []
    if course.valid_group == 'ALL':
        users = course.optional_course_users
    else:
        users = course.elective_users
    return users
