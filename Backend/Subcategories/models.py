from django.db import models
from django.db.models.signals import pre_delete
from django.dispatch import receiver
from django.apps import apps

class Subcategory(models.Model):
    SubcategoryId = models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')
    Name = models.CharField(max_length=200)
    Category = models.ForeignKey('Categories.Category', on_delete=models.CASCADE, related_name='subcategories')

    class Meta:
        verbose_name_plural = "Subcategories"

    def __str__(self):
        return str(self.SubcategoryId)

