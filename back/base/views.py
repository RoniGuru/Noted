
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
    queryset = User.objects.all()
    serializer_class = UserSerializer
    permission_classes = [AllowAny]

    def get_queryset(self):
        user = self.request.user #gives user object
        return Note.objects.filter(user=user) # filter all Expenses by user
    
    



class DeleteUserView(generics.DestroyAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer
    permission_classes = [AllowAny]


@api_view(['GET'])
def colorChoices(request):
    choices = Category.COLOR_CHOICES
    data = [{'value': choice[0], 'display_name': choice[1]} for choice in choices]
    return Response(data)


@api_view(['GET'])
def getUserDetails(request):
    user = request.user
    if user.is_authenticated:
        return Response({
            'username': user.username,
            "id": user.id,
            
        })
    return Response({'error': 'Not authenticated'}, status=401)



@api_view(['PUT'])
@permission_classes([IsAuthenticated])
def update_user(request):
    user = request.user
    serializer = UserSerializer(user, data=request.data, partial=True)  # partial=True to allow partial updates

    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data, status=status.HTTP_200_OK)
    
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)