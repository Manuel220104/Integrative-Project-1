from rest_framework import serializers
from .models import Musical_Instrument


class Musical_InstrumentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Musical_Instrument
        #  fields =('id', 'title', 'descriptiom', 'like')
        fields = '__all__'   #selecciona todos los campos de la base de datos