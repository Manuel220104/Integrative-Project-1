from django.urls import path, include
from rest_framework import routers
from UsersAcentos import views
from .views import UserAcentosRegistration, CustomObtainJWTToken

# Define las vistas de los libros
router = routers.DefaultRouter()
router.register(r'UserAcentos', views.UserView, 'UserAcentos')

# Define las vistas de autenticación
urlpatterns = [
    path("api/v1/", include(router.urls)),
    path('api/v1/register/', UserAcentosRegistration.as_view(), name='register'),
    path('api/v1/login/', CustomObtainJWTToken.as_view(), name='login'),
]
