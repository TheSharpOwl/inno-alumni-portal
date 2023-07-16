from app.telegram.core_handlers import attach_core_module, compose_attached_modules
from app.telegram.request_pass_handlers import attach_request_pass_module
from app.telegram.donation_profile_handlers import attach_donation_profile_module
from app.telegram.course_handlers import attach_elective_module
from app.telegram.admin.handlers import attach_admin_module


def setup_telegram_bot():
    
    # attach required modules
    attach_core_module()
    attach_request_pass_module()
    attach_donation_profile_module()
    attach_elective_module()
    attach_admin_module()

    # compose modules and start listening
    compose_attached_modules()
