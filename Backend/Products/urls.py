from django.urls import path, include
from rest_framework.documentation import include_docs_urls
from rest_framework import routers
from Products import views
from Products import models
from .views import UltimoRegistro
from .views import UltimoRegistroDate
from .views import ProductsWithComponentsView


router = routers.DefaultRouter()
router.register(r'Product', views.ProductView, 'Product')
# Como vas a visiar la url, como empieza la api
# se pone asi para saber la version pero se puede
# luego de la , van las urls generadas por django
urlpatterns = [
    path("api/v1/", include(router.urls)),
    path('api/v1/ultimo_registro/', UltimoRegistro.as_view(), name='ultimo_registro'),
    path('api/v1/Ultimo_registro_fecha/', UltimoRegistroDate.as_view(), name='ultimo_registro_fecha'),
    path('api/v1/Product_and_child/', ProductsWithComponentsView.as_view(), name='product_child'),
]