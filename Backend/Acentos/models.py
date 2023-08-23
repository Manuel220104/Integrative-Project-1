from django.db import models


class Book(models.Model):
    title = models.CharField(max_length= 200)
    description = models.CharField(max_length = 250)
    image = models.ImageField(upload_to = 'Acentos/images/')
    Like = models.BooleanField(default=False)
    La = models.IntegerField(default=1)


    def __str__(self):
        return self.title