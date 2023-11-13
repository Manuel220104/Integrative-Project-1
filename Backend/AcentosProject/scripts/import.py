# how to run 
#  python manage.py shell
# exec(open('AcentosProject/scripts/import.py').read())

import pandas as pd
from Products.models import Product
from Books.models import Book
from Categories.models import Category
from Subcategories.models import Subcategory

# Construye la ruta al archivo data.xlsx en el mismo directorio que el script
file_path = 'AcentosProject/scripts/data.xlsx'

df = pd.read_excel(file_path)

# ...

for index, row in df.iterrows():
    # Crear una instancia de Product
    product_instance = Product.objects.create(
        Name=row['Name'],
        Price=row['Price'],
        Description=row['Description'],
        ImageUrl=row['ImageUrl'],
        Quantity=row['Quantity'],
        Discount=row['Discount'],
        ProductType=row['ProductType'],
    )


    '''

    category_name = row['Category']
    subcategory_name = row['Subcategory']

    # Verificar si los valores son "NaN" y asignar "General" en su lugar
    if pd.isna(category_name):
        category_name = 'General'
    if pd.isna(subcategory_name):
        subcategory_name = 'General'

    # Obtener o crear instancias de Category y Subcategory usando el campo Name
    category, _ = Category.objects.get_or_create(Name=category_name)

    # Verificar si ya existe una Subcategory con el mismo nombre
    subcategory, created = Subcategory.objects.get_or_create(Name=subcategory_name, Category=category)
    
    if (category_name=='General'):
        product_instance.Category = category
    else:
        product_instance.Category = category
        if(subcategory_name!='General'):
            product_instance.Subcategory = subcategory
    '''
    
    category, _ = Category.objects.get_or_create(Name="General")
    product_instance.Category = category
    product_instance.save()

    # Crear una instancia de Book asociada al Product
    book_instance = Book.objects.create(
        ISBN=row['ISBN'],
        Authors=row['Authors'],
        Editorial=row['Editorial'],
        Language=row['Language'],
        YearPublication=row['YearPublication'],
        Product=product_instance,
    )

# ...


print(df)
print("Datos importados correctamente.")





