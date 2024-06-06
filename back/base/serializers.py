from django.contrib.auth.models import User
from rest_framework import serializers
from.models import Note, Category

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ["id","username","password"]
        extra_kwargs = {"password":{"write_only":True}}
    
    def create(self, validated_data):
        user = User.objects.create_user(**validated_data)
        return user
    

class CategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = Category
        fields = ["name","color","user","id"]
        extra_kwargs = {"user": {"read_only":True}}

class NoteSerializers(serializers.ModelSerializer):
    class Meta:
        model = Note
        fields = ["id","title","body","category","created","user"]
        extra_kwargs = {"user": {"read_only":True}} # can only see author not set them


class ColorChoiceSerializer(serializers.Serializer):
    value = serializers.CharField()
    display_name = serializers.CharField()