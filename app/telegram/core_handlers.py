import time
import telebot
import logging
from threading import Thread
from logging.handlers import RotatingFileHandler
from app.telegram import data, controller
from app.telegram.admin.data import SUPERADMIN_LIST

MODULE_NAME = "core"
bot = telebot.TeleBot(token=data.TOKEN)


main_markup = telebot.types.ReplyKeyboardMarkup(True)
main_markup.add(data.TEXT_BUTTON_PASS, data.TEXT_BUTTON_ELECTIVE, data.TEXT_BUTTON_PROFILE,
                data.TEXT_BUTTON_DONATE)

commands = [
    telebot.types.BotCommand("start", "starts InnoAlumni bot"),
    # telebot.types.BotCommand("register", "simple profile setup"),
    # telebot.types.BotCommand("register_and_auth", "Register and authenticate"),
    telebot.types.BotCommand(
        "profile", "View my profile information and status of requests"),
    telebot.types.BotCommand("request_elective", "Request an elective course"),
    telebot.types.BotCommand(
        "clear_electives", "Cancel all pending request for electives"),
    telebot.types.BotCommand(
        "request_pass", "Request guest entrance passes on arrival to IU"),
    telebot.types.BotCommand(
        "cancel_pass", "Cancel pass request"),
    telebot.types.BotCommand(
        "donate", "Get a link you can use to securely donate to Alumni Club"),
    telebot.types.BotCommand(
        "volunteer", "Get urgent access to the university campus"),
    # telebot.types.BotCommand(
    #     "cancel", "Exit from any user flow process while using the bot"),
    # telebot.types.BotCommand("upload_certificate",
    #                          "Upload a copy of your diploma "),
    # telebot.types.BotCommand(
    #     "config_remind", "Remind me of any status updates (true by default)"),
    telebot.types.BotCommand(
        "feedback", "Suggest improvements and share bugs"),
    telebot.types.BotCommand("help", "Overview of bot commands"),
]
# log configuration
logger = logging.getLogger(data.LOG_NAME)
logger.setLevel(logging.INFO)
handler = RotatingFileHandler(data.LOG_FILE_NAME, maxBytes=data.LOG_MAX_SIZE_BYTES,
                              backupCount=data.LOG_BACKUP_COUNT)
handler.setFormatter(logging.Formatter(
    data.LOG_MESSAGE_FORMAT, data.LOG_DATE_FORMAT))
logger.addHandler(handler)


def log(module, message):
    if message.from_user.username:
        user = message.from_user.username
    else:
        user = str(message.from_user.id)
    logger.info(f"{module.rjust(15)} :: {user.rjust(20)} ::"
                f"{message.text if message.text else '--not_text--'}")


def attach_core_module():
    fullname = None

    @bot.message_handler(commands=['start'])
    def start_command(message):
        log(MODULE_NAME, message)
        print(f"USER {message.from_user.id} clicked start")
        bot.send_message(message.chat.id, data.MESSAGE_HI, reply_markup=main_markup)
        user = controller.get_user(message.from_user.id)
        if user is None:
            bot.send_message(message.chat.id, data.REGISTER_START, reply_markup=main_markup)
            msg = bot.send_message(message.chat.id, data.REGISTER_PROMPT_FULLNAME,
                                    reply_markup=main_markup)
            bot.register_next_step_handler(msg, process_register_fullname_step)

    def process_register_fullname_step(message):
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
        bot.register_next_step_handler(msg, process_register_email_step)
        
    def process_register_email_step(message):
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
        controller.register_user(message.from_user.id, email, fullname, message.from_user.username)
        bot.send_message(message.chat.id, data.REGISTER_SUCCESS,
                                    reply_markup=main_markup)





    @bot.message_handler(commands=['help'])
    def help_command(message):
        log(MODULE_NAME, message)
        print(f"USER {message.from_user.id} clicked help")
        bot.send_message(message.chat.id, data.MESSAGE_HELP,
                             reply_markup=main_markup)

    @bot.message_handler(commands=['feedback'])
    def send_feedback(message):
        log(MODULE_NAME, message)
        print(f"USER {message.from_user.id} wants to send feedback")
        user = controller.get_user(message.from_user.id)
        if not user:
            bot.send_message(
            message.chat.id, data.MESSAGE_REGISTER_ACCOUNT, reply_markup=main_markup)
            return
        msg = bot.send_message(message.chat.id, data.FEEDBACK_PROMPT,
                                reply_markup=main_markup)
        bot.register_next_step_handler(msg, process_feedback_step)

    def process_feedback_step(message):
        log(MODULE_NAME, message)
        if not message.text:
            bot.send_message(message.chat.id, data.MESSAGE_ERROR,
                             reply_markup=main_markup)
            return

        user = controller.get_user(message.from_user.id)
        if not user:
            return
        alias = user.handle if user.handle else user.id
        feedback = message.text
        for admin in SUPERADMIN_LIST:
            bot.send_message(
                admin, f"{data.MESSAGE_FEEDBACK} {str(alias)}:\n{feedback}")
        bot.send_message(message.chat.id, data.FEEDBACK_SUCCESS,
                         reply_markup=main_markup)


def compose_attached_modules(set_proxy=False):

    @bot.message_handler()
    def garbage_message_handler(message):
        """
        Fallback handler for unknown messages
        To be called after all other modules have mounted their handlers
        """
        log(MODULE_NAME, message)
        # You could implement chatgpt or just Q&A over here
        bot.send_message(message.chat.id, data.MESSAGE_ERROR,
                         reply_markup=main_markup)
        user = controller.get_user(message.from_user.id)
        if not user:
            return
        alias = user.handle if user.handle else user.id
        for admin in SUPERADMIN_LIST:
            bot.send_message(
                admin, f"{data.MESSAGE_UNKNOWN} {str(alias)}:\n{message.text}")

    def polling_telegram_bot_commands():
        print("Bot begins polling")
        bot.infinity_polling(long_polling_timeout=5, timeout=10)

    # bot.delete_my_commands()
    # bot.set_my_commands(commands=commands)
    Thread(target=polling_telegram_bot_commands, daemon=True).start()
