# REST -> Serializers library
from rest_framework import serializers
from .models import Post

# Serialize to convert objects into JSON format to be stored in the backend


class PostSerializer(serializers.ModelSerializer):
    class Meta:
        model = Post
        # Tell which fields to be displayed
        fields = ('id', 'title', 'author', 'description', 'created_at')
