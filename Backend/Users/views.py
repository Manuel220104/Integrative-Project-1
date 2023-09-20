from django.shortcuts import render
from rest_framework import viewsets
from .serializer import UserSerializer
from .models import User

# Create your views here.

#Esta clase ya puede saber que datos van a ser consultados y genera todo el CRUD
class UserView(viewsets.ModelViewSet):
    serializer_class = UserSerializer
    queryset = User.objects.all()

    