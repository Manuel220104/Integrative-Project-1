from django.db import models
from Categories.models import Category

class Subcategory(models.Model):
    SubcategoryId = models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')
    Name = models.CharField(max_length= 200, unique=True)
    Category = models.ForeignKey(Category, on_delete=models.CASCADE, null=False)

    class Meta:
        verbose_name_plural = "Subcategories"

    def __str__(self):
        return (self.Name)
