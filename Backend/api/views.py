from django.shortcuts import redirect
from rest_framework import viewsets
from rest_framework.permissions import AllowAny
from rest_framework.views import APIView
from rest_framework.response import Response
from .serializers import RegisterSerializer
from rest_framework.authentication import SessionAuthentication, TokenAuthentication
from rest_framework import generics
from knox.views import LoginView as KnoxLoginView
import urllib 
from .serializers import AlumniSerializer, ElectiveCourseSerializer
from .models import Alumni, ElectiveCourse, EmailCode, ElectiveCourseRequest
from django.conf import settings
from datetime import datetime
import smtplib, ssl


class AlumniDetailAPI(APIView):
  authentication_classes = (TokenAuthentication,)
  permission_classes = (AllowAny,)
  http_method_names = ['get', 'head', 'post']

  def get(self, request):
    alumni = Alumni.objects.get(user_ptr_id=request.user.id)
    serializer = AlumniSerializer(alumni)
    return Response(serializer.data)

  def post(self, request):
    self.http_method_names.append("GET")
    alumni = Alumni.objects.get(user_ptr_id=request.user.id)
    serializer = AlumniSerializer(alumni)
    return Response(serializer.data)


class ElectiveCourseDetailAPI(APIView):
  authentication_classes = (TokenAuthentication,)
  permission_classes = (AllowAny,)
  http_method_names = ['get', 'head', 'post']

  def get(self, request):
    # print(request.user.id)
    alumni = Alumni.objects.get(user_ptr_id=request.user.id)
    if alumni.verified == False:
        return Response(status = 403, data={"status": "User needs to verify the email"})

    courses = ElectiveCourse.objects.all()
    data = []
    for course in courses: 
      exists = ElectiveCourseRequest.objects.filter(alumni=alumni, course=course).count() 
      if exists == 0:
        serializer = ElectiveCourseSerializer(course)
        data.append(serializer.data)
    return Response(data)


class BookedCoursesDetailAPI(APIView):
  authentication_classes = (TokenAuthentication,)
  permission_classes = (AllowAny,)
  http_method_names = ['get', 'head', 'post']

  def get(self, request):
    print(request.user.id)
    alumni = Alumni.objects.get(user_ptr_id=request.user.id)
    if alumni.verified == False:
        return Response(status=403, data={"status": "User needs to verify the email"})

    courses = ElectiveCourse.objects.all()
    data = []
    for course in courses:
      exists = ElectiveCourseRequest.objects.filter(alumni=alumni, course=course).count() 
      if exists > 0:
        serializer = ElectiveCourseSerializer(course)
        data.append(serializer.data)
    return Response(data)


# Class based view to register user
class RegisterAlumniAPIView(generics.CreateAPIView):
  permission_classes = (AllowAny,)
  serializer_class = RegisterSerializer


class AlumniViewSet(viewsets.ModelViewSet):
    queryset = Alumni.objects.all().order_by('email')
    serializer_class = AlumniSerializer


def validate_date_format(requested_date):
  date_format = "%d/%m/%y"
  try:
    return bool(datetime.strptime(requested_date, date_format))
  except ValueError:
    return False


def send_pass_email(name, requested_date, invited_guests):
  receiver_email = "n.novarlic@innopolis.ru" # this attribute has to be changed in future
  
  visitors = "\t1. {name}\n".format(name=name)
  count = 1

  for guest in invited_guests:
    count += 1
    visitors += "\t{count}. {guest}\n".format(count=str(count), guest=guest)

  message = u"""Subject: Alumni Pass Order

  
  Добрый день!

  Направляю на согласование список выпускников АНО ВО “Университета Иннополис” для посещения УЛК. 

  Список посетителей:

{visitors}
  Дата посещения: {date}
  Ответственные: (ФИО сотрудника УИ)
  """.format(date=requested_date, visitors=visitors)

  port = 587   # For starttls
  smtp_server = "smtp.university.innopolis.ru"
  sender_email = "alumni.portal@innopolis.university"
  password = settings.EMAIL_PASSWORD

  smtp = smtplib.SMTP(smtp_server, port=port)

  smtp.ehlo()  
  smtp.starttls()  

  smtp.login(sender_email, password)  

  smtp.sendmail(sender_email, receiver_email,
              message.encode("utf-8"))
              
  smtp.quit()


