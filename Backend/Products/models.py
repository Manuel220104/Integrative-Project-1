from django.db import models
from django.db.models.signals import pre_delete
from django.dispatch import receiver
import os
from Categories.models import Category

class Product(models.Model):
    ProductId = models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')
    Name = models.CharField(max_length= 200)
    Price = models.PositiveIntegerField()
    Description = models.CharField(max_length = 500)
    ImageUrl = models.URLField(blank = True, null=True, max_length=1000)
    Image = models.ImageField(upload_to='./Products/Productimages/', null=True, blank=True)
    Quantity = models.PositiveIntegerField(default=0)
    Discount = models.PositiveIntegerField()
    Category = models.CharField(max_length = 500, default='General')
    Subcategory = models.CharField(max_length = 500, blank=True)    
    
    PRODUCT_TYPE =[
        ("Libro", "Libro")  ,
        ("Instrumento Musical", "Instrumento Musical"),
        ("Juego de mesa", "Juego de mesa"),
        ("Tecnologia", "Tecnologia")
    ]
    ProductType = models.CharField(max_length = 20, choices=PRODUCT_TYPE, default=False)
    CreationDate = models.DateTimeField(auto_now_add=True)
        
    def __str__(self):
        return str(self.ProductId)
    
@receiver(pre_delete, sender=Product)
def delete_product_image(sender, instance, **kwargs):
    # Elimina el archivo de imagen si existe
    if instance.Image:
        # La ruta del archivo de imagen
        image_path = instance.Image.path
        if os.path.isfile(image_path):
            os.remove(image_path)