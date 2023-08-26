from django.db import models
from Products.models import Product

class Musical_Instrument(models.Model):
    Musical_InstrumentId = models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')
    MUSICAL_INSTRUMENT_TYPE =[
        ("Viento", "Viento"),
        ("Cuerda", "Cuerda"),
        ("Percusión", "Percusión"),
        ("Electrófonos", "Electrófonos"),
        ("Idiófonos", "Idiófonos")
    ]
    ProductType = models.CharField(max_length = 20, choices=MUSICAL_INSTRUMENT_TYPE, default=False)
    product = models.ForeignKey(Product, on_delete=models.CASCADE)
