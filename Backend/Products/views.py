from django.shortcuts import render
from rest_framework import viewsets, status
from .serializer import ProductSerializer, ProductWithComponentsSerializer
from rest_framework.views import APIView
from rest_framework.response import Response
from .models import Product
from datetime import datetime, timedelta
from rest_framework.generics import ListAPIView

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
    

# class UltimoRegistroDate(APIView):
#     def get(self, request):
#         # Obtenemos la fecha actual
#         fecha_actual = datetime.now()

#         # Restamos 30 días a la fecha actual para obtener la fecha de inicio
#         fecha_inicio = fecha_actual - timedelta(days=30)

#         # Consulta para obtener los productos creados en los últimos 30 días
#         productos_ultimos_30_dias = Product.objects.filter(CreationDate__gte=fecha_inicio)

#         # Serializamos los productos
#         serializer = ProductSerializer(productos_ultimos_30_dias, many=True)

#         return Response(serializer.data)


class UltimosDiezProductos(ListAPIView):
    serializer_class = ProductWithComponentsSerializer

    def get_queryset(self):
        queryset = Product.objects.all().order_by('-CreationDate')[:10]
        queryset = Product.objects.prefetch_related('book', 'technology', 'table_game', 'musical_instrument').filter(pk__in=queryset)
        return queryset
    
class ProductsWithComponentsView(ListAPIView):
    serializer_class = ProductWithComponentsSerializer
    def get_queryset(self):
        return Product.objects.prefetch_related('book','technology','table_game','musical_instrument')


class Ultimos10ProductosConDescuento(ListAPIView):
    serializer_class = ProductWithComponentsSerializer

    def get_queryset(self):
        queryset = Product.objects.filter(Discount__gt=0).order_by('-CreationDate')[:10]
        queryset = Product.objects.prefetch_related('book', 'technology', 'table_game', 'musical_instrument').filter(pk__in=queryset)
        return queryset
    
    
class Products10WithComponentsView(ListAPIView):
    serializer_class = ProductWithComponentsSerializer

    def get_queryset(self):
        return Product.objects.prefetch_related('book', 'technology').order_by('-ProductId')[:10]