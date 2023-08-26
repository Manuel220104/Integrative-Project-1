from django.shortcuts import render
from rest_framework import viewsets
from .serializer import Table_GameSerializer
from .models import Table_Game

# Create your views here.

#Esta clase ya puede saber que datos van a ser consultados y genera todo el CRUD
class Table_GameView(viewsets.ModelViewSet):
    serializer_class = Table_GameSerializer
    queryset = Table_Game.objects.all()

    