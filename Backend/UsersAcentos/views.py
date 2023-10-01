from django.contrib.auth.models import User
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework_simplejwt.views import TokenObtainPairView
from .serializer import UserAcentosSerializer
from rest_framework import viewsets

class UserView(viewsets.ModelViewSet):
    serializer_class = UserAcentosSerializer
    queryset = User.objects.all()
    
class UserAcentosRegistration(APIView):
    def post(self, request):
        serializer = UserAcentosSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class CustomObtainJWTToken(TokenObtainPairView):
    def post(self, request, *args, **kwargs):
        response = super().post(request, *args, **kwargs)
        if response.status_code == status.HTTP_200_OK:
            user = User.objects.get(username=request.data['username'])
            response.data['user_id'] = user.id
        return response