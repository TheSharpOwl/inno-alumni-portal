from anyio import Path
from fastapi import BackgroundTasks
from fastapi_mail import FastMail, MessageSchema, ConnectionConfig
from app.config import settings

config = ConnectionConfig(
    MAIL_USERNAME=settings.mail_username,
    MAIL_PASSWORD=settings.mail_password,
    MAIL_FROM=settings.mail_from,
    MAIL_PORT=int(settings.mail_port),
    MAIL_SERVER=settings.mail_server,
    MAIL_FROM_NAME=settings.mail_from_name,
    MAIL_STARTTLS = True,
    MAIL_SSL_TLS = False,
    # MAIL_TLS=True,
    # MAIL_SSL=False,
    # USE_CREDENTIALS=True,
    # VALIDATE_CERTS = True,
    TEMPLATE_FOLDER= Path(__file__).parent.parent / 'templates'
)


def send_email(background_tasks: BackgroundTasks, subject: str, email_to: str, body: dict, template_name):
    message = MessageSchema(
        subject=subject,
        recipients=[email_to],
        template_body=body,
        subtype='html',
    )
    print(config)
    fm = FastMail(config)
    background_tasks.add_task(
       fm.send_message, message, template_name=template_name)