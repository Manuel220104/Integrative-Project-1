from django.shortcuts import render
from rest_framework import viewsets
from .serializer import InformationCarouselSerializer
from .models import InformationCarousel
from rest_framework.views import APIView
from rest_framework.response import Response

# Create your views here.

#Esta clase ya puede saber que datos van a ser consultados y genera todo el CRUD
class InformationCarouselView(viewsets.ModelViewSet):
    serializer_class = InformationCarouselSerializer
    queryset = InformationCarousel.objects.all()

class UltimoRegistroInfo(APIView):
    def get(self, request):
        ultimo_registro = InformationCarousel.objects.latest('id')
        serializer = InformationCarouselSerializer(ultimo_registro)
        return Response(serializer.data)