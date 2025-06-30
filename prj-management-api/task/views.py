from django.shortcuts import render
from rest_framework import generics
from django.contrib.auth.models import User
from .serializers import TaskSerializer, AssignUserTaskSerializer

# Create your views here.
class TaskView(generics.CreateAPIView):
    queryset = User.objects.all()
    serializer_class = TaskSerializer

class AssignUserTaskView(generics.CreateAPIView):
    queryset = User.objects.all()
    serializer_class = AssignUserTaskSerializer
