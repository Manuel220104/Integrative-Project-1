from django.db import models
from Products.models import Product

class Technology(models.Model):
    TechnologyId = models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')
    Characteristics = models.CharField(max_length=300)
    Brand = models.CharField(max_length=50)
    Model = models.CharField(max_length=50)
    product = models.ForeignKey(Product, on_delete=models.CASCADE)
