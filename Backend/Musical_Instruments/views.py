from django.shortcuts import render
from rest_framework import viewsets
from .serializer import Musical_InstrumentSerializer
from .models import Musical_Instrument

# Create your views here.

#Esta clase ya puede saber que datos van a ser consultados y genera todo el CRUD
class Musical_InstrumentView(viewsets.ModelViewSet):
    serializer_class = Musical_InstrumentSerializer
    queryset = Musical_Instrument.objects.all()

    