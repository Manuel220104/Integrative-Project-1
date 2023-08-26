from django.shortcuts import render
from rest_framework import viewsets
from .serializer import TechnologySerializer
from .models import Technology

# Create your views here.

#Esta clase ya puede saber que datos van a ser consultados y genera todo el CRUD
class TechnologyView(viewsets.ModelViewSet):
    serializer_class = TechnologySerializer
    queryset = Technology.objects.all()

    