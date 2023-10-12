from django.urls import path, include
from rest_framework.documentation import include_docs_urls
from rest_framework import routers
from Subcategories import views


router = routers.DefaultRouter()
router.register(r'Subcategory', views.CategoryView, 'Subcategory')

urlpatterns = [
    path("api/v1/", include(router.urls)),
]




