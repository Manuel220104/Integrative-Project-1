from rest_framework import generics
from .models import Like
from .serializer import LikeSerializer, CustomLikeSerializer
from rest_framework import status
from rest_framework.response import Response
from django.shortcuts import get_object_or_404
from Products.models import Product
from rest_framework.decorators import api_view
from accounts.models import Usuarios
from django.db.models import Q


class LikeCreateView(generics.CreateAPIView):
    queryset = Like.objects.all()
    serializer_class = LikeSerializer

class LikeListView(generics.ListAPIView):
    queryset = Like.objects.all()
    serializer_class = CustomLikeSerializer

class UserLikesListView(generics.ListAPIView):
    serializer_class = LikeSerializer

    def get_queryset(self):
        # Obtén el identificador (puede ser nombre de usuario o correo electrónico) de los parámetros de la URL
        identifier = self.kwargs['identifier']

        # Filtra los likes por el usuario específico (nombre de usuario o correo electrónico)
        queryset = Like.objects.filter(Q(user__username=identifier) | Q(user__email=identifier))
        return queryset

class LikeDetailView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Like.objects.all()
    serializer_class = LikeSerializer

@api_view(['POST'])
def like_product(request):
    # Obtener el producto
    product_id = request.data.get('product_id')
    product = get_object_or_404(Product, pk=product_id)

    # Obtener el usuario por su nombre de usuario (username) o correo electrónico
    identifier = request.data.get('identifier')  # Use 'identifier' instead of 'username'
    user = Usuarios.objects.filter(Q(username=identifier) | Q(email=identifier)).first()

    if user:
        # Verificar si el like ya existe
        try:
            like = Like.objects.get(user=user, product=product)
            if like.product == product and like.user == user:
                like.delete()
                return Response(status=status.HTTP_204_NO_CONTENT)
            else:
                return Response(status=status.HTTP_204_NO_CONTENT)
        except Like.DoesNotExist:
            # Si el like no existe, lo creamos (dar like)
            like = Like(user=user, product=product)
            like.save()
            return Response(status=status.HTTP_201_CREATED)
    else:
        return Response({"error": "User not found."}, status=status.HTTP_404_NOT_FOUND)
