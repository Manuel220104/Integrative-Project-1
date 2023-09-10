from rest_framework import serializers
from .models import Product
from Books.models import Book
from Technologys.models import Technology


class ProductSerializer(serializers.ModelSerializer):
    class Meta:
        model = Product
        #  fields =('id', 'title', 'descriptiom', 'like')
        fields = '__all__'   #selecciona todos los campos de la base de datos


class BookSerializer(serializers.ModelSerializer):
    class Meta:
        model = Book
        fields = '__all__'

class TechnologySerializer(serializers.ModelSerializer):
    class Meta:
        model = Technology
        fields = '__all__'

class ProductWithComponentsSerializer(serializers.ModelSerializer):
    book = BookSerializer()
    technology = TechnologySerializer()  

    class Meta:
        model = Product
        fields = '__all__'