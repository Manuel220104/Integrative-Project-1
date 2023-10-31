from django.contrib import admin
from django.urls import path, include
from django.conf.urls.static import static
from django.conf import settings


urlpatterns = [
    path('admin/', admin.site.urls),
    path('Products/', include('Products.urls')),
    path('Books/', include('Books.urls')),
    path('Musical_Instruments/', include('Musical_Instruments.urls')),
    path('Table_Games/', include('Table_Games.urls')),
    path('Technologys/', include('Technologys.urls')),
    path('InformationCarousel/', include('InformationCarousel.urls')),
    path('accounts/', include('accounts.urls')),
    path('Categories/', include('Categories.urls')),
    path('Subcategories/', include('Subcategories.urls')),
    path('Likes/', include('Likes.urls')),
]
urlpatterns += static(settings.MEDIA_URL, document_root = settings.MEDIA_ROOT)
