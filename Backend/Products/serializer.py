from rest_framework import serializers
from .models import Product


class ProductSerializer(serializers.ModelSerializer):
    class Meta:
        model = Product
        #  fields =('id', 'title', 'descriptiom', 'like')
        fields = '__all__'   #selecciona todos los campos de la base de datos