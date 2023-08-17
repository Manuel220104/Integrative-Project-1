from django.db import models

# Create your models here.

class Book(models.Model):
    title = models.CharField(max_length = 100)
    description = models.TextField()
    image = models.ImageField(upload_to = 'book/media/')
    url = models.URLField(blank = True)
    Like = models.BooleanField(default=False)