from django.urls import path
from . import views
from django.urls import path, include
from . import views
from rest_framework import routers
from .views import UserUpdateView
router = routers.SimpleRouter()

urlpatterns = [
    path('api/v1/users/', views.UserListView.as_view(), name='user-list'),
    path('api/v1/register/', views.register, name='register'),
    path('api/v1/login/', views.login, name='login'),
    path('api/v1/logout/', views.logout_view, name='logout'),
    path('api/v1/user/<str:username>/', UserUpdateView.as_view(), name='user-update'),


    # Otras URL de tu aplicación
]




urlpatterns += router.urls