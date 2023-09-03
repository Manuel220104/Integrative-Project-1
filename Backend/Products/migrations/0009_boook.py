# Generated by Django 4.2.4 on 2023-08-29 20:11

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('Products', '0008_remove_libro_product_ptr_and_more'),
    ]

    operations = [
        migrations.CreateModel(
            name='Boook',
            fields=[
                ('product_ptr', models.OneToOneField(auto_created=True, on_delete=django.db.models.deletion.CASCADE, parent_link=True, to='Products.product')),
                ('ISBN', models.PositiveIntegerField(primary_key=True, serialize=False)),
                ('Title', models.CharField(max_length=200)),
                ('Authors', models.CharField(max_length=200)),
                ('Editorial', models.CharField(max_length=100)),
                ('Language', models.CharField(max_length=50)),
                ('YearPublication', models.IntegerField(default=False)),
            ],
            bases=('Products.product',),
        ),
    ]
