import smtplib, ssl
import random 
from django.conf import settings
from .models import EmailCode

CODE_MIN = 1000000000
CODE_MAX = 9999999999

def send_confirmation_mail(receiver_email):
    port = 587   # For starttls
    smtp_server = "smtp.university.innopolis.ru"
    sender_email = "alumni.portal@innopolis.university"
    password = settings.EMAIL_PASSWORD
    code = random.randint(CODE_MIN, CODE_MAX)
    
    message = """Subject: Alumni Portal Registration


    Welcome to Alumni Portal! Your activation code is: {code}

    ___________________
    Regards,
    Alumni Portal Team
    """.format(code=code)
        
    smtp = smtplib.SMTP(smtp_server, port=port)

    smtp.ehlo()  # send the extended hello to our server
    smtp.starttls()  # tell server we want to communicate with TLS encryption

    smtp.login(sender_email, password)  # login to our email server

    smtp.sendmail(sender_email, receiver_email,
                message)
                
    smtp.quit()
    verification = EmailCode.objects.create(email=receiver_email, code=code)
    verification.save()
    return code 
    

def validate_innopolis_mail(mail):
    domain = mail[mail.find('@')+1:]
    if domain == 'innopolis.university' or domain == 'innopolis.ru':
        return send_confirmation_mail(mail)
    return -1 