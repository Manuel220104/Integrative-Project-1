# Generated by Django 4.2.4 on 2023-10-11 16:22

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('Products', '0007_product_image'),
    ]

    operations = [
        migrations.AddField(
            model_name='product',
            name='Category',
            field=models.CharField(default='General', max_length=500),
        ),
        migrations.AddField(
            model_name='product',
            name='Subcategory',
            field=models.CharField(blank=True, max_length=500),
        ),
    ]