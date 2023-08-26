from django.db import models


class Product(models.Model):
    ProductId = models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')
    Price = models.DecimalField(max_digits=6, decimal_places=3)
    Description = models.CharField(max_length = 500)
    ImageUrl = models.URLField(blank = False, max_length=500)
    Quantity = models.PositiveIntegerField(default=1)
    Discount = models.PositiveIntegerField(default=False)
    Availability = models.BooleanField(default=False)
    PRODUCT_TYPE =[
        ("Book", "Book"),
        ("MusicalInstrument", "Musical Instrument"),
        ("TableGames", "Table Games"),
        ("Technology", "Technology")
    ]
    ProductType = models.CharField(max_length = 20, choices=PRODUCT_TYPE, default=False)
    
