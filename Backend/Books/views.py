from django.shortcuts import render
from rest_framework import viewsets
from .serializer import BookSerializer, BookSerializerProduct
from rest_framework.views import APIView
from .models import Book
from rest_framework.response import Response



# Create your views here.

#Esta clase ya puede saber que datos van a ser consultados y genera todo el CRUD
class BookView(viewsets.ModelViewSet):
    serializer_class = BookSerializer
    queryset = Book.objects.all()

class ObtainBookandProduct(APIView):
    def get(self, request):
        books = Book.objects.select_related('Product').all()
        serializer = BookSerializerProduct(books, many=True)
        return Response(serializer.data)

