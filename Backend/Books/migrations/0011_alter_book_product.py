# Generated by Django 4.2.4 on 2023-08-29 20:33

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('Products', '0010_delete_boook'),
        ('Books', '0010_book_product'),
    ]

    operations = [
        migrations.AlterField(
            model_name='book',
            name='Product',
            field=models.OneToOneField(on_delete=django.db.models.deletion.CASCADE, to='Products.product'),
        ),
    ]
