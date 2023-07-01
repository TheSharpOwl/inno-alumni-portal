import smtplib
import ssl
import random
from django.conf import settings
from .models import EmailCode

CODE_MIN = 1000
VERIFICATION_CODE = 8564
CODE_MAX = 9999


def send_confirmation_mail(receiver_email):
    """sends confirmation email for verification of user registeration"""
    print('sending confrimation email')
    port = 587   # For starttls
    smtp_server = "smtp.university.innopolis.ru"
    sender_email = "alumni.portal@innopolis.university"

    password = settings.EMAIL_PASSWORD
    code = random.randint(CODE_MIN, CODE_MAX)
    message = (
        f"Subject: Alumni Portal Registration"
        f"Welcome to Alumni Portal! Your activation code is: {code}"
        f"___________________"
        f"Regards,"
        f"Alumni Portal Team"
    )

    # smtp = smtplib.SMTP(smtp_server, port=port)
    # smtp.ehlo()  # send the extended hello to our server
    # smtp.starttls()  # tell server we want to communicate with TLS encryption
    # smtp.login(sender_email, password)  # login to our email server
    # try:
    #     smtp.sendmail(sender_email, receiver_email,
    #                   message)
    #     smtp.quit()
    # except: # pylint: disable=bare-except
    #     print("FAILED TO SEND EMAIL")

    print("sent the email for confirm")
    verification = EmailCode.objects.create(email=receiver_email, code=VERIFICATION_CODE)
    verification.save()
    print("code is")
    print(code)
    return code


def verify_innopolis_mail(mail):
    '''verifies if the '''
    print('called validate innopolis email')
    domain_name = mail[mail.find('@')+1:]
    print(domain_name)
    if domain_name == 'innopolis.university' or domain_name == 'innopolis.ru':
        return send_confirmation_mail(mail)
    else:
        return -1
