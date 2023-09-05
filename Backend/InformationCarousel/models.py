from django.db import models

class InformationCarousel(models.Model):
    image = models.ImageField(upload_to='./InformationCarousel/images/')
    Text = models.CharField(max_length=100)

    def __str__(self):
        return str(self.Text)