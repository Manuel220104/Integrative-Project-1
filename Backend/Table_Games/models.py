from django.db import models
from Products.models import Product

class Table_Game(models.Model):
    Table_GameId = models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')
    Maker = models.CharField(max_length=100)
    Players_Number= models.PositiveIntegerField()
    Product = models.OneToOneField(Product, on_delete=models.CASCADE)

    def __str__(self):
        return str(self.Table_GameId)
    
