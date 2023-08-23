from django.shortcuts import render
from rest_framework import viewsets
from .serializer import BookSerializer
from .models import Book

# Create your views here.

#Esta clase ya puede saber que datos van a ser consultados y genera todo el CRUD
class BookView(viewsets.ModelViewSet):
    serializer_class = BookSerializer
    queryset = Book.objects.all()


def home(request):

    searchTerm = request.GET.get('searchMovie')
    return render(request, 'home.html', {'searchTerm': searchTerm})
    