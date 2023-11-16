from rest_framework import serializers
from .models import Like
from accounts.models import Usuarios

class LikeSerializer(serializers.ModelSerializer):
    class Meta:
        model = Like
        fields = '__all__'


from rest_framework import serializers
from .models import Like

class CustomLikeSerializer(serializers.ModelSerializer):
    username = serializers.CharField(write_only=True)

    class Meta:
        model = Like
        fields = ('id', 'created_at', 'user', 'product', 'username')

    def create(self, validated_data):
        # Extract 'username' from validated_data and remove it from the dictionary
        username = validated_data.pop('username', None)

        # Get the user based on the provided 'username' or 'email'
        user = Usuarios.objects.filter(Q(username=username) | Q(email=username)).first()

        if user:
            # If user exists, create the Like instance
            like = Like.objects.create(user=user, **validated_data)
            return like
        else:
            raise serializers.ValidationError("User not found.")