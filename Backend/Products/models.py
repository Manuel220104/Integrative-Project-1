from django.db import models
from django.db.models.signals import pre_delete
from django.dispatch import receiver
import os
from Categories.models import Category
from Subcategories.models import Subcategory
from django.db.models.signals import pre_save
from django.dispatch import receiver

class Product(models.Model):
    ProductId = models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')
    Name = models.CharField(max_length= 1000)
    Price = models.PositiveIntegerField()
    Description = models.CharField(max_length = 10000)
    ImageUrl = models.URLField(blank = True, null=True, max_length=1000)
    Image = models.ImageField(upload_to='./Products/Productimages/', null=True, blank=True)
    Quantity = models.PositiveIntegerField(default=0)
    Discount = models.PositiveIntegerField()
    Category = models.ForeignKey(Category, on_delete=models.SET_NULL, blank=True, null=True)
    Subcategory = models.ForeignKey(Subcategory, on_delete=models.SET_NULL, blank=True, null=True)
    
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

@receiver(pre_save, sender=Product)
def set_default_category(sender, instance, **kwargs):
    # Verifica si la categoría no se ha establecido
    if not instance.Category:
        # Si no se ha establecido, establece la categoría como "General"
        general_category, created = Category.objects.get_or_create(Name='General')
        instance.Category = general_category


