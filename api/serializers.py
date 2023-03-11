from rest_framework import serializers
from django.contrib.auth.models import User
from rest_framework.response import Response
from rest_framework import status
from rest_framework.validators import UniqueValidator
from django.contrib.auth.password_validation import validate_password

from .models import Alumni
from .diploma_validator import validate_diploma_id


class AlumniSerializer(serializers.ModelSerializer):
  class Meta:
    model = Alumni
    fields = ['username', 'diploma_id', 'name']


class RegisterSerializer(serializers.ModelSerializer):
  username = serializers.CharField(
    required=True,
    validators=[UniqueValidator(queryset=User.objects.all())]
  )
  diploma_id = serializers.IntegerField(
    required=True,
    validators=[UniqueValidator(queryset=Alumni.objects.all())]
  )
  password = serializers.CharField(
    write_only=True, required=True, validators=[validate_password])
  password2 = serializers.CharField(write_only=True, required=True)
  
  class Meta:
    model = Alumni
    fields = ('username', 'diploma_id', 'password', 'password2')

  def validate(self, attrs):
    if attrs['password'] != attrs['password2']:
      raise serializers.ValidationError(
        {"password": "Password fields didn't match."})
    if validate_diploma_id(attrs['diploma_id']) == '':
        raise serializers.ValidationError(
        {"diploma_id": "Diploma with entered ID does not exist in IU database"})
    return attrs
  
  def create(self, validated_data):
    alumni = Alumni.objects.create(
      username=validated_data['username'],
      diploma_id=validated_data['diploma_id'],
      name=validate_diploma_id(validated_data['diploma_id']),
    )
    alumni.set_password(validated_data['password'])
    # alumni = Alumni.objects.create(user = user, diploma_id="1111222", name = "Nikola Novarlic")
    alumni.save()
    return alumni
