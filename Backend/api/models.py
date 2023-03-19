from django.db import models
from django.contrib.auth.models import User
from django.contrib.auth.models import AbstractBaseUser

class Alumni(User):
    # user = models.OneToOneField(User, on_delete=models.CASCADE)
    diploma_id = models.IntegerField() 
    name = models.CharField(max_length=60)
    
    def __str__(self):
        return self.name
