# Generated by Django 4.2.4 on 2023-08-29 03:47

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('Musical_Instruments', '0005_alter_musical_instrument_product'),
    ]

    operations = [
        migrations.AlterField(
            model_name='musical_instrument',
            name='Brand',
            field=models.CharField(max_length=40),
        ),
        migrations.AlterField(
            model_name='musical_instrument',
            name='Model',
            field=models.CharField(max_length=30),
        ),
        migrations.AlterField(
            model_name='musical_instrument',
            name='ProductType',
            field=models.CharField(choices=[('Viento', 'Viento'), ('Cuerda', 'Cuerda'), ('Percusión', 'Percusión'), ('Electrófonos', 'Electrófonos'), ('Idiófonos', 'Idiófonos')], max_length=20),
        ),
    ]