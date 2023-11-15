from django.db import models
from Products.models import Product

class Book(models.Model):
    ISBN = models.PositiveIntegerField(primary_key=True)
    Authors = models.CharField(max_length= 200)
    Editorial = models.CharField(max_length=200)
    Language = models.CharField(max_length=50)
    YearPublication = models.IntegerField(default=False)
    Product = models.OneToOneField(Product, on_delete=models.CASCADE)

    def __str__(self):
        return (self.Product.Name)
    