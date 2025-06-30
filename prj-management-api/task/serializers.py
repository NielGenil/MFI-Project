from rest_framework import serializers
from .models import Task, AssignUserTask

class TaskSerializer(serializers.ModelSerializer):
    class Meta:
        model = Task
        fields = '__all__'

class AssignUserTaskPostSerializer(serializers.ModelSerializer):
    class Meta:
        model = AssignUserTask
        fields = '__all__'
        # depth = 1

class AssignUserTaskGetSerializer(serializers.ModelSerializer):
    class Meta:
        model = AssignUserTask
        depth = 1
        fields = '__all__'
        