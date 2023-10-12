from rest_framework import serializers
from django.contrib.auth.models import User
from .models import UserProfile


class UserProfileSerializer(serializers.ModelSerializer):
    class Meta:
        model = UserProfile
        fields = '__all__'

class UserSerializer(serializers.ModelSerializer):
    email = serializers.EmailField(required=True)
    first_name = serializers.CharField(max_length=30, required=True)
    last_name = serializers.CharField(max_length=30, required=True)

    class Meta:
        model = User
        fields = '__all__'

    def create(self, validated_data):
        password = validated_data.pop('password')
        is_superuser = validated_data.pop('is_superuser', False)
        is_staff = validated_data.pop('is_staff', False)

        user = User.objects.create_user(**validated_data, password=password, is_superuser=is_superuser, is_staff=is_staff)
        UserProfile.objects.create(user=user, **validated_data)
        return user
