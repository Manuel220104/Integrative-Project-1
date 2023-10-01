from rest_framework import serializers
from django.contrib.auth.models import User
#from .models import CustomUser

class UserAcentosSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('username', 'password')