from django.shortcuts import render
from django.http import HttpResponse
from .models import Book

# Create your views here.

def home(request):

    searchTerm = request.GET.get('searchBook')
    if searchTerm:
        books = Book.objects.filter(title__icontains = searchTerm)
    else:
        books = Book.objects.all()
    return render(request, 'home.html', {'searchTerm': searchTerm, 'books': books})

def about(request):
    return render(request, 'about.html')