from rest_framework import serializers
from .models import InformationCarousel


class InformationCarouselSerializer(serializers.ModelSerializer):
    class Meta:
        model = InformationCarousel
        #  fields =('id', 'title', 'descriptiom', 'like')
        fields = '__all__'   #selecciona todos los campos de la base de datos