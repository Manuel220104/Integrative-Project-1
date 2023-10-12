from django.db import models
from django.contrib.auth.models import User

class UserProfile(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    username = models.CharField(max_length=50)
    first_name = models.CharField(max_length=30)
    last_name = models.CharField(max_length=30)
    email = models.EmailField(unique=True)  # Asegura que el correo sea único
    residence = models.CharField(max_length=100, default=False)
    
    def __str__(self):
        return self.user.username
    
    
