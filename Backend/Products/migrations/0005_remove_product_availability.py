# Generated by Django 4.2.4 on 2023-08-28 16:30

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('Products', '0004_alter_product_imageurl'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='product',
            name='Availability',
        ),
    ]