class PassOrderAPI(APIView):
  authentication_classes = (TokenAuthentication,)
  permission_classes = (AllowAny,)
  http_method_names = ['get', 'head', 'post']
  
  def post(self, request):
    alumni = Alumni.objects.get(user_ptr_id=request.user.id)
    if alumni.verified == False:
        return Response(status=403, data={"status": "User needs to verify the email"})

    '''
    ### Might be useful later
    message = f"{alumni.name} requested a pass."
    url = f"https://api.telegram.org/bot{settings.TELEGRAM_TOKEN}/sendMessage?chat_id={settings.CHAT_ID}&text={message}".replace(" ", "%20")
    urllib.request.urlopen(url)
    '''
    requested_date = request.data['date']
    invited_guests = request.data['invited_guests']

    if not validate_date_format(requested_date):
      return Response(status=402, data={"status": "Wrong date format"})
    if alumni.name_russian == "":
      return Response(status=402, data={"status": "There is no Russian version of name for current Alumni"})
    
    send_pass_email(alumni.name_russian, requested_date, invited_guests)  

    return Response({"status": "Pass Ordered"})


class VerifyMailAPI(APIView):
  authentication_classes = (TokenAuthentication,)
  permission_classes = (AllowAny,)
  http_method_names = ['get', 'head', 'post']
  
  def post(self, request):
    alumni = Alumni.objects.get(user_ptr_id=request.user.id)
    code = EmailCode.objects.get(email=alumni.email).code
    print(code)
    if request.data['code'] == code:
      alumni = Alumni.objects.filter(user_ptr_id=request.user.id).update( verified=True)
      return Response({"status": "Successfuly Verified"})
    else:
      return Response(status = 402, data={"status": "User failed to verify mail"})


class UpdateProfileAPI(APIView):
  authentication_classes = (TokenAuthentication,)
  permission_classes = (AllowAny,)
  http_method_names = ['get', 'head', 'post']
  
  def post(self, request):
    alumni = Alumni.objects.get(user_ptr_id=request.user.id)
    if alumni.verified == False:
        return Response(status = 403, data={"status": "User needs to verify the email"})
    try:
      if request.data['name'] is not None:
        alumni = Alumni.objects.filter(user_ptr_id=request.user.id).update(name=request.data['name'])
    except:
      pass 
    
    try:
      if request.data['name_russian'] is not None:
        alumni = Alumni.objects.filter(user_ptr_id=request.user.id).update(name_russian=request.data['name_russian'])
    except:
      pass 

    try:
      if request.data['field_of_study'] is not None:
        alumni = Alumni.objects.filter(user_ptr_id=request.user.id).update(filed_of_study=request.data['field_of_study'])
    except:
      pass 

    try:
      if request.data['graduation_year'] is not None:
        alumni = Alumni.objects.filter(user_ptr_id=request.user.id).update(graduation_year=request.data['graduation_year'])
    except:
      pass 

    try:
      if request.data['bio'] is not None:
        alumni = Alumni.objects.filter(user_ptr_id=request.user.id).update(bio=request.data['bio'])
    except:
      pass 

    try:
      if request.data['city'] is not None:
        alumni = Alumni.objects.filter(user_ptr_id=request.user.id).update(city=request.data['city'])
    except:
      pass 

    try:
      if request.data['company'] is not None:
        alumni = Alumni.objects.filter(user_ptr_id=request.user.id).update(company=request.data['company'])
    except:
      pass 

    try:
      if request.data['position'] is not None:
        alumni = Alumni.objects.filter(user_ptr_id=request.user.id).update(position=request.data['position'])
    except:
      pass 

    try:
      if request.data['telegram'] is not None:
        alumni = Alumni.objects.filter(user_ptr_id=request.user.id).update(telegram=request.data['telegram'])
    except:
      pass

    return Response({"status": "Attributes Updated"})


class RequestCourseAPI(APIView):
  authentication_classes = (TokenAuthentication,)
  permission_classes = (AllowAny,)
  http_method_names = ['get', 'head', 'post']
  
  def post(self, request):
    alumni = Alumni.objects.get(user_ptr_id=request.user.id)
    if alumni.verified == False:
        return Response(status = 403, data={"status": "User needs to verify the email"})
    course_id = request.data['id']
    course = ElectiveCourse.objects.get(id=course_id)
    try:
      course_request = ElectiveCourseRequest.objects.get(alumni=alumni, course=course) 
      return Response(status=403, data={"status": "Course already requested by user"})
    except:
      pass 
    alumni_name = alumni.name
    course_name = course.name
    course_request = ElectiveCourseRequest.objects.create(alumni=alumni, course=course, alumni_name=alumni_name, course_name=course_name, approved=False)
    course_request.save()
    return Response({"status": "Successfuly requested course"})