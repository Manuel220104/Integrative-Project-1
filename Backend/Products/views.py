from django.shortcuts import render
from rest_framework import viewsets, status
from .serializer import ProductSerializer
from rest_framework.views import APIView
from rest_framework.response import Response
from .models import Product
from datetime import datetime, timedelta

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
    

        
class UltimoRegistroDate(APIView):
    def get(self, request):
        # Obtenemos la fecha actual
        fecha_actual = datetime.now()

        # Restamos 30 días a la fecha actual para obtener la fecha de inicio
        fecha_inicio = fecha_actual - timedelta(days=30)

        # Consulta para obtener los productos creados en los últimos 30 días
        productos_ultimos_30_dias = Product.objects.filter(CreationDate__gte=fecha_inicio)

        # Serializamos los productos
        serializer = ProductSerializer(productos_ultimos_30_dias, many=True)

        return Response(serializer.data)