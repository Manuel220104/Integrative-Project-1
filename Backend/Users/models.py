from django.db import models


class User(models.Model):
    UserId = models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')
    Names = models.CharField(max_length=50)
    Surname = models.CharField(max_length=50)
    Email = models.EmailField(max_length=200, unique=True)
    Pass

    def __str__(self):
        return str(self.UserId)
    