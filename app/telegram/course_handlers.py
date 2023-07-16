from functools import reduce
from app.telegram.core_handlers import bot, log, main_markup
from app.telegram import data, controller
from telebot.types import ReplyKeyboardMarkup, InlineKeyboardMarkup, InlineKeyboardButton


MODULE_NAME="ELECTIVES"

def attach_elective_module():

    @bot.message_handler(regexp=f"^{data.TEXT_BUTTON_ELECTIVE}$")
    def list_electives(message):
        log(MODULE_NAME, message)
        print(f"LIST ELECTIVE pressed by {message.from_user.id}")
        user = controller.get_user(message.from_user.id)
        if not user:
            bot.send_message(
            message.chat.id, data.MESSAGE_REGISTER_ACCOUNT, reply_markup=main_markup)
            return

        elective_courses = controller.get_elective_courses()

        course_details = reduce(
            lambda acc, x: f"{x.name} - {x.description}\n\n{acc}",
            elective_courses, "")
        course_details += f"\nClick on:\n/request_elective - Request participation in an elective course\n" \
            + f"/clear_electives - Cancel all pending request for electives"
        if not elective_courses:
            bot.send_message(
                message.chat.id, "There are no available elective courses", )
            return
        bot.send_message(
            message.chat.id, course_details)

    def handle_request_elective(message):
        if message.data == 'ACCEPT_REQUEST':
            request_id = message.message.text.split('[')[1].split(']')[0]
            print(request_id)
            request = controller.approve_request(request_id)
            request_result = controller.print_request_result(request)
            bot.send_message(request.user_id, request_result, reply_markup=main_markup)
            controller.update_user_courses(request.user_id, request.course_id)

            request_text = f"{message.message.text}\n\nStaff with telegram alias @{message.from_user.username} APPROVED ELECTIVE REQUEST."
            for id in data.ALUMNI_OFFICE_LIST:
                try:
                    bot.edit_message_text(
                        message_id=message.message.id, chat_id=id, text=request_text, reply_markup=InlineKeyboardMarkup())
                except:
                    print(
                        f"Error happened while sending volunteer message to {id}")
                    continue
        elif message.data == 'REFUSE_REQUEST':
            request_id = message.message.text.split('[')[1].split(']')[0]
            print(request_id)
            request = controller.reject_request(request_id)
            request_result = controller.print_request_result(request)
            bot.send_message(request.user_id, request_result, reply_markup=main_markup)
            
            request_text = f"{message.message.text}\n\nStaff with telegram alias @{message.from_user.username} REJECTED ELECTIVE REQUEST."
            for id in data.ALUMNI_OFFICE_LIST:
                try:
                    bot.edit_message_text(
                        message_id=message.message.id, chat_id=id, text=request_text, reply_markup=InlineKeyboardMarkup())
                except:
                    print(
                        f"Error happened while sending volunteer message to {id}")
                    continue

    @bot.message_handler(commands=['request_elective'])
    @bot.callback_query_handler(handle_request_elective)
    def elective_configuration(message):
        log(MODULE_NAME, message)
        print(f"REQUEST ELECTIVE pressed by {message.from_user.id}")
        user = controller.get_user(message.from_user.id)
        if not user:
            bot.send_message(
            message.chat.id, data.MESSAGE_REGISTER_ACCOUNT, reply_markup=main_markup)
            return

        options = ReplyKeyboardMarkup(True, False)

        elective_courses = controller.get_elective_courses()
        if not elective_courses:
            bot.send_message(
                message.chat.id, "There are no available elective courses", )
            return
        course_abbrevations = list(map(lambda x: x.name, elective_courses))

        options.add(*course_abbrevations)
        msg = bot.send_message(
            message.chat.id, data.REQUEST_ELECTIVE, reply_markup=options)
        bot.register_next_step_handler(
            msg, process_elective_step, course_abbrevations)

    def process_elective_step(message, elective_courses):
        log(MODULE_NAME, message)
        if not message.text:
            bot.send_message(message.chat.id, data.MESSAGE_ERROR,
                             reply_markup=main_markup)
            return

        elective = message.text
        if elective not in elective_courses:
            bot.send_message(message.chat.id, data.MESSAGE_ERROR,
                             reply_markup=main_markup)
            return
        elective_object = controller.get_elective_by_name(elective)
        user = controller.get_user(message.from_user.id)
        description = f"ELECTIVE REQUEST\n\nhandle: \n@{user.handle}\n\nEmail: \n{user.email}\n\nFull names: \n{user.fullnames}\n\n" + \
            f"Elective name: \n{elective_object.name}\n\nElective description: \n{elective_object.description}"
        request = controller.request_elective(elective, message.from_user.id, description)
        description = f"[{request.id}]\n\n{description}"
        keyboard = [
            [
                InlineKeyboardButton(
                    data.APPROVE_REQUEST, callback_data="ACCEPT_REQUEST")
            ],
            [
                InlineKeyboardButton(
                    data.REJECT_REQUEST, callback_data="REFUSE_REQUEST")
            ],
        ]
        reply_markup = InlineKeyboardMarkup(keyboard)

        for id in data.ALUMNI_OFFICE_LIST:
            try:
                bot.send_message(id, description, reply_markup=reply_markup)
            except:
                print(
                    f"Error happened while sending pass request message to {id}")
                continue
        bot.send_message(
            message.chat.id, data.MESSAGE_ELECTIVE_REQUEST_SUCCESSFUL, reply_markup=main_markup)

    @bot.message_handler(commands=['clear_electives'])
    def remove_elective(message):
        log(MODULE_NAME, message)
        print(f"REMOVE ELECTIVE pressed by {message.from_user.id}")
        requests = controller.get_pending_elective_request(
            message.from_user.id)

        if not requests:
            bot.send_message(
                message.chat.id, "No pending request for elective courses", reply_markup=main_markup)
            return
        controller.clear_pending_elective_request(message.from_user.id)
        bot.send_message(
            message.chat.id, data.CLEARED_ELECTIVE, reply_markup=main_markup)
