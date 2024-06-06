
from rest_framework import generics, status
from .serializers import NoteSerializers, UserSerializer, CategorySerializer
from rest_framework.permissions import IsAuthenticated, AllowAny 
from rest_framework.authentication import SessionAuthentication, TokenAuthentication
from rest_framework.authtoken.models import Token
from .models import Note, Category
from django.contrib.auth.models import User
from rest_framework.decorators import api_view, authentication_classes, permission_classes
from rest_framework.response import Response
from django.shortcuts import get_object_or_404

# Create your views here.
class CategoryListCreate(generics.ListCreateAPIView):
    serializer_class = CategorySerializer
    permission_classes = [IsAuthenticated]
    
    def get_queryset(self):
        user = self.request.user #gives user object
        return Category.objects.filter(user=user)

    def perform_create(self, serializer):
        #checking if expense is valid 
        if serializer.is_valid():
            #create expense  add author 
            serializer.save(user=self.request.user)
        else:
            print(serializer.errors) 


class CategoryUpdate(generics.UpdateAPIView):
    serializer_class = CategorySerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        user = self.request.user #gives user object
        return Category.objects.filter(user=user) # filter all expenses by user
    
    def perform_update(self, serializer):
       
        instance = serializer.save()

class CategoryDelete(generics.DestroyAPIView):
    serializer_class = CategorySerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        user = self.request.user #gives user object
        return Category.objects.filter(user=user) # filter all expenses by user

class NoteListCreate(generics.ListCreateAPIView):
    serializer_class = NoteSerializers
    permission_classes = [IsAuthenticated]


    def get_queryset(self):
        user = self.request.user #gives user object
        return Note.objects.filter(user=user) # filter all Expenses by user

    def perform_create(self, serializer):
        #checking if expense is valid 
        if serializer.is_valid():
            #create expense  add author 
            serializer.save(user=self.request.user)
        else:
            print(serializer.errors)

class NoteUpdate(generics.UpdateAPIView):
    serializer_class = NoteSerializers
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        user = self.request.user #gives user object
        return Note.objects.filter(user=user) # filter all Expenses by user
    
    def perform_update(self, serializer):
       
        instance = serializer.save()




class NoteDelete(generics.DestroyAPIView):
    serializer_class = NoteSerializers
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        user = self.request.user #gives user object
        return Note.objects.filter(user=user) # filter all Expenses by user
    


class CreateUserView(generics.CreateAPIView):
    # make sure not to create user that already exists by looking at all users
    queryset = User.objects.all()
    # tells view what type of data 
    serializer_class = UserSerializer
    #allow anyone to use this view
    permission_classes = [AllowAny]

class DeleteUserView(generics.DestroyAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer
    permission_classes = [AllowAny]


@api_view(['GET'])
def color_choices(request):
    choices = Category.COLOR_CHOICES
    data = [{'value': choice[0], 'display_name': choice[1]} for choice in choices]
    return Response(data)