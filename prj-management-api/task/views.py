from django.shortcuts import render
from rest_framework import generics
from django.contrib.auth.models import User
from .serializers import TaskSerializer, AssignUserTaskPostSerializer, AssignUserTaskGetSerializer
from .models import Task, AssignUserTask

# Create your views here.
class TaskView(generics.ListCreateAPIView):
    queryset = Task.objects.all()
    serializer_class = TaskSerializer

class AssignUserTaskListCreate(generics.ListCreateAPIView):
    queryset = AssignUserTask.objects.all()
    serializer_class = AssignUserTaskGetSerializer

   

class AssignUserTaskRetrieveUpdateDestroy(generics.RetrieveUpdateDestroyAPIView):
    queryset = AssignUserTask.objects.all()
    serializer_class = AssignUserTaskPostSerializer


