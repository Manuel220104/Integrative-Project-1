from django.shortcuts import render
from rest_framework import viewsets
from .serializer import InformationCarouselSerializer
from .models import InformationCarousel

# Create your views here.

#Esta clase ya puede saber que datos van a ser consultados y genera todo el CRUD
class InformationCarouselView(viewsets.ModelViewSet):
    serializer_class = InformationCarouselSerializer
    queryset = InformationCarousel.objects.all()

