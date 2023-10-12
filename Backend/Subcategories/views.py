from django.shortcuts import render
from rest_framework import viewsets
from .serializer import SubcategorySerializer
from rest_framework.views import APIView
from .models import Subcategory
from rest_framework.response import Response

class CategoryView(viewsets.ModelViewSet):
    serializer_class = SubcategorySerializer
    queryset = Subcategory.objects.all()



