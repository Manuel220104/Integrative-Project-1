# how to run 
# python manage.py shell
# exec(open('AcentosProject/scripts/import.py').read())

import pandas as pd
from Products.models import Product
from Books.models import Book
from Categories.models import Category
from Subcategories.models import Subcategory

# Construye la ruta al archivo data.xlsx en el mismo directorio que el script
file_path = 'AcentosProject/scripts/books.xlsx'

df = pd.read_excel(file_path)

# ...

for index, row in df.iterrows():
    print(row['Name'])
    create = True

    # Verificar si el ISBN ya existe en la base de datos
    existing_book = Book.objects.filter(ISBN=row['ISBN']).first()
    
    #Verificar si la subcategoria existe
    existing_subcategory = Subcategory.objects.filter(Name=row['Subcategory']).first()
    if existing_subcategory:
        category_of_subcategory = existing_subcategory.Category
        if category_of_subcategory.Name != row['Category']:
            print(f"No se puede crear el producto {row['Name']} porque la subcategoria '{row['Subcategory']}' ya esta creada en la categoria '{category_of_subcategory.Name}' \n")
            create = False

    if existing_book:
        # El ISBN ya existe, mostrar un mensaje o manejar la lógica correspondiente
        print(f"El ISBN {row['ISBN']} ya esta registrado con el nombre del producto {existing_book.Product.Name} \n")
        create = False

    if create:
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

        # Lógica para las categorías
        category_name = row['Category']
        if pd.isna(category_name):
            category, _ = Category.objects.get_or_create(Name="General")
        else:
            category, _ = Category.objects.get_or_create(Name=category_name)

        product_instance.Category = category

        # Lógica para las subcategorías
        subcategory_name = row['Subcategory']
        if not pd.isna(subcategory_name):
            subcategory, _ = Subcategory.objects.get_or_create(Name=subcategory_name, Category=category)
            product_instance.Subcategory = subcategory

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

print(df)
print("Datos importados correctamente.")





