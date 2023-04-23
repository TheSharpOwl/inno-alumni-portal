from django.db import models
from django.contrib.auth.models import User
from django.contrib.auth.models import AbstractBaseUser

class Alumni(User):
    name = models.CharField(max_length=60)
    name_russian = models.CharField(max_length=60)
    graduation_year = models.IntegerField(default=1900)
    filed_of_study = models.CharField(max_length=60)
    bio = models.TextField()
    city = models.CharField(max_length=60)
    company = models.CharField(max_length=60)
    position = models.CharField(max_length=60)
    verified = models.BooleanField(default=False)

    def __str__(self):
        return self.name


class ElectiveCourse(models.Model):
    name = models.CharField(max_length=100)
    description = models.TextField()
    tutor = models.CharField(max_length=100)
    available_places = models.IntegerField()


class EmailCode(models.Model):
    email = models.EmailField()
    code = models.IntegerField()