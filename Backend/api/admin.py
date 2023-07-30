from django.contrib import admin
from .models import Alumni, ElectiveCourse, ElectiveCourseRequest

admin.site.register(Alumni)
admin.site.register(ElectiveCourse)
admin.site.register(ElectiveCourseRequest)