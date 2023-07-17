from enum import Enum
import datetime
from typing import List, Optional
from pydantic import BaseModel, EmailStr

####### USER SCHEMAS
#######################################

class InternalUser(BaseModel):
    id: str
    email: EmailStr
    name: Optional[str]
    contact_email: EmailStr
    phone_number: Optional[str]
    graduated_track: Optional[str]
    graduation_year: Optional[str]
    about_you: Optional[str]
    city: Optional[str]
    company: Optional[str]
    position: Optional[str]
    telegram_handle: Optional[str]
    telegram_id: Optional[int]
    is_volunteer: Optional[bool]

class LogInUser(BaseModel):
    email: EmailStr
    password: str



class SignUpUser(BaseModel):
    name: str
    email: EmailStr
    password: str
    confirm_password: str

class UpdateUser(BaseModel):
    name: Optional[str]
    phone_number: Optional[str]
    contact_email: EmailStr
    graduation_year: Optional[str]
    graduated_track: Optional[str]
    about_you: Optional[str]
    city: Optional[str]
    company: Optional[str]
    position: Optional[str]
    telegram_handle: Optional[str]
    telegram_id: Optional[int]
    is_volunteer: Optional[bool]

    class Config():
        orm_mode = True

class UserOutput(BaseModel):
    name: Optional[str]
    email: EmailStr
    contact_email: Optional[EmailStr]
    phone_number: Optional[str]
    graduation_year: Optional[str]
    telegram_id: Optional[int]
    telegram_handle: Optional[str]
    position: Optional[str]
    company: Optional[str]
    city: Optional[str]
    about_you: Optional[str]
    graduated_track: Optional[str]
    is_volunteer: Optional[bool]

    class Config():
        orm_mode = True


class ConfirmationCode(BaseModel):
    code: int



####### ORDER PASS SCHEMAS
#######################################

class OrderPassRequest(BaseModel):
    requested_date: Optional[datetime.date]
    guests: Optional[List[str]] = None
    description: Optional[str] = None




####### ELECTIVE COURSE SCHEMAS
#######################################

class ElectiveCourse(BaseModel):
    course_name: str
    instructor_name: Optional[str] = None
    description: Optional[str] = None
    available_places: Optional[int] = None


class ElectiveCourseOutput(BaseModel):
    id: str
    course_name: str
    instructor_name: Optional[str] = None
    description: Optional[str] = None
    available_places: Optional[int] = None






class ShowUser(BaseModel):
    full_name: str
    email: str

    class Config():
        orm_mode = True


class User(BaseModel):
    email: EmailStr
    password: str


class UserForgotPassword(BaseModel):
    email: EmailStr


class UserVerifyAccount(BaseModel):
    email: EmailStr


class UserUpdatePassword(BaseModel):
    email: EmailStr
    password: str


class VerificationCode(BaseModel):
    code: str
    email: EmailStr


class UserOut(BaseModel):
    full_name: str
    email: EmailStr
    phone_number: Optional[str]
    address: Optional[str]
    avatar: Optional[str]
    birth_date: Optional[datetime.date]
    country: Optional[str]

    class Config():
        orm_mode = True


class UserEdit(BaseModel):
    address: Optional[str]
    avatar: Optional[str]


class SlotTypeEnum(str, Enum):
    LAB = "LAB"
    TUT = "TUT"
    LEC = "LEC"


class Slot(BaseModel):
    instructor_name: Optional[str]
    room_number:    Optional[str]
    start_time:   datetime.datetime
    end_time:  datetime.datetime
    course_name: Optional[str]
    type:       Optional[SlotTypeEnum]
    course_id: str
    group_id:     str

    class Config():
        orm_mode = True


class SlotUpdate(BaseModel):
    instructor_name: Optional[str]
    room_number:    Optional[str]
    start_time:    Optional[datetime.datetime]
    end_time:   Optional[datetime.datetime]
    course_name: Optional[str]
    type:       Optional[SlotTypeEnum]
    course_id:  Optional[str]
    group_id:      Optional[str]

    class Config():
        orm_mode = True


class SlotRange(BaseModel):
    start_date: datetime.date
    end_date: datetime.date

    class Config():
        orm_mode = True
