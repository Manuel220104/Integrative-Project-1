from rest_framework import serializers
from .models import Table_Game


class Table_GameSerializer(serializers.ModelSerializer):
    class Meta:
        model = Table_Game
        #  fields =('id', 'title', 'descriptiom', 'like')
        fields = '__all__'   #selecciona todos los campos de la base de datos