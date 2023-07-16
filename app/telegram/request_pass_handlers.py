from app.telegram.core_handlers import bot, log, main_markup
from app.telegram import data, controller
from telebot.types import InlineKeyboardButton, InlineKeyboardMarkup

MODULE_NAME = "REQUEST_PASS"


def attach_request_pass_module():
    number_of_visitors = None
    requested_date = None

    def handle_request_pass(message):
        if message.data == 'APPROVE_REQUEST':
            request_id = message.message.text.split('[')[1].split(']')[0]
            print(request_id)
            request = controller.approve_request(request_id)
            request_result = controller.print_request_result(request)
            bot.send_message(request.user_id, request_result, reply_markup=main_markup)
            request_text = f"{message.message.text}\n\nStaff with telegram alias @{message.from_user.username} APPROVED PASS REQUEST."
            for id in data.ALUMNI_OFFICE_LIST:
                try:
                    bot.edit_message_text(
                        message_id=message.message.id, chat_id=id, text=request_text, reply_markup=InlineKeyboardMarkup())
                except:
                    print(f"Error happened while sending message to {id}")
                    continue
        elif message.data == "REJECT_REQUEST":
            request_id = message.message.text.split('[')[1].split(']')[0]
            print(request_id)
            request = controller.reject_request(request_id)
            request_result = controller.print_request_result(request)
            bot.send_message(request.user_id, request_result, reply_markup=main_markup)
            request_text = f"{message.message.text}\n\nStaff with telegram alias @{message.from_user.username} REJECTED PASS REQUEST."
            for id in data.ALUMNI_OFFICE_LIST:
                try:
                    bot.edit_message_text(
                        message_id=message.message.id, chat_id=id, text=request_text, reply_markup=InlineKeyboardMarkup())
                except:
                    print(
                        f"Error happened while sending message to {id}")
                    continue
        elif message.data == "REQ_PASS_SIMPLE":
            request_text = f"{message.message.text}\n\nSimple pass request"
            bot.edit_message_text(message_id=message.message.id, chat_id=message.from_user.id, text=request_text, reply_markup=InlineKeyboardMarkup())
            msg = bot.send_message(message.from_user.id, data.REQUEST_DATE, reply_markup=main_markup)
            bot.register_next_step_handler(msg, process_simple_request_date_step)
         
        elif message.data == "REQ_PASS_EXTRA":
            request_text = f"{message.message.text}\n\nCompany pass request"
            bot.edit_message_text(message_id=message.message.id, chat_id=message.from_user.id, text=request_text, reply_markup=InlineKeyboardMarkup())
            msg = bot.send_message(message.from_user.id, data.REQUEST_NUMBER_VISITORS, reply_markup=main_markup)
            bot.register_next_step_handler(msg, process_number_of_individuals_step)
    

    @bot.message_handler(commands=['request_pass'])
    @bot.message_handler(regexp=f"^{data.TEXT_BUTTON_PASS}$")
    @bot.callback_query_handler(handle_request_pass)
    def request_pass(message):
        log(MODULE_NAME, message)
        print(f"REQUEST PASS pressed by {message.from_user.id}")
        user = controller.get_user(message.from_user.id)
        if not user:
            bot.send_message(
            message.chat.id, data.MESSAGE_REGISTER_ACCOUNT, reply_markup=main_markup)
            return

        keyboard = [
            [
                InlineKeyboardButton(
                    data.REQ_PASS_SIMPLE, callback_data="REQ_PASS_SIMPLE")
            ],
            [
                InlineKeyboardButton(
                    data.REQ_PASS_EXTRA, callback_data="REQ_PASS_EXTRA")
            ],
        ]
        reply_markup = InlineKeyboardMarkup(keyboard)
        bot.send_message(
            message.chat.id, data.REQUEST_PASS, reply_markup=reply_markup)

    def process_number_of_individuals_step(message):
        if message.text == "/cancel":
            bot.send_message(message.chat.id, data.MESSAGE_CANCEL,
                             reply_markup=main_markup)
            return

        if not message.text:
            bot.send_message(message.chat.id, data.MESSAGE_ERROR,
                             reply_markup=main_markup)
            return

        global number_of_visitors
        number_of_visitors = message.text

        msg = bot.send_message(
            message.chat.id, data.REQUEST_DATE, reply_markup=main_markup)
        bot.register_next_step_handler(
            msg, process_request_date_step)

    def process_request_date_step(message):
        if message.text == "/cancel":
            bot.send_message(message.chat.id, data.MESSAGE_CANCEL,
                             reply_markup=main_markup)
            return

        if not message.text:
            bot.send_message(message.chat.id, data.MESSAGE_ERROR,
                             reply_markup=main_markup)
            return

        global requested_date
        requested_date = message.text

        msg = bot.send_message(
            message.chat.id, data.REQUEST_VISITOR_NAMES, reply_markup=main_markup)
        bot.register_next_step_handler(
            msg, process_visitor_names_step)

    def process_visitor_names_step(message):
        if message.text == "/cancel":
            bot.send_message(message.chat.id, data.MESSAGE_CANCEL,
                             reply_markup=main_markup)
            return

        if not message.text:
            bot.send_message(message.chat.id, data.MESSAGE_ERROR,
                             reply_markup=main_markup)
            return
        user = controller.get_user(message.from_user.id)
        p_requests = controller.get_pending_pass_request(message.from_user.id)
        if len(p_requests) >= 1:
            bot.send_message(message.chat.id, data.MESSAGE_NO_MULTIPLE_PASS_REQUEST,
                             reply_markup=main_markup)
            return

        visitor_names = message.text
        global number_of_visitors, requested_date
        description = f"PASS REQUEST\n\nhandle: \n@{user.handle}\n\nEmail: \n{user.email}\n\n" + \
            f"Number of visitors: \n{number_of_visitors}\n\nRequested date: \n{requested_date}\n\nVisitor names: \n{user.fullnames}\n{visitor_names}"
        request = controller.request_pass(description, message.from_user.id)
        description = f"[{request.id}]\n\n{description}"
        keyboard = [
            [
                InlineKeyboardButton(
                    data.APPROVE_REQUEST, callback_data="APPROVE_REQUEST")
            ],
            [
                InlineKeyboardButton(
                    data.REJECT_REQUEST, callback_data="REJECT_REQUEST")
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
            message.chat.id, data.REQUEST_PASS_SENT, reply_markup=main_markup)

    def process_simple_request_date_step(message):
        if message.text == "/cancel":
            bot.send_message(message.chat.id, data.MESSAGE_CANCEL,
                             reply_markup=main_markup)
            return

        if not message.text:
            bot.send_message(message.chat.id, data.MESSAGE_ERROR,
                             reply_markup=main_markup)
            return
        user = controller.get_user(message.from_user.id)
        p_requests = controller.get_pending_pass_request(message.from_user.id)
        if len(p_requests) >= 1:
            bot.send_message(message.chat.id, data.MESSAGE_NO_MULTIPLE_PASS_REQUEST,
                             reply_markup=main_markup)
            return

        requested_date = message.text
        description = f"PASS REQUEST\n\nhandle: \n@{user.handle}\n\nEmail: \n{user.email}\n\n" + \
            f"Number of visitors: 1\n\nRequested date: \n{requested_date}\n\nVisitor names: \n{user.fullnames}"
        request = controller.request_pass(description, message.from_user.id)
        description = f"[{request.id}]\n\n{description}"
        keyboard = [
            [
                InlineKeyboardButton(
                    data.APPROVE_REQUEST, callback_data="APPROVE_REQUEST")
            ],
            [
                InlineKeyboardButton(
                    data.REJECT_REQUEST, callback_data="REJECT_REQUEST")
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
            message.chat.id, data.REQUEST_PASS_SENT, reply_markup=main_markup)

    @bot.message_handler(commands=['cancel_pass'])
    def cancel_pass(message):
        log(MODULE_NAME, message)
        print(f"DELETE PASS pressed by {message.from_user.id}")
        requests = controller.get_pending_pass_request(
            message.from_user.id)

        if not requests:
            bot.send_message(
                message.chat.id, "No pending pass request", reply_markup=main_markup)
            return
        controller.delete_pending_pass_request(message.from_user.id)
        bot.send_message(
            message.chat.id, data.CLEARED_PASS_REQUEST, reply_markup=main_markup)

    def handle_volunteer_response(message):
        if message.data == 'CAN_HANDLE_REQUEST':
            user_id = message.message.text.split('[')[1].split(']')[0]
            response_user = f"User with telegram alias @{message.from_user.username} is available and has volunteered to assist you. Please, write him immediately. Thanks for your patience."
            bot.send_message(user_id, response_user, reply_markup=main_markup)
            
            request_text = f"{message.message.text}\n\nUser with telegram alias @{message.from_user.username} is attending to the volunteer request. Thanks for being a volunteer."
            for id in data.VOLUNTEER_LIST:
                try:
                    bot.edit_message_text(
                        message_id=message.message.id, chat_id=id, text=request_text, reply_markup=InlineKeyboardMarkup())
                except:
                    print(
                        f"Error happened while sending volunteer message to {id}")
                    continue

    @bot.message_handler(commands=['volunteer'])
    @bot.callback_query_handler(handle_volunteer_response)
    def request_volunteer(message):
        log(MODULE_NAME, message)
        print(f"REQUEST VOLUNTEER {message.from_user.id}")
        user = controller.get_user(message.from_user.id)
        if not user:
            bot.send_message(
            message.chat.id, data.MESSAGE_REGISTER_ACCOUNT, reply_markup=main_markup)
            return

        keyboard = [
            [
                InlineKeyboardButton(
                    data.CAN_HANDLE_REQUEST, callback_data="CAN_HANDLE_REQUEST")
            ],
        ]
        reply_markup = InlineKeyboardMarkup(keyboard)
        request_text = f"User with telegram alias @{message.from_user.username} - [{message.from_user.id}] is requesting a volunteer. Indicate if you can assist them."
        for id in data.VOLUNTEER_LIST:
            try:
                bot.send_message(id, request_text, reply_markup=reply_markup)
            except:
                print(
                    f"Error happened while sending volunteer message to {id}")
                continue
        bot.send_message(
            message.chat.id, data.VOLUNTEER_REQUEST_SENT, reply_markup=main_markup)
