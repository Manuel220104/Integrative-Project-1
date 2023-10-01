from django.contrib.auth.models import AbstractUser
from django.db import models

class CustomUser(AbstractUser):
    direccion_residencial = models.CharField(max_length=255, blank=False, null= False)
    

    groups = models.ManyToManyField(
        'auth.Group',
        related_name='custom_users',
        blank=True,
        verbose_name='groups',
    )
    user_permissions = models.ManyToManyField(
        'auth.Permission',
        related_name='custom_users',
        blank=True,
        verbose_name='user permissions',
    )
