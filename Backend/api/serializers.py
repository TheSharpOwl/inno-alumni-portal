from rest_framework import serializers
from django.contrib.auth.models import User
from rest_framework.response import Response
from rest_framework import status
from rest_framework.validators import UniqueValidator
from django.contrib.auth.password_validation import validate_password

from .models import Alumni, ElectiveCourse
from .validator import verify_innopolis_mail

class AlumniSerializer(serializers.ModelSerializer):
  class Meta:
    model = Alumni
    fields = ['email', 'name', 'name_russian', 'telegram', 'graduation_year', 'filed_of_study', 'bio', 'city', 'company', 'position']


class ElectiveCourseSerializer(serializers.ModelSerializer):
  class Meta:
    model = ElectiveCourse
    fields = ['id', 'name', 'description', 'tutor', 'available_places']


class RegisterSerializer(serializers.ModelSerializer):
  email = serializers.EmailField(
    required=True,
    validators=[UniqueValidator(queryset=User.objects.all(), message='User with this email already exists')]
  )
  password = serializers.CharField(
    write_only=True, required=True, validators=[validate_password])
  password2 = serializers.CharField(write_only=True, required=True)
  
  class Meta:
    model = Alumni
    fields = ('email', 'password', 'password2')

  def validate(self, attrs):
    print('validating password')
    if attrs['password'] != attrs['password2']:
      raise serializers.ValidationError(
        {"password": "Password fields didn't match."})
    print('validating email')
    if verify_innopolis_mail(attrs['email']) == -1:
        raise serializers.ValidationError(
        {"email": "Given email is not an official Innopolis University email address."})
    print('it is fine')
    return attrs
  
  def create(self, validated_data):
    print('creating new alumni')
    alumni = Alumni.objects.create(
      email=validated_data['email'],
      username=validated_data['email'],
    )
    alumni.set_password(validated_data['password'])
    alumni.save()
    return alumni
