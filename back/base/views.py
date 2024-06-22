
from rest_framework import generics, status
from .serializers import NoteSerializers, UserSerializer, CategorySerializer, PasswordChangeSerializer
from rest_framework.permissions import IsAuthenticated, AllowAny 


from .models import Note, Category
from django.contrib.auth.models import User

from rest_framework.response import Response


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

    



class NoteDelete(generics.DestroyAPIView):
    serializer_class = NoteSerializers
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        user = self.request.user #gives user object
        return Note.objects.filter(user=user) # filter all Expenses by user
    


class CreateUserView(generics.CreateAPIView):
    serializer_class = UserSerializer
    permission_classes = [AllowAny]

    def get_queryset(self):
        user = self.request.user #gives user object
        return Note.objects.filter(user=user) # filter all Expenses by user
    
    
class UserDetailApiView(generics.RetrieveAPIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        user = request.user
        return Response({
            'id': user.id,
            'username': user.username,
            # Add other user details as needed
        })


class DeleteUserView(generics.DestroyAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer
    permission_classes = [IsAuthenticated]


class UpdateUserView(generics.UpdateAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer
    permission_classes = [IsAuthenticated]


class PasswOrdChangeView(generics.UpdateAPIView):
     serializer_class = PasswordChangeSerializer
     permission_classes = [IsAuthenticated]






class PasswordChangeView(generics.UpdateAPIView):
    serializer_class = PasswordChangeSerializer
    model = User
    permission_classes = [IsAuthenticated]

    def get_object(self, queryset=None):
        return self.request.user

    def update(self, request, *args, **kwargs):
        self.object = self.get_object()
        serializer = self.get_serializer(data=request.data)

        if serializer.is_valid():
            # Check old password
            if not self.object.check_password(serializer.data.get("old_password")):
                return Response({"old_password": ["Wrong password."]}, status=status.HTTP_400_BAD_REQUEST)

            # Set new password
            self.object.set_password(serializer.data.get("new_password"))
            self.object.save()
            return Response({"detail": "Password updated successfully."}, status=status.HTTP_200_OK)

        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)