from app.telegram.core_handlers import bot, log, main_markup
from app.telegram import data, controller
from telebot.types import ReplyKeyboardMarkup, InlineKeyboardButton, InlineKeyboardMarkup


MODULE_NAME = "DONATION_PROFILE"


def attach_donation_profile_module():
    fullname = None

    @bot.message_handler(commands=['donate'])
    @bot.message_handler(regexp=f"^{data.TEXT_BUTTON_DONATE}$")
    def donate(message):
        log(MODULE_NAME, message)
        print(f"donation link pressed by {message.from_user.id}")
        user = controller.get_user(message.from_user.id)
        if not user:
            bot.send_message(
            message.chat.id, data.MESSAGE_REGISTER_ACCOUNT, reply_markup=main_markup)
            return
        bot.send_message(
            message.chat.id, data.DONATION_MESSAGE, reply_markup=main_markup, parse_mode="MarkdownV2")

    def handle_modify_profile_response(message):
        if message.data == 'UPDATE_PROFILE':
            bot.send_message(message.from_user.id, data.UPDATE_PROFILE_START, reply_markup=main_markup)
            msg = bot.send_message(message.from_user.id, data.REGISTER_PROMPT_FULLNAME,
                                    reply_markup=main_markup)
            bot.register_next_step_handler(msg, process_modify_fullname_step)
        if message.data == "CLEAR_HISTORY":
            bot.edit_message_text(message_id=message.message.id, chat_id=message.from_user.id, 
                                  text=message.message.text, reply_markup=InlineKeyboardMarkup())
            controller.clear_request_history(message.from_user.id)
    
    def process_modify_fullname_step(message):
        log(MODULE_NAME, message)
        if not message.text:
            bot.send_message(message.chat.id, data.MESSAGE_ERROR,
                             reply_markup=main_markup)
            return
        if message.text == "/cancel":
            bot.send_message(message.chat.id, data.MESSAGE_CANCEL,
                             reply_markup=main_markup)
            return
        global fullname
        fullname = message.text
        msg = bot.send_message(message.chat.id, data.REGISTER_PROMPT_EMAIL,
                                    reply_markup=main_markup)
        bot.register_next_step_handler(msg, process_modify_email_step)
        
    def process_modify_email_step(message):
        log(MODULE_NAME, message)
        if not message.text:
            bot.send_message(message.chat.id, data.MESSAGE_ERROR,
                             reply_markup=main_markup)
            return
        if message.text == "/cancel":
            bot.send_message(message.chat.id, data.MESSAGE_CANCEL,
                             reply_markup=main_markup)
            return
        email = message.text
        global fullname
        controller.update_user(message.from_user.id, email, fullname, message.from_user.username)
        bot.send_message(message.chat.id, data.UPDATE_PROFILE_SUCCESS,
                                    reply_markup=main_markup)


    @bot.message_handler(commands=['profile'])
    @bot.message_handler(regexp=f"^{data.TEXT_BUTTON_PROFILE}$")
    @bot.callback_query_handler(handle_modify_profile_response)
    def view_profile(message):
        log(MODULE_NAME, message)
        print(f"USER {message.from_user.id} wants to see profile")
        user = controller.get_full_user(message.from_user.id)
        if not user:
            bot.send_message(
            message.chat.id, data.MESSAGE_REGISTER_ACCOUNT, reply_markup=main_markup)
            return
        requests = controller.get_requests(message.from_user.id)
        display_request = list(
            map(lambda x: controller.print_request(x), requests))
        course_abbrevations = list(map(lambda x: x.name, user.courses))

        reply = f"Name: {user.fullnames}\nEmail: {user.email}" + \
        f"\n\nRequest Status:\n{''.join(display_request) if requests else 'NO REQUESTS'}" + \
            f"\nApproved Courses: {', '.join(course_abbrevations) if user.courses else 'NO COURSES'}"
        
        keyboard = [
            [
                InlineKeyboardButton(
                    data.UPDATE_PROFILE, callback_data="UPDATE_PROFILE")
            ],
            [
                InlineKeyboardButton(
                    data.CLEAR_HISTORY, callback_data="CLEAR_HISTORY")
            ]
        ]
        reply_markup = InlineKeyboardMarkup(keyboard)

        bot.send_message(message.chat.id, reply, reply_markup=reply_markup)

    def remind_configuration(message):
        log(MODULE_NAME, message)
        if message.text == '/config_remind':
            print(f"CONFIG REMIND pressed by {message.from_user.id}")
            markup = ReplyKeyboardMarkup(True, False)
            markup.add(data.MESSAGE_YES, data.MESSAGE_NO)
            msg = bot.send_message(
                message.chat.id, data.REQUEST_REMINDERS, reply_markup=markup)
            bot.register_next_step_handler(msg, process_reminders_step)

    def process_reminders_step(message):
        log(MODULE_NAME, message)
        if not message.text:
            bot.send_message(message.chat.id, data.MESSAGE_ERROR,
                             reply_markup=main_markup)
            return
        user_id = message.from_user.id
        print(f"{message.text} pressed by {message.from_user.id}")
        if message.text == data.MESSAGE_YES:
            controller.set_reminder_on(user_id)
        elif message.text == data.MESSAGE_NO:
            controller.set_reminder_off(user_id)
        else:
            bot.send_message(message.chat.id, data.MESSAGE_ERROR,
                             reply_markup=main_markup)
            return
        bot.send_message(
            message.chat.id, data.MESSAGE_SETTINGS_SAVED, reply_markup=main_markup)
