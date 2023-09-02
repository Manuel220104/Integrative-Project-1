from django.shortcuts import render
from rest_framework import viewsets
from .serializer import ProductSerializer
from .models import Product

from rest_framework.views import APIView
from rest_framework.response import Response
from .models import Product

# Create your views here.

#Esta clase ya puede saber que datos van a ser consultados y genera todo el CRUD
class ProductView(viewsets.ModelViewSet):
    serializer_class = ProductSerializer
    queryset = Product.objects.all()
    

class UltimoRegistro(APIView):
    def get(self, request):
        ultimo_registro = Product.objects.latest('ProductId')
        serializer = ProductSerializer(ultimo_registro)
        return Response(serializer.data)