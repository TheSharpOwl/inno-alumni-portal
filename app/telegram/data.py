TOKEN = "5991107936:AAHGroqKwfyS88AUjckIzL3lUQre5l59gps"  # - InnoAlumniBot


TEXT_BUTTON_PASS = "PASS🃏"
TEXT_BUTTON_ELECTIVE = "ELECTIVES📓"
TEXT_BUTTON_DONATE = "DONATE💰"
TEXT_BUTTON_PROFILE = "PROFILE👤"


MESSAGE_HI = "Hi there, I am InnoAlumniBot!✋"
MESSAGE_HELP = "Simple assistant for Innopolis Alumni Community.\n\n" \
               "Some useful commands:\n" \
    "/register - Simple profile setup\n" \
    "/profile - View my profile information and status of requests\n" \
    "/request_elective - Request an elective course\n" \
    "/clear_electives - Cancel all pending request for electives\n" \
    "/request_pass - Request guest entrance passes on arrival to IU\n" \
    "/cancel_pass - Cancel pass request\n" \
    "/donate - Get a link where you can securely donate to Alumni Club\n" \
    "/volunteer - Get urgent access to the university campus\n" \
    "/feedback - Suggest improvements and share bugs\n\nContact @Hardriive for your suggestions."
#    "/register_and_auth - Register and authenticate\n" \
# "/upload_certificate - Upload a copy of your diploma\n" \
# "/config_remind - Remind me of any status updates (true by default)\n" \

MESSAGE_ERROR = "Sorry, I did not understand you. Aborting command ..."

MESSAGE_CANCEL = "Process successfully cancelled"
MESSAGE_UNKNOWN = "Unknown message from"
MESSAGE_FEEDBACK = "Feedback message from"
FEEDBACK_PROMPT = "Leave your feedback"
FEEDBACK_SUCCESS = "Your feedback was successfully received.\nThe InnoAlumni bot team will review your feedback and contact you if necessary within the next 24hrs"
ERROR_PROMPT = "Sorry, an error occurred. Try again later."

MESSAGE_USER_NOT_configD = "Sorry. I do not know your groups yet. 😥\n" \
    "Please use /config_schedule command to set it up"
MESSAGE_FREE_DAY = "No lessons on this day! Lucky you are!"


MESSAGE_ELECTIVE_REQUEST_SUCCESSFUL = "Your request has been received and is currently pending approval!\n" \
    "Use /request_elective to add another elective\n" \
    "Use /clear_electives to clear all pending requests for electives"
MESSAGE_NO_ELECTIVE_COURSES = "No elective courses available at the moment"


LOG_FILE_NAME = 'log'
LOG_MAX_SIZE_BYTES = 1024 * 1024 * 10  # 10 MB
LOG_NAME = 'logger'
LOG_BACKUP_COUNT = 1
LOG_MESSAGE_FORMAT = "%(asctime)s :: %(message)s"
LOG_DATE_FORMAT = "%d.%m.%Y :: %H:%M:%S"

REGISTER_START = "Register your account.\nUse /cancel to stop the process at any point in time."
REGISTER_PROMPT_FULLNAME = "Enter your full names:"
REGISTER_PROMPT_EMAIL = "Enter your historic inno-email address:\n(Don't bother if it isn't functional)"
REGISTER_SUCCESS = "Your registration was successfully.\nExplore the bots functionalities."
MESSAGE_REGISTER_ACCOUNT = "Register your accout using the /start command"
UPDATE_PROFILE = "Modify profile info 📒"
UPDATE_PROFILE_START = "Update your profile info.\nUse /cancel to stop the process at any point in time."
UPDATE_PROFILE_SUCCESS = "Your profile update went successfully.\nExplore the bots functionalities."


MESSAGE_NO_MULTIPLE_PASS_REQUEST = "You are not allowed to have multiple pending university pass requests"

# PROFILE
CLEAR_HISTORY = "Clear request history 📜"


# ELECTIVE

REQUEST_ELECTIVE = "Select an elective?"
CLEARED_ELECTIVE = "All pending requests for electives have been successfully removed.\n Use /request_elective to create new request for electives"


HEADER_NOW = "\n"
HEADER_WEEK = "\n"
HEADER_NEXT = "\n"
HEADER_NO_NEXT_LESSONS = "                  🗽"
HEADER_SEPARATOR = "\n"
HEADER_REMIND = "⏰\n"


MESSAGE_YES = "Yes 🙋"
MESSAGE_NO = "No 🙅"

MESSAGE_REMIND_SETTINGS_SAVED = "Your remind settings have been saved successfully!"


# REQUEST PASS
APPROVE_REQUEST = "Approve   ✅"
REJECT_REQUEST = "Reject    ❌"

REQUEST_PASS = "Requesting a pass:\nAlone - simple pass for one person (you).\nWith company - pass for 2 or more people."
REQUEST_NUMBER_VISITORS = "How many individuals in total will be visiting?"
REQUEST_DATE = "Enter the date you wish to visit in the format (DD/MM)? \nUniversity passes are issued Monday - Friday, 9:00 - 18:00\n\n" + \
    "Use /volunteer to schedule urgent or impromptu visits."
REQUEST_VISITOR_NAMES = "Enter fullnames of each visitor all in one message.(excluding your name)"
REQUEST_PASS_SENT = "Please, do not forget to hold identification documents when visiting the University.\n\nYour pass request has been sent and is pending approval.\n\nUse /profile to know the status of your request."


CLEARED_PASS_REQUEST = "Your pending pass request has been successfully cancelled.\nUse /request_pass to create new pass request."

REQ_PASS_SIMPLE = "Alone 🧑"
REQ_PASS_EXTRA = "With company 👪"

# REQUEST VOLUNTEER
VOLUNTEER_LIST = [498255810]
CAN_HANDLE_REQUEST = "I will handle request"
CANNOT_HANDLE_REQUEST = "I can not handle request"
VOLUNTEER_REQUEST_SENT = "Your request for a volunteer has been sent. The first available volunteer will reach out to you via telegram.\n\nIf no response, please send new volunteer request in 15mins."


ALUMNI_OFFICE_LIST = [498255810]


DEVELOPER_LIST = [498255810]
ADMIN_LIST = [498255810]
SUPERADMIN_LIST = [498255810]

# DONATION

DONATION_MESSAGE = '''
*КАРТОЧКА ПРЕДПРИЯТИЯ*

*Полное наименование*: 
Автономная некоммерческая организация высшего образования «Университет Иннополис»

*Сокращенное наименование*:
АНО ВО «Университет Иннополис»

*Директор*: 
Семенихин Кирилл Владимирович

*Главный бухгалтер*: 
Симонова Лилия Вахитовна

*ОГРН*: 1121600006142

*ИНН*: 1655258235

*КПП*: 161501001

*ОКПО*: 26762138

*Адрес местонахождения Организации*: 
420500, Республика Татарстан, г\. Иннополис, ул\. Университетская, д\.1

*Почтовый адрес*: 
420500, Республика Татарстан, г\. Иннополис, ул\. Университетская, д\.1

*Расчетный счет*:	40703810062000000497

*Банк*: ОТДЕЛЕНИЕ N8610 СБЕРБАНКА РОССИИ Г\. КАЗАНЬ

*БИК*: 049205603

*Корреспондентский счет*: 30101810600000000603

'''
# write action that the user should take as follow up. Simple successful actions are not enough
# Feedback by Stas
