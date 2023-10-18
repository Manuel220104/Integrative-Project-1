from django.db import models
from django.db.models.signals import pre_delete
from django.dispatch import receiver
from django.apps import apps
from django.contrib import admin

class Category(models.Model):
    Name = models.CharField(max_length=200, unique=True, primary_key=True)

    class Meta:
        verbose_name_plural = "Categories"

    def __str__(self):
        return self.Name
    
@receiver(pre_delete, sender=Category)
def category_pre_delete(sender, instance, **kwargs):
    # Obtén la categoría "General" o créala si no existe
    Category = apps.get_model('Categories', 'Category')
    Product = apps.get_model('Products', 'Product')  
    Subcategory = apps.get_model('Subcategories', 'Subcategory')

    general_category, created = Category.objects.get_or_create(Name='General')

    # Obtén todos los productos asociados a la categoría que se está eliminando
    products = Product.objects.filter(Category=instance)

    # Establece la categoría en "General" para todos los productos
    products.update(Category=general_category)

    # Elimina todas las subcategorías asociadas
    for subcategory in instance.subcategories.all():
        subcategory.delete()
