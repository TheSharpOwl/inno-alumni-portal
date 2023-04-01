from django.shortcuts import redirect
from rest_framework import viewsets
from rest_framework.permissions import AllowAny
from rest_framework.views import APIView
from rest_framework.response import Response
from .serializers import RegisterSerializer
from rest_framework.authentication import SessionAuthentication
from rest_framework import generics
from knox.views import LoginView as KnoxLoginView
import urllib 

from .serializers import AlumniSerializer
from .models import Alumni


class AlumniDetailAPI(APIView):
  authentication_classes = (SessionAuthentication,)
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



#Class based view to register user
class RegisterAlumniAPIView(generics.CreateAPIView):
  permission_classes = (AllowAny,)
  serializer_class = RegisterSerializer


class AlumniViewSet(viewsets.ModelViewSet):
    queryset = Alumni.objects.all().order_by('username')
    serializer_class = AlumniSerializer


def profile(request):
  alumni = Alumni.objects.get(user_ptr_id=request.user.id)
  serializer = AlumniSerializer(alumni)
  return Response(serializer.data)


def request_pass(request):
  TOKEN = "6125230376:AAGi7qfothkdpDGwwy7nB9x8VieXwzN9yNQ"
  # url = f"https://api.telegram.org/bot{TOKEN}/getUpdates"
  alumni = Alumni.objects.get(user_ptr_id=request.user.id)
  message = f"{alumni.name} requested a pass."
  chat_id = -1001525464247
  url = f"https://api.telegram.org/bot{TOKEN}/sendMessage?chat_id={chat_id}&text={message}".replace(" ", "%20")
  urllib.request.urlopen(url)
  
  return redirect('/')

