from django.contrib import admin
from .models import Task, AssignUserTask

# Register your models here.
admin.site.register(Task)
admin.site.register(AssignUserTask)
