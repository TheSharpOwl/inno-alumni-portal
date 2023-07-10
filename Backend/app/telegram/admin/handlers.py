import telebot
from app.telegram.core_handlers import bot, log
from app.telegram.admin import controller
from app.telegram.admin import data


def attach_admin_module():
    admin_commands = ['die', 'log', 'spam', 'pm',
                      'helpa', 'spam_course', 'spam_group']

    @bot.message_handler(commands=admin_commands)
    def admin(message):
        """
        Register module's commands
        """
        log(data.MODULE_NAME, message)
        # only admins from list are allowed to call admin commands
        if message.from_user.id not in data.ADMIN_LIST:
            bot.send_message(message.chat.id, data.MESSAGE_UNAUTHORIZED)
            return

        if message.text == "/die":
            if message.from_user.id not in data.SUPERADMIN_LIST:
                return
            raise Exception
        elif message.text == '/log':
            bot.send_document(message.chat.id, open('log', 'rb'))
        elif message.text == '/spam':
            if message.from_user.id not in data.SUPERADMIN_LIST:
                return
            msg = bot.send_message(
                message.chat.id, data.REQUEST_SPAM_MESSAGE)
            users = controller.get_all_users()
            user_ids = list(map(lambda x: x.id, users))
            bot.register_next_step_handler(msg, process_spam_step, user_ids)
        elif message.text == '/spam_course':
            if message.from_user.id not in data.SUPERADMIN_LIST:
                return
            options = telebot.types.ReplyKeyboardMarkup(True, False)
            # add buttons to choose course
            elective_courses = controller.get_elective_courses()
            short_names = list(
                map(lambda course: course.short_name, elective_courses))
            options.add(*short_names)
            msg = bot.send_message(
                message.chat.id, data.REQUEST_COURSE, reply_markup=options)
            bot.register_next_step_handler(
                msg, process_course_step, short_names)
        elif message.text == '/spam_group':
            if message.from_user.id not in data.SUPERADMIN_LIST:
                return
            options = telebot.types.ReplyKeyboardMarkup(True, False)
            # add buttons to choose course
            groups = controller.get_groups()
            short_names = list(
                map(lambda grp: grp.specific_group, groups))
            options.add(*short_names)
            msg = bot.send_message(
                message.chat.id, data.REQUEST_GROUP, reply_markup=options)
            bot.register_next_step_handler(
                msg, process_group_step, short_names)
        elif message.text == '/pm':
            # private message to specific user
            msg = bot.send_message(
                message.chat.id, data.REQUEST_PERSONAL_ALIAS)
            bot.register_next_step_handler(msg, process_pm_alias_step)
        elif message.text == '/helpa':
            # send admin commands help
            bot.send_message(
                message.chat.id, f"VALID ADMIN COMMANDS:\n{'   '.join(admin_commands)}")

    def process_course_step(message, short_names):
        log(data.MODULE_NAME, message)
        if not message.text:
            bot.send_message(message.chat.id, data.MESSAGE_ABORTED)
            return
        if message.text == "C":
            bot.send_message(message.chat.id, data.MESSAGE_ABORTED)
            return
        if message.text not in short_names:
            bot.send_message(message.chat.id, data.MESSAGE_ERROR)
            return
        elective_course = message.text
        users = controller.get_elective_course_users(elective_course)
        user_ids = list(map(lambda x: x.id, users))
        print(user_ids)
        msg = bot.send_message(message.chat.id, data.REQUEST_SPAM_COURSE_MESSAGE,
                               reply_markup=telebot.types.ReplyKeyboardRemove())
        bot.register_next_step_handler(msg, process_spam_step, user_ids)

    def process_group_step(message, group_names):
        log(data.MODULE_NAME, message)
        if not message.text:
            bot.send_message(message.chat.id, data.MESSAGE_ABORTED)
            return
        if message.text == "C":
            bot.send_message(message.chat.id, data.MESSAGE_ABORTED)
            return
        if message.text not in group_names:
            bot.send_message(message.chat.id, data.MESSAGE_ERROR)
            return
        group_name = message.text
        users = controller.get_group_users(group_name)
        user_ids = list(map(lambda x: x.id, users))

        msg = bot.send_message(message.chat.id, data.REQUEST_SPAM_GROUP_MESSAGE,
                               reply_markup=telebot.types.ReplyKeyboardRemove())
        bot.register_next_step_handler(msg, process_spam_step, user_ids)

    def process_spam_step(message, user_ids=[]):
        log(data.MODULE_NAME, message)
        # abort operation if needed
        if message.text == "C":
            bot.send_message(message.chat.id, data.MESSAGE_ABORTED)
            return
        # iterate over all users and SPAM
        for id in user_ids:
            try:
                bot.send_message(id, message.text)
            except:
                print(f"Error happened while sending mass message to {id}")
                continue
        bot.send_message(message.chat.id, data.MESSAGE_SENT_EVERYBODY)

    def process_pm_alias_step(message):
        """
        Get alias of user to send private message
        """
        log(data.MODULE_NAME, message)
        # abort operation if needed
        if message.text == "C":
            bot.send_message(message.chat.id, data.MESSAGE_ABORTED)
            return
        alias = message.text.strip()
        # remove '@' at beginning
        if alias[0] == '@':
            alias = alias[1:]
        user = controller.get_user_by_alias(alias)
        if user is None:
            bot.send_message(message.chat.id, data.MESSAGE_USER_NOT_FOUND)
            return
        msg = bot.send_message(
            message.chat.id, f"{data.REQUEST_PERSONAL_MESSAGE}{alias}")
        bot.register_next_step_handler(msg, process_spam_step, [user.id])
