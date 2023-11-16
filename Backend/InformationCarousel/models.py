from django.db import models
from django.db.models.signals import pre_save, pre_delete
from django.dispatch import receiver
import os

class InformationCarousel(models.Model):
    image = models.ImageField(upload_to='./InformationCarousel/images/')
    Text = models.CharField(max_length=100)

    def __str__(self):
        return str(self.Text)

@receiver(pre_save, sender=InformationCarousel)
def delete_old_image(sender, instance, **kwargs):
    # Elimina la imagen anterior si hay una nueva imagen en el formulario
    if instance.id:
        old_instance = InformationCarousel.objects.get(id=instance.id)
        if old_instance.image != instance.image:
            if os.path.isfile(old_instance.image.path):
                os.remove(old_instance.image.path)

@receiver(pre_delete, sender=InformationCarousel)
def delete_image(sender, instance, **kwargs):
    # Elimina el archivo de imagen cuando se elimina el objeto
    if instance.image:
        if os.path.isfile(instance.image.path):
            os.remove(instance.image.path)
