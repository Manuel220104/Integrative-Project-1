# Generated by Django 4.2.4 on 2023-08-26 18:22

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('Products', '0001_initial'),
    ]

    operations = [
        migrations.AddField(
            model_name='product',
            name='Availability',
            field=models.BooleanField(default=False),
        ),
        migrations.AddField(
            model_name='product',
            name='Description',
            field=models.CharField(blank=True, max_length=500),
        ),
        migrations.AddField(
            model_name='product',
            name='Discount',
            field=models.PositiveIntegerField(default=False),
        ),
        migrations.AddField(
            model_name='product',
            name='ImageUrl',
            field=models.URLField(default=True, max_length=500),
        ),
        migrations.AddField(
            model_name='product',
            name='ProductType',
            field=models.CharField(choices=[('Book', 'Book'), ('MusicalInstrument', 'Musical Instrument'), ('TableGames', 'Table Games'), ('Technology', 'Technology')], default=False, max_length=20),
        ),
        migrations.AddField(
            model_name='product',
            name='Quantity',
            field=models.PositiveIntegerField(default=1),
        ),
    ]