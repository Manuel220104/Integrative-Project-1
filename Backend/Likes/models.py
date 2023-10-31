from django.db import models
from accounts.models import Usuarios
from Products.models import Product

class Like(models.Model):
    user = models.ForeignKey(Usuarios, on_delete=models.CASCADE)
    product = models.ForeignKey(Product, on_delete=models.CASCADE)
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        unique_together = ('user', 'product')
