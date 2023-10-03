from django.urls import path, include
from . import views
from rest_framework import routers

# Definir un router genérico
router = routers.SimpleRouter()

urlpatterns = [
    # Ruta para el inicio de sesión
    path('api/v1/login/', views.LoginView.as_view(), name='login'),
    # Ruta para el registro de usuarios
    path('api/v1/register/', views.RegisterView.as_view(), name='register'),
]

# Incluir las URLs del enrutador en la ruta 'api/v1/'
urlpatterns += router.urls
