# Generated by Django 4.2.4 on 2023-10-04 00:16

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('Products', '0005_alter_product_price_alter_product_quantity'),
    ]

    operations = [
        migrations.AlterField(
            model_name='product',
            name='Price',
            field=models.PositiveIntegerField(),
        ),
    ]