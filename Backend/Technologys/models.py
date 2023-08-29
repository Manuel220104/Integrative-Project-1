from django.db import models
from Products.models import Product

class Technology(models.Model):
    TechnologyId = models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')
    Name = models.CharField(max_length=60)
    Characteristics = models.CharField(max_length=300)
    Brand = models.CharField(max_length=50)
    Model = models.CharField(max_length=50)
    Product = models.OneToOneField(Product, on_delete=models.CASCADE)
    
    def __str__(self):
        return (self.Name)

