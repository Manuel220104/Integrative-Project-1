# Generated by Django 4.2.4 on 2023-08-17 04:20

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('Acentos', '0004_rename_tittle_book_title'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='book',
            name='Like',
        ),
        migrations.AddField(
            model_name='book',
            name='url',
            field=models.URLField(blank=True),
        ),
    ]
