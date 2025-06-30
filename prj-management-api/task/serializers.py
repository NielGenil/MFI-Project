from rest_framework import serializers
from .models import Task, AssignUserTask

class TaskSerializer(serializers.ModelSerializer):
    class Meta:
        model = Task
        fields = '__all__'

class AssignUserTaskSerializer(serializers.ModelSerializer):
    class Meta:
        model = AssignUserTask
        fields = '__all__'