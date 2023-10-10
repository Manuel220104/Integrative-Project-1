from django.urls import path
from . import views
from django.urls import path, include
from . import views
from rest_framework import routers

router = routers.SimpleRouter()

urlpatterns = [
    path('api/users/', views.UserListView.as_view(), name='user-list'),
    path('api/register/', views.register, name='register'),
    path('api/login/', views.login, name='login'),
    path('api/logout/', views.logout_view, name='logout'),
    # Otras URL de tu aplicación
]




urlpatterns += router.urls
