from django.shortcuts import render
from rest_framework import viewsets
from .serializer import ProductSerializer
from .models import Product

# Create your views here.

#Esta clase ya puede saber que datos van a ser consultados y genera todo el CRUD
class ProductView(viewsets.ModelViewSet):
    serializer_class = ProductSerializer
    queryset = Product.objects.all()


