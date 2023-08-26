from django.db import models
from Products.models import Product

class Table_Game(models.Model):
    Table_GameId = models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')
    TABLE_GAME_TYPE =[
        ("Viento", "Viento"),
        ("Cuerda", "Cuerda"),
        ("Percusión", "Percusión"),
        ("Electrófonos", "Electrófonos"),
        ("Idiófonos", "Idiófonos")
    ]
    ProductType = models.CharField(max_length = 20, choices=TABLE_GAME_TYPE, default=False)
    Maker = models.CharField(max_length =100)
    Players_Number= models.PositiveIntegerField()
    product = models.ForeignKey(Product, on_delete=models.CASCADE)