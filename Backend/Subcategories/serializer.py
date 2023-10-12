from rest_framework import serializers
from .models import Subcategory


class SubcategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = Subcategory
        fields = '__all__'   #selecciona todos los campos de la base de datos
