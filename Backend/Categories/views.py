from django.shortcuts import render
from rest_framework import viewsets
from .serializer import CategorySerializer
from rest_framework.views import APIView
from .models import Category
from rest_framework.response import Response

class CategoryView(viewsets.ModelViewSet):
    serializer_class = CategorySerializer
    queryset = Category.objects.all()