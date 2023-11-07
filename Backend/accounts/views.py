from django.contrib.auth import authenticate, login, logout
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status
from rest_framework.authtoken.models import Token
from .models import Usuarios  # Importa el modelo Usuarios en lugar de User
from .serializer import UsuariosCreateSerializer  # Importa el serializador UsuariosCreateSerializer
from .serializer import UsuariosSerializer
from rest_framework import generics
from rest_framework.generics import RetrieveUpdateAPIView

class UserListView(generics.ListAPIView):
    queryset = Usuarios.objects.all()
    serializer_class = UsuariosSerializer


@api_view(['POST'])
def register(request):
    data = request.data

        # Verificar si el nombre de usuario ya existe
    if Usuarios.objects.filter(username=data['username']).exists():
        return Response({'error': 'El nombre de usuario ya está en uso.'}, status=status.HTTP_400_BAD_REQUEST)

    # Verificar si el correo electrónico ya existe
    if Usuarios.objects.filter(email=data['email']).exists():
        return Response({'error': 'El correo electrónico ya está registrado.'}, status=status.HTTP_400_BAD_REQUEST)

    try:
        user_serializer = UsuariosCreateSerializer(data=data)  # Usa el serializador UsuariosCreateSerializer
        if user_serializer.is_valid():
            user = user_serializer.save()
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
            user = Usuarios.objects.get(email=username_or_email)
        except Usuarios.DoesNotExist:
            user = None
    else:
        # Si no se proporcionó un correo electrónico, intenta buscar por nombre de usuario
        user = Usuarios.objects.filter(username=username_or_email).first()



    if user is not None:
        if user.check_password(password):
            if user.is_staff:
                # El usuario es un administrador
                # Genera o recupera el token de autenticación
                token, created = Token.objects.get_or_create(user=user)
                # Devuelve el token en la respuesta
                return Response({'token': token.key, 'username_or_email': username_or_email, 'user_type': 'admin'}, status=status.HTTP_200_OK)
            else:
                # El usuario es un usuario normal
                # Genera o recupera el token de autenticación
                token, created = Token.objects.get_or_create(user=user)
                # Devuelve el token en la respuesta
                return Response({'token': token.key, 'username_or_email': username_or_email, 'user_type': 'normal'}, status=status.HTTP_200_OK)
        else:
            # Si la contraseña no es válida, devuelve un mensaje de error
            return Response({'error': 'Credenciales inválidas'}, status=status.HTTP_401_UNAUTHORIZED)
    else:
        # Si no se encuentra el usuario, devuelve un mensaje de error
        return Response({'error': 'Usuario no encontrado'}, status=status.HTTP_404_NOT_FOUND)


@api_view(['POST'])
def logout_view(request):
    logout(request)
    return Response({'message': 'Sesión cerrada correctamente.'}, status=status.HTTP_200_OK)

class UserUpdateView(RetrieveUpdateAPIView):
    queryset = Usuarios.objects.all()
    serializer_class = UsuariosSerializer

    lookup_field = 'username'