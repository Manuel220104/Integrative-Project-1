from rest_framework import serializers
from .models import Book


class BookSerializer(serializers.ModelSerializer):
    class Meta:
        model = Book
        #  fields =('id', 'title', 'descriptiom', 'like')
        fields = '__all__'   #selecciona todos los campos de la base de datos

        
class BookSerializerProduct(serializers.ModelSerializer):
    class Meta:
        model = Book
        #  fields =('id', 'title', 'descriptiom', 'like')
        depth = 1
        fields = '__all__'   #selecciona todos los campos de la base de datos
      