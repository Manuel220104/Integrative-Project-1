from django.contrib.auth import authenticate, login, logout
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status
from rest_framework.authtoken.models import Token
from django.contrib.auth.models import User
from .models import UserProfile
from .serializer import UserSerializer
from rest_framework import generics
from django.http import HttpRequest
from rest_framework.request import Request


class UserListView(generics.ListAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer

@api_view(['POST'])
def register(request):
    data = request.data

    # Verificar si el nombre de usuario ya existe
    if User.objects.filter(username=data['username']).exists():
        return Response({'error': 'El nombre de usuario ya está en uso.'}, status=status.HTTP_400_BAD_REQUEST)

    # Verificar si el correo electrónico ya existe
    if User.objects.filter(email=data['email']).exists():
        return Response({'error': 'El correo electrónico ya está registrado.'}, status=status.HTTP_400_BAD_REQUEST)

    try:
        user_serializer = UserSerializer(data=data)
        if user_serializer.is_valid():
            user = user_serializer.save()
            # También puedes iniciar sesión automáticamente al usuario aquí si lo deseas

            return Response({'message': 'Usuario registrado correctamente.'}, status=status.HTTP_201_CREATED)
        else:
            return Response({'error': user_serializer.errors}, status=status.HTTP_400_BAD_REQUEST)
    except Exception as e:
        return Response({'error': str(e)}, status=status.HTTP_400_BAD_REQUEST)

@api_view(['POST'])
def login(request):
    data = request.data
    username_or_email = data.get('username_or_email')
    password = data.get('password')

    # Verificar si el usuario proporcionó un correo electrónico
    if '@' in username_or_email:
        try:
            user = User.objects.get(email=username_or_email)
        except User.DoesNotExist:
            user = None
    else:
        user = authenticate(username=username_or_email, password=password)

    if user is not None:
        if user.check_password(password):
            # Genera o recupera el token de autenticación
            token, created = Token.objects.get_or_create(user=user)

            # Devuelve el token en la respuesta
            return Response({'token': token.key}, status=status.HTTP_200_OK)
        else:
            # Si la contraseña no es válida, devuelve un mensaje de error
            return Response({'error': 'Credenciales inválidas'}, status=status.HTTP_401_UNAUTHORIZED)
    else:
        # Si no se encuentra el usuario, devuelve un mensaje de error
        return Response({'error': 'Usuario no encontrado'}, status=status.HTTP_404_NOT_FOUND)


@api_view(['POST'])
def logout_view(request):
    logout(request)  # Cierra la sesión del usuario
    return Response({'message': 'Sesión cerrada correctamente.'}, status=status.HTTP_200_OK)
