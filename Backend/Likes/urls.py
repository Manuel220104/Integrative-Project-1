from django.urls import path
from .views import LikeCreateView, LikeListView, LikeDetailView, like_product, UserLikesListView

urlpatterns = [
    path('api/v1/likes/', LikeListView.as_view(), name='like-list'),
    path('api/v1/like_product/', like_product, name='like_product'),
    path('api/v1/likes/<int:pk>/', LikeDetailView.as_view(), name='like-detail'),
    path('api/v1/user_likes/<str:identifier>/', UserLikesListView.as_view(), name='user-likes'),
    
]
