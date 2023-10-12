from django.db import models

class Category(models.Model):
    CategoryId = models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')
    Name = models.CharField(max_length= 200, unique=True)

    class Meta:
        verbose_name_plural = "Categories"

    def __str__(self):
        return (self.Name)

