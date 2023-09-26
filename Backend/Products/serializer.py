from rest_framework import serializers
from .models import Product
from Books.models import Book
from Technologys.models import Technology
from Musical_Instruments.models import Musical_Instrument
from Table_Games.models import Table_Game

class ProductSerializer(serializers.ModelSerializer):
    class Meta:
        model = Product
        #  fields =('id', 'title', 'descriptiom', 'like')
        fields = '__all__'   #selecciona todos los campos de la base de datos

class Musical_InstrumentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Musical_Instrument
        fields = '__all__'

class Table_GameSerializer(serializers.ModelSerializer):
    class Meta:
        model = Table_Game
        fields = '__all__'

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
    table_game = Table_GameSerializer()
    musical_instrument = Musical_InstrumentSerializer()

    class Meta:
        model = Product
        fields = '__all__'