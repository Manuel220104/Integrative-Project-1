# Generated by Django 4.2.4 on 2023-10-13 16:13

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('accounts', '0008_alter_usuarios_department'),
    ]

    operations = [
        migrations.AlterField(
            model_name='usuarios',
            name='address',
            field=models.CharField(max_length=50, null=True),
        ),
        migrations.AlterField(
            model_name='usuarios',
            name='city',
            field=models.CharField(max_length=50, null=True),
        ),
        migrations.AlterField(
            model_name='usuarios',
            name='department',
            field=models.CharField(max_length=50, null=True),
        ),
        migrations.AlterField(
            model_name='usuarios',
            name='details',
            field=models.CharField(max_length=50, null=True),
        ),
    ]
