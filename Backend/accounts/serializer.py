from rest_framework import serializers
from .models import Usuarios  # Importa el modelo Usuarios en lugar de User

class UsuariosSerializer(serializers.ModelSerializer):
    class Meta:
        model = Usuarios  # Usa el modelo Usuarios
        fields = '__all__'

class UsuariosCreateSerializer(serializers.ModelSerializer):
    email = serializers.EmailField(required=True)
    password = serializers.CharField(write_only=True, required=True)
    is_superuser = serializers.BooleanField(default=False)
    is_staff = serializers.BooleanField(default=False)

    class Meta:
        model = Usuarios
        fields = ('id', 'first_name','last_name', 'username', 'email', 'password', 'department', 'city', 'address', 'details', 'is_active', 'is_staff', 'is_superuser')

    def create(self, validated_data):
        password = validated_data.pop('password')
        is_superuser = validated_data.pop('is_superuser', False)
        is_staff = validated_data.pop('is_staff', False)

        user = Usuarios.objects.create_user(**validated_data, password=password, is_superuser=is_superuser, is_staff=is_staff)
        return user
