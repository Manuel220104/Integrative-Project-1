from rest_framework import serializers
from .models import Technology


class TechnologySerializer(serializers.ModelSerializer):
    class Meta:
        model = Technology
        #  fields =('id', 'title', 'descriptiom', 'like')
        fields = '__all__'   #selecciona todos los campos de la base de datos