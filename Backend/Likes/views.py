from rest_framework import generics
from .models import Like
from .serializer import LikeSerializer
from rest_framework import status
from rest_framework.response import Response
from django.shortcuts import get_object_or_404
from Products.models import Product
from rest_framework.decorators import api_view
from accounts.models import Usuarios


class LikeCreateView(generics.CreateAPIView):
    queryset = Like.objects.all()
    serializer_class = LikeSerializer

class LikeListView(generics.ListAPIView):
    queryset = Like.objects.all()
    serializer_class = LikeSerializer

class LikeDetailView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Like.objects.all()
    serializer_class = LikeSerializer

@api_view(['POST'])
def like_product(request):
    # Obtener el producto
    product_id = request.data.get('product_id')  # Obtener el product_id del cuerpo de la solicitud
    product = get_object_or_404(Product, pk=product_id)

    # Obtener el usuario por su nombre de usuario (username)
    username = request.data.get('username')  # Asegúrate de enviar 'username' en el cuerpo de la solicitud POST
    user = Usuarios.objects.get(username=username)

    # Verificar si el like ya existe
    try:
        like = Like.objects.get(user=user, product=product)
        # Si el like ya existe y coincide con el producto y el usuario, lo eliminamos (quitar el like)
        if like.product == product and like.user == user:
            like.delete()
            return Response(status=status.HTTP_204_NO_CONTENT)
        else:
            # Si el like ya existe pero no coincide con el producto y el usuario, no hacemos nada
            return Response(status=status.HTTP_204_NO_CONTENT)
    except Like.DoesNotExist:
        # Si el like no existe, lo creamos (dar like)
        like = Like(user=user, product=product)
        like.save()
        return Response(status=status.HTTP_201_CREATED)