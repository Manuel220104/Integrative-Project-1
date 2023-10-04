from django.db import models


class Product(models.Model):
    ProductId = models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')
    Name = models.CharField(max_length= 200)
    Price = models.PositiveIntegerField()
    Description = models.CharField(max_length = 500)
    ImageUrl = models.URLField(blank = False, max_length=500)
    Quantity = models.PositiveIntegerField(default=0)
    Discount = models.PositiveIntegerField()
    PRODUCT_TYPE =[
        ("Libro", "Libro"),
        ("Instrumento Musical", "Instrumento Musical"),
        ("Juego de mesa", "Juego de mesa"),
        ("Tecnologia", "Tecnologia")
    ]
    ProductType = models.CharField(max_length = 20, choices=PRODUCT_TYPE, default=False)
    CreationDate = models.DateTimeField(auto_now_add=True)
        
    def __str__(self):
        return str(self.ProductId)
    
    