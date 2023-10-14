# Generated by Django 4.2.4 on 2023-10-12 17:16

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        ('Categories', '0001_initial'),
    ]

    operations = [
        migrations.CreateModel(
            name='Subcategory',
            fields=[
                ('SubcategoryId', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('Name', models.CharField(max_length=200, unique=True)),
                ('Category', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='Categories.category')),
            ],
            options={
                'verbose_name_plural': 'Subcategories',
            },
        ),
    ]