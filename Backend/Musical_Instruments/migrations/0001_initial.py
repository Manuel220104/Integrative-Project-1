# Generated by Django 4.2.4 on 2023-11-27 19:32

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        ('Products', '0001_initial'),
    ]

    operations = [
        migrations.CreateModel(
            name='Musical_Instrument',
            fields=[
                ('Musical_InstrumentId', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('Brand', models.CharField(max_length=100)),
                ('Model', models.CharField(max_length=100)),
                ('Product', models.OneToOneField(on_delete=django.db.models.deletion.CASCADE, to='Products.product')),
            ],
        ),
    ]
